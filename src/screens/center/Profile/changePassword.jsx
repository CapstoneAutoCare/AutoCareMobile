import React, { Component, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
  TextInput,
  Image,
  StyleSheet,
  Modal,
  Button,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-input";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import axios from "axios";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../../constants/colors";
export default ChangePassword = () => {
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const handleSignup = async () => {
    try {
      if (!passwordOld || !passwordHash || !password2) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
       if (passwordHash !== password2) {
         alert("Nhập lại mật khẩu không đúng");
         return;
       }
       setLoad(true);
       const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.patch(
        "http://solv2.runasp.net/api/Accounts/ChangePassword",
        {
          oldPassword: passwordOld,
          newPassword: passwordHash,
          confirmPassword: password2,
        },
        {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setLoad(false);
        alert("thay đổi mật khẩu thành công!");
        navigation.navigate("CENTER_BOOKING_NAVIGATOR");
      } else {
        alert("Mật khẩu củ không đúng. Vui lòng thử lại.");
      }
    } catch (error) {
        setLoad(false);
      console.error("Error during signup:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        console.error("Status code:", error.response.status);
        alert("Mật khẩu củ không đúng. Vui lòng thử lại.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert(
          "No response received from the server. Please check your network connection."
        );
      } else {
        console.error("Error setting up the request:", error.message);
        alert(
          "An error occurred during the request setup. Please check the console for details."
        );
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          paddingHorizontal: 42,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.white,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 12,
            paddingHorizontal: 10,
          }}
        >
          <Ionicons
            name="lock-closed"
            size={24}
            color={COLORS.grey}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
            }}
            placeholder="Mật khẩu củ"
            secureTextEntry={!showPassword3}
            value={passwordOld}
            onChangeText={(text) => setPasswordOld(text)}
            required={true}
          />
          <Pressable onPress={() => setShowPassword3(!showPassword3)}>
            <Ionicons
              name={showPassword3 ? "eye-off" : "eye"}
              size={24}
              color={COLORS.grey}
            />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.white,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 12,
            paddingHorizontal: 10,
          }}
        >
          <Ionicons
            name="lock-closed"
            size={24}
            color={COLORS.grey}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
            }}
            placeholder="Mật khẩu"
            secureTextEntry={!showPassword1}
            value={passwordHash}
            onChangeText={(text) => setPasswordHash(text)}
            required={true}
          />
          <Pressable onPress={() => setShowPassword1(!showPassword1)}>
            <Ionicons
              name={showPassword1 ? "eye-off" : "eye"}
              size={24}
              color={COLORS.grey}
            />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.white,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 12,
            paddingHorizontal: 10,
          }}
        >
          <Ionicons
            name="lock-closed"
            size={24}
            color={COLORS.grey}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
            }}
            placeholder="Nhập lại mật khẩu"
            secureTextEntry={!showPassword2}
            value={password2}
            onChangeText={(text) => setPassword2(text)}
          />
          <Pressable onPress={() => setShowPassword2(!showPassword2)}>
            <Ionicons
              name={showPassword2 ? "eye-off" : "eye"}
              size={24}
              color={COLORS.grey}
            />
          </Pressable>
        </View>

        {load ? (
          <Pressable
            style={{
              backgroundColor: "red",
              marginTop: 20,
              paddingVertical: 15,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Đang thay đổi ...
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={{
              backgroundColor: "red",
              marginTop: 20,
              paddingVertical: 15,
              borderRadius: 10,
              alignItems: "center",
            }}
            onPress={handleSignup}
          >
            <Text
              style={{
                color: COLORS.white,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Thay đổi
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    marginBottom: 15,
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },
  textCode: {
    marginBottom: 15,
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 10,
    marginRight: 5,
  },
  text: {
    marginBottom: 10,
    fontSize: 20,
  },
  button: {
    margin: 20,
    backgroundColor: "red",
    height: 50,
    borderRadius: 10,
    border: "none",
    paddingTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
