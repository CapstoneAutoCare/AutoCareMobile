import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { getReceiptById } from "../../../app/Center/actions";
import { Rating } from "react-native-ratings";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../../../env";

const InforDetail = ({ route }) => {
  const { info } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { receiptById } = useSelector((state) => state.center);
  const [isModalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [isFeedbackModalVisible, setFeedbackModalVisible] = useState(false); 
  const [comment, setComment] = useState("");
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchReceiptData = async () => {
      await dispatch(getReceiptById(info?.informationMaintenanceId));
      // Fetch feedback if available
      await fetchFeedback();
    };
    fetchReceiptData();
  }, [info]);

  const fetchFeedback = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.get(
        `${BASE_URL}/Feedback/GetByReceiptId?id=${receiptById?.receiptId}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data) {
        setFeedback(response.data);
        setComment(response.data.comment); 
        setRating(response.data.vote); 
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const handleRatingSubmit = async () => {
    try {
      if (!comment) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.post(
        `${BASE_URL}/Feedback/Post`,
        {
          comment: comment,
          vote: rating,
          maintenanceCenterId: receiptById.maintenanceCenterId,
          receiptId: receiptById.receiptId,
        },
        {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        await fetchFeedback(); // Fetch the feedback after submitting
        toggleModal();
        alert("đánh giá thành công!");
      } else {
        alert("đánh giá không thành công. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error during rating submission:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "CHECKIN":
        return "blue";
      case "CREATEDBYClIENT":
        return "orange";
      case "PAYMENT":
        return "purple";
      case "PAID":
        return "green";
      case "YETPAID":
        return "red";
      default:
        return "black";
    }
  };

  const statusLabels = {
    CHECKIN: "Đã Check-in",
    CREATEDBYClIENT: "Tạo bởi khách hàng",
    PAYMENT: "Thanh toán",
    PAID: "Đã thanh toán",
    YETPAID: "Chưa thanh toán",
  };
  const toggleFeedbackModal = () => {
    setFeedbackModalVisible(!isFeedbackModalVisible);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleNavigateBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Thông tin bảo trì</Text>
      </View>
      {info && (
        <View style={styles.card}>
          <View style={{ alignItems: "left" }}>
            <Text style={styles.name}>{info.informationMaintenanceName}</Text>
            <Text style={styles.name}>
              {info?.responseVehicles?.vehiclesBrandName} -{" "}
              {info?.responseVehicles?.vehicleModelName} -{" "}
              {info?.responseVehicles?.color}
            </Text>
            <Text
              style={[styles.status, { color: getStatusColor(info.status) }]}
            >
              Trạng thái: {statusLabels[info.status]}
            </Text>
            <Text style={styles.status}>
              Biển số xe : {info?.responseVehicles?.licensePlate}
            </Text>
            <Text style={styles.status}>
              Quãng đường đi được : {info?.responseVehicles?.odo}
            </Text>
            <Text style={styles.status}>
              Thông tin xe : {info?.responseVehicles?.description}
            </Text>
            <Text style={styles.centerName}>
              Ngày bảo trì :{" "}
              {moment(info?.createdDate).format("DD/MM/YYYY HH:mm")}
            </Text>
            <Text style={styles.centerName}>
              Ngày hoàn thành :{" "}
              {moment(info?.finishedDate).format("DD/MM/YYYY HH:mm")}
            </Text>
            <Text style={styles.centerName}>Thông tin: {info.note}</Text>
            <Text style={styles.centerName}>
              Tổng tiền: {info.totalPrice} Đồng
            </Text>
          </View>
          {(info.status === "YETPAID" || info.status === "PAID") && (
            <Pressable
              onPress={() =>
                navigation.navigate("Receipts", {
                  info: info?.informationMaintenanceId,
                })
              }
              style={styles.button}
            >
              <Text style={{ color: "white" }}>Hóa đơn</Text>
            </Pressable>
          )}
          {info.status === "PAID" && (
            <>
               {feedback ? (
                <Pressable
                  onPress={toggleFeedbackModal}
                  style={styles.button}
                >
                  <Text style={{ color: "white" }}>Xem lại đánh giá</Text>
                </Pressable>
              ) : (
                <Pressable onPress={toggleModal} style={styles.button}>
                  <Text style={{ color: "white" }}>Đánh giá</Text>
                </Pressable>
              )}
            </>
          )}
        </View>
      )}

      <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
        Danh sách dịch vụ và phụ tùng
      </Text>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.tableCol1]}>Loại</Text>
          <Text style={[styles.tableHeaderText, styles.tableCol2]}>Tên</Text>
          <Text style={[styles.tableHeaderText, styles.tableCol3]}>Đơn Giá</Text>
          <Text style={[styles.tableHeaderText, styles.tableCol4]}>Số lượng</Text>
          <Text style={[styles.tableHeaderText, styles.tableCol5]}>Tổng Tiền</Text>
        </View>
        {info?.responseMaintenanceServiceInfos.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableText, styles.tableCol1]}>Dịch vụ</Text>
            <Text style={[styles.tableText, styles.tableCol2]}>
              {item.maintenanceServiceInfoName}
            </Text>
            <Text style={[styles.tableText, styles.tableCol3]}>
              {item.actualCost} đồng
            </Text>
            <Text style={[styles.tableText, styles.tableCol4]}>
              {item.quantity} lần
            </Text>
            <Text style={[styles.tableText, styles.tableCol5]}>
              {item.totalCost} đồng
            </Text>
          </View>
        ))}
        {info?.responseMaintenanceSparePartInfos.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableText, styles.tableCol1]}>Phụ tùng</Text>
            <Text style={[styles.tableText, styles.tableCol2]}>
              {item.maintenanceSparePartInfoName}
            </Text>
            <Text style={[styles.tableText, styles.tableCol3]}>
              {item.actualCost} đồng
            </Text>
            <Text style={[styles.tableText, styles.tableCol4]}>
              {item.quantity} cái
            </Text>
            <Text style={[styles.tableText, styles.tableCol5]}>
              {item.totalCost} đồng
            </Text>
          </View>
        ))}
      </View>

 {/* Feedback Modal */}
 <Modal isVisible={isFeedbackModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Đánh giá của bạn</Text>
          <Rating
            startingValue={rating}
            imageSize={30}
            readonly
            style={styles.rating}
          />
          <TextInput
            style={styles.commentInput}
            placeholder="Nhập nhận xét của bạn"
            value={comment}
            editable={false} // Make the input field read-only
          />
          <Pressable
            onPress={toggleFeedbackModal}
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.cancelButtonText}>Đóng</Text>
          </Pressable>
        </View>
      </Modal>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Đánh giá</Text>
          <Rating
            showRating
            onFinishRating={(rating) => setRating(rating)}
            style={{ paddingVertical: 10 }}
          />
          <TextInput
            style={styles.commentInput}
            placeholder="Nhập nhận xét của bạn"
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.modalButton, styles.submitButton]}
              onPress={handleRatingSubmit}
            >
              <Text style={styles.modalButtonText}>Gửi</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, styles.cancelButton]}
              onPress={toggleModal}
            >
              <Text style={styles.modalButtonText}>Hủy</Text>
            </Pressable>
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
    marginTop: 30,
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
  content: {
    padding: 16,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    marginBottom: 8,
  },
  centerName: {
    fontSize: 16,
    marginBottom: 8,
  },
  cost: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  createdDate: {
    fontSize: 14,
    color: "#666666",
    marginTop: 12,
  },
  card: {
    backgroundColor: "white",
    alignItems: "center",
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0066b2",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#3b5998",
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  tableContainer: {
    margin: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
  },
  tableHeaderText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCol1: {
    flex: 1,
  },
  tableCol2: {
    flex: 2,
  },
  tableCol3: {
    flex: 1,
  },
  tableCol4: {
    flex: 1,
  },
  tableCol5: {
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  tableText: {
    textAlign: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  commentInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: "bold",
    color: 'black'
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
  },
  submitButton: {
    backgroundColor: "#0066b2",
  },
  cancelButton: {
    backgroundColor: "red",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default InforDetail;
