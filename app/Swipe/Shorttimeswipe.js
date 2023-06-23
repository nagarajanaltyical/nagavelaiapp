import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  SafeAreaView,
  Dimensions,
  Linking,
  Animated,
  ScrollView,
  SectionList,
  TextInput,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { EvilIcons, Octicons } from "@expo/vector-icons";
import Happy from "./Happy";
import Nodata from "../Lottie/Nodata";
import * as MailComposer from "expo-mail-composer";
import { useForm, Controller } from "react-hook-form";
import { useIsFocused } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/FontAwesome";

import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Top from "../components/Topcontainer";
import { useState, useEffect, useContext, useReducer, memo } from "react";
// import { useContext } from "react";
import { S_FILTER } from "../../App";
import { AuthContext } from "../../App";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { AUthReducer } from "../Authreducer";
import { Inital_State } from "../Authreducer";
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
import {
  NavigationRouteContext,
  useNavigation,
} from "@react-navigation/native";
import { isLoading } from "expo-font";
import { useMemo } from "react";
import LottieViewloadingmodal from "../components/Loadinmodal";
import { ToastAndroid } from "react-native";

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
export default function ShorttimeSwiperCard({ route }) {
  const { t, language, setlanguage, userDetails } =
    useContext(LocalizationContext);
  const isFocused = useIsFocused();
  const { state1, dispatch1 } = useContext(S_FILTER);

  const [isVisible, setisvisble] = useState(false);
  const toast = () => {
    //function to make Toast With Duration
    ToastAndroid.show(
      "Location - Our location features are just around the corner",

      ToastAndroid.CENTER
    );
  };
  const isdetailsgiven = useSelector((state) => state.user_details_given);
  const userID = useSelector((state) => state.ID);
  const states = useSelector((state) => state);
  const redux_dispatch = useDispatch();

  function composeEmail() {
    MailComposer.composeAsync({
      recipients: ["help@velaiapp.com"],
    });
  }

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
  const [page, setpage] = useState(0);
  // const [newcards, setnewcards] = useState([]);

  const [address, setaddress] = useState(null);
  const [loading, setloading] = useState(true);

  const [search, setSearch] = useState("");
  //to set the liked post

  //to get the API && mark liked
  async function fetchdata(paras1, paras2) {
    const body = {};
    body.s_id = paras2;
    body.user_id = paras1;

    try {
      await fetch("http://103.174.10.108:5002/api/s_like_details", {
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
  //onclickchat
  const checktheuserChat = async (paras) => {
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
            data[index].companyname == null || data[index].companyname == "None"
              ? data[index].username
              : data[index].companyname,
        });
        // navigation.navigate("mainprofile");
      } else {
        navigation.navigate("Userprofile", {
          education_given: false,
          experience_given: false,
        });
      }
    } catch (error) {}
  };

  //USERCONDITION
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

            //  return () => clearTimeout(timeoutId);
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
          if (result.short.length > 0) {
            const updated = [...result["short"], ...data];
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
  //     await fetch(`http://192.168.1.11:5000/api/count_apply_job/${userID}`, {
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
  //
  //
  //         setpostId(result);
  //       });
  //   } catch (error) {
  //
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

  // useEffect(() => {
  //   // getPermission();
  //
  //   getdata();
  //   hellouser();
  //   // navigation.addListener("tabPress", () => getdata());
  //   // getJobs();
  // }, []);

  React.useEffect(() => {
    if (isFocused) {
      // callback
      getdata();
      // console.log(state1);
      // if (state1.filter_click) {
      //   getdatafilter();
      // } else {
      //   getdata();
      // }

      // setIndex(0);
      // hellouser();
      // shorttime();
      // getdata11();
    }
  }, [isFocused]);

  // useEffect(() => {}, [data, loading]);
  // useEffect(() => {
  //
  //
  //   setuser(state);
  // }, [state]);
  const getdatafilter = async (paras) => {
    const body = {};
    body.page = 0;
    body.filter = state1;
    console.log(body);
    setloading(true);
    try {
      await fetch(
        `http://103.174.10.108:5002/api/limit/s_like_apply_check/${userID}`,
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
          console.log("im the filter dataaaa");
          console.log(result);
          if (result["short"].length > 0) {
            setData(result["short"]);
            setloading(false);
            setpage(page + 1);
          } else {
            alert("No cards found on your filter");
            dispatch1({ type: "Revert_CLick" });
            setTimeout(() => getdata23(), 1000);
          }
        });
    } catch (error) {
      console.warn(error);
    }
  };
  // console.log(getdata);
  const getdata11 = async (paras) => {
    console.log("im the dATA iVING");
    const body = {};
    body.user_id = userID;
    body.post_id = route.params.postid;
    body.table_name = "shorttime_job";
    console.log(body);
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
          console.log("im the data of the first");
          console.log(result);
          console.log(result["post"][0]);
          setData(result["post"]);
          //  setDatas(result["post"][0]);
          //  setloadings(false);

          // console.log(result["post"][0].designation);
          //   setCompanyValue(result["post"][0].designation);
          // setloading(false);
          // setloading(false);
          //   setpage(page + 1);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getdata = async () => {
    const body = {};
    body.post_id = route.params.postid;
    body.TableType = "shorttime_job";
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
          if (result["short"].length > 0) {
            // function find_id(paras) {
            //   return paras.id == route.params.postid;
            // }
            // const resultof = result["long"].filter(find_id);

            setData(result["short"]);
            console.log(result["short"]);

            setpage(page + 1);
            setloading(false);
          } else {
            setnodata(true);
            dispatch2({ type: "Revert_clicked_long" });
          }
        });
    } catch (error) {}
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
    };

    try {
      await fetch(
        `http://103.174.10.108:5002/api/limit/s_like_apply_check/${userID}`,
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
          if (result["short"].length > 0) {
            setData(result["short"]);
            setIndex(0);
            setloading(false);
            setpage(page + 1);
          } else {
            return <Nodata />;
          }
        });
    } catch (error) {}
  };

  //getdata1
  const getdata1 = async (paras) => {
    const body = {};
    body.page = paras;
    body.filter = state1;

    try {
      await fetch(
        `http://103.174.10.108:5002/api/limit/s_like_apply_check/${userID}`,
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
          const updated = [...data, ...result["short"]];

          // setnewcards();
          // setData(result["short"]);
          setData(updated);

          setpage(page + 1);
          setloading(false);
          //
          //
          // setData(result["short"]);
          // setloading(false);
          // setpage(page + 1);
          //
        });
    } catch (error) {}
  };
  const hellouser = async (paras) => {
    const body = {};
    body.user_id = states.ID;
    body.userType = states.job_seeker_info
      ? "job_seeker_info"
      : "job_provider_info";
    // body.page = 0;
    try {
      await fetch(`http://103.174.10.108:5002/api/user_in_or_out`, {
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
          if (result.result) {
            redux_dispatch({ type: "User_Details_Given" });
          }
          //
          //
          // setData(result["short"]);
          // setloading(false);
          // setpage(page + 1);
          //
        });
    } catch (error) {}
  };

  // const getdata2 = async (paras) => {
  //   const body = {};
  //   body.page = paras;
  //   try {
  //     await fetch("http://192.168.1.11:5000/api/limit/s_like_apply_check/4", {
  //       method: "POST",
  //       mode: "cors",
  //       cache: "no-cache",
  //       credentials: "same-origin",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(body),
  //     })
  //       .then((response) => response.json())
  //       .then((result) => {
  //
  //
  //         const updated = [...data, ...result["short"]];
  //
  //         // setnewcards();
  //         // setData(result["short"]);
  //         setData(updated);
  //
  //         setpage(page + 1);
  //         setloading(false);
  //       });
  //   } catch (error) {
  //
  //   }
  // };

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
    //navigation.navigate("Homes");
    // transitionRef.current.animateNextTransition();
    // if ((index) => 0) {
    //   setIndex(index + 1);
    //   //
    //   if (index === 7 * page) {
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
    // navigation.navigate("bottomhome");
    // transitionRef.current.animateNextTransition();
    // setIndex(index - 1);
    // if (index === 7) {
    //   Alert.alert("hiiiiiiii");
    //   getdata1(page);
    // }
  };
  const onChange2 = () => {
    alert(workspacevalue);
  };
  const Card = React.memo(({ card }) => {
    const { state, dispatch } = useContext(AuthContext);

    const handleCallclick = () => {
      if (data[index].isallow_tocall == "1" && isdetailsgiven) {
        let phoneNumber = "";
        if (Platform.OS === "android") {
          phoneNumber = `tel:${data[index].number}`;
        } else {
          phoneNumber = `telprompt:${data[index].number}`;
        }
        Linking.openURL(phoneNumber);
        // Alert.alert(
        //   `Name: MR/Ms ${data[index].username}\nContact:${data[index].number}(or)\n${data[index].additionalnumber}`
        // );
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
    // if (loading) {
    //
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
      >
        <TouchableWithoutFeedback
          hitSlop={{ top: 200, bottom: -1100, left: -1100, right: -1000 }}
        >
          <View style={styles.card}>
            {isVisible ? <Happy /> : ""}
            <View
              style={{
                marginTop: "3%",
              }}
            >
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
                    console.log("im at the like ", data[index].liked);
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
                    onPress={() =>
                      onShare({
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
                      })
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
                flexDirection: "row",
                // position: "absolute",
                alignContent: "center",
                marginHorizontal: 10,

                marginTop: "5%",
                marginLeft: "3%",
                width: "90%",
              }}
            >
              <Text
                style={{
                  color: "#333",
                  fontWeight: "500",
                  width: "80%",
                  textTransform: "capitalize",

                  fontSize: 20,
                  textAlign: "left",
                }}
              >
                {data[index].job_title}
              </Text>
              <Text
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
                {data[index].Openings} Openings
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
            <View
              style={{
                // borderColor: "#d9d9d9",
                // borderWidth: 1,
                // marginBottom: 10,
                // marginHorizontal: 9,

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
                  source={require("../images/history.png")}
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
                  {data[index].location.split(",")[2]} | {data[index].distance}{" "}
                  km
                </Text>
              </View>
              {/* <View
                style={{
                  justifyContent: "flex-end",
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
              > */}
              {/* <Image
                  // resizeMode="contain"
                  source={require("../images/open.png")}
                  style={{ width: 18, height: 18 }}
                /> */}
              {/* <Ionicons name="location-outline" size={22} color="#333" /> */}

              {/* </View> */}
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
                >
                  {data[index].distance} km
                </Text>
              </View> */}
            </View>
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                marginVertical: "2%",
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
                    } - ${new Date().getFullYear()}`}
              </Text>
            </View>
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
            </View> */}
            <View
              style={{
                // marginTop: "3%",
                // position: "absolute",
                marginHorizontal: 10,
                marginTop: 10,
                // backgroundColor: "red",
                // height: "7%",
                width: "100%",
                // justifyContent: "center",
                // alignContent: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  // borderRightWidth: 1,
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
                      width: 50,
                      height: 50,
                      // marginTop: 28,

                      borderRadius: 50,
                      resizeMode: "cover",
                    }}
                  />
                ) : data[index].profilepic === "" ? (
                  <Image
                    // resizeMode="contain"
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

              {/* </View> */}

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
                    : data[index].companyname == null ||
                      data[index].companyname == "None"
                    ? data[index].username
                    : data[index].companyname}
                </Text>
                <Text
                  style={{
                    color: "#56909d",
                    // width: "90%",
                    fontSize: 12,
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                >
                  {data[index].s_admin == "True"
                    ? data[index].position
                    : data[index].companyname == null ||
                      data[index].companyname == "None"
                    ? `Owner`
                    : `${data[index].username} - ${data[index].designation}`}
                </Text>
              </View>
            </View>
            {/* <LinearGradient
              colors={["#e9eef0", "#e9eef0"]}
              style={{ marginTop: 30 }}
            > */}
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
                        ? "Description Not Mentioned"
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
                      color: "#333",
                      fontWeight: "500",
                    }}
                  >
                    {t("Location")}
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
                      source={require("../images/map.png")}
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
  });
  const [swipedAll, setSwipedAll] = useState(false);
  // const [jobTitle, setjobtitle] = useState("");
  const handlejobTitle = () => {
    if (!(companyValue == null)) {
      const result = company.filter(checkcom);
      function checkcom(com) {
        console.log(com);
        return com.value == companyValue;
      }
      console.log(result[0].label);
      const finalJob = result[0].label;
      console.log(finalJob);
      GETdATASEARCH(finalJob, "shorttime_job", userID);
      // setCompanyValue("");
      //
      //
    }
  };
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
  //     await fetch("http://192.168.1.11:5000/api/job_title", {
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
  const [nodata, setnodata] = useState(false);
  const handleOnSwipedAll = () => {
    navigation.goBack();
    // setnodata(true);
    // dispatch1({ type: "Revert_CLick" });
    // // return <Nodata />;
    // // if (!swipedAll) {
    // //
    // //   // setloading(true);
    // //   // getdata1(page);
    // //   //
    // //   //
    // //   // Alert.alert("No more cards left!");
    // //   // setpage(0);
    // //   // setIndex(0);
    // //   // dispatch1({ type: "RESET1" });
    // //   // setloading(true);
    // //   // setlastcard(true);
    // //   // setSwipedAll(true);
    // //   // // navigation.navigate("nomoreCards");
    // //   //
    // //   // getdata23();
    // //   // Timeout used for show Ripples loader to remove swiper container re-render glitch
    // // }
  };
  const { height } = useWindowDimensions();
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyValue, setCompanyValue] = useState(null);
  const [company, setComapny] = useState([
    { label: "PUCIT", value: "pucit" },
    { label: "UCP", value: "ucp" },
    { label: "UET", value: "uet" },
  ]);
  // const SearchIcon = () => <Icon name="search" size={22} color="#707070" />;
  async function shorttime() {
    try {
      await fetch("http://103.174.10.108:5002/api/s_job_title", {
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
  //  const { handleSubmit, control } = useForm();
  const onCompanyOpen = useCallback(() => {
    // setGenderOpen(false);
  }, []);
  // const onCompanyOpen = useCallback(() => {}, []);
  const [userName, setUserName] = useState("");
  if (loading) {
    return (
      <View style={{ backgroundColor: "#eefbff", height: "100%" }}>
        <Text style={{}}>
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
            onPress={() => navigation.goBack()}
            style={{
              marginTop: "0%",

              // position: "relative",
              justifyContent: "center",
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
      <Swiper
        ref={swiperRef}
        cards={data}
        cardIndex={index}
        renderCard={(card) => <Card card={card} />}
        backgroundColor={"#eefbff"}
        cardVerticalMargin={1}
        onTapCardDeadZone={5}
        cardHorizontalMargin={4}
        onSwiped={onSwiped}
        // disableRightSwipe={index == 0 ? true : false}
        disableRightSwipe={index == 0}
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
        disableBottomSwipe={false}
        // tSwipe={islastcard}disableLef
        // disableRightSwipe={islastcard}
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
  placeholderStyles: {
    color: "#d9d9d9",
  },
  dropdown: {
    borderColor: "#B7B7B7",
    height: 10,
    width: 50,
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
