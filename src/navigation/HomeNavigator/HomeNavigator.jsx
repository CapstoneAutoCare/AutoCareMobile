import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "../../Login/login";
import Register from "../../Login/register";
import BottomTabNavigator from "../BottomTabNavigator/BottomTabNavigator";
import ManagerNavigator from "../BottomTabNavigator/TabNavigator/ManagerNavigator";
import CenterTabNavigator from "../CenterTabNavigator/CenterTabNavigator";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const HomeNavigator = ({ authenticated, role }) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      {!authenticated ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </>
      ) : role === "CENTER" ? (
        <Stack.Screen
          name="CENTER_BOOKING"
          component={CenterTabNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({});