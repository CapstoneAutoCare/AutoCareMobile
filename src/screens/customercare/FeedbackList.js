import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Pressable, ActivityIndicator, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { fetchFeedbacks } from "../../app/CusCare/feedbackSlice";
import { useNavigation } from '@react-navigation/native';
import { getProfile } from "../../features/userSlice";

const FeedbackList = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, error, feedbacks } = useSelector(state => state.feedbacks || {});
    const { profile } = useSelector((state) => state.user || {});

    const [filterStatus, setFilterStatus] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);



    const getProfileInfo = async () => {
        await dispatch(getProfile());
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getProfileInfo();
        });
        getProfileInfo();
        return unsubscribe;
    }, [navigation]);
    useEffect(() => {
        if (profile.CentreId) {
            dispatch(fetchFeedbacks(profile.CentreId));
        }
    }, [dispatch, profile.CentreId]);
    const handleRefresh = () => {
        if (profile.CentreId) {
            dispatch(fetchFeedbacks(profile.CentreId));
        }
        getProfileInfo();
    };

    const handleSort = () => {
        setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
    };



    const sortedFeedbacks = feedbacks.sort((a, b) => {
        if (!sortOrder) return 0;
        if (sortOrder === 'newest') {
            return new Date(b.createdDate) - new Date(a.createdDate);
        } else if (sortOrder === 'oldest') {
            return new Date(a.createdDate) - new Date(b.createdDate);
        }
        return 0;
    });

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Error: {error}</Text>;
    if (feedbacks && feedbacks.length === 0) {
        return <Text>Không tồn tại dữ liệu</Text>;
    }

    return (
        <ScrollView style={{ marginTop: 50 }}>
            <View style={{ padding: 12, backgroundColor: "#DDD" }}>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginBottom: 10 }}>
                    <TouchableOpacity onPress={handleSort} style={{ marginHorizontal: 10 }}>
                        <MaterialIcons name="sort" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRefresh}>
                        <MaterialIcons name="refresh" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View>
                    {sortedFeedbacks.length > 0 ? (
                        sortedFeedbacks.map((item, index) => (
                            <Pressable
                                style={{
                                    marginVertical: 12,
                                    backgroundColor: "white",
                                    borderRadius: 7,
                                }}
                                key={index}
                            >
                                <View
                                    style={{
                                        backgroundColor: "#0066b2",
                                        padding: 10,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        borderTopLeftRadius: 7,
                                        borderTopRightRadius: 7,
                                    }}
                                >
                                    <View>
                                        <Text
                                            style={{
                                                color: "white",
                                                fontSize: 15,
                                                fontWeight: "500",
                                            }}
                                        >
                                            Tên khách hàng
                                        </Text>
                                        <Text
                                            style={{
                                                color: "white",
                                                fontSize: 15,
                                                fontWeight: "500",
                                                marginTop: 3,
                                            }}
                                        >
                                            {item?.responseClient.firstName} {item?.responseClient.lastName}
                                        </Text>
                                    </View>

                                    <View>
                                        <Text
                                            style={{
                                                color: "white",
                                                fontSize: 15,
                                                fontWeight: "500",
                                            }}
                                        >
                                            ĐÁNH GIÁ
                                        </Text>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            {Array.from({ length: Math.floor(item?.vote) }, (_, index) => (
                                                <AntDesign key={index} name="star" size={24} color="yellow" />
                                            ))}
                                            {item?.vote % 1 !== 0 && (
                                                <AntDesign name="staro" size={24} color="yellow" />
                                            )}
                                            <Text
                                                style={{
                                                    color: "white",
                                                    fontSize: 15,
                                                    fontWeight: "500",
                                                    marginLeft: 8,
                                                }}
                                            >
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        backgroundColor: "white",
                                        marginHorizontal: 10,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View>
                                        <Text
                                            style={{
                                                marginTop: 10,
                                                fontSize: 14,
                                                fontWeight: "500",
                                                color: "gray",
                                                width: 200,
                                            }}
                                        >
                                            Thời gian phản hồi: {moment(item.createdDate).format('DD/MM/YYYY HH:mm')}
                                        </Text>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ fontSize: 13, fontWeight: "600" }}>
                                                Nội dung phản hồi
                                            </Text>
                                            <Text style={{ fontSize: 15, marginTop: 4 }}>
                                                {item.comment}
                                            </Text>
                                        </View>
                                        <View style={{ marginBottom: 20 }} />
                                    </View>

                                    <View style={{ alignItems: "center" }}>
                                        <Pressable
                                            onPress={() => navigation.navigate('FEEDBACK_DETAIL', { feedbackId: item.id })}
                                            style={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: 16,
                                                backgroundColor: "#F0F8FF",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginTop: 10,
                                            }}
                                        >
                                            <MaterialIcons name="info" size={24} color="black" />
                                        </Pressable>
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                fontSize: 13,
                                                fontWeight: "500",
                                            }}
                                        >
                                            Thông tin chi tiết
                                        </Text>
                                    </View>
                                </View>
                            </Pressable>
                        ))
                    ) : (
                        <Text style={{ textAlign: "center", marginVertical: 20 }}>Không có phản hồi nào</Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default FeedbackList;
