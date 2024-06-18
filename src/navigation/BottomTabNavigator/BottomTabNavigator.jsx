import { Platform, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import HomeNavigator from "./TabNavigator/HomeNavigator";
import ROUTES from "../../constants/routes";
import ProfileNavigator from "./TabNavigator/ProfileNavigator";

const Stack = createBottomTabNavigator();
const BottomTabNavigator = ({ authenticated }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarIconStyle: {
          color: "red",
          backgroundColor: "red",
        },
        tabBarStyle: {
          backgroundColor: "#DBE9EC",
          height: Platform.OS === "android" ? 55 : 90,
        },
        tabBarActiveTintColor: "#1C6758",
        tabBarLabelStyle: {
          marginBottom: 5,
          fontSize: 12,
        },
      }}
    >
      <Stack.Screen
        name={ROUTES.HOME_NAVIGATOR}
        children={() => <HomeNavigator authenticated={authenticated} />}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="home" size={28} color={color} />;
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.SETTING_NAVIGATOR}
        children={() => <ProfileNavigator authenticated={authenticated} />}
        options={{
          headerShown: false,
          title: "Setting",
          tabBarIcon: ({ size, color }) => {
            return <Ionicons name="settings" size={28} color={color} />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
