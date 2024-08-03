import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Button, Alert } from 'react-native';
import axios from 'axios';

const TaskDetail = ({ route, navigation }) => {
  const { task } = route.params;

  const handleAccept = async () => {
    try {
      // Update the task status to REPAIRING
      console.log(`ACCEPTING : ${task.maintenanceTaskId}`)
      await axios.patch(`http://autocare.runasp.net/api/MaintenanceTasks/Patch?id=${task.maintenanceTaskId}&status=ACCEPTED`);
      // Create a new MaintenanceHistoryStatus
      console.log(`CREATING ${task.informationMaintenanceId}`)
      await axios.patch(`http://autocare.runasp.net/api/MaintenanceInformations/CHANGESTATUS?id=${task.informationMaintenanceId}&status=REPAIRING`);
      Alert.alert('Task Accepted', 'The task status has been updated to REPAIRING.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'There was an error updating the task.');
    }
  };

  const handleReject = async () => {
    try {
      // Update the task status to CANCELLED
      
      await axios.patch(`http://autocare.runasp.net/api/MaintenanceTasks/Patch?id=${task.maintenanceTaskId}&status=CANCELLED`);
      Alert.alert('Task Rejected', 'The task status has been updated to CANCELLED.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'There was an error updating the task.');
    }
  };
  const handleComplete = async () => {
    try {
      // Update the task status to DONE
      console.log(`COMPLETING: ${task.maintenanceTaskId}`);
      await axios.patch(`http://autocare.runasp.net/api/MaintenanceTasks/Patch?id=${task.maintenanceTaskId}&status=DONE`);
      // Update the maintenance information status if needed
      Alert.alert('Task Completed', 'The task status has been updated to DONE.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'There was an error completing the task.');
    }
  };
  const renderService = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>Status: {item.status}</Text>
      </View>
    </View>
  );

  const renderSparePart = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>Status: {item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.maintenanceTaskName}</Text>
      <Text style={styles.detail}>Created Date: {new Date(task.createdDate).toLocaleString()}</Text>
      <Text style={styles.detail}>Status: {task.status}</Text>

      {task.status === 'ACTIVE' && (
        <View style={styles.buttonContainer}>
          <Button title="Accept" onPress={handleAccept} />
          <Button title="Reject" onPress={handleReject} />
        </View>
      )}
        {task.status === 'ACCEPTED' && (
        <View style={styles.buttonContainer}>
          <Button title="Complete" onPress={handleComplete} />
        </View>
      )}
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
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
});

export default TaskDetail;
