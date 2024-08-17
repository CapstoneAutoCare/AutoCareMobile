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
import ServiceItem from "../../../components/ServiceItem";
import ProductItem from "../../../components/ProductItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const InforDetail = ({ route }) => {
  const { info } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { receiptById } = useSelector((state) => state.center);
  const [isModalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchGetListSparePart = async () => {
      await dispatch(getReceiptById(info?.informationMaintenanceId));
    };
    fetchGetListSparePart();
  }, [info]);

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleRatingSubmit = async () => {
    try {
      if (!comment) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.post(
        "https://capstoneautocareapi20240816003911.azurewebsites.net/api/Feedback/Post",
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
        toggleModal();
        alert("đánh giá thành công!");
      } else {
        alert("đánh giá không thành công. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error during:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        console.error("Status code:", error.response.status);
        alert(
          "Server responded with an error. Please check the console for details."
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert(
          "No response received from the server. Please check your network connection."
        );
      } else {
        console.error("Error setting up the request:", error.message);
        alert(
          "An error occurred during the request setup. Please check the console for details."
        );
      }
    }
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
          </View>
          {info.status === "YETPAID" && (
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
            <Pressable onPress={toggleModal} style={styles.button}>
              <Text style={{ color: "white" }}>Đánh giá</Text>
            </Pressable>
          )}
        </View>
      )}
      <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
        Danh sách dịch vụ
      </Text>
      <View style={styles.listContainer}>
        {info?.responseMaintenanceServiceInfos.length > 0 ? (
          info?.responseMaintenanceServiceInfos.map((item, index) => (
            <ServiceItem item={item} key={index} />
          ))
        ) : (
          <View style={styles.noItem}>
            <Text style={styles.noItemText}>không có dịch vụ</Text>
          </View>
        )}
      </View>
      <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
        Danh sách phụ tùng
      </Text>
      <View style={styles.listContainer}>
        {info?.responseMaintenanceSparePartInfos.length > 0 ? (
          info?.responseMaintenanceSparePartInfos.map((item, index) => (
            <ProductItem item={item} key={index} />
          ))
        ) : (
          <View style={styles.noItem}>
            <Text style={styles.noItemText}>không có dịch vụ</Text>
          </View>
        )}
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Đánh giá</Text>
          <Rating
            // showRating
            fractions={1}
            // startingValue={1}
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
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  noItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  noItemText: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
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
