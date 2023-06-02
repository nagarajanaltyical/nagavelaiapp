import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { LocalizationContext } from "../../../App";

import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { L_FILTER, S_FILTER } from "../../../App";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import Top from "../Topcontainer";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../../../App";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import SwiperCard from "../../Pages/Post";
import { Alert } from "react-native";
import Coming from "../../Lottie/Comingsoon";

// create a component
export default function SelectCategory({ route }) {
  //

  const { t, language, setlanguage } = useContext(LocalizationContext);

  const { state, dispatch12 } = useContext(AuthContext);
  // const myIDnumber = useSelector((state) => state.ID);
  const is_personal_provider = useSelector(
    (state) => state.job_provider_personal_user_details
  );
  const is_company_provider = useSelector(
    (state) => state.job_Provider_company_user_details
  );
  const [isclick, setIsclick] = useState(false);
  const { state1, dispatch1 } = useContext(S_FILTER);
  const { state2, dispatch2 } = useContext(L_FILTER);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isvoice, setisvoice] = useState(true);
  const [search, setSearch] = useState("");

  //hello doiii
  const todoList = useSelector((state) => state.IS_user_login);
  const myIDnumber = useSelector((state) => state.ID);

  const states = useSelector((state) => state);

  useEffect(() => {
    setlanguage(states.lang);
  }, [states.lang]);
  const [phonenumber, setphonenumber] = useState("");
  useEffect(() => {
    getphonenumber();
  }, []);
  async function getphonenumber() {
    try {
      await fetch(`http://103.174.10.108:5002/api/user_number/${myIDnumber}`, {
        method: "GET",
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          Accept: "application/json",
          // "Content-Type": "multipart/form-data",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // body: formdata, // body data type must match "Content-Type" header
      })
        .then((response) => response.json())
        .then((result) => {
          setphonenumber(result.number);
          // setjobpostpic(result["updated"]);
          // setActivityIndicators(false);
          // setModalVisible(false);
        });
    } catch (error) {}
  }

  // useEffect(async () => {
  //
  //
  //
  //   const body = {};
  //   body.user_id = myIDnumber;
  //   body.latitude = state.coords.coords.latitude;
  //   body.longitude = state.coords.coords.longitude;
  //   try {
  //     await fetch("http://192.168.1.11:5000/api/location_update", {
  //       method: "PUT",
  //       mode: "cors", // no-cors, *cors, same-origin
  //       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //       credentials: "same-origin", // include, *same-origin, omit
  //       headers: {
  //         "Content-Type": "application/json",
  //         // 'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: JSON.stringify(body), // body data type must match "Content-Type" header
  //     })
  //       .then((response) => response.json())
  //       .then((result) => {
  //
  //         //  dispatch({
  //         //    type: "Loged_In",
  //         //    payload: result.user_id,
  //         //  });
  //         //  if (result.msg === "Login success") {
  //         //    showToastWithGravity("Sucess");
  //         //    handleAddTodo(result.user_id);
  //         //
  //         //    clearInterval(intervalId);
  //         //    setIntervalId(null);
  //         //    setTimerStarted(false);

  //         // // pauseTimer(true);
  //         // navigation.navigate("botnav");
  //       });
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }, []);
  //habdle job seeker
  const handlejobseeker = () => {
    dispatch1({ type: "RESET1" });
    dispatch2({ type: "RESET" });
    dispatch({ type: "im_job_seeker" });
    navigation.navigate("bottomhome");
  };
  const checktheusercondtiton = async (paras) => {
    const body = {};
    body.user_id = states.ID;
    body.userType = paras;
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
        return result;
      } else {
        return result;
      }
    } catch (error) {}
  };
  //handlejobprovider
  const handleJobProvider = async () => {
    dispatch({ type: "job_provider" });

    // checktheusercondtiton();
    const resultof = await checktheusercondtiton("job_provider_info");
    //

    if (resultof.result) {
      // dispatch({ type: "job_provider" });
      navigation.navigate("jobprovidebottamtab");
    } else {
      // dispatch({ type: "job_provider" });
      navigation.navigate("Jobmainselect", { screen: "post" });
    }
    // if (is_personal_provider || is_company_provider) {
    //   navigation.navigate("jobprovidebottamtab");
    // } else {
    //   navigation.navigate("Jobmainselect", { screen: "post" });
    // }
  };
  //handlerentalProvider
  const handleRentalProvider = async () => {
    // navigation.navigate("rentalproviderbottamtab");
    dispatch({ type: "im_Rental_provider" });

    // checktheusercondtiton();
    const resultof = await checktheusercondtiton("rental_provider_info");
    //

    if (resultof.result) {
      // dispatch({ type: "job_provider" });
      navigation.navigate("rentalproviderbottamtab", { screen: "post" });
    } else {
      // dispatch({ type: "job_provider" });
      navigation.navigate("providerform");
    }
    //Not needed belowww
    // if (is_personal_provider || is_company_provider) {
    //   navigation.navigate("jobprovidebottamtab");
    // } else {
    //   navigation.navigate("Jobmainselect", { screen: "post" });
    // }
  };
  //handleRentalseeker
  const handleRentalSeeker = () => {
    dispatch({ type: "im_Rental_seeker" });
    // navigation.navigate("rentalSeeker");
    navigation.navigate("rentalseekerbottamtab");
  };
  //
  // const userDetails = route.params.Details;
  //
  //
  // // const id = route.params.userId;
  //
  const [index, setIndex] = useState(0);
  const [imageData, setImageData] = useState([
    {
      src: { uri: "https://velai29.s3.ap-south-1.amazonaws.com/1/Ad.png" },
      title: "ChatGPT Image 1",
    },
    {
      src: { uri: "https://velai29.s3.ap-south-1.amazonaws.com/1/Ad2.png" },
      title: "ChatGPT Image 2",
    },
    {
      src: { uri: "https://velai29.s3.ap-south-1.amazonaws.com/1/Ad3.png" },
      title: "ChatGPT Image 3",
    },
    {
      src: { uri: "https://velai29.s3.ap-south-1.amazonaws.com/1/Ad4.png" },
      title: "ChatGPT Image 3",
    },
  ]);
  const [imageData2, setImageData2] = useState([
    {
      src: { uri: "https://velai29.s3.ap-south-1.amazonaws.com/1/AD11.png" },
      title: "ChatGPT Image 1",
    },
    {
      src: { uri: "https://velai29.s3.ap-south-1.amazonaws.com/1/AD12.png" },
      title: "ChatGPT Image 2",
    },
    {
      src: { uri: "https://velai29.s3.ap-south-1.amazonaws.com/1/AD13.png" },
      title: "ChatGPT Image 3",
    },
  ]);

  const CarouselItem = ({ item }) => {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={item.src}
          style={{
            resizeMode: "cover",
            width: "100%",
            height: "100%",
            borderRadius: 15,
          }}
        />
        {/* <Text
          style={{
            bottom: 16,
            fontSize: 50,
            marginTop: 20,
          }}
        >
          {item.title}
        </Text> */}
      </View>
    );
  };

  const CarouselItem2 = ({ item }) => {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={item.src}
          style={{
            resizeMode: "cover",
            width: "100%",
            height: "100%",
            borderRadius: 15,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#eefbff" }}>
      <StatusBar backgroundColor="#eefbff" barStyle="dark-content" />
      {/* <StatusBar backgroundColor="#eefbff" barStyle="dark-content" /> */}
      <Top />
      {/* <View
        style={{
          height: 60,
          width: "100%",
          position: "relative",
          backgroundColor: "#fff",
          flexDirection: "row",
          justifyContent: "flex-start",
          // alignItems: "center",
          // justifyContent: "center",
          // alignContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text>
            <AntDesign name="left" size={24} color="#333" />
          </Text>
          <Text
            style={{
              marginRight: 40,
              marginLeft: 5,
              width: 190,
              alignItems: "center",
              fontSize: 16,
              fontWeight: "400",
            }}
          >
            Adyar, Chennai
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "30%",
          }}
        >
          <Ionicons name="md-globe-outline" size={24} color="#333" />
          <Pressable>
            <Text style={{ marginLeft: 3, Text: 18, color: "#333" }}>EN</Text>
          </Pressable>
          <Pressable onPress={() => setisvoice(!isvoice)}>
            {isvoice ? (
              <MaterialCommunityIcons
                name="account-voice"
                size={24}
                color="#333"
              />
            ) : (
              <MaterialCommunityIcons
                name="account-voice-off"
                size={24}
                color="black"
              />
            )}
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("role1");
            }}
          >
            <Ionicons name="person-circle-sharp" size={25} color="black" />
          </Pressable>
        </View>
      </View> */}
      <ScrollView decelerationRate="fast" showsVerticalScrollIndicator={false}>
        {/* <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#eefbff",
          }}
        >
          <View
            style={{
              width: "84%",
              height: 35,
              // borderWidth: 1,
              // paddingLeft: 20,
              // margin: 5,

              justifyContent: "space-evenly",
              flexDirection: "row",
              borderRadius: 20,
              borderColor: "#d9d9d9",
              borderWidth: 0.5,
              // marginLeft: 200,
              // borderColor: "#707070",
              backgroundColor: "#fff",
              // marginHorizontal: 55,
              marginVertical: 15,
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <EvilIcons name="search" size={22} color="#707070" />
            </View>
            <TextInput
              value={search}
              underlineColorAndroid="transparent"
              placeholder={t("Search_here")}
              style={{
                marginRight: "15%",
                fontSize: language == "English" ? 12 : 10,
              }}
            />
            <View
              style={{
                marginLeft: 110,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="microphone" size={22} color="#707070" />
            </View>
          </View>
        </View> */}

        <View
          style={{
            backgroundColor: "#eefbff",
            flexDirection: "row",
            justifyContent: "space-evenly",
            borderColor: "transparent",
            // marginVertical: 50,
          }}
        >
          {/* <Pressable
            onPress={() =>
              navigation.navigate("post", {
                // userId: id,
                // Details: userDetails,
              })
            }
          > */}
          <TouchableHighlight
            onPress={() => handlejobseeker()}
            activeOpacity={0.6}
            underlayColor="#Eefbff"
            style={{
              height: 150,
              width: 150,
              // backgroundColor: "#FFFFFF",
              marginHorizontal: -5,
              marginVertical: 10,
              justifyContent: "center",
              alignItems: "center",
              // borderWidth: 1,
              // borderColor: "#A3A3A3",
              borderRadius: 30,
              alignContent: "center",
              position: "relative",
              shadowColor: "#846437",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 10,
              shadowRadius: 10.62,
              elevation: 10,
            }}
            // style={({ pressed }) => [
            //   {
            //     backgroundColor: pressed ? "#ddeef3" : "transparent",
            //     // height: "10%",
            //   },
            // ]}
          >
            <LinearGradient
              colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              useAngle={45}
              style={{
                height: 150,
                width: 150,
                // backgroundColor: "#FFFFFF",
                marginHorizontal: -5,
                marginVertical: 10,
                justifyContent: "center",
                alignItems: "center",
                // borderWidth: 1,
                // borderColor: "#A3A3A3",
                borderRadius: 30,
                alignContent: "center",
                position: "relative",
                // shadowColor: "#1F4C5B",
                // shadowOffset: {
                //   width: 0,
                //   height: 6,
                // },
                // shadowOpacity: 10,
                // shadowRadius: 5,
                // elevation: 8,
              }}
            >
              <View style={{}}>
                <Image
                  // resizeMode="contain"
                  source={require("../Maincategory/Categoryimage/mainjob.png")}
                  style={{
                    width: 60,
                    height: 60,
                  }}
                />
              </View>

              {/* <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: "600",
                }}
              >
                JOB SEEKER
              </Text> */}
              <Text
                style={{
                  fontSize: 15,
                  color: "#fff",
                  marginTop: 10,
                  fontWeight: "600",
                  shadowColor: "#846437",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 10,
                  shadowRadius: 10.62,
                  elevation: 10,
                }}
              >
                {t("GET_A")} {t("Job1")}
              </Text>
              {/* <Text
                style={{
                  fontSize: 15,
                  color: "#fff",
                  fontWeight: "600",
                }}
              ></Text> */}
            </LinearGradient>
          </TouchableHighlight>

          <TouchableHighlight
            // onPress={() =>
            //   navigation.navigate({
            //     // userId: id,
            //     // Details: userDetails,
            //   })
            // }
            onPress={
              () => handleJobProvider()
              // navigation.navigate("Jobmainselect", { screen: "post" })
            }
            activeOpacity={0.6}
            underlayColor="#Eefbff"
            style={{
              height: 150,
              width: 150,
              // backgroundColor: "#FFFFFF",
              marginHorizontal: -5,
              marginVertical: 10,
              justifyContent: "center",
              alignItems: "center",
              // borderWidth: 1,
              // borderColor: "#A3A3A3",
              borderRadius: 30,
              alignContent: "center",
              position: "relative",
              shadowColor: "#846437",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 10,
              shadowRadius: 10.62,
              elevation: 10,
            }}
          >
            <LinearGradient
              colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              useAngle={45}
              style={{
                height: 150,
                width: 150,
                backgroundColor: "#FFFFFF",
                marginHorizontal: -5,
                marginVertical: 10,
                justifyContent: "center",
                alignItems: "center",
                // borderWidth: 1,
                // borderColor: "#A3A3A3",
                borderRadius: 30,
                alignContent: "center",
                position: "relative",
                // shadowColor: "#1F4C5B",
                // shadowOffset: {
                //   width: 0,
                //   height: 6,
                // },
                // shadowOpacity: 10,
                // shadowRadius: 5,
                // elevation: 8,
              }}
            >
              <View style={{ marginLeft: "10%" }}>
                <Image
                  resizeMode="contain"
                  source={require("../Maincategory/Categoryimage/manager.png")}
                  style={{ width: 60, height: 60 }}
                />
              </View>
              {/* <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: "600",
                }}
              >
                JOB PROVIDER
              </Text> */}
              <Text
                style={{
                  fontSize: 15,
                  color: "#fff",
                  marginTop: 10,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {t("POST_A")}
                {t("Job2")}
              </Text>
              {/* <Text
                style={{
                  fontSize: 15,
                  color: "#fff",
                  fontWeight: "600",
                }}
              > */}
              {/* {t("provider")} */}
              {/* </Text> */}
            </LinearGradient>
          </TouchableHighlight>
        </View>

        <View
          style={{
            backgroundColor: "#eefbff",
            flexDirection: "row",
            justifyContent: "space-evenly",
            borderColor: "transparent",
          }}
        >
          <TouchableHighlight
            onPress={() => handleRentalSeeker()}
            activeOpacity={0.6}
            underlayColor="#Eefbff"
            style={{
              height: 150,
              width: 150,
              // backgroundColor: "#FFFFFF",
              marginHorizontal: -5,
              marginVertical: 10,
              justifyContent: "center",
              alignItems: "center",
              // borderWidth: 1,
              // borderColor: "#A3A3A3",
              borderRadius: 30,
              alignContent: "center",
              position: "relative",
              shadowColor: "#846437",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 10,
              shadowRadius: 10.62,
              elevation: 18,
            }}
          >
            <LinearGradient
              colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              useAngle={45}
              style={{
                height: 150,
                width: 150,
                backgroundColor: "#FFFFFF",
                marginHorizontal: -5,
                marginVertical: 8,
                justifyContent: "center",
                alignItems: "center",
                // borderWidth: 1,
                // borderColor: "#A3A3A3",
                borderRadius: 30,
                alignContent: "center",
                position: "relative",
                // shadowColor: "#1F4C5B",
                // shadowOffset: {
                //   width: 0,
                //   height: 6,
                // },
                // shadowOpacity: 10,
                // shadowRadius: 5,
                // elevation: 8,
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../Maincategory/Categoryimage/deal1.png")}
                style={{ width: 60, height: 60 }}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: "#fff",
                  marginTop: 10,
                  fontWeight: "600",
                }}
              >
                {t("Rental1")}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#fff",
                  fontWeight: "600",
                }}
              >
                {t("Seeker")}
              </Text>
            </LinearGradient>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => handleRentalProvider()}
            activeOpacity={0.6}
            underlayColor="#Eefbff"
            style={{
              height: 150,
              width: 150,
              // backgroundColor: "#FFFFFF",
              marginHorizontal: -5,
              marginVertical: 10,
              justifyContent: "center",
              alignItems: "center",
              // borderWidth: 1,
              // borderColor: "#A3A3A3",
              borderRadius: 30,
              alignContent: "center",
              position: "relative",
              shadowColor: "#846437",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 10,
              shadowRadius: 10.62,
              elevation: 18,
            }}
          >
            <LinearGradient
              colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              useAngle={45}
              style={{
                height: 150,
                width: 150,
                backgroundColor: "#FFFFFF",
                marginHorizontal: -5,
                marginVertical: 8,
                justifyContent: "center",
                alignItems: "center",
                // borderWidth: 1,
                // borderColor: "#A3A3A3",
                borderRadius: 30,
                alignContent: "center",
                position: "relative",
                // shadowColor: "#1F4C5B",
                // shadowOffset: {
                //   width: 0,
                //   height: 6,
                // },
                // shadowOpacity: 10,
                // shadowRadius: 5,
                // elevation: 8,
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../Maincategory/Categoryimage/deal.png")}
                style={{ width: 60, height: 60 }}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: "#fff",
                  marginTop: 10,
                  fontWeight: "600",
                }}
              >
                {t("Rental1")}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#fff",
                  fontWeight: "600",
                }}
              >
                {t("provider")}
              </Text>
            </LinearGradient>
          </TouchableHighlight>
        </View>

        {/* <Image
            resizeMode="contain"
            source={require("../../images/Ad1.png")}
            style={{ width: "100%", height: "100%" }}
          /> */}
        <View
          style={{
            height: "8%",
            backgroundColor: "#eefbff",
            marginTop: "3%",
            alignItems: "center",
            // paddingTop: "3%",
          }}
        >
          <Carousel
            data={imageData2}
            autoPlay={true}
            renderItem={({ item, index }) => (
              <CarouselItem2 item={item} index={index} />
            )}
            height={55}
            width={324}
            style={{ backgroundColor: "#eefbff", borderRadius: 15 }}
            inactiveSlideScale={2}
            autoplayInterval={5000}
          />
        </View>
        <View
          style={{
            backgroundColor: "#eefbff",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableHighlight
            onPress={() =>
              phonenumber == "+918825848880"
                ? navigation.navigate("Mainjob")
                : navigation.navigate("JobGov")
            }
            activeOpacity={0.6}
            underlayColor="#Eefbff"
            style={{
              height: 100,
              width: 100,
              backgroundColor: "#FFFFFF",
              marginHorizontal: 5,
              marginVertical: 20,
              justifyContent: "center",
              alignItems: "center",
              // borderWidth: 1,
              // borderColor: "#A3A3A3",
              borderRadius: 20,
              alignContent: "center",
              position: "relative",
              shadowColor: "#846437",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 10,
              shadowRadius: 10.62,
              elevation: 18,
            }}
          >
            <LinearGradient
              colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              useAngle={45}
              style={{
                height: 100,
                width: 100,
                backgroundColor: "#FFFFFF",
                marginHorizontal: 5,
                marginVertical: 20,
                justifyContent: "center",
                alignItems: "center",
                // borderWidth: 1,
                // borderColor: "#A3A3A3",
                borderRadius: 20,
                alignContent: "center",
                position: "relative",
                // shadowColor: "#000000",
                // shadowOffset: {
                //   width: 0,
                //   height: 2,
                // },
                // shadowOpacity: 0.2,
                // shadowRadius: 5.62,
                // elevation: 8,
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../../images/government.png")}
                style={{
                  width: 40,
                  height: 40,
                  paddingBottom: 50,
                  marginTop: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: "#fff",
                  fontWeight: "500",
                }}
              >
                {t("Government")}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#fff",
                  fontWeight: "500",
                }}
              >
                {t("jobs")}
              </Text>
              {/* <Text
              style={{
                fontSize: 15,
                color: "#fff",
                fontWeight: "600",
              }}
            >
              PROVIDER
            </Text> */}
            </LinearGradient>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              // phonenumber == "+918825848880"
              //   ? navigation.navigate("shortTImeAD")
              navigation.navigate("Freelance");
              // Alert.alert(
              //   "Freelance",
              //   "You will soon receive details about the services."
              // );
            }}
            activeOpacity={0.6}
            underlayColor="#Eefbff"
            style={{
              height: 100,
              width: 100,
              marginHorizontal: 5,
              marginVertical: 20,
              justifyContent: "center",
              alignItems: "center",
              // borderWidth: 1,
              // borderColor: "#A3A3A3",
              borderRadius: 20,
              alignContent: "center",
              position: "relative",
              shadowColor: "#846437",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 10,
              shadowRadius: 10.62,
              elevation: 18,
            }}
          >
            <LinearGradient
              colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              useAngle={45}
              style={{
                height: 100,
                width: 100,
                marginHorizontal: 5,
                marginVertical: 20,
                justifyContent: "center",
                alignItems: "center",
                // borderWidth: 1,
                // borderColor: "#A3A3A3",
                borderRadius: 20,
                alignContent: "center",
                position: "relative",
                // shadowColor: "#000000",
                // shadowOffset: {
                //   width: 0,
                //   height: 2,
                // },
                // shadowOpacity: 0.2,
                // shadowRadius: 5.62,
                // elevation: 8,
              }}
            >
              <Image
                resizeMode="contain"
                style={{ width: 40, height: 40, marginBottom: 5 }}
                source={require("../../images/freelance.png")}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: "#fff",
                  fontWeight: "500",
                }}
              >
                {console.log(phonenumber)}

                {t("Freelance")}
              </Text>
              {/* <Text
              style={{
                fontSize: 15,
                color: "#fff",
                fontWeight: "600",
              }}
            >
              PROVIDER
            </Text> */}
            </LinearGradient>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate("Insurance");
              // Alert.alert(
              //   "Insurance",
              //   "You will soon receive details about the services."
              // );
            }}
            activeOpacity={0.6}
            underlayColor="#Eefbff"
            style={{
              height: 100,
              width: 100,
              // backgroundColor: "#FFFFFF",
              marginHorizontal: 5,
              marginVertical: 20,
              justifyContent: "center",
              alignItems: "center",
              // borderWidth: 1,
              // borderColor: "#A3A3A3",
              borderRadius: 20,
              alignContent: "center",
              position: "relative",
              shadowColor: "#846437",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 10,
              shadowRadius: 10.62,
              elevation: 18,
            }}
          >
            <LinearGradient
              colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              useAngle={45}
              style={{
                height: 100,
                width: 100,
                // backgroundColor: "#FFFFFF",
                marginHorizontal: 5,
                marginVertical: 20,
                justifyContent: "center",
                alignItems: "center",
                // borderWidth: 1,
                // borderColor: "#A3A3A3",
                borderRadius: 20,
                alignContent: "center",
                position: "relative",
                // shadowColor: "#1F4C5B",
                // shadowOffset: {
                //   width: 0,
                //   height: 6,
                // },
                // shadowOpacity: 10,
                // shadowRadius: 5,
                // elevation: 8,
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../Maincategory/Categoryimage/Saveenergy.png")}
                style={{
                  width: 40,
                  height: 40,
                  marginBottom: 5,
                }}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: "#fff",
                  fontWeight: "500",
                }}
              >
                {t("Insurance")}
              </Text>
              {/* <Text
              style={{
                fontSize: 15,
                color: "#fff",
                fontWeight: "600",
              }}
            >
              PROVIDER
            </Text> */}
            </LinearGradient>
          </TouchableHighlight>
        </View>

        <View
          style={{
            height: 240,
            width: "100%",
            backgroundColor: "#eefbff",
            marginTop: "1%",
            alignItems: "center",
          }}
        >
          <Carousel
            data={imageData}
            autoPlay={true}
            renderItem={({ item, index }) => (
              <CarouselItem item={item} index={index} />
            )}
            height={200}
            width={324}
            style={{ backgroundColor: "#fff", borderRadius: 15 }}
            inactiveSlideScale={2}
            autoplayInterval={5000}
          />
        </View>
      </ScrollView>
      <View style={{ height: "8%" }}></View>
    </SafeAreaView>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eefbff",
  },
});

//make this component available to the app
