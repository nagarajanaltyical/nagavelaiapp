//import liraries
import React, { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";

import { EvilIcons, FontAwesome } from "@expo/vector-icons";

// create a component
function Rentalstatus() {
  const [search, setSearch] = useState("");

  return (
    <>
      {/* <Top /> */}
      {/* tob bar */}
      {/* center */}
      {/* <LinearGradient
        colors={["#fafafa", "#fafafa"]}
        style={{ flex: 1, backgroundColor: "#F2F2F2" }}
      > */}
      <View
        style={{
          //   justifyContent: "center",
          //   alignContent: "center",
          marginVertical: 15,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 20 }}>Status</Text>
      </View>
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
      <View style={{ flex: 1 }}>
        <View
          style={{
            marginHorizontal: 10,
            marginBottom: 7,
            backgroundColor: "#F2F2F2",
            borderRadius: 10,
            height: "40%",
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
            <View
              style={{
                marginTop: 5,
                //   position: "absolute",
              }}
            >
              <Image
                source={{
                  uri: "https://rukminim1.flixcart.com/image/416/416/kfoapow0/power-drill/u/w/t/10mm-powerful-drill-machine-for-wall-metal-wood-drilling-with-original-imafw28heg8k5kha.jpeg?q=70",
                }}
                style={{
                  backgroundColor: "purple",
                  width: 140,
                  height: 80,
                  //   marginTop: 3,
                  borderRadius: 7,
                  borderColor: "#E5C07B",
                  borderWidth: 2,
                  resizeMode: "cover",

                  // borderColor: "#f6ab03",
                  // borderWidth: 1,
                }}
              />
            </View>
            <Text
              style={{
                color: "#333",
                fontSize: 18,
                fontWeight: "500",
                marginTop: 10,
              }}
            >
              Drilling Machine
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              width: "57%",
              marginHorizontal: 10,
              marginTop: 10,
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
              . Product received
            </Text>
            <Text
              style={{
                color: "#333",
                fontSize: 18,
                fontWeight: "500",
                marginTop: 10,
              }}
            >
              . Product rejected
            </Text>
            <Text
              style={{
                color: "#333",
                fontSize: 18,
                fontWeight: "500",
                marginTop: 10,
              }}
            >
              . Not decided
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

export default Rentalstatus;
