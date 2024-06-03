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
export default Contact = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', margin: 10, backgroundColor: 'grey', borderRadius: 10 }}>
                <View style={{ width: '50%' }}>
                    <Image
                        style={{
                            resizeMode: 'contain',
                            height: 100,
                            width: 200,
                        }}
                        source={require('./images/electric-car.png')}
                    />
                </View>
                <View style={{ padding: 10, width: '50%' }}>
                    <Text>Tên xe:</Text>
                    <Text>Biển số: </Text>
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <Button title="Chi tiet" />
                    </View>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={() => setModalVisible(true)}
                >
                    <Text style={{ fontSize: 15, color: 'black', textAlign: 'center' }}>+ Thêm xe</Text>
                </TouchableOpacity>
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
                            <Text>Hãy cung cấp thêm thông tin</Text>
                            <View style={{}}>
                                <Image
                                    style={{
                                        resizeMode: 'cover',
                                        height: 100,
                                        width: 100,
                                    }}
                                    source={require('./images/electric-car.png')}
                                />
                            </View>
                            <View style={{ width: '100%' }}>
                                <Text>Tên xe</Text>
                                <View style={{ width: '100%' }}>
                                    <TextInput></TextInput>
                                </View>
                                <Text>Biển số xe</Text>
                                <View>
                                    <TextInput></TextInput>

                                </View>

                            </View>
                            <Button
                                title="Add"
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
    button: {
        margin: 20,
        backgroundColor: 'red',
        height: 50,
        borderRadius: 10,
        border: 'none',
        paddingTop: 10
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