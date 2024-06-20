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
import Types from "../components/Types";
import Quick from "../components/Quick";
import { Ionicons } from "@expo/vector-icons";
import MenuItem from "../components/MenuItem";
import ProductItem from "../components/ProductItem";
import { useNavigation } from "@react-navigation/native";
import { getListSparePart } from "../app/SparePart/actions";

const Product = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const sparePartList = useSelector((state) => state.sparePart.sparePartList);
  const fetchGetListSparePart = async () => {
    await dispatch(getListSparePart());
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchGetListSparePart();
    };
    fetch();
  }, []);
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
          onPress={() => navigation.navigate("AddProduct")}
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
        {sparePartList.length > 0 &&
          sparePartList.map((item, index) => (
            <ProductItem item={item} key={index} />
          ))}
      </View>
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({});
