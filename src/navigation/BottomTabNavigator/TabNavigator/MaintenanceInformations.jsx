import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PostBooking from "../../../screens/client/booking/postBooking";
import BookingDetail from "../../../screens/client/booking/bookingDetail";
import MaintenanceInformationsList from "../../../screens/client/maintenanceInformations/maintenanceInformationslist";
import { Drawer } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
const MaintenanceInformations = ({ authenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MaintenanceInformations"
        component={MaintenanceInformationsList}
        options={{ headerShown: false }}
      />
      
      {/* <Stack.Screen
        name={"PostBooking"}
        component={PostBooking}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"BookingDetail"}
        component={BookingDetail}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default MaintenanceInformations;

const styles = StyleSheet.create({});
