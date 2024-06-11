import React, { Component, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    StyleSheet
} from 'react-native';
export default Login = ({ navigation }) => {
    return (
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <Text
          style={{
            fontSize: 30,
            marginTop: "70%",
            textAlign: "center",
            color: "red",
          }}
        >
          AUTO CARE
        </Text>
        <View style={{ width: "100%" }}>
          <View style={{ padding: 20 }}>
            <Text style={styles.text}>Số điện thoại</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập số điện thoại của bạn"
            ></TextInput>
            <Text style={styles.text}>Mật khẩu</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập mật khẩu của bạn"
            ></TextInput>
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ManagerTab")}
          >
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
}
const styles = StyleSheet.create({
    textInput: {
        marginBottom: 15,
        backgroundColor: 'grey',
        borderRadius: 10,
        padding: 10,
    },
    text: {
        marginBottom: 10,
        fontSize: 15,
    },
    button: {
        margin: 20,
        backgroundColor: 'red',
        height: 50,
        borderRadius: 10,
        border: 'none',
        paddingTop: 10
    }
});