import { StyleSheet, Text, View, ActivityIndicator, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as SignalR from "@microsoft/signalr";
import { BASE_URL } from "../../../../env";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaintenanceTab from "./MaintenanceTab";  

const Tab = createMaterialTopTabNavigator();

const VehicleDetail = ({ route }) => {
    const navigation = useNavigation();
    const { vehicle, setLoading } = route.params;
    const [vehicleobject, setVehicle] = useState(null);
    const [currentOdo, setCurrentOdo] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [isIncrementing, setIsIncrementing] = useState(false); // Track if incrementing is active

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/Vehicles/GetById?id=${vehicle.vehiclesId}`, {
                    headers: {
                        'accept': 'text/plain'
                    }
                });
                setVehicle(response.data);
                setCurrentOdo(response.data.odo);
            } catch (error) {
                console.error("Error fetching vehicle data: ", error);
            }
        };

        fetchVehicle();

        // Initialize the SignalR connection
        const connection = new SignalR.HubConnectionBuilder()
            .withUrl("https://capstoneautocareapi20240816003911.azurewebsites.net/vehicleHub")
            .withAutomaticReconnect()
            .configureLogging(SignalR.LogLevel.Information)
            .build();

        // Function to handle odometer updates
        const handleOdoUpdate = (vehiclesId, newOdoValue) => {
            if (vehiclesId === vehicle.vehiclesId) {
                setCurrentOdo(newOdoValue);
            }
        };

        // Start the SignalR connection and subscribe to events
        connection
            .start()
            .then(() => {
                console.log("SignalR Connected.");
                connection.on("ReceiveOdoUpdate", handleOdoUpdate);
            })
            .catch((err) => console.error("SignalR Connection Error: ", err));

        return () => {
            connection.stop().then(() => console.log("SignalR Disconnected."));
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);

    const updateVehicle = async (newOdo) => {
        try {
            await axios.put(`${BASE_URL}/Vehicles/PutVehicle?id=${vehicle.vehiclesId}`, {
                color: vehicleobject.color,
                licensePlate: vehicleobject.licensePlate,
                odo: newOdo,
                description: vehicleobject.description,
                status: vehicleobject.status
            }, {
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error("Error updating vehicle data: ", error);
        }
        // setLoading(p => !p);
    };

    const startIncrementOdo = () => {
        if (intervalId) return; // Prevent multiple intervals
        const id = setInterval(() => {
            setCurrentOdo(prevOdo => {
                const newOdo = prevOdo + 1;
                updateVehicle(newOdo);
                return newOdo;
            });
        }, 1000);
        setIntervalId(id);
        setIsIncrementing(true);
    };

    const stopIncrementOdo = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
            setIsIncrementing(false);
        }
    };

    const handleButtonPress = () => {
        if (isIncrementing) {
            stopIncrementOdo();
        } else {
            startIncrementOdo();
        }
    };


    if (!vehicleobject) {
        return <Text style={styles.errorText}>Lỗi: Không tìm thấy xe</Text>;
    }

    const VehicleInfo = () => (
        <View style={styles.container}>
        <Text style={styles.title}>Chi tiết xe</Text>
        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Mẫu xe:</Text>
            <Text style={styles.infoValue}>{vehicleobject.vehicleModelName}</Text>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Hãng xe:</Text>
            <Text style={styles.infoValue}>{vehicleobject.vehiclesBrandName}</Text>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Trạng thái:</Text>
            <Text style={styles.infoValue}>{vehicleobject.status}</Text>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Đặc điểm xe:</Text>
            <Text style={styles.infoValue}>{vehicleobject.description}</Text>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Màu xe:</Text>
            <Text style={styles.infoValue}>{vehicleobject.color}</Text>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Biển số xe:</Text>
            <Text style={styles.infoValue}>{vehicleobject.licensePlate}</Text>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Chỉ số Odo:</Text>
            <Text style={styles.infoValue}>{currentOdo} km</Text>
        </View>
        
        <Pressable
            onPress={handleButtonPress}
            style={[styles.button, isIncrementing ? styles.stopButton : styles.startButton]}
        >
            <Text style={styles.buttonText}>
                {isIncrementing ? "Kết thúc" : "Bắt đầu di chuyển"}
            </Text>
        </Pressable>
        <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
        >
            <Text style={styles.buttonText}>Quay lại</Text>
        </Pressable>
    </View>
    );

    // Return tab navigator with two tabs
    return (
        <Tab.Navigator
        screenOptions={{
          tabBarStyle: { marginTop: 20 }, // Di chuyển thanh tab xuống
        }}
      >
        <Tab.Screen name="Thông tin chi tiết xe" component={VehicleInfo} />
        <Tab.Screen name="Gói bảo dưỡng của xe" component={MaintenanceTab} initialParams={{ vehicle }} />
      </Tab.Navigator>
      
    );
};

export default VehicleDetail;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "white",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        marginTop: 20,
    },
    infoContainer: {
        marginVertical: 8,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    infoValue: {
        fontSize: 16,
        color: "#555",
    },
    button: {
        padding: 12,
        borderRadius: 7,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    startButton: {
        backgroundColor: "#52c41a",
    },
    stopButton: {
        backgroundColor: "#f39c12",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    errorText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
    backButton: {
        padding: 12,
        borderRadius: 7,
        marginTop: 20,
        backgroundColor: "#007bff",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },

});
