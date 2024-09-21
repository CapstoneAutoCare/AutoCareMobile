import { Platform, StyleSheet } from "react-native";
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import ROUTES from "../../../constants/routes";
import SettingScreen from "../../../screens/Profile/SettingScreen";
import Logout from "../../../manager/logout";
import UpdateProfile from './../../../screens/Profile/updateProfile';
import ChangePassword from './../../../screens/Profile/changePassword';
import TransactionHistoryScreen from "../../../screens/Profile/transactionHistory";
const Drawer = createDrawerNavigator();

const ProfileNavigator = () => {
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
      drawerPosition="right"
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
        name={ROUTES.SETTING}
        component={SettingScreen}
        options={{
          title: "Trang cá nhân",
          drawerIcon: ({ size, color }) => {
            return <FontAwesome name="user" size={28} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name={"TRANSACTION_HISTORY"}
        component={TransactionHistoryScreen}
        options={{
          title: "Lịch Sử Giao Dịch",
          drawerIcon: ({ size, color }) => {
            return <FontAwesome name="history" size={28} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name={"UPDATE_PROFILE"}
        component={UpdateProfile}
        options={{
          title: "Sửa thông tin",
          drawerIcon: ({ size, color }) => {
            return <Feather name="edit" size={24} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name={"CHANGE_PASSWORD"}
        component={ChangePassword}
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

export default ProfileNavigator;

const styles = StyleSheet.create({});
