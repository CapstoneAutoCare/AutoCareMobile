import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { getListBookingByClient } from "../../../app/Booking/actions";
import { useNavigation } from "@react-navigation/native";

const Booking = () => {
    const navigation = useNavigation();
   const dispatch = useDispatch();
    const { bookingListByClient } = useSelector((state) => state.booking);
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
  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ padding: 12 }}>
        <View
        >
          <Pressable
            onPress={() => navigation.navigate("PostBooking")}
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
        </View>
        <View>
          {bookingListByClient.length > 0 &&
            bookingListByClient.map((item, index) => (
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
                      thông tin xe
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
                      Trạng thái
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
                        width: 200,
                      }}
                    >
                      note : {item?.note}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "gray",
                        width: 200,
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

                  <View style={{ alignItems: "center" }}>
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: "#F0F8FF",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="note-outline"
                        size={24}
                        color="black"
                      />
                    </View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 13,
                        fontWeight: "500",
                      }}
                    >
                      Thông tin
                    </Text>
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: "#F0F8FF",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <FontAwesome
                        name="folder-open-o"
                        size={24}
                        color="black"
                      />
                    </View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 13,
                        fontWeight: "500",
                      }}
                    >
                      Nhận xét
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Booking;

const styles = StyleSheet.create({});
