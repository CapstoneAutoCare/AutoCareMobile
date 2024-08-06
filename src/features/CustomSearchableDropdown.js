import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CustomSearchableDropdown = ({
  items,
  onItemSelect,
  placeholder,
  labelKey = "name",
  valueKey = "id",
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearch = (text) => {
    setSearchText(text);
    setFilteredItems(
      items.filter((item) =>
        item[labelKey].toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleItemSelect = (item) => {
    setSearchText("");
    setModalVisible(false);
    onItemSelect(item);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.dropdownButton}
      >
        <Text style={styles.dropdownButtonText}>{placeholder}</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchText}
            onChangeText={handleSearch}
          />
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item[valueKey].toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleItemSelect(item)}
                style={styles.item}
              >
                <Text style={styles.itemText}>{item[labelKey]}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CustomSearchableDropdown;
