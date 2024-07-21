import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Care from "../../../screens/center/care/care";
import carePost from "../../../screens/center/care/carePost";
import CareDetail from "../../../screens/center/care/careDetail";
import CarePut from './../../../screens/center/care/carePut';
const Stack = createNativeStackNavigator();
const CareNavigator = ({ authenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CARE"
        component={Care}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"CARE_POST"}
        component={carePost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"CARE_PUT"}
        component={CarePut}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"CARE_DETAIL"}
        component={CareDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CareNavigator;

const styles = StyleSheet.create({});
