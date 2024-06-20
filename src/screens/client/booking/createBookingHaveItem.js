import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import COLORS from "./../../../constants/colors";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { getListCustomerCare } from "../../../app/CustomerCare/actions";

const CreateBookingHaveItem = ({ centerList, vehicleListByClient }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [vehicle, setVehicle] = useState("");
  const [customerCare, setCustomerCare] = useState("");
  const [maintenanceCenter, setMaintenanceCenter] = useState("");
  const [note, setNote] = useState("");
  const { customerCareList } = useSelector((state) => state.customerCare);
  const fetchGetListCustomerCare = async () => {
    await dispatch(getListCustomerCare());
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchGetListCustomerCare();
    };
    fetch();
  }, []);
  const handleSignup = async () => {
    try {
      if (!note || !maintenanceCenter) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      const now = new Date();
      const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
      const bookingDate = vietnamTime.toISOString();
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.post(
        "http://autocare.runasp.net/api/Bookings/PostHaveItems",
        {
          vehicleId: vehicle,
          maintenanceCenterId: maintenanceCenter,
          maintananceScheduleId: null,
          note: note,
          bookingDate,
          createMaintenanceInformationHaveItemsByClient: {
            customerCareId: customerCare,
            finishedDate: "2024-06-20T13:05:16.597Z",
            createMaintenanceSparePartInfos: null,
            createMaintenanceServiceInfos: null,
            // createMaintenanceSparePartInfos: [
            //   {
            //     sparePartsItemCostId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            //     maintenanceSparePartInfoName: "string",
            //     quantity: 0,
            //     actualCost: 0,
            //     note: "string",
            //   },
            // ],
            // createMaintenanceServiceInfos: [
            //   {
            //     maintenanceServiceCostId:
            //       "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            //     maintenanceServiceInfoName: "string",
            //     quantity: 0,
            //     actualCost: 0,
            //     note: "string",
            //   },
            // ],
          },
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
        alert("Tạo lịch thành công!");
        navigation.navigate("Booking");
      } else {
        alert("Tạo lịch không thành công. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error during:", error);
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
    <ScrollView style={{ marginTop: 50 }}>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Lưu ý"
              value={note}
              onChangeText={(text) => setNote(text)}
              required={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={customerCare}
              onValueChange={(itemValue) => setCustomerCare(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Chọn CSKH" value="" />
              {customerCareList.map((customerCare) => (
                <Picker.Item
                  key={customerCare.customerCareId}
                  label={customerCare.firstName +" "+ customerCare.lastName}
                  value={customerCare.customerCareId}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={vehicle}
              onValueChange={(itemValue) => setVehicle(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Chọn xe" value="" />
              {vehicleListByClient.map((vehicle) => (
                <Picker.Item
                  key={vehicle.vehiclesId}
                  label={vehicle.vehiclesBrandName}
                  value={vehicle.vehiclesId}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={maintenanceCenter}
              onValueChange={(itemValue) => setMaintenanceCenter(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Chọn trung tâm bảo dưỡng" value="" />
              {centerList.map((center) => (
                <Picker.Item
                  key={center.maintenanceCenterId}
                  label={center.maintenanceCenterName}
                  value={center.maintenanceCenterId}
                />
              ))}
            </Picker>
          </View>
          <Pressable style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Tạo lịch</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default CreateBookingHaveItem;
