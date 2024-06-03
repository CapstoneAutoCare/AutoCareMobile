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
    StyleSheet, Button
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
const data = [
    { key: '1', value: 'Bình Thạnh', },
    { key: '2', value: 'Phú Nhuận' },
]
const data2 = [
    { key: '1', value: 'Phường 1', },
    { key: '2', value: 'Phường 2' },
]

export default About = () => {
    const [selected, setSelected] = React.useState("");
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
                            <Button title="Đặt chỗ" />
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
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    select: {
        margin: 10,
        color: 'white',

    }
})