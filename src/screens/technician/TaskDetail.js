import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Button, Alert, ScrollView } from 'react-native';
import axiosClient from '../../services/axiosClient';

const TaskDetail = ({ route }) => {
  const { task: initialTask } = route.params;
  const [task, setTask] = useState(initialTask);

  const [refreshing, setRefreshing] = useState(false);
  const fetchTaskData = async () => {
    try {
      const response = await axiosClient.get(`/MaintenanceTasks/GetById?id=${initialTask.maintenanceTaskId}`);
      setTask(response.data);
    } catch (error) {
      console.error('Error fetching task data:', error);
    }
  };
  const handleCompleteService = async (serviceId) => {
    try {
      console.log(`COMPLETING SERVICE: ${serviceId}`);
      await axiosClient.patch(
        `MaintenanceTaskServiceInfoes/PatchStatus?id=${serviceId}&status=DONE`
      );
      setRefreshing(!refreshing);

      Alert.alert('Đã xong công việc.');
    } catch (error) {
      Alert.alert('Lỗi không thể hoàn thành');
      console.error('Error completing service:', error);
    }
    setRefreshing(!refreshing);

  };

  const handleCompleteSparepart = async (sparepartId) => {
    try {
      console.log(`COMPLETING SPARE PART: ${sparepartId}`);
      await axiosClient.patch(
        `/MaintenanceTaskSparePartInfoes/PatchStatus?id=${sparepartId}&status=DONE`
      );
      setRefreshing(!refreshing);

      Alert.alert('Đã xong công việc.');

    } catch (error) {
      Alert.alert('Lỗi không thể hoàn thành');
      console.error('Error completing spare part:', error);
    }
    setRefreshing(!refreshing);

  };

  const translateStatus = (status) => {
    const statusMapping = {
      DONE: "Hoàn Tất",
      ACCEPTED: "Đang Thực Hiện",
      ACTIVE: "Đang Thực Hiện"
    };
    return statusMapping[status] || status;
  };

  const renderService = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>Trạng Thái: {translateStatus(item.status)}</Text>
        {item.status !== 'DONE' && (
          <Button
            title="Hoàn tất công việc"
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
        <Text style={styles.status}>Trạng Thái: {translateStatus(item.status)}</Text>
        {item.status !== 'DONE' && (
          <Button
            title="Hoàn tất công việc"
            onPress={() => handleCompleteSparepart(item?.maintenanceTaskSparePartInfoId)}
          />
        )}
      </View>
    </View>
  );
  useEffect(() => {
    fetchTaskData();
  }, [refreshing])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{task.maintenanceTaskName}</Text>
      <Text style={styles.detail}>Ngày được giao: {new Date(task.createdDate).toLocaleString()}</Text>
      <Text style={styles.detail}>Trạng thái: {translateStatus(task.status)}</Text>

      <Text style={styles.sectionTitle}>Dịch Vụ</Text>
      <FlatList
        data={task.responseMainTaskServices}
        renderItem={renderService}
        keyExtractor={(item) => item.maintenanceTaskServiceInfoId}
        scrollEnabled={false} // Prevents FlatList from scrolling independently
      />

      <Text style={styles.sectionTitle}>Phụ Tùng</Text>
      <FlatList
        data={task.responseMainTaskSpareParts}
        renderItem={renderSparePart}
        keyExtractor={(item) => item.maintenanceTaskSparePartInfoId}
        scrollEnabled={false} // Prevents FlatList from scrolling independently
      />
    </ScrollView>
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
