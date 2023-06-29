import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
export default function LottieViewloadingmodal(paras) {
  const animation = React.useRef(null);

  React.useEffect(() => {
    animation.current?.play();
  }, []);
  return (
    <View style={styles.animationContainer}>
      <Text
        style={{
          fontSize: 10,
          fontWeight: "800",
          width: "100%",
          fontFamily: "monospace",
        }}
      >
        Uploading...
      </Text>
      <LottieView
        ref={animation}
        style={{
          width: 100,
          height: 100,
          // backgroundColor: "#eefbff",
        }}
        source={require("./loading.json")}
        // OR find more Lottie files @ https://lottiefiles.com/featured
        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
      />
    </View>
  );
}
const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    flex: 1,
  },
});
