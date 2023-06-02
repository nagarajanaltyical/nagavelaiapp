// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Pressable,
//   Button,
//   ToastAndroid,
// } from "react-native";
// import { SimpleLineIcons } from "@expo/vector-icons";
// import LandingSvgComponent from "../components/landinSvg";
// import { Ionicons } from "@expo/vector-icons";
// import { useState } from "react";
// import { useEffect } from "react";
// import { TextInput } from "react-native-paper";
// import { useContext } from "react";
// import { ScrollView } from "react-native";
// import { SafeAreaView } from "react-native";
// import * as Location from "expo-location";
// import { back } from "react-native/Libraries/Animated/Easing";
// import { LocalizationContext } from "../../App";
// import {
//   doSomethingWithInput,
//   changeLanguage,
//   getSelectedLanguage,
// } from "../util/util.js";
// import { LinearGradient } from "expo-linear-gradient";
// import { StatusBar } from "react-native";
// import DropDownLanguage from "../components/dropdown/DropDownLanguage";
// import SvgComponent from "../components/landinSvg";
// import { color } from "react-native-reanimated";
// import React from "react";

// export default function Landing({ navigation }) {
//   const { t, language, setlanguage } = useContext(LocalizationContext);
//   const [lang, setlang] = useState(null);

//   setlanguage(getSelectedLanguage());

//   function showToast(paras) {
//     ToastAndroid.show(paras, ToastAndroid.SHORT);
//   }
//   const [islogin, setislogin] = useState(true);
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [location, setLocation] = useState(null);
//   const [address, setaddress] = useState({});
//   const handleLanguage = () => {
//     setlanguage(getSelectedLanguage());
//     handleLanguage2();
//   };
//   const handleLanguage2 = () => {
//     setlanguage(getSelectedLanguage());
//   };
//   //to get the permission we use UseEffect Hook
//   useEffect(() => {
//     //getting a user Location takes time so i need to wait so i make a async function
//     const getPermission = async () => {
//       //we use foreround permission for gettin Permission inside the app
//       let { status } = await Location.requestForegroundPermissionsAsync();

//       if (status !== "granted") {
//         return;
//       }
//       //To get the current Location
//       let CurrentLocation = await Location.getCurrentPositionAsync({});
//       setLocation(CurrentLocation);
//     };

//     getPermission();
//   }, []);
//   useEffect(() => {
//     reverseGeocode();
//   }, [location]);
//   const reverseGeocode = async () => {
//     const reverseGeocodeAddress = await Location.reverseGeocodeAsync({
//       longitude: location.coords.longitude,
//       latitude: location.coords.latitude,
//     });
//     setaddress(reverseGeocodeAddress);
//   };
//   const handleSubmuit = () => {
//     const body = {};
//     body.email = email;
//     body.password = password;

//     async function submitdata() {
//       try {
//         await fetch("http://103.174.10.108:5002/api/signin", {
//           method: "POST",
//           mode: "cors", // no-cors, *cors, same-origin
//           cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//           credentials: "same-origin", // include, *same-origin, omit
//           headers: {
//             "Content-Type": "application/json",
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: JSON.stringify(body), // body data type must match "Content-Type" header
//         })
//           .then((response) => response.json())
//           .then((result) => {
//             if (result.msg == "Login success") {
//               showToast("sucess");

//               navigation.navigate("role", {
//                 id: result.id.user_id,
//                 data: result.id,
//                 location: address,
//               });
//             } else {
//               alert("Email ID or Password is incorrect");
//             }
//           });
//       } catch (error) {
//         console.warn(error);
//       }
//     }
//     submitdata();
//   };
//   return (
//     <LinearGradient
//       // background-image: linear-gradient(135deg, #b2fea3 0%, #f5cf22 100%);
//       // colors={["#F5CF22", "#B2FEA3", "#f6ab03"]}
//       // colors={["#B8F8FE", "#E8FDE6"]}
//       // colors={["#C7FA3D", "#CEFD62"]}
//       // colors={["#016d68", "#018d86", "#14FAB5", "#0dc989"]}
//       // colors={["#F63B6D", "#FF0F2B"]}
//       // colors={["#1492EC", "#1492EC"]}
//       colors={["#1da1f2", "#1da1f2"]}
//       // colors={["#fef430", "#fef430"]}
//       // colors={["#e7eee1", "#eaf61d", "#F3DD36"]}
//       // final 2 colors={["#fefa63", "#F3F10B", "#F3DD36"]}
//       // final 1 colors={["#FD3455", "#030E86"]}
//       // useAngle={true}
//       // angle={180}
//       style={styles.Landing}
//     >
//       <StatusBar style="auto" />
//       <View style={styles.TopLanding}>
//         <View style={styles.Quotes}>
//           <Text
//             style={{
//               textDecorationLine: "underline",
//               width: 350,
//               fontSize: 14,
//               fontWeight: "700",
//               fontStyle: "italic",
//               color: "#333",
//               backgroundColor: "#87ceeb",
//               padding: 10,
//               borderRadius: 8,
//               shadowColor: "#333",
//               shadowOffset: {
//                 width: 0,
//                 height: 6,
//               },
//               shadowOpacity: 0.2,
//               shadowRadius: 18.62,
//               elevation: 18,
//             }}
//           >
//             {t("toptitle")}
//           </Text>
//         </View>
//         <View style={{ height: 200 }}>
//           {/* <Image
//             source={require("../images/logovelai.png")}
//             style={{
//               height: 250,
//               width: 460,
//               resizeMode: "cover",
//             }}
//           /> */}
//         </View>
//         <View style={styles.Heading}>
//           <Text
//             style={{
//               fontSize: language == "ta" ? 20 : 40,
//               color: "black",
//               fontWeight: "900",
//             }}
//           >
//             {t("icontitle")}
//           </Text>
//           <Text
//             style={{
//               fontSize: language == "ta" ? 12 : 16,
//               fontWeight: "700",
//               color: "#C0C0C0",
//             }}
//           >
//             {t("icontitle2")}
//           </Text>
//         </View>

//         <View style={styles.buttons}>
//           {islogin && (
//             <View>
//               <Pressable
//                 style={[styles.mainButton]}
//                 onPress={() => {
//                   navigation.navigate("Moblog", {
//                     addresses: address,
//                   }),
//                     reverseGeocode();
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontWeight: "700",
//                     fontSize: language == "ta" ? 11 : 15,
//                     marginRight: 5,
//                     color: "#1da1f2",
//                   }}
//                 >
//                   {t("logop1")}
//                 </Text>
//               </Pressable>
//             </View>
//           )}
//           {!islogin && (
//             <>
//               <Ionicons
//                 name="arrow-back"
//                 size={30}
//                 style={{ marginBottom: 10 }}
//                 color="white"
//                 onPress={() => setislogin(true)}
//               />
//               <TextInput
//                 placeholder={t("email")}
//                 style={{
//                   width: 300,
//                   height: 30,
//                   padding: 10,
//                   backgroundColor: "transparent",
//                   marginBottom: 10,
//                 }}
//                 onChangeText={(e) => setemail(e)}
//                 keyboardType={"email-address"}
//               />
//               <TextInput
//                 placeholder={t("pass")}
//                 style={{
//                   width: 300,
//                   height: 30,
//                   padding: 10,
//                   borderRadius: 10,
//                   backgroundColor: "transparent",
//                 }}
//                 secureTextEntry={true}
//                 onChangeText={(e) => setpassword(e)}
//               />
//             </>
//           )}
//           {islogin && (
//             <View>
//               <Pressable
//                 style={[styles.mainButton]}
//                 onPress={() => {
//                   setislogin(false), reverseGeocode();
//                 }}
//               >
//                 <Text
//                   style={{
//                     fontWeight: "700",
//                     fontSize: language == "ta" ? 11 : 15,
//                     marginRight: 5,
//                     color: "#1da1f2",
//                   }}
//                 >
//                   {t("logop2")}
//                 </Text>
//               </Pressable>
//             </View>
//           )}
//         </View>
//         <View>
//           <Pressable
//             style={[styles.mainButton]}
//             onPress={
//               islogin
//                 ? () => {
//                     navigation.navigate("register", {
//                       location: address,
//                       location2: location,
//                       edit: false,
//                     }),
//                       reverseGeocode();
//                   }
//                 : () => handleSubmuit()
//             }
//           >
//             <Text
//               style={{
//                 fontWeight: "700",
//                 fontSize: language == "ta" ? 11 : 15,
//                 marginRight: 5,
//                 color: "#1da1f2",
//               }}
//             >
//               {islogin ? t("sign") : t("log")}
//             </Text>
//           </Pressable>
//         </View>
//       </View>
//       <View style={styles.bottomLanding}>
//         <View style={styles.languageConatainer}>
//           <Pressable onPress={() => handleLanguage()}>
//             <DropDownLanguage />
//           </Pressable>
//           <Pressable onPress={() => handleLanguage()}>
//             <Text
//               style={{
//                 fontWeight: "400",
//                 fontSize: 18,
//                 marginLeft: 40,
//                 marginTop: 5,
//               }}
//             >
//               {language == "" ? "Language" : ""}
//             </Text>
//           </Pressable>
//         </View>

//         <View style={styles.privacypolicyContainer}>
//           <Text>
//             By signing up you agree to our
//             <Text style={{ fontWeight: "600", padding: 10 }}>Terms.</Text>
//             See how we use your data in our
//             <Text style={{ fontWeight: "600", padding: 10 }}>
//               Privacy Policy.
//             </Text>
//           </Text>
//         </View>
//       </View>
//     </LinearGradient>
//   );
// }
// const styles = StyleSheet.create({
//   Landing: {
//     gap: 20,
//     width: "100%",
//     height: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   TopLanding: {
//     width: "100%",
//     alignItems: "center",
//     marginTop: -50,
//   },
//   Quotes: {
//     width: "100%",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     padding: 10,
//   },
//   bottomLanding: {
//     width: "100%",
//     height: 50,
//   },
//   Heading: {
//     flexDirection: "row",
//     alignItems: "baseline",
//     justifyContent: "flex-end",
//   },
//   mainButton: {
//     justifyContent: "center",
//     padding: 10,
//     width: 200,
//     height: 50,
//     alignItems: "center",
//     borderRadius: 25,
//     backgroundColor: "white",
//     marginVertical: 10,
//   },
//   languageConatainer: {
//     alignContent: "space-between",
//     marginBottom: 20,
//     marginLeft: 130,
//   },
//   privacypolicyContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     alignItems: "center",
//     marginHorizontal: 40,
//     height: 100,
//     paddingTop: 60,
//     justifyContent: "center",
//   },
// });
