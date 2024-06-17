import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { getListBooking } from "../app/Booking/actions";

const Booking = () => {
   const dispatch = useDispatch();
    const bookingList = useSelector((state) => state.booking.bookingList);
    const fetchGetListBooking = async () => {
      await dispatch(getListBooking());
    };

  useEffect(() => {
    const fetch = async () => {
      await fetchGetListBooking();
    };
    fetch();
  }, []);
  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ padding: 12, height: 200, backgroundColor: "#DDD" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* <Octicons name="three-bars" size={24} color="white" /> */}
        </View>

        <View>
          {bookingList.length > 0 &&
            bookingList.map((item, index) => (
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
                      {moment(item?.bookingDate).format("DD/MM/YYYY")}
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
