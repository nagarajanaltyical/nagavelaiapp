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
      <Text
        style={{
          fontSize: 30,
          fontWeight: "800",
          position: "relative",
          width: "100%",
          marginLeft: 100,
          marginTop: 150,
          fontFamily: "monospace",
        }}
      >
        Loading...
      </Text>
      <View style={{ position: "absolute" }}>
        <LottieView
          ref={animation}
          style={{
            width: 400,
            // height: 400,
            height: 400,
            marginTop: 50,
            // position: "absolute",
            // justifyContent: "center",
            // alignContent: "center",
            // alignItems: "center",
          }}
          source={require("./loading.json")}
        />
      </View>

      {/* <View style={{ position: "relative" }}> */}

      {/* </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  animationContainer: {
    height: "100%",
    width: "100%",
    marginTop: 50,
    display: "flex",
    flex: 1,
  },
});
