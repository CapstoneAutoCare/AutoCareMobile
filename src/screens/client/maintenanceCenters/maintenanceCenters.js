import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getListCenter } from "../../../app/Center/actions";
import { getProfile } from "../../../features/userSlice";
import levenshtein from "fast-levenshtein";
import { Ionicons } from "@expo/vector-icons";

const MaintenanceCenters = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const { centerList } = useSelector((state) => state.center);
  const [sortedStores, setSortedStores] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");

  const fetchGetListBooking = async () => {
    await dispatch(getProfile());
    await dispatch(getListCenter());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchGetListBooking();
    });
    fetchGetListBooking();
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    sortStores();
  }, [centerList, sortOrder]);

  const sortStores = () => {
    let sorted = [...centerList];
    if (sortOrder === "ratingHighToLow") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortOrder === "ratingLowToHigh") {
      sorted.sort((a, b) => a.rating - b.rating);
    } else {
      sorted = centerList.map((store) => {
        const similarity = levenshtein.get(profile?.Address, store.address);
        return { ...store, similarity };
      });
      sorted.sort((a, b) => a.similarity - b.similarity);
    }
    setSortedStores(sorted);
  };

  const handleSortPress = () => {
    setModalVisible(true);
  };

  const handleSortSelect = (order) => {
    setSortOrder(order);
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
          {sortedStores?.length > 0 &&
            sortedStores.map((item, index) => (
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
                      thông tin trung tâm
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
                      Đánh giá
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
                      email : {item?.email}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "gray",
                      }}
                    >
                      số điện thoại : {item?.phone}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "gray",
                      }}
                    >
                      địa chỉ : {item?.address}
                    </Text>
                    <View style={{ marginTop: 10 }}>
                      <Text style={{ fontSize: 13, fontWeight: "600" }}>
                        thông tin
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

export default MaintenanceCenters;

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
});
