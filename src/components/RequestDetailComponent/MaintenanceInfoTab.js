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

  // Nếu không có profile từ route params, lấy từ Redux store
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

  if (error) return <ErrorComponent message={error} />;
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Thông tin bảo dưỡng" left={(props) => <MaterialIcons {...props} name="build" />} />
        <Card.Content>
          <Text style={styles.label}>Tên bảo dưỡng: {request.responseMaintenanceInformation?.informationMaintenanceName}</Text>
          <Text style={styles.label}>Ngày tạo bảo dưỡng: {Moment(request.responseMaintenanceInformation?.createdDate).format('DD/MM/YYYY HH:mm')}</Text>
          <Text style={styles.label}>Ngày hoàn thành: {Moment(request.responseMaintenanceInformation?.finishedDate).format('DD/MM/YYYY HH:mm')}</Text>
          <Text style={styles.label}>Tổng giá: {request.responseMaintenanceInformation?.totalPrice}</Text>
          <Text style={styles.label}>Ghi chú bảo dưỡng: {request.responseMaintenanceInformation?.note}</Text>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="Dịch vụ bảo dưỡng" left={(props) => <MaterialIcons {...props} name="build" />} />
        <Card.Content>
          {request.responseMaintenanceInformation?.responseMaintenanceServiceInfos.map((serviceInfo) => (
            <View key={serviceInfo.maintenanceServiceInfoId} style={styles.item}>
              <Text>Tên dịch vụ: {serviceInfo.maintenanceServiceInfoName}</Text>
              <Text>Số lượng: {serviceInfo.quantity}</Text>
              <Text>Giảm giá: {serviceInfo.discount}</Text>
              <Text>Chi phí thực tế: {serviceInfo.actualCost}</Text>
              <Text>Tổng chi phí: {serviceInfo.totalCost}</Text>
              <Text>Ngày tạo: {Moment(serviceInfo.createdDate).format('DD/MM/YYYY HH:mm')}</Text>
              <Text>Trạng thái: {serviceInfo.status}</Text>
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
              <Text>Số lượng: {sparePartInfo.quantity}</Text>
              <Text>Giảm giá: {sparePartInfo.discount}</Text>
              <Text>Chi phí thực tế: {sparePartInfo.actualCost}</Text>
              <Text>Tổng chi phí: {sparePartInfo.totalCost}</Text>
              <Text>Ngày tạo: {Moment(sparePartInfo.createdDate).format('DD/MM/YYYY HH:mm')}</Text>
              <Text>Trạng thái: {sparePartInfo.status}</Text>
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
              <Text>Trạng thái: {historyStatus.status}</Text>
              <Text>Ngày giờ: {Moment(historyStatus.dateTime).format('DD/MM/YYYY HH:mm')}</Text>
              <Text>Ghi chú: {historyStatus.note}</Text>
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
