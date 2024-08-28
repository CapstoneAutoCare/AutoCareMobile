import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, Pressable, TextInput } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import ErrorComponent from '../ErrorComponent';
import Modal from 'react-native-modal';
import SparePartComponent from '../BookingComponent/SparePartComponent';
import ServiceComponent from '../BookingComponent/ServiceComponent';
import InvoiceComponent from '../BookingComponent/InvoiceComponent'; 
import { useDispatch, useSelector } from 'react-redux';
import StaffListComponent from '../BookingComponent/StaffListComponent';
import { fetchStaffByCenter, setIsTaskAssigned } from '../../app/CusCare/requestDetailSlice';
import { useNavigation } from '@react-navigation/native';
import axiosClient from '../../services/axiosClient';
import { fetchRequestDetail } from '../../app/CusCare/requestDetailSlice';
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
  const [isOdooModalVisible, setOdooModalVisible] = useState(false);
  const [odooNumber, setOdooNumber] = useState("");
  const [odooDetails, setOdooDetails] = useState(null);

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
  const currentTime = moment();


  
  const toggleAssignModal = () => {
    setAssignModalVisible(!isAssignModalVisible);
  };  

  
  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const response = await axiosClient.get(
          `SparePartsItemCosts/GetListByDifSparePartAndInforId?centerId=${request.maintenanceCenterId}&inforId=${request.responseMaintenanceInformation.informationMaintenanceId}`,
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
          `MaintenanceServiceCosts/GetListByDifMaintenanceServiceAndInforIdAndBooleanFalse?centerId=${request.maintenanceCenterId}&inforId=${request.responseMaintenanceInformation.informationMaintenanceId}`,
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
    fetchOdooHistories();
  }, []);
  
   
  
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
      console.log('Saving with request:', request); 
  
      const url = modalType === 'SPARE_PART'
        ? 'MaintenanceSparePartInfoes/Post'
        : 'MaintenanceServiceInfoes/Post';
      
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
  
       
  
        const response = await axiosClient.post(url, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
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
      const infoId = request.responseMaintenanceInformation?.informationMaintenanceId;
  
     
      const fetchInvoiceData = async () => {
        try {
          const response = await axiosClient.get(`Receipts/GetByInforId?id=${infoId}`);
          setInvoiceData(response.data);
        } catch (error) {
          console.error('Error fetching invoice data:', error);
        }
      };
  
      fetchInvoiceData();
  
      if (!invoiceData) {
        const description = "Hóa Đơn Xe" + request.responseVehicles.licensePlate; 
        await axiosClient.post(
          'Receipts/Post',
          { informationMaintenanceId: infoId, description },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
       
        await fetchInvoiceData();
      }
  
      toggleInvoiceModal();
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.');
    }
  };
  
  
  const handleCheckin = async () => {
    try {
      const infoId = request.responseMaintenanceInformation?.informationMaintenanceId;
      
      await axiosClient.patch(
        `MaintenanceInformations/CHANGESTATUS?id=${infoId}&status=CHECKIN`,
        null, 
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      );  
      dispatch(fetchRequestDetail(request.bookingId));
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
  dispatch(fetchRequestDetail(request.bookingId));

};
const toggleOdooModal = () => {
  setOdooModalVisible(!isOdooModalVisible);
};

const handleOdooUpdate = async () => {
  if (odooNumber.trim() === "" || isNaN(odooNumber)) {
    alert("Lỗi", "Vui lòng nhập số Odoo hợp lệ.");
    return;
  }

  try {
    const response = await axiosClient.post("/OdoHistories/Post", {
      odo: odooNumber,
      description: "Chỉ số odoo tại hãng",
      vehiclesId: request.responseVehicles.vehiclesId,
      maintenanceInformationId: request.responseMaintenanceInformation.informationMaintenanceId
    });

    if (response.status === 200) {
      alert("Thành công", "Cập nhật số Odoo thành công.");
      toggleOdooModal();
      setOdooNumber("");

      // Fetch Odoo data after successful update
      dispatch(fetchRequestDetail(request.bookingId));
    } else {
      alert("Lỗi", "Cập nhật không thành công. Vui lòng thử lại.");
    }
  } catch (error) {
    console.error(error);
    alert("Lỗi", "Đã xảy ra lỗi khi cập nhật số Odoo.");
  }
};
const fetchOdooHistories = async () =>{
  const odoDataResponse = await axiosClient.get(`/OdoHistories/GetOdoByInforId?id=${mInfoId}`);
      if (odoDataResponse.status === 200) {
        const odoData = odoDataResponse.data;
        // Set Odoo data to state or context to display in the UI
        setOdooDetails({
          odoHistoryName: odoData.odoHistoryName,
          odo: odoData.odo,
          createdDate: odoData.createdDate,
          description: odoData.description,
        });
      } else {
        alert("Lỗi", "Không thể lấy dữ liệu Odoo. Vui lòng thử lại.");
      }
    }

const getLastStatus = () => {
  const statuses = request?.responseMaintenanceInformation?.status;
  return statuses
};
const lastStatus = getLastStatus();
useEffect(() => {
  if (!['CHECKIN', 'REPAIRING', 'PAYMENT', 'PAID', 'YETPAID'].includes(lastStatus)) {
    dispatch(setIsTaskAssigned(false));
  } else {
    dispatch(setIsTaskAssigned(true));
  }
  
}, [request, dispatch]);
const translateStatus = (status) => {
  const statusMapping = {
    WAITING: "Đang chờ",
    ACCEPTED: "Đã chấp nhận",
    CANCELLED: "Đã hủy",
    DENIED: "Đã từ chối",
    FINISHED: "Đã hoàn thành",
    WAITINGBYCAR: "Đang chờ xe",
    CREATEDBYCLIENT: "Yêu cầu bởi khách hàng",
    CREATEDBYClIENT: "Yêu cầu bởi khách hàng",

    CHECKIN: "Khách hàng đã đến",
    REPAIRING: "Đang sửa chữa",
    PAYMENT: "Thanh toán",
    PAID: "Đã thanh toán",
    YETPAID: "Chưa thanh toán"
  };
  return statusMapping[status] || status;
};
const getStatusColor = (status) => {
  switch (status) {
    case "CHECKIN":
      return "blue";
    case "CREATEDBYClIENT":
      return "orange";
    case "PAYMENT":
      return "purple";
    case "PAID":
      return "green";
    case "YETPAID":
      return "red";
    default:
      return "black";
  }
};
const OdooCard = ({ odoHistoryName, odo, createdDate, description }) => {
  return (
    <Card style={styles.card}>
      <Card.Title
        title="Thông tin Odoo"
        left={(props) => <MaterialIcons {...props} name="history" />}
      />
      <Card.Content>
        <Text style={styles.label}>
          <MaterialIcons name="label" size={24} color="black" /> Tên lịch sử Odoo: {odoHistoryName}
        </Text>
        <Text style={styles.label}>
          <MaterialIcons name="directions-car" size={24} color="black" /> Odo: {odo}
        </Text>
        <Text style={styles.label}>
          <MaterialIcons name="schedule" size={24} color="black" /> Ngày tạo: {moment(createdDate).format('DD/MM/YYYY HH:mm')}
        </Text>
        <Text style={styles.label}>
          <MaterialIcons name="description" size={24} color="black" /> Mô tả: {description}
        </Text>
      </Card.Content>
    </Card>
  );
};
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
            <MaterialIcons name="schedule" size={24} color="black" /> Ngày tạo: {moment(request?.createdDate).format('DD/MM/YYYY HH:mm')}
          </Text>
          <Text style={styles.label}>
            <MaterialIcons name="event" size={24} color="black" /> Ngày đặt lịch: {moment(request?.bookingDate).format('DD/MM/YYYY HH:mm')}
          </Text>
          <Text style={[styles.label, {color: getStatusColor(request?.responseMaintenanceInformation?.status)}]}>
            <MaterialIcons name="info" size={24} color="black" /> Trạng thái: {translateStatus(request?.responseMaintenanceInformation?.status)}
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
          <Text style={styles.label}>
            <MaterialIcons name="directions-car" size={24} color="black" /> Số km hiện tại: {request?.responseVehicles?.odo}
          </Text>
          <Modal
          visible={isOdooModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleOdooModal}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <View style={{ width: 300, padding: 20, backgroundColor: "white", borderRadius: 10 }}>
              <TextInput
                placeholder="Nhập số Odoo"
                keyboardType="numeric"
                value={odooNumber}
                onChangeText={setOdooNumber}
                style={{ borderBottomWidth: 1, marginBottom: 20, fontSize: 18 }}
              />
              <Button title="Cập Nhật" onPress={handleOdooUpdate} />
              <Button title="Hủy" onPress={toggleOdooModal} />
            </View>
          </View>
        </Modal>
          {request?.status === 'WAITING' ? (
  <View style={styles.buttonContainer}>
    <Button title="Chấp nhận" onPress={() => updateStatus('ACCEPTED')} color="green" />
    <Button title="Từ chối" onPress={() => updateStatus('CANCELLED')} color="red" />
  </View>
) : (
  request?.status === 'ACCEPTED' ? (
    <View style={styles.buttonContainer}>
      {lastStatus === 'WAITINGBYCAR' && (
      <View style={styles.buttonContainer}>
        <Button title="Khách hàng đã tới" onPress={handleCheckin} />
        {(currentTime.isAfter(moment(request.bookingDate))) && (
              <Button 
                title="Từ chối" 
                onPress={() => updateStatus('CANCELLED')} 
                color="red" 
              />
            )}

      </View>   
      )}
      {lastStatus === 'REPAIRING' && (
        <>
          <Button title="Thêm Phụ Tùng" onPress={() => toggleModal('SPARE_PART')} />
          <Button title="Thêm Dịch Vụ" onPress={() => toggleModal('SERVICE')} />
        </>
      )}
       {lastStatus === "REPAIRING" || lastStatus === "CHECKIN" &&(
          <>
            <Button title="Cập Nhật Số Odoo" onPress={toggleOdooModal} />
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
      {odooDetails && (
        <OdooCard
          odoHistoryName={odooDetails.odoHistoryName}
          odo={odooDetails.odo}
          createdDate={odooDetails.createdDate}
          description={odooDetails.description}
        />
      )}
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
