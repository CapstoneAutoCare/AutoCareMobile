import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ROUTES from "../../../constants/routes";
import home from "../../../Login/home";
import PostBooking from "../../../screens/client/booking/postBooking";
import Booking from "../../../screens/client/booking/booking";
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
        name={"PostBooking"}
        component={PostBooking}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default BookingNavigator;

const styles = StyleSheet.create({});
