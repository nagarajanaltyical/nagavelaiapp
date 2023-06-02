import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useState, useEffect } from "react";
import Ionic from "react-native-vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
export default function BottomTabView(props) {
  const Tab = createMaterialTopTabNavigator();
  const [modalVisible, setModalVisible] = useState(false);
  //BOTTOM TAB

  const [posts, setposts] = useState([]);
  const myData = [];
  const [loading, setloading] = useState(true);

  // to get a Date
  const getDate = (paras) => {
    const date1 = new Date();
    const date2 = new Date(paras);
    var total_seconds = Math.abs(date2 - date1) / 1000;
    var days_difference = Math.floor(total_seconds / (60 * 60 * 24));

    return 10 - days_difference;
  };

  let squares = [];
  // let numberOfSquare = props.length.length;

  for (let index = 0; index < numberOfSquare; index++) {
    squares.push(
      <TouchableHighlight
        activeOpacity={-1}
        underlayColor="transparent"
        // onPress={() => alert(`${props.length[index].job}`)}
      >
        <View key={index}>
          <View
            style={{
              width: 342,
              height: 100,
              marginBottom: 20,
              backgroundColor: "#FFFFFF",
              justifyContent: "space-evenly",
              marginHorizontal: 24,
              borderLeftWidth: 10,
              borderWidth: 1,
              borderColor: "#6BC3FF",
              borderRadius: 10,
              alignContent: "center",
              position: "relative",
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.2,
              shadowRadius: 10.62,
              elevation: 18,
            }}
          >
            <View style={{ marginLeft: 5 }}>
              <View
                style={{
                  width: 130,
                  flexDirection: "row",
                }}
              >
                <FontAwesome5 name="java" size={27} color="black" />
                <Text
                  style={{
                    color: "#4A4242",
                    fontSize: 15,
                    marginLeft: 10,
                    fontWeight: "900",
                  }}
                >
                  {/* {props.length[index].job} */}
                </Text>
              </View>
              <View
                style={{
                  position: "absolute",
                  marginLeft: 290,
                  marginTop: 30,
                  opacity: 0.3,
                }}
              >
                <Fontisto name="angle-dobule-right" size={24} color="#0377EC" />
              </View>
              <Entypo name="location" size={24} color="black" />
              <Text
                style={{
                  color: "#4A4242",
                  fontSize: 14,
                  fontWeight: "500",
                  marginLeft: 30,
                  marginTop: -20,
                }}
              >
                {/* {props.length[index].location} */}
              </Text>
              {/* {props.is_provider == 1 ? (
                getDate(props.length[index].posted_datetime) > 0 ? ( */}
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={24}
                  color="green"
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "green",
                  }}
                >
                  {/* Expires in {getDate(props.length[index].posted_datetime)} */}
                  days
                </Text>
              </View>
              {/* ) : ( */}
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Ionicons name="md-lock-closed" size={24} color="red" />
                <Text style={{ fontSize: 16, fontWeight: "600", color: "red" }}>
                  Expired
                </Text>
              </View>
              {/* )
              ) : null} */}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  const Posts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            flexWrap: "wrap",
            flexDirection: "row",
            paddingVertical: 5,
            justifyContent: "space-between",
          }}
        >
          {squares}
        </View>
      </ScrollView>
    );
  };
  //   const Video = () => {
  //     return (
  //       <ScrollView
  //         showsVerticalScrollIndicator={false}
  //         style={{
  //           width: "100%",
  //           height: "100%",
  //         }}
  //       >
  //         <View
  //           style={{
  //             width: "100%",
  //             height: "100%",
  //             backgroundColor: "white",
  //             flexWrap: "wrap",
  //             flexDirection: "row",
  //             paddingVertical: 5,
  //             justifyContent: "space-between",
  //           }}
  //         >
  //           {squares}
  //         </View>
  //       </ScrollView>
  //     );
  //   };
  const Tags = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            flexWrap: "wrap",
            flexDirection: "row",
            paddingVertical: 5,
            justifyContent: "space-between",
          }}
        >
          {squares}
        </View>
      </ScrollView>
    );
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: "black",
          height: 1.5,
        },
        tabBarIcon: ({ focused, colour }) => {
          let iconName;
          if (route.name === "Posts") {
            iconName = focused ? "ios-apps-sharp" : "ios-apps-sharp";
            colour = focused ? "black" : "gray";
          } else if (route.name === "Video") {
            iconName = focused ? "ios-play-circle" : "ios-play-circle-outline";
            colour = focused ? "black" : "gray";
          } else if (route.name === "Tags") {
            iconName = focused ? "ios-person" : "ios-person-outline";
            colour = focused ? "black" : "gray";
          }
          return <Ionic name={iconName} color={colour} size={22} />;
        },
      })}
    >
      <Tab.Screen name="Posts" component={Posts} />
      {/* <Tab.Screen name="Video" component={Video} /> */}
      <Tab.Screen name="Tags" component={Tags} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    height: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
