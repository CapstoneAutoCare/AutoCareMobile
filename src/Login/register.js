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
    StyleSheet,
    Modal, Button
} from 'react-native';
export default Register = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
            <Text style={{ fontSize: 30, marginTop: '10%', textAlign: 'center', color: 'red' }}>AUTO CARE</Text>
            <View style={{ width: '100%' }}>
                <View style={{ padding: 20 }}>
                    <Text style={styles.text}>Số điện thoại</Text>
                    <View style={{ flexDirection: 'row', marginRight: 40 }}>
                        <TextInput style={styles.textCode} placeholder="+84"></TextInput>
                        <TextInput style={styles.textInput} placeholder="Nhập số điện thoại của bạn"></TextInput>
                    </View>
                    <Text style={styles.text}>Mật khẩu</Text>
                    <TextInput style={styles.textInput} placeholder="Nhập mật khẩu của bạn"></TextInput>
                </View>
            </View>

            <View style={{ paddingLeft: 20 }}>
                <Text style={{ fontSize: 15 }}>Tạo mật khâu thoả mãn</Text>
                <Text>- Chứa ít nhất 8 kí tự</Text>
                <Text>- Chứa cả chữ thường (a-z) và chữ hoa (A-Z)</Text>
                <Text>- Chứa ít nhất một số (0-9)</Text>
                <Text>- Chứa ít nhất một kí tự (@#:#"..)</Text>
            </View>
            <View style={{ width: '100%' }}>
                <TouchableOpacity style={styles.button}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
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
                            <Text style={styles.modalText}>Hello, I am a modal!</Text>
                            <Button
                                title="Hide Modal"
                                onPress={() => setModalVisible(!modalVisible)}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    textInput: {
        marginBottom: 15,
        backgroundColor: 'grey',
        borderRadius: 10,
        padding: 10,
        width: '100%'
    },
    textCode: {
        marginBottom: 15,
        backgroundColor: 'grey',
        borderRadius: 10,
        padding: 10,
        marginRight: 5
    },
    text: {
        marginBottom: 10,
        fontSize: 20,
    },
    button: {
        margin: 20,
        backgroundColor: 'red',
        height: 50,
        borderRadius: 10,
        border: 'none',
        paddingTop: 10
    }, container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
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
});