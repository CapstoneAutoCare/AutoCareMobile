import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
// import RootComponent from './src/Login/index';
import { store } from './src/app/store';
import AppNavigator from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
    <Provider store={store}>
      {/* <RootComponent /> */}
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
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
