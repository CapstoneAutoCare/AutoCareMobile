import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import COLORS from "./../../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getService, postServiceCost } from "../../../app/Center/actions";
import { useDispatch, useSelector } from "react-redux";
const ServiceCost = ({ route }) => {
  const { maintenanceServiceId } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const [note, setNote] = useState("");
  const [acturalCost, setActuralCost] = useState("");
  const handleSignup = async () => {
        if (!acturalCost || !note) {
          alert("Vui lòng điền đầy đủ thông tin");
          return;
        }
         setLoad(true);
    await dispatch(
      postServiceCost({
        acturalCost: acturalCost,
        note: note,
        maintenanceServiceId: maintenanceServiceId,
      })
    );
    setLoad(false);
    alert("Tạo giá dịch vụ thành công!");
    navigation.navigate("SERVICE");
  };
  const handleNavigateBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleNavigateBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="chi phí dịch vụ"
            value={acturalCost}
            onChangeText={(text) => setActuralCost(text)}
            required={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="lưu ý"
            value={note}
            onChangeText={(text) => setNote(text)}
            required={true}
          />
        </View>
        {load ? (
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Đang tạo ...</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Tạo giá</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  backButton: {
    marginRight: 12,
  },
  form: {
    paddingHorizontal: 42,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  picker: {
    flex: 1,
  },
  button: {
    backgroundColor: "red",
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default ServiceCost;
