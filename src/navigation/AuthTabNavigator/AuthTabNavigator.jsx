import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import register from "../../Login/register";
import login from "../../Login/login";

const Stack = createNativeStackNavigator();

const AuthTabNavigator = () => {
  return (
    <Stack.Navigator>
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

export default AuthTabNavigator;

const styles = StyleSheet.create({});
