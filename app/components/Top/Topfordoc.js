import { View, Text, StyleSheet, Pressable, Image } from "react-native";
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

import { FontAwesome5 } from "@expo/vector-icons";
export default function Topfordoc() {
  //To pass the location
  //   const [location, setLocation] = useState(null);
  //   const [loading, setiloading] = useState(true);
  const navigation = useNavigation();
  const [isvoice, setisvoice] = useState(true);

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
      <Pressable
        onPress={() => {
          navigation.navigate("mainprofile");
        }}
      >
        <Ionicons name="person-circle-sharp" size={35} color="black" />
      </Pressable>
    </View>
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
