import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

const UserProfile = ({ item }) => {
   const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 9,
        marginHorizontal: 16,
        borderColor: "#E0E0E0",
        borderWidth: 1,
        marginVertical: 10,
        justifyContent: "center",
        height: Dimensions.get("window").height / 4,
        width: (Dimensions.get("window").width - 80) / 2,
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{
            width: 90,
            height: 90,
            borderRadius: 45,
            resizeMode: "cover",
          }}
          source={{ uri: item?.logo }}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "600" }}>
          {item?.firstName + " " + item.lastName}
        </Text>
        <Text style={{ textAlign: "center", marginLeft: 1, marginTop: 2 }}>
          {moment(item?.birthday).format("DD/MM/YYYY")}
        </Text>
      </View>

      <Pressable
        onPress={() =>
          navigation.navigate("STAFF_DETAIL", {
            staffCareId: item.staffCareId,
          })
        }
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          borderColor: "#0072b1",
          borderWidth: 1,
          borderRadius: 10,
          marginTop: 7,
          paddingHorizontal: 15,
          paddingVertical: 4,
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            color: "#0072b1",
          }}
        >
          Thông Tin
        </Text>
      </Pressable>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
