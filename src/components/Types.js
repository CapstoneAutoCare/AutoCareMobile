import { StyleSheet, Text, View ,ScrollView,Image} from 'react-native'
import React from 'react'

const Types = ({ types }) => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {types.map((item, index) => (
          <View style={{ margin: 10 }} key={index}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
            <Text style={{ marginTop: 6, textAlign: "center" }}>
              {item.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Types;

const styles = StyleSheet.create({})