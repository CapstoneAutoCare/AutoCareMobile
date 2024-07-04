import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Service from "../../../screens/center/service/service";
import ServiceDetail from "../../../screens/center/service/serviceDetail";
import ServicePost from "../../../screens/center/service/servicePost";
import ServicePut from './../../../screens/center/service/servicePut';
const Stack = createNativeStackNavigator();
const ServiceNavigator = ({ authenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SERVICE"
        component={Service}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"SERVICE_POST"}
        component={ServicePost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"SERVICE_PUT"}
        component={ServicePut}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"SERVICE_DETAIL"}
        component={ServiceDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ServiceNavigator;

const styles = StyleSheet.create({});
