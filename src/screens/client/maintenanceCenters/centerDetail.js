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
import { getCenterById, getServiceByCenter } from "../../../app/Center/actions";
import { getSparePartByCenter } from "../../../app/SparePart/actions";
import ServiceItem from "../../../components/ServiceItem";
import ProductItem from "../../../components/ProductItem";

const CenterDetail = ({ route }) => {
  const { maintenanceCenterId } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { centerById, serviceByCenter } = useSelector((state) => state.center);
  const { sparePartByCenter } = useSelector((state) => state.sparePart);

  useEffect(() => {
    const fetchGetListSparePart = async () => {
      await dispatch(getCenterById(maintenanceCenterId));
      await dispatch(getServiceByCenter(maintenanceCenterId));
      await dispatch(getSparePartByCenter(maintenanceCenterId));

    };
    fetchGetListSparePart();
  }, [maintenanceCenterId]);

  const handleNavigateBack = () => {
    navigation.goBack();
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleNavigateBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Thông tin trung tâm</Text>
      </View>
      {centerById && (
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: centerById.logo }} />

          <View style={{ alignItems: "left" }}>
            <Text style={styles.name}>{centerById.maintenanceCenterName}</Text>
            <Text style={styles.name}>email: {centerById.email}</Text>
            <Text style={styles.name}>SĐT: {centerById.phone}</Text>

            <Text style={styles.status}>Trạng thái: {centerById.status}</Text>
            <Text style={styles.centerName}>Đánh giá: {centerById.rating}</Text>
            <Text style={styles.centerName}>Địa chỉ: {centerById.address}</Text>
            <Text style={styles.centerName}>
              Thông tin: {centerById.maintenanceCenterDescription}
            </Text>
          </View>
        </View>
      )}
      <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
        Danh sách dịch vụ
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {serviceByCenter.length > 0 ? (
          serviceByCenter.map((item, index) => (
            <ServiceItem item={item} key={index} />
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
              không có dịch vụ
            </Text>
          </View>
        )}
      </View>
      <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
        Danh sách phụ tùng
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {sparePartByCenter.length > 0 ? (
          sparePartByCenter.map((item, index) => (
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
              không có dịch vụ
            </Text>
          </View>
        )}
      </View>
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

export default CenterDetail;
