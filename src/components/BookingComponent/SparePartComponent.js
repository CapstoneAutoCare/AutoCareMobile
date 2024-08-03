import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SparePartComponent = ({
  spareParts,
  availableSpareParts,
  handleAddSparePart,
  handleRemoveSparePart,
  handleSparePartChange
}) => (
  <View>
    <Text>Phụ Tùng</Text>
    {spareParts.map((sparePart, index) => (
      <View key={index}>
        <View style={styles.inputContainerCost}>
          <Picker
            selectedValue={sparePart.sparePartsItemCostId}
            onValueChange={(value) =>
              handleSparePartChange(index, "sparePartsItemCostId", value)
            }
            style={styles.picker}
          >
            <Picker.Item label="Chọn phụ tùng" value="" />
            {availableSpareParts.map((part) => (
              <Picker.Item
                key={part.sparePartsItemCostId}
                label={part.sparePartsItemName}
                value={part.sparePartsItemCostId}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainerCost}>
          <TextInput
            style={styles.textInput}
            placeholder="Tên phụ tùng"
            value={sparePart.maintenanceSparePartInfoName}
            onChangeText={(text) =>
              handleSparePartChange(index, "maintenanceSparePartInfoName", text)
            }
          />
        </View>
        <View style={styles.inputContainerCost}>
          <TextInput
            style={styles.textInput}
            placeholder="Số lượng"
            keyboardType="numeric"
            value={sparePart.quantity.toString()}
            onChangeText={(text) =>
              handleSparePartChange(index, "quantity", parseInt(text))
            }
          />
        </View>
        <View style={styles.inputContainerCost}>
          <TextInput
            style={styles.textInput}
            placeholder="Chi phí thực tế"
            keyboardType="numeric"
            value={sparePart.actualCost.toString()}
            onChangeText={(text) =>
              handleSparePartChange(index, "actualCost", parseInt(text))
            }
          />
        </View>
        <View style={styles.inputContainerCost}>
          <TextInput
            style={styles.textInput}
            placeholder="Ghi chú"
            value={sparePart.note}
            onChangeText={(text) =>
              handleSparePartChange(index, "note", text)
            }
          />
        </View>
        <Pressable
          style={[styles.button, styles.removeButton]}
          onPress={() => handleRemoveSparePart(index)}
        >
          <Text style={styles.buttonText}>Xóa</Text>
        </Pressable>
      </View>
    ))}
    <Pressable style={styles.button} onPress={handleAddSparePart}>
      <Text style={styles.buttonText}>Thêm Phụ Tùng</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  inputContainerCost: { marginBottom: 10 },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  removeButton: { backgroundColor: "red" },
  buttonText: { color: "#fff", fontSize: 16 },
  picker: { height: 50, width: "100%" },
});

export default SparePartComponent;