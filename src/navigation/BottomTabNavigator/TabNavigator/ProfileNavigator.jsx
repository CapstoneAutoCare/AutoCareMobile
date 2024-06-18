import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ROUTES from "../../../constants/routes";
import SettingScreen from "../../../screens/Profile/SettingScreen";
const Stack = createNativeStackNavigator();
const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.SETTING}
        component={SettingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

const styles = StyleSheet.create({});
