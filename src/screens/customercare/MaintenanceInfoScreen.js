import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import axiosClient from '../../services/axiosClient';
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
    const [detailPackageModalVisible, setDetailPackageModalVisible] = useState(false);
    const [vehicleModels, setVehicleModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);
    const [odometerReading, setOdometerReading] = useState('');
    const [isModelFilterEnabled, setIsModelFilterEnabled] = useState(false);
    const [vehicleBrands, setVehicleBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    // State debounce
    const debouncedModel = useDebounce(selectedModel, 300); // Trì hoãn 300ms
    const selectedPackageData = detailPackageModalVisible === 'servicePackage' ? selectedData : null;

    const navigation = useNavigation();
    const { profile } = useSelector((state) => state.user || {});
    const getProfileInfo = async () => {
        await dispatch(getProfile());
    };
    useEffect(() => {
        if (debouncedModel && selectedBrand) {
            const filteredData = vehicleModels.filter(
                model => model.vehicleModelName.includes(debouncedModel) && model.vehiclesBrandId === selectedBrand.vehiclesBrandId
            );
            setVehicleModels(filteredData);
        }
    }, [debouncedModel, selectedBrand]);
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getProfileInfo();
        });
        getProfileInfo();
        return unsubscribe;
    }, [navigation]);

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
            setAvailableSpareParts(response.data);
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
            setAvailableServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const fetchServicePackages = async () => {
        try {
            const response = await axiosClient.get(
                `MaintenanceServices/GetListPackageAndOdoTRUEByCenterId?id=${profile.CentreId}`,
                {
                    headers: {
                        'Content-Type': 'text/plain',
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
    const fetchVehicleModels = async (selectedBrandId) => {
        try {
            const brandsResponse = await axiosClient.get(
                'VehicleBrand/GetAllActive',
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const brands = brandsResponse.data;
            const selectedBrand = brands.find(brand => brand.vehiclesBrandId === selectedBrandId);
    
            if (selectedBrand) {
                const modelsResponse = await axiosClient.get(
                    `VehicleModel/GetListActiveByBrandId?id=${selectedBrand.vehiclesBrandId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setVehicleModels(modelsResponse.data);
            }
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
    const groupByMaintenanceSchedule = (servicePackages) => {
        return servicePackages.reduce((groups, item) => {
            // Bỏ qua các object có status là INACTIVE
            if (item?.responseMaintenanceServiceCosts?.status === 'INACTIVE') {
                return groups;
            }   
            
            const scheduleName = `${item.maintananceScheduleName}_${item.vehicleModelName}_${item.vehiclesBrandName}`;
            
            if (!groups[scheduleName]) {
                groups[scheduleName] = [];
            }
            
            groups[scheduleName].push(item);
            return groups;
        }, {});
    };
    
    

    const openDetailModal = (item, type) => {
        setSelectedData(item);
        setDetailModalVisible(type);
    };
    const openPackageDetailModal = (items) => {
        setSelectedData(items);
        setDetailPackageModalVisible('servicePackage');
    };
    const formatCurrency = (value) => {
        return value?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
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
        vehicleModels = [],  
        selectedBrand,
        setSelectedBrand,
        vehicleBrands = [],
        odometerReading,
        setOdometerReading
    }) => {
        return (
            <>
            <View style={styles.filterContainer}>
                <Text>Filter by Vehicle Brand</Text>
                <FlatList
                    data={vehicleBrands}
                    keyExtractor={(item) => item.vehicleBrandId.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => setSelectedBrand(item)}>
                            <Text style={[
                                styles.itemText,
                                { fontWeight: selectedBrand?.vehicleBrandId === item.vehicleBrandId ? 'bold' : 'normal' }
                            ]}>
                                {item.vehicleBrandName}
                            </Text>
                        </TouchableOpacity>
                    )}
                    horizontal
                />
            </View>

            {selectedBrand && (
                <>
                    <View style={styles.filterContainer}>
                        <Text>Filter by Vehicle Model</Text>
                        <TouchableOpacity onPress={() => setIsModelFilterEnabled(!isModelFilterEnabled)}>
                            <Text style={styles.checkbox}>
                                {isModelFilterEnabled ? '☑' : '☐'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {isModelFilterEnabled && (
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search Vehicle Model..."
                                onChangeText={setSelectedModel}
                                value={selectedModel}
                            />
                            <FlatList
                                data={vehicleModels.filter(model => model.vehicleModelName.includes(selectedModel))}
                                keyExtractor={(item) => item.vehicleModelId.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => setSelectedModel(item)}>
                                        <Text style={styles.itemText}>{item.vehicleModelName}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}
                </>
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
                    <Text style={styles.cardText}>Các Gói Dịch Vụ</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => openModal(availableServices, 'services')}>
                    <Text style={styles.cardText}>Dịch Vụ Hiện Có</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => openModal(availableSpareParts, 'spareParts')}>
                    <Text style={styles.cardText}>Phụ Tùng Hiện Có</Text>
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
                                selectedBrand={selectedBrand}
                                setSelectedBrand={setSelectedBrand}
                                vehicleBrands={vehicleBrands}
                                odometerReading={odometerReading}
                                setOdometerReading={setOdometerReading}
                            />
                            {Object.entries(
                                groupByMaintenanceSchedule(
                                    servicePackages.filter(item =>
                                        (!isModelFilterEnabled || item.vehicleModelId === selectedModel?.vehicleModelId) &&
                                        (!odometerReading || (item?.maintananceScheduleName && item?.maintananceScheduleName.includes(odometerReading)))
                                    )
                                )
                            ).map(([scheduleName, items]) => {
                                const firstItem = items[0]; // Take the first item as the representative
                                return (
                                    <TouchableOpacity key={firstItem.maintenanceServiceId.toString()} onPress={() => openPackageDetailModal(items)}>
                                        <Text style={styles.itemText}>
                                            {"Gói dịch vụ tại mốc odoo " + scheduleName }
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}

                            <TouchableOpacity onPress={() => setServicePackagesModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Đóng</Text>
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
                                selectedBrand={selectedBrand}
                                setSelectedBrand={setSelectedBrand}
                                vehicleBrands={vehicleBrands}
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
                                <Text style={styles.closeButtonText}>Đóng</Text>
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
                                selectedBrand={selectedBrand}
                                setSelectedBrand={setSelectedBrand}
                                vehicleBrands={vehicleBrands}
                                odometerReading={odometerReading}
                                setOdometerReading={setOdometerReading}
                            />
                            {renderFilteredList(
                                availableSpareParts.filter(item =>
                                    (!isModelFilterEnabled || item.vehicleModelId === selectedModel?.vehicleModelId) &&
                                    (!odometerReading || (item?.maintananceScheduleName && item?.maintananceScheduleName.includes(odometerReading)))
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
                                <Text style={styles.closeButtonText}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

              {/* Modal for displaying Service Package details */}
<Modal visible={detailPackageModalVisible === 'servicePackage'} transparent={true} animationType="slide">
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}>
                <Text style={styles.detailText}>Thông tin chi tiết gói dịch vụ</Text>

                {selectedPackageData && selectedPackageData.length > 0 && (
                    <View style={styles.servicePackageContainer}>
                        <Text style={styles.itemText}>
                            {"Gói dịch vụ tại km số " + selectedPackageData[0]?.maintananceScheduleName + " cho xe " + selectedPackageData[0]?.vehiclesBrandName + " " + selectedPackageData[0].vehicleModelName}
                        </Text>
                        
                        <Text style={styles.itemText}>
                            Giá tiền: {formatCurrency(parseFloat(
                                selectedPackageData.flatMap(item => item?.responseMaintenanceServiceCosts || [])
                                .reduce((total, service) => total + (service?.acturalCost || 0), 0)
                                .toFixed(2)
                            ))} 
                        </Text>
                        
                        <Text style={styles.itemText}>Dành cho loại xe: {selectedPackageData[0]?.vehicleModelName}</Text>
                        <Text style={styles.itemText}>Của Hãng: {selectedPackageData[0]?.vehiclesBrandName}</Text>
                    </View>
                )}

                <Text style={styles.detailText}>Các dịch vụ có trong gói:</Text>

                {selectedPackageData && selectedPackageData.flatMap((item, itemIndex) =>
                    item?.responseMaintenanceServiceCosts?.map((service, serviceIndex) => (
                        <View key={`${itemIndex}-${serviceIndex}`} style={styles.serviceItem}>
                            <View style={styles.serviceTextContainer}>
                                <Text style={styles.itemText}>Tên dịch vụ: {service?.maintenanceServiceName}</Text>
                                <Text style={styles.itemText}>Giá tiền: {formatCurrency(service?.acturalCost)}</Text>
                                <Text style={styles.itemText}>Lưu ý: {service?.note}</Text>
                                <Text style={styles.itemText}>Lưu ý: {service?.status}</Text>

                            </View>
                            {service?.image && (
                                <Image
                                    source={{ uri: service?.image }}
                                    style={styles.serviceImage}
                                    resizeMode="contain"
                                />
                            )}
                        </View>
                    ))
                )}
            </ScrollView>

            <TouchableOpacity onPress={() => setDetailPackageModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>





                {/* Modal for displaying Service details */}
                <Modal visible={detailModalVisible === 'service'} transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.detailText}>Thông tin dịch vụ</Text>
                            <Text style={styles.itemText}>{selectedData?.sparePartsItemName}</Text>
                            <Text style={styles.itemText}>Giá tiền: {formatCurrency(selectedData?.acturalCost)}</Text>
                            <Text style={styles.itemText}>Lưu ý: {selectedData?.note}</Text>
                            <Text style={styles.itemText}>Dành cho mẫu xe: {selectedData?.vehicleModelName}</Text>
                            <Text style={styles.itemText}>Của hãng: {selectedData?.vehiclesBrandName}</Text>
                            {selectedData?.image && (
                                <Image
                                    source={{ uri: selectedData?.image }}
                                    style={styles.serviceImage}
                                    resizeMode="contain"
                                />
                            )}
                            <TouchableOpacity onPress={() => setDetailModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Modal for displaying Spare Part details */}
                <Modal visible={detailModalVisible === 'sparePart'} transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.detailText}>Thông tin chi tiết phụ tùng</Text>
                            <Text style={styles.itemText}>{selectedData?.sparePartsItemName}</Text>
                            <Text style={styles.itemText}>Giá tiền: {formatCurrency(selectedData?.acturalCost)}</Text>
                            <Text style={styles.itemText}>Lưu ý: {selectedData?.note}</Text>
                            <Text style={styles.itemText}>Dành cho loại xe: {selectedData?.vehicleModelName}</Text>
                            <Text style={styles.itemText}>Của hãng: {selectedData?.vehiclesBrandName}</Text>
                            {selectedData?.image && (
                                <Image
                                    source={{ uri: selectedData?.image }}
                                    style={styles.serviceImage}
                                    resizeMode="contain"
                                />
                            )}
                            <TouchableOpacity onPress={() => setDetailModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Đóng</Text>
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
        padding: 25,
        borderRadius: 15,
        alignItems: 'center',
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
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
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    serviceTextContainer: {
        flex: 1,
        paddingRight: 10,
    },
    serviceImage: {
        width: 100,
        height: 100,
        marginVertical: 10,
    },
});

export default MaintenanceCenterInfoScreen;
