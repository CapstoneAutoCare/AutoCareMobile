import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ServiceComponent = ({
  services,
  availableServices,
  handleAddService,
  handleRemoveService,
  handleServiceChange
}) => (
  <View>
    <Text>Dịch Vụ</Text>
    {services.map((service, index) => (
      <View key={index}>
        <View style={styles.inputContainerCost}>
          <Picker
            selectedValue={service.maintenanceServiceCostId}
            onValueChange={(value) =>
              handleServiceChange(index, "maintenanceServiceCostId", value)
            }
            style={styles.picker}
          >
            <Picker.Item label="Chọn dịch vụ" value="" />
            {availableServices.map((service) => (
              <Picker.Item
                key={service.maintenanceServiceCostId}
                label={service.maintenanceServiceName}
                value={service.maintenanceServiceCostId}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainerCost}>
          <TextInput
            style={styles.textInput}
            placeholder="Tên dịch vụ"
            value={service.maintenanceServiceInfoName}
            onChangeText={(text) =>
              handleServiceChange(index, "maintenanceServiceInfoName", text)
            }
          />
        </View>
        <View style={styles.inputContainerCost}>
          <TextInput
            style={styles.textInput}
            placeholder="Số lượng"
            keyboardType="numeric"
            value={service.quantity.toString()}
            onChangeText={(text) =>
              handleServiceChange(index, "quantity", parseInt(text))
            }
          />
        </View>
        <View style={styles.inputContainerCost}>
          <TextInput
            style={styles.textInput}
            placeholder="Chi phí thực tế"
            keyboardType="numeric"
            value={service.actualCost.toString()}
            onChangeText={(text) =>
              handleServiceChange(index, "actualCost", parseInt(text))
            }
          />
        </View>
        <View style={styles.inputContainerCost}>
          <TextInput
            style={styles.textInput}
            placeholder="Ghi chú"
            value={service.note}
            onChangeText={(text) => handleServiceChange(index, "note", text)}
          />
        </View>
        <Pressable
          style={[styles.button, styles.removeButton]}
          onPress={() => handleRemoveService(index)}
        >
          <Text style={styles.buttonText}>Xóa</Text>
        </Pressable>
      </View>
    ))}
    <Pressable style={styles.button} onPress={handleAddService}>
      <Text style={styles.buttonText}>Thêm Dịch Vụ</Text>
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

export default ServiceComponent;