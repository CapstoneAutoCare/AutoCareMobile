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

const CreateBooking = ({ centerList, maintenanceCenterId, vehicleListByClient }) => {
  const navigation = useNavigation();
  const [vehicle, setVehicle] = useState("");
  const [maintenanceCenter, setMaintenanceCenter] = useState(maintenanceCenterId || "");
  const [note, setNote] = useState("");
  const [odoBooking, setOdoBooking] = useState("");
  const [load, setLoad] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [maintenancePlans, setMaintenancePlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [maintenanceDetails, setMaintenanceDetails] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Lưu ngày đã chọn
  const [timeSlots, setTimeSlots] = useState([]); // Lưu các khung giờ
  const [showTimeSlotModal, setShowTimeSlotModal] = useState(false); // Modal chọn giờ
const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // Lưu giờ đã chọn
const today = new Date(); // Ngày hiện tại

  // useEffect(() => {
  //   if (maintenanceCenter) {
  //     fetchOdo();
  //   }
  // }, [maintenanceCenter]);

  // useEffect(() => {
  //   const selectedVehicle = vehicleListByClient.find(
  //     (v) => v.vehiclesId === vehicle
  //   );
  //   if (selectedVehicle) {
  //     setModelId(selectedVehicle.vehicleModelId);
  //     setFilteredOdo(
  //       availableOdo.filter(
  //         (odo) => odo.vehicleModelId === selectedVehicle.vehicleModelId
  //       )
  //     );
  //   } else {
  //     setFilteredOdo([]);
  //   }
  // }, [vehicle, availableOdo]);

  // // Fetch available Odo from API
  // const fetchOdo = async () => {
  //   try {
  //     const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
  //     const response = await axios.get(
  //       `${BASE_URL}/MaintenanceSchedule/GetListPackageCenterId?id=${maintenanceCenter}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     setAvailableOdo(response.data);
  //   } catch (error) {
  //     console.error("Error fetching services:", error);
  //   }
  // };

  // const fetchOdoList = async () => {
  //   try {
  //     const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
  //     if (!maintenanceCenter || !vehicle) return;

  //     const response = await axios.get(
  //       `${BASE_URL}/MaintenanceServices/GetListPackageAndOdoTRUEByCenterIdAndVehicleModelId?id=${maintenanceCenter}&modelId=${modelId}`,
  //       {
  //         headers: {
  //           accept: "text/plain",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     const filteredServices = response.data.filter(service =>
  //       service.maintananceScheduleId === scheduleId
  //     );

  //     setDisplayedServices(filteredServices);
  //     setOdoList(filteredServices);
  //   } catch (error) {
  //     console.error("Error fetching Odo List:", error);
  //   }
  // };

  const fetchMaintenanceVehiclesDetails = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.get(
        `${BASE_URL}/MaintenanceVehiclesDetails/GetListByVehicleId?vehicleId=${vehicle}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    
      const details = response.data;
      setMaintenanceDetails(details);
  
      // Gộp các object theo maintenancePlanId
      const groupedPlans = Object.values(
        details.reduce((acc, item) => {
          const planId = item.responseMaintenanceSchedules.maintenancePlanId;
          if (!acc[planId]) {
            acc[planId] = {
              maintenancePlanId: planId,
              ...item.responseMaintenanceSchedules,
            };
          }
          return acc;
        }, {})
      );
  
      setMaintenancePlans(groupedPlans);  // Luôn hiển thị dropdown chọn gói bảo dưỡng
    } catch (error) {
      console.error("Error fetching maintenance vehicle details:", error);
    }
  };
  
  

  const handleSignup = async () => {
    if (!note || !maintenanceCenter || !vehicle || !selectedPlan || !selectedTimeSlot) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
  
    setLoad(true);
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
  
      // Cộng thêm 7 tiếng vào giờ đã chọn
      const adjustedBookingDate = new Date(selectedDate);
      const [hours, minutes] = selectedTimeSlot.split(':').map(Number);
      adjustedBookingDate.setHours(hours + 7, minutes, 0, 0); // Thêm 7 tiếng
  
      const response = await axios.post(
        `${BASE_URL}/Bookings/PostMaintenanceBooking`,
        {
          vehicleId: vehicle,
          maintenanceCenterId: maintenanceCenter,
          maintenancePlanId: selectedPlan,
          note: note,
          odoBooking: odoBooking,
          bookingDate: adjustedBookingDate.toISOString(), // Ngày và giờ kết hợp
        },
        {
          headers: {
            "content-type": "application/json",
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
      console.error("Error creating booking:", error);
      alert("Có lỗi xảy ra khi tạo lịch.");
    } finally {
      setLoad(false);
    }
  };
  
  
  
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || bookingDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate); // Lưu ngày đã chọn
    setShowTimeSlotModal(true); // Hiển thị modal chọn giờ
  };
// Hàm để tạo khung giờ từ 8:00 sáng đến 7:00 tối với mỗi khoảng 30 phút
const generateTimeSlots = () => {
  const slots = [];
  let startTime = new Date();
  const currentTime = new Date(); // Thời gian hiện tại

  // Nếu ngày được chọn là hôm nay, giới hạn từ giờ hiện tại
  if (selectedDate && selectedDate.toDateString() === currentTime.toDateString()) {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    startTime.setHours(hours, minutes + 60); // Thêm 1 giờ so với thời gian hiện tại
  } else {
    startTime.setHours(8, 0, 0, 0); // Bắt đầu từ 8:00 AM cho các ngày tương lai
  }

  const endTime = new Date();
  endTime.setHours(19, 0, 1, 0); // Kết thúc vào 7:00 PM

  while (startTime < endTime) {
    slots.push(
      `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`
    );
    startTime.setMinutes(startTime.getMinutes() + 30); // Tăng thêm 30 phút
  }

  return slots;
};
useEffect(() => {
  const timeSlots = generateTimeSlots();
  setTimeSlots(timeSlots);
}, [selectedDate]);
  const onSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };
  

  const onCenterSelect = async (itemValue) => {
    setMaintenanceCenter(itemValue);
    await fetchMaintenanceVehiclesDetails();
  };

  const handleModalOk = () => {
    setShowDetailsModal(false);
    fetchMaintenancePlans();
    setShowPlanModal(true);
  };

  return (
    <ScrollView style={{ marginTop: 20 }}>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={vehicle}
              onValueChange={(itemValue) => {
                setVehicle(itemValue);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Chọn xe" value="" />
              {vehicleListByClient.map((vehicle) => (
                <Picker.Item
                  key={vehicle.vehiclesId}
                  label={vehicle.vehiclesBrandName + " " + vehicle.vehicleModelName + " " + vehicle.licensePlate}
                  value={vehicle.vehiclesId}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <Picker
              selectedValue={maintenanceCenter}
              onValueChange={onCenterSelect}
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

          <Pressable onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
  <Text style={styles.datePickerText}>
    {selectedDate ? `${selectedDate.toLocaleDateString()} ${selectedTimeSlot ? selectedTimeSlot : ''}` : "Chọn ngày và giờ"}
  </Text>
</Pressable>


          {showDatePicker && (
            <DateTimePicker
            value={bookingDate}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={today} // Giới hạn ngày từ hôm nay trở đi
          />
          )}
<Modal transparent={true} animationType="slide" visible={showTimeSlotModal}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Chọn giờ</Text>
      <View style={styles.timeSlotContainer}>
        {generateTimeSlots().map((slot, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setSelectedTimeSlot(slot);
              setShowTimeSlotModal(false); // Đóng modal khi chọn xong giờ
            }}
            style={styles.timeSlotBox}
          >
            <Text style={styles.timeSlotText}>{slot}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={() => setShowTimeSlotModal(false)} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Đóng</Text>
      </Pressable>
    </View>
  </View>
</Modal>

          {showPlanModal && (
            <Pressable onPress={() => setShowPlanModal(true)} style={styles.showButton}>
              <Text style={styles.showButtonText}>Chọn gói bảo dưỡng</Text>
            </Pressable>
          )}
    {maintenancePlans.length > 0 && (
  <View style={styles.inputContainer}>
    <Picker
      selectedValue={selectedPlan}
      onValueChange={(planId) => setSelectedPlan(planId)} // Cho phép người dùng thay đổi gói bảo dưỡng
      style={styles.picker}
    >
      <Picker.Item label="Chọn gói bảo dưỡng" value="" />
      {maintenancePlans.map((plan) => (
        <Picker.Item
          key={plan.maintenancePlanId}
          label={`Gói ${plan.maintenancePlanName}`}
          value={plan.maintenancePlanId}
        />
      ))}
    </Picker>
  </View>
)}


{/*<Modal transparent={true} animationType="slide" visible={showPlanModal}>
  <View style={styles.dialogContainer}>
    <View style={styles.dialogContent}>
      <Text style={styles.dialogTitle}>Chọn gói bảo dưỡng</Text>
      {maintenancePlans.map((plan) => (
        <Pressable key={plan.maintenancePlanId} onPress={() => onSelectPlan(plan.maintenancePlanId)}>
          <Text style={styles.serviceName}>{plan.maintenancePlanName}</Text>
        </Pressable>
      ))}
      <Pressable onPress={() => setShowPlanModal(false)} style={styles.dialogCloseButton}>
        <Text style={styles.dialogCloseButtonText}>Đóng</Text>
      </Pressable>
    </View>
  </View>
</Modal>
*/}
{showTimeSlotModal && timeSlots.length === 0 && (
  <Modal transparent={true} animationType="slide" visible={true}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Đã hết giờ làm việc</Text>
        <Text style={{ marginVertical: 10 }}>
          Đã hết giờ làm việc vào ngày bạn đã chọn, vui lòng chọn ngày khác
        </Text>
        <Pressable
          onPress={() => {
            setShowTimeSlotModal(false);
            setShowDatePicker(true); // Hiển thị lại DatePicker để chọn ngày khác
          }}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>OK</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
)}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập ghi chú"
              value={note}
              onChangeText={(text) => setNote(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập Odo"
              keyboardType="numeric"
              onChangeText={(text) => setOdoBooking(text)}
            />
          </View>

          <Pressable onPress={handleSignup} style={styles.button}>
            <Text style={styles.buttonText}>Tạo lịch</Text>
          </Pressable>

          <Modal transparent={true} animationType="slide" visible={showDetailsModal}>
            <View style={styles.dialogContainer}>
              <View style={styles.dialogContent}>
                <Text style={styles.dialogTitle}>Bạn chưa có gói bảo dưỡng. Mua ngay?</Text>
                <Pressable onPress={handleModalOk} style={styles.dialogCloseButton}>
                  <Text style={styles.dialogCloseButtonText}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
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
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 10,
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
    marginBottom: 12,
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
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dialogContent: {
    width: "80%",
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
  dialogCloseButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  dialogCloseButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  serviceName: {
    fontSize: 16,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  timeSlotContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Cho phép các box nằm trên nhiều hàng
    justifyContent: "space-between",
  },
  timeSlotBox: {
    backgroundColor: COLORS.lightGray,
    padding: 15,
    borderRadius: 10,
    width: "22%", // 4-5 box trên 1 hàng
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1, // Thêm khung viền cho box
    borderColor: COLORS.primary, // Màu khung viền
  },
  timeSlotText: {
    fontSize: 16,
    color: COLORS.black,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  datePickerButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 12,
  },
  datePickerText: {
    fontSize: 16,
    color: COLORS.black,
  },

});

export default CreateBooking;