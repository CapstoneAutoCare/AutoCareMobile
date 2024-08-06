import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getSparePartById } from "../../../app/SparePart/actions";
import moment from "moment";
import { deleteSparePartById } from "../../../app/Center/actions";
import { useAppSelector } from "../../../app/hooks";

const ProductDetail = ({ route }) => {
  const { sparePartsItemId } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { role } = useAppSelector((state) => state.user);
  const { sparePartById } = useSelector((state) => state.sparePart);

  useEffect(() => {
    const fetchGetListSparePart = async () => {
      await dispatch(getSparePartById(sparePartsItemId));
    };
    fetchGetListSparePart();
  }, [sparePartsItemId]);

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleDeleteSparePart = async () => {
    await dispatch(deleteSparePartById(sparePartsItemId));
    alert("xóa phụ tùng thành công!");
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleNavigateBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Chi tiết sản phẩm</Text>
      </View>
      {sparePartById && (
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: sparePartById.image }} />

          <View style={{ alignItems: "flex-start" }}>
            <Text style={styles.name}>{sparePartById.sparePartsItemName}</Text>

            <Text style={styles.status}>
              Trạng thái: {sparePartById.status}
            </Text>

            <Text style={styles.centerName}>
              Đơn vị bảo trì: {sparePartById.maintenanceCenterName}
            </Text>
            <Text style={styles.centerName}>
              Dòng xe:{" "}
              {sparePartById.responseSparePartsItemCosts[0].vehiclesBrandName} -{" "}
              {sparePartById.responseSparePartsItemCosts[0].vehicleModelName}
            </Text>
            {sparePartById.responseSparePartsItemCosts.map((cost, index) => (
              <Text key={index} style={styles.cost}>
                {index === 0 ? "Giá mới: " : "Giá cũ: "} {cost.acturalCost} VND
              </Text>
            ))}

            <Text style={styles.createdDate}>
              Ngày tạo:{" "}
              {moment(sparePartById.createdDate).format("DD/MM/YYYY HH:mm")}
            </Text>
          </View>
        </View>
      )}
      {role === "CENTER" && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            onPress={() =>
              navigation.navigate("PRODUCT_COST", {
                sparePartsItemId: sparePartsItemId,
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
            <Text style={{ color: "white" }}>Tạo giá</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate("PRODUCT_PUT", {
                sparePartsItemId: sparePartsItemId,
                sparePartsItemName: sparePartById.sparePartsItemName,
                image: sparePartById.image,
                status: sparePartById.status,
              })
            }
            style={{
              backgroundColor: "#1677ff",
              padding: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white" }}>sửa phụ tùng</Text>
          </Pressable>
          <Pressable
            onPress={handleDeleteSparePart}
            style={{
              backgroundColor: "#f5222d",
              padding: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white" }}>xóa phụ tùng</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    marginBottom: 8,
  },
  centerName: {
    fontSize: 16,
    marginBottom: 8,
  },
  cost: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  createdDate: {
    fontSize: 14,
    color: "#666666",
    marginTop: 12,
  },
  card: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 20,
    margin: 40,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
});

export default ProductDetail;
