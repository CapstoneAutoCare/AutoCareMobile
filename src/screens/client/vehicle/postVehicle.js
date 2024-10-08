import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import COLORS from "./../../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { getListVehicleBrand, getListVehicleModelByBrandId } from "../../../app/Vehicle/actions";
import { BASE_URL } from "../../../../env";
const VehiclePost = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const [vehicleModelId, setVehicleModelId] = useState("");
  const [vehiclesBrandId, setVehicleBrandId] = useState(""); 
  const [licensePlate, setLicensePlate] = useState("");
  const [odo, setOdo] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const { vehicleModelByBrandId, vehicleBrand } = useSelector((state) => state.vehicle);

  const fetchGetListVehicleBrand = async () => {
    await dispatch(getListVehicleBrand());
  };
  const fetchGetListVehicleModelByBrandId = async (brandId) => {
    await dispatch(getListVehicleModelByBrandId(brandId));
  };
  useEffect(() => {
    const fetch = async () => {
      await fetchGetListVehicleBrand();
    };
    fetch();
  }, [load]);
  const handleSignup = async () => {
    try {
      if (!vehicleModelId || !licensePlate || !odo || !color || !description) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      setLoad(true);
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.post(
        `${BASE_URL}/Vehicles/Post`,
        {
          vehicleModelId,
          color,
          licensePlate,
          odo,
          description,
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
        alert("Tạo xe thành công!");
        navigation.navigate("VEHICLE");
      } else {
        alert("Tạo xe không thành công. Vui lòng thử lại.");
        setLoad((p) => !p);
      }
      setLoad((p) => !p);
    } catch (error) {
      console.error("Error during:", error);
      alert(error.response.data.Exception);
      setLoad((p) => !p);
    } finally {
      setLoad(false);
    }
  };
  const handleNavigateBack = () => {
    navigation.goBack();
  };
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Pressable onPress={handleNavigateBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={vehiclesBrandId}
            onValueChange={(itemValue) => {
              setVehicleBrandId(itemValue);
              fetchGetListVehicleModelByBrandId(itemValue); // Fetch vehicle models when a brand is selected
            }}
            style={styles.picker}
          >
            <Picker.Item label="Chọn hãng xe" value="" />
            {vehicleBrand.map((brand) => (
              <Picker.Item
                key={brand?.vehiclesBrandId}
                label={brand.vehiclesBrandName}
                value={brand?.vehiclesBrandId}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Picker
            selectedValue={vehicleModelId}
            onValueChange={(itemValue) => setVehicleModelId(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Chọn mẩu xe" value="" />
            {vehicleModelByBrandId.map((vehicle) => (
              <Picker.Item
                key={vehicle.vehicleModelId}
                label={
                  vehicle.vehiclesBrandName + " - " + vehicle.vehicleModelName
                }
                value={vehicle.vehicleModelId}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Màu xe"
            value={color}
            onChangeText={(text) => setColor(text)}
            required={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Biển số xe"
            value={licensePlate}
            onChangeText={(text) => setLicensePlate(text)}
            required={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Số km đi được"
            value={odo}
            onChangeText={(text) => setOdo(text)}
            required={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="THÔNG TIN XE"
            value={description}
            onChangeText={(text) => setDescription(text)}
            required={true}
          />
        </View>
        {load ? (
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Đang tạo ...</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Tạo xe</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
    marginTop: 50,
  },
  backButton: {
    marginRight: 12,
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
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  picker: {
    flex: 1,
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

export default VehiclePost;
