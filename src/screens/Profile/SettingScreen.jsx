import React, { userState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/userSlice";
const SettingScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await dispatch(logout());
    navigation.navigate("Login");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.headerBack}>
          <Icon name="keyboard-arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài đặt</Text>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logout}>
        <Text style={styles.textlogout}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "#DBE9EC",
  },

  settingText: {
    fontSize: 22,
    paddingTop: 10,
  },

  boldText: {
    fontWeight: "bold",
  },
  hr: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    marginBottom: 10,
  },
  settingText1: {
    fontSize: 22,
    position: "absolute",
    right: 0,
    bottom: 0,
  },

  headerBack: {
    right: 15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    right: 30,
    marginBottom: 12,
  },
  logout: {
    borderWidth: 1, 
    borderColor: "white",
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    alignItems: "center",
  },
  textlogout: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default SettingScreen;
