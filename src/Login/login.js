import React, { Component, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/userSlice";
export default Login = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      await dispatch(login({ email: email, password: password })).then(
        (res) => {
          console.log(JSON.stringify(res.meta.requestStatus, null, 2));
          if (res?.meta?.requestStatus === "fulfilled") {
            alert("Đăng nhập thành công");
            navigation.navigate("Home");
          } else {
            alert("Đăng nhập thất bại");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
    console.log("AccessToken: " + "<< " + accessToken + " >>");
  };
  useEffect(() => {
    getAccessToken();
  }, [getAccessToken]);

  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <Text
        style={{
          fontSize: 30,
          marginTop: "40%",
          textAlign: "center",
          color: "red",
        }}
      >
        AUTO CARE
      </Text>
      <View style={{ width: "100%" }}>
        <View style={{ padding: 20 }}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Nhập email của bạn"
            value={email}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          <Text style={styles.text}>Mật khẩu</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Nhập mật khẩu của bạn"
            value={password}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 15,
              color: "red",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Quên mật khẩu ?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ fontSize: 15, color: "red", textAlign: "center" }}>
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textInput: {
    marginBottom: 15,
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 10,
  },
  text: {
    marginBottom: 10,
    fontSize: 15,
  },
  button: {
    margin: 20,
    backgroundColor: "red",
    height: 50,
    borderRadius: 10,
    border: "none",
    paddingTop: 10,
  },
});
