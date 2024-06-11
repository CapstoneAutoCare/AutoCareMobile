import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const Quick = () => {
  const data = [
    {
      id: "0",
      image:
        "https://product.hstatic.net/1000328919/product/mo-hinh-xe-tesla-model-3-1-24-xlg-white__1__c3ec96e3cb924e62baceb22ff39a3511_grande.png",
      name: "Tesla Model 3",
      rating: 4.3,
      color: "white",
      offer: "50%",
      date: "12/06/2024",
    },
    {
      id: "1",
      image:
        "https://product.hstatic.net/1000328919/product/mo-hinh-xe-tesla-model-3-1-24-xlg-white__1__c3ec96e3cb924e62baceb22ff39a3511_grande.png",
      name: "Tesla Model 3",
      rating: 3.8,
      color: "white",
      offer: "60%",
      date: "10/06/2024",
    },
    {
      id: "2",
      image:
        "https://product.hstatic.net/1000328919/product/mo-hinh-xe-tesla-model-3-1-24-xlg-white__1__c3ec96e3cb924e62baceb22ff39a3511_grande.png",
      name: "Tesla Model 3",
      rating: 4.1,
      color: "white",
      offer: "55%",
      date: "11/06/2024",
    },
  ];
  return (
    <View style={{ margin: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "500" }}>Xe đang đợi sửa</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <Pressable style={{ margin: 10 }} key={index}>
            <ImageBackground
              imageStyle={{ borderRadius: 6 }}
              style={{ aspectRatio: 5 / 6, height: 170 }}
              source={{ uri: item.image }}
            ></ImageBackground>
            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "500" }}>
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 3,
              }}
            >
              <Text style={{ marginTop: 5 }}>
                {item.date}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Quick;

const styles = StyleSheet.create({});
