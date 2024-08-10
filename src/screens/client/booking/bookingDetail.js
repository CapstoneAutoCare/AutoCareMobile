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
import ServiceItem from "../../../components/ServiceItem";
import ProductItem from "../../../components/ProductItem";
import { getListBookingById } from "../../../app/Booking/actions";
import moment from "moment";

const BookingDetail = ({ route }) => {
  const { bookingId } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { bookingById } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    const fetchGetListSparePart = async () => {
      await dispatch(getListBookingById(bookingId));
    };
    fetchGetListSparePart();
  }, [bookingId]);

  const handleNavigateBack = () => {
    navigation.goBack();
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleNavigateBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Thông tin đặt lịch</Text>
      </View>
      {bookingById && (
        <View>
          <View style={styles.card}>
            {/* <Image style={styles.image} source={{ uri: bookingById.logo }} /> */}

            <View style={{ alignItems: "left" }}>
              <Text style={styles.name}>
                {bookingById?.responseCenter.maintenanceCenterName}
              </Text>
              <Text style={styles.name}>
                Thông tin xe: {bookingById?.responseVehicles.vehicleModelName} -{" "}
                {bookingById?.responseVehicles.vehiclesBrandName}
              </Text>
              <Text style={styles.centerName}>
                Tên khách hàng: {bookingById?.responseClient.firstName}{" "}
                {bookingById?.responseClient.lastName}
              </Text>

              <Text style={styles.status}>
                Trạng thái: {bookingById.status}
              </Text>
              <Text style={styles.centerName}>
                Ngày đặt:{" "}
                {moment(bookingById?.bookingDate).format("DD/MM/YYYY HH:mm")}
              </Text>
              <Text style={styles.centerName}>
                Thông tin: {bookingById.note}
              </Text>
            </View>
          </View>
          <View style={styles.card}>
            <Image
              style={styles.image}
              source={{ uri: bookingById.responseCenter.logo }}
            />

            <View style={{ alignItems: "left" }}>
              <Text style={styles.name}>
                {bookingById.responseCenter.maintenanceCenterName}
              </Text>
              <Text style={styles.name}>
                email: {bookingById.responseCenter.email}
              </Text>
              <Text style={styles.name}>
                SĐT: {bookingById.responseCenter.phone}
              </Text>
              <Text style={styles.status}>
                Trạng thái: {bookingById.responseCenter.status}
              </Text>
              <Text style={styles.centerName}>
                Đánh giá: {bookingById.responseCenter.rating}
              </Text>
              <Text style={styles.centerName}>
                Địa chỉ: {bookingById.responseCenter.address}
              </Text>
              <Text style={styles.centerName}>
                Số dịch vụ:{" "}
                {
                  bookingById?.responseMaintenanceInformation
                    ?.responseMaintenanceServiceInfos?.length
                }
              </Text>
              <Text style={styles.centerName}>
                Số phụ tùng:{" "}
                {
                  bookingById?.responseMaintenanceInformation
                    ?.responseMaintenanceSparePartInfos?.length
                }
              </Text>
              <Text style={styles.centerName}>
                Thông tin:{" "}
                {bookingById.responseCenter.maintenanceCenterDescription}
              </Text>
            </View>
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
        {bookingById &&
        bookingById?.responseMaintenanceInformation
          ?.responseMaintenanceServiceInfos?.length > 0 ? (
          bookingById.responseMaintenanceInformation.responseMaintenanceServiceInfos.map(
            (item, index) => <ServiceItem item={item} key={index} />
          )
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
        {bookingById &&
        bookingById.responseMaintenanceInformation
          .responseMaintenanceSparePartInfos.length > 0 ? (
          bookingById.responseMaintenanceInformation.responseMaintenanceSparePartInfos.map(
            (item, index) => <ProductItem item={item} key={index} />
          )
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
    marginBottom: 10,
  },
});

export default BookingDetail;
