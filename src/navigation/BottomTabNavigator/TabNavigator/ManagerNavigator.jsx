import { StyleSheet, Image } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Booking from "../../../manager/booking";
import Product from "../../../manager/product";
import ListCar from "../../../manager/listCar";
import Staff from "../../../manager/staff";
const Drawer = createDrawerNavigator();
const ManagerNavigator = ({ authenticated }) => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Lịch đặt"
        component={Booking}
        options={{
          drawerIcon: () => (
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../../Login/images/clipboard.png")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Sản phẩm"
        component={Product}
        options={{
          drawerIcon: () => (
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../../Login/images/product.png")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Danh sách xe"
        component={ListCar}
        options={{
          drawerIcon: () => (
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../../Login/images/sedan.png")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Nhân viên"
        component={Staff}
        options={{
          drawerIcon: () => (
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../../Login/images/staff.png")}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Đăng xuất"
        component={Logout}
        options={{
          drawerIcon: () => (
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../../Login/images/staff.png")}
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default ManagerNavigator;

const styles = StyleSheet.create({});
