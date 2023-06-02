//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Top from "../components/Topcontainer";
import { Ionicons } from "@expo/vector-icons";
import {
  MaterialCommunityIcons,
  FontAwesome,
  SimpleLineIcons,
  EvilIcons,
} from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// create a component
function Caditatesearch() {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <Top />
      <View
        style={{
          width: 280,
          height: 35,
          borderWidth: 1,
          // paddingLeft: 20,
          // margin: 5,

          justifyContent: "space-evenly",
          flexDirection: "row",
          borderRadius: 20,
          // marginLeft: 200,
          borderColor: "#707070",
          backgroundColor: "#fffff",
          marginHorizontal: 55,
          marginVertical: 15,
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <EvilIcons name="search" size={24} color="#707070" />
        </View>
        <TextInput
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search here"
          style={{ marginLeft: 10 }}
        />
        <View
          style={{
            marginLeft: 130,
            marginTop: 5,
          }}
        >
          <FontAwesome name="microphone" size={24} color="#707070" />
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 10,
          backgroundColor: "#F2F2F2",
          borderRadius: 10,
          height: "20%",
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.2,
          shadowRadius: 5.62,
          elevation: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: "#333",
              fontSize: 18,
              fontWeight: "500",
              marginTop: 10,
            }}
          >
            Painter
          </Text>
          <FontAwesome name="share-alt" size={34} color="#333" />
        </View>

        <Text
          style={{
            color: "#333",
            fontSize: 14,
            fontWeight: "400",
            marginTop: 10,

            marginHorizontal: 10,
          }}
        >
          Zeal Zoft Pvt Ltd
        </Text>

        <View
          style={{
            flexDirection: "row",
            width: "57%",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              width: 150,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                alignContent: "center",
              }}
            >
              <FontAwesome name="rupee" size={22} color="#333" />
              <Text
                style={{
                  // marginTop: 3,

                  marginLeft: 10,
                  fontSize: 13,
                  fontWeight: "400",
                }}
              >
                Rs.1000/day
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                width: 150,
                alignContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="timer-sand"
                size={24}
                color="#333"
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 13,
                  fontWeight: "400",
                }}
              >
                5 Days
              </Text>
            </View>
            {/* <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                width: 150,
                alignContent: "center",
              }}
            >
              <SimpleLineIcons name="graduation" size={24} color="#333" />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 13,
                  fontWeight: "400",
                }}
              >
                Non-Mandatory
              </Text>
            </View> */}
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              marginLeft: 3,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                width: 180,
                alignContent: "center",
              }}
            >
              <Ionicons name="location-outline" size={24} color="#333" />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 13,
                  fontWeight: "400",
                }}
              >
                Adyar, Chennai
              </Text>
            </View>
            <View
              style={{
                alignContent: "center",

                flexDirection: "row",
                marginBottom: 10,
                width: 180,
              }}
            >
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={22}
                color="#333"
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 13,
                  fontWeight: "400",
                }}
              >
                2.5 Km
              </Text>
            </View>
            {/* <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                width: 180,
                marginBottom: 10,
              }}
            >
              <MaterialCommunityIcons
                name="bag-personal-outline"
                size={20}
                color="#333"
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 13,
                  fontWeight: "400",
                }}
              >
                Fresher
              </Text>
            </View> */}
          </View>
        </View>
      </View>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default Caditatesearch;
