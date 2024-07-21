import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Staff from "../../../screens/center/staff/staff";
import staffPost from "../../../screens/center/staff/staffPost";
import StaffDetail from "../../../screens/center/staff/staffDetail";
import staffPut from "../../../screens/center/staff/staffPut";
const Stack = createNativeStackNavigator();
const StaffNavigator = ({ authenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="STAFF"
        component={Staff}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"STAFF_POST"}
        component={staffPost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"STAFF_PUT"}
        component={staffPut}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"STAFF_DETAIL"}
        component={StaffDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StaffNavigator;

const styles = StyleSheet.create({});
