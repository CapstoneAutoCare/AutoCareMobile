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
import { Ionicons,Entypo,Feather  } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-input";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import axios from "axios";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadImage } from "../../../configs/storeImageToFirebase";
import COLORS from "../../../constants/colors";
export default UpdateProfile = () => {
  const navigation = useNavigation();
  const { profile } = useSelector((state) => state.user);
  const [load, setLoad] = useState(false);
  const [maintenanceCenterName, setMaintenanceCenterName] = useState(
    profile.MaintenanceCenterName || ""
  );
   const [maintenanceCenterDescription, setMaintenanceCenterDescription] =
     useState(profile.MaintenanceCenterDescription || "");
  const [phone, setPhone] = useState("+84"+profile.Phone || "");
  const [dob, setDob] = useState(
    moment(profile.Dob).format("YYYY-MM-DD") || ""
  );
  const [address, setAddress] = useState(profile.Address || "");
  const [district, setDistrict] = useState(profile.District || "");
  const [city, setCity] = useState(profile.City || "");
  const [country, setCountry] = useState(profile.Country || "");
  const [gender, setGender] = useState(profile.Gender || "");
  const [avatar, setAvatar] = useState(profile.Logo || null);
  const [isAvatarSelected, setIsAvatarSelected] = useState(false);
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
      setIsAvatarSelected(true);
    }
  };

  const handleSignup = async () => {
    try {
      if (
        !maintenanceCenterName ||
        !maintenanceCenterDescription ||
        !phone ||
        !address ||
        !district ||
        !city ||
        !country ||
        !gender
      ) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      let avatarUrl = profile.Logo;
      if (isAvatarSelected) {
        const uploadedAvatarUrl = await uploadImage(avatar);
        if (uploadedAvatarUrl) {
          avatarUrl = uploadedAvatarUrl;
        }
      }
       setLoad(true);
        const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.put(
        `https://autocareversion2.tryasp.net/api/MaintenanceCenters/Update?centerId=${profile.MaintenanceCenterId}`,
        {
          gender: gender,
          phone: phone,
          logo: avatarUrl,
          maintenanceCenterName: maintenanceCenterName,
          maintenanceCenterDescription: maintenanceCenterDescription,
          address: address,
          district: district,
          city: city,
          country: country,
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
        alert("sửa thông tin thành công!");
        navigation.navigate("CENTER_BOOKING_NAVIGATOR");
      } else {
        alert("sửa thông tin không thành công. Vui lòng thử lại.");
      }
    } catch (error) {
        setLoad(false);
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
            placeholder="tên trung tâm"
            value={maintenanceCenterName}
            onChangeText={(text) => setMaintenanceCenterName(text)}
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
            initialValue={phone}
            onChangePhoneNumber={(number) => {
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
          <Entypo
            name="location-pin"
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
          <Entypo
            name="address"
            size={24}
            color={COLORS.grey}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{ flex: 1, fontSize: 16 }}
            placeholder="quận / huyện"
            value={district}
            onChangeText={(text) => setDistrict(text)}
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
            name="earth"
            size={24}
            color={COLORS.grey}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{ flex: 1, fontSize: 16 }}
            placeholder="thành phố"
            value={city}
            onChangeText={(text) => setCity(text)}
            required={true}
          />
          <TextInput
            style={{ flex: 1, fontSize: 16 }}
            placeholder="quốc gia"
            value={country}
            onChangeText={(text) => setCountry(text)}
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
            marginTop: 10,
            paddingHorizontal: 10,
          }}
        >
          <Feather
            name="edit"
            size={24}
            color={COLORS.grey}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
            }}
            placeholder="thông tin"
            value={maintenanceCenterDescription}
            onChangeText={(text) => setMaintenanceCenterDescription(text)}
            required={true}
          />
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
              Đang cập nhật ...
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
              Cập nhật
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
