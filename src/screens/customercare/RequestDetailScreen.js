import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Button, Alert, Modal, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RequestInfoTab from '../../components/RequestDetailComponent/RequestInfoTab';
import MaintenanceInfoTab from '../../components/RequestDetailComponent/MaintenanceInfoTab';
import MaintenanceTaskTab from '../../components/RequestDetailComponent/MaintenanceTaskTab'; 
import { clearStaffList } from '../../app/CusCare/requestDetailSlice';
import ErrorComponent from '../../components/ErrorComponent';
import {
  assignTask,
  fetchRequestDetail,
  fetchMaintenanceTasks,
  updateStatus,
  
} from '../../app/CusCare/requestDetailSlice';

const Tab = createMaterialTopTabNavigator();

const RequestDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { requestId } = route.params;
  const { loading, error, request, maintenanceTasks, isTaskAssigned } = useSelector((state) => state.requestDetail);
  const [fetchError, setFetchError] = useState(null);
  const [assignError, setAssignError] = useState(null);

  useEffect(() => {
    dispatch(fetchRequestDetail(requestId));
  }, [requestId]);

  useEffect(() => {
    if (request?.responseMaintenanceInformation?.informationMaintenanceId) {
      dispatch(fetchMaintenanceTasks());
    }
  }, [dispatch, request?.responseMaintenanceInformation?.informationMaintenanceId]);
  useEffect(() => {
    dispatch(clearStaffList());
}, []);
  const handleUpdateStatus = async (newStatus) => {
    try {
      console.log("Start updating status: " + requestId, newStatus);
      const result = await dispatch(updateStatus({ requestId, newStatus })).unwrap();
      console.log("Status updated successfully:", result);
      dispatch(fetchRequestDetail(requestId));
      console.log("Request detail fetched after status update.");
    } catch (error) {
      console.error("Error updating status:", error);
      setFetchError(error.message || "An unexpected error occurred.");
    }
  };
  

  const handleAssignTask = async (id, technicianId) => {
    try {
      await dispatch(assignTask({ id, technicianId })).unwrap();
      dispatch(fetchRequestDetail(requestId));
    } catch (error) {
      setAssignError(error.message);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  const renderKeyValuePairs = (data, level = 0) => {
    return Object.keys(data).map((key) => {
      const value = data[key];
      const isObject = typeof value === 'object' && value !== null;

      return (
        <View key={key} style={[styles.item, { marginLeft: level * 10 }]}>
          <Text style={styles.label}>{key}</Text>
          {isObject ? (
            renderKeyValuePairs(value, level + 1)
          ) : (
            <Text>{String(value)}</Text>
          )}
        </View>
      );
    });
  };

  const filteredMaintenanceTasks = maintenanceTasks.filter(
    (task) => task.informationMaintenanceId === request?.responseMaintenanceInformation?.informationMaintenanceId
  );

  return (
    <View style={{ flex: 1 }}>
      {request && (
        <Tab.Navigator>
          <Tab.Screen name="Thông tin lịch hẹn">
            {() => <RequestInfoTab request={request} updateStatus={handleUpdateStatus}  assignTask={handleAssignTask} />}
          </Tab.Screen>
          <Tab.Screen name="Chi tiết dịch vụ">
            {() => <MaintenanceInfoTab request={request} />}
          </Tab.Screen>
          {isTaskAssigned && (
            <Tab.Screen name="Công việc">
              {() => <MaintenanceTaskTab request={request} maintenanceTasks={filteredMaintenanceTasks}  assignTask={handleAssignTask}/>}
            </Tab.Screen>
          )}
        </Tab.Navigator>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  item: { padding: 10, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 5 },
  error: { color: 'red', marginTop: 10 },
  card: { marginBottom: 20 },
});

export default RequestDetailScreen;
