import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import UserProfile from "../components/UserProfile";

const Staff = () => {
  const users = [
    {
      id: "0",
      profileImage:
        "https://i.pinimg.com/474x/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.jpg",
      name: "Ngô Minh Tuấn",
      phone: "0913339754",
      email: "ngominhtuan@gmail.com",
    },
    {
      id: "2",
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfj-oF7iZDRaVUWozSZXxIaMRR5EztvBeEDYPhXnLzb7hy3upKJE0SzUZTCq5fkn_fw_o&usqp=CAU",
      name: "Lê Phương Thảo",
      phone: "0919991235",
      email: "lephuongthao@gmail.com",
    },
    {
      id: "0",
      profileImage:
        "https://i.pinimg.com/474x/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.jpg",
      name: "Ngô Minh Tuấn",
      phone: "0913339754",
      email: "ngominhtuan@gmail.com",
    },
    {
      id: "2",
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfj-oF7iZDRaVUWozSZXxIaMRR5EztvBeEDYPhXnLzb7hy3upKJE0SzUZTCq5fkn_fw_o&usqp=CAU",
      name: "Lê Phương Thảo",
      phone: "0919991235",
      email: "lephuongthao@gmail.com",
    },
  ];
  return (
    <ScrollView style={{ marginTop: 50 }}>
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
        <TextInput style={{ fontSize: 17 }} placeholder="Tìm kiếm nhân viên" />
        <AntDesign name="search1" size={24} color="#E52B50" />
      </View>
      <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
        Danh sách nhân viên
      </Text>
      <FlatList
        data={users}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={({ item, key }) => <UserProfile item={item} key={key} />}
      />
    </ScrollView>
  );
};

export default Staff;

const styles = StyleSheet.create({});
