import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";

const ProductItem = ({ item }) => {
  const navigation = useNavigation();
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
        {item?.maintenanceSparePartInfoName
          ? item?.maintenanceSparePartInfoName
          : item?.sparePartsItemName}
      </Text>

      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          giá:{" "}
          {item?.totalCost
            ? item?.totalCost
            : item?.acturalCost
            ? item?.acturalCost
            : item?.responseSparePartsItemCosts.length > 0
            ? item?.responseSparePartsItemCosts[0].acturalCost
            : "trống"}{" "}
          VND
        </Text>
       
      </View>
      {item?.sparePartsItemId && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 5, 
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
            onPress={() =>
              navigation.navigate("PRODUCT_DETAIL", {
                sparePartsItemId: item.sparePartsItemId,
              })
            }
          >
            <Text style={{ color: "white" }}>thông tin</Text>
          </Pressable>
        </View>
      )}
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
