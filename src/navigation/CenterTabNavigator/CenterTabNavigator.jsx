import { Platform, StyleSheet } from "react-native";
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Booking from './../../manager/booking';
import Product from "../../manager/product";
import ListCar from "../../manager/listCar";
import Staff from "../../manager/staff";
import Logout from "../../manager/logout";
import SparePartNavigator from "./TabNavigator/SparePartNavigator";

const Drawer = createDrawerNavigator();
const CenterTabNavigator = ({ authenticated }) => {
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
        name="CENTER_BOOKING"
        component={Booking}
        options={{
          title: "Lịch đặt",
          drawerIcon: (size, color) => {
            return <FontAwesome name="calendar" size={28} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="PRODUCT"
        children={() => <SparePartNavigator authenticated={authenticated} />}
        options={{
          title: "Phụ tùng",
          drawerIcon: (size, color) => {
            return <FontAwesome name="inbox" size={30} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="CENTER_CAR"
        component={ListCar}
        options={{
          title: "Danh sách xe",
          drawerIcon: (size, color) => {
            return <FontAwesome name="car" size={22} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="STAFF"
        component={Staff}
        options={{
          title: "Nhân viên",
          drawerIcon: (size, color) => {
            return <FontAwesome name="user" size={32} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="LOGOUT"
        component={Logout}
        options={{
          title: "Đăng xuất",
          drawerIcon: (size, color) => {
            return <MaterialIcons name="logout" size={24} color={color} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default CenterTabNavigator;

const styles = StyleSheet.create({});
