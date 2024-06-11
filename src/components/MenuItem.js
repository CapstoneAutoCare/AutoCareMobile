import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const MenuItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={{ margin: 10 }}>
      <Pressable style={{ flexDirection: "row" }}>
        <View>
          <ImageBackground
            imageStyle={{ borderRadius: 6 }}
            style={{ aspectRatio: 1, height: 170 }}
            source={{ uri: item.image }}
          >
            <AntDesign
              style={{ position: "absolute", top: 10, right: 10 }}
              name="hearto"
              size={24}
              color="white"
            />
          </ImageBackground>
        </View>

        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}
          >
            <View
              style={{
                backgroundColor: `${
                  item.status !== "Đã sửa xong" ? "#fadb14" : "#52c41a"
                }`,
                height: 22,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  padding: 3,
                  textAlign: "center",
                  fontSize: 13,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {item.status}
              </Text>
            </View>
            <Text style={{ marginLeft: 3 }}>•</Text>
            <Text style={{ marginLeft: 3, fontSize: 15, fontWeight: "400" }}>
              {item.color}
            </Text>
          </View>
          {item.service.map((item, index) => (
            <Text key={index} style={{ marginTop: 5 }}>
              {item}
            </Text>
          ))}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <View
              style={{
                backgroundColor: "#FFB6C1",
                width: 22,

                height: 22,
                borderRadius: 11,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 13,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Đ
              </Text>
            </View>

            <Text
              style={{
                marginTop: 5,
                marginLeft: 4,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              {item.cost_for_two} VND
            </Text>
          </View>
          <Text style={{ marginTop: 5 }}>{item.date}</Text>
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <MaterialCommunityIcons name="bike-fast" size={24} color="black" />
            <Text style={{ marginLeft: 6, fontSize: 16 }}>FREE DELIVERY</Text>
          </View> */}
        </View>
      </Pressable>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({});
