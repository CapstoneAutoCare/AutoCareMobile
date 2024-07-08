import { useNavigation } from "@react-navigation/native";
import React, { Component, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
export default Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.center}>
        <View>
          <Text style={{ color: "red" }}>home</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});