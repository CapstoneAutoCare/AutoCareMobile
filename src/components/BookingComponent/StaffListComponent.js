import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const StaffListComponent = ({ staffList, selectedStaff, setSelectedStaff }) => {
  return (
    <ScrollView style={styles.container}>
      {staffList.map((staff) => (
        <TouchableOpacity
          key={staff.technicianId}
          style={[styles.staffItem, selectedStaff?.technicianId === staff.technicianId && styles.selectedStaffItem]}
          onPress={() => setSelectedStaff(staff)}
        >
          <Text>{staff.logo}</Text>
          <Text>{staff.firstName} {staff.lastName}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 400,
    padding: 16,
  },
  staffItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  selectedStaffItem: {
    backgroundColor: '#d0e7ff',
  },
});

export default StaffListComponent;
