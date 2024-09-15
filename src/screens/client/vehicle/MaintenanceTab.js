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
  const [showDeepDetailsModal, setShowDeepDetailsModal] = useState(false);

  const [selectedPlanDetails, setSelectedPlanDetails] = useState([]);
  const [selectedSmallPackage, setSelectedSmallPackage] = useState(null);

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
  
      // Lọc các gói bảo dưỡng dựa trên vehicleModelId
      const filteredPlans = response.data.filter(plan => 
        plan.reponseVehicleModels?.vehicleModelId === vehicle.vehicleModelId
      );
  
      if (filteredPlans.length === 0) {
        alert("Trung tâm không có gói nào phù hợp với xe của bạn");
      }
  
      setMaintenancePlans(filteredPlans);
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
        setShowModal(false); // Đóng modal sau khi đăng ký thành công
        fetchMaintenanceVehiclesDetails(); // Refresh danh sách gói bảo dưỡng
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
  const fetchSmallPackageDetail = async (maintenanceVehiclesDetailId) => {
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.get(`${BASE_URL}/MaintenanceInformations/GetByMvd?id=${maintenanceVehiclesDetailId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSelectedSmallPackage(response.data);
      setShowDeepDetailsModal(true);
    } catch (error) {
      console.error("Error fetching small package detail:", error);
    }
  };
  const handleShowDetails = (groupedPlans) => {
    setSelectedPlanDetails(groupedPlans);
    setShowDetailsModal(true);
  };
  const handleSmallPackagePress = (maintenanceVehiclesDetailId) => {
    fetchSmallPackageDetail(maintenanceVehiclesDetailId);
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

      {/* Modal hiển thị các gói nhỏ dưới dạng card */}
      <Modal transparent={true} visible={showDetailsModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chi tiết gói bảo dưỡng</Text>
            <FlatList
              data={selectedPlanDetails}
              keyExtractor={(item) => item.responseMaintenanceSchedules.maintananceScheduleId.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.cardContainer}
                  onPress={() => handleSmallPackagePress(item.maintenanceVehiclesDetailId)}
                >
                  <Text style={styles.planTitle}>
                    {item.responseMaintenanceSchedules.maintenancePlanName + ` tại mốc ${item.responseMaintenanceSchedules.maintananceScheduleName} km`}
                  </Text>
                </Pressable>
              )}
            />
            <Pressable onPress={() => setShowDetailsModal(false)} style={styles.closeButton}>
              <Text style={styles.buttonText}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* New Modal hiển thị chi tiết sâu hơn của gói nhỏ */}
<Modal transparent={true} visible={showDeepDetailsModal} animationType="slide">
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Chi tiết gói nhỏ</Text>
      {selectedSmallPackage ? (
        <View>
          <Text style={styles.detailText}>Tên gói: {selectedSmallPackage.informationMaintenanceName}</Text>
          <Text style={styles.detailText}>Trạng thái: {selectedSmallPackage.status}</Text>

          {/* Danh sách các dịch vụ bên trong gói */}
          <Text style={styles.sectionTitle}>Các dịch vụ trong gói:</Text>
          <FlatList
            data={selectedSmallPackage.responseMaintenanceServiceInfos}
            keyExtractor={(item) => item.maintenanceServiceInfoId.toString()}
            renderItem={({ item }) => (
              <View style={styles.serviceItem}>
                <Text style={styles.serviceName}>{item.maintenanceServiceInfoName}</Text>
              </View>
            )}
          />

        </View>
      ) : (
        <Text>Đang tải...</Text>
      )}
      <Pressable onPress={() => setShowDeepDetailsModal(false)} style={styles.closeButton}>
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
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: "#e9ecef",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  serviceItem: {
    backgroundColor: "#f1f3f5",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  serviceName: {
    fontSize: 16,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
});
