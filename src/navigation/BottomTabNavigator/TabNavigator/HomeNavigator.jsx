import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ROUTES from "../../../constants/routes";
import AuthTabNavigator from "../../AuthTabNavigator/AuthTabNavigator";
import home from "../../../Login/home";
import MaintenanceInformations from "../../../screens/client/maintenanceInformations/maintenanceInformations";
import InforDetail from "../../../screens/client/maintenanceInformations/inforDetail";
import Receipts from "../../../screens/client/maintenanceInformations/receipts";
const Stack = createNativeStackNavigator();
const HomeNavigator = ({ authenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.HOME}
        component={MaintenanceInformations}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InforDetail"
        component={InforDetail}
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

export default HomeNavigator;

const styles = StyleSheet.create({});
