import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, Linking } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const QRCodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
        if (data.startsWith("http://") || data.startsWith("https://")) {
          Linking.openURL(data).catch((err) =>
            console.error("Failed to open URL:", err)
          );
        } else {
          alert(`Scanned data is not a valid URL: ${data}`);
        }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {scanned ? (
        <View style={styles.scannedContainer}>
          <Text style={styles.scannedData}>Scanned Data: {scannedData}</Text>
        </View>
      ) : (
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.codeScanner}
          />
        </View>
      )}

      <View style={styles.controls}>
        {scanned ? (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        ) : (
          <Button title={"Stop Scanning"} onPress={() => setScanned(true)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  scannedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  controls: {
    position: "absolute",
    top: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  scannedData: {
    fontSize: 18,
    padding: 10,
    backgroundColor: "white",
  },
  codeScanner: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default QRCodeScanner;
