import { Platform, StyleSheet } from "react-native";
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { FontAwesome, MaterialIcons, Feather } from "@expo/vector-icons";
import Booking from './../../manager/booking';
import Product from "../../manager/product";
import ListCar from "../../manager/listCar";
import Staff from "../../manager/staff";
import Logout from "../../manager/logout";
import SparePartNavigator from "./TabNavigator/SparePartNavigator";
import ServiceNavigator from "./TabNavigator/ServiceNavigator";
import StaffNavigator from "./TabNavigator/StaffNavigator";
import CareNavigator from "./TabNavigator/CareNavigator";
import changePassword from "../../screens/center/Profile/changePassword";
import UpdateProfile from './../../screens/center/Profile/updateProfile';

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
        name="CENTER_BOOKING_NAVIGATOR"
        component={Booking}
        options={{
          title: "Lịch đặt",
          drawerIcon: (size, color) => {
            return <FontAwesome name="calendar" size={28} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="PRODUCT_NAVIGATOR"
        children={() => <SparePartNavigator authenticated={authenticated} />}
        options={{
          title: "Phụ tùng",
          drawerIcon: (size, color) => {
            return <FontAwesome name="inbox" size={30} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="SERVICE_NAVIGATOR"
        children={() => <ServiceNavigator authenticated={authenticated} />}
        options={{
          title: "Dịch vụ",
          drawerIcon: (size, color) => {
            return (
              <MaterialIcons
                name="featured-play-list"
                size={24}
                color={color}
              />
            );
          },
        }}
      />
      {/* <Drawer.Screen
        name="CENTER_CAR"
        component={ListCar}
        options={{
          title: "Danh sách xe",
          drawerIcon: (size, color) => {
            return <FontAwesome name="car" size={22} color={color} />;
          },
        }}
      /> */}
      <Drawer.Screen
        name="STAFF_NAVIGATOR"
        children={() => <StaffNavigator authenticated={authenticated} />}
        options={{
          title: "Nhân viên kĩ thuật",
          drawerIcon: (size, color) => {
            return <FontAwesome name="user" size={32} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="CARE_NAVIGATOR"
        children={() => <CareNavigator authenticated={authenticated} />}
        options={{
          title: "Nhân viên CSKH",
          drawerIcon: (size, color) => {
            return <FontAwesome name="user-md" size={32} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name="UPDATE_CENTER_NAVIGATOR"
        component={UpdateProfile}
        options={{
          title: "Sửa thông tin",
          drawerIcon: (size, color) => {
            return <Feather name="edit" size={24} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name={"CHANGE_PASSWORD_CENTER"}
        component={changePassword}
        options={{
          title: "Đổi mật khẩu",
          drawerIcon: ({ size, color }) => {
            return <MaterialIcons name="password" size={24} color={color} />;
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
