import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Moment from 'moment';
import axiosClient from '../../services/axiosClient';

const InvoiceComponent = ({ request, invoiceData }) => {
  const [maintenanceInfo, setMaintenanceInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch maintenance information based on bookingId
  useEffect(() => {
    const fetchMaintenanceInfo = async () => {
      try {
        const response = await axiosClient.get(`MaintenanceInformations/GetListByBookingId?id=${request.bookingId}`);
        setMaintenanceInfo(response.data[0]);  // Truy cập vào phần tử đầu tiên của mảng
      } catch (err) {
        setError(err.message || 'Có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceInfo();
  }, [request.bookingId]);

  const formatCurrency = (value) => {
    return !value ? "không tính phí" : value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const renderServiceInfos = () => {
    return maintenanceInfo?.responseMaintenanceServiceInfos?.map((info, index) => (
      <View key={index} style={styles.tableRow}>
        <Text style={styles.tableCell}>{info?.maintenanceServiceInfoName || 'N/A'}</Text>
        <Text style={styles.tableCell}>{info?.quantity || '0'}</Text>
        <Text style={styles.tableCell}>{formatCurrency(info?.actualCost)}</Text>
        <Text style={styles.tableCell}>{formatCurrency(info?.totalCost)}</Text>
      </View>
    ));
  };

  const renderSparePartInfos = () => {
    return maintenanceInfo?.responseMaintenanceSparePartInfos?.map((info, index) => (
      <View key={index} style={styles.tableRow}>
        <Text style={styles.tableCell}>{info?.maintenanceSparePartInfoName || 'N/A'}</Text>
        <Text style={styles.tableCell}>{info?.quantity || '0'}</Text>
        <Text style={styles.tableCell}>{formatCurrency(info?.actualCost)}</Text>
        <Text style={styles.tableCell}>{formatCurrency(info?.totalCost)}</Text>
      </View>
    ));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!maintenanceInfo) {
    return <Text>Không có dữ liệu bảo dưỡng</Text>;
  }

  const totalAmount = invoiceData?.totalAmount || 0;  // Default to 0 if null
  const shouldDisplayTotals = totalAmount > 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hóa Đơn</Text>
        <Text>Ngày: {Moment().format('DD/MM/YYYY')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
        <Text>Tên: {request.responseClient.firstName} {request.responseClient.lastName}</Text>
        <Text>Email: {request.responseClient.email}</Text>
        <Text>Số điện thoại: {request.responseClient.phone}</Text>
        <Text>Địa Chỉ: {request.responseClient.address}</Text>
      </View>



      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin xe</Text>
        <Text>Mẫu Xe: {maintenanceInfo?.responseVehicles?.vehicleModelName || 'N/A'}</Text>
        <Text>Nhãn Hiệu: {maintenanceInfo?.responseVehicles?.vehiclesBrandName || 'N/A'}</Text>
        <Text>Biển Số: {maintenanceInfo?.responseVehicles?.licensePlate || 'N/A'}</Text>
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

        {/* Chỉ hiển thị Tổng và VAT nếu tổng thanh toán > 0 */}
        {shouldDisplayTotals && (
          <>
            <Text style={styles.totalPrice}>Tổng: {formatCurrency(invoiceData?.subTotal)}</Text>
            <Text style={styles.totalPrice}>VAT: {invoiceData?.vat}%</Text>
          </>
        )}
        <Text style={styles.totalPrice}>Tổng Giá Trị Thanh Toán: {formatCurrency(totalAmount)}</Text>
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
