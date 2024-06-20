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

const ProductDetail = ({ route }) => {
  const { sparePartsItemId } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleNavigateBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Chi tiết sản phẩm</Text>
      </View>

      <View style={styles.content}>
        <Image style={styles.image} source={{ uri: sparePartById.image }} />

        <Text style={styles.name}>{sparePartById.sparePartsItemName}</Text>

        <Text style={styles.status}>Trạng thái: {sparePartById.status}</Text>

        <Text style={styles.centerName}>
          Đơn vị bảo trì: {sparePartById.maintenanceCenterName}
        </Text>

        {sparePartById.responseSparePartsItemCosts.length > 0 && (
          <Text style={styles.cost}>
            Giá: {sparePartById.responseSparePartsItemCosts[0].acturalCost} VND
          </Text>
        )}

        {/* Additional fields can be rendered similarly */}

        <Text style={styles.createdDate}>
          Ngày tạo: {" "}
          {moment(sparePartById.createdDate).format("DD/MM/YYYY HH:mm")}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 50,
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
});

export default ProductDetail;
