import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import RootComponent from './src/Login/index';
import { store } from './src/app/store';
export default function App() {
  return (
    <Provider store={store}>
      <RootComponent />
    </Provider>
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
