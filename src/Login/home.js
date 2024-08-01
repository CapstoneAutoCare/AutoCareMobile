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
  Linking,
} from "react-native";
import QRCodeScanner from "../components/QRCodeScanner";
export default Home = () => {
  return (
    <SafeAreaView
      style={{ width: "100%", height: "100%", marginTop: 50 }}
    >
      <View style={styles.center}>
        <Text style={{ color: "red" }}>home</Text>
      </View>
      <QRCodeScanner />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
});