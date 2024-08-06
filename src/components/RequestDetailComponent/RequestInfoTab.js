import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, Pressable } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Moment from 'moment';
import ErrorComponent from '../ErrorComponent';
import Modal from 'react-native-modal';
import axios from 'axios';
import SparePartComponent from '../BookingComponent/SparePartComponent';
import ServiceComponent from '../BookingComponent/ServiceComponent';
import InvoiceComponent from '../BookingComponent/InvoiceComponent'; // Import InvoiceComponent
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import StaffListComponent from '../BookingComponent/StaffListComponent';
import { fetchStaffByCenter, setIsTaskAssigned } from '../../app/CusCare/requestDetailSlice';
import { useNavigation } from '@react-navigation/native';
const RequestInfoTab = ({ request, updateStatus, error, profile, assignTask}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const staffList = useSelector((state) => state.requestDetail.staffList);
  const [isAssignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [spareParts, setSpareParts] = useState([]);
  const [services, setServices] = useState([]);
  const [availableSpareParts, setAvailableSpareParts] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [isInvoiceModalVisible, setInvoiceModalVisible] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  //useEffect(() => {
    //if (request?.responseMaintenanceInformation.responseMaintenanceServiceInfos.length === 0 && request?.responseMaintenanceInformation.responseMaintenanceSparePartInfos.length === 0) {
   //   alert(
  //      "Không có thông tin dịch vụ, có muốn tạo không?",
   //     [
   //       {
   //         text: "Không",
   //         style: "cancel",
   //       },
  //        {
   //         text: "Đồng ý",
   //         onPress: () => navigation.navigate("CREATE_BOOKING_INFO", { request, profile, centre }),
   //       },
   //     ],
   //     { cancelable: false }
   //   );
    //}
  //}, [request]);
  const mInfoId = request.responseMaintenanceInformation?.informationMaintenanceId;
  
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

  
  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const response = await axios.get(
          `https://autocareversion2.tryasp.net/api/SparePartsItemCosts/GetListByClient?centerId=${request.maintenanceCenterId}`,
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
          `https://autocareversion2.tryasp.net/api/MaintenanceServiceCosts/GetListByClient?centerId=${request.maintenanceCenterId}`,
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
  
    fetchSpareParts();
    fetchServices();
  }, [request.maintenanceCenterId, request?.responseVehicles.vehicleModelName]);
  
  
   
  
  const toggleModal = (type) => {
    setModalType(type);
    setModalVisible(!isModalVisible);
  };

  const toggleInvoiceModal = () => {
    setInvoiceModalVisible(!isInvoiceModalVisible);
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

  const handleSave = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      console.log('Saving with request:', request); // Log

      const url = modalType === 'SPARE_PART'
      ? 'https://autocareversion2.tryasp.net/api/MaintenanceSparePartInfoes/Post'
      : 'https://autocareversion2.tryasp.net/api/MaintenanceServiceInfoes/Post';
      
      const items = modalType === 'SPARE_PART' ? spareParts : services;

      for (const item of items) {
        const payload = {
          maintenanceInformationId: mInfoId,
          ...(modalType === 'SPARE_PART'
            ? {
              sparePartsItemCostId: item.sparePartsItemCostId,
              maintenanceSparePartInfoName: item.maintenanceSparePartInfoName,
              quantity: item.quantity,
              actualCost: item.actualCost,
              note: item.note,
            }
            : {
              maintenanceServiceCostId: item.maintenanceServiceCostId,
              maintenanceServiceInfoName: item.maintenanceServiceInfoName,
              quantity: item.quantity,
              actualCost: item.actualCost,
              note: item.note,
            })
        };  

        // Log payload for debugging
        console.log('Payload:', payload);

        const response = await axios.post(
          url,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status !== 200) {
          alert('Lưu không thành công. Vui lòng thử lại.');
          return;
        }
      }
      alert('Lưu thành công!');
      toggleModal('');
    } catch (error) {
      console.error('Error during save:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };
  const handlePayment = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      const informationMaintenanceId = request.responseMaintenanceInformation?.informationMaintenanceId;
      const description = "Payment for maintenance"; 
      await axios.post(
        'https://autocareversion2.tryasp.net/api/Receipts/Post',
        { informationMaintenanceId, description },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const fetchInvoiceData = async () => {
        try {
          const response = await axios.get(`https://autocareversion2.tryasp.net/api/Receipts/GetByInforId?id=${request.responseMaintenanceInformation.informationMaintenanceId}`);
          setInvoiceData(response.data);
        } catch (error) {
          console.error('Error fetching invoice data:', error);
        }
      };
      toggleInvoiceModal(),
      fetchInvoiceData();
      console.log(invoiceData);
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.');
    }
  };
const handleCheckin = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');

    await axios.patch(`https://autocareversion2.tryasp.net/api/MaintenanceInformations/CHANGESTATUS?id=${request.responseMaintenanceInformation?.informationMaintenanceId}&status=CHECKIN`,
     {
        headers: {
          'Content-Type': 'text/plain',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );   
  } catch (error) {
    console.error('Error during checkin:', error);
    alert('Có lỗi xảy ra khi check in xe. Vui lòng thử lại.');
  }
};
const handleAssignTask = async () => {
  if (!selectedStaff) {
    alert('Please select a staff member');
    return;
  }
  console.log(`RequestInfoTab: ${mInfoId}, ${selectedStaff.technicianId}`);
  assignTask(mInfoId, selectedStaff.technicianId);
};

const getLastStatus = () => {
  const statuses = request?.responseMaintenanceInformation?.responseMaintenanceHistoryStatuses;
  return statuses?.[statuses.length - 1]?.status;
};

const lastStatus = getLastStatus();
useEffect(() => {
  if (!['CHECKIN', 'REPAIRING', 'PAYMENT'].includes(lastStatus)) {
    dispatch(setIsTaskAssigned(false));
  } else {
    dispatch(setIsTaskAssigned(true));
  }
  
}, [request, dispatch]);
  return error ? (
    <ErrorComponent message={error} />
  ) : (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Thông tin yêu cầu" left={(props) => <MaterialIcons {...props} name="info" />} />
        <Card.Content>
          <Text style={styles.label}>
            <MaterialIcons name="note" size={24} color="black" /> Ghi chú: {request?.note} 
          </Text>
          <Text style={styles.label}>
            <MaterialIcons name="schedule" size={24} color="black" /> Ngày tạo: {Moment(request?.createdDate).format('DD/MM/YYYY HH:mm')}
          </Text>
          <Text style={styles.label}>
            <MaterialIcons name="event" size={24} color="black" /> Ngày đặt lịch: {Moment(request?.bookingDate).format('DD/MM/YYYY HH:mm')}
          </Text>
          <Text style={styles.label}>
            <MaterialIcons name="info" size={24} color="black" /> Trạng thái: {request?.status}
          </Text>
          <Text style={styles.label}>
            <MaterialIcons name="person" size={24} color="black" /> Tên khách hàng: {request?.clientName}
          </Text>
          <Text style={styles.label}>
            <MaterialIcons name="directions-car" size={24} color="black" /> Biển số xe: {request?.vehicleNumber}
          </Text>
          <Text style={styles.label}>
            <MaterialIcons name="store" size={24} color="black" /> Tên trung tâm bảo dưỡng: {request?.maintenanceCenterName || 'Không có thông tin'}
          </Text>
          {request?.status === 'WAITING' ? (
  <View style={styles.buttonContainer}>
    <Button title="Chấp nhận" onPress={() => updateStatus('ACCEPTED')} color="green" />
    <Button title="Từ chối" onPress={() => updateStatus('DENIED')} color="red" />
  </View>
) : (
  request?.status === 'ACCEPTED' ? (
    <View style={styles.buttonContainer}>
      {lastStatus === 'WAITINGBYCAR' && (
        <Button title="Check In" onPress={handleCheckin} />
      )}
      {lastStatus === 'REPAIRING' && (
        <>
          <Button title="Thêm Phụ Tùng" onPress={() => toggleModal('SPARE_PART')} />
          <Button title="Thêm Dịch Vụ" onPress={() => toggleModal('SERVICE')} />
        </>
      )}
      {lastStatus === 'PAYMENT' && (
        <>
          <Button title="In Hóa Đơn" onPress={() => { handlePayment() }} />
        </>
      )}
    </View>
  )  : null
)}

        </Card.Content>
      </Card>
      {error && <Text style={styles.error}>{error}</Text>}
      
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          {modalType === 'SPARE_PART' ? (
            <SparePartComponent
              spareParts={spareParts}
              availableSpareParts={availableSpareParts}
              handleAddSparePart={handleAddSparePart}
              handleRemoveSparePart={handleRemoveSparePart}
              handleSparePartChange={handleSparePartChange}
            />
          ) : (
            <ServiceComponent
              services={services}
              availableServices={availableServices}
              handleAddService={handleAddService}
              handleRemoveService={handleRemoveService}
              handleServiceChange={handleServiceChange}
            />
          )}
          <Button title="Lưu" onPress={handleSave} />
          <Button title="Hủy" onPress={() => toggleModal('')} />
        </View>
      </Modal>
      <Modal isVisible={isInvoiceModalVisible} style={styles.fullScreenModal}>
  <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.modalContent}>
      <InvoiceComponent request={request} profile={profile} invoiceData={invoiceData} />
      <Button title="Xác Nhận" onPress={toggleInvoiceModal} /> 
    </View>
  </ScrollView>
</Modal>
<Modal isVisible={isAssignModalVisible}>
  <View style={styles.modalContent}>
    <StaffListComponent
      staffList={staffList}
      selectedStaff={selectedStaff}
      setSelectedStaff={setSelectedStaff}
    />
    <Button title="Giao việc" onPress={handleAssignTask} />
    <Button title="Hủy" onPress={toggleAssignModal} />
  </View>
</Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginTop: 16,
  },
  fullScreenModal: {
    justifyContent: 'center',
    margin: 0,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    maxWidth: '90%',
  },
});

export default RequestInfoTab;
