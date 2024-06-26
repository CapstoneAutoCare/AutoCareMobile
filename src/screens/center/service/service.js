import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ServiceItem from "../../../components/ServiceItem";
import { getListService } from "../../../app/Center/actions";

const Service = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { serviceList } = useSelector((state) => state.center);
  const fetchGetListSparePart = async () => {
    await dispatch(getListService());
  };

    useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        fetchGetListSparePart();
      });
      fetchGetListSparePart();
      return unsubscribe;
    }, [navigation]);
  return (
    <ScrollView style={{ marginTop: 20 }}>
      <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
        Danh sách dịch vụ
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("SERVICE_POST")}
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
          <Text style={{ color: "white" }}>+ Thêm dịch vụ</Text>
        </Pressable>
        <Pressable
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
        {serviceList.length > 0 ? (
          serviceList.map((item, index) => (
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
    </ScrollView>
  );
};

export default Service;

const styles = StyleSheet.create({});
