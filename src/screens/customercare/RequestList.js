import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Pressable, ActivityIndicator, TouchableOpacity, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { fetchRequests } from "../../app/CusCare/requestsSlice";
import { useNavigation } from '@react-navigation/native';
import { getProfile } from "../../features/userSlice";
import DateTimePicker from '@react-native-community/datetimepicker'; // Chọn thư viện DateTimePicker phù hợp với bạn
import RNPickerSelect from "react-native-picker-select";

const RequestList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error, requests } = useSelector(state => state.requests || {});
  const { profile } = useSelector((state) => state.user || {});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateType, setDateType] = useState(null); 
  useEffect(() => {
    dispatch(fetchRequests(profile.CentreId));
  }, [dispatch]);

  const getProfileInfo = async () => {
    await dispatch(getProfile());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getProfileInfo();
    });
    getProfileInfo();
    return unsubscribe;
  }, [navigation]);

  const handleRefresh = () => {
    dispatch(fetchRequests(profile.CentreId));
    getProfileInfo();
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || (dateType === 'start' ? startDate : endDate);
    setShowDatePicker(false);

    if (dateType === 'start') {
      setStartDate(currentDate);
    } else {
      setEndDate(currentDate);
    }
  };

  const filteredRequests = (requests || []).filter(
    (request) =>
      (filterStatus ? request.status === filterStatus : true) &&
      (searchQuery ? request.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
      (!startDate || moment(request.bookingDate).isSameOrAfter(startDate, 'day')) &&
      (!endDate || moment(request.bookingDate).isSameOrBefore(endDate, 'day'))
  );

  const translateStatus = (status) => {
    const statusMapping = {
      WAITING: "Đang chờ",
      ACCEPTED: "Đã chấp nhận",
      CANCELLED: "Đã hủy",
      DENIED: "Đã từ chối",
      FINISHED: "Đã hoàn thành"
    };
    return statusMapping[status] || status;
  };

  const sortedRequests = filteredRequests.sort((a, b) => {
    if (!sortOrder) return 0;
    if (sortOrder === 'newest') {
      return new Date(b.bookingDate) - new Date(a.bookingDate);
    } else if (sortOrder === 'oldest') {
      return new Date(a.bookingDate) - new Date(b.bookingDate);
    }
    return 0;
  });

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;
  if (requests && requests.length === 0) {
    return <Text>Không tồn tại dữ liệu</Text>;
  }

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ padding: 12, backgroundColor: "#DDD" }}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginBottom: 10 }}>


          <TouchableOpacity onPress={() => { setShowDatePicker(true); setDateType('start'); }} style={{ marginHorizontal: 8 }}>
            <Feather name="calendar" size={24} color="black" />
            <Text>{startDate ? moment(startDate).format('DD/MM/YYYY') : "Ngày bắt đầu"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { setShowDatePicker(true); setDateType('end'); }} style={{ marginHorizontal: 8 }}>
            <Feather name="calendar" size={24} color="black" />
            <Text>{endDate ? moment(endDate).format('DD/MM/YYYY') : "Ngày kết thúc"}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <View style={{ marginRight: 10 }}>
            <RNPickerSelect
              onValueChange={(value) => setFilterStatus(value)}
              placeholder={{ label: "Chọn trạng thái", value: null }}
              items={[
                { label: "Đang chờ", value: "WAITING" },
                { label: "Đã chấp nhận", value: "ACCEPTED" },
                { label: "Đã hủy", value: "CANCELLED" },

              ]}
              style={{
                inputAndroid: {
                  color: "black",
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderWidth: 0.5,
                  borderColor: 'gray',
                  borderRadius: 8,
                  backgroundColor: 'white',
                  width: 150
                },
                iconContainer: {
                  top: 10,
                  right: 12,
                },
              }}
              Icon={() => <Feather name="filter" size={24} color="black" />}
            />
          </View>
          <TouchableOpacity onPress={handleSort} style={{ marginHorizontal: 10 }}>
            <MaterialIcons name="sort" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRefresh}>
            <MaterialIcons name="refresh" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 10,
              marginRight: 10,
              width: 150,
              backgroundColor: 'white',
            }}
            placeholder="Tìm kiếm theo biển số"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View>
          {sortedRequests.length > 0 ? (
            sortedRequests.map((item, index) => (
              <Pressable
                style={{
                  marginVertical: 12,
                  backgroundColor: "white",
                  borderRadius: 7,
                }}
                key={index}
              >
                <View
                  style={{
                    backgroundColor: "#0066b2",
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTopLeftRadius: 7,
                    borderTopRightRadius: 7,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "500",
                      }}
                    >
                      THÔNG TIN XE
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "500",
                        marginTop: 3,
                      }}
                    >
                      {item?.responseVehicles.vehiclesBrandName} {""}
                      {item?.responseVehicles.vehicleModelName} - {item?.responseVehicles.licensePlate}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "500",
                      }}
                    >
                      TRẠNG THÁI
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "500",
                        marginTop: 4,
                      }}
                    >
                      {translateStatus(item?.status)}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: "white",
                    marginHorizontal: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "gray",
                      }}
                    >
                      Note : {item?.note}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "gray",
                      }}
                    >
                      Ngày đặt :{" "}
                      {moment(item?.bookingDate).format("DD/MM/YYYY HH:mm")}
                    </Text>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ fontSize: 13, fontWeight: "600" }}>
                        Tên trung tâm
                      </Text>
                      <Text style={{ fontSize: 15, marginTop: 4 }}>
                        {item?.responseCenter.maintenanceCenterName}
                      </Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ fontSize: 13, fontWeight: "600" }}>
                        Tên khách hàng
                      </Text>
                      <Text style={{ fontSize: 15, marginTop: 4 }}>
                        {item?.responseClient.firstName}{" "}
                        {item?.responseClient.lastName}
                      </Text>
                    </View>
                    <View style={{ marginBottom: 20 }} />
                  </View>

                  <View style={{ alignItems: "center" }}>
                    <Pressable
                      onPress={() => navigation.navigate('REQUEST_DETAIL', { requestId: item.bookingId, cuscareId: profile.CustomerCareId })}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: "#F0F8FF",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <MaterialIcons name="info" size={24} color="black" />
                    </Pressable>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 13,
                        fontWeight: "500",
                      }}
                    >
                      Thông tin
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))
          ) : (
            <Text>Không có yêu cầu nào phù hợp</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default RequestList;
