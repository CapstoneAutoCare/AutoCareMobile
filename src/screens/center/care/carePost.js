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
  ScrollView,
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
import { uploadImage } from "../../../configs/storeImageToFirebase";
import COLORS from "../../../constants/colors";
import DateTimePicker from "react-native-modal-datetime-picker";
export default CarePost = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isAvatarSelected, setIsAvatarSelected] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [load, reLoad] = useState(false);
  const pickImage = async () => {
    if (Constants.platform.ios) {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result?.assets[0]?.uri);
    }
  };

  const handleSignup = async () => {
    try {
      const phoneDigits = phone.replace(/[^0-9]/g, "");
      if (phoneDigits.length !== 10) {
        alert("Số điện thoại phải có đúng 10 chữ số");
        return;
      }

      if (
        !firstName ||
        !lastName ||
        !phone ||
        !passwordHash ||
        !email ||
        !bookingDate
      ) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      let avatarUrl =
        "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg";
      if (avatar) {
        const uploadedAvatarUrl = await uploadImage(avatar);
        if (uploadedAvatarUrl) {
          avatarUrl = uploadedAvatarUrl;
        }
      }
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.post(
        "https://autocareversion2.tryasp.net/api/CustomerCares/Post",
        {
          email: email,
          password: passwordHash,
          gender: gender,
          phone: phone,
          logo: avatarUrl,
          firstName: firstName,
          lastName: lastName,
          address: address,
          birthday: bookingDate,
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
        alert("tạo nhân viên thành công!");
        navigation.navigate("CARE");
      } else {
        alert("tạo nhân viên không thành công. Vui lòng thử lại.");
        reLoad((r) => !r);
      }
      reLoad((r) => !r);
    } catch (error) {
      console.error("Error during signup:", error);
      alert(error.response.data.Exception);
      reLoad((r) => !r);
    }
  };

  useEffect(() => {}, [load]);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 40,
            left: 20,
            padding: 7,
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={pickImage}>
            <View
              style={{
                width: 90,
                height: 90,
                borderRadius: 60,
                backgroundColor: COLORS.white,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {avatar ? (
                <Image
                  source={{ uri: avatar }}
                  style={{ width: 90, height: 90, borderRadius: 60 }}
                />
              ) : (
                <Ionicons name="camera" size={40} color={COLORS.secondary} />
              )}
            </View>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 20,
                left: 16,
              }}
            >
              Avatar
            </Text>
          </TouchableOpacity>
          {isAvatarSelected && (
            <Text style={{ color: COLORS.black, fontSize: 16 }}>
              Avatar selected successfully!
            </Text>
          )}
        </View>
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
              marginTop: 10,
              paddingHorizontal: 10,
            }}
          >
            <Ionicons
              name="person"
              size={24}
              color={COLORS.grey}
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
              }}
              placeholder="Họ"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              required={true}
            />
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
              }}
              placeholder="Tên"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              required={true}
            />
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

          {/* Ô nhập số điện thoại với biểu tượng */}
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
              name="call"
              size={24}
              color={COLORS.grey}
              style={{ marginRight: 10 }}
            />
            <PhoneInput
              style={{
                flex: 1,
                fontSize: 16,
              }}
              textStyle={{ fontSize: 16 }}
              initialCountry="vn"
              value={phone}
              onChangePhoneNumber={(number) => {
                console.log("Phone Number Changed:", number);
                if (number.startsWith("+84")) {
                  number = "0" + number.slice(3);
                }
                setPhone(number);
              }}
              required={true}
            />
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
              name="mail"
              size={24}
              color={COLORS.grey}
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={{ flex: 1, fontSize: 16 }}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              required={true}
            />
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
            <View style={styles.inputContainer}>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                style={styles.datePickerButton}
              >
                <Text style={styles.datePickerText}>
                  {bookingDate
                    ? bookingDate.toLocaleDateString()
                    : "Chọn ngày sinh"}
                </Text>
              </Pressable>
              <DateTimePicker
                isVisible={showDatePicker}
                mode="date"
                onConfirm={(date) => {
                  setBookingDate(date);
                  setShowDatePicker(false);
                }}
                onCancel={() => setShowDatePicker(false)}
                value={bookingDate}
              />
            </View>
            {/* <Pressable onPress={showDatepicker} style={{ flex: 1, alignItems: 'flex-end' }}>
                            <FontAwesome name="calendar" size={24} color={COLORS.grey} style={{ marginRight: 10 }} />
                        </Pressable>
                        {showDatePicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
value={selectedDate}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={handleDateChange}
                            />
                        )} */}
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
            <FontAwesome
              name="arrow-up"
              size={24}
              color={COLORS.grey}
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={{ flex: 1, fontSize: 16 }}
              placeholder="địa chỉ"
              value={address}
              onChangeText={(text) => setAddress(text)}
              required={true}
            />
          </View>

          {/* <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton.Android
                value="Nam"
                color={COLORS.primary}
                uncheckedColor={COLORS.grey}
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
              />
              <Text style={{ fontSize: 16, color: COLORS.black }}>Nam</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton.Android
                value="Nữ"
                color={COLORS.primary}
                uncheckedColor={COLORS.grey}
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
              />
              <Text style={{ fontSize: 16, color: COLORS.black }}>Nữ</Text>
            </View>
          </RadioButton.Group> */}

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
            <Text style={{ fontSize: 16 }}>Giới tính:</Text>
            <RadioButton.Group
              onValueChange={(newValue) => setGender(newValue)}
              value={gender}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <RadioButton.Android
                  value="Nam"
                  color={COLORS.primary}
                  uncheckedColor={COLORS.grey}
                  style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                />
                <Text
                  style={{ fontSize: 16, color: COLORS.black, marginLeft: 5 }}
                >
                  Nam
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                >
                  <RadioButton.Android
                    value="Nữ"
                    color={COLORS.primary}
                    uncheckedColor={COLORS.grey}
                    style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                  />
                  <Text
                    style={{ fontSize: 16, color: COLORS.black, marginLeft: 5 }}
                  >
                    Nữ
                  </Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <Pressable
            style={[styles.button, { marginBottom: 30 }]}
            onPress={handleSignup}
          >
            <Text style={styles.buttonText}>Đăng ký</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },

  datePickerText: {
    fontSize: 16,
    color: "black",
  },
  button: {
    backgroundColor: "red",
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  loginText: {
    color: "black",
    fontWeight: "bold",
    paddingVertical: 5,
    marginTop: 5,
    marginLeft: 10,
    flexDirection: "row",
  },
  button: {
    backgroundColor: "red",
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 50,
  },
});
