import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { getListVehicleByClient } from "../../../app/Vehicle/actions";

const Vehicle = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { vehicleListByClient } = useSelector((state) => state.vehicle);
  const fetchGetListBooking = async () => {
    await dispatch(getListVehicleByClient());
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
        <View>
          <Pressable
            onPress={() => navigation.navigate("VEHICLE_POST")}
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
            <Text style={{ color: "white" }}>+ Tạo xe</Text>
          </Pressable>
        </View>
        <View>
          {vehicleListByClient.length > 0 &&
            vehicleListByClient.map((item, index) => (
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
                      {item?.vehicleModelName} - {item?.vehiclesBrandName}
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
                      thông tin : {item?.description}
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
                      Màu xe : {item?.color}
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
                      Ngày tạo :{" "}
                      {moment(item?.createdDate).format("DD/MM/YYYY HH:mm")}
                    </Text>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ fontSize: 13, fontWeight: "600" }}>
                        biển số xe
                      </Text>
                      <Text style={{ fontSize: 15, marginTop: 4 }}>
                        {item?.licensePlate}
                      </Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ fontSize: 13, fontWeight: "600" }}>
                        số km đã đi được
                      </Text>
                      <Text style={{ fontSize: 15, marginTop: 4 }}>
                        {item?.odo}
                      </Text>
                    </View>
                    <View style={{ marginBottom: 20 }} />
                  </View>
                </View>
              </Pressable>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Vehicle;

const styles = StyleSheet.create({});
