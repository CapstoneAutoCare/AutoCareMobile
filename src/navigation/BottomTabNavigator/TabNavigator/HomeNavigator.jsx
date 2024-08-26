import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ROUTES from "../../../constants/routes";
import AuthTabNavigator from "../../AuthTabNavigator/AuthTabNavigator";
import home from "../../../Login/home";
import MaintenanceInformations from "../../../screens/client/maintenanceInformations/maintenanceInformations";
import InforDetail from "../../../screens/client/maintenanceInformations/inforDetail";
import Receipts from "../../../screens/client/maintenanceInformations/receipts"
import MainScreen from "../../../screens/client/mainScreen";
import BookingNavigator from "./BookingNavigator";
import VehicleNavigator from "./VehicleNavigator";
import CentersNavigator from "./CentersNavigator";

const Stack = createNativeStackNavigator();
const HomeNavigator = ({ authenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.HOME}
        component={MainScreen}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.BOOKING_NAVIGATOR}
        children={() => <BookingNavigator authenticated={authenticated} />}
        options={{
          // headerShown: false,
          title: "Lịch đặt",
          tabBarIcon: ({ size, color }) => {
            return <Entypo name="calendar" size={28} color={color} />;
          },
        }}
      />
       <Stack.Screen
        name={"MaintenanceInformations"}
        children={() => <MaintenanceInformations authenticated={authenticated} />}
        options={{
          // headerShown: false,
          title: "Thông Tin Bảo Trì Sửa Chữa",
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
        children={() => <CentersNavigator authenticated={authenticated} />}
        options={{
          // headerShown: false,
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
      {!authenticated && (
        <Stack.Screen
          name={"AUTH_NAVIGATOR"}
          component={AuthTabNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({});
