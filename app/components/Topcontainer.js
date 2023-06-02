import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import { useSelector } from "react-redux";
import { AuthContext } from "../../App";
export default function Top() {
  //To pass the location
  const [location, setLocation] = useState(null);
  const [currlocation, setcurrLocation] = useState(null);
  const [currlocation1, setcurrLocation1] = useState(null);
  const [loading, setiloading] = useState(true);
  const navigation = useNavigation();
  const [isvoice, setisvoice] = useState(true);
  const myIDnumber = useSelector((state) => state.ID);
  const lang = useSelector((state) => state.lang);
  const { state, dispatch } = useContext(AuthContext);
  const toast = () => {
    //function to make Toast With Duration
    ToastAndroid.show(
      "Voice Assistant - Our new features are just around the corner",

      ToastAndroid.CENTER
    );
  };
  //useeffect
  const [location1, setLocation1] = useState(null);
  const [loading1, setloading1] = useState(true);
  // to get the permission we use UseEffect Hook
  useEffect(() => {
    //getting a user Location takes time so i need to wait so i make a async function
    const getPermission = async () => {
      //we use foreround permission for gettin Permission inside the app
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      //To get the current Location
      let CurrentLocation = await Location.getCurrentPositionAsync({});
      setcurrLocation(CurrentLocation);
      const reverseGeocodeAddress = await Location.reverseGeocodeAsync({
        longitude: CurrentLocation.coords.longitude,
        latitude: CurrentLocation.coords.latitude,
      });

      setLocation1(reverseGeocodeAddress);
      setloading1(false);
      if (location1) {
        dispatch({
          type: "Change_Country",
          payload: location1[0].isoCountryCode,
        });
      }

      // if (location) {
      //
      //   setloading(false);
      // }
    };
    getPermission();
  }, []);
  useEffect(() => {
    const getPermission = async () => {
      //we use foreround permission for gettin Permission inside the app
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Please give permissions to acces the Location");
        return;
      }
      //To get the current Location
      let CurrentLocation = await Location.getCurrentPositionAsync({});
      dispatch({ type: "Set_coords", payload: CurrentLocation });
      givelocation(
        CurrentLocation.coords.latitude,
        CurrentLocation.coords.longitude
      );
    };
    getPermission();
  }, []);

  //to get the permission we use UseEffect Hook
  useEffect(() => {
    //getting a user Location takes time so i need to wait so i make a async function
    const getPermission = async () => {
      //we use foreround permission for gettin Permission inside the app
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Please give permissions to acces the Location");
        return;
      }
      console.log(state.location);
      //To get the current Location
      let CurrentLocation = await Location.getCurrentPositionAsync({});
      dispatch({ type: "Set_coords", payload: CurrentLocation });
      // givelocation(
      //   CurrentLocation.coords.latitude,
      //   CurrentLocation.coords.longitude
      // );
      setcurrLocation1(CurrentLocation);

      const location23 = async () =>
        await Location.watchPositionAsync({}, async (CurrentLocation) => {
          const { latitude, longitude } = CurrentLocation.coords;
          // Reverse geocode the coordinates to get address data
          const addressData = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });
          // Set the location data to state
          console.log("hello address");
          console.log(addressData);
          console.log(addressData[0].district);
          dispatch({
            type: "Set_Location",
            payload: `${addressData[0].district}, ${addressData[0].city},${addressData[0].region}.`,
          });
          // console.log(location);
          setLocation(addressData);
        });
      location23();
      // location23();
      // const reverseGeocodeAddress = await Location.reverseGeocodeAsync({
      //   longitude: CurrentLocation.coords.longitude,
      //   latitude: CurrentLocation.coords.latitude,
      // });
      // console.log("im at the scond use Efffect");
      // setLocation(reverseGeocodeAddress);
      // if (
      //   (location &&
      //     location[0].district &&
      //     location[0].city &&
      //     location[0].region) ||
      //   state.location != null
      // ) {
      //   setiloading(false);
      //   if (Object.keys(state.coords).length > 0) {
      //     // givelocation(
      //     //   state.coords.coords.latitude,
      //     //   state.coords.coords.longitude
      //     // );
      //   }
      //   dispatch({
      //     type: "Set_Location",
      //     payload: `${location[0].district}, ${location[0].city},${location[0].region}.`,
      //   });
      // }\
      // console.log(location);
      if (location != null) {
        // setiloading(false);
        console.log("location fetched");
        console.log(location);
        // console.log(location["remove"]);
        dispatch({
          type: "Set_Location",
          payload: `${location[0].district}, ${location[0].city},${location[0].region}.`,
        });
        //   if (Object.keys(state.coords).length > 0) {
        //     // givelocation(
        //     //   state.coords.coords.latitude,
        //     //   state.coords.coords.longitude
        //     // );
        //   }
        //   dispatch({
        //     type: "Set_Location",
        //     payload: `${location[0].district}, ${location[0].city},${location[0].region}.`,
        //   });
      } else {
        console.log("location not  fetched");
      }
      // } else {
      //   givelocation(
      //     CurrentLocation.coords.latitude,
      //     CurrentLocation.coords.longitude
      //   );
      // }
    };

    getPermission();
  }, []);
  //for gett the accurate values we need to change the dependency array value to "location"
  const givelocation = async (paras1, paras2) => {
    const body = {};
    body.user_id = myIDnumber;
    body.latitude = paras1;
    body.longitude = paras2;

    try {
      await fetch("http://103.174.10.108:5002/api/location_update", {
        method: "PUT",
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
          console.log("Im at the right corner");
          console.log(result);

          //  dispatch({
          //    type: "Loged_In",
          //    payload: result.user_id,
          //  });
          //  if (result.msg === "Login success") {
          //    showToastWithGravity("Sucess");
          //    handleAddTodo(result.user_id);
          //
          //    clearInterval(intervalId);
          //    setIntervalId(null);
          //    setTimerStarted(false);
          // // pauseTimer(true);
          // navigation.navigate("botnav");
        });
    } catch (error) {
      console.warn(error);
    }
  };
  // if (loading && state.location == "")
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
      <View style={styles.leftSide}>
        <View style={{ marginLeft: 8, flexDirection: "row", marginTop: -5 }}>
          <Image
            resizeMode="contain"
            source={require("../images/velailogo.png")}
            style={{ width: 35, height: 35 }}
          />
          <View style={{ marginTop: 20, marginLeft: -5 }}>
            {loading1 ? (
              <>
                <CountryFlag isoCode={"IN"} size={10} />
              </>
            ) : (
              <CountryFlag isoCode={state.CountryCode} size={10} />
            )}
          </View>

          {/* <Text>
            <Ionicons name="ios-pin-sharp" size={22} color="#333" />
          </Text> */}
        </View>
        <View style={{ marginLeft: "3%" }}>
          {loading && state.location == "" ? (
            <Text
              style={{
                fontSize: 10,
                fontWeight: "500",
                color: "#545454",
                marginLeft: 2,
              }}
            ></Text>
          ) : (
            <Text
              style={{
                // backgroundColor: "red",
                fontSize: 10,
                fontWeight: "500",
                color: "#545454",
                marginLeft: 2,
                lineHeight: 15,
                width: 120,
              }}
            >
              {state.location == ""
                ? ""
                : `${
                    state.location.split(",")[0] == "null"
                      ? ""
                      : state.location.split(",")[0]
                  },${
                    state.location.split(",")[1] == "null"
                      ? ""
                      : state.location.split(",")[1]
                  },${state.location.split(",")[0] == "null" ? "" : "\n"}${
                    state.location.split(",")[2] == "null"
                      ? ""
                      : state.location.split(",")[2]
                  }`}
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: 20,
          width: "40%",
        }}
      >
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
        <TouchableOpacity onPress={() => navigation.navigate("languagedropee")}>
          <View
            style={{
              flexDirection: "row",
              marginRight: 20,

              alignItems: "center",
            }}
          >
            <Ionicons name="md-globe-outline" size={22} color="#56909D" />
            <Text style={{ Text: 18, color: "#545454" }}>{lang}</Text>
          </View>
        </TouchableOpacity>
        <Pressable onPress={() => setisvoice(!isvoice)}>
          {isvoice ? (
            <TouchableOpacity
              // onPress={() => {
              //   Alert.alert(
              //     "Voice Assistant",
              //     "Our new features are just around the corner."
              //   );
              // }}
              onPress={toast}
            >
              <MaterialCommunityIcons
                name="account-voice"
                size={22}
                color="#56909D"
              />
            </TouchableOpacity>
          ) : (
            <MaterialCommunityIcons
              name="account-voice-off"
              size={22}
              color="#56909D"
            />
          )}
        </Pressable>
        {/* <Pressable
          onPress={() => {
            navigation.navigate("mainprofile");
          }}
        >
          <Ionicons name="person-circle-sharp" size={35} color="black" />
        </Pressable> */}
      </View>
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
    width: "100%",
    position: "relative",
    backgroundColor: "#eefbff",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftSide: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
