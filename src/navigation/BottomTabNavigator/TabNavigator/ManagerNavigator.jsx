import { StyleSheet, Image, Platform } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Booking from "../../../manager/booking";
import Product from "../../../manager/product";
import ListCar from "../../../manager/listCar";
import Staff from "../../../manager/staff";
import Logout from "../../../manager/logout";
const Drawer = createDrawerNavigator();
const ManagerNavigator = ({ authenticated }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
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
        name="Lịch đặt"
        component={Booking}
        options={{
          drawerIcon: (size, color) => {
            return <FontAwesome name="calendar" size={28} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Sản phẩm"
        component={Product}
        options={{
          drawerIcon: (size, color) => {
            return <FontAwesome name="inbox" size={30} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Danh sách xe"
        component={ListCar}
        options={{
          drawerIcon: (size, color) => {
            return <FontAwesome name="car" size={22} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Nhân viên"
        component={Staff}
        options={{
          drawerIcon: (size, color) => {
            return <FontAwesome name="user" size={32} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="Đăng xuất"
        component={Logout}
        options={{
          drawerIcon: (size, color) => {
            return <MaterialIcons name="logout" size={24} color={color} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default ManagerNavigator;

const styles = StyleSheet.create({});
