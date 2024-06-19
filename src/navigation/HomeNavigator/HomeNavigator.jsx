import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import login from "../../Login/login";
import register from "../../Login/register";
import BottomTabNavigator from "../BottomTabNavigator/BottomTabNavigator";
import ManagerNavigator from "../BottomTabNavigator/TabNavigator/ManagerNavigator";

const Stack = createNativeStackNavigator();
const HomeNavigator = ({ authenticated }) => {
  console.log(authenticated);
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Home"
        children={() => <ManagerNavigator authenticated={authenticated} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Login"}
        component={login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Register"}
        component={register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({});