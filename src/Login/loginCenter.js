import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/userSlice";

export default LoginCenter = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const roles = ["CENTER", "TECHNICAN", "CUSTOMERCARE"];
    let loginSuccess = false;

    for (let role of roles) {
      try {
        const res = await dispatch(
          login({ email: email, password: password, role: role })
        );

        if (res?.meta?.requestStatus === "fulfilled") {
          alert(`Đăng nhập thành công với vai trò ${role}`);
          navigation.navigate("Home");
          loginSuccess = true;
          break;
        }
      } catch (error) {
        console.log(`Đăng nhập thất bại với vai trò ${role}:`, error);
      }
    }

    if (!loginSuccess) {
      alert("Đăng nhập thất bại với tất cả các vai trò");
    }
  };

  const getAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
    console.log("AccessToken: " + "<< " + accessToken + " >>");
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text
          style={{
            fontSize: 30,
            marginTop: "40%",
            textAlign: "center",
            color: "red",
          }}
        >
          AUTO CARE CENTER
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
              secureTextEntry={true}
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
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize: 15,
                color: "red",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Đăng nhập khách hàng ?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterCenter")}
          >
            <Text style={{ fontSize: 15, color: "red", textAlign: "center" }}>
              Đăng ký trung tâm
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingTop: 10,
  },
});