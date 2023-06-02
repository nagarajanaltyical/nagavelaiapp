import React from "react";
import { Button, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
export default function Nodata(paras) {
  const animation = React.useRef(null);

  React.useEffect(() => {
    animation.current?.play();
  }, []);
  return (
    <View style={styles.animationContainer}>
      <LottieView
        ref={animation}
        style={{
          width: 300,
          height: 400,
          backgroundColor: "#eefbff",
        }}
        source={require("./nodata.json")}
        // OR find more Lottie files @ https://lottiefiles.com/featured
        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
      />
      <View style={styles.buttonContainer}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#eefbff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
