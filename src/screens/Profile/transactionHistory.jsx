import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../app/hooks";
import { getProfile } from "../../features/userSlice";
import { useSelector } from "react-redux";
import axiosClient from "../../services/axiosClient";

const TransactionHistoryScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { profile } = useSelector((state) => state.user);
  const [transactions, setTransactions] = useState([]);

  // Fetch transaction history
  const fetchTransactionHistory = async () => {
    try {
      await dispatch(getProfile());
      if (profile?.ClientId) {
        const response = await axiosClient.get(
          `Transactions/GetListByClientRECEIVED?id=${profile.ClientId}`
        );
        setTransactions(response.data);
      }
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchTransactionHistory();
    });
    fetchTransactionHistory();
    return unsubscribe;
  }, [navigation, profile]);
  const formatCurrency = (value) => {
    return !value ? "không tính phí" : value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };
  const translateStatus = (status) => {
    const statusMapping = {
        RECEIVED: "CHUYỂN TIỀN",
        
    };
    return statusMapping[status] || status;
  };
  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.transactionList}>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <View key={index} style={styles.transactionCard}>
              <Text style={styles.transactionTitle}>
                {transaction.title}
              </Text>
              <Text style={styles.transactionItem}>
                <Text style={styles.boldText}>Ngày giao dịch:</Text>{" "}
                {new Date(transaction.transactionDate).toLocaleDateString()}
              </Text>
              <Text style={styles.transactionItem}>
                <Text style={styles.boldText}>Số Tiền:</Text>{" "}
                {formatCurrency(transaction.amount)} 
              </Text>
              <Text style={styles.transactionItem}>
                <Text style={styles.boldText}>Trạng Thái:</Text>{" "}
                {translateStatus(transaction.status)}
              </Text>
              <Text style={styles.transactionItem}>
                <Text style={styles.boldText}>Nội dung:</Text>{" Đăng ký gói "}
                {transaction?.responseMaintenancePlan?.maintenancePlanName} 
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noTransaction}>Không có lịch sử giao dịch</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  header: {
    padding: 20,
    backgroundColor: "#6200ee",
    borderRadius: 8,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  transactionList: {
    flex: 1,
  },
  transactionCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  transactionItem: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  noTransaction: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
});

export default TransactionHistoryScreen;
