import { Platform, StyleSheet } from "react-native";
import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Logout from "../../manager/logout"; 
import HomeScreen from "../../screens/customercare/HomeScreen";
import RequestList from "../../screens/customercare/RequestList";
import HomeScreenNavigator from "./HomeScreenNavigator";
import SettingScreen from "../../screens/Profile/SettingScreen";
import ROUTES from "../../constants/routes";

const Drawer = createDrawerNavigator();

const CustomerCareNavigator = ({ authenticated }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Đóng"
              onPress={() => props.navigation.closeDrawer()}
            />
          </DrawerContentScrollView>
        );
      }}
      drawerPosition="left"
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
      <Drawer.Screen
        name="Trang Chủ"
        component={HomeScreen}
        options={{
          title: "Trang chủ",
          drawerIcon: ({ size, color }) => {
            return <FontAwesome name="home" size={28} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="HOMESCREENNAVIGATOR"
        children={() => <HomeScreenNavigator authenticated={authenticated} />}
        options={{
          title: "Lịch hẹn",
          drawerIcon: ({ size, color }) => {
            return <FontAwesome name="list" size={28} color={color} />;
          },
        }}
      />
      <Drawer.Screen
         name={ROUTES.SETTING}
         component={SettingScreen}
         options={{
          title: "Hồ sơ",
          drawerIcon: ({ size, color }) => {
            return <MaterialIcons name="people" size={24} color={color} />;
          },
        }}
      />
     
      <Drawer.Screen
        name="LOGOUT"
        component={Logout}
        options={{
          title: "Đăng xuất",
          drawerIcon: ({ size, color }) => {
            return <MaterialIcons name="logout" size={24} color={color} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default CustomerCareNavigator;

const styles = StyleSheet.create({});
