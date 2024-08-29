import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { getListVehicleByClient } from "../../../app/Vehicle/actions";

const Vehicle = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { vehicleListByClient } = useSelector((state) => state.vehicle);

  const fetchGetListBooking = async () => {
    try {
      await dispatch(getListVehicleByClient());
    } catch (error) {
      console.error("Error fetching vehicle list: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchGetListBooking();
    });
    fetchGetListBooking();
    return unsubscribe;
  }, [navigation,]);

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ padding: 12 }}>
        <View>
          <Pressable
            onPress={() => navigation.navigate("VEHICLE_POST")}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>+ Tạo xe</Text>
          </Pressable>
        </View>
        <View>
          {vehicleListByClient.length > 0 &&
            vehicleListByClient.map((item, index) => (
              <Pressable
                style={styles.vehicleCard}
                key={index}
              >
                <View style={styles.vehicleCardHeader}>
                  <View>
                    <Text style={styles.vehicleHeaderText}>THÔNG TIN XE</Text>
                    <Text style={styles.vehicleSubHeaderText}>
                      {item?.vehicleModelName} - {item?.vehiclesBrandName}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.vehicleHeaderText}>TRẠNG THÁI</Text>
                    <Text style={styles.vehicleSubHeaderText}>
                      {item?.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.vehicleCardBody}>
                  <View>
                    <Text style={styles.infoText}>Thông tin : {item?.description}</Text>
                    <Text style={styles.infoText}>Màu xe : {item?.color}</Text>
                    <Text style={styles.infoText}>Ngày tạo : {moment(item?.createdDate).format("DD/MM/YYYY HH:mm")}</Text>
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Biển số xe</Text>
                      <Text style={styles.infoValue}>{item?.licensePlate}</Text>
                    </View>
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Số km đã đi được</Text>
                      <Text style={styles.infoValue}>{item?.odo}</Text>
                    </View>
                  </View>
                </View>

                <Pressable
                  onPress={() => navigation.navigate("VEHICLE_DETAIL", { vehicle: item, setLoading: setLoading })}
                  style={styles.detailButton}
                >
                  <Text style={styles.detailButtonText}>Chi tiết</Text>
                </Pressable>
              </Pressable>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#52c41a",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
  },
  vehicleCard: {
    marginVertical: 12,
    backgroundColor: "white",
    borderRadius: 7,
  },
  vehicleCardHeader: {
    backgroundColor: "#0066b2",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  vehicleHeaderText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  vehicleSubHeaderText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 3,
  },
  vehicleCardBody: {
    backgroundColor: "white",
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "gray",
    width: 200,
  },
  infoBlock: {
    marginTop: 10,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 15,
    marginTop: 4,
  },
  detailButton: {
    backgroundColor: "#f39c12",
    padding: 10,
    borderRadius: 7,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  detailButtonText: {
    color: "white",
  },
});

export default Vehicle;
