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
import DateTimePicker from "@react-native-community/datetimepicker";
import COLORS from "./../../../constants/colors";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { getListCustomerCareByCenterId } from "../../../app/CustomerCare/actions";
import CustomSearchableDropdown from './../../../features/CustomSearchableDropdown';

const CreateBookingHaveItem = ({
  centerList,
  maintenanceCenterId,
  vehicleListByClient,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loadCenter, setLoadCenter] = useState(false);
  const [vehicle, setVehicle] = useState("");
  const [customerCare, setCustomerCare] = useState("");
  const [maintenanceCenter, setMaintenanceCenter] = useState(
    maintenanceCenterId || ""
  );
  const [note, setNote] = useState("");
  const [spareParts, setSpareParts] = useState([]);
  const [services, setServices] = useState([]);
  const [availableSpareParts, setAvailableSpareParts] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [filteredSpareParts, setFilteredSpareParts] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  const { customerCareListByCenterId } = useSelector(
    (state) => state.customerCare
  );
  const fetchGetListCustomerCare = async () => {
    await dispatch(getListCustomerCareByCenterId(maintenanceCenter));
    setLoadCenter(false);
  };

  const fetchSpareParts = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.get(
        `https://autocareversion2.tryasp.net/api/SparePartsItemCosts/GetListByClient?centerId=${maintenanceCenter}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setAvailableSpareParts(response.data);
    } catch (error) {
      console.error("Error fetching spare parts:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.get(
        `https://autocareversion2.tryasp.net/api/MaintenanceServiceCosts/GetListByClient?centerId=${maintenanceCenter}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setAvailableServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      setLoadCenter(true);
      await fetchGetListCustomerCare();
      await fetchSpareParts();
      await fetchServices();
    };
    if (maintenanceCenter) {
      fetch();
    }
  }, [maintenanceCenter]);

  const handleAddSparePart = () => {
    setSpareParts([
      ...spareParts,
      {
        sparePartsItemCostId: "",
        maintenanceSparePartInfoName: "",
        quantity: 0,
        actualCost: 0,
        note: "",
      },
    ]);
  };

  const handleRemoveSparePart = (index) => {
    const newSpareParts = spareParts.filter((_, idx) => idx !== index);
    setSpareParts(newSpareParts);
  };

  const handleSparePartChange = (index, key, value) => {
    const newSpareParts = [...spareParts];
    newSpareParts[index][key] = value;
    setSpareParts(newSpareParts);
  };

  const handleAddService = () => {
    setServices([
      ...services,
      {
        maintenanceServiceCostId: "",
        maintenanceServiceInfoName: "",
        quantity: 0,
        actualCost: 0,
        note: "",
      },
    ]);
  };

  const handleRemoveService = (index) => {
    const newServices = services.filter((_, idx) => idx !== index);
    setServices(newServices);
  };

  const handleServiceChange = (index, key, value) => {
    const newServices = [...services];
    newServices[index][key] = value;
    setServices(newServices);
  };

  const handleSignup = async () => {
    try {
      if (!note || !maintenanceCenter) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }
      const now = new Date();
      const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.post(
        "https://autocareversion2.tryasp.net/api/Bookings/PostHaveItems",
        {
          vehicleId: vehicle,
          maintenanceCenterId: maintenanceCenter,
          maintananceScheduleId: null,
          note: note,
          bookingDate: bookingDate.toISOString(),
          createMaintenanceInformationHaveItemsByClient: {
            customerCareId: customerCare,
            finishedDate: vietnamTime.toISOString(),
            createMaintenanceSparePartInfos:
              spareParts.length > 0 ? spareParts : null,
            createMaintenanceServiceInfos:
              services.length > 0 ? services : null,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
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
      alert(error.response.data.Exception);
    }
  };

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

  useEffect(() => {
    const selectedVehicle = vehicleListByClient.find(
      (v) => v.vehiclesId === vehicle
    );
    if (selectedVehicle) {
      setFilteredSpareParts(
        availableSpareParts.filter(
          (part) => part?.vehicleModelName === selectedVehicle?.vehicleModelName
        )
      );
      setFilteredServices(
        availableServices.filter(
          (service) =>
            service?.vehicleModelName === selectedVehicle?.vehicleModelName
        )
      );
    } else {
      setFilteredSpareParts([]);
      setFilteredServices([]);
    }
    console.log(selectedVehicle?.vehicleModelName);
  }, [vehicle, availableSpareParts, availableServices]);
  const today = new Date();

  return (
    <ScrollView style={{ marginTop: 20 }}>
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
              selectedValue={vehicle}
              onValueChange={(itemValue) => setVehicle(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Chọn xe" value="" />
              {vehicleListByClient.map((vehicle) => (
                <Picker.Item
                  key={vehicle.vehiclesId}
                  label={vehicle.vehiclesBrandName + " " + vehicle.licensePlate}
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
          {maintenanceCenter !== "" && !loadCenter && (
            <>
              <View style={styles.inputContainer}>
                <Picker
                  selectedValue={customerCare}
                  onValueChange={(itemValue) => setCustomerCare(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Chọn CSKH" value="" />
                  {customerCareListByCenterId.map((customerCare) => (
                    <Picker.Item
                      key={customerCare.customerCareId}
                      label={
                        customerCare.firstName + " " + customerCare.lastName
                      }
                      value={customerCare.customerCareId}
                    />
                  ))}
                </Picker>
              </View>
              <Text>Phụ Tùng</Text>
              {spareParts.map((sparePart, index) => (
                <View key={index}>
                  <View style={styles.inputContainerCost}>
                    <CustomSearchableDropdown
                      items={filteredSpareParts.map((part) => ({
                        id: part.sparePartsItemCostId,
                        name: `${part.maintananceScheduleName} ${part.sparePartsItemName} - ${part.acturalCost} VND`,
                        cost: part.acturalCost,
                        sparePartsItemName: part.sparePartsItemName,

                      }))}
                      onItemSelect={(item) => {
                        handleSparePartChange(
                          index,
                          "sparePartsItemCostId",
                          item.id
                        );
                        handleSparePartChange(
                          index,
                          "maintenanceSparePartInfoName",
                          item.sparePartsItemName
                        );
                        handleSparePartChange(index, "quantity", 1);
                        handleSparePartChange(index, "actualCost", item.cost);
                      }}
                      placeholder="Chọn phụ tùng"
                    />
                  </View>
                  <View style={styles.inputContainerCost}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Tên phụ tùng"
                      value={sparePart.maintenanceSparePartInfoName}
                      onChangeText={(text) => {
                        handleSparePartChange(
                          index,
                          "maintenanceSparePartInfoName",
                          text
                        );
                      }}
                    />
                  </View>
                  <View style={styles.inputContainerCost}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Số lượng"
                      value={String(sparePart.quantity)}
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        handleSparePartChange(
                          index,
                          "quantity",
                          parseInt(text) || 0
                        );
                      }}
                    />
                  </View>
                  <View style={styles.inputContainerCost}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Chi phí"
                      value={String(
                        sparePart.actualCost * sparePart.quantity ||
                          sparePart.actualCost
                      )}
                      keyboardType="numeric"
                      editable={false}
                    />
                  </View>
                  <View style={styles.inputContainerCost}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Ghi chú"
                      value={sparePart.note}
                      onChangeText={(text) =>
                        handleSparePartChange(index, "note", text)
                      }
                    />
                  </View>

                  <Pressable
                    style={styles.button}
                    onPress={() => handleRemoveSparePart(index)}
                  >
                    <Text style={styles.buttonText}>Xóa</Text>
                  </Pressable>
                </View>
              ))}
              <Pressable style={styles.button} onPress={handleAddSparePart}>
                <Text style={styles.buttonText}>Thêm phụ tùng</Text>
              </Pressable>

              <Text>Dịch vụ</Text>
              {services.map((service, index) => (
                <View key={index}>
                  <View style={styles.inputContainerCost}>
                    <CustomSearchableDropdown
                      items={filteredServices.map((service) => ({
                        id: service.maintenanceServiceCostId,
                        name: `${service.maintananceScheduleName} ${service.maintenanceServiceName} - ${service.acturalCost} VND`,
                        cost: service.acturalCost,
                        maintenanceServiceName:service.maintenanceServiceName,
                      }))}
                      onItemSelect={(item) => {
                        handleServiceChange(
                          index,
                          "maintenanceServiceCostId",
                          item.id
                        );
                        handleServiceChange(
                          index,
                          "maintenanceServiceInfoName",
                          item.maintenanceServiceName
                        );
                        handleServiceChange(index, "quantity", 1);
                        handleServiceChange(index, "actualCost", item.cost);
                      }}
                      placeholder="Chọn dịch vụ"
                    />
                  </View>
                  <View style={styles.inputContainerCost}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Tên dịch vụ"
                      value={service.maintenanceServiceInfoName}
                      onChangeText={(text) =>
                        handleServiceChange(
                          index,
                          "maintenanceServiceInfoName",
                          text
                        )
                      }
                    />
                  </View>
                  <View style={styles.inputContainerCost}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Số lượng"
                      value={String(service.quantity)}
                      keyboardType="numeric"
                      editable={false}
                    />
                  </View>
                  <View style={styles.inputContainerCost}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Chi phí"
                      value={String(service.actualCost)}
                      keyboardType="numeric"
                      editable={false}
                    />
                  </View>
                  <View style={styles.inputContainerCost}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Ghi chú"
                      value={service.note}
                      onChangeText={(text) =>
                        handleServiceChange(index, "note", text)
                      }
                    />
                  </View>

                  <Pressable
                    style={styles.button}
                    onPress={() => handleRemoveService(index)}
                  >
                    <Text style={styles.buttonText}>Xóa</Text>
                  </Pressable>
                </View>
              ))}
              <Pressable style={styles.button} onPress={handleAddService}>
                <Text style={styles.buttonText}>Thêm dịch vụ</Text>
              </Pressable>
            </>
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
                minimumDate={today} 

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
  inputContainerCost: {
    flexDirection: "column",
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

export default CreateBookingHaveItem;
