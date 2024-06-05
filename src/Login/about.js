import React, { Component, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Dimensions,
    TextInput,
    Image,
    StyleSheet, Button, Modal
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const data = [
    { key: '1', value: 'Bình Thạnh', },
    { key: '2', value: 'Phú Nhuận' },
]
const data2 = [
    { key: '1', value: 'Phường 1', },
    { key: '2', value: 'Phường 2' },
]
const data3 = [
    { key: '1', value: '8:00', },
    { key: '2', value: '9:00' },
]
const data4 = [
    { key: '1', value: 'Rửa xe', },
    { key: '2', value: 'Thay nhớt' },
]

export default About = () => {
    const [selected, setSelected] = React.useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();
    };

    const getDate = () => {
        let tempDate = date.toString().split(' ');
        return date !== ''
            ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
            : '';
    };
    return (
        <SafeAreaView>
            <View style={{ width: '100%' }}>
                <View style={styles.select}>
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={data}
                        save="value"
                        placeholder="Quận/Huyện"
                    />
                </View>
                <View style={styles.select}>
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={data2}
                        save="value"
                        placeholder="Phường"
                    />
                </View>
                <View style={{ margin: 10, borderRadius: 20 }}>
                    <Button title="Tìm kiếm" />
                </View>
            </View>
            <View>
                <View style={{ flexDirection: 'row', margin: 10, padding: 10, borderColor: 'black', borderBottomWidth: 1, borderTopWidth: 1 }}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontSize: 20 }}>TÂN VÂN LONG</Text>
                        <Text>Hotline : 19006067</Text>
                        <Text>Địa chỉ:</Text>
                        <Text>Giờ làm việc:</Text>
                        <Text>1.5KM</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <View style={{ marginBottom: 5 }}>
                            <Button title="Đặt chỗ" onPress={() => setModalVisible(true)} />
                        </View>
                        <View>
                            <Button title="Xem Feedback" />
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <View style={{ flexDirection: 'row', margin: 10, padding: 10, borderColor: 'black', borderBottomWidth: 1, borderTopWidth: 1 }}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontSize: 20 }}>TÂN VÂN LONG</Text>
                        <Text>Hotline : 19006067</Text>
                        <Text>Địa chỉ:</Text>
                        <Text>Giờ làm việc:</Text>
                        <Text>1.5KM</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <View style={{ marginBottom: 5 }}>
                            <Button title="Đặt chỗ" />
                        </View>
                        <View>
                            <Button title="Xem Feedback" />
                        </View>
                    </View>
                </View>
                <View >
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={{ textAlign: 'center' }}>Đặt lịch</Text>
                                <View style={{}}>
                                    <Image
                                        style={{
                                            resizeMode: 'cover',
                                            height: 100,
                                            width: 100,
                                            marginLeft: 120,
                                        }}
                                        source={require('./images/car-repair.png')}
                                    />
                                </View>
                                <View style={{ width: '100%' }}>
                                    <Text>Ngày</Text>
                                    <View style={styles.container}>
                                        <TextInput
                                            style={styles.textInput}
                                            value={getDate()}
                                            placeholder="Date..."
                                            onPress={showDatePicker} title="Set Date"
                                            showSoftInputOnFocus={false}
                                        />
                                        <DateTimePickerModal
                                            isVisible={isDatePickerVisible}
                                            mode="date"
                                            onConfirm={handleConfirm}
                                            onCancel={hideDatePicker}
                                        />
                                    </View>
                                    <Text>Khung giờ</Text>
                                    <View style={{
                                        backgroundColor: '#C0C0C0',
                                        borderRadius: 10,
                                        marginBottom: 10
                                    }}>
                                        <SelectList
                                            setSelected={(val) => setSelected(val)}
                                            data={data3}
                                            save="value"
                                        />
                                    </View>
                                    <Text>Dịch vụ</Text>
                                    <View style={{
                                        backgroundColor: '#C0C0C0',
                                        borderRadius: 10,
                                        marginBottom: 10
                                    }}>
                                        <SelectList
                                            setSelected={(val) => setSelected(val)}
                                            data={data4}
                                            save="value"
                                        />
                                    </View>
                                </View>
                                <Button
                                    title="Đặt"
                                    onPress={() => setModalVisible(!modalVisible)}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    select: {
        margin: 10,
    },
    textInput: {
        marginBottom: 15,
        backgroundColor: '#C0C0C0',
        borderRadius: 10,
        padding: 10,
        paddingLeft: 20,
        width: '100%'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        shadowColor: "grey",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
})