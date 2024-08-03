import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorComponent = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>Error: {message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default ErrorComponent;
