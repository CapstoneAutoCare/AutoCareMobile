import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "../../Login/login";
import LoginCenter from "../../Login/loginCenter";
import Register from "../../Login/register";
import BottomTabNavigator from "../BottomTabNavigator/BottomTabNavigator";
import ManagerNavigator from "../BottomTabNavigator/TabNavigator/ManagerNavigator";
import CenterTabNavigator from "../CenterTabNavigator/CenterTabNavigator";
import CustomerCareNavigator from "../CustomerCareNavigator/CustomerCareNavigator";
import TechnicianNavigator from "../TechicianNavigator/TechnicianNavigator"
import RegisterCenter from './../../Login/registerCenter';
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
            name="LoginCenter"
            component={LoginCenter}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterCenter"
            component={RegisterCenter}
            options={{ headerShown: false }}
          />
        </>
      ) : role === "CENTER" ? (
        <Stack.Screen
          name="Home"
          component={CenterTabNavigator}
          options={{ headerShown: false }}
        />
      ) : role === "CUSTOMERCARE" ? (
        <Stack.Screen
          name="Home"
          component={CustomerCareNavigator}
          options={{ headerShown: false }}
        />
      ) : role === "TECHNICAN" ? (
        <Stack.Screen
          name="Home"
          component={TechnicianNavigator}
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