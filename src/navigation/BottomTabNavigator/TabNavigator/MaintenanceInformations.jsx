import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthTabNavigator from "../../AuthTabNavigator/AuthTabNavigator";
import PostBooking from "../../../screens/client/booking/postBooking";
import BookingDetail from "../../../screens/client/booking/bookingDetail";
import MaintenanceInformations from "../../../screens/client/maintenanceInformations/maintenanceInformations";
import { Drawer } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import InforDetail from "../../../screens/client/maintenanceInformations/inforDetail";
import Receipts from "../../../screens/client/maintenanceInformations/receipts";
import HistoryDetail from "../../../screens/client/maintenanceInformations/historyDetail";
const Stack = createNativeStackNavigator();
const MaintenanceInfor = ({ authenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MaintenanceInformations"
        component={MaintenanceInformations}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="InforDetail"
        component={InforDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HistoryDetail"
        component={HistoryDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Receipts"
        component={Receipts}
        options={{ headerShown: false }}
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

export default MaintenanceInfor;

const styles = StyleSheet.create({});
