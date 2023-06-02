import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
export default function NextButton({ scrollTo, lastitem }) {
  const { height } = useWindowDimensions();
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  console.log("center", center);
  const radius = size / 2 - strokeWidth / 2;
  console.log("radius", radius);
  const circumference = 2 * Math.PI * radius;
  const cirucum = Math.round(circumference);
  console.log("circumference", Math.round(circumference));
  console.log(lastitem);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        top: -40,
        // backgroundColor: "blue",
      }}
    >
      <TouchableOpacity
        onPress={scrollTo}
        style={Styles.button}
        activeOpacity={0.6}
      >
        <AntDesign name="arrowright" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  button: {
    position: "absolute",
    borderColor: "#aee9f7",
    borderWidth: 20,
    backgroundColor: "#1e5966",
    borderRadius: 100,
    padding: 20,
  },
});
