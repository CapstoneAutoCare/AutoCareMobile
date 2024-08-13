import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CreateBooking from "./createBooking";
import CreateBookingHaveItem from "./createBookingHaveItem";
import { getListCenter } from "../../../app/Center/actions";
import { getListVehicleByClient } from "../../../app/Vehicle/actions";

const PostBooking = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { maintenanceCenterId, tab } = route.params;
  // const Tab = createMaterialTopTabNavigator();
  const { centerList } = useSelector((state) => state.center);
  const { vehicleListByClient } = useSelector((state) => state.vehicle);
  const fetchGetListCenter = async () => {
    await dispatch(getListCenter());
  };
  const fetchGetListVehicle = async () => {
    await dispatch(getListVehicleByClient());
  };
  useEffect(() => {
    const fetch = async () => {
      await fetchGetListCenter();
      await fetchGetListVehicle();
    };
    fetch();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            marginLeft: 10,
            marginRight: 10,
            width: 50,
            padding: 7,
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.name}>{!tab?"Đặt lịch":"Đặt lịch theo combo"}</Text>
        </View>
      </View>
      <View style={styles.hr} />
      {tab ? (
        <CreateBooking
          centerList={centerList}
          maintenanceCenterId={maintenanceCenterId}
          vehicleListByClient={vehicleListByClient}
        />
      ) : (
        <CreateBookingHaveItem
          centerList={centerList}
          maintenanceCenterId={maintenanceCenterId}
          vehicleListByClient={vehicleListByClient}
        />
      )}

      {/* <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#1C6758",
          tabBarInactiveTintColor: "gray",
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle: { backgroundColor: "#1C6758" },
          tabBarStyle: { backgroundColor: "white" },
        }}
      >
        <Tab.Screen
          name="Lên lịch"
          component={() => (
            <CreateBooking
              centerList={centerList}
              maintenanceCenterId={maintenanceCenterId}
              vehicleListByClient={vehicleListByClient}
            />
          )}
        />
        <Tab.Screen
          name="Lên lịch và dịch vụ"
          component={() => (
            <CreateBookingHaveItem
              centerList={centerList}
              maintenanceCenterId={maintenanceCenterId}
              vehicleListByClient={vehicleListByClient}
            />
          )}
        />
      </Tab.Navigator> */}
    </View>
  );
};

export default PostBooking;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
  },
  hr: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
