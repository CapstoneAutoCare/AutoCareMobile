import { useEffect, React, useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../features/userSlice";
import { Ionicons } from '@expo/vector-icons';
import axiosClient from '../../services/axiosClient';

const MainScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { profile } = useSelector((state) => state.user);
    const fetchGetProfile = async () => {
        await dispatch(getProfile());
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            fetchGetProfile();
        });
        fetchGetProfile();
        return unsubscribe;
    }, [navigation]);
    const accId = profile?.AccountId;

    const fetchNotifications = async () => {
        try {
            console.log(accId);
            const response = await axiosClient.get(`/Notifications/GetListByAccount?id=${accId}`);
            setNotifications(response.data);
        } catch (error) {
            console.error("Error fetching notifications: ", error);
        }
    };
    const handleNotificationPress = async (notification) => {
        if (!notification.isRead) {
            try {
                // Update the notification as read
                await axiosClient.patch(`/Notifications/UpdateRead?id=${notification.notificationId}`);
                // Update the local state to reflect the read status
                setNotifications((prevNotifications) =>
                    prevNotifications.map((notif) =>
                        notif.notificationId === notification.notificationId ? { ...notif, isRead: true } : notif
                    )
                );
            } catch (error) {
                console.error("Error updating notification: ", error);
            }
        }
        setDropdownVisible(false);
        //navigation.navigate('NotificationDetail', { notificationId: notification.id });
    };





    return (
        <View style={styles.container}>
            <View style={styles.notificationContainer}>
                <Ionicons
                    name="notifications"
                    size={30}
                    color="black"
                    onPress={() => { fetchNotifications(), setDropdownVisible(!dropdownVisible) }}
                />
                {dropdownVisible && (
                    <View style={styles.dropdown}>
                        <FlatList
                            data={notifications}
                            keyExtractor={(item) => item.notificationId.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleNotificationPress(item)}
                                    style={[
                                        styles.notificationItem,
                                        item.isRead ? styles.read : styles.unread
                                    ]}
                                >
                                    <Text style={styles.notificationText}>{item.message}</Text>
                                </TouchableOpacity>
                            )}
                            showsVerticalScrollIndicator={true}
                            style={{
                                flex: 1, overflowY: "auto",
                            }}
                        />
                    </View>
                )}


            </View>

            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.navigate('BookingNavigator')}>
                    <Card style={styles.card}>
                        <ImageBackground source={{ uri: 'https://img.freepik.com/premium-vector/car-auto-garage-concept-premium-logo-design_645012-278.jpg' }} style={styles.image}>
                            <View style={styles.overlay}>
                                <Text style={styles.text}>Xem lịch đặt</Text>
                            </View>
                        </ImageBackground>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('MaintenanceInformations')}>
                    <Card style={styles.card}>
                        <ImageBackground source={{ uri: 'https://img.freepik.com/premium-vector/car-auto-garage-concept-premium-logo-design_645012-278.jpg' }} style={styles.image}>
                            <View style={styles.overlay}>
                                <Text style={styles.text}>Xem thông tin sửa chữa</Text>
                            </View>
                        </ImageBackground>
                    </Card>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.navigate('VEHICLE_NAVIGATOR')}>
                    <Card style={styles.card}>
                        <ImageBackground source={{ uri: 'https://img.freepik.com/premium-vector/car-auto-garage-concept-premium-logo-design_645012-278.jpg' }} style={styles.image}>
                            <View style={styles.overlay}>
                                <Text style={styles.text}>Quản lý xe</Text>
                            </View>
                        </ImageBackground>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('MAINTENANCE_CENTER')}>
                    <Card style={styles.card}>
                        <ImageBackground source={{ uri: 'https://img.freepik.com/premium-vector/car-auto-garage-concept-premium-logo-design_645012-278.jpg' }} style={styles.image}>
                            <View style={styles.overlay}>
                                <Text style={styles.text}>Tìm kiếm trung tâm</Text>
                            </View>
                        </ImageBackground>
                    </Card>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    notificationContainer: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
    },
    dropdown: {
        position: 'absolute',
        top: 40,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 5,
        width: 300,
        height: 220,
        elevation: 5,
    },
    notificationItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    notificationText: {
        fontSize: 16,
    },
    unread: {
        backgroundColor: '#e0e0e0',
        fontWeight: 'bold',
    },
    read: {
        backgroundColor: '#f0f0f0',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    card: {
        width: 180,
        height: 170,
        marginHorizontal: 5,
        elevation: 3,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MainScreen;
