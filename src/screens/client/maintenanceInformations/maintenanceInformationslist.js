import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaintenanceInformationsApi from "../../../services/informationMainten";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../../../env";

const MaintenanceInformationsList = async () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);



  const fetchMaintenanceInformations = async (token) => {
    try {
      const response = await fetch(
        `${BASE_URL}/MaintenanceInformations/GetListByClient`,
        {
          method: "GET",
          headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log(responseData);
      setData(responseData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getTokenAndFetchData = async () => {
      const token = await AsyncStorage.getItem("ACCESS_TOKEN");
      if (token) {
        fetchMaintenanceInformations(token);
      } else {
        setLoading(false);
        setError("Token not found");
      }
    };

    const unsubscribe = navigation.addListener("focus", () => {
      getTokenAndFetchData();
    });

    getTokenAndFetchData();

    return unsubscribe;
  }, [navigation]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Thêm logic tìm kiếm ở đây nếu cần
  };

  const handleSortPress = () => {
    setModalVisible(true);
  };

  const handleSortSelect = (sortOption) => {
    // Thêm logic sắp xếp ở đây
    setModalVisible(false);
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
            <Text style={{ marginRight: 6 }}>Sắp xếp</Text>
            <Ionicons name="filter" size={20} color="black" />
          </Pressable>
        </View>
        <View>
          {data?.length > 0 &&
            data.map((item, index) => (
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
                      THÔNG TIN TRUNG TÂM
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "500",
                        marginTop: 3,
                      }}
                    >
                      {item?.maintenanceCenterName}
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
                      ĐÁNH GIÁ
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
                        {item?.rating}
                      </Text>
                      <AntDesign name="staro" size={24} color="white" />
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
                      Email : {item?.email}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "gray",
                      }}
                    >
                      Số điện thoại : {item?.phone}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "gray",
                      }}
                    >
                      Địa chỉ : {item?.address}
                    </Text>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ fontSize: 13, fontWeight: "600" }}>
                        Thông tin
                      </Text>
                      <Text style={{ fontSize: 15, marginTop: 4 }}>
                        {item?.maintenanceCenterDescription}
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
                      navigation.navigate("PostBooking", {
                        maintenanceCenterId: item?.maintenanceCenterId,
                      })
                    }
                    style={{
                      backgroundColor: "#52c41a",
                      padding: 10,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 10,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ color: "white" }}>+ Lên lịch sửa xe</Text>
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("CenterDetail", {
                        maintenanceCenterId: item?.maintenanceCenterId,
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

      {/* Modal for sorting */}
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
            <Text style={styles.modalTitle}>Sắp xếp theo</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSortSelect("ratingHighToLow")}
            >
              <Text style={styles.modalButtonText}>Rating cao đến thấp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSortSelect("ratingLowToHigh")}
            >
              <Text style={styles.modalButtonText}>Rating thấp đến cao</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSortSelect("default")}
            >
              <Text style={styles.modalButtonText}>Mặc định</Text>
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

export default MaintenanceInformationsList;
const styles = StyleSheet.create({});
