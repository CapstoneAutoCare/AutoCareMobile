import React, { userState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/userSlice";
import { useSelector } from "react-redux";
const SettingScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  // const { profile } = useSelector((state) => state.user);
  const profile = {
    accountId: "17cd9ff4-f95b-4db7-92a1-f6cb2d60e7bf",
    clientId: "d3ea88fa-3fe2-4ed1-b8c2-f51bf138aa0e",
    email: "c1",
    password: "1",
    role: "CLIENT",
    gender: "1",
    phone: "1",
    createdDate: "2024-06-17T16:45:00.8971832",
    logo: "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
    firstName: "P",
    lastName: "D",
    address: "98C Đ. Hồ Bá Phấn, Phước Long A, Thủ Đức, Thành phố Hồ Chí Minh",
    birthday: "2024-06-17T16:45:00.8971825",
    status: "ACTIVE",
  };
  console.log("🚀 ~ SettingScreen ~ profile:", profile)
  const handleLogout = async () => {
    await dispatch(logout());
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Hồ sơ</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logout}>
            <Text style={styles.textlogout}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>

        {profile && (
          <>
            <View style={styles.profileContainer}>
              <Image source={{ uri: profile.logo }} style={styles.avatar} />
              <Text style={styles.profileName}>
                {profile.firstName} {profile.lastName}
              </Text>
            </View>
            <View style={styles.card}>
              {/* <Text style={styles.profileItem}>
                <Text style={styles.boldText}>ID tài khoản:</Text>{" "}
                {profile.accountId}
              </Text>
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>ID khách hàng:</Text>{" "}
                {profile.clientId}
              </Text> */}
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>Email:</Text> {profile.email}
              </Text>
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>Role:</Text> {profile.role}
              </Text>
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>Giới tính:</Text>{" "}
                {profile.gender === "1" ? "Nam" : "Nữ"}
              </Text>
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>Số điện thoại:</Text>{" "}
                {profile.phone}
              </Text>
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>Ngày tạo:</Text>{" "}
                {new Date(profile.createdDate).toLocaleDateString()}
              </Text>
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>Địa chỉ:</Text> {profile.address}
              </Text>
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>Ngày sinh:</Text>{" "}
                {new Date(profile.birthday).toLocaleDateString()}
              </Text>
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>Trạng thái:</Text>{" "}
                {profile.status}
              </Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "#f0f0f0",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 15,
    marginBottom: 20,
  },
  headerBack: {
    right: 15,
  },
  headerTitle: {
    // flex: 1,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    // right: 30,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  profileItem: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555",
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
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
