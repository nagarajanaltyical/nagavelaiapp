import React, { useContext } from "react";
import { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ToastAndroid,
  Pressable,
  Keyboard,
  Alert,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
// import { TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { AuthContext } from "../../App";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieViewforing from "../Lottie/LottieforApp";
import PhoneInput from "react-native-phone-number-input";

import { parsePhoneNumber } from "react-native-phone-number-input";
//for getting the state of a reducer and make use  of dispatch
import { useSelector, useDispatch } from "react-redux";

import Top from "../components/Topcontainer";
// import { isValidPhoneNumber } from "react-phone-number-input";
import { LinearGradient } from "expo-linear-gradient";
import OtpScreen from "./Otpscreen";
import OTPInput from "../components/otp/otpInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { number } from "yup";
// import { useContext } from "react";
import { LocalizationContext } from "../../App";
export default function Mobillogin({ route, navigation }) {
  const [mobilenumber, setmobilenumber] = useState("");
  const { t, language, setlanguage } = useContext(LocalizationContext);
  // setlanguage()
  const states = useSelector((state) => state);

  useEffect(() => {
    setlanguage(states.lang);
  }, [states.lang]);
  // console.log("imm at he ");
  console.log(language);
  const { state, dispatch } = useContext(AuthContext);
  const [otpCode, setotpCode] = useState("");
  const [location, setLocation] = useState(null);
  const [finalotp, setfinalotp] = useState("");
  const [ispinready, setispinready] = useState(false);
  const [ispinCorrect, setispincorrect] = useState(false);
  const [isotpFound, setisotpFound] = useState(false);
  const maximumCodeLength = 4;
  const codeof = "1111";
  //for getting the states
  const todoList = useSelector((state) => state.IS_user_login);
  const myIDnumber = useSelector((state) => state.ID);
  const Reduxdispatch = useDispatch();

  // to mAKE THE user id
  const handleAddTodo = (paras) => {
    Reduxdispatch({ type: "IS_USERIN", payload: paras });
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@data", jsonValue);
      alert("Data saved");
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    getData();
  }, []);

  async function requestLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      // Location permission granted, proceed with further actions
      // ...
      let CurrentLocation = await Location.getCurrentPositionAsync({});
      dispatch({ type: "Set_coords", payload: CurrentLocation });
    } else {
      await Location.requestForegroundPermissionsAsync();
      // Location permission denied, show an alert
      Alert.alert(
        "Location Permission Required",
        "This app requires location permission to proceed further. Please go to app settings and grant location permission.",
        [
          {
            text: "OK",
            onPress: () => {
              // Open app settings when 'OK' is pressed
              Linking.openSettings();
            },
          },
        ],
        { cancelable: false }
      );
    }
  }

  // const getLocation = async () => {
  //   //we use foreround permission for gettin Permission inside the app
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status === "granted") {
  //     // Location permission granted, proceed with further actions
  //     // ...
  //     let CurrentLocation = await Location.getCurrentPositionAsync({});
  //     dispatch({ type: "Set_coords", payload: CurrentLocation });
  //   } else {
  //     // Location permission denied, show an alert
  //     Alert.alert(
  //       "Location Permission Required",
  //       "This app requires location permission to proceed further. Please go to app settings and grant location permission.",
  //       [
  //         {
  //           text: "OK",
  //           onPress: () => {
  //             // Open app settings when 'OK' is pressed
  //             requestLocationPermission();
  //           },
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   }
  // };
  //   //To get the current Location

  //   // dispatch({ type: "Set_coords", payload: CurrentLocation });
  // };
  // get location
  useEffect(() => {
    // getting a user Location takes time so i need to wait so i make a async function
    // const getPermission = async () => {
    //   //we use foreround permission for gettin Permission inside the app
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   console.log(status);
    //   if (status !== "granted") {
    //     return;
    //   }
    //   ellse;
    //   //To get the current Location
    //   let CurrentLocation = await Location.getCurrentPositionAsync({});
    //   // dispatch({ type: "Set_coords", payload: CurrentLocation });
    // };

    requestLocationPermission();
  }, []);

  //get data
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@data");

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const [istick, setistick] = useState(true);

  const [isvoice, setisvoice] = useState(true);
  const showToastWithGravity = (parans) => {
    ToastAndroid.showWithGravity(parans, ToastAndroid.SHORT, ToastAndroid.TOP);
  };
  const handlenumber = (e) => {
    setmobilenumber(e);
  };
  const giveotp = async () => {
    try {
      if (mobilenumber.length > 10) {
        const body = { number: mobilenumber };
        const response = await fetch("http://103.174.10.108:5002/sms", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(body), // body data type must match "Content-Type" header
        })
          .then((response) => response.json())
          .then((result) => {
            if (result == true) {
              showToastWithGravity("sucess");
              navigation.navigate("Otpscreen", {
                mobile: mobilenumber,
              });
            }
          });
      } else {
        alert("Invalid phone number");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const [value, setValue] = useState("");
  const [valid, isvalid] = useState(false);
  const phoneInput = useRef(null);
  const [sucesss, setsucesss] = useState(false);
  const [seconds, setSeconds] = useState(120);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);
  function toggle() {
    setIsActive(!isActive);
  }
  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  const handleStart = async () => {
    // handleStart();
    const checkValid = phoneInput.current?.isValidNumber(value);

    isvalid(!checkValid);
    if (checkValid) {
      const body = {};
      body.number = mobilenumber;

      try {
        await fetch("http://103.174.10.108:5002/api/sms", {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(body), // body data type must match "Content-Type" header
        })
          .then((response) => response.json())
          .then((result) => {
            // console.log(result.updated);
            // console.log(location != null);
            // console.log(result);
            if (result) {
              showToastWithGravity("Sucess");
              setisotpFound(true);
              const id = setInterval(() => {
                setSeconds((seconds) => seconds - 1);
              }, 1000);
              setIntervalId(id);
              setTimerStarted(true);
            } else {
              alert(result);
            }
          });
      } catch (error) {
        console.warn(error);
      }
    }
  };
  useEffect(() => {
    if (seconds == 0) {
      Alert.alert("Timer", "Time is up!");

      clearInterval(intervalId);
      setIntervalId(null);
      setTimerStarted(false);
      showToastWithGravity("OTP expired");
      clearOTP();
      // setIsActive(false);
    }
  }, [seconds]);

  const handleStop = async () => {
    const value = {};
    // alert("hiiii");
    value.otp = otpCode;
    value.number = mobilenumber;
    // console.log(location.coords.latitude);
    // console.log(location.coords.longitude);
    // console.log(value);
    // value.latitude = await location.coords.latitude;
    // value.longitude = await location.coords.longitude;

    try {
      await fetch("http://103.174.10.108:5002/sms/verification", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(value), // body data type must match "Content-Type" header
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "Login success") {
            showToastWithGravity("Sucess");
            // <LottieViewforing paras="OTP" />;
            navigation.navigate("OTP");

            setTimeout(() => {
              handleAddTodo(result.user_id);
              clearInterval(intervalId);
              setIntervalId(null);
              setTimerStarted(false);
              navigation.navigate("onboard", { user_id: result.user_id });
            }, 4000);

            // // pauseTimer(true);
            // navigation.navigate("botnav");
          } else {
            showToastWithGravity("Error");
          }
        });
    } catch (error) {
      console.warn(error);
    }
  };
  const callLoti = () => {
    return <LottieViewforing paras="OTP" />;
  };
  const clearOTP = async () => {
    try {
      const body = {};
      body.number = mobilenumber;
      const response = await fetch("http://103.174.10.108:5002/invaild", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body), // body data type must match "Content-Type" header
      })
        .then((response) => response.json())
        .then((result) => console.log(result));
    } catch (error) {}
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#eefbff" }}>
      <StatusBar backgroundColor="#eefbff" barStyle="dark-content" />
      <View
        style={{
          flex: 0.1,
          height: "100%",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: 50,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("languagedropee")}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              // backgroundColor: "red",
              marginRight: 20,
            }}
          >
            <Ionicons name="md-globe-outline" size={22} color="#56909d" />
            <Pressable>
              <Text style={{ marginLeft: 3, fontSize: 13, color: "#545454" }}>
                {states.lang}
              </Text>
            </Pressable>
          </View>
        </TouchableOpacity>
        <View style={{ marginRight: -27 }}>
          <Pressable onPress={() => setisvoice(!isvoice)}>
            {isvoice ? (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Voice Assistant",
                    "Our new features are just around the corner."
                  );
                }}
              >
                <MaterialCommunityIcons
                  name="account-voice"
                  size={22}
                  color="#56909d"
                />
              </TouchableOpacity>
            ) : (
              <MaterialCommunityIcons
                name="account-voice-off"
                size={22}
                color="#333"
              />
            )}
          </Pressable>
        </View>
      </View>
      {/* <Top /> */}
      <View style={{ flex: 0.7, backgroundColor: "#eefbff" }}>
        {/* <Pressable
          onPress={() => navigation.navigate("Home")}
          style={{
            marginRight: 40,
            width: 320,
            marginLeft: 40,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Feather
            name="arrow-left"
            size={34}
            color="#333"
            style={{ marginLeft: -21 }}
          />
        </Pressable> */}
        <Text
          style={{
            color: "#1E5966",
            paddingRight: 50,
            paddingLeft: 15,
            marginLeft: 6,
            fontSize: 30,
            fontWeight: "700",
            top: 1,
          }}
        >
          {t("Hi")} !
        </Text>
        <Text
          style={{
            color: "#545454",
            paddingRight: 50,
            paddingLeft: 15,
            marginLeft: 6,
            fontSize: 18,
            fontWeight: "400",
            top: 1,
          }}
        >
          {t("Welcome")}
        </Text>
        {/* <View
        >
        </View> */}
        <Text
          style={{
            width: "100%",
            color: "#333",
            marginTop: 23,
            textAlign: "center",
            fontSize: 22,
            fontWeight: "500",
          }}
        >
          {t("Log_in")}
        </Text>
        <View
          style={{
            top: -10,
            justifyContent: "space-between",
            flexWrap: "nowrap",
            flexDirection: "row",
            marginLeft: 6,
          }}
        >
          <PhoneInput
            ref={phoneInput}
            defaultCode="IN"
            defaultValue={value}
            containerStyle={{
              width: "100%",
              height: 200,
              backgroundColor: "transparent",
            }}
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setmobilenumber(text);
            }}
            textContainerStyle={{
              backgroundColor: "#fff",
              height: 55,

              marginVertical: 30,
              borderRadius: 10,

              marginHorizontal: 10,
              padding: 10,
              borderColor: "#d9d9d9",
              borderWidth: 0.5,
            }}
            flagButtonStyle={{
              backgroundColor: "#fff",
              marginHorizontal: 10,
              marginVertical: 30,
              height: 55,
              borderRadius: 10,
              borderColor: "#d9d9d9",
              borderWidth: 0.5,
            }}
            autoFocus
          />
        </View>

        <View style={{ marginTop: -110 }}>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 20,
              marginBottom: 22,
            }}
          >
            <Pressable
              onPress={() => setistick(!istick)}
              style={{ marginTop: 1 }}
            >
              {istick ? (
                <MaterialIcons
                  name="check-box-outline-blank"
                  size={22}
                  color="#56909d"
                />
              ) : (
                <MaterialIcons name="check-box" size={22} color="#56909d" />
              )}
            </Pressable>
            <Text
              style={{
                fontSize: language == "English" ? 17 : 13,
                marginRight: 3,
                marginLeft: 5,
                color: "#333",
              }}
            >
              {t("i")}
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Termscondition");
              }}
            >
              <Text
                style={{
                  color: "#0047FF",
                  marginLeft: 5,
                  fontWeight: "500",
                  fontSize: language == "English" ? 17 : 13,
                  textDecorationLine: "underline",
                }}
              >
                {t("Terms_and_conditions")}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              // justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "500", color: "#333" }}>
              {t("Enter_OTP")}
            </Text>
          </View>
          <View
            style={{
              // marginHorizontal: 30,
              borderColor: "#fff",
              // marginTop: 20,
              alignContent: "center",
              width: "120%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable onPress={Keyboard.dismiss}>
              <OTPInput
                code={otpCode}
                setCode={setotpCode}
                maximumLength={maximumCodeLength}
                setispinready={setispinready}
              />
            </Pressable>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "400",
                color: "#1E5966",
                marginTop: 17,
              }}
            >
              {seconds} Sec
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LinearGradient
              colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
              style={{
                height: 49,
                width: 290,
                // marginHorizontal: 50,
                borderRadius: 10,
                opacity: mobilenumber.length > 1 && !istick ? 1 : 0.5,
                marginTop: 12,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              useAngle={45}
            >
              {!isotpFound ? (
                <TouchableOpacity
                  style={{
                    height: 49,
                    width: 290,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  // disabled={!ispinCorrect}
                  disabled={!(mobilenumber.length > 1 && !istick)}
                  onPress={() => handleStart()}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: "900", color: "#fff" }}
                  >
                    {t("Request_OTP")}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    height: 49,
                    width: 290,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={handleStop}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: "900", color: "#fff" }}
                  >
                    {t("Verify_OTP")}
                  </Text>
                </TouchableOpacity>
              )}
            </LinearGradient>
          </View>
          <View
            style={{
              fontSize: 15,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              fontWeight: "400",
              marginTop: 9,
            }}
          >
            <Text
              style={{
                // marginHorizontal: 90,
                fontSize: 15,
                // width: "100%",
                // fontWeight: "400",
                // marginTop: 20,
              }}
            >
              {t("Dont_receive_a_code")}?{/* {console.log(seconds)} */}
            </Text>

            <TouchableOpacity
              disabled={!seconds == 0}
              onPress={async () => {
                setotpCode("");

                const value = {};
                value.number = mobilenumber;

                try {
                  await fetch("http://103.174.10.108:5002/api/sms", {
                    method: "POST",
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                      "Content-Type": "application/json",
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(value), // body data type must match "Content-Type" header
                  })
                    .then((response) => response.json())
                    .then((result) => {
                      // console.log("")
                      console.log(result);
                      if (result) {
                        showToastWithGravity("Sucess");
                        setSeconds(60);
                        const id = setInterval(() => {
                          setSeconds((seconds) => seconds - 1);
                        }, 1000);
                        setIntervalId(id);
                        setTimerStarted(true);
                      } else {
                        showToastWithGravity("Error");
                      }
                    });
                } catch (error) {
                  console.warn(error);
                }
              }}
            >
              <Text
                style={{
                  color: seconds == 0 ? "#0047FF" : "grey",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // alignContent: "center",
                  fontSize: 15,
                  marginLeft: 10,
                  textDecorationLine: "underline",
                  // width:"100%",
                  fontWeight: "400",
                  // marginTop: 20,
                }}
              >
                {t("Resend")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    backgroundColor: "white",
  },
  icons: {
    alignContent: "center",
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  upperContainer: {
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  titleContainer: {
    marginHorizontal: 40,
  },
  exampleformat: {
    marginHorizontal: 42,
    width: 215,
    paddingBottom: 10,
  },
  LowerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
