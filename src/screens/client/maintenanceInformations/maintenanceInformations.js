import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getListInformations } from "../../../app/Center/actions";
import { getProfile } from "../../../features/userSlice";
import moment from "moment";

const MaintenanceInformations = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const { informationsList } = useSelector((state) => state.center);
  const [filteredStores, setFilteredStores] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const statusLabels = {
    CHECKIN: "Đã Check-in",
    CREATEDBYClIENT: "Tạo bởi khách hàng",
    PAYMENT: "Thanh toán",
    PAID: "Đã thanh toán",
    YETPAID: "Chưa thanh toán",
  };

  const fetchGetListBooking = async () => {
    await dispatch(getProfile());
    await dispatch(getListInformations());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchGetListBooking();
    });
    fetchGetListBooking();
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    filterStores();
  }, [informationsList, filterStatus, searchQuery]);

  const filterStores = () => {
    let filtered = [...informationsList];
    if (filterStatus !== "all") {
      filtered = filtered.filter((item) => item.status === filterStatus);
    }
    if (searchQuery) {
      filtered = filtered.filter((store) =>
        store.informationMaintenanceName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
    setFilteredStores(filtered);
  };

  const handleSortPress = () => {
    setModalVisible(true);
  };

  const handleSortSelect = (status) => {
    setFilterStatus(status);
    setModalVisible(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <ScrollView style={{ marginTop: 10 }}>
      <View style={{ padding: 12 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <Pressable
            onPress={handleSortPress}
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              borderRadius: 20,
              width: 120,
              justifyContent: "center",
            }}
          >
            <Text style={{ marginRight: 6 }}>Lọc</Text>
            <Ionicons name="filter" size={20} color="black" />
          </Pressable>
        </View>
        <View>
          {filteredStores?.length > 0 &&
            filteredStores.map((item, index) => (
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
                      THÔNG TIN BẢO TRÌ
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "500",
                        marginTop: 3,
                        width: 200,
                      }}
                    >
                      {item?.informationMaintenanceName}
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
                      TỔNG GIÁ
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 15,
                          fontWeight: "500",
                          marginTop: 4,
                        }}
                      >
                        {item?.totalPrice} VND
                      </Text>
                    </View>
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
                      Xe : {item?.responseVehicles?.vehiclesBrandName} -{" "}
                      {item?.responseVehicles?.vehicleModelName} -{" "}
                      {item?.responseVehicles?.color}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "gray",
                      }}
                    >
                      Biển số xe : {item?.responseVehicles?.licensePlate}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "gray",
                      }}
                    >
                      Trạng thái : {statusLabels[item?.status]}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "gray",
                      }}
                    >
                      Ngày hoàn thành :{" "}
                      {moment(item?.finishedDate).format("DD/MM/YYYY HH:mm")}
                    </Text>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ fontSize: 13, fontWeight: "600" }}>
                        Thông tin
                      </Text>
                      <Text style={{ fontSize: 15, marginTop: 4 }}>
                        {item?.note}
                      </Text>
                    </View>
                    <View style={{ marginBottom: 20 }} />
                  </View>
                </View>
                <View
                  style={{
                    paddingBottom: 12,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Pressable
                    onPress={() =>
                      navigation.navigate("InforDetail", {
                        info: item,
                      })
                    }
                    style={{
                      backgroundColor: "#0066b2",
                      padding: 10,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 10,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ color: "white" }}>Thông tin</Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
        </View>
      </View>

      {/* Modal for filtering */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Lọc theo trạng thái</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSortSelect("CHECKIN")}
            >
              <Text style={styles.modalButtonText}>Đã Check-in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSortSelect("CREATEDBYClIENT")}
            >
              <Text style={styles.modalButtonText}>Tạo bởi khách hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSortSelect("PAYMENT")}
            >
              <Text style={styles.modalButtonText}>Thanh toán</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSortSelect("PAID")}
            >
              <Text style={styles.modalButtonText}>Đã thanh toán</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSortSelect("YETPAID")}
            >
              <Text style={styles.modalButtonText}>Chưa thanh toán</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSortSelect("all")}
            >
              <Text style={styles.modalButtonText}>Tất cả</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "red" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MaintenanceInformations;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#0066b2",
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    padding: 5,
    borderRadius: 10,
    width: 200,
  },
});
