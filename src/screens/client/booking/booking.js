import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { getListBookingByClient } from "../../../app/Booking/actions";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { cancel } from "../../../app/Center/actions";

const Booking = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { bookingListByClient } = useSelector((state) => state.booking);
  const [sortStatus, setSortStatus] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchGetListBooking = async () => {
    await dispatch(getListBookingByClient());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchGetListBooking();
    });
    fetchGetListBooking();
    return unsubscribe;
  }, [navigation]);

  const handleSortPress = () => {
    setModalVisible(true);
  };

  const handleStatusSelect = (status) => {
    setSortStatus(status);
    setModalVisible(false);
  };

  const sortedBookingList = sortStatus
    ? bookingListByClient.filter((item) => item.status === sortStatus)
    : bookingListByClient;
  const handleCancel = async (id) => {
    await dispatch(cancel(id));
    alert("hủy đặt lịch thành công!");
    fetchGetListBooking();
  };
  return (
    <ScrollView style={{ marginTop: 10 }}>
      <View style={{ padding: 12 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            onPress={() =>
              navigation.navigate("PostBooking", {
                maintenanceCenterId: "",
              })
            }
            style={{
              backgroundColor: "#52c41a",
              padding: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white" }}>+ Lên lịch sửa xe</Text>
          </Pressable>
          <Pressable
            onPress={handleSortPress}
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              borderRadius: 20,
              width: 120,
              justifyContent: "center",
            }}
          >
            <Text style={{ marginRight: 6 }}>Sắp xếp</Text>
            <Ionicons name="filter" size={20} color="black" />
          </Pressable>
        </View>
        <View>
          {sortedBookingList.length > 0 &&
            sortedBookingList.map((item, index) => (
              <Pressable
                style={{
                  marginVertical: 12,
                  backgroundColor: "white",
                  borderRadius: 7,
                }}
                key={index}
              >
                <View
                  style={{
                    backgroundColor: "#0066b2",
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTopLeftRadius: 7,
                    borderTopRightRadius: 7,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "500",
                      }}
                    >
                      THÔNG TIN XE
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "500",
                        marginTop: 3,
                      }}
                    >
                      {item?.responseVehicles.vehicleModelName} -{" "}
                      {item?.responseVehicles.vehiclesBrandName}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "500",
                      }}
                    >
                      TRẠNG THÁI
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "500",
                        marginTop: 4,
                      }}
                    >
                      {item?.status}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: "white",
                    marginHorizontal: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "gray",
                      }}
                    >
                      Note : {item?.note}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "gray",
                      }}
                    >
                      Ngày đặt :{" "}
                      {moment(item?.bookingDate).format("DD/MM/YYYY HH:mm")}
                    </Text>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ fontSize: 13, fontWeight: "600" }}>
                        Tên trung tâm
                      </Text>
                      <Text style={{ fontSize: 15, marginTop: 4 }}>
                        {item?.responseCenter.maintenanceCenterName}
                      </Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ fontSize: 13, fontWeight: "600" }}>
                        Tên khách hàng
                      </Text>
                      <Text style={{ fontSize: 15, marginTop: 4 }}>
                        {item?.responseClient.firstName}{" "}
                        {item?.responseClient.lastName}
                      </Text>
                    </View>
                    <View style={{ marginBottom: 20 }} />
                  </View>
                </View>
                <View
                  style={{
                    paddingBottom: 12,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Pressable
                    onPress={() =>
                      navigation.navigate("BookingDetail", {
                        bookingId: item?.bookingId,
                      })
                    }
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#0066b2",
                      padding: 10,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 10,
                      marginTop: 10,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="note-outline"
                      size={24}
                      color="white"
                    />
                    <Text style={{ color: "white" }}>Thông tin</Text>
                  </Pressable>
                  {item?.status === "WAITING" && (
                    <Pressable
                      onPress={() => handleCancel(item?.bookingId)}
                      style={{
                        flexDirection: "row",
                        backgroundColor: "#f5222d",
                        padding: 10,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 10,
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ color: "white" }}>Hủy đặt lịch</Text>
                    </Pressable>
                  )}
                </View>
              </Pressable>
            ))}
        </View>
      </View>

      {/* Modal for sorting */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn Trạng Thái</Text>
            {["ACCEPTED", "WAITING", "CANCELLED"].map((status) => (
              <TouchableOpacity
                key={status}
                style={styles.modalButton}
                onPress={() => handleStatusSelect(status)}
              >
                <Text style={styles.modalButtonText}>{status}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "red" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Booking;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#0066b2",
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});
