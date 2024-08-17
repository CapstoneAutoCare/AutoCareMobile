import React, { Component, useState } from "react";
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
import { Picker } from "@react-native-picker/picker";
import { Ionicons, Feather } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import PhoneInput from "react-native-phone-input";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import axios from "axios";
import { RadioButton } from "react-native-paper";
import {
  storeImageToFireBase,
  uploadImage,
} from "../configs/storeImageToFirebase";
import vietnamLocations from "../api/vietnamLocations.json";
import CustomSearchableDropdown from "../features/CustomSearchableDropdown";
import { BASE_URL } from "../../env";
export default RegisterCenter = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [load, seLoad] = useState(false);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [listDistrict, setListDistrict] = useState([]);
  const country = "Vietnam";
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || bookingDate;
    setShowDatePicker(false);
    setBookingDate(currentDate);
    if (event.type === "set") {
      setShowTimePicker(true);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || bookingDate;
    setShowTimePicker(false);
    const updatedDate = new Date(
      bookingDate.setHours(currentTime.getHours(), currentTime.getMinutes())
    );
    setBookingDate(updatedDate);
  };

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
        !bookingDate ||
        !city ||
        !district
      ) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      seLoad(true);
      let avatarUrl ="https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg";
       console.log("🚀 avatarUrl: 1", avatarUrl);
      if (avatar) {
        const uploadedAvatarUrl = await uploadImage(avatar);
        if (uploadedAvatarUrl) {
          avatarUrl = uploadedAvatarUrl;
        }
      }
 console.log("🚀 ~ avatarUrl: 2", avatarUrl);
      const response = await axios.post(
        `${BASE_URL}/MaintenanceCenters/Post`,
        {
          email: email,
          password: passwordHash,
          gender: gender,
          phone: phone,
          logo: avatarUrl,
          maintenanceCenterName: firstName,
          maintenanceCenterDescription: lastName,
          address: address,
          district: district,
          city: city,
          country: country,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        alert("Đăng ký thành công!");
        seLoad(false);
        navigation.navigate("LoginCenter");
      } else {
        alert("Đăng ký không thành công. Vui lòng thử lại.");
     seLoad(false);  
    }
    } catch (error) {
      console.error("Error during signup:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        console.error("Status code:", error.response.status);
        alert(
          "Server responded with an error. Please check the console for details."
        );
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
              placeholder="Tên trung tâm"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
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
              marginTop: 10,
              paddingHorizontal: 10,
            }}
          >
            <Feather
              name="info"
              size={24}
              color={COLORS.grey}
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={{
                flex: 1,
                fontSize: 16,
              }}
              placeholder="Thông tin"
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
              placeholder="Địa chỉ"
              value={address}
              onChangeText={(text) => setAddress(text)}
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
              name="location"
              size={24}
              color={COLORS.grey}
              style={{ marginRight: 10 }}
            />
            <CustomSearchableDropdown
              items={vietnamLocations.map((city) => ({
                id: city.Name,
                name: city.Name,
              }))}
              onItemSelect={(item) => {
                setCity(item.name);
                setDistrict("");
                setListDistrict(
                  vietnamLocations.find((c) => c.Name === item.name).Districts
                );
              }}
              placeholder={city || "Chọn thành phố"}
            />
          </View>

          {city ? (
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
                name="location-outline"
                size={24}
                color={COLORS.grey}
                style={{ marginRight: 10 }}
              />
              <CustomSearchableDropdown
                items={listDistrict.map((district) => ({
                  id: district.Name,
                  name: district.Name,
                }))}
                onItemSelect={(item) => {
                  setDistrict(item.name);
                }}
                placeholder={district || "Chọn quận/huyện"}
              />
            </View>
          ) : null}
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
                Đang đăng ký ...
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
                Đăng ký
              </Text>
            </Pressable>
          )}

          <Text
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              paddingVertical: 5,
              alignItems: "center",
              marginTop: 5,
              // marginLeft: 10,
              left: 50,
              flexDirection: "row",
            }}
          >
            Bạn đã có tài khoản?
            <Text
              onPress={() => {
                navigation.navigate("LoginCenter");
              }}
              style={{
                color: "red",
                fontWeight: "bold",
                marginLeft: 5,
              }}
            >
              Đăng nhập tại đây
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
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
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    paddingHorizontal: 42,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  inputContainerCost: {
    flexDirection: "flex",
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  picker: {
    flex: 1,
  },
  datePickerButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: COLORS.black,
  },
  button: {
    backgroundColor: "red",
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 20,
  },
});
