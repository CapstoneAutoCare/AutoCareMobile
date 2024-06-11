import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
// import Carousel from "../components/Carousel";
import Types from "../components/Types";
import Quick from "../components/Quick";
import { Ionicons } from "@expo/vector-icons";
import MenuItem from "../components/MenuItem";

const ListCar = () => {
  const data = [
    {
      id: "0",
      image:
        "https://product.hstatic.net/1000328919/product/mo-hinh-xe-tesla-model-3-1-24-xlg-white__1__c3ec96e3cb924e62baceb22ff39a3511_grande.png",
      name: "Tesla Model 3",
      rating: 4.4,
      color: "white",
      service: ["Thay nhớt", "Rửa xe"],
      status: "Đang chờ sửa",
      cost_for_two: 500,
      date: "11/06/2024",
    },
    {
      id: "1",
      image:
        "https://product.hstatic.net/1000328919/product/mo-hinh-xe-tesla-model-3-1-24-xlg-white__1__c3ec96e3cb924e62baceb22ff39a3511_grande.png",
      name: "Tesla Model 3",
      rating: 4.4,
      color: "white",
      service: ["Thay dầu", "bơm bánh xe"],
      status: "Đã sửa xong",
      cost_for_two: 450,
      date: "11/06/2024",
    },
  ];
    const types = [
      {
        id: "0",
        image:
          "https://thietkelogo.mondial.vn/wp-content/uploads/2023/12/Mau_thiet_-ke_-logo_thuong_-hieu_mercedesbenz.jpeg",
        name: "mercedes",
      },
      {
        id: "1",
        image:
          "https://i.pinimg.com/736x/ae/4b/f0/ae4bf09e0764129837914bb63cdcbbbb.jpg",
        name: "tesla",
      },
      {
        id: "2",
        image:
          "https://i.pinimg.com/736x/90/c6/2a/90c62a04093a897e0cdc5ac249e4334f.jpg",
        name: "lexus",
      },
      {
        id: "3",
        image:
          "https://xeotogiadinh.com/wp-content/uploads/2018/08/2018-vinfast-vietnams-first-carmaker-reveals-logo-design.png",
        name: "vinfast",
      },
      {
        id: "4",
        image:
          "https://thietkelogo.mondial.vn/wp-content/uploads/2023/12/Mau_thiet_-ke_-logo_thuong_-hieu_mercedesbenz.jpeg",
        name: "mercedes",
      },
      {
        id: "5",
        image:
          "https://i.pinimg.com/736x/ae/4b/f0/ae4bf09e0764129837914bb63cdcbbbb.jpg",
        name: "tesla",
      },
    ];
  return (
    <ScrollView style={{ marginTop: 50 }}>
      {/* Search Bar  */}
      <View
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
        <TextInput style={{ fontSize: 17 }} placeholder="Tìm kiếm xe" />
        <AntDesign name="search1" size={24} color="#E52B50" />
      </View>
      {/* <Carousel /> */}
      <Types types={types} />
      <Quick />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
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
      {data.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </ScrollView>
  );
};

export default ListCar;

const styles = StyleSheet.create({});
