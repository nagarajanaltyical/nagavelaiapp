import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Top from "../Topcontainer";
import { useNavigation } from "@react-navigation/native";

// create a component
export default function SelectCategoryform({ route }) {
  const hi = "helllo";

  const navigation = useNavigation();

  const userDetails = route.params.Details;

  const id = route.params.userId;

  return (
    <View style={styles.container}>
      <Top />
      <View
        style={{
          backgroundColor: "#fff1f1",
          flex: 1,
          alignItems: "center",
          marginVertical: 50,
        }}
      >
        <Pressable
          onPress={() =>
            navigation.navigate("JobProvider", {
              userId: id,
              Details: userDetails,
            })
          }
        >
          <LinearGradient
            colors={["#fafafa", "#fafafa"]}
            style={{
              height: 100,
              width: 250,
              backgroundColor: "#FFFFFF",
              marginHorizontal: 5,
              marginVertical: 20,
              justifyContent: "center",
              alignItems: "center",
              // borderWidth: 1,
              // borderColor: "#A3A3A3",
              borderRadius: 38,
              backgroundColor: "#63eec9",
              alignContent: "center",
              position: "relative",
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.2,
              shadowRadius: 15.62,
              elevation: 18,
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../Maincategory/Categoryimage/shortterm.png")}
              style={{ width: 162, height: 65 }}
            />
            <Text
              style={{
                fontSize: 23,
                textAlign: "center",
                color: "#2a180c",
                fontWeight: "600",
              }}
            >
              Short Term form
            </Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("JobProvider", {
              userId: id,
              Details: userDetails,
            })
          }
        >
          <LinearGradient
            colors={["#fafafa", "#fafafa"]}
            style={{
              height: 100,
              width: 250,
              backgroundColor: "#FFFFFF",
              marginHorizontal: 5,
              marginVertical: 20,
              justifyContent: "center",
              alignItems: "center",
              // borderWidth: 1,
              // borderColor: "#A3A3A3",
              borderRadius: 38,
              backgroundColor: "#63eec9",
              alignContent: "center",
              position: "relative",
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.2,
              shadowRadius: 15.62,
              elevation: 18,
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../Maincategory/Categoryimage/LongTerm.png")}
              style={{ width: 162, height: 65 }}
            />

            <Text
              style={{
                fontSize: 23,
                textAlign: "center",
                color: "#2a180c",
                fontWeight: "600",
              }}
            >
              Long term form
            </Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("JobProvider", {
              userId: id,
              Details: userDetails,
            })
          }
        >
          <LinearGradient
            colors={["#fafafa", "#fafafa"]}
            style={{
              height: 100,
              width: 250,
              backgroundColor: "#FFFFFF",
              marginHorizontal: 5,
              marginVertical: 20,
              justifyContent: "center",
              alignItems: "center",
              // borderWidth: 1,
              // borderColor: "#A3A3A3",
              borderRadius: 38,
              backgroundColor: "#63eec9",
              alignContent: "center",
              position: "relative",
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.2,
              shadowRadius: 15.62,
              elevation: 18,
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../Maincategory/Categoryimage/freelancer.png")}
              style={{ width: 162, height: 65 }}
            />

            <Text
              style={{
                fontSize: 23,
                textAlign: "center",
                color: "#2a180c",
                fontWeight: "600",
              }}
            >
              Freelancer from
            </Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("JobProvider", {
              userId: id,
              Details: userDetails,
            })
          }
        >
          <LinearGradient
            colors={["#fafafa", "#fafafa"]}
            style={{
              height: 100,
              width: 250,
              backgroundColor: "#FFFFFF",
              marginHorizontal: 5,
              marginVertical: 20,
              justifyContent: "center",
              alignItems: "center",
              // borderWidth: 1,
              // borderColor: "#A3A3A3",
              borderRadius: 38,
              backgroundColor: "#63eec9",
              alignContent: "center",
              position: "relative",
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.2,
              shadowRadius: 15.62,
              elevation: 18,
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../Maincategory/Categoryimage/Rental.png")}
              style={{ width: 162, height: 65 }}
            />

            <Text
              style={{
                fontSize: 23,
                textAlign: "center",
                color: "#2a180c",
                fontWeight: "600",
              }}
            >
              Rental form
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
});

//make this component available to the app
