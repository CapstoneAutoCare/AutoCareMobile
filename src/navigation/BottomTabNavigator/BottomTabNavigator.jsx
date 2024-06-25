import { Platform, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  FontAwesome,
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import HomeNavigator from "./TabNavigator/HomeNavigator";
import ROUTES from "../../constants/routes";
import SettingScreen from "../../screens/Profile/SettingScreen";
import Booking from "../../screens/client/booking/booking";
import BookingNavigator from "./TabNavigator/BookingNavigator";
import VehicleNavigator from "./TabNavigator/VehicleNavigator";
import MaintenanceCenters from "../../screens/client/maintenanceCenters/maintenanceCenters";

const Stack = createBottomTabNavigator();
const BottomTabNavigator = ({ authenticated }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarIconStyle: {
          color: "red",
          backgroundColor: "red",
        },
        tabBarStyle: {
          backgroundColor: "#DBE9EC",
          height: Platform.OS === "android" ? 55 : 90,
        },
        tabBarActiveTintColor: "#1C6758",
        tabBarLabelStyle: {
          marginBottom: 5,
          fontSize: 12,
        },
      }}
    >
      <Stack.Screen
        name={ROUTES.HOME_NAVIGATOR}
        children={() => <HomeNavigator authenticated={authenticated} />}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="home" size={28} color={color} />;
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.BOOKING_NAVIGATOR}
        children={() => <BookingNavigator authenticated={authenticated} />}
        options={{
          headerShown: false,
          title: "Lịch đặt",
          tabBarIcon: ({ size, color }) => {
            return <Entypo name="calendar" size={28} color={color} />;
          },
        }}
      />
      <Stack.Screen
        name="VEHICLE_NAVIGATOR"
        children={() => <VehicleNavigator authenticated={authenticated} />}
        options={{
          headerShown: false,
          title: "Xe",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="car" size={28} color={color} />;
          },
        }}
      />
      <Stack.Screen
        name={"MAINTENANCE_CENTER"}
        component={MaintenanceCenters}
        options={{
          headerShown: false,
          title: "Trung tâm",
          tabBarIcon: ({ size, color }) => {
            return (
              <MaterialCommunityIcons
                name="home-map-marker"
                size={32}
                color={color}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.SETTING}
        component={SettingScreen}
        options={{
          headerShown: false,
          title: "Hồ sơ",
          tabBarIcon: ({ size, color }) => {
            return <Ionicons name="settings" size={28} color={color} />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
