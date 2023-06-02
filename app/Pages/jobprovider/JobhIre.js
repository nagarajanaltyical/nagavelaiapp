import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  TextInput,
  Image,
  Search,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import {
  MaterialCommunityIcons,
  FontAwesome,
  SimpleLineIcons,
  EvilIcons,
  Entypo,
} from "@expo/vector-icons";
// import Comingsoon from "../../components/Comingsoon.json";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Top from "../../components/Topcontainer";
import Coming from "../../Lottie/Comingsoon";
import Nodata from "../../Lottie/Nodata";
import { Value } from "react-native-reanimated";

// create a component
function Hire() {
  const [search, setSearch] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#eefbff" }}>
      {/* <Top /> */}
      {/* tob bar */}
      {/* center */}
      {/* <LinearGradient
        colors={["#fafafa", "#fafafa"]}
        style={{ flex: 1, backgroundColor: "#F2F2F2" }}
      > */}
      <View style={{}}>
        <View
          style={{
            //   justifyContent: "center",
            //   alignContent: "center",
            // marginVertical: 15,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 22 }}>For You </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "75%",
              height: 35,
              borderWidth: 0.5,
              // paddingLeft: 20,
              // margin: 5,

              justifyContent: "space-evenly",
              flexDirection: "row",
              borderRadius: 20,
              // marginLeft: 200,
              borderColor: "#d9d9d9",
              backgroundColor: "#fff",
              marginHorizontal: 55,
              marginVertical: 20,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                // marginRight: 30,
              }}
            >
              <EvilIcons name="search" size={22} color="#707070" />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Search"
                // onChangeText={onChangeText}
                // value={Value}
                style={{ marginLeft: 10, width: "75%" }}
              />
              <View
                style={{
                  // marginTop: 5,
                  marginLeft: 5,
                }}
              >
                {/* <FontAwesome name="microphone" size={22} color="#707070" /> */}
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginTop: "80%" }}>
        <Coming />
      </View>
      {/* <View
        style={{
          marginHorizontal: 10,
          backgroundColor: "#F2F2F2",
          borderRadius: 10,
          height: "25%",
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
            Andriya
          </Text>
          <LinearGradient
            colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
            style={{
              height: 35,
              width: 100,
              marginLeft: 80,
              borderRadius: 10,
              marginTop: 7,
              justifyContent: "center",
              alignItems: "center",
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            useAngle={45}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 12,
                fontWeight: "400",
                marginHorizontal: 10,
                justifyContent: "center",
              }}
            >
              Profile: 100%
            </Text>
          </LinearGradient>
          <View
            style={{
              width: 50,
              marginTop: 5,
              //   position: "absolute",
            }}
          >
            <Image
              source={{
                uri: "https://images.pexels.com/photos/442559/pexels-photo-442559.jpeg?auto=compress&cs=tinysrgb&w=600",
              }}
              style={{
                backgroundColor: "purple",
                width: 46,
                height: 46,
                //   marginTop: 3,
                borderRadius: 110,
                resizeMode: "cover",
                // borderColor: "#f6ab03",
                // borderWidth: 1,
              }}
            />
          </View>
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
          Software Developer
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
              <Entypo name="graduation-cap" size={24} color="black" />
              <Text
                style={{
                  // marginTop: 3,

                  marginLeft: 10,
                  fontSize: 13,
                  fontWeight: "400",
                }}
              >
                B.Tech
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
              <SimpleLineIcons name="badge" size={24} color="black" />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 13,
                  fontWeight: "400",
                }}
              >
                2018-2021
              </Text>
            </View>
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
              <FontAwesome name="suitcase" size={24} color="black" />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 13,
                  fontWeight: "400",
                }}
              >
                Fresher
              </Text>
            </View>
          </View>
        </View>
      </View> */}
    </View>
  );
}

export default Hire;
