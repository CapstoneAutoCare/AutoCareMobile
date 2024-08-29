import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VehiclePost from "../../../screens/client/vehicle/postVehicle";
import Vehicle from "../../../screens/client/vehicle/vehicle";
import VehicleDetail from "../../../screens/client/vehicle/VehicleDetail";
const Stack = createNativeStackNavigator();
const VehicleNavigator = ({ authenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VEHICLE"
        component={Vehicle}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VEHICLE_POST"
        component={VehiclePost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VEHICLE_DETAIL"
        component={VehicleDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default VehicleNavigator;

const styles = StyleSheet.create({});
