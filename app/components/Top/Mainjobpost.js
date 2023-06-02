import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Mainjobpost({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          backgroundColor: "green",
          padding: 15,
          borderRadius: 15,
          marginBottom: 20,
        }}
        onPress={() => navigation.navigate("Goveee")}
      >
        <Text style={{ color: "white" }}>Post a Job</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "red", padding: 15, borderRadius: 15 }}
        onPress={() => navigation.navigate("Dletejob")}
      >
        <Text style={{ color: "white" }}>Delete a Job</Text>
      </TouchableOpacity>
    </View>
  );
}
