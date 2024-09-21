import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  Modal, Image
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getListBookingById } from "../../../app/Booking/actions";
import moment from "moment";
import axiosClient from "../../../services/axiosClient";
import COLORS from "../../../constants/colors";
const BookingDetail = ({ route }) => {
  const { bookingId } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { bookingById } = useSelector((state) => state.booking);
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [sparepartModalVisible, setSparePartModalVisible] = useState(false);

  const [selectedService, setSelectedService] = useState(null);
  const [selectedSparePart, setSelectedSparePart] = useState(null);

  useEffect(() => {
    const fetchGetListSparePart = async () => {
      await dispatch(getListBookingById(bookingId));
    };
    fetchGetListSparePart();
  }, [bookingId]);

  const handleNavigateBack = () => {
    navigation.goBack();
  };
  const handleCloseServiceModal = () => {
    setServiceModalVisible(false);
    setSelectedService(null);
    
  };
  const handleCloseSparePartModal = () => {
    setSparePartModalVisible(false);
    setSelectedService(null);
    
  };
  const handleServiceDetailClick = async (itemId) => {
    try {
      const response = await axiosClient.get(
        `/MaintenanceServiceInfoes/GetById?id=${itemId}`
      );
      setSelectedService(response.data);
      setServiceModalVisible(true);

    } catch (error) {
      Alert.alert("Error", "Could not fetch item details");
    }
  };
  const handleSparePartDetailClick = async (itemId) => {
    try {
      const response = await axiosClient.get(
        `/MaintenanceSparePartInfoes/GetById?id=${itemId}`
      );
      setSelectedSparePart(response.data);
      setSparePartModalVisible(true);
    } catch (error) {
      Alert.alert("Error", "Could not fetch item details");
    }
  };
  const formatCurrency = (value) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };
  const trueMaintenanceInfo = bookingById?.responseMaintenanceInformation?.filter(
    (item) => item.status !== "CANCELLED"
  );
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleNavigateBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Thông tin đặt lịch</Text>
      </View>

      {bookingById && (
        <View>
          <View style={styles.card}>
            <View style={{ alignItems: "left" }}>
              <Text style={styles.name}>
                {bookingById?.responseCenter.maintenanceCenterName}
              </Text>
              <Text style={styles.name}>
                Thông tin xe: {bookingById?.responseVehicles.vehiclesBrandName} {" "}
                {bookingById?.responseVehicles.vehicleModelName}
              </Text>
              <Text style={styles.centerName}>
                Tên khách hàng: {bookingById?.responseClient.firstName}{" "}
                {bookingById?.responseClient.lastName}
              </Text>
              <Text style={styles.status}>
                Trạng thái: {bookingById.status}
              </Text>
              <Text style={styles.centerName}>
                Ngày đặt:{" "}  
                {moment(bookingById?.bookingDate).format("DD/MM/YYYY HH:mm")}
              </Text>
              <Text style={styles.centerName}>
                Thông tin: {bookingById.note}
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={{ alignItems: "left" }}>
              <Text style={styles.name}>
                {bookingById.responseCenter.maintenanceCenterName}
              </Text>
              <Text style={styles.name}>
                email: {bookingById.responseCenter.email}
              </Text>
              <Text style={styles.name}>
                SĐT: {bookingById.responseCenter.phone}
              </Text>
              <Text style={styles.status}>
                Trạng thái: {bookingById.responseCenter.status}
              </Text>
              <Text style={styles.centerName}>
                Đánh giá: {bookingById.responseCenter.rating}
              </Text>
              <Text style={styles.centerName}>
                Địa chỉ: {bookingById.responseCenter.address}
              </Text>
            </View>
          </View>
        </View>
      )}

       {/* Bước 2: Render danh sách dịch vụ từ trueMaintenanceInfo */}
       <Text style={styles.sectionTitle}>Danh sách dịch vụ</Text>
      {trueMaintenanceInfo?.map((item, index) =>
        item.responseMaintenanceServiceInfos?.length > 0 ? (
          <View key={index} style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Tên dịch vụ</Text>
              <Text style={styles.tableHeaderText}>Đơn Giá</Text>
              <Text style={styles.tableHeaderText}>Số lượng</Text>
              <Text style={styles.tableHeaderText}>Thành tiền</Text>
              <Text style={styles.tableHeaderText}>Thao tác</Text>
            </View>
            {item.responseMaintenanceServiceInfos.map((service, i) => (
              <View style={styles.tableRow} key={i}>
                <Text style={styles.tableRowText}>
                  {service.maintenanceServiceInfoName}
                </Text>
                <Text style={styles.tableRowText}>
                  {formatCurrency(service.actualCost)}
                </Text>
                <Text style={styles.tableRowText}>{service.quantity} lần</Text>
                <Text style={styles.tableRowText}>
                  {formatCurrency(service.totalCost)}
                </Text>
                <Pressable
                  style={styles.detailButton}
                  onPress={() =>
                    handleServiceDetailClick(service.maintenanceServiceInfoId)
                  }
                >
                  <Text style={styles.detailButtonText}>Thông tin</Text>
                </Pressable>
              </View>
            ))}
          </View>
        ) : (
          <View key={index} style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có dịch vụ</Text>
          </View>
        )
      )}

      {/* Bước 3: Render danh sách phụ tùng từ trueMaintenanceInfo */}
      <Text style={styles.sectionTitle}>Danh sách phụ tùng</Text>
      {trueMaintenanceInfo?.map((item, index) =>
        item.responseMaintenanceSparePartInfos?.length > 0 ? (
          <View key={index} style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Tên phụ tùng</Text>
              <Text style={styles.tableHeaderText}>Đơn Giá</Text>
              <Text style={styles.tableHeaderText}>Số lượng</Text>
              <Text style={styles.tableHeaderText}>Thành tiền</Text>
              <Text style={styles.tableHeaderText}>Thao tác</Text>
            </View>
            {item.responseMaintenanceSparePartInfos.map((sparePart, i) => (
              <View style={styles.tableRow} key={i}>
                <Text style={styles.tableRowText}>
                  {sparePart.maintenanceSparePartInfoName}
                </Text>
                <Text style={styles.tableRowText}>
                  {formatCurrency(sparePart.actualCost)}
                </Text>
                <Text style={styles.tableRowText}>{sparePart.quantity} lần</Text>
                <Text style={styles.tableRowText}>
                  {formatCurrency(sparePart.totalCost)}
                </Text>
                <Pressable
                  style={styles.detailButton}
                  onPress={() =>
                    handleSparePartDetailClick(sparePart.maintenanceSparePartInfoId)
                  }
                >
                  <Text style={styles.detailButtonText}>Thông tin</Text>
                </Pressable>
              </View>
            ))}
          </View>
        ) : (
          <View key={index} style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có phụ tùng</Text>
          </View>
        )
      )}
      <Modal
        transparent={true}
        animationType="slide"
        visible={serviceModalVisible}
        onRequestClose={handleCloseServiceModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedService ? (
                <>
                  <Text style={styles.modalTitle}>
                    {selectedService.maintenanceServiceInfoName}
                  </Text>
                  <Image
                    source={{ uri: selectedService.image }}
                    style={styles.modalImage}
                  />
                  <Text style={styles.modalText}>
                    Đơn giá: {formatCurrency(selectedService.actualCost)}
                  </Text>
                  <Text style={styles.modalText}>
                    Số lượng: {selectedService.quantity}
                  </Text>
                  <Text style={styles.modalText}>
                    Thành tiền: {formatCurrency(selectedService.totalCost)}
                  </Text>
                  <Text style={styles.modalText}>Ghi chú: {selectedService.note}</Text>

                </>
              ) : (
                <Text>Loading...</Text>
              )}
              <Pressable
                style={styles.modalCloseButton}
                onPress={handleCloseServiceModal}
              >
                <Text style={styles.modalCloseButtonText}>Đóng</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType="slide"
        visible={sparepartModalVisible}
        onRequestClose={handleCloseSparePartModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedSparePart ? (
                <>
                  <Text style={styles.modalTitle}>
                    {selectedSparePart.maintenanceSparePartInfoName}
                  </Text>
                  <Image
                    source={{ uri: selectedSparePart.image }}
                    style={styles.modalImage}
                  />
                  <Text style={styles.modalText}>
                    Đơn giá: {formatCurrency(selectedSparePart.actualCost)}
                  </Text>
                  <Text style={styles.modalText}>
                    Số lượng: {selectedSparePart.quantity}
                  </Text>
                  <Text style={styles.modalText}>
                    Thành tiền: {formatCurrency(selectedSparePart.totalCost)}
                  </Text>
                  <Text style={styles.modalText}>Ghi chú: {selectedSparePart.note}</Text>

                </>
              ) : (
                <Text>Loading...</Text>
              )}
              <Pressable
                style={styles.modalCloseButton}
                onPress={handleCloseSparePartModal}
              >
                <Text style={styles.modalCloseButtonText}>Đóng</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  sectionTitle: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  tableContainer: {
    margin: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  tableHeaderText: {
    flex: 1,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tableRowText: {
    flex: 1,
    textAlign: "center",
    color: "#333",
  },
  detailButton: {
    backgroundColor: "#007BFF",
    padding: 5,
    borderRadius: 5,
  },
  detailButtonText: {
    color: "#ffffff",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContent: {
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: "#fff",
  },

});

export default BookingDetail;
