import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ROUTES from "../../../constants/routes";
import BookingDetail from "../../../screens/client/booking/bookingDetail";
import Booking from "../../../manager/booking";
const Stack = createNativeStackNavigator();
const BookingNavigator = ({ authenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.BOOKING}
        component={Booking}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"BookingDetail"}
        component={BookingDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default BookingNavigator;

const styles = StyleSheet.create({});
