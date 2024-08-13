import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup timeout khi component unmount hoặc khi giá trị thay đổi
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
const MaintenanceCenterInfoScreen = ({ }) => {
    const [availableSpareParts, setAvailableSpareParts] = useState([]);
    const [availableServices, setAvailableServices] = useState([]);
    const [servicePackages, setServicePackages] = useState([]);
    const dispatch = useDispatch();
    const [selectedData, setSelectedData] = useState(null);

    const [sparePartsModalVisible, setSparePartsModalVisible] = useState(false);
    const [servicesModalVisible, setServicesModalVisible] = useState(false);
    const [servicePackagesModalVisible, setServicePackagesModalVisible] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [vehicleModels, setVehicleModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);
    const [odometerReading, setOdometerReading] = useState('');
    const [isModelFilterEnabled, setIsModelFilterEnabled] = useState(false);
// State debounce
    const debouncedModel = useDebounce(selectedModel, 300); // Trì hoãn 300ms

    const navigation = useNavigation();
    const { profile } = useSelector((state) => state.user || {});
    const getProfileInfo = async () => {
        await dispatch(getProfile());
    };
  useEffect(() => {
    if (debouncedModel) {
        const filteredData = vehicleModels.filter(model => model.vehicleModelName.includes(debouncedModel));
        setVehicleModels(filteredData);
    }
}, [debouncedModel]);
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getProfileInfo();
        });
        getProfileInfo();
        return unsubscribe;
    }, [navigation]);

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
            setAvailableSpareParts(response.data);
        } catch (error) {
            console.error('Error fetching spare parts:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
            const response = await axios.get(
                `https://autocareversion2.tryasp.net/api/MaintenanceServiceCosts/GetListByDifMaintenanceServiceAndInforIdAndBooleanFalse?centerId=${profile.CentreId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setAvailableServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const fetchServicePackages = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
            const response = await axios.get(
                `https://autocareversion2.tryasp.net/api/MaintenanceServices/GetListByCenterId?id=${profile.CentreId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setServicePackages(response.data);
        } catch (error) {
            console.error('Error fetching service packages:', error);
        }
    };

    useEffect(() => {
        fetchSpareParts();
        fetchServices();
        fetchServicePackages();
        fetchVehicleModels();

    }, []);
    const fetchVehicleModels = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
            const response = await axios.get(
                `https://autocareversion2.tryasp.net/api/VehicleModel/GetAll`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setVehicleModels(response.data);
        } catch (error) {
            console.error('Error fetching vehicle models:', error);
        }
    };

    const openModal = (data, type) => {
        setSelectedData(data);
        if (type === 'spareParts') setSparePartsModalVisible(true);
        if (type === 'services') setServicesModalVisible(true);
        if (type === 'servicePackages') setServicePackagesModalVisible(true);
    };

    const openDetailModal = (item, type) => {
        setSelectedData(item);
        setDetailModalVisible(type);
    };
    const renderFilteredList = (data, keyExtractor, renderItem) => (
        <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            contentContainerStyle={{ flexGrow: 1 }}
        />
    );
    const FilterSection = ({
        isModelFilterEnabled,
        setIsModelFilterEnabled,
        selectedModel,
        setSelectedModel,
        vehicleModels = [],  // Default to empty array
        odometerReading,
        setOdometerReading
    }) => {
        return (
            <>
                {/* Checkbox for Model Filter */}
                <View style={styles.filterContainer}>
                    <Text>Filter by Vehicle Model</Text>
                    <TouchableOpacity onPress={() => setIsModelFilterEnabled(!isModelFilterEnabled)}>
                        <Text style={styles.checkbox}>
                            {isModelFilterEnabled ? '☑' : '☐'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Vehicle Model Search Box */}
                {isModelFilterEnabled && (
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search Vehicle Model..."
                            onChangeText={setSelectedModel} // Trực tiếp cập nhật selectedModel
                            value={selectedModel}
                        />
                        <FlatList
                            data={vehicleModels.filter(model => model.vehicleModelName.includes(selectedModel))}
                            keyExtractor={(item) => item.vehicleModelId.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => setSelectedModel(item.vehicleModelName)}>
                                    <Text style={styles.itemText}>{item.vehicleModelName}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}

                {/* Odometer Reading Input */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter Odometer Reading..."
                    keyboardType="numeric"
                    onChangeText={(text) => setOdometerReading(text)}
                    value={odometerReading}
                />
            </>
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <TouchableOpacity style={styles.card} onPress={() => openModal(servicePackages, 'servicePackages')}>
                    <Text style={styles.cardText}>Service Packages</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => openModal(availableServices, 'services')}>
                    <Text style={styles.cardText}>Available Services</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => openModal(availableSpareParts, 'spareParts')}>
                    <Text style={styles.cardText}>Available Spare Parts</Text>
                </TouchableOpacity>

                <Modal visible={servicePackagesModalVisible} transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <FilterSection
                                isModelFilterEnabled={isModelFilterEnabled}
                                setIsModelFilterEnabled={setIsModelFilterEnabled}
                                selectedModel={selectedModel}
                                setSelectedModel={setSelectedModel}
                                vehicleModels={vehicleModels}
                                odometerReading={odometerReading}
                                setOdometerReading={setOdometerReading}
                            />
                            {renderFilteredList(
                                servicePackages.filter(item =>
                                    (!isModelFilterEnabled || item.vehicleModelId === selectedModel?.vehicleModelId) &&
                                    (!odometerReading || (item.maintananceScheduleName && item.maintananceScheduleName.includes(odometerReading)))
                                ),
                                item => item.maintenanceServiceId.toString(),
                                ({ item }) => (
                                    <TouchableOpacity onPress={() => openDetailModal(item, 'servicePackage')}>
                                        <Text style={styles.itemText}>
                                            {"Gói dịch vụ tại mốc odoo " + item.maintananceScheduleName + " dành cho xe " + item.vehiclesBrandName + " " + item.vehicleModelName}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            )}
                            <TouchableOpacity onPress={() => setServicePackagesModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal visible={servicesModalVisible} transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <FilterSection
                                isModelFilterEnabled={isModelFilterEnabled}
                                setIsModelFilterEnabled={setIsModelFilterEnabled}
                                selectedModel={selectedModel}
                                setSelectedModel={setSelectedModel}
                                vehicleModels={vehicleModels}
                                odometerReading={odometerReading}
                                setOdometerReading={setOdometerReading}
                            />
                            {renderFilteredList(
                                availableServices.filter(item =>
                                    (!isModelFilterEnabled || item.vehicleModelId === selectedModel?.vehicleModelId) &&
                                    (!odometerReading || (item.maintananceScheduleName && item.maintananceScheduleName.includes(odometerReading)))
                                ),
                                item => item.maintenanceServiceCostId.toString(),
                                ({ item }) => (
                                    <TouchableOpacity onPress={() => openDetailModal(item, 'service')}>
                                        <Text style={styles.itemText}>
                                        {"Dịch vụ tại mốc odoo " + item.maintananceScheduleName + " dành cho xe " + item.vehiclesBrandName + " " + item.vehicleModelName}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            )}
                            <TouchableOpacity onPress={() => setServicesModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal visible={sparePartsModalVisible} transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <FilterSection
                                isModelFilterEnabled={isModelFilterEnabled}
                                setIsModelFilterEnabled={setIsModelFilterEnabled}
                                selectedModel={selectedModel}
                                setSelectedModel={setSelectedModel}
                                vehicleModels={vehicleModels}
                                odometerReading={odometerReading}
                                setOdometerReading={setOdometerReading}
                            />
                            {renderFilteredList(
                                availableSpareParts.filter(item =>
                                    (!isModelFilterEnabled || item.vehicleModelId === selectedModel?.vehicleModelId) &&
                                    (!odometerReading || (item.maintananceScheduleName && item.maintananceScheduleName.includes(odometerReading)))
                                ),
                                item => item.sparePartsItemCostId.toString(),
                                ({ item }) => (
                                    <TouchableOpacity onPress={() => openDetailModal(item, 'sparePart')}>
                                        <Text style={styles.itemText}>
                                        {item.sparePartsItemName + " dành cho xe " + item.vehiclesBrandName + " " + item.vehicleModelName}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            )}
                            <TouchableOpacity onPress={() => setSparePartsModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Modal for displaying Service Package details */}
                <Modal visible={detailModalVisible === 'servicePackage'} transparent={true} animationType="slide">
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <Text style={styles.detailText}>Service Package Information</Text>
            <Text style={styles.itemText}>Name: {"Gói " + selectedData?.maintenanceServiceName}</Text>
            <Text style={styles.itemText}>Price: {selectedData?.price}</Text>
            <Text style={styles.itemText}>Note: {selectedData?.note}</Text>
            <Text style={styles.itemText}>Model Name: {selectedData?.vehicleModelName}</Text>
            <Text style={styles.itemText}>Brand Name: {selectedData?.vehiclesBrandName}</Text>
            
            <Text style={styles.detailText}>Included Services:</Text>
            {selectedData?.responseMaintenanceServiceCosts && selectedData?.responseMaintenanceServiceCosts.map((service, index) => (
                <View key={index} style={styles.serviceItem}>
                    <View style={styles.serviceTextContainer}>
                        <Text style={styles.itemText}>Service Name: {service?.maintenanceServiceName}</Text>
                        <Text style={styles.itemText}>Price: {service?.acturalCost}</Text>
                        <Text style={styles.itemText}>Note: {service?.note}</Text>
                    </View>
                    {service?.image && (
                        <Image 
                            source={{ uri: service?.image }} 
                            style={styles.serviceImage} 
                            resizeMode="contain"
                        />
                    )}
                </View>
            ))}

            <TouchableOpacity onPress={() => setDetailModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>


{/* Modal for displaying Service details */}
<Modal visible={detailModalVisible === 'service'} transparent={true} animationType="slide">
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Text style={styles.detailText}>Service Information</Text>
            <Text style={styles.itemText}>Name: {selectedData?.sparePartsItemName}</Text>
            <Text style={styles.itemText}>Price: {selectedData?.acturalCost}</Text>
            <Text style={styles.itemText}>Note: {selectedData?.note}</Text>
            <Text style={styles.itemText}>Model Name: {selectedData?.vehicleModelName}</Text>
            <Text style={styles.itemText}>Brand Name: {selectedData?.vehiclesBrandName}</Text>
            {selectedData?.image && (
                        <Image 
                            source={{ uri: selectedData?.image }} 
                            style={styles.serviceImage} 
                            resizeMode="contain"
                        />
                    )}
            <TouchableOpacity onPress={() => setDetailModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>

{/* Modal for displaying Spare Part details */}
<Modal visible={detailModalVisible === 'sparePart'} transparent={true} animationType="slide">
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <Text style={styles.detailText}>Spare Part Information</Text>
            <Text style={styles.itemText}>Name: {selectedData?.sparePartsItemName}</Text>
            <Text style={styles.itemText}>Price: {selectedData?.acturalCost}</Text>
            <Text style={styles.itemText}>Note: {selectedData?.note}</Text>
            <Text style={styles.itemText}>Model Name: {selectedData?.vehicleModelName}</Text>
            <Text style={styles.itemText}>Brand Name: {selectedData?.vehiclesBrandName}</Text>
            {selectedData?.image && (
                        <Image 
                            source={{ uri: selectedData?.image }} 
                            style={styles.serviceImage} 
                            resizeMode="contain"
                        />
                    )}
            <TouchableOpacity onPress={() => setDetailModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-around',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 25, // Increased padding for better spacing
        borderRadius: 15, // Increased border radius for smoother corners
        alignItems: 'center',
        marginVertical: 10,
        shadowColor: '#000', // Add shadow for depth
        shadowOffset: { width: 0, height: 2 }, // Horizontal and vertical offset for the shadow
        shadowOpacity: 0.2, // Opacity of the shadow
        shadowRadius: 5, // Blurriness of the shadow
        elevation: 5, // Android shadow
        borderWidth: 1, // Added border for definition
        borderColor: '#ddd', // Subtle border color
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333', // Darker color for better contrast
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        height: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    itemText: {
        fontSize: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    scrollView: {
        flex: 1,
        marginTop: 20,
      },
    detailText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        marginLeft: 10,
        fontSize: 18,
    },
    searchContainer: {
        marginBottom: 20,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    serviceItem: {
        flexDirection: 'row', // Căn các phần tử theo hàng ngang
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center', // Căn giữa theo chiều dọc
    },
    serviceTextContainer: {
        flex: 1, // Để phần text chiếm hết chiều rộng còn lại
        paddingRight: 10, // Tạo khoảng cách giữa text và hình ảnh
    },
    serviceImage: {
        width: 100,
        height: 100,
        marginVertical: 10,
    },

});

export default MaintenanceCenterInfoScreen;
