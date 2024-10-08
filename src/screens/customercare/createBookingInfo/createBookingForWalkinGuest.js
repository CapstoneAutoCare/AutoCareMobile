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
import axiosClient from "../../../services/axiosClient";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getProfile } from "../../../features/userSlice";
import { useAppDispatch } from "../../../app/hooks";
const CreateBookingForWalkinGuest = ({
    centerList,
    maintenanceCenterId,
    vehicleListByClient,
}) => {
    const dispatch = useAppDispatch();
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
    const profile = useSelector((state) => state.user.profile);

    useEffect(() => {
        const fetchGetProfile = async () => {
            await dispatch(getProfile());
        };

        const unsubscribe = navigation.addListener("focus", () => {
            fetchGetProfile();
        });

        fetchGetProfile();

        return unsubscribe;
    }, [dispatch, navigation]);

    useEffect(() => {
        const fetchSpareParts = async () => {
          try {
            const response = await axiosClient.get(
              `SparePartsItemCosts/GetListByClient?centerId=${profile.CentreId}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            const filteredSpareParts = response.data.filter(
              (item) => item.vehicleModelName === request?.responseVehicles.vehicleModelName
            );
            setAvailableSpareParts(filteredSpareParts);
          } catch (error) {
            console.error('Error fetching spare parts:', error);
          }
        };
      
        const fetchServices = async () => {
          try {
            const response = await axiosClient.get(
              `MaintenanceServiceCosts/GetListByDifMaintenanceServiceAndInforIdAndBooleanFalse?centerId=${profile.CentreId}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            const filteredServices = response.data.filter(
              (item) => item.vehicleModelName === request?.responseVehicles.vehicleModelName
            );
            setAvailableServices(filteredServices);
          } catch (error) {
            console.error('Error fetching services:', error);
          }
        };
      
        fetchSpareParts();
        fetchServices();
      }, [profile]);

    useEffect(() => {
        const fetch = async () => {
            setLoadCenter(true);
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
      
          const response = await axiosClient.post(
            'Bookings/PostHaveItems',
            {
              vehicleId: vehicle,
              maintenanceCenterId: maintenanceCenter,
              maintananceScheduleId: null,
              note: note,
              bookingDate: bookingDate.toISOString(),
              createMaintenanceInformationHaveItemsByClient: {
                customerCareId: customerCare,
                finishedDate: vietnamTime.toISOString(),
                createMaintenanceSparePartInfos: spareParts.length > 0 ? spareParts : null,
                createMaintenanceServiceInfos: services.length > 0 ? services : null,
              },
            },
            {
              headers: {
                'Content-Type': 'application/json',
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
      
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || bookingDate;
        setShowDatePicker(false);
        setBookingDate(currentDate);
        if (event.type === "set") {
            setShowTimePicker(true); // Show time picker after date is selected
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
                <TextInput
                    style={styles.textInput}
                    placeholder="Nhập thông tin xe"
                    value={vehicle}
                    onChangeText={(text) => setVehicle(text)}
                />
                    </View>
                    
                    <View style={styles.inputContainer}>
                <Text style={styles.label}>Trung tâm bảo dưỡng</Text>
                {profile && centerList && (
                    centerList.filter((center) => center.maintenanceCenterId === profile.CentreId).map((center) => (
        <TextInput
            key={center.maintenanceCenterId}
            style={styles.textInput}
            lable={center.maintenanceCenterName}
            value={center.maintenanceCenterId}
            editable={false}
        />
    )))}
            </View>
                    {maintenanceCenter !== "" && !loadCenter && (
                        <>
                            
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Chăm sóc khách hàng"
                    value={profile ? `${profile.FirstName} ${profile.LastName}` : ""}
                    editable={false}
                />
            </View>
                            <Text>Phụ Tùng</Text>
                            {spareParts.map((sparePart, index) => (
                                <View key={index}>
                                    <View style={styles.inputContainerCost}>
                                        <Picker
                                            selectedValue={sparePart.sparePartsItemCostId}
                                            onValueChange={(value) =>
                                                handleSparePartChange(
                                                    index,
                                                    "sparePartsItemCostId",
                                                    value
                                                )
                                            }
                                            style={styles.picker}
                                        >
                                            <Picker.Item label="Chọn phụ tùng" value="" />
                                            {availableSpareParts.map((part) => (
                                                <Picker.Item
                                                    key={part.sparePartsItemCostId}
                                                    label={part.sparePartsItemName}
                                                    value={part.sparePartsItemCostId}
                                                />
                                            ))}
                                        </Picker>
                                    </View>
                                    <View style={styles.inputContainerCost}>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Tên phụ tùng"
                                            value={sparePart.maintenanceSparePartInfoName}
                                            onChangeText={(text) =>
                                                handleSparePartChange(
                                                    index,
                                                    "maintenanceSparePartInfoName",
                                                    text
                                                )
                                            }
                                        />
                                    </View>
                                    <View style={styles.inputContainerCost}>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Số lượng"
                                            value={String(sparePart.quantity)}
                                            keyboardType="numeric"
                                            onChangeText={(text) =>
                                                handleSparePartChange(index, "quantity", parseInt(text))
                                            }
                                        />
                                    </View>
                                    <View style={styles.inputContainerCost}>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Chi phí"
                                            value={String(sparePart.actualCost)}
                                            keyboardType="numeric"
                                            onChangeText={(text) =>
                                                handleSparePartChange(
                                                    index,
                                                    "actualCost",
                                                    parseInt(text)
                                                )
                                            }
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
                                        <Picker
                                            selectedValue={service.maintenanceServiceCostId}
                                            onValueChange={(value) =>
                                                handleServiceChange(
                                                    index,
                                                    "maintenanceServiceCostId",
                                                    value
                                                )
                                            }
                                            style={styles.picker}
                                        >
                                            <Picker.Item label="Chọn dịch vụ" value="" />
                                            {availableServices.map((service) => (
                                                <Picker.Item
                                                    key={service.maintenanceServiceCostId}
                                                    label={service.maintenanceServiceName}
                                                    value={service.maintenanceServiceCostId}
                                                />
                                            ))}
                                        </Picker>
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
                                            onChangeText={(text) =>
                                                handleServiceChange(index, "quantity", parseInt(text))
                                            }
                                        />
                                    </View>
                                    <View style={styles.inputContainerCost}>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Chi phí"
                                            value={String(service.actualCost)}
                                            keyboardType="numeric"
                                            onChangeText={(text) =>
                                                handleServiceChange(index, "actualCost", parseInt(text))
                                            }
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

export default CreateBookingForWalkinGuest;
