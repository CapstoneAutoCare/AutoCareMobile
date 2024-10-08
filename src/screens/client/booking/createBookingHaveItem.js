import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Button,
  Modal
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import COLORS from "./../../../constants/colors";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { getListCustomerCareByCenterId } from "../../../app/CustomerCare/actions";
import CustomSearchableDropdown from "./../../../features/CustomSearchableDropdown";
import { BASE_URL } from "../../../../env";

const StepOne = () => (
  <View style={styles.stepContainer}>
    <Text style={styles.stepText}>Step 1: Chọn trung tâm </Text>
  </View>
);

const StepTwo = () => (
  <View style={styles.stepContainer}>
    <Text style={styles.stepText}>Step 2: Chọn xe</Text>
  </View>
);

const StepThree = () => (
  <View style={styles.stepContainer}>
    <Text style={styles.stepText}>Step 3: Chọn odo</Text>
  </View>
);
const StepFour = () => (
  <View style={styles.stepContainer}>
    <Text style={styles.stepText}>Step 4: Chọn dịch vụ</Text>
  </View>
);
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
  const [odo, setOdo] = useState("");
  const [odoName, setOdoName] = useState("");
  const [spareParts, setSpareParts] = useState([]);
  const [services, setServices] = useState([]);
  const [availableSpareParts, setAvailableSpareParts] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [availableOdo, setAvailableOdo] = useState([]);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [filteredSpareParts, setFilteredSpareParts] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [filteredOdo, setFilteredOdo] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [odoBooking, setOdoBooking] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // Lưu ngày đã chọn
  const [timeSlots, setTimeSlots] = useState([]); // Lưu các khung giờ
  const [showTimeSlotModal, setShowTimeSlotModal] = useState(false); // Modal chọn giờ
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // Lưu giờ đã chọn
  const steps = [
    <StepOne key="step1" />,
    <StepTwo key="step2" />,
    <StepThree key="step3" />,
    <StepFour key="step4" />,
  ];
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
        `${BASE_URL}/SparePartsItemCosts/GetListByClient?centerId=${maintenanceCenter}`,
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
        `${BASE_URL}/MaintenanceServiceCosts/GetListByClient?centerId=${maintenanceCenter}`,
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
  const fetchOdo = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.get(
        `${BASE_URL}/MaintenanceServices/GetListPackageAndOdoTRUEByCenterId?id=${maintenanceCenter}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setAvailableOdo(response.data);
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
      await fetchOdo();
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
  const onNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = () => {
    alert("Form submitted!");
  };
  // Tạo một bản sao của bookingDate để tránh thay đổi trực tiếp
  
  const handleSignup = async () => {
    try {
      if (!note || !maintenanceCenter) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }

      const now = new Date();
      const adjustedBookingDate = new Date(selectedDate);
       const [hours, minutes] = selectedTimeSlot.split(':').map(Number);
      adjustedBookingDate.setHours(hours + 7, minutes, 0, 0); // Thêm 7 tiếng
      const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      console.log(vehicle, maintenanceCenter, note, odoBooking, adjustedBookingDate, spareParts, services)
      const response = await axios.post(
        `${BASE_URL}/Bookings/PostHaveItems`,
        {
          vehicleId: vehicle,
          maintenanceCenterId: maintenanceCenter,
          // maintananceScheduleId: null,
          note: note,
          odoBooking: odoBooking,
          bookingDate: adjustedBookingDate.toISOString(),

          createMaintenanceInformationHaveItemsByClient: [{
            // customerCareId: customerCare,
            // finishedDate: vietnamTime.toISOString(),
            createMaintenanceSparePartInfos:
              spareParts.length > 0 ? spareParts : null,
            createMaintenanceServiceInfos:
              services.length > 0 ? services : null,
          },],

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
            service?.vehicleModelName === selectedVehicle?.vehicleModelName &&
            service?.boolean === false
        )
      );
      setFilteredOdo(
        availableOdo.filter(
          (odo) => odo?.vehicleModelName === selectedVehicle?.vehicleModelName
        )
      );
    } else {
      setFilteredSpareParts([]);
      setFilteredServices([]);
      setFilteredOdo([]);
    }
  }, [vehicle, availableSpareParts, availableServices, availableOdo]);
  // useEffect(() => {
  //   setServices([]);
  //   if (odo) {
  //     setFilteredServices(
  //       availableServices.filter(
  //         (service) => service?.maintananceScheduleName === odo
  //       )
  //     );
  //   } else {
  //     setFilteredServices([]);
  //   }
  // }, [odo, availableServices]);
  const today = new Date();

  return (
    <ScrollView style={{ marginTop: 20 }}>
      <View style={styles.container}>
        <View style={styles.form}>
          {currentStep === 0 ? (
            <>
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
                      label={
                        vehicle.vehiclesBrandName +
                        " " +
                        vehicle.vehicleModelName +
                        " " +
                        vehicle.licensePlate
                      }
                      value={vehicle.vehiclesId}
                    />
                  ))}
                </Picker>
              </View>
              {/* <View style={styles.inputContainer}>
            <Picker
              selectedValue={odo}
              onValueChange={(itemValue) => setOdo(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Chọn Combo" value="" />
              {["5000", "10000", "15000"].map((o) => (
                <Picker.Item key={o} label={"Combo : " + o + " km"} value={o} />
              ))}
            </Picker>
          </View> */}
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
                  placeholder="Nhập Odo"
                  keyboardType="numeric"
                  value={odoBooking}
                  onChangeText={(text) => setOdoBooking(text)}
                />
              </View>
            </>
          ) : currentStep === 1 ? (
            <>
              {maintenanceCenter !== "" && (
                <>
                  <Text>Phụ Tùng</Text>
                  {spareParts.map((sparePart, index) => (
                    <View key={index}>
                      <View style={styles.inputContainerCost}>
                        <CustomSearchableDropdown
                          items={filteredSpareParts.map((part) => ({
                            id: part.sparePartsItemCostId,
                            name: `${part.sparePartsItemName} - ${part.acturalCost} VND`,
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
                            handleSparePartChange(
                              index,
                              "actualCost",
                              item.cost
                            );
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
                </>
              )}
            </>
          ) : currentStep === 2 ? (
            <>
              {maintenanceCenter !== "" && (
                <>
                  <Text>Dịch vụ</Text>
                  {services.map((service, index) => (
                    <View key={index}>
                      <View style={styles.inputContainerCost}>
                        <CustomSearchableDropdown
                          items={filteredServices.map((service) => ({
                            id: service.maintenanceServiceCostId,
                            name: `${service.maintenanceServiceName} - ${service.acturalCost} VND`,
                            cost: service.acturalCost,
                            maintenanceServiceName:
                              service.maintenanceServiceName,
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
            </>
          ) : (
            <View style={styles.inputContainer}>
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
            </View>
          )}

          {/* <Pressable style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Tạo lịch</Text>
          </Pressable> */}
        </View>
      </View>
      <View style={styles.footer}>
        {/* <Button style={styles.bottomFooter} title="Sau" onPress={onPrevious} disabled={currentStep === 0} /> */}
        <Pressable style={styles.bottomFooter} onPress={onPrevious}>
          <Text style={{ color: "white" }}>Sau</Text>
        </Pressable>
        {currentStep === 3 ? (
          <Pressable style={styles.bottomFooter} onPress={handleSignup}>
            <Text style={{ color: "white" }}>Tạo lịch</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.bottomFooter} onPress={onNext}>
            <Text style={{ color: "white" }}>Tiếp</Text>
          </Pressable>
        )}
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomFooter: {
    flexDirection: "row",
    backgroundColor: "#0066b2",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  stepContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stepContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  stepText: {
    fontSize: 18,
    marginBottom: 20,
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

export default CreateBookingHaveItem;
