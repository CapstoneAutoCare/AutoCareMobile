import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import COLORS from "./../../../constants/colors";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateBookingInfo = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { profile, request } = route.params; 

    const [note, setNote] = useState("");
    const [spareParts, setSpareParts] = useState([]);
    const [services, setServices] = useState([]);
    const [availableSpareParts, setAvailableSpareParts] = useState([]);
    const [availableServices, setAvailableServices] = useState([]);


    useEffect(() => {
        const fetchSpareParts = async () => {
            try {
              const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
              const response = await axios.get(
                `https://autocareversion2.tryasp.net/api/SparePartsItemCosts/GetListByClient?centerId=${profile.CentreId}`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
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
              const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
              const response = await axios.get(
                `https://autocareversion2.tryasp.net/api/MaintenanceServiceCosts/GetListByClient?centerId=${profile.CentreId}`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
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

        if (profile && profile.CentreId) {
            fetchSpareParts();
            fetchServices();
        }
    }, [profile]);

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
            if (!note) {
                alert("Vui lòng điền đầy đủ thông tin");
                return;
            }
            const now = new Date();
            const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
            const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
            const response = await axios.post(
                "https://autocareversion2.tryasp.net/api/MaintenanceInformations/PostHaveItems",
                {
                    informationMaintenanceName: "string",
                    finishedDate: vietnamTime.toISOString(),
                    note: note,
                    bookingId: request.bookingId,
                    createMaintenanceSparePartInfos: spareParts.length > 0 ? spareParts : null,
                    createMaintenanceServiceInfos: services.length > 0 ? services : null,
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
                navigation.navigate('REQUEST_DETAIL', { requestId: request.requestId });
            } else {
                alert("Tạo lịch không thành công. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Error during:", error);
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
                    <Text>Phụ Tùng</Text>
                    {spareParts.map((sparePart, index) => (
                        <View key={index}>
                            <View style={styles.inputContainerCost}>
                                <Picker
                                    selectedValue={sparePart.sparePartsItemCostId}
                                    onValueChange={(value) =>
                                        handleSparePartChange(index, "sparePartsItemCostId", value)
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
                                    keyboardType="numeric"
                                    value={sparePart.quantity.toString()}
                                    onChangeText={(text) =>
                                        handleSparePartChange(index, "quantity", parseInt(text))
                                    }
                                />
                            </View>
                            <View style={styles.inputContainerCost}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Chi phí thực tế"
                                    keyboardType="numeric"
                                    value={sparePart.actualCost.toString()}
                                    onChangeText={(text) =>
                                        handleSparePartChange(index, "actualCost", parseInt(text))
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
                                style={[styles.button, styles.removeButton]}
                                onPress={() => handleRemoveSparePart(index)}
                            >
                                <Text style={styles.buttonText}>Xóa</Text>
                            </Pressable>
                        </View>
                    ))}
                    <Pressable style={styles.button} onPress={handleAddSparePart}>
                        <Text style={styles.buttonText}>Thêm Phụ Tùng</Text>
                    </Pressable>
                    <Text>Dịch Vụ</Text>
                    {services.map((service, index) => (
                        <View key={index}>
                            <View style={styles.inputContainerCost}>
                                <Picker
                                    selectedValue={service.maintenanceServiceCostId}
                                    onValueChange={(value) =>
                                        handleServiceChange(index, "maintenanceServiceCostId", value)
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
                                    keyboardType="numeric"
                                    value={service.quantity.toString()}
                                    onChangeText={(text) =>
                                        handleServiceChange(index, "quantity", parseInt(text))
                                    }
                                />
                            </View>
                            <View style={styles.inputContainerCost}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Chi phí thực tế"
                                    keyboardType="numeric"
                                    value={service.actualCost.toString()}
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
                                    onChangeText={(text) => handleServiceChange(index, "note", text)}
                                />
                            </View>
                            <Pressable
                                style={[styles.button, styles.removeButton]}
                                onPress={() => handleRemoveService(index)}
                            >
                                <Text style={styles.buttonText}>Xóa</Text>
                            </Pressable>
                        </View>
                    ))}
                    <Pressable style={styles.button} onPress={handleAddService}>
                        <Text style={styles.buttonText}>Thêm Dịch Vụ</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={handleSignup}>
                        <Text style={styles.buttonText}>Tạo Lịch</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    form: {
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputContainerCost: {
        marginBottom: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    removeButton: {
        backgroundColor: COLORS.danger,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    picker: {
        height: 50,
        width: "100%",
    },
});

export default CreateBookingInfo;
