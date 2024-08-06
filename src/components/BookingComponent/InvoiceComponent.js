import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import Moment from 'moment';

const InvoiceComponent = ({ request, invoiceData }) => {

  

  const renderServiceInfos = () => {
    return request.responseMaintenanceInformation.responseMaintenanceServiceInfos.map(info => (
      <View key={info.maintenanceServiceInfoId} style={styles.tableRow}>
        <Text style={styles.tableCell}>{info.maintenanceServiceInfoName}</Text>
        <Text style={styles.tableCell}>{info.quantity}</Text>
        <Text style={styles.tableCell}>{info.actualCost}</Text>
        <Text style={styles.tableCell}>{info.totalCost}</Text>
      </View>
    ));
  };

  const renderSparePartInfos = () => {
    return request.responseMaintenanceInformation.responseMaintenanceSparePartInfos.map(info => (
      <View key={info.maintenanceSparePartInfoId} style={styles.tableRow}>
        <Text style={styles.tableCell}>{info.maintenanceSparePartInfoName}</Text>
        <Text style={styles.tableCell}>{info.quantity}</Text>
        <Text style={styles.tableCell}>{info.actualCost}</Text>
        <Text style={styles.tableCell}>{info.totalCost}</Text>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hóa Đơn</Text>
        <Text>Ngày: {Moment().format('DD/MM/YYYY')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Client Information</Text>
        <Text>Tên: {request.responseClient.firstName} {request.responseClient.lastName}</Text>
        <Text>Email: {request.responseClient.email}</Text>
        <Text>Số điện thoại: {request.responseClient.phone}</Text>
        <Text>Địa Chỉ: {request.responseClient.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin xe</Text>
        <Text>Mẫu Xe: {request.responseVehicles.vehicleModelName}</Text>
        <Text>Nhãn Hiệu: {request.responseVehicles.vehiclesBrandName}</Text>
        <Text>Biển Số: {request.responseVehicles.licensePlate}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông Tin Bảo Dưỡng</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Dịch Vụ/Linh Kiện</Text>
            <Text style={styles.tableHeader}>Số Lượng</Text>
            <Text style={styles.tableHeader}>Đơn Giá</Text>
            <Text style={styles.tableHeader}>Tổng</Text>
          </View>
          {renderServiceInfos()}
          {renderSparePartInfos()}
        </View>
        <Text style={styles.totalPrice}>Thành Tiền: {invoiceData?.subTotal} VND</Text>
        <Text style={styles.totalPrice}>VAT: {invoiceData?.vat}%</Text>
        <Text style={styles.totalPrice}>Tổng Cộng:  {invoiceData?.totalAmount}VND</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f1f1f1',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    padding: 10,
  },
  totalPrice: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InvoiceComponent;
