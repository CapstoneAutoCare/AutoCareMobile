import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ProductItem from "../components/ProductItem";
import { getListSparePart } from "../app/SparePart/actions";

const Product = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const sparePartList = useSelector((state) => state.sparePart.sparePartList);

  const [sortedSparePartList, setSortedSparePartList] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [modalVisible, setModalVisible] = useState(false); 

  const fetchGetListSparePart = async () => {
    await dispatch(getListSparePart());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchGetListSparePart();
    });
    fetchGetListSparePart();
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setSortedSparePartList(sparePartList);
  }, [sparePartList]);

  const handleSort = (order) => {
    const sortedList = [...sortedSparePartList].sort((a, b) => {
      const priceA = a?.responseSparePartsItemCosts?.length
        ? a.responseSparePartsItemCosts[0].acturalCost
        : 0;
      const priceB = b?.responseSparePartsItemCosts?.length
        ? b.responseSparePartsItemCosts[0].acturalCost
        : 0;

      if (order === "asc") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
    setSortedSparePartList(sortedList);
    setSortOrder(order);
    setModalVisible(false); // Close the modal after sorting
  };

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
        Danh sách phụ tùng
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("PRODUCT_POST")}
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
          <Text style={{ color: "white" }}>+ Thêm phụ tùng</Text>
        </Pressable>
        <Pressable
          onPress={() => setModalVisible(true)} // Show the modal on press
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
          <Text style={{ marginRight: 6 }}>sắp xếp</Text>
          <Ionicons name="filter" size={20} color="black" />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {sortedSparePartList.length > 0 ? (
          sortedSparePartList.map((item, index) => (
            <ProductItem item={item} key={index} />
          ))
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                color: "black",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              Không có phụ tùng
            </Text>
          </View>
        )}
      </View>

      {/* Modal for sorting options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Chọn cách sắp xếp</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSort("asc")}
            >
              <Text style={styles.textStyle}>Giá thấp đến cao</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleSort("desc")}
            >
              <Text style={styles.textStyle}>Giá cao đến thấp</Text>
            </TouchableOpacity>
            <Pressable
              style={[styles.modalButton, { backgroundColor: "#f44336" }]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    marginBottom: 10,
    width: 200,
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
