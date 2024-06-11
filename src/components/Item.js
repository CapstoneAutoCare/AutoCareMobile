import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import MenuComponent from "./MenuComponent";

const Item = ({ item }) => {
  const data = [item];
  const [selected, setSelected] = useState(["Recommended"]);
  const handleItemSelect = (item) => {
    const itemSelected = selected.find((c) => c === item);
    if (itemSelected) {
      setSelected(selected.filter((sel) => sel !== item));
    } else {
      setSelected([...selected, item]);
    }
  };
  return (
    <View>
      {data.map((item, i) => (
        <>
          <Pressable
            style={{
              margin: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            key={i}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {item.name} ({item.items.length})
            </Text>
            <AntDesign name="down" size={24} color="black" />
          </Pressable>

          {selected.includes(item.name)
            ? item.items.map((food, index) => (
                <MenuComponent food={food} key={index} />
              ))
            : null}
        </>
      ))}
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({});
