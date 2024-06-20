import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const AddProduct = () => {
 const [imageUri, setImageUri] = useState(null);

 const handleChoosePhoto = async () => {
   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
   if (status !== "granted") {
     alert("Sorry, we need camera roll permissions to make this work!");
     return;
   }
   let result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.Images,
     allowsEditing: true,
     aspect: [4, 3],
     quality: 1,
   });

   if (!result.canceled) {
     setImageUri(result.assets[0].uri);
   }
 };

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <Text
        style={{
          textAlign: "center",
          padding: 10,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Thêm phụ tùng
      </Text>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Tên phụ tùng</Text>
        <TextInput
          placeholder=""
          placeholderTextColor={"black"}
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Màu</Text>
          <TextInput
            placeholder=""
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Giá tiền</Text>

          <TextInput
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Thông tin phụ tùng
          </Text>
          <TextInput
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Hình ảnh</Text>
          <Pressable style={styles.imagePicker} onPress={handleChoosePhoto}>
            <Text style={{ color: "white" }}>Chọn ảnh</Text>
          </Pressable>
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 100, height: 100, marginTop: 10 }}
            />
          )}
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              width: "50%",
              backgroundColor: "#0066b2",
              padding: 19,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "white" }}>Thêm + </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
  imagePicker: {
    backgroundColor: "#0066b2",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#0066b2",
    padding: 19,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
