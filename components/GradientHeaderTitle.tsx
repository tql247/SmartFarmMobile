import * as React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientHeaderTitle() {
  return (
    // <Image
    //     style={{ width: '110%', height: 65, margin: -20, marginTop: -22}}
    //     source={require('../assets/images/header.png')}
    // />
    <LinearGradient
      colors={["#ff7e5f", "#feb47b"]}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 1,
        y: 1,
      }}
      style={styles.box}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  box: {
    width: "100%",
    height: "100%",
  },
});
