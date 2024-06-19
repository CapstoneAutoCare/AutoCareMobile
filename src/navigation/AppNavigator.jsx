import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loadAuthState } from "../features/userSlice";
import HomeNavigator from "../navigation/HomeNavigator/HomeNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ManagerNavigator from "./BottomTabNavigator/TabNavigator/ManagerNavigator";
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const dispatch = useAppDispatch();
    const authenticated = useAppSelector((state) => state.user.authenticated);
  const fetchLoadAuthState = async () => {
    await dispatch(loadAuthState());
  };
    console.log("authenticated: ", authenticated);
  React.useEffect(() => {
    fetchLoadAuthState();
  }, []);

  const [firstLaunch, setFirstLaunch] = React.useState(null);
  React.useEffect(() => {
    async function setData() {
      await AsyncStorage.getItem("appLaunched").then((value) => {
        if (value === "true") {
          setFirstLaunch(false);
        } else {
          setFirstLaunch(true);
        }
      });
    }
    setData();
  }, []);
  return (
    firstLaunch !== null && (
      <Stack.Navigator>
        <Stack.Screen
          name="tab"
          children={() => <ManagerNavigator authenticated={authenticated} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    )
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
