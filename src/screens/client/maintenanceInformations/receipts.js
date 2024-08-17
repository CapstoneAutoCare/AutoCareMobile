import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Linking,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ServiceItem from "../../../components/ServiceItem";
import ProductItem from "../../../components/ProductItem";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getReceiptById } from "../../../app/Center/actions";
import { BASE_URL } from "../../../../env";

const Receipts = ({ route }) => {
    const { info } = route.params;
    console.log("🚀 ~ Receipts ~ info:", info)
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { receiptById } = useSelector((state) => state.center);
    console.log("🚀 ~ Receipts ~ receiptById:", receiptById)
    useEffect(() => {
      const fetchGetListSparePart = async () => {
        await dispatch(getReceiptById(info));
      };
      fetchGetListSparePart();
    }, [info]);
  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handlePayment = async () => {
    const requestBody = {
      receiptId: receiptById.receiptId,
      fullName: receiptById.receiptName,
      description: receiptById.description,
      createdDate: moment().toISOString(),
    };
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const response = await axios.post(
        `${BASE_URL}api/Payments/CreateVnPayPaymentUrl`,
        requestBody,
        {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const result = await response.data;
      console.log("🚀 ~ handlePayment:", requestBody);
      console.log("🚀 ~ handlePayment ~ result:", result);

      if (result) {
        navigation.goBack();
        Linking.openURL(result).catch((err) =>
          console.error("Failed to open URL:", err)
        );
      } else {
        console.error("Failed to get the payment URL");
      }
    } catch (error) {
      console.error("Error during API call", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleNavigateBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Hóa đơn </Text>
      </View>
      {receiptById && (
        <View style={styles.card}>
          <View style={{ alignItems: "left" }}>
            <Text style={styles.name}>{receiptById.receiptName}</Text>
            <Text style={styles.status}>
              Tổng phụ thu: {receiptById?.subTotal}
            </Text>
            <Text style={styles.status}>Thuế VAT: {receiptById?.vat}</Text>
            <Text style={styles.status}>
              Tổng chi phí: {receiptById?.totalAmount}
            </Text>
            <Text style={styles.status}>
              Lưu ý: {receiptById?.responseMaintenanceInformation?.note}
            </Text>
            <Text style={styles.status}>Trạng thái: {receiptById.status}</Text>
            <Text style={styles.centerName}>
              Ngày bảo trì:{" "}
              {moment(
                receiptById?.responseMaintenanceInformation.createdDate
              ).format("DD/MM/YYYY HH:mm")}
            </Text>
            <Text style={styles.centerName}>
              Ngày hoàn thành:{" "}
              {moment(
                receiptById?.responseMaintenanceInformation.finishedDate
              ).format("DD/MM/YYYY HH:mm")}
            </Text>
            <Text style={styles.centerName}>
              Thông tin: {receiptById.description}
            </Text>
          </View>
          
          <Pressable
            onPress={handlePayment}
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
            <Text style={{ color: "white" }}>Thanh toán</Text>
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
    marginTop: 30,
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
    margin: 20,
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

export default Receipts;
