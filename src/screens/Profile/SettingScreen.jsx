import React, { userState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAppDispatch } from "../../app/hooks";
import { getProfile } from "../../features/userSlice";
import { useSelector } from "react-redux";
const SettingScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { profile } = useSelector((state) => state.user);
      const fetchGetListBooking = async () => {
        await dispatch(getProfile());
      };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchGetListBooking();
    });
    fetchGetListBooking();
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={styles.container}>
        {profile && (
          <>
            <View style={styles.profileContainer}>
              <Image source={{ uri: profile.Logo }} style={styles.avatar} />
              <Text style={styles.profileName}>
                {profile.FirstName} {profile.LastName}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>Email:</Text> {profile.Email}
              </Text>
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>Role:</Text> {profile.Role}
              </Text>
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>Giới tính:</Text>{" "}
                {profile.Gender === "1" ? "Nam" : "Nữ"}
              </Text>
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>Số điện thoại:</Text>{" "}
                {profile.Phone}
              </Text>
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>Ngày tạo:</Text>{" "}
                {new Date(profile.CreatedDate).toLocaleDateString()}
              </Text>
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>Địa chỉ:</Text> {profile.Address}
              </Text>
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>Ngày sinh:</Text>{" "}
                {new Date(profile.Birthday).toLocaleDateString()}
              </Text>
              <Text style={styles.profileItem}>
                <Text style={styles.boldText}>Trạng thái:</Text>{" "}
                {profile.Status}
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
