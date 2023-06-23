import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
export default function LottieViewloading(paras) {
  const animation = React.useRef(null);

  React.useEffect(() => {
    animation.current?.play();
  }, []);
  return (
    <View style={styles.animationContainer}>
      <LottieView
        ref={animation}
        style={{
          width: 400,
          // height: 400,
          height: 400,
          marginTop: 50,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
        source={require("./loading.json")}
      />
      <Text style={{ fontSize: 25, fontFamily: "monospace", marginLeft: -20 }}>
        Loading...
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flex: 1,
  },
});
