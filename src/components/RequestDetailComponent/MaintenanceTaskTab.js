import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button } from 'react-native';
import { getTechnicianDetail } from '../../api/requestDetailService'; 
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import StaffListComponent from '../BookingComponent/StaffListComponent';
import { fetchStaffByCenter } from '../../app/CusCare/requestDetailSlice';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
const MaintenanceTaskTab = ({ maintenanceTasks, request, assignTask }) => {
    const [technicianDetails, setTechnicianDetails] = useState({});
    const mInfoId = request.responseMaintenanceInformation.informationMaintenanceId;
    const navigation = useNavigation();
    const [isAssignModalVisible, setAssignModalVisible] = useState(false);
    const staffList = useSelector((state) => state.requestDetail.staffList);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const dispatch = useDispatch();

    const fetchStaffList = async () => {
        if (request?.maintenanceCenterId && staffList.length === 0) {
            await dispatch(fetchStaffByCenter(request.maintenanceCenterId));
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            fetchStaffList();
        });

        fetchStaffList();

        return unsubscribe;
    }, [navigation]);

    const toggleAssignModal = () => {
        setAssignModalVisible(!isAssignModalVisible);
    };
    
    const handleAssignTask = async () => {
        if (!selectedStaff) {
            alert('Vui lòng chọn một nhân viên để giao xe');
            return;
        }
        console.log(` MaintenanceTaskTab: ${mInfoId}, ${selectedStaff.technicianId}`);
        assignTask( mInfoId, selectedStaff.technicianId );
        toggleAssignModal();
    };
    
    useEffect(() => {
        const fetchTechnicianDetails = async () => {
            const technicianInfo = {};
            for (const task of maintenanceTasks) {
                if (task.technicianId) {
                    try {
                        const data = await getTechnicianDetail(task.technicianId);
                        technicianInfo[task.technicianId] = data;
                    } catch (error) {
                        console.error(`Error fetching details for technician ID ${task.technicianId}:`, error);
                    }
                }
            }
            setTechnicianDetails(technicianInfo);
        };

        fetchTechnicianDetails();
    }, [maintenanceTasks]);
    const translateStatus = (status) => {
        const statusMapping = {
          WAITING: "Đang chờ",
          ACCEPTED: "Đã chấp nhận",
          CANCELLED: "Đã hủy",
          DONE: "Đã hoàn thành",
    
      
        };
        return statusMapping[status] || status;
      };
    const renderTaskItem = ({ item }) => {
        const technician = technicianDetails[item.technicianId];
        return (
            <View style={styles.taskContainer}>
                <Text style={styles.taskTitle}>Tên công việc: {item.maintenanceTaskName}</Text>
                <Text style={styles.taskDetail}>Ngày giao: {moment(item?.createdDate).format("DD/MM/YYYY HH:mm")}</Text>
                <Text style={styles.taskDetail}>Tình trạng công việc: {translateStatus(item.status)}</Text>
                {technician ? (
                    <View style={styles.technicianContainer}>
                        <Text style={styles.technicianTitle}>Nhân viên nhận xe</Text>
                        <Image
                            source={{ uri: technician.logo }}
                            style={styles.technicianImage}
                        />
                        <Text style={styles.technicianDetail}>
                            Tên: {technician.firstName} {technician.lastName}
                        </Text>
                    </View>
                ) : (
                    <Text>Loading technician details...</Text>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={maintenanceTasks}
                renderItem={renderTaskItem}
                keyExtractor={(item) => item.maintenanceTaskId.toString()}
                contentContainerStyle={styles.listContainer}
            />
            <Button title="Giao xe cho nhân viên" onPress={toggleAssignModal} />
            <Modal isVisible={isAssignModalVisible}>
                <View style={styles.modalContent}>
                    <StaffListComponent
                        staffList={staffList}
                        selectedStaff={selectedStaff}
                        setSelectedStaff={setSelectedStaff}
                    />
                    <View style={styles.buttonContainer}>
                    <Button title="Xác nhận" onPress={handleAssignTask} />
                    <Button title="Hủy" onPress={toggleAssignModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
    },
    taskContainer: {
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    taskTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    taskDetail: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    technicianContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    technicianTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 5,
    },
    technicianDetail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    technicianImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    }
});

export default MaintenanceTaskTab