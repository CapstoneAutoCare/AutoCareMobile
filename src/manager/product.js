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
  console.log("🚀 ~ Product ~ sparePartList:", sparePartList);
  const fetchGetListSparePart = async () => {
    await dispatch(getListSparePart());
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchGetListSparePart();
    };
    fetch();
  }, []);
  const types = [
    {
      id: "0",
      image:
        "https://dauthuyluc68.com/wp-content/uploads/2018/05/dau-nhot-xe-so.jpg",
      name: "Dầu nhớt",
    },
    {
      id: "1",
      image:
        "https://bizweb.dktcdn.net/thumb/1024x1024/100/440/693/products/ac-quy-dong-nai-8v30ah-8v-30ah.jpg?v=1662282139033",
      name: "Ắc quy",
    },
    {
      id: "2",
      image:
        "https://acquydongkhanh.vn/uploads/images/6335d9765951e128f36a88e8/lop-xe-maxxis.jpg",
      name: "Lốp xe",
    },
    {
      id: "3",
      image:
        "https://image.made-in-china.com/2f0j00CNsVMlYDZEuv/Auto-Lamp-Front-Light-HID-Xenon-DRL-Headlight-for-Mercedes-Benz-C-Class-W204-2013-Headlamp.webp",
      name: "Đèn xe",
    },
    {
      id: "4",
      image:
        "https://dauthuyluc68.com/wp-content/uploads/2018/05/dau-nhot-xe-so.jpg",
      name: "Dầu nhớt",
    },
    {
      id: "5",
      image:
        "https://bizweb.dktcdn.net/thumb/1024x1024/100/440/693/products/ac-quy-dong-nai-8v30ah-8v-30ah.jpg?v=1662282139033",
      name: "Ắc quy",
    },
  ];
  const products = [
    {
      id: "20",
      title: "lốp xe Lốp Giti WINGRO 175/70R13 82T",
      oldPrice: 25000,
      price: 19000,
      image:
        "https://img.alicdn.com/imgextra/i3/1718241991/O1CN01vxtuMS1QZvD4YdzEj_!!0-item_pic.jpg_400x400.jpg_.webp",
      color: "Stellar Gray",
    },
    {
      id: "30",
      title: "Đèn xe hơi cho Đèn pha W204",
      oldPrice: 74000,
      price: 26000,
      image:
        "https://image.made-in-china.com/202f0j00EnpirNVqZhgy/Car-Lights-for-W204-Headlight-Projector-Lens-C-Class-Dynamic-Signal-Head-Lamp-C180-C200-LED-Headlights-DRL-Automotive-Accessory.webp",
      color: "Cloud Navy",
    },
  ];
  return (
    <ScrollView style={{ marginTop: 50 }}>
      {/* Search Bar  */}
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          margin: 10,
          padding: 10,
          borderColor: "#C0C0C0",
          borderRadius: 7,
        }}
      >
        <TextInput style={{ fontSize: 17 }} placeholder="Tìm kiếm sản phẩm" />
        <AntDesign name="search1" size={24} color="#E52B50" />
      </View>
      <Types types={types} />
      <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
        Sản phẩm bán chạy trong tuần
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "wrap",
          margin: 10,
        }}
      >
        {products.map((item, index) => (
          <Pressable
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 180,
                height: 180,
                borderRadius: 10,
                resizeMode: "contain",
              }}
              source={{ uri: item?.image }}
            />
          </Pressable>
        ))}
      </View> */}
      <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
        Danh sách sản phẩm
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
          <Text style={{ color: "white" }}>+ Thêm sản phẩm</Text>
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
        {sparePartList.length > 0 && sparePartList.map((item, index) => (
          <ProductItem item={item} key={index} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({});
