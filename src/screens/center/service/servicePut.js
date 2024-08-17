import React, { useState, useEffect } from "react";
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
import { uploadImage } from "../../../configs/storeImageToFirebase";
import COLORS from "../../../constants/colors";
import { BASE_URL } from "../../../../env";

export default ServicePut = ({ route }) => {
  const { maintenanceServiceId, serviceName, image, status } = route.params;
  const navigation = useNavigation();
   const [load, setLoad] = useState(false);
  const [maintenanceServiceName, setMaintenanceServiceName] = useState(serviceName);
  const [capacity, setCapacity] = useState(0);
  const [avatar, setAvatar] = useState(image || null);
  const [isAvatarSelected, setIsAvatarSelected] = useState(false);

  const pickImage = async () => {
    if (Constants.platform.ios) {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
      if (!maintenanceServiceName || !capacity) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      let avatarUrl = "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg";
      if (avatar) {
        const uploadedAvatarUrl = await uploadImage(avatar);
        if (uploadedAvatarUrl) {
          avatarUrl = uploadedAvatarUrl;
        }
      }
      setLoad(true);
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.put(
        `${BASE_URL}/MaintenanceServices/Update?id=${maintenanceServiceId}`,
        {
          maintenanceServiceName,
          status,
          image: avatarUrl,
          capacity: parseInt(capacity, 10),
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
        alert("sửa dịch vụ thành công!");
        navigation.navigate("SERVICE");
      } else {
        alert("sửa dịch vụ không thành công. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        console.error("Status code:", error.response.status);
        alert("Server responded with an error. Please check the console for details.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response received from the server. Please check your network connection.");
      } else {
        console.error("Error setting up the request:", error.message);
        alert("An error occurred during the request setup. Please check the console for details.");
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.imagePicker}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <Ionicons name="camera" size={40} color={COLORS.secondary} />
            )}
          </View>
          <Text style={styles.imagePickerText}>Hình ảnh</Text>
        </TouchableOpacity>
        {isAvatarSelected && (
          <Text style={styles.avatarSelectedText}>
            Avatar selected successfully!
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputField}>
          <Ionicons
            name="person"
            size={24}
            color={COLORS.grey}
            style={styles.icon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Tên dich vụ"
            value={maintenanceServiceName}
            onChangeText={(text) => setMaintenanceServiceName(text)}
            required={true}
          />
        </View>
        <View style={styles.inputField}>
          <Ionicons
            name="person"
            size={24}
            color={COLORS.grey}
            style={styles.icon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Số lượng"
            value={capacity}
            onChangeText={(text) => setCapacity(text)}
            keyboardType="numeric"
            required={true}
          />
        </View>
        {load ? (
          <Pressable style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Đang sửa ...</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.submitButton} onPress={handleSignup}>
            <Text style={styles.submitButtonText}>Sửa dịch vụ</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 7,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
  },
  imagePicker: {
    width: 90,
    height: 90,
    borderRadius: 60,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 60,
  },
  imagePickerText: {
    color: COLORS.black,
    fontSize: 20,
    left: 16,
  },
  avatarSelectedText: {
    color: COLORS.black,
    fontSize: 16,
  },
  inputContainer: {
    paddingHorizontal: 42,
    width: "100%",
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#1677ff",
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 20,
  },
});
