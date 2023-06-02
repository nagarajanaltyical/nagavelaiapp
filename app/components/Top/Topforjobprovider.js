import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useState, useEffect } from "react";
// import DropDownRole from "./dropdown/dropdownRole";
// import * as Location from "expo-location";
// import DropDownLanguage from "./dropdown/DropDownLanguage";
// import DropDownLanguage2 from "./dropdown/DropDownlanguage2";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
export default function Topforjobprovider() {
  //To pass the location
  //   const [location, setLocation] = useState(null);
  //   const [loading, setiloading] = useState(true);
  const navigation = useNavigation();
  const [isvoice, setisvoice] = useState(true);
  const states = useSelector((state) => state);

  //handleprofilepic
  //handlepersonprofileclick
  const [propic, setpropic] = useState("");
  const checkthuserpic = async () => {
    const body = {};
    body.user_id = states.ID;
    body.userType = !states.job_provider_info
      ? !states.rental_provider_info
        ? "rental_seeker_info"
        : "rental_provider_info"
      : "job_provider_info";
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
  useEffect(() => {
    checkthuserpic();
  }, []);
  //handlepersonprofileclick
  const checktheusercondtiton = async () => {
    const body = {};
    body.user_id = states.ID;
    body.userType = !states.job_provider_info
      ? !states.rental_provider_info
        ? "rental_seeker_info"
        : "rental_provider_info"
      : "job_provider_info";
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
      } else if (result.userType === "job_provider_info") {
        navigation.navigate("Jobmainselect ");
      } else if (result.userType === "rental_provider_info") {
        navigation.navigate("providerform");
      } else {
        navigation.navigate("rentalSeeker");
      }
    } catch (error) {}
  };
  //to get the permission we use UseEffect Hook
  //   useEffect(() => {
  //     //getting a user Location takes time so i need to wait so i make a async function
  //     const getPermission = async () => {
  //       //we use foreround permission for gettin Permission inside the app
  //       let { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== "granted") {
  //
  //         return;
  //       }
  //       //To get the current Location
  //       let CurrentLocation = await Location.getCurrentPositionAsync({});
  //       const reverseGeocodeAddress = await Location.reverseGeocodeAsync({
  //         longitude: CurrentLocation.coords.longitude,
  //         latitude: CurrentLocation.coords.latitude,
  //       });
  //       setLocation(reverseGeocodeAddress);
  //       if (location) {
  //         setiloading(false);
  //       }
  //     };
  //     getPermission();
  //   }, [location]);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        // width: "40%",
      }}
    >
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#Eefbff"
        onPress={() => navigation.navigate("Rentalprovidernotifi")}
      >
        <Image
          resizeMode="contain"
          source={require("../../images/notification.png")}
          style={{
            width: 25,
            height: 25,
            marginTop: 2,
            marginRight: 9,
            // borderColor: "#1e5966",
            // borderWidth: 0.5,
          }}
        />
      </TouchableHighlight>
      <Pressable
        onPress={() => {
          checktheusercondtiton();
          // if (is_rental_details_given) {
          //   navigation.navigate("mainprofile");
          // } else {
          //   navigation.navigate("rentalSeeker");
          // }
        }}
      >
        {propic == "" ? (
          <Image
            resizeMode="contain"
            source={require("../../images/account.png")}
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
    </View>
  );
}
const styles = StyleSheet.create({
  topContainer: {
    // flexDirection: "row",
    // backgroundColor: "#FAFAFA",
    // flex: 0.1,
    // justifyContent: "space-between",
    // alignItems: "center",
    // padding: 5,
    height: 60,
    width: "100%",
    position: "relative",
    backgroundColor: "#fff",
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
