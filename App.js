import { StyleSheet, Text, View } from 'react-native';
import RootComponent from './src/Login/index';
export default function App() {
  return (
    <RootComponent />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
