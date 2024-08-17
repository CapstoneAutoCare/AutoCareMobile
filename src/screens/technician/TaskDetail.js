import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Button, Alert } from 'react-native';
import axiosClient from '../../services/axiosClient';
const TaskDetail = ({ route }) => {
  const { task } = route.params;

  const handleCompleteService = async (serviceId) => {
    try {
      // Update the task service status to DONE
      console.log(`COMPLETING SERVICE: ${serviceId}`);
      await axiosClient.patch(
        `MaintenanceTaskServiceInfoes/PatchStatus?id=${serviceId}&status=DONE`
      );
      Alert.alert('Service Completed', 'The service status has been updated to DONE.');
    } catch (error) {
      Alert.alert('Error', 'There was an error completing the service.');
      console.error('Error completing service:', error);
    }
  };
  
  const handleCompleteSparepart = async (sparepartId) => {
    try {
      // Update the spare part status to DONE
      console.log(`COMPLETING SPARE PART: ${sparepartId}`);
      await axiosClient.patch(
        `/MaintenanceTaskSparePartInfoes/PatchStatus?id=${sparepartId}&status=DONE`
      );
      Alert.alert('Spare Part Completed', 'The spare part status has been updated to DONE.');
    } catch (error) {
      Alert.alert('Error', 'There was an error completing the spare part.');
      console.error('Error completing spare part:', error);
    }
  };
  

  const renderService = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>Status: {item.status}</Text>
        {item.status !== 'DONE' && (
          <Button
            title="Complete Service"
            onPress={() => handleCompleteService(item?.maintenanceTaskServiceInfoId)}
          />
        )}
      </View>
    </View>
  );

  const renderSparePart = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>Status: {item.status}</Text>
        {item.status !== 'DONE' && (
          <Button
            title="Complete Spare Part"
            onPress={() => handleCompleteSparepart(item?.maintenanceTaskSparePartInfoId)}
          />
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.maintenanceTaskName}</Text>
      <Text style={styles.detail}>Created Date: {new Date(task.createdDate).toLocaleString()}</Text>
      <Text style={styles.detail}>Status: {task.status}</Text>
      <Text style={styles.sectionTitle}>Services</Text>
      <FlatList
        data={task.responseMainTaskServices}
        renderItem={renderService}
        keyExtractor={(item) => item.maintenanceTaskServiceInfoId}
      />

      <Text style={styles.sectionTitle}>Spare Parts</Text>
      <FlatList
        data={task.responseMainTaskSpareParts}
        renderItem={renderSparePart}
        keyExtractor={(item) => item.maintenanceTaskSparePartInfoId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 16,
    marginVertical: 4,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    color: '#888',
  },
});

export default TaskDetail;
