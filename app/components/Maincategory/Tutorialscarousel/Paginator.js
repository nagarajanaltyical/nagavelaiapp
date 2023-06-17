import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from "react-native";
import React from "react";

export default function Paginator({ data, scrollx }) {
  const { width } = useWindowDimensions();
  const { height } = useWindowDimensions();
  console.log(width);
  return (
    <View
      style={{
        flexDirection: "row",
        height: 2,
        // backgroundColor: "red",
        position: "absolute",
        top: Math.round(height) - 160,
        left: width / 2.6,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {data.map((_, i) => {
        const inputRenage = [(i - 1) * width, i * width, (i + 1) * width];
        const dotwidth = scrollx.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: [10, 20, 10],
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const opacity = scrollx.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: [0.3, 1, 0.3],
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          //   <Text></Text>
          <Animated.View
            style={[styles.dot, { width: dotwidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: 10,
    position: "relative",
    borderRadius: 5,
    // backgroundColor: "blue",
    backgroundColor: "#1e5966",
    marginHorizontal: 7,
  },
});
