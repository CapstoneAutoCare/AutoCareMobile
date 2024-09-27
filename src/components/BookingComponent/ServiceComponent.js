import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import CustomSearchableDropdown from '../../features/CustomSearchableDropdown';

const ServiceComponent = ({
  services,
  availableServices,
  handleAddService,
  handleRemoveService,
  handleServiceChange
}) => (
  <View>
    <Text>Dịch vụ</Text>
    {services.map((service, index) => (
                    <View key={index}>
                      <View style={styles.inputContainerCost}>
                        <CustomSearchableDropdown
                          items={availableServices.map((service) => ({
                            id: service.maintenanceServiceCostId,
                            name: `${service.maintenanceServiceName} - ${service.acturalCost} VND`,
                            cost: service.acturalCost,
                            maintenanceServiceName:
                              service.maintenanceServiceName,
                          }))}
                          onItemSelect={(item) => {
                            handleServiceChange(
                              index,
                              "maintenanceServiceCostId",
                              item.id
                            );
                            handleServiceChange(
                              index,
                              "maintenanceServiceInfoName",
                              item.maintenanceServiceName
                            );
                            handleServiceChange(index, "quantity", 1);
                            handleServiceChange(index, "actualCost", item.cost);
                          }}
                          placeholder="Chọn dịch vụ"
                        />
                      </View>
                      <View style={styles.inputContainerCost}>
                        <TextInput
                          style={styles.textInput}
                          placeholder="Tên dịch vụ"
                          value={service.maintenanceServiceInfoName}
                          onChangeText={(text) =>
                            handleServiceChange(
                              index,
                              "maintenanceServiceInfoName",
                              text
                            )
                          }
                        />
                      </View>
                      <View style={styles.inputContainerCost}>
                        <TextInput
                          style={styles.textInput}
                          placeholder="Số lượng"
                          value={String(service.quantity)}
                          keyboardType="numeric"
                          editable={false}
                        />
                      </View>
                      <View style={styles.inputContainerCost}>
                        <TextInput
                          style={styles.textInput}
                          placeholder="Chi phí"
                          value={String(service.actualCost)}
                          keyboardType="numeric"
                          editable={false}
                        />
                      </View>
                      <View style={styles.inputContainerCost}>
                        <TextInput
                          style={styles.textInput}
                          placeholder="Ghi chú"
                          value={service.note}
                          onChangeText={(text) =>
                            handleServiceChange(index, "note", text)
                          }
                        />
                      </View>

                      <Pressable
                        style={styles.button}
                        onPress={() => handleRemoveService(index)}
                      >
                        <Text style={styles.buttonText}>Xóa</Text>
                      </Pressable>
                    </View>
                  ))}
              <Pressable style={styles.button} onPress={handleAddService}>
                <Text style={styles.buttonText}>Thêm dịch vụ</Text>
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