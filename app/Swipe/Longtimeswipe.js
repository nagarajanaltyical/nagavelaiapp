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
  Linking,
  Dimensions,
  Animated,
  ScrollView,
  SectionList,
  TextInput,
  Pressable,
  ToastAndroid,
} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { EvilIcons, Octicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import DropDownPicker from "react-native-dropdown-picker";

import Happy from "./Happy";
import * as MailComposer from "expo-mail-composer";
import { useIsFocused } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import Top from "../components/Topcontainer";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../../App";
// import { useSelector } from "react-redux";
// import { useContext } from "react";
import { AUthReducer } from "../Authreducer";
import { PanGestureHandler } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { LocalizationContext } from "../../App";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LottieViewloading from "../components/Loading";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Transitioning, Transition } from "react-native-reanimated";
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import { useContext } from "react";
import { L_FILTER } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { isLoading } from "expo-font";

import { useMemo } from "react";
import Nodata from "../Lottie/Nodata";

const onShare = async (title, sal, per, time, loc) => {
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
      message: `Job Title:${title}\nSalary:${sal}/${per}\nTime:${time}\nLocation:${loc}\n Message sent from velai app`,
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

const { height, width } = Dimensions.get("window");

const stackSize = 3;
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
export default function LongtimeSwiperCard({ route }) {
  const { t, language, setlanguage } = useContext(LocalizationContext);
  const { state2, dispatch2 } = useContext(L_FILTER);
  const { state, dispatch } = useContext(AuthContext);
  console.log(state.coords.coords);
  const { latitude } = state.coords.coords;
  const { longitude } = state.coords.coords;
  console.log(latitude);
  const isdetailsgiven = useSelector((state) => state.user_details_given);
  const userID = useSelector((state) => state.ID);
  const states = useSelector((state) => state);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const toast = () => {
    //function to make Toast With Duration
    ToastAndroid.show(
      "Location - Our location features are just around the corner",

      ToastAndroid.CENTER
    );
  };
  const [index, setIndex] = React.useState(0);
  const [data, setData] = useState([]);
  const [postId, setpostId] = useState({});
  const [page, setpage] = useState(0);
  const [isVisible, setisvisble] = useState(false);
  const [address, setaddress] = useState(null);
  const [loading, setloading] = useState(true);
  const [search, setSearch] = useState("");

  function composeEmail() {
    MailComposer.composeAsync({
      recipients: ["help@velaiapp.com"],
    });
  }
  //for focus
  React.useEffect(() => {
    if (isFocused) {
      // callback
      // getPermission();
      getdata();
      // shorttime();
      // console.log(state2);
      // if (state2.filter_click) {
      //   getdataofthefilter();
      // } else {
      //   getdata();
      // }
      // // getJobs();
      // // getdata();
      // setIndex(0);
      // hellouser();
    }
  }, [isFocused]);

  //to get  or check the handlelike
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

  async function fetchdata(paras1, paras2) {
    const body = {};
    body.l_id = paras2;
    body.user_id = paras1;

    try {
      await fetch("http://103.174.10.108:5002/api/l_like_job", {
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

  async function setapplied(paras1, paras2) {
    const body = {};
    body.l_p_id = paras2;
    body.user_id = paras1;

    try {
      await fetch("http://103.174.10.108:5002/api/longtime_apply_job", {
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
  //getting a user Location takes time so i need to wait so i make a async function
  // const getPermission = async () => {
  //   //we use foreround permission for gettin Permission inside the app
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     return;
  //   }
  //   //To get the current Location
  //   let CurrentLocation = await Location.getCurrentPositionAsync({});
  //   setaddress(CurrentLocation);
  // };
  //onClickChat
  const Onclcikchat = async (paras) => {
    const body = {};
    body.user_id = states.ID;
    body.userType = "job_seeker_info";
    try {
      const response = await fetch(
        `http://103.174.10.108:5002/api/user_in_or_out`,
        {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          // credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const result = await response.json();
      if (result.result) {
        navigation.navigate("chatRoom", {
          sender_id: data[index].user_id,
          profile_pic: data[index].profilepic,
          username:
            data[index].companyname == null
              ? data[index].username
              : data[index].companyname,
        });
      } else {
        navigation.navigate("Userprofile", {
          education_given: false,
          experience_given: false,
        });
      }
    } catch (error) {}
  };
  const checktheusercondtiton = async (paras) => {
    const body = {};
    body.user_id = states.ID;
    body.userType = "job_seeker_info";
    try {
      const response = await fetch(
        `http://103.174.10.108:5002/api/user_in_or_out`,
        {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          // credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const result = await response.json();

      if (result.result) {
        const newCards = data.map((c) => {
          if (c.id === paras.id) {
            setapplied(userID, c.id);

            // setisvisble(true);
            // const timeoutId = setTimeout(() => {
            //   setisvisble(false);
            // }, 3000);

            // return () => clearTimeout(timeoutId);
            return { ...c, apply: "True" };
          } else {
            return c;
          }
        });
        Alert.alert(" Applied Successfully");

        setData(newCards);
        // navigation.navigate("mainprofile");
      } else {
        navigation.navigate("Userprofile", {
          education_given: false,
          experience_given: false,
        });
      }
    } catch (error) {}
  };
  const checkpost = (paras, Datas) => {
    for (let i = 0; i < Datas.length; i++) {
      if (Datas[i].post_id == paras) {
        return true;
      }
    }
    return false;
  };
  //To get the applied jobs
  const getJobs = async () => {
    try {
      await fetch(
        `http://103.174.10.108:5002/api/count_apply_job/${route.params.userID}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          setpostId(result);
        });
    } catch (error) {}
  };
  //TO CALUCULAET THE DISTANCE..
  // function haversine(lat1, lon1, lat2, lon2) {
  //   // distance between latitudes
  //   // and longitudes
  //
  //
  //   let dLat = ((lat2 - lat1) * Math.PI) / 180.0;
  //   let dLon = ((lon2 - lon1) * Math.PI) / 180.0;

  //   // convert to radiansa
  //   lat1 = (lat1 * Math.PI) / 180.0;
  //   lat2 = (lat2 * Math.PI) / 180.0;
  //
  //   // apply formulae
  //   let a =
  //     Math.pow(Math.sin(dLat / 2), 2) +
  //     Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  //   let rad = 6371;
  //
  //   let c = 2 * Math.asin(Math.sqrt(a));
  //
  //   return (rad * c).toFixed();
  // }

  // useEffect(() => {
  //   getPermission();

  //   getdata();
  //   getJobs();
  // }, []);
  const getdata = async () => {
    const body = {};
    body.post_id = route.params.postid;
    body.TableType = "long_job_post";
    body.user_id = userID;

    try {
      await fetch(`http://103.174.10.108:5002/api/limit/L_like_apply_check1`, {
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
          if (result["long"].length > 0) {
            // function find_id(paras) {
            //   return paras.id == route.params.postid;
            // }
            // const resultof = result["long"].filter(find_id);

            setData(result["long"]);
            console.log(result["long"]);

            setpage(page + 1);
            setloading(false);
          } else {
            setnodata(true);
            dispatch2({ type: "Revert_clicked_long" });
          }
        });
    } catch (error) {}
  };
  const getdataofthefilter = async () => {
    const body = {};
    body.page = 0;
    body.filter = state2;
    body.language = states.lang_value;

    try {
      await fetch(
        `http://103.174.10.108:5002/api/limit/L_like_apply_check/${userID}`,
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result["long"].length > 0) {
            setData(result["long"]);
            console.log(result["long"]);
            setpage(page + 1);
            setloading(false);
          } else {
            alert("No cards found on your filter");
            dispatch2({ type: "Revert_clicked_long" });
            // dispatch2({ type: "" });
            setTimeout(() => getdata23(), 1000);
          }
        });
    } catch (error) {}
  };

  //post the data
  const postData = async (parameter) => {
    const body = {};
    body.uid = route.params.userID;
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
  const getdata1 = async (paras) => {
    const body = {};
    body.page = paras;
    body.filter = state2;

    try {
      await fetch(
        `http://103.174.10.108:5002/api/limit/L_like_apply_check/${userID}`,
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          const updated = [...data, ...result["long"]];

          // setnewcards();
          // setData(result["short"]);
          setData(updated);

          setpage(page + 1);
          setloading(false);
        });
    } catch (error) {}
  };
  const onSwiped = () => {
    //
    // navigation.goBack();
    // transitionRef.current.animateNextTransition();
    // if ((index) => 0) {
    //   setIndex(index + 1);
    //   //
    //   if (index === 7 * page && index != 0) {
    //     setloading(true);
    //     getdata1(page);
    //   }
    // } else {
    //   Alert.alert("please start the at the oppsite direction!");
    // }
  };

  const onSwipedRight = () => {
    //
    //
    //
    navigation.goBack();
    // transitionRef.current.animateNextTransition();
    // setIndex(index - 1);
    // if (index === 7) {
    //   Alert.alert("hiiiiiiii");
    //   getdata1(page);
    // }
  };

  const Card = React.memo(({ card }) => {
    const { state, dispatch } = useContext(AuthContext);

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
    const handleCallclick = (paras) => {
      if (paras.isallow_tocall == "1" && isdetailsgiven) {
        let phoneNumber = "";
        if (Platform.OS === "android") {
          phoneNumber = `tel:${data[index].number}`;
        } else {
          phoneNumber = `telprompt:${data[index].number}`;
        }
        Linking.openURL(phoneNumber);
        // Alert.alert(
        //   `Name: MR/Ms ${paras.username}\nContact:${paras.number}(or)\n${paras.additionalnumber}`
        // );
      } else {
        navigation.navigate("Userprofile");
      }
    };
    // if (loading) {
    //
    //   return (
    //     <View>
    //       <Text>Loading..</Text>
    //     </View>
    //   );
    // }
    return (
      <Animated.ScrollView
        vertical={true}
        horizontal={false}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        // scrollEventThrottle={16}
      >
        <TouchableWithoutFeedback
          hitSlop={{ top: 1000, bottom: 1000, left: 1000, right: 1000 }}
        >
          <View style={styles.card}>
            {isVisible ? <Happy /> : ""}
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
                <Text
                  style={{
                    color: "#BDBCBC",
                    fontSize: 10,
                    width: 200,
                    fontWeight: "400",
                    justifyContent: "center",
                    alignContent: "center",
                    paddingHorizontal: 10,
                  }}
                >
                  {route.params.dates} days ago
                </Text>
                {/* <FontAwesome name="rupee" size={16} color="#000000" />
                {data[index].payment} */}
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
                      color="#56909d"
                    />
                  )}

                  {/* <AntDesign name="hearto" size={34} color="black" /> */}
                </TouchableOpacity>
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
                  onPress={() => Onclcikchat()}
                  style={{ paddingHorizontal: "4%" }}
                >
                  <Ionicons
                    name="ios-chatbox-ellipses-outline"
                    size={22}
                    color="#56909d"
                  />
                </TouchableOpacity>
                <View style={{ paddingHorizontal: "4%" }}>
                  <TouchableOpacity
                    onPress={() =>
                      onShare(
                        data[index].job_title,
                        data[index].Salary,
                        data[index].per,
                        data[index].exp_date,
                        data[index].location
                      )
                    }
                    // style={{ backgroundColor: "red", width: "45%" }}
                  >
                    <MaterialCommunityIcons
                      name="share-all-outline"
                      size={22}
                      color="#56909d"
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
                flexDirection: "row",

                alignContent: "center",
                marginHorizontal: 10,
                marginTop: "3%",
                marginLeft: "3%",
                width: "90%",
              }}
            >
              <Text
                style={{
                  // backgroundColor: "red",
                  color: "#333",
                  fontWeight: "500",
                  textTransform: "capitalize",
                  width: "95%",

                  fontSize: 20,
                  textAlign: "left",
                }}
              >
                {data[index].job_title}
              </Text>
              {/* <Text
                style={{
                  marginLeft: "2%",
                  fontSize: 13,
                  // textAlign: "left",
                  lineHeight: 18,
                  color: "#56909d",
                  // textDecorationLine: "underline",
                  textTransform: "capitalize",
                  fontWeight: "500",
                }}
              >
                {data[index].Openings} 1 Opening
              </Text> */}
              {/* <Text style={{ color: "#333" }}>
                <SimpleLineIcons
                  name="location-pin"
                  size={24}
                  color="#1da1f2"
                />
                {data[index].location}
              </Text> */}
            </View>
            <View>
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
                  source={require("../images/rupee.png")}
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
              {/* <View
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
              > */}
              {/* <MaterialCommunityIcons
                      name="timer-sand"
                      size={22}
                      color="#333"
                    /> */}
              {/* <Image
                  // resizeMode="contain"
                  source={require("../images/history.png")}
                  style={{ width: 19, height: 23 }}
                /> */}
              {/* <Text
                  style={{
                    marginLeft: "5%",
                    fontSize: 14,
                    textAlign: "left",
                    lineHeight: 18,
                    textTransform: "capitalize",
                    color: "#535353",

                    fontWeight: "400",
                  }}
                > */}
              {/* </Text> */}
              {/* </View> */}
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
                  source={require("../images/college.png")}
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
                  source={require("../images/experience.png")}
                  style={{ width: 19, height: 19 }}
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
                  {data[index].experience == null
                    ? "Any"
                    : data[index].experience}
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
                  source={require("../images/mappin.png")}
                  style={{ width: 19, height: 19 }}
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
                  {data[index].location.split(",")[0]},{" "}
                  {data[index].location.split(",")[1]},{" "}
                  {data[index].location.split(",")[2]} | {data[index].distance}
                  km
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
                {/* <Image
                  // resizeMode="contain"
                  source={require("../images/link.png")}
                  style={{ width: 16, height: 16 }}
                />
                {/* <Ionicons name="location-outline" size={22} color="#333" /> */}
                {/* <Text
                  style={{
                    marginLeft: "5%",
                    fontSize: 14,
                    textDecorationLine: "underline",

                    fontWeight: "400",
                    color: "blue",
                  }}
                >
                  www.zealzoft.com
                </Text> */}
              </View>
            </View>
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                marginLeft: "6%",

                marginVertical: 15,
              }}
            >
              <Text
                style={{
                  // marginTop: 3,
                  color: "#56909D",
                  fontSize: 14,

                  marginHorizontal: 2,

                  fontWeight: "400",
                }}
              >
                {data[index].workspace}
              </Text>

              <Text
                style={{
                  // marginTop: 3,

                  color: "#56909D",
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
                  fontSize: 14,
                  marginHorizontal: 2,

                  fontWeight: "400",
                }}
              >
                {data[index].jobtype == null ? "-" : data[index].jobtype}
              </Text>
              <Text
                style={{
                  // marginTop: 3,

                  color: "#56909D",
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
                  fontSize: 14,
                  marginHorizontal: 2,
                  width: 100,
                  fontWeight: "400",
                }}
              >
                {data[index].Openings} Openings
              </Text>
            </View>
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                marginLeft: "6%",
              }}
            >
              <Text
                style={{
                  color: "#ff0000",
                  fontWeight: "600",
                  fontSize: 14,
                  // textDecorationLine: "underline",
                  fontFamily: "Roboto",
                }}
              >
                Job Expire :
                {data[index].exp_date == null
                  ? ` ${new Date().getDate()} - ${
                      new Date().getMonth() + 1
                    } - ${new Date().getFullYear()}`
                  : `${new Date(data[index].exp_date).getDate()} - ${
                      new Date(data[index].exp_date).getMonth() + 1
                    }-${new Date().getFullYear()}`}
              </Text>
            </View>

            {/* <View
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
                source={require("../images/open.png")}
                style={{ width: 18, height: 18 }}
              />
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
                {data[index].openings} - vacancy
              </Text>
            </View> */}
            {/* <View
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
         
              <Image
                // resizeMode="contain"
                source={require("../images/distance.png")}
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
              ></Text>
            </View> */}

            {/* <View style={{ marginTop: "5%" }}>
              {data[index].pic === null ? (
                <Image
                  source={require("../images/no.png")}
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
                    uri: data[index].jobpic,
                  }}
                  style={{
                    height: 250,
                    width: "100%",
                    backgroundColor: "#eefbff",
                    marginTop: 10,
                    // marginBottom: 100,
                    // borderRadius: 5,
                    resizeMode: "cover",
                    position: "relative",
                  }}
                />
              )}
            </View> */}
            <View
              style={{
                // marginTop: "3%",
                // position: "absolute",
                // marginHorizontal: 10,
                // backgroundColor: "red",
                marginHorizontal: 10,
                marginTop: 10,
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
                  // borderRightWidth: 1,
                  // borderRightColor: "#333",
                  // justifyContent: "flex-start",
                  // alignItems: "center",
                  justifyContent: "center",
                  // alignItems: "center",
                  marginRight: "2%",
                }}
              >
                {data[index].s_admin == "True" ? (
                  <Image
                    source={{
                      uri: data[index].logo,
                      // : data[index].profilepic,
                    }}
                    style={{
                      backgroundColor: "#eefbff",
                      width: 40,
                      height: 40,
                      // marginTop: 28,

                      borderRadius: 50,
                      resizeMode: "cover",
                    }}
                  />
                ) : data[index].profilepic === "" ? (
                  <Image
                    // source={{
                    //   uri: "https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699__340.png",
                    // }}
                    source={require("../images/user.png")}
                    style={{
                      backgroundColor: "#eefbff",
                      width: 40,
                      height: 40,
                      // marginTop: 28,

                      borderRadius: 50,
                      resizeMode: "cover",
                    }}
                  />
                ) : (
                  <Image
                    source={{
                      uri: data[index].profilepic,
                      // : data[index].profilepic,
                    }}
                    style={{
                      backgroundColor: "#eefbff",
                      width: 40,
                      height: 40,
                      // marginTop: 28,

                      borderRadius: 50,
                      resizeMode: "cover",
                    }}
                  />
                )}
              </View>

              <View
                style={{
                  // position: "absolute",
                  width: "80%",
                  alignContent: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "#56909d",
                    fontSize: 15,
                    lineHeight: 15,

                    // width: "90%",
                    fontWeight: "500",
                    textTransform: "capitalize",
                  }}
                >
                  {data[index].s_admin == "True"
                    ? data[index].companyname1
                    : data[index].companyname == null
                    ? data[index].username
                    : data[index].companyname}
                </Text>
                <Text
                  style={{
                    color: "#56909d",
                    fontSize: 12,
                    // marginTop: "1%",
                    // width: "90%",
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                >
                  {data[index].s_admin == "True"
                    ? data[index].position
                    : data[index].companyname == null
                    ? `Owner`
                    : `${data[index].username} - ${data[index].designation}`}
                </Text>
              </View>
            </View>

            <View style={{}}>
              {/* <View
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
                  {t("Job_Details")}
                </Text>
              </View> */}
              <View
                key={data[index].id}
                style={
                  {
                    // marginTop: "3%",
                    // backgroundColor: "green",
                    // borderRadius: 10,
                    // marginHorizontal: 9,
                    // width: 150,
                  }
                }
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
                      fontSize: 16,
                      textTransform: "capitalize",
                      // width: "22%",
                      // backgroundColor: "blue",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Required Skills
                    {/* {t("Job_Description")} */}
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: "#d9d9d9",
                    borderWidth: 1,
                    // marginBottom: 10,
                    marginHorizontal: 9,
                    marginTop: "3%",
                    borderRadius: 10,
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
                      {data[index].Required_Skills == null
                        ? "Skills Not Mentioned"
                        : data[index].Required_Skills}
                    </Text>
                  </View>
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
                      fontSize: 16,
                      textTransform: "capitalize",
                      // width: "22%",
                      // backgroundColor: "blue",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    {t("Job_Description")}
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: "#d9d9d9",
                    borderWidth: 1,
                    // marginBottom: 10,
                    marginHorizontal: 9,
                    marginTop: "3%",
                    borderRadius: 10,
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
                    source={{ uri: data[0].ads.ads }}
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
                    justifyContent: "space-evenly",
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
                            fontSize: language == "English" ? 16 : 13,
                            fontWeight: "500",
                            marginHorizontal: 10,
                            justifyContent: "center",
                          }}
                        >
                          {t("Call_Now")}
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
                    {data[index].s_admin == null ? (
                      <TouchableOpacity
                        onPress={() => {
                          // navigation.navigate("Userprofile");
                          checktheusercondtiton(data[index]);
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
                              fontSize: language == "English" ? 16 : 13,
                              fontWeight: "500",
                            }}
                          >
                            {data[index].apply == "True"
                              ? t("Applied")
                              : t("Apply_Now")}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    ) : (
                      ""
                    )}
                  </View>
                </View>
                <View
                  style={{
                    // backgroundColor: "red",
                    // backgroundColor: "red",
                    marginTop: "5%",
                    height: 410,
                    marginBottom: "83%",
                    marginHorizontal: 9,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    {t("Location")}
                  </Text>
                  <TouchableWithoutFeedback onPress={toast}>
                    {/* <Image
                      style={{
                        height: 100,
                        width: "100%",
                        marginTop: "3%",
                        borderRadius: 15,
                        backgroundColor: "#eefbff",
                        resizeMode: "cover",
                      }}
                      source={require("../images/map.png")}
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
                        fontSize: 16,
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
                          // textTransform: "capitalize",

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
                          // textTransform: "capitalize",

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
                          // textTransform: "capitalize",

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
  });

  const [swipedAll, setSwipedAll] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyValue, setCompanyValue] = useState(null);
  const [company, setComapny] = useState([
    { label: "PUCIT", value: "pucit" },
    { label: "UCP", value: "ucp" },
    { label: "UET", value: "uet" },
  ]);
  async function shorttime() {
    try {
      await fetch("http://103.174.10.108:5002/api/job_title", {
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
        .then((result) => (console.log(result), setComapny(result)));
    } catch (error) {
      console.warn(error);
    }
  }
  const onCompanyOpen = useCallback(() => {
    // setGenderOpen(false);
  }, []);
  const { handleSubmit, control } = useForm();
  //SEARCHBAR
  async function GETdATASEARCH(paras1, paras2, paras3) {
    const body = {};
    body.job_title = paras1;
    body.table_name = paras2;
    body.user_id = paras3;

    try {
      await fetch("http://103.174.10.108:5002/api/title_job_fillter", {
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
        .then((result) => {
          //

          // setData(result["short"]);
          if (result.long.length > 0) {
            const updated = [...result["long"], ...data];
            setIndex(0);
            setData(updated);
            setCompanyValue(null);
          } else {
            alert("No data found");
            setCompanyValue(null);
          }
        });
    } catch (error) {
      console.warn(error);
    }
  }
  const handlejobTitle = () => {
    if (!(companyValue == null)) {
      const result = company.filter(checkcom);
      function checkcom(com) {
        return com.value == companyValue;
      }
      console.log(result[0].label);
      const finalJob = result[0].label;
      GETdATASEARCH(finalJob, "longtime_job", userID);
      //
      //
    }
  };
  const getdata23 = async (paras) => {
    const body = {};
    body.page = 0;
    body.filter = {
      states: "$",
      district: "$",
      job_title: "$",
      duration: "$",
      salary: "$",
      workmode: "$",
      education: "$",
      experience: "$",
      companyname: "$",
    };

    setIndex(0);

    try {
      await fetch(
        `http://103.174.10.108:5002/api/limit/L_like_apply_check/${userID}`,
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          //
          if (result["long"].length > 0) {
            setData(result["long"]);
            setIndex(0);
            setloading(false);
            setpage(page + 1);
          }
          // setData(result[""]);

          // setloading(false);
          // setpage(page + 1);
          //
        });
    } catch (error) {}
  };
  const [nodata, setnodata] = useState(false);
  // const SearchIcon = () => <Icon name="search" size={20} color="grey" />;

  const handleOnSwipedAll = async () => {
    // setnodata(true);
    // dispatch2({ type: "Revert_clicked_long" });
    navigation.goBack();
    //
    //
    // if (!swipedAll) {
    //   // setloading(true);
    //   // getdata1(page);
    //   setpage(0);
    //
    //
    //   Alert.alert("No more cards left!");
    //   // setSwipedAll(true);
    //   //
    //   //
    //   // Alert.alert("No more cards left!");
    //   setTimeout(() => dispatch2({ type: "RESET" }), 1000);
    //   setloading(true);
    //   // setlastcard(true);
    //   // setSwipedAll(true);
    //   // navigation.navigate("nomoreCards");
    //
    //   getdata23();
    //   // Timeout used for show Ripples loader to remove swiper container re-render glitch
    // }
  };

  if (loading) {
    return (
      <View style={{ height: "100%", backgroundColor: "#eefbff" }}>
        <Text>
          <LottieViewloading />;
        </Text>
      </View>
    );
  }
  if (nodata) {
    return (
      <View style={{ backgroundColor: "#eefbff" }}>
        <View style={{ backgroundColor: "#eefbff", marginTop: "60%" }}>
          <Nodata />
        </View>
        <View
          style={{
            // marginTop: "-50%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            marginTop: "30%",
          }}
        >
          <Text
            style={{
              position: "relative",
              fontSize: 22,
              fontWeight: "500",
              marginBottom: 20,
              color: "#333",
            }}
          >
            No More Cards Left
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("tophome")}
            style={{
              marginTop: "0%",

              // position: "relative",              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                fontSize: 20,
                color: "red",
              }}
            >
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#eefbff" }}>
      {/* <StatusBar hidden={false} /> */}
      <Swiper
        ref={swiperRef}
        cards={data}
        cardIndex={index}
        renderCard={(card) => <Card card={card} />}
        backgroundColor={"#eefbff"}
        cardVerticalMargin={1}
        onTapCardDeadZone={5}
        cardHorizontalMargin={4}
        useNativeDriver={true}
        stackSize={stackSize}
        onSwiped={onSwiped}
        onSwipedRight={onSwipedRight}
        onSwipedAll={handleOnSwipedAll}
        disableRightSwipe={index == 0 ? true : false}
        swipeTop={false}
        swipeBottom={false}
        stackScale={10}
        disableTopSwipe={false}
        disableBottomSwipe={false}
        stackSeparation={1}
        horizontalSwipe={true}
        showSecondCard={false}
        verticalSwipe={false}
        inputOverlayLabelsOpacityRangeX={[0, 150]}
        outputOverlayLabelsOpacityRangeX={[0, 1]}
        animateOverlayLabelsOpacity
        animateCardOpacity={false}
        horizontalThreshold={75}
        useViewOverflow={true}
        // outputRotationRange={["-10deg", "0deg", "10deg"]}
        // outputOpacityRange={[0.6, 1, 0.6]}
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
      {/* <LinearGradient
        colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        useAngle={45}
        style={{
          backgroundColor: "#eefbff",
          width: "12%",
          height: "17%",
          marginLeft: "90%",
          marginTop: Math.round(height) - 300,
          flexDirection: "column",
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: -15,
            marginRight: 4,
          }}
        >
          <Controller
            name="job_title"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <DropDownPicker
                style={{
                  borderColor: "transparent",
                  height: 10,
                  width: 50,
                  backgroundColor: "transparent",
                }}
                open={companyOpen}
                value={companyValue} //companyValue
                items={company}
                showArrowIcon={false}
                setOpen={setCompanyOpen}
                listMode="MODAL"
                modalTitle="Select job title"
                modalProps={{
                  animationType: "slide",
                }}
                modalContentContainerStyle={{
                  backgroundColor: "#fff",
                }}
                setValue={setCompanyValue}
                setItems={setComapny}
                placeholder={
                  <FontAwesome name="search" size={22} color="#fff" />
                  // <EvilIcons name="search" size={24} color="#333" />
                }
                placeholderStyle={{ color: "#fff", marginLeft: 3.5 }}
                loading={loading}
                activityIndicatorColor="#5188E3"
                searchable={true}
                searchPlaceholder="Search title here..."
                onOpen={onCompanyOpen}
                onChangeValue={handlejobTitle}
                zIndex={1000}
                zIndexInverse={3000}
              />
            )}
          />
        </View>
        <View style={{ position: "relative", marginTop: 13, marginRight: 5 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Longtimefilter"),
                setloading(true),
                setIndex(0);
              dispatch2({ type: "RESET" });
            }}
            // style={{ marginRight: 40 }}
          >
            <Image
              // resizeMode="contain"
              source={require("../images/setting.png")}
              style={{ width: 23, height: 23 }}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  placeholderStyles: {
    color: "grey",
  },
  dropdown: {
    borderColor: "#B7B7B7",
    height: 30,
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
