import React from "react";
import { View, Text, SafeAreaView, Image } from 'react-native';
import Login from "../Login/login.js";
import Home from "../Login/home.js";
import About from "../Login/about.js";
import Register from "../Login/register.js";
import Contact from "../Login/contact.js";
import BookingList from "../Login/bookingList.js"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Trang chủ" component={Home} options={{
                tabBarIcon: () => (<Image style={{ width: 20, height: 20 }} source={require('./images/home.png')} />)
            }} />
            <Tab.Screen name="Garage" component={About} options={{
                tabBarIcon: () => (<Image style={{ width: 20, height: 20 }} source={require('./images/garage.png')} />)
            }} />
            <Tab.Screen name="Xe của tôi" component={Contact} options={{
                tabBarIcon: () => (<Image style={{ width: 20, height: 20 }} source={require('./images/sedan.png')} />)
            }} />
            <Tab.Screen name="Lịch hẹn" component={BookingList} options={{
                tabBarIcon: () => (<Image style={{ width: 20, height: 20 }} source={require('./images/clipboard.png')} />)
            }} />
        </Tab.Navigator>
    )
}
export default RootComponent = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen options={{ headerShown: false }} name="HomeTab" component={MyTabs} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}