import React, { useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Moment from 'moment';
import { useNavigation, useRoute  } from '@react-navigation/native';
import ErrorComponent from '../ErrorComponent';
import { useSelector } from 'react-redux';

const MaintenanceInfoTab = ({ request, error }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { profile: navigationProfile, centre: navigationCentre } = route.params || {};


  const profile = navigationProfile || useSelector((state) => state.user.profile);
  const centre = navigationCentre || useSelector((state) => state.homepage.centre);

  useEffect(() => {
    if (!request?.responseMaintenanceInformation) {
      Alert.alert(
        "Thông báo",
        "Không có thông tin dịch vụ, có muốn tạo không?",
        [
          {
            text: "Không",
            style: "cancel",
          },
          {
            text: "Đồng ý",
            onPress: () => navigation.navigate("CREATE_BOOKING_INFO", { request, profile, centre }),
          },
        ],
        { cancelable: false }
      );
    }
  }, [request]);
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
      PAYMENT: "Thanh toán",
      YETPAID: "Chưa thanh toán",
      PAID: "Đã thanh toán"
    };
    return statusMapping[status] || status;
  };
  const formatCurrency = (value) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };
  if (error) return <ErrorComponent message={error} />;
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Thông tin bảo dưỡng" left={(props) => <MaterialIcons {...props} name="build" />} />
        <Card.Content>
          <Text style={styles.label}>Tên bảo dưỡng: {request.responseMaintenanceInformation?.informationMaintenanceName}</Text>
          <Text style={styles.label}>Ngày tạo bảo dưỡng: {Moment(request.responseMaintenanceInformation?.createdDate).format('DD/MM/YYYY HH:mm')}</Text>
          <Text style={styles.label}>
  Ngày hoàn thành: 
  {request.responseMaintenanceInformation?.finishedDate === "0001-01-01T00:00:00" || !request.responseMaintenanceInformation?.finishedDate
    ? " Chưa hoàn thành"
    : Moment(request.responseMaintenanceInformation.finishedDate).format('DD/MM/YYYY HH:mm')}
</Text>

          <Text style={styles.label}>Tổng giá: {formatCurrency(request.responseMaintenanceInformation?.totalPrice)}</Text>
          <Text style={styles.label}>Ghi chú bảo dưỡng: {request.responseMaintenanceInformation?.note}</Text>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="Dịch vụ bảo dưỡng" left={(props) => <MaterialIcons {...props} name="build" />} />
        <Card.Content>
          {request.responseMaintenanceInformation?.responseMaintenanceServiceInfos.map((serviceInfo) => (
            <View key={serviceInfo.maintenanceServiceInfoId} style={styles.item}>
              <Text>Tên dịch vụ: {serviceInfo.maintenanceServiceInfoName}</Text>
              <Text>Số lượng: {serviceInfo.quantity} lần</Text>
              <Text>Giảm giá: {serviceInfo.discount}</Text>
              <Text>Chi phí thực tế: {formatCurrency(serviceInfo.actualCost)}</Text>
              <Text>Tổng chi phí: {formatCurrency(serviceInfo.totalCost)}</Text>
              <Text>Ngày tạo: {Moment(serviceInfo.createdDate).format('DD/MM/YYYY HH:mm')}</Text>
              <Text>Ghi chú dịch vụ: {serviceInfo.note}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="Phụ tùng bảo dưỡng" left={(props) => <MaterialIcons {...props} name="build" />} />
        <Card.Content>
          {request.responseMaintenanceInformation?.responseMaintenanceSparePartInfos.map((sparePartInfo) => (
            <View key={sparePartInfo.maintenanceSparePartInfoId} style={styles.item}>
              <Text>Tên phụ tùng: {sparePartInfo.maintenanceSparePartInfoName}</Text>
              <Text>Số lượng: {sparePartInfo.quantity} cái</Text>
              <Text>Giảm giá: {sparePartInfo.discount}</Text>
              <Text>Chi phí thực tế: {formatCurrency(sparePartInfo.actualCost)}</Text>
              <Text>Tổng chi phí: {formatCurrency(sparePartInfo.totalCost)}</Text>
              <Text>Ngày tạo: {Moment(sparePartInfo.createdDate).format('DD/MM/YYYY HH:mm')}</Text>
              <Text>Ghi chú phụ tùng: {sparePartInfo.note}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="Lịch sử bảo dưỡng" left={(props) => <MaterialIcons {...props} name="history" />} />
        <Card.Content>
          {request.responseMaintenanceInformation?.responseMaintenanceHistoryStatuses.map((historyStatus) => (
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

export default MaintenanceInfoTab;
