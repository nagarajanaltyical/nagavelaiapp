import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";

import { AuthContext } from "../../App";
export default function Top2() {
  //to make use of the state for save the user loaction
  const { state, dispatch } = useContext(AuthContext);

  const user_details = useSelector((state) => state.user_details_given);
  // const states = useSelector((state) => state);

  //To pass the location
  const [location, setLocation] = useState(null);
  const [loading, setiloading] = useState(true);
  const navigation = useNavigation();
  const [isvoice, setisvoice] = useState(true);
  const states = useSelector((state) => state);
  const [propic, setpropic] = useState("");
  const checktheProfilepic = async () => {
    const body = {};
    body.user_id = states.ID;
    body.userType = "job_seeker_info";
    try {
      const response = await fetch(
        `http://103.174.10.108:5002/api/user_profile_pic`,
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

      if (result.profilepic != "") {
        setpropic(result.profilepic);
        // setloading1(false)
      } else {
        setpropic("");
      }
    } catch (error) {}
  };
  //check the userpic
  useEffect(() => {
    checktheProfilepic();
  }, []);

  const checktheusercondtiton = async () => {
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
        navigation.navigate("mainprofile");
      } else {
        navigation.navigate("Userprofile", {
          education_given: false,
          experience_given: false,
        });
      }
    } catch (error) {}
  };
  // //to get the permission we use UseEffect Hook
  // useEffect(() => {
  //   //getting a user Location takes time so i need to wait so i make a async function
  //   const getPermission = async () => {
  //     //we use foreround permission for gettin Permission inside the app
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //
  //       return;
  //     }
  //     //To get the current Location
  //     let CurrentLocation = await Location.getCurrentPositionAsync({});
  //     const reverseGeocodeAddress = await Location.reverseGeocodeAsync({
  //       longitude: CurrentLocation.coords.longitude,
  //       latitude: CurrentLocation.coords.latitude,
  //     });
  //     setLocation(reverseGeocodeAddress);
  //     if (
  //       (location &&
  //         location[0].district &&
  //         location[0].city &&
  //         location[0].region) ||
  //       state.location != null
  //     ) {
  //       setiloading(false);
  //       dispatch({
  //         type: "Set_Location",
  //         payload: `${location[0].district},${location[0].city},${location[0].region}`,
  //       });
  //     }
  //   };

  //   getPermission();
  // }, []);
  return (
    <View style={styles.topContainer}>
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
      {/* <View style={styles.leftSide}> */}
      {/* <View style={{ marginLeft: 7 }}>
          <Text>
            <Ionicons name="ios-pin-sharp" size={24} color="black" />
          </Text>
        </View>
        <View>
          {loading && state.location == "" ? (
            <Text
              style={{
                fontSize: 10,
                fontWeight: "500",
                color: "#333",
                marginLeft: 2,
              }}
            >
              Loading...
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 10,
                fontWeight: "500",
                color: "#333",
                marginLeft: 2,

                width: 100,
              }}
            >
              {state.location == ""
                ? (location[0].district, location[0].city, location[0].region)
                : state.location}
            </Text>
          )}
        </View> */}
      {/* </View> */}
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "40%",
        }}
      > */}
      {/* <View>
          <Pressable>
            <MaterialCommunityIcons
              name="account-voice"
              size={24}
              color="black"
            />
          </Pressable>
        </View> */}
      {/* <View style={{ justifyContent: "space-evenly" }}> */}
      {/* <DropDownLanguage2 /> */}
      {/* <TouchableOpacity onPress={() => navigation.navigate("languagedropee")}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="md-globe-outline" size={22} color="#333" />
            <Pressable>
              <Text style={{ Text: 18, color: "#333" }}>EN</Text>
            </Pressable>
          </View>
        </TouchableOpacity> */}
      {/* <Pressable onPress={() => setisvoice(!isvoice)}>
          {isvoice ? (
            <MaterialCommunityIcons
              name="account-voice"
              size={22}
              color="#333"
            />
          ) : (
            <MaterialCommunityIcons
              name="account-voice-off"
              size={22}
              color="#333"
            />
          )}
        </Pressable> */}
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#Eefbff"
        onPress={() => navigation.navigate("Rentalprovidernotifi")}
      >
        <Image
          resizeMode="contain"
          source={require("../images/notification.png")}
          style={{
            width: 25,
            height: 25,
            marginTop: 2,
            marginRight: 14,
            // borderColor: "#1e5966",
            // borderWidth: 0.5,
          }}
        />
      </TouchableHighlight>
      <Pressable
        style={{}}
        onPress={() => {
          checktheusercondtiton();

          // if (user_details) {
          //   navigation.navigate("mainprofile");
          // } else {
          //   navigation.navigate("Userprofile");
          // }
        }}
      >
        {propic == "" ? (
          <Image
            resizeMode="contain"
            source={require("../images/account.png")}
            style={{
              width: 35,
              height: 35,
              borderRadius: 40 / 2,
              // borderColor: "#1e5966",
              // borderWidth: 0.5,
            }}
          />
        ) : (
          <Image
            style={{
              width: 35,
              height: 35,
              borderRadius: 40 / 2,
              borderColor: "#1e5966",
              borderWidth: 0.5,
            }}
            source={{
              uri: propic,
            }}
          />
        )}
      </Pressable>
      {/* </View> */}
      {/* <View style={{ marginTop: -12 }}> */}
      {/* <DropDownRole /> */}
      {/* <Pressable onPress={() => navigation.navigate("register")}>
            <Image
              style={{ height: 40, width: 20 }}
              source={{
                uri: "https://reactnative.dev/img/tiny_logo.png",
              }}
            />
          </Pressable> */}
      {/* </View> */}
    </View>
    // </View>
  );
}
const styles = StyleSheet.create({
  topContainer: {
    // flexDirection: "row",
    // backgroundColor: "#fafafa",
    // flex: 0.1,
    // justifyContent: "space-between",
    // alignItems: "center",
    // padding: 5,
    height: 60,
    // width: "15%",
    // position: "relative",
    backgroundColor: "#eefbff",
    alignItems: "center",
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  leftSide: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
