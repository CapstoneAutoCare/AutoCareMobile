import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";

const PackageItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.vehiclesBrandName}
        {" - "}
        {item?.vehicleModelName}
      </Text>

      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          giá: {item?.maintananceScheduleName} VND
        </Text>
        
      </View>
    </Pressable>
  );
};

export default PackageItem;

const styles = StyleSheet.create({});
