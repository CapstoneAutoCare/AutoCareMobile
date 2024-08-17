import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";

const ServiceItem = ({ item }) => {
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
        {item?.maintenanceServiceInfoName
          ? item?.maintenanceServiceInfoName
          : item?.maintenanceServiceName}
      </Text>

      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          giá:{" "}
          {item?.totalCost
            ? item?.totalCost
            : item?.acturalCost
            ? item?.acturalCost
            : item?.responseMaintenanceServiceCosts?.length > 0
            ? item?.responseMaintenanceServiceCosts[0].acturalCost
            : "trống"}{" "}
          VND
        </Text>
        <Text style={{ color: "#0066b2", fontWeight: "bold" }}>
          status: {item?.status}
        </Text>
      </View>
      {item?.maintenanceServiceId && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 5, // Thay vì sử dụng gap, sử dụng marginHorizontal
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
              navigation.navigate("SERVICE_DETAIL", {
                maintenanceServiceId: item?.maintenanceServiceId,
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

export default ServiceItem;

const styles = StyleSheet.create({});
