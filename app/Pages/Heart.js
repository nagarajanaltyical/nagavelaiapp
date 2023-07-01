//import liraries
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Pressable,
  Share,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  TextInput,
  Search,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Top from "../components/Topcontainer";
import { useEffect } from "react";
import { LocalizationContext } from "../../App";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Octicons,
  SimpleLineIcons,
  EvilIcons,
  Entypo,
} from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { Use } from "react-native-svg";
import Top2 from "../components/Topcontainer2";
import LottieViewloading from "../components/Loading";
import Nodata from "../Lottie/Nodata";
//get a item

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

//onshare
//on share
const onShare = async ({
  title,
  sal,
  per,
  time,
  loc,

  short,
  work,
}) => {
  time =
    time == null
      ? ` ${new Date().getDate()} - ${
          new Date().getMonth() + 1
        } - ${new Date().getFullYear()}`
      : `${new Date(time).getDate()} - ${
          new Date(time).getMonth() + 1
        } - ${new Date(time).getFullYear()}`;
  try {
    const result = await Share.share({
      title: "Message from Velai app",
      message: `Job Title:${title}\nSalary:${sal}/${
        short == "True" ? per : "LPA"
      }\nTime:${
        short == "True" ? time : work
      }\nLocation:${loc}\n Message sent from velai app`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

// create a Longtermcomponent
const LongTermCategory = ({
  title,
  sal,
  per,
  time,
  work,
  loc,
  page,
  Dis,
  name,
  props,
  company_name,
  company_name1,
  exp,
  s_admin,
  Openings,
  education,
  logo,
  position,
  company,
  workspace,
  jobtype,
  days_ago,
  pic,
  short,
  longs,
  shortID,
  Id,
  navigation,
}) => {
  console.log("Im props");
  console.log(props);
  return (
    <View
      style={{
        flex: 1,
        width: "98%",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginTop: 3,
        marginHorizontal: 4,
        marginBottom: 3,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          height: "100%",
          width: "98%",
          paddingHorizontal: 7,

          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2.62,
          elevation: 3,
        }}
      >
        <View
          style={{
            // height: 170,
            height: "100%",
            marginLeft: 5,
            flexDirection: "column",
            // marginHorizontal: 30,
          }}
        >
          <View
            style={{ flexDirection: "row", marginBottom: 10, marginTop: 5 }}
          >
            <Text
              style={{
                color: "#333",
                fontSize: 18,
                textAlign: "left",
                fontWeight: "500",
                textAlign: "left",
                marginTop: 10,
                lineHeight: 21,
                width: "85%",
                // backgroundColor: "red",
                // marginHorizontal: 30,
              }}
            >
              {title}
            </Text>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <View
                style={{
                  marginTop: 10,
                  marginLeft: "3%",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    onShare({
                      title,
                      sal,
                      per,
                      time,
                      loc,

                      Dis,
                      name,
                      short,
                      work,
                    })
                  }
                  // style={{ backgroundColor: "red", width: "45%" }}
                >
                  <MaterialCommunityIcons
                    name="share-all-outline"
                    size={22}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>
              {/* <EvilIcons
                  name="heart"
                  size={24}
                  color="black"
                  style={{ marginTop: 10 }}
                />
                <Text
                  style={{ color: "#BDBCBC", fontSize: 10, fontWeight: "400" }}
                >
                  2 days ago
                </Text>{" "}
                */}
            </View>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("longtimeswipe", {
                postid: Id,
                dates: days_ago,
              });
            }}
          >
            <View>
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    // resizeMode="contain"
                    source={require("../images/rupee.png")}
                    style={{ width: 18, height: 18 }}
                  />
                  <Text
                    style={{
                      // marginTop: 3,
                      color: "#535353",
                      fontSize: 13,
                      width: 150,
                      marginLeft: 10,
                      // backgroundColor: "red",
                      fontSize: 14,
                      fontWeight: "400",
                    }}
                  >
                    {sal} {per}
                  </Text>
                </View>
                {/* <View
              style={{
                flexDirection: "row",

                alignItems: "center",
              }}
            >
              <Image
                // resizeMode="contain"
                source={require("../images/history.png")}
                style={{ width: 19, height: 23 }}
              />
              <Text
                style={{
                  // marginTop: 3,
                  color: "#535353",
                  fontSize: 13,
                  fontSize: 14,
                  marginLeft: 10,
                  width: 120,

                  fontWeight: "400",
                }}
              >
                {short == "True" ? time : work}
              </Text>
            </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                  }}
                >
                  <Image
                    // resizeMode="contain"
                    source={require("../images/experience.png")}
                    style={{ width: 19, height: 19 }}
                  />
                  <Text
                    style={{
                      // marginTop: 3,
                      color: "#535353",
                      fontSize: 13,
                      fontSize: 14,
                      width: 210,
                      marginLeft: 10,
                      fontWeight: "400",
                    }}
                  >
                    {exp}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 10,
                    alignContent: "center",
                  }}
                >
                  <Image
                    // resizeMode="contain"
                    source={require("../images/mappin.png")}
                    style={{ width: 19, height: 19 }}
                  />
                  <Text
                    style={{
                      // marginTop: 3,
                      color: "#535353",
                      fontSize: 13,
                      fontSize: 14,
                      width: 150,
                      marginLeft: 10,
                      fontWeight: "400",
                    }}
                  >
                    {loc.split(",")[0]} ,{loc.split(",")[1]} {Dis} km
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 10,
                    alignContent: "center",
                  }}
                >
                  <Image
                    // resizeMode="contain"
                    source={require("../images/college.png")}
                    style={{ width: 19, height: 19 }}
                  />
                  <Text
                    style={{
                      // marginTop: 3,
                      color: "#535353",
                      fontSize: 13,
                      fontSize: 14,
                      marginLeft: 10,
                      fontWeight: "400",
                    }}
                  >
                    {/* Adyar, {loc.split(",")[0]} | {Dis} km */}
                    {education}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    width: 45,
                    height: 45,
                    //   marginTop: 3,

                    borderRadius: 50,
                    shadowColor: "#000000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 5.62,
                    elevation: 8,

                    resizeMode: "cover",
                  }}
                >
                  {s_admin == "True" ? (
                    <Image
                      source={{ uri: logo }}
                      style={{
                        backgroundColor: "#EEFBFF",
                        width: 45,
                        height: 45,
                        //   marginTop: 3,

                        borderRadius: 50,

                        resizeMode: "cover",
                        // borderColor: "#f6ab03",
                        // borderWidth: 1,
                      }}
                    ></Image>
                  ) : !(pic == "") ? (
                    <Image
                      source={{
                        uri: pic,
                      }}
                      style={{
                        backgroundColor: "#EEFBFF",
                        width: 45,
                        height: 45,
                        //   marginTop: 3,

                        borderRadius: 50,

                        resizeMode: "cover",
                        // borderColor: "#f6ab03",
                        // borderWidth: 1,
                      }}
                    />
                  ) : (
                    <Image
                      source={require("../images/account.png")}
                      style={{
                        backgroundColor: "#EEFBFF",
                        width: 45,
                        height: 45,
                        //   marginTop: 3,

                        borderRadius: 50,

                        resizeMode: "cover",
                        // borderColor: "#f6ab03",
                        // borderWidth: 1,
                      }}
                    />
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    width: "65%",
                    paddingLeft: 10,

                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#56909D",
                      fontSize: 15,
                      fontWeight: "500",
                    }}
                  >
                    {/* {s_admin == "False" ? company : name} */}
                    {company_name == null
                      ? name
                      : s_admin == "True"
                      ? company_name1
                      : company_name}
                    {/* {company == null
                      ? name
                      : s_admin == "False"
                      ? company
                      : company}{" "}
                    old CODE */}
                  </Text>
                  <Text
                    style={{
                      color: "#56909D",
                      fontSize: 13,
                      fontWeight: "400",
                      textTransform: "capitalize",
                    }}
                  >
                    {company_name == null
                      ? "owner"
                      : s_admin == "True"
                      ? position
                      : name}
                    {/* {company == null
                      ? "owner"
                      : s_admin == "False"
                      ? position
                      : position} OLD cODE */}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",

                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    // marginTop: 3,
                    color: "#56909D",
                    fontSize: 13,
                    fontSize: 14,

                    marginHorizontal: 2,

                    fontWeight: "400",
                  }}
                >
                  {workspace}
                </Text>

                <Text
                  style={{
                    // marginTop: 3,

                    color: "#56909D",
                    fontSize: 13,
                    fontSize: 14,
                    marginHorizontal: 2,

                    fontWeight: "400",
                  }}
                >
                  |
                </Text>
                <Text
                  style={{
                    // marginTop: 3,

                    color: "#56909D",
                    fontSize: 13,
                    fontSize: 14,
                    marginHorizontal: 2,

                    fontWeight: "400",
                  }}
                >
                  {jobtype}
                </Text>
                <Text
                  style={{
                    // marginTop: 3,

                    color: "#56909D",
                    fontSize: 13,
                    fontSize: 14,
                    marginHorizontal: 2,

                    fontWeight: "400",
                  }}
                >
                  |
                </Text>
                <Text
                  style={{
                    // marginTop: 3,

                    color: "#56909D",
                    fontSize: 13,
                    fontSize: 14,
                    marginHorizontal: 2,
                    width: 100,
                    fontWeight: "400",
                  }}
                >
                  {Openings} Openings
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

// Create
const ShortTermCategory = ({
  title,
  sal,
  work,
  per,
  time,
  pic,
  loc,
  page,
  Dis,
  name,
  short,
  longs,
  shortID,
  days_ago,
  Openings,
  Id,
  navigation,
}) => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginTop: 3,
        marginBottom: 3,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("shorttimeswipe", {
            postid: Id,
            dates: days_ago,
          });
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            height: "100%",
            width: "98%",
            paddingHorizontal: 7,

            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2.62,
            elevation: 3,
          }}
        >
          <View
            style={{
              // height: 170,
              height: "100%",
              marginLeft: 5,
              flexDirection: "column",
              // marginHorizontal: 30,
            }}
          >
            <View
              style={{ flexDirection: "row", marginBottom: 10, marginTop: 5 }}
            >
              <Text
                style={{
                  color: "#333",
                  fontSize: 18,
                  textAlign: "left",
                  fontWeight: "500",
                  textAlign: "left",
                  marginTop: 10,
                  lineHeight: 21,
                  width: "85%",
                  // backgroundColor: "red",
                  // marginHorizontal: 30,
                }}
              >
                {title}
              </Text>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    marginTop: 10,
                    marginLeft: "3%",
                  }}
                >
                  <MaterialCommunityIcons
                    name="share-all-outline"
                    size={22}
                    color="#333"
                  />
                </View>
                {/* <EvilIcons
                  name="heart"
                  size={24}
                  color="black"
                  style={{ marginTop: 10 }}
                />
                <Text
                  style={{ color: "#BDBCBC", fontSize: 10, fontWeight: "400" }}
                >
                  2 days ago
                </Text>{" "}
                */}
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  // resizeMode="contain"
                  source={require("../images/rupee.png")}
                  style={{ width: 18, height: 18 }}
                />
                <Text
                  style={{
                    // marginTop: 3,
                    color: "#535353",
                    fontSize: 13,
                    width: 150,
                    marginLeft: 10,
                    // backgroundColor: "red",
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  {sal} {per}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",

                  alignItems: "center",
                }}
              >
                <Image
                  // resizeMode="contain"
                  source={require("../images/history.png")}
                  style={{ width: 19, height: 23 }}
                />
                <Text
                  style={{
                    // marginTop: 3,
                    color: "#535353",
                    fontSize: 13,
                    fontSize: 14,
                    marginLeft: 10,
                    width: 120,

                    fontWeight: "400",
                  }}
                >
                  {short == "True" ? time : work}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                  alignContent: "center",
                }}
              >
                <Image
                  // resizeMode="contain"
                  source={require("../images/mappin.png")}
                  style={{ width: 19, height: 19 }}
                />
                <Text
                  style={{
                    // marginTop: 3,
                    color: "#535353",
                    fontSize: 13,
                    fontSize: 14,
                    width: 210,
                    marginLeft: 10,
                    fontWeight: "400",
                  }}
                >
                  {loc.split(",")[0]} ,{loc.split(",")[1]} | {Dis} km
                </Text>
              </View>
            </View>

            <View
              style={{
                marginVertical: 10,
                flexDirection: "row",
                width: "100%",
                marginBottom: 15,
              }}
            >
              <View
                style={{
                  width: 45,
                  height: 45,
                  //   marginTop: 3,

                  borderRadius: 50,
                  shadowColor: "#000000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 5.62,
                  elevation: 8,

                  resizeMode: "cover",
                }}
              >
                {!(pic == "") ? (
                  <Image
                    source={{
                      uri: pic,
                    }}
                    style={{
                      backgroundColor: "#EEFBFF",
                      width: 45,
                      height: 45,
                      //   marginTop: 3,

                      borderRadius: 50,

                      resizeMode: "cover",
                      // borderColor: "#f6ab03",
                      // borderWidth: 1,
                    }}
                  />
                ) : (
                  <Image
                    source={require("../images/account.png")}
                    style={{
                      backgroundColor: "#EEFBFF",
                      width: 45,
                      height: 45,
                      //   marginTop: 3,

                      borderRadius: 50,

                      resizeMode: "cover",
                      // borderColor: "#f6ab03",
                      // borderWidth: 1,
                    }}
                  />
                )}
              </View>
              <View
                style={{
                  flexDirection: "column",
                  width: "65%",
                  paddingLeft: 10,

                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: "#56909D", fontSize: 15, fontWeight: "500" }}
                >
                  {name}
                </Text>
                <Text
                  style={{
                    color: "#56909D",
                    fontSize: 13,
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                >
                  Owner
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{
                    // marginTop: 3,

                    color: "#56909D",
                    fontSize: 13,
                    fontSize: 14,

                    fontWeight: "400",
                  }}
                >
                  {Openings} Openings
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const Items = ({
  title,
  sal,
  per,
  time,
  pic,
  loc,
  page,
  Dis,
  logo,
  exp,
  company,
  company_name,
  company_name1,
  position,
  s_admin,
  name,
  short,
  longs,
  shortID,
  workspace,
  days_ago,
  education,
  jobtype,
  Openings,
  work,
  Id,
  navigation,
}) => (
  // <View
  //   style={{
  //     flex: 1,
  //     width: "98%",
  //     height: "100%",
  //     justifyContent: "center",
  //     alignContent: "center",
  //     alignItems: "center",
  //     marginTop: 3,
  //     marginHorizontal: 4,
  //     marginBottom: 3,
  //   }}
  // >
  //   <TouchableWithoutFeedback
  //     onPress={() => {
  //       navigation.navigate("jobseekerswipe", {
  //         post_id: short == "True" ? shortID : longs,
  //         table_name: short == "True" ? "shorttime_job" : "long_job_post",
  //         page: page,
  //       });
  //     }}
  //   >
  //     <View
  //       style={{
  //         backgroundColor: "#fff",
  //         borderRadius: 10,
  //         height: "100%",
  //         width: "98%",
  //         paddingHorizontal: 7,

  //         shadowColor: "#000000",
  //         shadowOffset: {
  //           width: 0,
  //           height: 1,
  //         },
  //         shadowOpacity: 0.2,
  //         shadowRadius: 2.62,
  //         elevation: 3,
  //       }}
  //     >
  //       <View
  //         style={{
  //           // height: 170,
  //           height: "100%",
  //           marginLeft: 5,
  //           flexDirection: "column",
  //           // marginHorizontal: 30,
  //         }}
  //       >
  //         <View
  //           style={{ flexDirection: "row", marginBottom: 10, marginTop: 5 }}
  //         >
  //           <Text
  //             style={{
  //               color: "#333",
  //               fontSize: 18,
  //               textAlign: "left",
  //               fontWeight: "500",
  //               textAlign: "left",
  //               marginTop: 10,
  //               lineHeight: 21,
  //               width: "85%",
  //               // backgroundColor: "red",
  //               // marginHorizontal: 30,
  //             }}
  //           >
  //             {title}
  //           </Text>
  //           <View
  //             style={{
  //               alignItems: "center",
  //             }}
  //           >
  //             <View
  //               style={{
  //                 marginTop: 10,
  //                 marginLeft: "3%",
  //               }}
  //             >
  //               <MaterialCommunityIcons
  //                 name="share-all-outline"
  //                 size={22}
  //                 color="#333"
  //               />
  //             </View>
  //             {/* <EvilIcons
  //               name="heart"
  //               size={24}
  //               color="black"
  //               style={{ marginTop: 10 }}
  //             />
  //             <Text
  //               style={{ color: "#BDBCBC", fontSize: 10, fontWeight: "400" }}
  //             >
  //               2 days ago
  //             </Text> */}
  //           </View>
  //         </View>
  //         <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
  //           <View style={{ flexDirection: "row", alignItems: "center" }}>
  //             <Image
  //               // resizeMode="contain"
  //               source={require("../images/rupee.png")}
  //               style={{ width: 18, height: 18 }}
  //             />
  //             <Text
  //               style={{
  //                 // marginTop: 3,
  //                 color: "#535353",
  //                 fontSize: 13,
  //                 width: 150,
  //                 marginLeft: 10,
  //                 // backgroundColor: "red",
  //                 fontSize: 14,
  //                 fontWeight: "400",
  //               }}
  //             >
  //               {sal} {per}
  //             </Text>
  //           </View>
  //           {/* <View
  //             style={{
  //               flexDirection: "row",

  //               alignItems: "center",
  //             }}
  //           >
  //             <Image
  //               // resizeMode="contain"
  //               source={require("../images/history.png")}
  //               style={{ width: 19, height: 23 }}
  //             />
  //             <Text
  //               style={{
  //                 // marginTop: 3,
  //                 color: "#535353",
  //                 fontSize: 13,
  //                 fontSize: 14,
  //                 marginLeft: 10,
  //                 width: 120,

  //                 fontWeight: "400",
  //               }}
  //             >
  //               {short == "True" ? time : work}
  //             </Text>
  //           </View> */}
  //           <View
  //             style={{
  //               flexDirection: "row",
  //               alignContent: "center",
  //             }}
  //           >
  //             <Image
  //               // resizeMode="contain"
  //               source={require("../images/experience.png")}
  //               style={{ width: 19, height: 19 }}
  //             />
  //             <Text
  //               style={{
  //                 // marginTop: 3,
  //                 color: "#535353",
  //                 fontSize: 13,
  //                 fontSize: 14,
  //                 width: 210,
  //                 marginLeft: 10,
  //                 fontWeight: "400",
  //               }}
  //             >
  //               1-2 Years
  //             </Text>
  //           </View>
  //         </View>
  //         <View style={{ flexDirection: "row", marginVertical: 10 }}>
  //           <View
  //             style={{
  //               flexDirection: "row",
  //               marginVertical: 10,
  //               alignContent: "center",
  //             }}
  //           >
  //             <Image
  //               // resizeMode="contain"
  //               source={require("../images/mappin.png")}
  //               style={{ width: 19, height: 19 }}
  //             />
  //             <Text
  //               style={{
  //                 // marginTop: 3,
  //                 color: "#535353",
  //                 fontSize: 13,
  //                 fontSize: 14,
  //                 width: 150,
  //                 marginLeft: 10,
  //                 fontWeight: "400",
  //               }}
  //             >
  //               Adyar, {loc.split(",")[0]}
  //               {/* | {Dis} km */}
  //             </Text>
  //           </View>
  //           <View
  //             style={{
  //               flexDirection: "row",
  //               marginVertical: 10,
  //               alignContent: "center",
  //             }}
  //           >
  //             <Image
  //               // resizeMode="contain"
  //               source={require("../images/college.png")}
  //               style={{ width: 19, height: 19 }}
  //             />
  //             <Text
  //               style={{
  //                 // marginTop: 3,
  //                 color: "#535353",
  //                 fontSize: 13,
  //                 fontSize: 14,
  //                 marginLeft: 10,
  //                 fontWeight: "400",
  //               }}
  //             >
  //               {/* Adyar, {loc.split(",")[0]} | {Dis} km */}
  //               Any Graduate
  //             </Text>
  //           </View>
  //         </View>

  //         <View
  //           style={{
  //             flexDirection: "row",
  //             width: "100%",
  //             marginBottom: 10,
  //           }}
  //         >
  //           <View
  //             style={{
  //               width: 45,
  //               height: 45,
  //               //   marginTop: 3,

  //               borderRadius: 50,
  //               shadowColor: "#000000",
  //               shadowOffset: {
  //                 width: 0,
  //                 height: 2,
  //               },
  //               shadowOpacity: 0.2,
  //               shadowRadius: 5.62,
  //               elevation: 8,

  //               resizeMode: "cover",
  //             }}
  //           >
  //             <Image
  //               // source={{
  //               //   uri: pic,
  //               // }}
  //               style={{
  //                 backgroundColor: "#EEFBFF",
  //                 width: 45,
  //                 height: 45,
  //                 //   marginTop: 3,

  //                 borderRadius: 50,

  //                 resizeMode: "cover",
  //                 // borderColor: "#f6ab03",
  //                 // borderWidth: 1,
  //               }}
  //             />
  //           </View>
  //           <View
  //             style={{
  //               flexDirection: "column",
  //               width: "65%",
  //               paddingLeft: 10,

  //               justifyContent: "center",
  //             }}
  //           >
  //             <Text
  //               style={{ color: "#56909D", fontSize: 15, fontWeight: "500" }}
  //             >
  //               {name}
  //             </Text>
  //             <Text
  //               style={{
  //                 color: "#56909D",
  //                 fontSize: 13,
  //                 fontWeight: "400",
  //                 textTransform: "capitalize",
  //               }}
  //             >
  //               Owner
  //             </Text>
  //           </View>
  //         </View>
  //         {/* <View
  //           style={{
  //             justifyContent: "flex-end",
  //             alignItems: "center",
  //             flexDirection: "row",
  //             width: "100%",

  //             marginBottom: 15,
  //           }}
  //         >
  //           <Text
  //             style={{
  //               // marginTop: 3,
  //               color: "#56909D",
  //               fontSize: 13,
  //               fontSize: 14,

  //               marginHorizontal: 2,

  //               fontWeight: "400",
  //             }}
  //           >
  //             work from home
  //           </Text>

  //           <Text
  //             style={{
  //               // marginTop: 3,

  //               color: "#56909D",
  //               fontSize: 13,
  //               fontSize: 14,
  //               marginHorizontal: 2,

  //               fontWeight: "400",
  //             }}
  //           >
  //             |
  //           </Text>
  //           <Text
  //             style={{
  //               // marginTop: 3,

  //               color: "#56909D",
  //               fontSize: 13,
  //               fontSize: 14,
  //               marginHorizontal: 2,

  //               fontWeight: "400",
  //             }}
  //           >
  //             Permanent
  //           </Text>
  //           <Text
  //             style={{
  //               // marginTop: 3,

  //               color: "#56909D",
  //               fontSize: 13,
  //               fontSize: 14,
  //               marginHorizontal: 2,

  //               fontWeight: "400",
  //             }}
  //           >
  //             |
  //           </Text>
  //           <Text
  //             style={{
  //               // marginTop: 3,

  //               color: "#56909D",
  //               fontSize: 13,
  //               fontSize: 14,
  //               marginHorizontal: 2,
  //               width: 80,
  //               fontWeight: "400",
  //             }}
  //           >
  //             2 Openings
  //           </Text>
  //         </View> */}
  //       </View>
  //     </View>

  //     {/* <View
  //       style={{
  //         backgroundColor: "#fff",
  //         borderRadius: 10,
  //         height: "100%",
  //         width: "98%",
  //         paddingHorizontal: 7,

  //         shadowColor: "#000000",
  //         shadowOffset: {
  //           width: 0,
  //           height: 1,
  //         },
  //         shadowOpacity: 0.2,
  //         shadowRadius: 2.62,
  //         elevation: 3,
  //       }}
  //     >
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //           marginHorizontal: 10,
  //         }}
  //       >
  //         <Text
  //           style={{
  //             // backgroundColor: "red",
  //             color: "#333",
  //             fontSize: 18,
  //             fontWeight: "500",
  //             width: "80%",
  //             marginTop: 10,
  //             marginLeft: 10,
  //           }}
  //         >
  //           {title}
  //         </Text> */}
  //     {/* <View
  //         style={{
  //           borderRadius: 10,
  //           width: 70,
  //           height: 30,
  //           marginTop: 10,
  //           borderWidth: 1,
  //           borderColor: "#333",
  //           borderRadius: 10,
  //           marginLeft: 70,
  //           flexDirection: "row",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       > */}

  //     {/* <LinearGradient
  //           colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
  //           style={{
  //             borderRadius: 10,
  //             width: 80,
  //             height: 30,
  //             marginTop: 10,

  //             marginLeft: "20%",
  //             flexDirection: "row",
  //             alignContent: "center",
  //             justifyContent: "center",
  //             alignItems: "center",
  //           }}
  //           start={{ x: 0, y: 0 }}
  //           end={{ x: 1, y: 1 }}
  //           useAngle={45}
  //         > */}
  //     {/* <View
  //             style={{
  //               borderTopWidth: 20,
  //               backgroundColor: "red",
  //               borderColor: "red",
  //             }}
  //           > */}
  //     {/* <Octicons name="dot-fill" size={20} color="#fff" /> */}

  //     {/* </View> */}
  //     {/* </View> */}
  //     {/* </LinearGradient> */}
  //     {/* <View
  //           style={{
  //             marginTop: 10,
  //             marginLeft: "3%",
  //           }}
  //         >
  //           <MaterialCommunityIcons
  //             name="share-all-outline"
  //             size={22}
  //             color="#333"
  //           />
  //         </View>
  //       </View>

  //       <Text
  //         style={{
  //           color: "#535353",
  //           fontSize: 14,
  //           fontWeight: "400",
  //           marginTop: 5,
  //           marginBottom: 10,
  //           marginHorizontal: 20,
  //         }}
  //       >
  //         Posted By : {name}
  //       </Text>

  //       <View
  //         style={{
  //           flexDirection: "row",
  //           width: "57%",
  //           marginHorizontal: 10,
  //           marginTop: 10,
  //         }}
  //       >
  //         <View
  //           style={{
  //             flexDirection: "column",
  //             justifyContent: "flex-start",
  //             width: 150,
  //           }}
  //         >
  //           <View
  //             style={{
  //               flexDirection: "row",
  //               marginBottom: 10,
  //               marginLeft: 10,
  //               alignContent: "center",
  //             }}
  //           >
  //             <Image
  //               // resizeMode="contain"
  //               source={require("../images/rupee.png")}
  //               style={{ width: 18, height: 18 }}
  //             />
  //             <Text
  //               style={{
  //                 // marginTop: 3,
  //                 color: "#535353",
  //                 fontSize: 13,
  //                 marginLeft: 10,
  //                 fontSize: 14,
  //                 fontWeight: "400",
  //               }}
  //             >
  //               {sal} {per}
  //             </Text>
  //           </View>
  //           <View
  //             style={{
  //               // backgroundColor: "red",
  //               flexDirection: "row",
  //               marginBottom: 10,
  //               width: 150,
  //               marginLeft: 10,
  //               marginTop: 8,

  //               alignContent: "center",
  //             }}
  //           > */}
  //     {/* <MaterialCommunityIcons
  //               name="calendar-clock"
  //               size={20}
  //               color="#333"
  //             /> */}

  //     {/* <Image
  //               // resizeMode="contain"
  //               source={require("../images/mappin.png")}
  //               style={{ width: 19, height: 19 }}
  //             />
  //             <Text
  //               style={{
  //                 // marginTop: 3,
  //                 color: "#535353",
  //                 fontSize: 13,
  //                 marginLeft: 10,
  //                 fontSize: 14,
  //                 fontWeight: "400",
  //               }}
  //             >
  //               {loc.split(",")[0]} | {Dis} km
  //             </Text>
  //           </View>
  //         </View>
  //         <View
  //           style={{
  //             flexDirection: "column",
  //             justifyContent: "flex-start",
  //             marginLeft: "9%",
  //           }}
  //         >
  //           <View
  //             style={{
  //               flexDirection: "row",
  //               marginBottom: 10,
  //               width: 160,
  //               // backgroundColor: "red",
  //               alignContent: "center",
  //             }}
  //           >
  //             <Image
  //               // resizeMode="contain"
  //               source={require("../images/history.png")}
  //               style={{ width: 19, height: 23 }}
  //             />
  //             <Text
  //               style={{
  //                 // backgroundColor: "red",
  //                 // marginTop: 3,
  //                 color: "#535353",
  //                 fontSize: 13,
  //                 marginLeft: 10,
  //                 width: "70%",
  //                 fontSize: 14,
  //                 fontWeight: "400",
  //               }}
  //             >
  //               {short == "True" ? time : work}
  //             </Text>
  //           </View> */}
  //     {/* <View
  //             style={{
  //               // backgroundColor: "red",
  //               alignContent: "center",
  //               marginTop: 8,
  //               // marginLeft: "8%",
  //               flexDirection: "row",
  //               marginBottom: 10,
  //               width: "80%",
  //             }}
  //           > */}
  //     {/* <MaterialCommunityIcons
  //               name="map-marker-distance"
  //               size={20}
  //               color="#333"
  //             /> */}
  //     {/* <Image
  //               // resizeMode="contain"
  //               source={require("../images/distance.png")}
  //               style={{ width: 20, height: 20 }}
  //             />
  //             <Text
  //               style={{
  //                 // marginTop: 3,
  //                 color: "#535353",
  //                 fontSize: 13,
  //                 marginLeft: 10,
  //                 fontSize: 14,
  //                 fontWeight: "400",
  //               }}
  //             >
  //               {Dis} km
  //             </Text>
  //           </View> */}
  //     {/* </View>
  //       </View>
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           alignContent: "center",

  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Text
  //           style={{
  //             fontSize: 14,
  //             textDecorationLine: "underline",
  //             color: "#56909d",
  //             fontWeight: "600",
  //             ontFamily: "Roboto",
  //             textAlign: "center",
  //           }}
  //         >
  //           {short == "True" ? "Short Term" : "Long Term"}
  //         </Text>
  //       </View>
  //     </View> */}
  //   </TouchableWithoutFeedback>
  // </View>
  <>
    {short == "True" ? (
      <ShortTermCategory
        title={title}
        sal={sal}
        per={per}
        time={time}
        loc={loc}
        page={page}
        Dis={Dis}
        name={name}
        short={short}
        work={work}
        days_ago={days_ago}
        longs={longs}
        shortID={shortID}
        Openings={Openings}
        Id={Id}
        pic={pic}
        navigation={navigation}
      />
    ) : (
      <LongTermCategory
        title={title}
        sal={sal}
        work={work}
        per={per}
        time={time}
        loc={loc}
        page={page}
        Dis={Dis}
        pic={pic}
        name={name}
        short={short}
        exp={exp}
        company_name={company_name}
        company_name1={company_name1}
        position={position}
        company={company}
        logo={logo}
        s_admin={s_admin}
        Openings={Openings}
        education={education}
        days_ago={days_ago}
        workspace={workspace}
        jobtype={jobtype}
        longs={longs}
        shortID={shortID}
        Id={Id}
        navigation={navigation}
      />
    )}
  </>
);
// create a component

const Heart = ({ navigation, route }) => {
  // const [search, setSearch] = useState("");
  const { t, language, setlanguage } = useContext(LocalizationContext);
  const [search, setSearch] = useState("");

  const user_id = useSelector((state) => state.ID);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  useEffect(() => {
    fetchdata();
  }, []);

  function getthedays(paras) {
    const dateoo = `${new Date(paras).getMonth() + 1}/${new Date(
      paras
    ).getDate()}/${new Date(paras).getFullYear()}`;
    console.log(dateoo);
    const dateof = `${
      new Date().getMonth() + 1
    }/${new Date().getDate()}/${new Date().getFullYear()}`;
    console.log(dateof);
    var date1 = new Date(dateoo);
    var date2 = new Date(dateof);
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Difference_In_Days;
  }

  React.useEffect(() => {
    navigation.addListener("tabPress", () => fetchdata());
  }, []);
  const [nodata, setnodata] = useState(false);
  async function fetchdata() {
    try {
      await fetch(`http://192.168.1.16:5000/api/s_l_like_job/${user_id}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setRefreshing(false);
          var newdata = result["liked_job"];
          console.log(newdata);
          if (newdata.length == 0) {
            setnodata(true);
            setloading(false);
          } else {
            setdata(newdata);
            setloading(false);
            setnodata(false);
          }
          // setdata(newdata);
          // setloading(false);
        });
    } catch (error) {
      console.warn(error);
    }
  }
  const handleSearch = (text) => {
    setSearchQuery(text);
  };
  const filteredData = data.filter((item) =>
    item.job_title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (loading && data.length > 0) {
    return (
      <View style={{ backgroundColor: "#eefbff" }}>
        <LottieViewloading />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, width: "100%", backgroundColor: "#eefbff" }}>
      {/* <Top2 /> */}
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: "500",
            marginTop: 10,
          }}
        >
          {t("Saved")} {t("jobs")}
        </Text>
      </View>
      <View style={styles.container}>
        {loading ? (
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <LottieViewloading />
            {/* <Nodata /> */}
            {/* <Image
              style={{
                height: "50%",
                width: "100%",
                resizeMode: "contain",
              }}
              source={require("../../images/jobpost.png")}
            /> */}
            {/* <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                marginTop: "30%",
              }}
            > */}
            {/* <Text
                  style={{ fontSize: 20, fontWeight: "600", color: "#1e5966" }}
                >
                  Don’t have an any post
                </Text> */}
            {/* </View> */}
          </View>
        ) : nodata ? (
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              marginTop: "70%",
            }}
          >
            <Nodata />
            {/* <Image
              style={{
                height: "50%",
                width: "100%",
                resizeMode: "contain",
              }}
              source={require("../../images/jobpost.png")}
            /> */}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                paddingTop: "40%",
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "500", color: "#1e5966" }}
              >
                No data found
              </Text>
            </View>
          </View>
        ) : (
          <SafeAreaView style={styles.container}>
            {refreshing ? <ActivityIndicator /> : null}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "#eefbff",
              }}
            >
              <View
                style={{
                  width: "87%",
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
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    alignItems: "center",
                    // marginRight: 30,
                  }}
                >
                  <EvilIcons name="search" size={22} color="#707070" />

                  <TextInput
                    // underlineColorAndroid="transparent"
                    placeholder={t("search_by_job_title")}
                    onChangeText={handleSearch}
                    value={searchQuery}
                    style={{
                      // marginRight: "15%",
                      marginLeft: 10,
                      width: "75%",

                      fontSize: language == "English" ? 12 : 12,
                    }}
                  />
                  <View
                    style={{
                      // marginLeft: language == "English" ? 130 : 10,
                      // marginTop: 5,
                      marginLeft: 5,
                    }}
                  >
                    {/* <FontAwesome name="microphone" size={22} color="#707070" /> */}
                  </View>
                </View>
              </View>
              <FlatList
                data={filteredData}
                decelerationRate="fast"
                renderItem={({ item }) => (
                  <Items
                    title={item.job_title}
                    sal={item.Salary}
                    per={item.per}
                    time={item.Duration}
                    work={item.time}
                    name={item.username}
                    loc={item.location}
                    page={route.name}
                    company_name={item.companyname}
                    company_name1={item.companyname1}
                    Dis={item.distance}
                    position={item.position}
                    company={item.company}
                    exp={item.experience}
                    workspace={item.workspace}
                    jobtype={item.jobtype}
                    Openings={item.Openings}
                    education={item.Education}
                    logo={item.logo}
                    s_admin={item.s_admin}
                    days_ago={getthedays(item.posteddatetime)}
                    short={item.is_short}
                    longs={item.long_id}
                    shortID={item.short_id}
                    Id={item.id}
                    pic={item.profilepic}
                    navigation={navigation}
                  />
                )}
                keyExtractor={(item) => item.unique_id}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={fetchdata}
                  />
                }
              />
            </View>
          </SafeAreaView>
        )}
        {refreshing ? <ActivityIndicator /> : null}
        {/* <View style={{ height: "8%" }}></View> */}
      </View>
      <View style={{ height: "13.5%" }}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#eefbff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Heart;
