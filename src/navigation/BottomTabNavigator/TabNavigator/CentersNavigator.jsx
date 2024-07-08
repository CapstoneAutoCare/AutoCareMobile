import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ROUTES from "../../../constants/routes";
import home from "../../../Login/home";
import PostBooking from "../../../screens/client/booking/postBooking";
import Booking from "../../../screens/client/booking/booking";
import MaintenanceCenters from "../../../screens/client/maintenanceCenters/maintenanceCenters";
import CenterDetail from "../../../screens/client/maintenanceCenters/centerDetail";
import ServiceDetail from "../../../screens/center/service/serviceDetail";
import ProductDetail from "../../../screens/center/sparePart/sparePartDetail";
const Stack = createNativeStackNavigator();
const CentersNavigator = ({ authenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"MaintenanceCenters"}
        component={MaintenanceCenters}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"PostBooking"}
        component={PostBooking}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"CenterDetail"}
        component={CenterDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"SERVICE_DETAIL"}
        component={ServiceDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"PRODUCT_DETAIL"}
        component={ProductDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CentersNavigator;

const styles = StyleSheet.create({});
