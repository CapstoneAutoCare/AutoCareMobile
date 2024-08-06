import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Pressable, ActivityIndicator, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { fetchRequests } from "../../app/CusCare/requestsSlice";
import { useNavigation } from '@react-navigation/native';
import { getProfile } from "../../features/userSlice";
import RNPickerSelect from "react-native-picker-select";

const RequestList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error, requests } = useSelector(state => state.requests || {});
  const { profile } = useSelector((state) => state.user || {});
  
  const [filterStatus, setFilterStatus] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

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

  const filteredRequests = (requests || []).filter(
    (request) =>(filterStatus ? request.status === filterStatus : true)
  );

  const sortedRequests = filteredRequests.sort((a, b) => {
    if (!sortOrder) return 0;
    if (sortOrder === 'newest') {
      return new Date(b.createdDate) - new Date(a.createdDate);
    } else if (sortOrder === 'oldest') {
      return new Date(a.createdDate) - new Date(b.createdDate);
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
          <View style={{ marginRight: 10 }}>
            <RNPickerSelect
              onValueChange={(value) => setFilterStatus(value)}
              placeholder={{ label: "Chọn trạng thái", value: null }}
              items={[
                { label: "WAITING", value: "WAITING" },
                { label: "ACCEPTED", value: "ACCEPTED" },
                { label: "CANCELLED", value: "CANCELLED" },
                { label: "DENIED", value: "DENIED" },
                { label: "FINISHED", value: "FINISHED" }
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
              Icon={() => <Feather name="filter" size={20} color="black" />}
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
                      Tên khách hàng
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "500",
                        marginTop: 3,
                      }}
                    >
                      {item.clientName}
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
                      Trạng thái
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "500",
                        marginTop: 4,
                      }}
                    >
                      {item.status}
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
                        width: 200,
                      }}
                    >
                      Thời gian yêu cầu: {moment(item.createdDate).format('DD/MM/YYYY HH:mm')}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "gray",
                        width: 200,
                      }}
                    >
                      Biển số xe: {item.vehicleNumber}
                    </Text>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ fontSize: 13, fontWeight: "600" }}>
                        Tên trung tâm
                      </Text>
                      <Text style={{ fontSize: 15, marginTop: 4 }}>
                        {item.maintenanceCenterName}
                      </Text>
                    </View>
                    
                    <View style={{ marginBottom: 20 }} />
                  </View>

                  <View style={{ alignItems: "center" }}>
                    <Pressable
                      onPress={() => navigation.navigate('REQUEST_DETAIL', { requestId: item.bookingId })}
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
