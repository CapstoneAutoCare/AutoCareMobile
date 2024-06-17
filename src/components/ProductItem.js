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
        {item?.sparePartsItemName}
      </Text>

      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          giá: {item?.responseSparePartsItemCosts.length> 0 ? item?.responseSparePartsItemCosts[0].acturalCost :"trống" } VND
        </Text>
        <Text style={{ color: "#0066b2", fontWeight: "bold" }}>
          status: {item?.status}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#0066b2",
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white" }}>edit</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#f5222d",
            padding: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white" }}>delete</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
