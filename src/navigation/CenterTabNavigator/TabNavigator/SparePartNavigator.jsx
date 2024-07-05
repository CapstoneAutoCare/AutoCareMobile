import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetail from "../../../screens/center/sparePart/sparePartDetail";
import Product from "../../../manager/product";
import SparePartPost from "../../../screens/center/sparePart/sparePartPost";
import SparePartPut from './../../../screens/center/sparePart/sparePartPut';
const Stack = createNativeStackNavigator();
const SparePartNavigator = ({ authenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PRODUCT"
        component={Product}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PRODUCT_POST"
        component={SparePartPost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PRODUCT_PUT"
        component={SparePartPut}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"PRODUCT_DETAIL"}
        component={ProductDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SparePartNavigator;

const styles = StyleSheet.create({});
