import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  Linking,
  SafeAreaView,
  Dimensions,
  Animated,
  ScrollView,
  SectionList,
  TextInput,
  Pressable,
  ToastAndroid,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import { useCallback, memo } from "react";
// import { useSelector } from "react-redux";
import * as MailComposer from "expo-mail-composer";

import Top from "../../components/Topcontainer";
import { useState, useEffect, useContext, useReducer } from "react";
import { AuthContext } from "../../../App";
// import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { useSelector } from "react-redux";
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
import { USER_ID } from "../../Redux/action";
import LottieViewloading from "../../components/Loading";

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
        delayMs={ANIMATION_DURATION / 5}
      />
      <Transition.In
        type="slide-bottom"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 5}
        interpolation="easeOut"
      />
    </Transition.Together>
  </Transition.Sequence>
);
const swiperRef = React.createRef();
const transitionRef = React.createRef();
export default function RentalSwiperCard({ route }) {
  const { t, language, setlanguage, userDetails } =
    useContext(LocalizationContext);
  const isdetailsgiven = useSelector((state) => state.user_details_given);
  const selected_Tools = useSelector((state) => state.selected_Tools);
  const is_rental_details = useSelector(
    (state) => state.rental_seeker_user_details
  );
  const userID = useSelector((state) => state.ID);

  // const { getstate } = useContext(AuthContext);

  // const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [index, setIndex] = React.useState(0);

  const navigation = useNavigation();
  // const [state, dispatch] = useReducer(AUthReducer, Inital_State);
  //
  // const memoziedState = useMemo(() => state, [state]);
  const [isliked, setisliked] = useState(false);
  //  const { state, dispatch } = useContext(AuthContext);

  //
  const toast = () => {
    //function to make Toast With Duration
    ToastAndroid.show(
      "Location - Our location features are just around the corner",

      ToastAndroid.CENTER
    );
  };
  const [userdetails, setuser] = useState({});
  const [likedpost, setlikedpost] = useState([]);
  const [postId, setpostId] = useState({});
  const [page, setpage] = useState(0);
  const [newcards, setnewcards] = useState([]);
  const [address, setaddress] = useState(null);
  const [loading, setloading] = useState(true);

  const [search, setSearch] = useState("");
  function composeEmail() {
    MailComposer.composeAsync({
      recipients: ["help@velaiapp.com"],
    });
  }
  //to set the liked post

  //to get the API && mark liked
  // async function fetchdata(paras1, paras2) {
  //
  //
  //   const body = {};
  //   body.s_id = paras2;
  //   body.user_id = paras1;
  //
  //   try {
  //     await fetch("http://103.174.10.108:5002/api/s_like_details", {
  //       method: "post", // *GET, POST, PUT, DELETE, etc.
  //       mode: "cors", // no-cors, *cors, same-origin
  //       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //       credentials: "same-origin", // include, *same-origin, omit
  //       headers: {
  //         "Content-Type": "application/json",
  //         // 'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: JSON.stringify(body),
  //     })
  //       .then((response) => response.json())
  //       .then((result) => {
  //
  //
  //       });
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }
  //mark applied
  async function setapplied(paras1, paras2) {
    const body = {};
    body.s_p_id = paras2;
    body.user_id = paras1;

    try {
      await fetch("http://103.174.10.108:5002/api/shorttime_apply_job", {
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
  //     console.log(Datas[i].post_id);
  //     if (Datas[i].post_id == paras) {
  //
  //
  //       return true;
  //     }
  //   }
  //   return false;
  // };
  // To get the applied jobs
  // const getJobs = async () => {
  //   const body = {};
  //   body.user_id = userID;
  //   body.userType = "";

  //   try {
  //     await fetch(`http://103.174.10.108:5002/api/profile_details_show`, {
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
    console.log("hii im at formula");

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
  }, []);

  useEffect(() => {}, [data, loading]);
  // useEffect(() => {
  //
  //
  //   setuser(state);
  // }, [state]);

  //onclickchat
  const checktheuserChat = async (paras) => {
    const body = {};
    body.user_id = userID;
    body.userType = "rental_seeker_info";
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
          username: data[index].username,
        });
        // navigation.navigate("mainprofile");
      } else {
        navigation.navigate("rentalSeeker");
      }
    } catch (error) {}
  };
  const getdata = async (paras) => {
    const body = {};
    body.post_id = route.params.post_id;
    body.selectedTools = selected_Tools;
    body.user_id = userID;

    try {
      await fetch(`http://103.174.10.108:5002/api/rentsee_choice`, {
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
          setData(result["choice"]);
          setloading(false);
          // setpage(page + 1);
          //
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
        handleliked(userID, card.id);

        // fetchdata(userID, card.id);

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
    //
    //
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

  const handleliked = async (paras1, paras2) => {
    const body = {};
    body.user_id = paras1;
    body.c_h_id = paras2;

    try {
      await fetch("http://103.174.10.108:5002/api/rental_call_history", {
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
          // const updated = [...data, ...result["short"]];
          //
          // // setnewcards();
          // // setData(result["short"]);
          // setData(updated);
          //
          // setpage(page + 1);
          // setloading(false);
        });
    } catch (error) {}
  };

  const Card = React.memo(({ card }) => {
    const { state, dispatch } = useContext(AuthContext);

    const handleCallclick = (paras) => {
      //
      //
      //
      // // dialCall = () => {
      //For creating a number
      // let phoneNumber = "";

      // if (Platform.OS === "android") {
      //   phoneNumber = `tel:${data[index].number}`;
      // } else {
      //   phoneNumber = "telprompt:${+1234567890}";
      // }

      // Linking.openURL(phoneNumber);
      // // };

      if (is_rental_details) {
        // Alert.alert(
        //   `Name: MR/Ms ${data[index].username}\nContact:${data[index].number}`
        // );
        // handleliked(userID, paras.id);
        let phoneNumber = "";

        if (Platform.OS === "android") {
          phoneNumber = `tel:${data[index].number}`;
        } else {
          phoneNumber = `telprompt:${data[index].number}`;
        }

        Linking.openURL(phoneNumber);
      } else {
        navigation.navigate("rentalSeeker");
      }
      // if (data[index].isallow_tocall == "1" && isdetailsgiven) {
      //   Alert.alert(
      //     `Name: MR/Ms ${data[index].username}\nContact:${data[index].number}(or)\n${data[index].additionalnumber}`
      //   );
      // } else {
      //   navigation.navigate("rentalSeeker");
      // }
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
                <TouchableOpacity
                  onPress={() => checktheuserChat()}
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
                    onPress={() => {
                      Alert.alert(
                        "Share",
                        "Our new features are just around the corner."
                      );
                    }}
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
                  {data[index].product_name}
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
                      // marginTop: 10,
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
                  marginTop: 10,
                  marginLeft: "3%",
                  // backgroundColor: "green",
                  // justifyContent: "center",
                  // alignContent: "center",
                  flexDirection: "row",
                }}
              >
                {data[index].profilepic === null ? (
                  <Image
                    source={{
                      uri: "https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699__340.png",
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
                      backgroundColor: "#EEFBFF",
                      width: 50,
                      height: 50,
                      // marginTop: 28,

                      borderRadius: 50,
                      resizeMode: "cover",
                    }}
                  />
                )}
                <View
                  style={{
                    width: "90%",
                    paddingLeft: 10,
                    justifyContent: "center",
                    // backgroundColor: "red",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      color: "#56909d",
                      fontSize: 18,
                      width: "90%",
                      fontWeight: "500",
                      textTransform: "capitalize",
                      // textAlign: "left",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    {data[index].username}
                  </Text>
                  <Text
                    style={{
                      color: "#56909d",
                      fontSize: 13,
                      fontWeight: "400",
                      textTransform: "capitalize",
                      // textAlign: "left",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    Owner
                  </Text>
                </View>
              </View>

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
                      fontSize: 16,
                      textTransform: "capitalize",
                      // width: "22%",
                      marginBottom: "2%",
                      // backgroundColor: "blue",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Product Type
                  </Text>
                  <Text
                    style={{
                      // marginTop: 3,
                      textTransform: "capitalize",
                      color: "#535353",
                      textAlign: "left",
                      marginLeft: "5%",
                      lineHeight: 18,
                      marginBottom: "5%",
                      fontSize: 14,
                      fontWeight: "400",
                    }}
                  >
                    {data[index].product_type}
                  </Text>
                </View>
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
                      fontSize: 16,
                      textTransform: "capitalize",
                      // width: "22%",
                      // backgroundColor: "blue",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Product Details
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
                        {data[index].product_fees}{" "}
                        {data[index].product_fees_hour}
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
                        style={{ width: 19, height: 23 }}
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
                        {console.log("hiii dude")}
                        {console.log(data[index].Duration)}
                        {data[index].Duration} {data[index].Duration2}
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
                    Product Description
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
                      {data[index].product_description}
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
                    Address :
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
                      {data[index].address}
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: "5%" }}>
                  <Image
                    source={require("../../images/swipeadd.png")}
                    style={{
                      position: "relative",

                      backgroundColor: "purple",
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
                    justifyContent: "center",
                  }}
                >
                  <View>
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
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    Location
                  </Text>
                  <TouchableWithoutFeedback onPress={toast}>
                    <Image
                      style={{
                        height: 100,
                        width: "100%",
                        marginTop: "3%",
                        borderRadius: 15,
                        resizeMode: "cover",
                        backgroundColor: "#eefbff",
                      }}
                      source={require("../../images/map.png")}
                    />
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

                          textAlign: "left",
                          lineHeight: 20,
                          fontWeight: "400",
                          marginBottom: "1%",
                          color: "#535353",
                        }}
                      >
                        - We take the safety and well-being of our users
                        seriously. If you come across any instances of misuse or
                        abuse while using our rental services, please report it
                        to us immediately. By using our rental services, you
                        agree to abide by our terms and conditions and to use
                        the services responsibly and lawfully.
                      </Text>

                      {/* <Text
                        style={{
                          fontSize: 14,
                          textAlign: "left",
                          lineHeight: 20,
                          fontWeight: "400",
                          marginRight: "2%",

                          // marginBottom: "1%",

                          // textTransform: "",
                          color: "#535353",
                        }}
                      >
                        We reserve the right to change or update the information
                        on the app at any time without notice.
                      </Text> */}
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
  //
  //     console.warn(error);
  //   }
  // }
  const handleOnSwipedAll = () => {
    if (!swipedAll) {
      // setloading(true);
      // getdata1(page);

      Alert.alert("No more cards left!");
      navigation.goBack();
      // setSwipedAll(true);
      // getdata();
      // Timeout used for show Ripples loader to remove swiper container re-render glitch
    }
  };

  const onCompanyOpen = useCallback(() => {}, []);
  const [userName, setUserName] = useState("");
  if (loading) {
    return (
      <View style={{ height: "100%", backgroundColor: "#EEFBFF" }}>
        <Text style={{ height: "100%" }}>
          <LottieViewloading />;
        </Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#eefbff" }}>
      {/* <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginBottom: "5%",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        > */}
      {/* <View
            style={{
              width: "87%",
              height: 35,
              // borderWidth: 1,
              // paddingLeft: 20,
              // margin: 5,

              justifyContent: "space-evenly",
              flexDirection: "row",
              borderRadius: 20,
              // marginLeft: 200,
              // borderColor: "#707070",
              backgroundColor: "#fff",
              // marginHorizontal: 55,
              // marginVertical: 15,
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <EvilIcons name="search" size={22} color="#707070" />
            </View>
            <TextInput
              value={search}
              underlineColorAndroid="transparent"
              placeholder="Search here"
              style={{ marginRight: "15%" }}
            />
            <View
              style={{
                marginLeft: 80,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Our new features are just around the corner.");
                }}
              >
                <FontAwesome name="microphone" size={22} color="#707070" />
              </TouchableOpacity>
            </View>
          </View> */}
      {/* </View>
      </View> */}

      <Swiper
        ref={swiperRef}
        cards={data}
        cardIndex={index}
        renderCard={(card) => <Card card={card} />}
        backgroundColor={"transparent"}
        cardVerticalMargin={1}
        // onTapCardDeadZone={5}
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
        stackSeparation={14}
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
    // </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#eefbff",
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
