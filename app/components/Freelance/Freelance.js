//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Coming from "../../Lottie/Comingsoon";

// create a component
export default function Freelance() {
  return (
    <View style={{ flex: 1, backgroundColor: "#eefbff" }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 22,
          fontWeight: "500",
          marginTop: 10,
          borderBottomColor: "#d9d9d9",
          borderBottomWidth: 0.5,
        }}
      >
        Freelance
      </Text>
      {/* <Text>we are working on MESSAGES feature</Text> */}
      <Coming />
      {/* <Rentalposternotification /> */}
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
