import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { Fontisto } from "@expo/vector-icons";
export default function Happy(paras) {
  const animation = React.useRef(null);

  React.useEffect(() => {
    animation.current?.play();
  }, []);
  return (
    <View style={styles.ovelay}>
      {/* Your Lottie animation */}
      <LottieView
        source={require("./Happy.json")}
        autoPlay
        loop
        style={styles.lottieAnimation}
      />
      {/* Success text */}
      <Text style={styles.successText}>
        <Fontisto name="smiley" size={24} color="black" /> Applied Successfully
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  ovelay: {
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.5)", // change the opacity as needed
    position: "absolute",
    backgroundColor: "#1F4C5B",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  lottieAnimation: {
    width: 500,
    height: 500,
  },
  successText: {
    fontSize: 30,
    fontWeight: "600",
    backgroundColor: "#1F4C5B",
    padding: 10,
    borderRadius: 15,
    color: "52FF0",
    position: "absolute",
  },
});
