import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RequestDetailScreen from "../../screens/customercare/RequestDetailScreen";

const Stack = createNativeStackNavigator();
const RequestDetailNavigator = ({ authenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="REQUEST_DETAIL"
        component={RequestDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"REQUEST_DETAIL_POST"}
        component={RequestDetailPost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"REQUEST_DETAIL_DETAIL"}
        component={RequestDetailDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};  
export default RequestDetailNavigator;