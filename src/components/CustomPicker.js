import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

const CustomPicker = ({ data, selectedValue, onValueChange, placeholder }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = ['Không chọn', ...data.filter(item => 
      item.toLowerCase().includes(searchQuery.toLowerCase())
    )];

    return (
      <View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.touchable}
        >
          <Text>{selectedValue || placeholder}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <FlatList
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      onValueChange(item === 'Không chọn' ? '' : item);
                      setModalVisible(false);
                    }}
                    style={styles.itemTouchable}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
                style={styles.list}
              />
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={{ color: 'white' }}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

const styles = StyleSheet.create({
  touchable: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 5,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%', // Giới hạn chiều cao của modal
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  list: {
    flexGrow: 0, // Không để danh sách chiếm hết chiều cao có sẵn
    maxHeight: 200, // Giới hạn chiều cao của danh sách để không vượt quá modal
  },
  itemTouchable: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default CustomPicker;
