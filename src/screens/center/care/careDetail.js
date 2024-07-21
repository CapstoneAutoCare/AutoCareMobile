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
import moment from "moment";
import { getListCareById } from "../../../app/Center/actions";

const CareDetail = ({ route }) => {
  const { staffCareId } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { careById } = useSelector((state) => state.center);

  useEffect(() => {
    const fetchGetListSparePart = async () => {
      await dispatch(getListCareById(staffCareId));
    };
    fetchGetListSparePart();
  }, [staffCareId]);

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleNavigateBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Chi tiết nhân viên</Text>
      </View>

      {careById && (
        <View style={styles.content}>
          <Image style={styles.image} source={{ uri: careById.logo }} />

          <Text style={styles.name}>
            {careById.firstName} {careById.lastName}
          </Text>

          <Text style={styles.status}>email: {careById.email}</Text>

          <Text style={styles.centerName}>số điên thoại: {careById.phone}</Text>
          <Text style={styles.centerName}>
            ngày sinh: {moment(careById?.birthday).format("DD/MM/YYYY")}
          </Text>
          <Text style={styles.status}>địa chỉ : {careById.address}</Text>
          <Text style={styles.createdDate}>
            Ngày tạo: {moment(careById.createdDate).format("DD/MM/YYYY HH:mm")}
          </Text>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          onPress={() =>
            navigation.navigate("CARE_PUT", {
              customercareId: staffCareId,
              gender: careById.gender,
              logo: careById.logo,
              phone: careById.phone,
              firstName: careById.firstName,
              lastName: careById.lastName,
              address: careById.address,
              birthday: careById.birthday,
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
          <Text style={{ color: "white" }}>sửa thông tin</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 20,
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

export default CareDetail;
