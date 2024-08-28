import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import COLORS from "./../../../constants/colors";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomSearchableDropdown from "../../../features/CustomSearchableDropdown";
import { BASE_URL } from "../../../../env";

const CreateBooking = ({
  centerList,
  maintenanceCenterId,
  vehicleListByClient,
}) => {
  const navigation = useNavigation();
  const [vehicle, setVehicle] = useState("");
  const [odo, setOdo] = useState("");
  const [odoName, setOdoName] = useState("");
  const [maintenanceCenter, setMaintenanceCenter] = useState(
    maintenanceCenterId || ""
  );
  const [note, setNote] = useState("");
  const [load, setLoad] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredOdo, setFilteredOdo] = useState([]);
  const [availableOdo, setAvailableOdo] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [odoList, setOdoList] = useState([]);
  const [modelId, setModelId] = useState("");
  const [displayedServices, setDisplayedServices] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [scheduleId, setScheduleId] = useState("");


  useEffect(() => {
    if (maintenanceCenter) {
      fetchOdo();
    }
    const selectedVehicle = vehicleListByClient.find(
      (v) => v.vehiclesId === vehicle
    );
    if (selectedVehicle) {
      setModelId(selectedVehicle.vehicleModelId);
      setFilteredOdo(
        availableOdo.filter(
          (odo) => odo.vehicleModelId === selectedVehicle.vehicleModelId
        )
      );
    } else {
      setFilteredOdo([]);
    }
  }, [vehicle, availableOdo]);

  // Fetch available Odo from API
  const fetchOdo = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.get(
        `${BASE_URL}/MaintenanceSchedule/GetListPackageCenterId?id=${maintenanceCenter}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setAvailableOdo(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchOdoList = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      if (!maintenanceCenter || !vehicle) return;

      const response = await axios.get(
        `${BASE_URL}/MaintenanceServices/GetListPackageAndOdoTRUEByCenterIdAndVehicleModelId?id=${maintenanceCenter}&modelId=${modelId}`,
        {
          headers: {
            accept: "text/plain",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const filteredServices = response.data.filter(service =>
        service.maintananceScheduleId === scheduleId
      );

      setDisplayedServices(filteredServices);
      setOdoList(filteredServices);
    } catch (error) {
      console.error("Error fetching Odo List:", error);
    }
  };

  // Tạo một bản sao của bookingDate để tránh thay đổi trực tiếp
  const adjustedBookingDate = new Date(bookingDate);

  // Thêm 7 giờ vào thời gian
  adjustedBookingDate.setHours(adjustedBookingDate.getHours() + 7);

  const handleSignup = async () => {
    try {
      if (!note || !maintenanceCenter) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      setLoad(true);
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.post(
        `${BASE_URL}/Bookings/PostHavePackage`,
        {
          vehicleId: vehicle,
          maintenanceCenterId: maintenanceCenter,
          maintananceScheduleId: odo || null,
          note: note,
          bookingDate: adjustedBookingDate.toISOString(),
          informationName: "Đặt Lịch Bảo Dưỡng",
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setLoad(false);
        alert("Tạo lịch thành công!");
        navigation.navigate("Booking");
      } else {
        setLoad(false);
        alert("Tạo lịch không thành công. Vui lòng thử lại.");
      }
    } catch (error) {
      setLoad(false);
      console.error("Error during:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
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
  const today = new Date();
  const oneMonthLater = new Date(today);
  oneMonthLater.setMonth(today.getMonth() + 1);

  // Date picker change handler
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

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <Text style={styles.serviceName}>{item.maintenanceServiceName}</Text>
      <Text style={styles.serviceDetails}>
        {item.vehiclesBrandName} {item.vehicleModelName} - Odo: {item.maintananceScheduleName} Km
      </Text>
    </View>
  );

  return (
    <ScrollView style={{ marginTop: 20 }}>
      <View style={styles.container}>
        <View style={styles.form}>
          {centerList.length > 0 && (
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={vehicle}
                onValueChange={(itemValue) => {
                  setVehicle(itemValue);
                  setFilteredOdo([]);
                  setOdo("");
                  setOdoName("");
                  fetchOdoList();
                }}
                style={styles.picker}
              >
                <Picker.Item label="Chọn xe" value="" />
                {vehicleListByClient.map((vehicle) => (
                  <Picker.Item
                    key={vehicle.vehiclesId}
                    label={
                      vehicle.vehiclesBrandName +
                      " " +
                      vehicle.vehicleModelName +
                      " " +
                      vehicle.licensePlate
                    }
                    value={vehicle.vehiclesId}
                  />
                ))}
              </Picker>
            </View>
          )}

          {vehicleListByClient.length > 0 && (
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={maintenanceCenter}
                onValueChange={(itemValue) => {
                  setMaintenanceCenter(itemValue);
                  setFilteredOdo([]);
                  setOdo("");
                  setOdoName("");
                  fetchOdo();
                  fetchOdoList();
                }}
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
          )}

          {maintenanceCenter && filteredOdo.length > 0 && (
            <View style={styles.inputContainerCost}>
              <CustomSearchableDropdown
                items={filteredOdo.map((odo) => ({
                  id: odo.maintenanceServiceId || "",
                  name: `${odo.vehiclesBrandName || ""} ${odo.vehicleModelName || ""
                    } - Odo: ${odo.maintananceScheduleName || ""} Km `,
                  value: odo.maintananceScheduleId || "",
                  imageUrl: odo.imageUrl || "",
                  maintenanceServiceName: odo.maintenanceServiceName || "",
                  ...odo,
                }))}
                onItemSelect={(item) => {
                  if (item && item.value) {
                    setOdo(item.value);
                    setOdoName(item.name || "");
                    setScheduleId(item.value);
                  }
                }}
                placeholder={odoName || "Chọn Combo"}
              />
            </View>
          )}

          {maintenanceCenter && vehicle && odo && (
            <View style={styles.inputContainer}>
              <Pressable
                onPress={() => {
                  fetchOdoList();
                  setShowDialog(true);
                  console.log(odoList);
                }}
                style={styles.showButton}
              >
                <Text style={styles.showButtonText}>Show</Text>
              </Pressable>
            </View>
          )}

          <View style={styles.inputContainer}>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              style={styles.datePickerButton}
            >
              <Text style={styles.datePickerText}>
                {bookingDate
                  ? bookingDate.toLocaleString()
                  : "Chọn ngày và giờ"}
              </Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={bookingDate}
                mode="date"
                display="default"
                onChange={onDateChange}
                minimumDate={today}  // Ngăn người dùng chọn ngày trong quá khứ
                maximumDate={oneMonthLater}  // Ngày muộn nhất
              />
            )}
            {showTimePicker && (
              <DateTimePicker
                value={bookingDate}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Lưu ý"
              value={note}
              onChangeText={(text) => setNote(text)}
            />
          </View>
          {maintenanceCenter &&
            vehicle &&
            odo.length > 0 &&
            odoList.length > 0 && (
              <View>
                {load ? (
                  <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Đang tạo lịch ...</Text>
                  </Pressable>
                ) : (
                  <Pressable style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Tạo lịch</Text>
                  </Pressable>
                )}
              </View>
            )}
        </View>

        <Modal
          transparent={true}
          animationType="slide"
          visible={showDialog}
          onRequestClose={() => setShowDialog(false)}
        >
          <View style={styles.dialogContainer}>
            <View style={styles.dialogContent}>
              <Text style={styles.dialogTitle}>Danh sách dịch vụ</Text>
              <FlatList
                data={displayedServices}
                renderItem={renderServiceItem}
                keyExtractor={(item) => item.maintenanceServiceId.toString()}
              />
              <Pressable
                onPress={() => setShowDialog(false)}
                style={styles.dialogCloseButton}
              >
                <Text style={styles.dialogCloseButtonText}>Đóng</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  inputContainerCost: {
    flexDirection: "column",
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
    marginTop: 10,
    paddingHorizontal: 10,
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
  showButton: {
    backgroundColor: COLORS.primary,
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    width: '100%',
  },
  showButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  dialogContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dialogContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  serviceItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    width: '100%',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceDetails: {
    fontSize: 14,
    color: COLORS.gray,
  },
  dialogCloseButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  dialogCloseButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreateBooking;
