import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/userSlice";

const Logout = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleLogout = async () => {
      await dispatch(logout());
      navigation.replace("Login");
    };

    handleLogout();
  }, [navigation]);
  return (
    <View>
      <Text>đang đăng xuất...</Text>
    </View>
  );
};

export default Logout;
