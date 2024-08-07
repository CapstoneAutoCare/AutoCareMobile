import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Vehicle from "../../screens/client/vehicle/vehicle";
import RequestList from "../../screens/customercare/RequestList";
import VehiclePost from "../../screens/client/vehicle/postVehicle";
import RequestDetailScreen from "../../screens/customercare/RequestDetailScreen";
import Booking from "../../screens/client/booking/postBooking";
import ROUTES from "../../constants/routes";
import CreateBookingInfo from "../../screens/customercare/createBookingInfo/createBookingInfo";
import CreateBookingForWalkinGuest from "../../screens/customercare/createBookingInfo/createBookingForWalkinGuest";
import FeedbackList from "../../screens/customercare/FeedbackList";
const Stack = createNativeStackNavigator();
const HomeScreenNavigator = ({ authenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="REQUESTLIST"
        component={RequestList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FEEDBACK"
        component={FeedbackList}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="REQUEST_DETAIL"
        component={RequestDetailScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name={"CREATE_BOOKING_INFO"}
        component={CreateBookingInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"CREATEBOOKINGFORWALK-INGUEST"}
        component={CreateBookingForWalkinGuest}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreenNavigator;

const styles = StyleSheet.create({});
