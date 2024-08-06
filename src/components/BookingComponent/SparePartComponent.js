import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import CustomSearchableDropdown from '../../features/CustomSearchableDropdown';
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
                    <CustomSearchableDropdown
                      items={availableSpareParts.map((part) => ({
                        id: part.sparePartsItemCostId,
                        name: `${part.maintananceScheduleName} ${part.sparePartsItemName} - ${part.acturalCost} VND`,
                        cost: part.acturalCost,
                      }))}
                      onItemSelect={(item) => {
                        handleSparePartChange(
                          index,
                          "sparePartsItemCostId",
                          item.id
                        );
                        handleSparePartChange(
                          index,
                          "maintenanceSparePartInfoName",
                          item.name
                        );
                        handleSparePartChange(index, "quantity", 1);
                        handleSparePartChange(index, "actualCost", item.cost);
                      }}
                      placeholder="Chọn phụ tùng"
                    />
                  </View>
                  <View style={styles.inputContainerCost}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Tên phụ tùng"
                      value={sparePart.maintenanceSparePartInfoName}
                      onChangeText={(text) => {
                        handleSparePartChange(
                          index,
                          "maintenanceSparePartInfoName",
                          text
                        );
                      }}
                    />
                  </View>
                  <View style={styles.inputContainerCost}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Số lượng"
                      value={String(sparePart.quantity)}
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        handleSparePartChange(
                          index,
                          "quantity",
                          parseInt(text) || 0
                        );
                      }}
                    />
                  </View>
                  <View style={styles.inputContainerCost}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Chi phí"
                      value={String(
                        sparePart.actualCost * sparePart.quantity ||
                          sparePart.actualCost
                      )}
                      keyboardType="numeric"
                      editable={false}
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
                    style={styles.button}
                    onPress={() => handleRemoveSparePart(index)}
                  >
                    <Text style={styles.buttonText}>Xóa</Text>
                  </Pressable>
                </View>
              ))}
              <Pressable style={styles.button} onPress={handleAddSparePart}>
                <Text style={styles.buttonText}>Thêm phụ tùng</Text>
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