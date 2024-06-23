import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getListStaff } from "../../../app/Center/actions";
import UserProfile from "../../../components/UserProfile";

const Staff = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { staffList } = useSelector((state) => state.center);
  const fetchGetListSparePart = async () => {
    await dispatch(getListStaff());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchGetListSparePart();
    });
    fetchGetListSparePart();
    return unsubscribe;
  }, [navigation]);
  return (
    <ScrollView>
      <Pressable
        onPress={() => navigation.navigate("STAFF_POST")}
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
        <Text style={{ color: "white" }}>+ Thêm nhân viên</Text>
      </Pressable>
      <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
        Danh sách nhân viên kĩ thuật
      </Text>
      <FlatList
        data={staffList}
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
