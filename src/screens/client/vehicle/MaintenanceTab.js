import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ActivityIndicator, FlatList, StyleSheet, Modal, ScrollView } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getListCenterActive } from "../../../app/Center/actions";
import { BASE_URL } from "../../../../env";

const MaintenanceTab = ({ route }) => {
  const { vehicle } = route.params;
  const dispatch = useDispatch();
  const { centerList } = useSelector((state) => state.center);
  const [maintenancePlans, setMaintenancePlans] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [maintenanceDetails, setMaintenanceDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState([]);

  useEffect(() => {
    const fetchCenters = async () => {
      await dispatch(getListCenterActive());
    };
    fetchCenters();
  }, [dispatch]);

  useEffect(() => {
    if (selectedCenter) {
      fetchMaintenancePlans();
    }
  }, [selectedCenter]);

  useEffect(() => {
    fetchMaintenanceVehiclesDetails();
  }, [vehicle]);

  const fetchMaintenancePlans = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.get(
        `${BASE_URL}/MaintenancePlans/GetListByCenter?id=${selectedCenter}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setMaintenancePlans(response.data);
    } catch (error) {
      console.error("Error fetching maintenance plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMaintenanceVehiclesDetails = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.get(
        `${BASE_URL}/MaintenanceVehiclesDetails/GetListByVehicleId?vehicleId=${vehicle.vehiclesId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const details = response.data;

      const groupedPlans = Object.values(
        details.reduce((acc, item) => {
          const planId = item.responseMaintenanceSchedules.maintenancePlanId;
          if (!acc[planId]) {
            acc[planId] = {
              maintenancePlanId: planId,
              ...item.responseMaintenanceSchedules,
              groupedPlans: [],
            };
          }
          acc[planId].groupedPlans.push(item);
          return acc;
        }, {})
      );
      setMaintenanceDetails(groupedPlans);
    } catch (error) {
      console.error("Error fetching maintenance vehicle details:", error);
    } finally {
      setLoading(false);
    }
  };

  const createMaintenancePackage = async () => {
    if (!selectedPlan || !selectedCenter) {
      return alert("Please select a center and a plan");
    }

    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.post(
        `${BASE_URL}/MaintenanceVehiclesDetails/Post`,
        {
          maintanancePlanId: selectedPlan,
          vehiclesId: vehicle.vehiclesId,
          maintenanceCenterId: selectedCenter,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Maintenance package registered successfully!");
        fetchMaintenanceVehiclesDetails();
      } else {
        alert("Failed to register maintenance package.");
      }
    } catch (error) {
      console.error("Error creating maintenance package:", error);
      alert("Error occurred while creating maintenance package.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowDetails = (groupedPlans) => {
    setSelectedPlanDetails(groupedPlans);
    setShowDetailsModal(true);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Nút đăng ký gói bảo dưỡng */}
      <Pressable onPress={() => setShowModal(true)} style={styles.registerButton}>
        <Text style={styles.buttonText}>Đăng ký gói bảo dưỡng</Text>
      </Pressable>

      {/* Hiển thị modal để chọn trung tâm và gói bảo dưỡng */}
      <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn trung tâm:</Text>
            <Picker
              selectedValue={selectedCenter}
              onValueChange={(value) => setSelectedCenter(value)}
            >
              {centerList.map((center) => (
                <Picker.Item
                  key={center.maintenanceCenterId}
                  label={center.maintenanceCenterName}
                  value={center.maintenanceCenterId}
                />
              ))}
            </Picker>

            {selectedCenter && (
              <>
                <Text style={styles.modalTitle}>Chọn gói bảo dưỡng:</Text>
                <Picker
                  selectedValue={selectedPlan}
                  onValueChange={(value) => setSelectedPlan(value)}
                >
                  {maintenancePlans.map((plan) => (
                    <Picker.Item
                      key={plan.maintenancePlanId}
                      label={plan.maintenancePlanName}
                      value={plan.maintenancePlanId}
                    />
                  ))}
                </Picker>
              </>
            )}

            <Pressable onPress={createMaintenancePackage} style={styles.confirmButton}>
              <Text style={styles.buttonText}>Xác nhận đăng ký</Text>
            </Pressable>

            <Pressable onPress={() => setShowModal(false)} style={styles.closeButton}>
              <Text style={styles.buttonText}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Hiển thị các gói bảo dưỡng đã đăng ký */}
      {maintenanceDetails.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Gói bảo dưỡng đã đăng ký:</Text>
          {maintenanceDetails.map((plan) => (
            <Pressable key={plan.maintenancePlanId} style={styles.planContainer} onPress={() => handleShowDetails(plan.groupedPlans)}>
              <Text style={styles.planTitle}>{plan.maintenancePlanName}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Modal hiển thị các gói nhỏ */}
      <Modal transparent={true} visible={showDetailsModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chi tiết gói bảo dưỡng</Text>
            <FlatList
              data={selectedPlanDetails}
              keyExtractor={(item) => item.responseMaintenanceSchedules.maintananceScheduleId.toString()}
              renderItem={({ item }) => (
                <Text style={styles.subPlanText}>{item.responseMaintenanceSchedules.maintenancePlanName + ` tại mốc ${item.responseMaintenanceSchedules.maintananceScheduleName} km`}</Text>
              )}
            />
            <Pressable onPress={() => setShowDetailsModal(false)} style={styles.closeButton}>
              <Text style={styles.buttonText}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MaintenanceTab;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  registerButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#007bff",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#ff5c5c",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  planContainer: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  planTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subPlanText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
