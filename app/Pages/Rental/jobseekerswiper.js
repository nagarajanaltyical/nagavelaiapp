import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  Share,
  SafeAreaView,
  Dimensions,
  Animated,
  ScrollView,
  SectionList,
  TextInput,
  Pressable,
  ToastAndroid,
} from "react-native";
import MapView from "react-native-maps";

import * as MailComposer from "expo-mail-composer";

import { EvilIcons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import Top from "../../components/Topcontainer";
import { useState, useEffect, useContext, useReducer } from "react";
import { AuthContext } from "../../../App";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
// import { AUthReducer } from "../../Authreducer";
// import { Inital_State } from "../Authreducer";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { LocalizationContext } from "../../../App";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { Transitioning, Transition } from "react-native-reanimated";
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import {
  NavigationRouteContext,
  useNavigation,
} from "@react-navigation/native";
import { isLoading } from "expo-font";
import { useMemo } from "react";
import LottieViewloading from "../../components/Loading";
import LottieViewloadingmodal from "../../components/Loadinmodal";

const { height, width } = Dimensions.get("window");

const stackSize = 4;
const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#FFFFFF",
  black: "#000000",
};

const ANIMATION_DURATION = 200;
const transition = (
  <Transition.Sequence>
    <Transition.Out
      type="slide-bottom"
      durationMs={ANIMATION_DURATION}
      interpolation="easeIn"
    />
    <Transition.Together>
      <Transition.In
        type="fade"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 4}
      />
      <Transition.In
        type="slide-bottom"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 4}
        interpolation="easeOut"
      />
    </Transition.Together>
  </Transition.Sequence>
);
const swiperRef = React.createRef();
const transitionRef = React.createRef();
export default function JobseekerSwiperCard({ route }) {
  const { t, language, setlanguage, userDetails } =
    useContext(LocalizationContext);
  const isdetailsgiven = useSelector((state) => state.user_details_given);
  const userID = useSelector((state) => state.ID);
  const toast = () => {
    //function to make Toast With Duration
    ToastAndroid.show(
      "Location - Our location features are just around the corner",

      ToastAndroid.CENTER
    );
  };
  const share = () => {
    //function to make Toast With Duration
    ToastAndroid.show(
      "Share - Our share features are just around the corner",

      ToastAndroid.CENTER
    );
  };
  // const { getstate } = useContext(AuthContext);

  // const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [index, setIndex] = React.useState(0);

  const navigation = useNavigation();
  // const [state, dispatch] = useReducer(AUthReducer, Inital_State);
  // console.log(state);
  // const memoziedState = useMemo(() => state, [state]);
  const [isliked, setisliked] = useState(false);
  //  const { state, dispatch } = useContext(AuthContext);

  function composeEmail() {
    MailComposer.composeAsync({
      recipients: ["help@velaiapp.com"],
    });
  }
  // console.log(state.userDeatils);
  const [userdetails, setuser] = useState({});
  const [likedpost, setlikedpost] = useState([]);
  const [postId, setpostId] = useState({});
  const [page, setpage] = useState(0);
  const [newcards, setnewcards] = useState([]);
  const [address, setaddress] = useState(null);
  const [loading, setloading] = useState(true);

  const [search, setSearch] = useState("");
  //to set the liked post

  //to get the API && mark liked
  async function fetchdata(paras1, paras2) {
    const body = {};
    data[index].is_short == "True"
      ? (body.s_id = paras2)
      : (body.l_id = paras2);
    body.user_id = paras1;

    try {
      await fetch(
        data[index].is_short == "True"
          ? "http://103.174.10.108:5002/api/s_like_details"
          : "http://103.174.10.108:5002/api/l_like_job",
        {
          method: "post", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(body),
        }
      )
        .then((response) => response.json())
        .then((result) => {});
    } catch (error) {
      console.warn(error);
    }
  }
  //mark applied
  async function setapplied(paras1, paras2) {
    const body = {};
    route.params.table_name === "long_job_post"
      ? (body.l_p_id = paras2)
      : (body.s_p_id = paras2);
    body.user_id = paras1;
    const url1 = "http://103.174.10.108:5002/api/shorttime_apply_job";
    const url2 = "http://103.174.10.108:5002/api/longtime_apply_job";

    try {
      await fetch(route.params.table_name === "long_job_post" ? url2 : url1, {
        method: "post", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {});
    } catch (error) {
      console.warn(error);
    }
  }

  //mark applied

  //getting a user Location takes time so i need to wait so i make a async function
  const getPermission = async () => {
    //we use foreround permission for gettin Permission inside the app
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    //To get the current Location
    let CurrentLocation = await Location.getCurrentPositionAsync({});
    setaddress(CurrentLocation);
  };

  // const checkpost = (paras, Datas) => {
  //   for (let i = 0; i < Datas.length; i++) {
  //
  //
  //
  //
  //     if (Datas[i].post_id == paras) {
  //
  //
  //       return true;
  //     }
  //   }
  //   return false;
  // };
  //To get the applied jobs
  // const getJobs = async () => {
  //   try {
  //     await fetch(`http://192.168.1.20:5000/api/count_apply_job/${userID}`, {
  //       method: "GET",
  //       mode: "cors",
  //       cache: "no-cache",
  //       credentials: "same-origin",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((result) => {
  //         console.log("giveing the applied jobss");
  //         console.log(result);
  //         setpostId(result);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //TO CALUCULAET THE DISTANCE..
  function haversine(lat1, lon1, lat2, lon2) {
    // distance between latitudes
    // and longitudes

    let dLat = ((lat2 - lat1) * Math.PI) / 180.0;
    let dLon = ((lon2 - lon1) * Math.PI) / 180.0;

    // convert to radiansa
    lat1 = (lat1 * Math.PI) / 180.0;
    lat2 = (lat2 * Math.PI) / 180.0;

    // apply formulae
    let a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    let rad = 6371;

    let c = 2 * Math.asin(Math.sqrt(a));

    return (rad * c).toFixed();
  }

  useEffect(() => {
    // getPermission();

    getdata();
    // getJobs();
  }, []);

  useEffect(() => {}, [data, loading]);
  // useEffect(() => {
  //   console.log("im at state");
  //   console.log(state);
  //   setuser(state);
  // }, [state]);

  const getdata = async (paras) => {
    const body = {};
    body.user_id = userID;
    body.post_id = route.params.post_id;
    body.table_name = route.params.table_name;
    // body.page = route.params.page;

    // body.page = 0;
    try {
      await fetch(`http://103.174.10.108:5002/api/like_apply_slideshow`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {
          setData(result["post"]);
          setloading(false);
          //   setpage(page + 1);
        });
    } catch (error) {}
  };

  const getdata1 = async (paras) => {
    const body = {};
    body.page = paras;
    try {
      await fetch("http://103.174.10.108:5002/api/limit/s_like_apply_check/4", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {
          const updated = [...data, ...result["short"]];

          // setnewcards();
          // setData(result["short"]);
          setData(updated);

          setpage(page + 1);
          setloading(false);
        });
    } catch (error) {}
  };

  //post the data
  const postData = async (parameter) => {
    const body = {};
    body.uid = userID;
    body.post_id = parameter;

    try {
      await fetch("http://103.174.10.108:5002/api/apply_job", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => console.log(result));
    } catch (error) {
      console.warn(error);
    }
  };
  const getCOntent = () => {
    return <ActivityIndicator size="larger" />;
  };
  const handleLikeButtonPress = (card) => {
    const newCards = data.map((c) => {
      if (c.id === card.id) {
        fetchdata(userID, card.id);

        return { ...c, liked: c.liked == "true" ? "false" : "true" };
      } else {
        return c;
      }
    });
    setData(newCards);
  };

  // const handlecall = () => {
  //
  //   alert("hiiii");
  //   dispatch({ type: "IS_Deatils_given" });
  // };
  const onSwiped = () => {
    //
    //

    transitionRef.current.animateNextTransition();
    if ((index) => 0) {
      console.log("new page dynamic");

      setIndex(index + 1);
      //
      if (index === 7 * page) {
        getdata1(page);
      }
    } else {
      Alert.alert("please start the at the oppsite direction!");
    }
  };

  const onSwipedRight = () => {
    //
    // console.log(data[index].apply);
    // console.log(data);
    transitionRef.current.animateNextTransition();

    setIndex(index - 1);
    // if (index === 7) {
    //   Alert.alert("hiiiiiiii");
    //   getdata1(page);
    // }
  };
  const onChange2 = () => {
    alert(workspacevalue);
  };
  const Card = ({ card }) => {
    const { state, dispatch } = useContext(AuthContext);

    const handleCallclick = () => {
      if (data[index].isallow_tocall == "1" && isdetailsgiven) {
        Alert.alert(
          `Name: MR/Ms ${data[index].username}\nContact:${data[index].number}(or)\n${data[index].additionalnumber}`
        );
      } else {
        navigation.navigate("Userprofile");
      }
    };
    const handlenavigation = (paras) => {
      if (isdetailsgiven) {
        //
        const newCards = data.map((c) => {
          if (c.id === paras.id) {
            setapplied(userID, card.id);

            return { ...c, apply: "True" };
          } else {
            return c;
          }
        });
        setData(newCards);
      } else {
        navigation.navigate("Userprofile");
      }
    };
    //on share
    const onShare = async ({
      title,
      sal,
      per,
      time,
      loc,
      cou,
      Dis,
      name,
      short,
      work,
    }) => {
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
    return (
      <Animated.ScrollView
        vertical={true}
        horizontal={false}
        decelerationRate="fast"
      >
        <TouchableWithoutFeedback
          hitSlop={{ top: 200, bottom: -1100, left: -1100, right: -1000 }}
        >
          <View style={styles.card}>
            <View style={{ marginTop: "3%" }}>
              <View
                style={{
                  // backgroundColor: "green",
                  // position: "absolute",
                  // marginLeft: "67%",
                  alignItems: "center",
                  // height: "100%",
                  justifyContent: "flex-end",
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                {/* <FontAwesome name="rupee" size={16} color="#000000" />
                {data[index].payment} */}
                {route.params.page === "liked" ? (
                  <TouchableOpacity
                    style={{ paddingHorizontal: "4%" }}
                    onPress={() => {
                      handleLikeButtonPress(data[index]);
                    }}
                  >
                    {data[index].liked == "true" ? (
                      <Ionicons
                        name="ios-heart-sharp"
                        size={22}
                        color="#ff0000"
                      />
                    ) : (
                      <Ionicons
                        name="ios-heart-outline"
                        size={22}
                        color="#333"
                      />
                    )}
                  </TouchableOpacity>
                ) : (
                  ""
                )}
                {/* <Text
                style={{ color: "#000000", fontSize: 15, fontWeight: "600" }}
              >
                <MaterialCommunityIcons
                  name="map-marker-distance"
                  size={24}
                  color="black"
                /> */}
                {/* {t("distance")}: */}
                {/* {address === null ? (
                  <Text>Loading</Text>
                ) : (
                  haversine(
                    address.coords.latitude,
                    address.coords.longitude,
                    data[index].latitude,
                    data[index].longitude
                  )
                )} */}
                {/* KM
              </Text> */}
                {/* <View
                style={{
                  // position: "absolute",
                  // width: "55%",

                  marginTop: "5%",
                  flexDirection: "column",
                  marginLeft: "13%",
                }}
              > */}
                <TouchableOpacity
                  onPress={() => navigation.navigate("messagefake")}
                  style={{ paddingHorizontal: "4%" }}
                >
                  <Ionicons
                    name="ios-chatbox-ellipses-outline"
                    size={22}
                    color="#333"
                  />
                </TouchableOpacity>
                <View style={{ paddingHorizontal: "4%" }}>
                  <TouchableOpacity onPress={share}>
                    <MaterialCommunityIcons
                      name="share-all-outline"
                      size={22}
                      color="#333"
                    />
                  </TouchableOpacity>
                </View>
                {/* <MaterialCommunityIcons
                  name="share-circle"
                  size={22}
                  color="#333"
                /> */}
              </View>
            </View>
            <View
              style={{
                // backgroundColor: "red",
                // position: "absolute",
                alignContent: "center",
                marginHorizontal: 10,
                marginTop: "3%",
                marginLeft: "3%",
                width: "90%",
              }}
            >
              <Text
                style={{
                  color: "#333",
                  fontWeight: "500",
                  textTransform: "capitalize",

                  fontSize: 20,
                  textAlign: "left",
                }}
              >
                {data[index].job_title}
              </Text>
              {/* <Text style={{ color: "#333" }}>
                <SimpleLineIcons
                  name="location-pin"
                  size={24}
                  color="#1da1f2"
                />
                {data[index].location}
              </Text> */}
            </View>
            <View style={{ marginTop: "5%" }}>
              {data[index].pic === null ? (
                <Image
                  source={{
                    uri: "https://images.pexels.com/photos/442559/pexels-photo-442559.jpeg?auto=compress&cs=tinysrgb&w=600",
                  }}
                  style={{
                    height: 250,
                    width: "100%",
                    backgroundColor: "#eefbff",
                    marginTop: 10,
                    // marginBottom: 100,
                    // borderRadius: 5,
                    resizeMode: "contain",
                    position: "relative",
                  }}
                />
              ) : (
                <Image
                  source={{
                    uri: data[index].pic,
                  }}
                  style={{
                    height: 250,
                    width: "100%",
                    backgroundColor: "#eefbff",
                    // marginTop: 10,
                    // marginBottom: 140,
                    // borderRadius: 5,
                    resizeMode: "cover",
                    position: "relative",
                  }}
                />
              )}
            </View>
            <View
              style={{
                // marginTop: "3%",
                // position: "absolute",
                // marginHorizontal: 10,
                // backgroundColor: "red",
                // height: "7%",
                width: "100%",
                // backgroundColor: "green",
                // justifyContent: "center",
                // alignContent: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  // position: "absolute",
                  // backgroundColor: "red",
                  width: "18%",
                  marginLeft: "3%",

                  marginTop: "3%",
                  flexDirection: "column",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // flexDirection: "row",
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textTransform: "capitalize",
                      // width: "22%",
                      // backgroundColor: "blue",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    posted by {/* {t("posted")} */}
                  </Text>
                </View>
                <View
                  style={{
                    // borderRightWidth: 1,
                    // borderRightColor: "#333",
                    // justifyContent: "flex-start",
                    // alignItems: "center",
                    justifyContent: "center",
                    // alignItems: "center",
                    marginTop: "12%",
                    // marginRight: "10%",
                  }}
                >
                  {data[index].profilepic === "" ? (
                    <Image
                      source={{
                        uri: data[index].profilepic,
                      }}
                      style={{
                        backgroundColor: "#eefbff",
                        width: 50,
                        height: 50,
                        // marginTop: 28,

                        borderRadius: 50,
                        resizeMode: "cover",
                      }}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: data[index].profilepic,
                      }}
                      style={{
                        backgroundColor: "#eefbff",
                        width: 50,
                        height: 50,
                        // marginTop: 28,

                        borderRadius: 50,
                        resizeMode: "cover",
                      }}
                    />
                  )}
                </View>
              </View>

              <View
                style={{
                  // position: "absolute",
                  width: "80%",
                  // backgroundColor: "red",
                  marginTop: "12%",

                  flexDirection: "column",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "#333",
                    fontSize: 16,
                    lineHeight: 15,

                    // width: "90%",
                    fontWeight: "500",
                    textTransform: "capitalize",
                  }}
                >
                  {data[index].companyname == null
                    ? data[index].username
                    : data[index].companyname}
                </Text>
                <Text
                  style={{
                    color: "#535353",
                    fontSize: 15,
                    marginTop: "1%",
                    // width: "90%",
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                >
                  {data[index].companyname == null
                    ? `Owner`
                    : `${data[index].username} - ${data[index].designation}`}
                </Text>
              </View>
              {/* <View
                style={{
                  // position: "absolute",
                  // width: "55%",

                  marginTop: "5%",
                  flexDirection: "column",
                  marginLeft: "13%",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("messagefake")}
                >
                  <AntDesign name="message1" size={22} color="#333" />
                </TouchableOpacity>
              </View> */}
              {/* <View
                style={{
                  marginLeft: 70,
                  marginTop: 30,
                  // justifyContent: "space-between",
                  flexDirection: "row",
                  width: 200,
                }}
              > */}
              {/* <View style={{ flexDirection: "column" }}> */}
              {/* <View style={{ flexDirection: "row" }}> */}
              {/* <Text
                  style={{
                    color: "#333",
                    fontSize: 18,
                    width: "90%",
                    fontWeight: "900",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  {data[index].username} 
                </Text> */}

              {/* </View> */}
              {/* <Text> {data[index].job_title}</Text>
              </View> */}
              {/* </View> */}
            </View>
            {/* <LinearGradient
              colors={["#e9eef0", "#e9eef0"]}
              style={{ marginTop: 30 }}
            > */}
            <View style={{ marginTop: "5%" }}>
              <View
                style={{
                  // backgroundColor: "red",
                  // position: "absolute",
                  alignContent: "center",
                  marginHorizontal: 10,
                  marginLeft: "3%",
                  width: "90%",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    textTransform: "capitalize",
                    // width: "22%",
                    // backgroundColor: "blue",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Job Details
                </Text>
              </View>
              <View
                key={data[index].id}
                style={{
                  marginTop: "3%",
                  // backgroundColor: "green",
                  // borderRadius: 10,
                  // marginHorizontal: 9,
                  // width: 150,
                }}
              >
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginTop: "10%",
                    justifyContent: "space-evenly",
                    // width: "57%",
                    // marginLeft: 20,
                  }}
                > */}
                <View
                  style={{
                    borderColor: "#d9d9d9",
                    borderWidth: 1,
                    // marginBottom: 10,
                    marginHorizontal: 9,

                    borderRadius: 15,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      // marginBottom: 10,
                      // width: 150,
                      // backgroundColor: "red",
                      marginLeft: "5%",
                      marginTop: "5%",
                      marginVertical: "2%",
                      width: "90%",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      // resizeMode="contain"
                      source={require("../../images/rupee.png")}
                      style={{ width: 18, height: 18 }}
                    />
                    {/* <FontAwesome name="rupee" size={22} color="#333" /> */}
                    <Text
                      style={{
                        // marginTop: 3,
                        textTransform: "capitalize",
                        color: "#535353",
                        textAlign: "left",
                        marginLeft: "5%",
                        lineHeight: 18,

                        fontSize: 14,
                        fontWeight: "400",
                      }}
                    >
                      {data[index].Salary} {data[index].per}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      // marginBottom: 10,
                      // width: 150,
                      // backgroundColor: "red",
                      marginLeft: "5%",
                      marginVertical: "2%",
                      // marginHorizontal: 14,
                      width: "87%",
                      alignItems: "center",
                    }}
                  >
                    {/* <MaterialCommunityIcons
                      name="timer-sand"
                      size={22}
                      color="#333"
                    /> */}
                    <Image
                      // resizeMode="contain"
                      source={require("../../images/history.png")}
                      style={{ width: 19, height: 19 }}
                    />
                    <Text
                      style={{
                        marginLeft: "5%",
                        fontSize: 14,
                        textAlign: "left",
                        lineHeight: 18,
                        textTransform: "capitalize",
                        color: "#535353",

                        fontWeight: "400",
                      }}
                    >
                      {data[index].Duration}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      marginLeft: "5%",
                      marginVertical: "2%",
                      // marginBottom: 10,
                      // width: 150,
                      // backgroundColor: "red",
                      // marginHorizontal: 14,
                      width: "87%",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      // resizeMode="contain"
                      source={require("../../images/mappin.png")}
                      style={{ width: 18, height: 18 }}
                    />
                    {/* <Ionicons name="location-outline" size={22} color="#333" /> */}
                    <Text
                      style={{
                        marginLeft: "5%",
                        fontSize: 14,
                        textAlign: "left",
                        lineHeight: 18,

                        textTransform: "capitalize",
                        fontWeight: "400",
                        color: "#535353",
                      }}
                    >
                      {data[index].location}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      // backgroundColor: "orange",
                      marginLeft: "5%",
                      marginVertical: "2%",
                      marginBottom: "5%",
                      // marginHorizontal: 9,

                      // marginBottom: 10,
                      width: "87%",
                      // marginHorizontal: 14,
                      // marginVertical: 3,
                      alignContent: "center",
                    }}
                  >
                    {/* <MaterialCommunityIcons
                      name="map-marker-distance"
                      size={22}
                      color="#333"
                    /> */}
                    <Image
                      // resizeMode="contain"
                      source={require("../../images/distance.png")}
                      style={{ width: 20, height: 20 }}
                    />
                    <Text
                      style={{
                        marginLeft: "5%",
                        fontSize: 14,
                        textAlign: "left",
                        lineHeight: 18,

                        fontWeight: "400",
                        color: "#535353",
                      }}
                    >
                      {data[index].distance} km
                    </Text>
                  </View>
                  {data[index].is_short == "False" ? (
                    <View
                      style={{
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        marginLeft: "5%",
                        marginTop: -5,
                        marginVertical: "2%",
                        // marginBottom: 10,
                        // width: 150,
                        // backgroundColor: "red",
                        // marginHorizontal: 14,
                        width: "87%",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        // resizeMode="contain"
                        source={require("../../images/college.png")}
                        style={{ width: 18, height: 18 }}
                      />
                      {/* <Ionicons name="location-outline" size={22} color="#333" /> */}
                      <Text
                        style={{
                          marginLeft: "5%",
                          fontSize: 14,
                          textAlign: "left",
                          lineHeight: 18,

                          textTransform: "capitalize",
                          fontWeight: "400",
                          color: "#535353",
                        }}
                      >
                        {data[index].Education}
                      </Text>
                    </View>
                  ) : (
                    ""
                  )}
                </View>

                <View
                  style={{
                    // backgroundColor: "red",
                    // position: "absolute",
                    alignContent: "center",
                    marginTop: "5%",
                    // marginHorizontal: 10,
                    marginLeft: "3%",
                    width: "90%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      textTransform: "capitalize",
                      // width: "22%",
                      // backgroundColor: "blue",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Job Description
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: "#d9d9d9",
                    borderWidth: 1,
                    // marginBottom: 10,
                    marginHorizontal: 9,
                    marginTop: "3%",
                    borderRadius: 15,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      // marginBottom: 10,
                      // width: 150,
                      // backgroundColor: "red",
                      marginLeft: "5%",
                      marginTop: "3%",
                      marginBottom: "5%",
                      marginVertical: "2%",
                      width: "90%",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: "left",
                        lineHeight: 20,
                        fontWeight: "400",
                        // textTransform: "",
                        color: "#535353",
                      }}
                    >
                      {data[index].job_description == ""
                        ? ""
                        : data[index].job_description[0].toUpperCase() +
                          data[index].job_description.slice(1)}
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: "5%" }}>
                  <Image
                    source={require("../../images/swipeadd.png")}
                    style={{
                      position: "relative",

                      backgroundColor: "#eefbff",
                      width: "95%",
                      marginHorizontal: 9,
                      // marginLeft: "5%",
                      height: 100,
                      borderRadius: 15,
                      resizeMode: "contain",
                    }}
                  />
                  {/* <Text
                    style={{
                      position: "absolute",
                      fontSize: 60,
                      marginTop: 30,
                      marginLeft: 20,
                      color: "#e33442",
                    }}
                  >
                    Tomato
                  </Text> */}
                </View>
                <View
                  style={{
                    marginHorizontal: 9,
                    width: "95%",
                    marginTop: "5%",
                    // alignContent: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() => handleCallclick(data[index])}
                      disabled={data[index].isallow_tocall == "0"}
                    >
                      <LinearGradient
                        colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        useAngle={45}
                        style={{
                          height: 38,
                          width: 160,
                          borderRadius: 10,
                          opacity: data[index].isallow_tocall == "0" ? 0.5 : 1,
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <FontAwesome name="phone" size={22} color="#fff" />
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: "500",
                            marginHorizontal: 10,
                            justifyContent: "center",
                          }}
                        >
                          Call Now
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  {/* <LinearGradient
                      colors={["#6BC3FF", "#1da1f2"]}
                      style={{
                        position: "absolute",
                        backgroundColor: "black",
                        padding: 3,
                        textAlign: "center",
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "400" }}>
                        {data[index].Duration}
                        {data[index].Duration2}
                      </Text>
                    </LinearGradient> */}
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() => {
                        // navigation.navigate("Userprofile");
                        handlenavigation(data[index]);
                      }}
                      disabled={data[index].apply == "True"}
                      // handleLikeButtonPress(data[index]);
                    >
                      <LinearGradient
                        colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        useAngle={45}
                        style={{
                          height: 38,
                          width: 160,
                          borderRadius: 10,

                          opacity: data[index].apply == "True" ? 0.5 : 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: "500",
                          }}
                        >
                          {data[index].apply == "True"
                            ? "Applied"
                            : "Apply Now"}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    // backgroundColor: "red",
                    // backgroundColor: "red",
                    marginTop: "5%",
                    height: 410,
                    marginBottom: "50%",
                    marginHorizontal: 9,
                  }}
                >
                  {/* <Text style={{ fontSize: 16, fontWeight: "700" }}>
                      {t("e_skill")}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        marginTop: 10,
                        color: "#626262",
                        marginHorizontal: 10,
                      }}
                    >
                      {data[index].e_skill_set}
                    </Text> */}
                  {/* <LinearGradient
                      colors={["#6BC3FF", "#1da1f2"]}
                      style={{
                        position: "absolute",
                        marginTop: 100,
                        textAlign: "center",
                        padding: 3,
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "400" }}>
                        Masonry skill
                      </Text>
                    </LinearGradient>
                    <LinearGradient
                      colors={["#6BC3FF", "#1da1f2"]}
                      style={{
                        position: "absolute",
                        marginTop: 100,
                        marginLeft: 120,
                        textAlign: "center",
                        padding: 3,
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "400" }}>
                        Plumbing
                      </Text>
                    </LinearGradient> */}
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                    }}
                  >
                    Location
                  </Text>
                  <TouchableWithoutFeedback onPress={toast}>
                    {/* <Image
                      style={{
                        height: 100,
                        width: "100%",
                        marginTop: "3%",
                        borderRadius: 15,
                        resizeMode: "cover",
                      }}
                      source={require("../../images/map.png")}
                    /> */}
                    <MapView
                      style={{
                        height: 100,
                        width: "100%",
                        marginTop: "3%",
                        resizeMode: "cover",
                        backgroundColor: "#eefbff",
                      }}
                    ></MapView>
                  </TouchableWithoutFeedback>
                  {/* <Image
                      style={{
                        height: 100,
                        width: "90%",
                        marginTop: 10,
                        borderRadius: 10,
                        resizeMode: "cover",
                        marginHorizontal: 20,
                      }}
                      source={require("../components/Maincategory/dataimage/IT.png")}
                    /> */}
                  {/* <Text
                      style={{
                        height: 2,
                        width: 350,
                        backgroundColor: "#727a83",
                        marginTop: 90,
                      }}
                    ></Text> */}
                  <View
                    style={{
                      // backgroundColor: "red",
                      // position: "absolute",
                      marginTop: "5%",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      alignItems: "center",
                      // marginHorizontal: 10,
                      width: "90%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        textTransform: "capitalize",
                        // width: "22%",
                        // backgroundColor: "blue",
                        fontWeight: "500",
                        color: "#333",
                      }}
                    >
                      Disclaimer{" "}
                    </Text>
                    <Text style={{ marginTop: "1%" }}>
                      <MaterialIcons name="report" size={15} color="#e11515" />
                    </Text>
                  </View>
                  <View
                    style={{
                      borderColor: "#d9d9d9",
                      borderWidth: 1,
                      // marginBottom: 10,
                      // marginHorizontal: 9,
                      marginTop: "3%",
                      // width: "99%",

                      borderRadius: 15,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        // marginBottom: 10,
                        marginVertical: "2%",

                        // width: 150,
                        // backgroundColor: "red",
                        marginLeft: "5%",
                        marginTop: "3%",
                        marginBottom: "5%",
                        marginVertical: "2%",
                        // width: "95%",
                        // alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          marginRight: "2%",

                          textAlign: "left",
                          lineHeight: 20,
                          fontWeight: "400",
                          marginBottom: "1%",
                          color: "#535353",
                        }}
                      >
                        - If you experience any misuse or abuse on our job
                        portal app with rental services, please report it to us
                        immediately.
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          marginRight: "2%",

                          textAlign: "left",
                          lineHeight: 20,
                          fontWeight: "400",
                          marginBottom: "1%",
                          color: "#535353",
                        }}
                      >
                        - We take such incidents seriously and will investigate
                        them thoroughly.
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          textAlign: "left",
                          lineHeight: 20,
                          fontWeight: "400",
                          marginRight: "2%",
                          // marginBottom: "1%",

                          // textTransform: "",
                          color: "#535353",
                        }}
                      >
                        - Please note that we reserve the right to take
                        appropriate action against any user found to be engaging
                        in such behavior, including but not limited to
                        suspending or terminating their account.
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => composeEmail()}>
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: "right",
                        fontWeight: "500",
                        marginTop: "2%",
                        marginRight: "4%",
                        textDecorationLine: "underline",
                        color: "#E11515",
                      }}
                    >
                      Ad Report
                      {/* <Octicons name="report" size={15} color="#E11515" /> */}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* <Text style={[styles.text]}>{data[index].des}</Text> */}
              </View>
              {/* </LinearGradient> */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.ScrollView>
    );
  };
  const [swipedAll, setSwipedAll] = useState(false);
  //workspace
  const { handleSubmit, control } = useForm();
  const [workspaceopen, setworkspaceopen] = useState(false);
  const [workspacevalue, setworkspacevalue] = useState(false);
  const [workspace, setworkspace] = useState([
    { label: "Remote", value: "Remote" },
    { label: "offline", value: "offline" },
  ]);
  // useEffect(() => {
  //   fetchdata();
  // }, []);
  // async function fetchdata() {
  //   try {
  //     await fetch("http://192.168.1.20:5000/api/job_title", {
  //       method: "GET", // *GET, POST, PUT, DELETE, etc.
  //       mode: "cors", // no-cors, *cors, same-origin
  //       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //       credentials: "same-origin", // include, *same-origin, omit
  //       headers: {
  //         "Content-Type": "application/json",
  //         // 'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((result) => (console.log(result), setworkspace(result)));
  //   } catch (error) {
  //     console.log("i at job titile error");
  //     console.warn(error);
  //   }
  // }
  const handleOnSwipedAll = () => {
    if (!swipedAll) {
      // setloading(true);
      // getdata1(page);

      // Alert.alert("Thank you!");
      setSwipedAll(true);
      navigation.goBack();
      getdata();
      // Timeout used for show Ripples loader to remove swiper container re-render glitch
    }
  };

  const onCompanyOpen = useCallback(() => {}, []);
  const [userName, setUserName] = useState("");
  if (loading) {
    return (
      <View style={{ height: "100%", backgroundColor: "#eefbff" }}>
        <Text>
          <LottieViewloading />
        </Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      {/* <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 270,
            height: 35,
            borderWidth: 1,
            // paddingLeft: 20,
            // margin: 5,

            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            borderRadius: 20,
            // marginLeft: 200,
            borderColor: "#707070",
            backgroundColor: "#fffff",
            marginVertical: 15,
          }}
        >
          <View
            style={{
              width: "80%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                // width: "60%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <EvilIcons name="search" size={24} color="#707070" />
              <TextInput
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Search here"
                style={{ marginLeft: 10 }}
              />
            </View> */}
      {/* <View
              style={{
                marginLeft: 130,
                marginTop: 5,
              }}
            > */}
      {/* <FontAwesome name="microphone" size={25} color="#707070" /> */}
      {/* </View> */}
      {/* </View>
        </View> */}
      {/* <TouchableOpacity
          onPress={() => navigation.navigate("Shorttimefilter")}
          style={{ marginLeft: 10 }}
        >
          <MaterialIcons name="filter-list" size={30} color="#333" />
        </TouchableOpacity> */}
      {/* </View> */}
      <Swiper
        ref={swiperRef}
        cards={data}
        cardIndex={index}
        renderCard={(card) => <Card card={card} />}
        backgroundColor={"transparent"}
        cardVerticalMargin={1}
        onTapCardDeadZone={5}
        cardHorizontalMargin={4}
        onSwiped={onSwiped}
        disableRightSwipe={index == 0 ? true : false}
        onSwipedRight={onSwipedRight}
        onSwipedAll={handleOnSwipedAll}
        useNativeDriver={true}
        stackSize={stackSize}
        swipeTop={false}
        swipeBottom={false}
        stackScale={10}
        disableTopSwipe={false}
        stackSeparation={1}
        horizontalSwipe={true}
        showSecondCard={false}
        verticalSwipe={false}
        inputOverlayLabelsOpacityRangeX={[0, 150]}
        outputOverlayLabelsOpacityRangeX={[0, 1]}
        animateOverlayLabelsOpacity
        animateCardOpacity={false}
        horizontalThreshold={55}
        useViewOverflow={true}
        inputOverlayLabelsOpacityRangeY={[0, 150]}
        outputOverlayLabelsOpacityRangeY={[1, 0]}
        verticalThreshold={0}
        stackAnimationTension={90}
        stackAnimationFriction={15}
      />
      <View>
        <Transitioning.View
          ref={transitionRef}
          transition={transition}
        ></Transitioning.View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  card: {
    flex: 0.12,
    position: "relative",
    // shadowRadius: 50,
    borderRadius: 16,
    width: "100%",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 10,
    // shadowColor: "black",
    backgroundColor: "#fff",
    // borderColor: "#1E5966",
    // borderWidth: 3,
    borderBottomEndRadius: 30,
  },

  heading: {
    fontSize: 24,
    color: colors.gray,
  },
});
