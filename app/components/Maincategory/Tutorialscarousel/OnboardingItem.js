import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function OnboardingItem({ item }) {
  const { width } = useWindowDimensions();
  const { height } = useWindowDimensions();
  const Reduxdispatch = useDispatch();
  console.log(height);
  // const imagePath = require(item.image);
  // const imagePath = require(`./${item.image}`);
  console.log(item.image);
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={{
          width: "70%",
          height: "70%",
          margin: 20,
          marginTop: 40,
          //   marginTop: 10,
          marginBottom: 10,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: height - height + 20,
          right: width - width + 20,
        }}
      >
        <TouchableOpacity onPress={() => Reduxdispatch({ type: "Iam_user" })}>
          <Text style={styles.sampleline}>SKIP</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.8,
          // alignItems: "center",
          position: "absolute",
          top: 510,
          width: "80%",
          justifyContent: "center",
        }}
      >
        <Text style={styles.title}>{item.description}</Text>
        {/* <Text style={styles.description}>{item.description}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // marginBottom: 30,
  },
  image: {
    flex: 0.5,
    width: "50%",
    height: "50%",
    justifyContent: "center",
  },
  title: {
    fontWeight: "500",
    fontSize: 20,
    marginBottom: 10,
    lineHeight: 30,
    textAlign: "center",
    color: "#666",
    fontFamily: "Roboto",
  },
  sampleline: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
    color: "#666",
    // backgroundColor: "blue",
    // paddingBottom: 10,
  },
  description: {
    fontWeight: "300",
    fontSize: 20,
    textAlign: "center",
  },
});
