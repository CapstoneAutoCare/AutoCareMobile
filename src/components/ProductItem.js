import { StyleSheet, Text, View, Pressable, Image } from "react-native";

const ProductItem = ({ item }) => {
  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Image
        style={{
          width: 150,
          height: 150,
          borderRadius: 10,
          resizeMode: "contain",
        }}
        source={{ uri: item?.image }}
      />

      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>

      <View
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>giá: {item?.price} VND</Text>
        <Text style={{ color: "#0066b2", fontWeight: "bold" }}>
          màu: {item?.color}
        </Text>
      </View>

      <Pressable
        style={{
          backgroundColor: "#0066b2",
          padding: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white" }}>Thêm vào giỏ hàng</Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
