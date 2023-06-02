import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { View, Text, Pressable, Keyboard, ToastAndroid } from "react-native";
import OTPInput from "../components/otp/otpInput";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { ButtonContainer, ButtonText } from "../components/otp/styles";

export default function OtpScreen({ route }) {
  const navigation = useNavigation();

  // const [otpCode, setotpCode] = useState("");
  const [finalotp, setfinalotp] = useState("");
  const [ispinready, setispinready] = useState(false);
  const [ispinCorrect, setispincorrect] = useState(false);
  const showToastWithGravity = (parans) => {
    ToastAndroid.showWithGravity(parans, ToastAndroid.SHORT, ToastAndroid.TOP);
  };
  const maximumCodeLength = 4;
  const codeof = "1111";
  // const mobile = route.params;
  //
  // if (ispinready) {
  //   setfinalotp(otpCode);
  //   if (otpCode.length == 4) {
  //     setispincorrect(true);
  //     setispinready(false);
  //   } else {
  //
  //     setispincorrect(false);
  //     setispinready(false);
  //   }
  // }
  const validateotp = async () => {
    //   try {
    //
    //     if (mobile.mobile.length > 10) {
    //       const body = { number: mobile.mobile, otp: finalotp };
    //
    //       const response = await fetch(
    //         "http://192.168.1.7:5000/sms/verification",
    //         {
    //           method: "POST", // *GET, POST, PUT, DELETE, etc.
    //           mode: "cors", // no-cors, *cors, same-origin
    //           cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //           credentials: "same-origin", // include, *same-origin, omit
    //           headers: {
    //             "Content-Type": "application/json",
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //           },
    //           body: JSON.stringify(body), // body data type must match "Content-Type" header
    //         }
    //       )
    //         .then((response) => response.json())
    //         .then((result) => {
    //
    //           if (result.sucess == 1) {
    //             showToastWithGravity("sucess");
    //             navigation.navigate("role");
    //           } else {
    //             showToastWithGravity("incorrect otp");
    //           }
    //         });
    //     } else {
    //       alert("Invalid phone number");
    //     }
    //   } catch (error) {
    //     console.warn(error);
    //   }
  };
  return (
    <View style={styles.main}>
      <View style={styles.upperContainer}>
        <View style={styles.titleContainer}>
          <Text style={{ fontSize: 20, fontWeight: "400" }}>Enter OTP </Text>
        </View>

        <View
          style={{
            marginHorizontal: 30,
            borderColor: "#fff",
            marginTop: 20,
            width: 500,
            alignItems: "center",
            paddingLeft: 60,
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
      </View>
      <Text
        style={{
          marginHorizontal: 160,
          fontSize: 15,
          fontWeight: "400",
          color: "#FFC72A",
          marginTop: 20,
        }}
      >
        0.59 Sec
      </Text>
      <View
        style={{
          height: 49,
          width: 290,
          backgroundColor: "#FFC72A",
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 50,
          borderRadius: 10,
          marginTop: 30,
        }}
      >
        <Pressable
          // disabled={!ispinCorrect}
          onPress={() => navigation.navigate("SelectCategory")}
          // onPress={() => validateotp()}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Request OTP</Text>
        </Pressable>
      </View>
      <Text
        style={{
          marginHorizontal: 90,
          fontSize: 15,
          fontWeight: "400",
          marginTop: 20,
        }}
      >
        Don’t receive a code?
        <Text
          style={{
            color: "#0047FF",
          }}
        >
          Resend
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
