import React, { useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Moment from 'moment';


const HistoryDetail = ({ route }) => {
  
  const { info } = route.params;


 
  const translateStatus = (status) => {
    const statusMapping = {
      WAITING: "Đang chờ",
      ACCEPTED: "Đã chấp nhận",
      CANCELLED: "Đã hủy",
      DENIED: "Đã từ chối",
      FINISHED: "Đã hoàn thành",
      WAITINGBYCAR: "Đang chờ xe",
      CREATEDBYCLIENT: "Yêu cầu bởi khách hàng",
      CREATEDBYClIENT: "Yêu cầu bởi khách hàng",
      CHECKIN: "Khách hàng đã đến",
      REPAIRING: "Đang sửa chữa",
      PAYMENT: "Thanh toán"
  
    };
    return statusMapping[status] || status;
  };
  
  return (
    <ScrollView style={styles.container}>
      
      
      <Card style={styles.card}>
        <Card.Title title="Lịch sử bảo dưỡng" left={(props) => <MaterialIcons {...props} name="history" />} />
        <Card.Content>
          {info?.responseMaintenanceHistoryStatuses.map((historyStatus) => (
            <View key={historyStatus.maintenanceHistoryStatusId} style={styles.item}>
              <Text>Trạng thái: {translateStatus(historyStatus.status)}</Text>
              <Text>Ngày giờ: {Moment(historyStatus.dateTime).format('DD/MM/YYYY HH:mm')}</Text>
              <Text>Ghi chú: {translateStatus(historyStatus.note)}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  item: { padding: 10, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 5 },
});

export default HistoryDetail;
