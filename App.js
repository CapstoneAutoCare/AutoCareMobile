import { StyleSheet, LogBox, Text, View } from "react-native";
import { Provider } from "react-redux";
// import RootComponent from './src/Login/index';
import { store } from "./src/app/store";
import AppNavigator from "./src/navigation/AppNavigator";
// import * as Linking from "expo-linking";
import { NavigationContainer } from "@react-navigation/native";
// const prefix = Linking.makeUrl("/");
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
export default function App() {
  const linking = {
    prefixes: ["exp://"],
    config: {
      screens: {
        Home: "home",
      },
    },
  };
  // const url = Linking.useUrl();
  // console.log(url);
  return (
    <Provider store={store}>
      {/* <RootComponent /> */}
      <NavigationContainer linking={linking}>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
