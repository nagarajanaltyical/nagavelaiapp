import React from "react";
import { useState, useRef, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  Text,
  View,
  Modal,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ToastAndroid,
  Pressable,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  Alert,
} from "react-native";
import LottieViewloading from "../components/Loading";

import { FontAwesome5 } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import * as DocumentPicker from "expo-document-picker";
import { Entypo } from "@expo/vector-icons";
import { Formik } from "formik";
import loginValidationSchema from "../components/formvalidation";
import { FontAwesome } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useContext } from "react";
import { useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";
import { parsePhoneNumber } from "react-native-phone-number-input";
import Top from "../components/Topcontainer";
// import { isValidPhoneNumber } from "react-phone-number-input";
import { LinearGradient } from "expo-linear-gradient";
import OtpScreen from "./Otpscreen";
import OTPInput from "../components/otp/otpInput";
import * as ImagePicker from "expo-image-picker";
import { AuthContext, LocalizationContext } from "../../App";
import { number } from "yup";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
// import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import LottieViewloadingmodal from "../components/Loadinmodal";
import { color } from "react-native-reanimated";

import { JobseekerProfilttopnav } from "../Rootstack/RootTabnav";
export default function Userprofile({ navigation, route }) {
  return <JobseekerProfilttopnav />;
}

// export default function Userprofile({ navigation, route }) {
//   const { t, language, setlanguage } = useContext(LocalizationContext);
//   const [ActivityIndicators, setActivityIndicators] = useState(false);
//   const { state, dispatch } = useContext(AuthContext);
//   const userID = useSelector((state) => state.ID);
//   // const [editable,seteditable] = useState(true)
//   const redux_dispatch = useDispatch();

//   const handlecall = () => {
//     //
//     // alert("hiiii");
//     dispatch({ type: "userdetails" });
//     // setuserdetails("true");
//     setTimeout(() => navigation.navigate("bottomhome"), 100);
//   };

//   const [image, setImage] = useState(null);
//   const textInputRef = useRef(null); // Create a ref to the TextInput component

//   const openCalendar = () => {
//     // Code to open the calendar
//     textInputRef.current.blur(); // Manually dismiss the keyboard
//   };
//   //to get skills
//   useEffect(() => {
//     // async function fetchdata() {
//     //   try {
//     //     await fetch("http://192.168.1.19:5000/skills/api", {
//     //       method: "GET", // *GET, POST, PUT, DELETE, etc.
//     //       mode: "cors", // no-cors, *cors, same-origin
//     //       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     //       credentials: "same-origin", // include, *same-origin, omit
//     //       headers: {
//     //         "Content-Type": "application/json",
//     //         // 'Content-Type': 'application/x-www-form-urlencoded',
//     //       },
//     //     })
//     //       .then((response) => response.json())
//     //       .then((result) => (
//     //   } catch (error) {
//     //     console.warn(error);
//     //   }
//     // }
//     // fetchdata();
//     getphonenumber();
//   }, []);
//   //to get the files
//   const [resume, setresume] = useState();
//   const [cancel, setcancel] = useState(false);
//   const [fileResponse, setfileResponse] = useState(null);
//   const handleDocumentSelection = useCallback(async () => {
//     try {
//       const response = await DocumentPicker.getDocumentAsync({
//         copyToCacheDirectory: true,
//       });
//       if (response.type) {
//       }
//       if (response.type == "cancel") {
//         //  Alert.alert("Resume slection cancelled");
//         return setcancel(true);
//       }

//       setfileResponse(response);

//       // setActivityIndicators(true);

//       //

//       let localUri = response.uri;

//       let filename = localUri.split("/").pop();

//       // Infer the type of the image
//       let match = /\.(\w+)$/.exec(filename);
//       let type = match ? `image/${match[1]}` : `image`;

//       var formdata = new FormData();
//       formdata.append("file", { uri: localUri, name: filename, type });
//       // Upload the image using the fetch and FormData APIs
//       let FFormData = new FormData();
//       // Assume "photo" is the name of the form field the server expects
//       FFormData.append("photo", { uri: localUri, name: filename, type });
//       async function submitdata() {
//         try {
//           await fetch(
//             `http://103.174.10.108:5002/api/file/aws_upload/${userID}`,
//             {
//               method: "POST",
//               mode: "cors", // no-cors, *cors, same-origin
//               // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//               // credentials: "same-origin", // include, *same-origin, omit
//               headers: {
//                 // Accept: "application/json",
//                 "Content-Type": "multipart/form-data",
//                 // 'Content-Type': 'application/x-www-form-urlencoded',
//               },
//               body: formdata, // body data type must match "Content-Type" header
//             }
//           )
//             .then((response) => response.json())
//             .then((result) => {
//               setresume(result["updated"]);
//               // setjobpostpic(result["updated"]);
//               // setActivityIndicators(false);
//               // setModalVisible(false);
//             });
//         } catch (error) {}
//       }
//       submitdata();
//     } catch (err) {
//       console.warn(err);
//     }
//   }, []);
//   //GEt user phone number
//   const [phonenumber, setphonenumber] = useState("");

//   async function getphonenumber() {
//     try {
//       await fetch(`http://103.174.10.108:5002/api/user_number/${userID}`, {
//         method: "GET",
//         mode: "cors", // no-cors, *cors, same-origin
//         // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//         // credentials: "same-origin", // include, *same-origin, omit
//         headers: {
//           Accept: "application/json",
//           // "Content-Type": "multipart/form-data",
//           // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         // body: formdata, // body data type must match "Content-Type" header
//       })
//         .then((response) => response.json())
//         .then((result) => {
//           setphonenumber(result.number);
//           // setjobpostpic(result["updated"]);
//           // setActivityIndicators(false);
//           // setModalVisible(false);
//         });
//     } catch (error) {}
//   }
//   //Date picker
//   const [date, setDate] = useState(new Date());
//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate;
//     setDate(currentDate);
//   };
//   const showMode = (currentMode) => {
//     DateTimePickerAndroid.open({
//       value: date,
//       onChange,
//       mode: currentMode,
//     });
//   };
//   const [profilepic, setprofilepic] = useState("");
//   const [status, requestPermission] = ImagePicker.useCameraPermissions();
//   const [status1, requestPermission1] =
//     ImagePicker.useMediaLibraryPermissions();
//   console.log(status);
//   async function takeAndUploadPhotoAsync(paras) {
//     // Display the camera to the user and wait for them to take a photo or to cancel
//     // the action
//     let result =
//       paras === "files"
//         ? await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//           })
//         : await ImagePicker.launchCameraAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//           });
//     result;
//     // ImagePicker saves the taken photo to disk and returns a local URI to it
//     if (!result.canceled) {
//       setActivityIndicators(true);

//       let localUri = result.assets[0]["uri"];

//       setImage(localUri);
//       let filename = localUri.split("/").pop();

//       // Infer the type of the image
//       let match = /\.(\w+)$/.exec(filename);
//       let type = match ? `image/${match[1]}` : `image`;

//       var formdata = new FormData();
//       formdata.append("file", { uri: localUri, name: filename, type });
//       // Upload the image using the fetch and FormData APIs
//       let FFormData = new FormData();
//       // Assume "photo" is the name of the form field the server expects
//       FFormData.append("photo", { uri: localUri, name: filename, type });
//       async function submitdata() {
//         try {
//           await fetch(
//             `http://103.174.10.108:5002/api/job_post/aws_upload/${userID}`,
//             {
//               method: "POST",
//               mode: "cors", // no-cors, *cors, same-origin
//               // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//               // credentials: "same-origin", // include, *same-origin, omit
//               headers: {
//                 // Accept: "application/json",
//                 "Content-Type": "multipart/form-data",
//                 // 'Content-Type': 'application/x-www-form-urlencoded',
//               },
//               body: formdata, // body data type must match "Content-Type" header
//             }
//           )
//             .then((response) => response.json())
//             .then((result) => {
//               setprofilepic(result["updated"]);
//               setActivityIndicators(false);
//               setModalVisible(false);
//             });
//         } catch (error) {}
//       }
//       submitdata();
//     } else {
//       setActivityIndicators(false);
//       setModalVisible(false);
//     }
//   }
//   //to get the docs of the user
//   async function takeAndUploadPhotoAsync1(paras) {
//     // Display the camera to the user and wait for them to take a photo or to cancel
//     // the action
//     let result =
//       paras === "files"
//         ? await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//           })
//         : await ImagePicker.launchCameraAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//           });
//     result;
//     // ImagePicker saves the taken photo to disk and returns a local URI to it

//     setActivityIndicators(true);

//     let localUri = result.assets[0]["uri"];

//     setImage(localUri);
//     let filename = localUri.split("/").pop();

//     // Infer the type of the image
//     let match = /\.(\w+)$/.exec(filename);
//     let type = match ? `image/${match[1]}` : `image`;

//     var formdata = new FormData();
//     formdata.append("file", { uri: localUri, name: filename, type });
//     // Upload the image using the fetch and FormData APIs
//     let FFormData = new FormData();
//     // Assume "photo" is the name of the form field the server expects
//     FFormData.append("photo", { uri: localUri, name: filename, type });
//     async function submitdata() {
//       try {
//         await fetch(`http://103.174.10.108:5002/api/job_post/aws_upload/`, {
//           method: "POST",
//           mode: "cors", // no-cors, *cors, same-origin
//           // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//           // credentials: "same-origin", // include, *same-origin, omit
//           headers: {
//             // Accept: "application/json",
//             "Content-Type": "multipart/form-data",
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: formdata, // body data type must match "Content-Type" header
//         })
//           .then((response) => response.json())
//           .then((result) => {
//             setjobpostpic(result["updated"]);
//             setActivityIndicators(false);
//             setModalVisible(false);
//           });
//       } catch (error) {}
//     }
//     submitdata();
//   }
//   const [showplace, setshowplace] = useState(true);
//   const showDatepicker = () => {
//     showMode("date");
//     setshowplace(false);
//   };
//   //submitdata
//   const handleSubmits = async (values) => {
//     values.dob = date;
//     // values.proof = Number(values.proof.slice(0, 10));
//     values.number = phonenumber == null ? "" : phonenumber;
//     values.gender = genderValue == null ? "" : genderValue;
//     values.resume = resume == null ? "" : resume;
//     values.profilepic = profilepic == null ? "" : profilepic;
//     values.user_id = userID;

//     try {
//       await fetch("http://103.174.10.108:5002/api/job_see_userinfo_details", {
//         method: "POST",
//         mode: "cors", // no-cors, *cors, same-origin
//         // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//         // credentials: "same-origin", // include, *same-origin, omit
//         headers: {
//           "Content-Type": "application/json",
//           // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: JSON.stringify(values),
//       })
//         .then((response) => response.json())
//         .then((result) => {
//           if (result === "success") {
//             redux_dispatch({ type: "User_Details_Given" });
//             navigation.navigate("bottomhome");
//           }
//         });
//     } catch (error) {
//       console.warn(error);
//     }
//   };
//   //select Gender
//   const [genderValue, setGenderValue] = useState(null);
//   const [genderOpen, setGenderOpen] = useState(false);
//   const [companyopen, setCompanyOpen] = useState(true);
//   const { handleSubmit, control } = useForm();
//   const onGenderOpen = useCallback(() => {
//     setCompanyOpen(false);
//   }, []);
//   const [gender, setGender] = useState([
//     { label: "Male", value: "male" },
//     { label: "Female", value: "female" },
//     { label: "Prefer Not to Say", value: "neutral" },
//   ]);

//   const [isvoice, setisvoice] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState([]);
//   const [skills, setSkills] = useState(null);
//   const [jobseeker, setjobseeker] = useState(false);
//   const [jobprovider, setjobprovider] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#eefbff" }}>
//       <StatusBar style="auto" />

//       <View style={styles.title}>
//         <Text style={styles.titlestyle}>Personal Information</Text>
//       </View>
//       <ScrollView nestedScrollEnabled={true}>
//         <View style={styles.iconstotal}>
//           <View>
//             <TouchableOpacity
//               onPress={() => {
//                 setModalVisible(!modalVisible);
//               }}
//             >
//               {image === null ? (
//                 <>
//                   <FontAwesome name="user-circle" size={100} color="#D9D9D9" />
//                   <MaterialCommunityIcons
//                     name="pencil-circle"
//                     size={34}
//                     color="#1E5966"
//                     style={{ position: "relative", bottom: 26, left: 65 }}
//                   />
//                 </>
//               ) : (
//                 <View
//                   style={{
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginBottom: 10,
//                   }}
//                 >
//                   <Image
//                     source={{ uri: image }}
//                     style={{ width: 100, height: 100, borderRadius: 50 }}
//                   />
//                   <MaterialCommunityIcons
//                     name="pencil-circle"
//                     size={35}
//                     color="#1E5966"
//                     style={{ position: "relative", bottom: 24, left: 30 }}
//                   />
//                 </View>
//               )}
//             </TouchableOpacity>
//             <Modal
//               animationType="slide"
//               //animationInTiming = {13900}
//               transparent={true}
//               visible={modalVisible}
//               animationOut="slide"
//               swipeDirection="down"
//               onRequestClose={() => {
//                 setModalVisible(!modalVisible);
//                 setActivityIndicators(false);
//               }}
//             >
//               <View style={styles.centeredView}>
//                 <View style={styles.modalView}>
//                   {ActivityIndicators ? (
//                     <View
//                     // style={{ justifyContent: "center", alignItems: "center" }}
//                     >
//                       <Text>
//                         <LottieViewloadingmodal />
//                       </Text>
//                       {/* <ActivityIndicator size="large" /> */}
//                     </View>
//                   ) : (
//                     <>
//                       <TouchableHighlight
//                         style={{
//                           ...styles.openButton,
//                           width: 150,
//                           backgroundColor: "#1E5966",
//                         }}
//                         onPress={() => {
//                           requestPermission;
//                           takeAndUploadPhotoAsync("camera");
//                         }}
//                       >
//                         <View
//                           style={{
//                             flexDirection: "row",
//                             alignItems: "center",
//                             justifyContent: "space-evenly",
//                           }}
//                         >
//                           <AntDesign name="camera" size={20} color="#fff" />
//                           <Text
//                             style={{
//                               color: "#fff",
//                               fontWeight: "500",
//                               marginRight: "6%",
//                             }}
//                           >
//                             Take Pic
//                           </Text>
//                         </View>
//                       </TouchableHighlight>
//                       <TouchableHighlight
//                         style={{
//                           ...styles.openButton,
//                           width: 150,
//                           backgroundColor: "#1E5966",
//                           marginTop: 20,
//                         }}
//                         // onPress={() => requestPermission
//                         //   takeAndUploadPhotoAsync("files")
//                         // }

//                         onPress={() => {
//                           requestPermission1, takeAndUploadPhotoAsync("files");
//                         }}
//                       >
//                         <View
//                           style={{
//                             flexDirection: "row",
//                             alignItems: "center",
//                             justifyContent: "space-evenly",
//                           }}
//                         >
//                           <FontAwesome name="files-o" size={20} color="#fff" />
//                           <Text
//                             style={{
//                               color: "#fff",
//                               fontWeight: "500",
//                             }}
//                           >
//                             Upload Pic
//                           </Text>
//                         </View>
//                       </TouchableHighlight>

//                       <TouchableOpacity
//                         style={{ marginTop: 50 }}
//                         onPress={() => setModalVisible(!modalVisible)}
//                       >
//                         <Text
//                           style={{
//                             textDecorationLine: "underline",
//                             fontSize: 17,
//                             color: "red",
//                           }}
//                         >
//                           Close
//                         </Text>
//                       </TouchableOpacity>
//                     </>
//                   )}
//                 </View>
//               </View>
//             </Modal>
//           </View>
//         </View>
//         <Formik
//           validationSchema={loginValidationSchema}
//           initialValues={{
//             emailid: "",
//             // proof: "",
//             username: "",
//             // password: "",
//             // phone_number: "",

//             //location: "",
//           }}
//           onSubmit={(values) => handleSubmits(values)}
//         >
//           {({
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             values,
//             touched,
//             errors,
//             isValid,
//           }) => (
//             <>
//               <View style={{}}>
//                 <View style={{ marginTop: "-4%" }}>
//                   <TextInput
//                     placeholder="Username"
//                     name="firstname"
//                     style={styles.input}
//                     placeholderTextColor="#acacac"
//                     onChangeText={handleChange("username")}
//                     onBlur={handleBlur("username")}
//                     defaultValue=""
//                     underlineColorAndroid={"transparent"}
//                   />
//                   {errors.username && touched.username && (
//                     <Text
//                       style={{
//                         fontSize: 10,
//                         color: "red",
//                         marginTop: "-3%",
//                         marginLeft: "7%",
//                         marginBottom: "2%",
//                       }}
//                     >
//                       {errors.username}
//                     </Text>
//                   )}
//                 </View>
//                 <View
//                   style={{
//                     marginTop: "-3%",
//                   }}
//                 >
//                   <TextInput
//                     placeholder="Phone Number"
//                     style={styles.input}
//                     keyboardType="number-pad"
//                     placeholderTextColor="#acacac"
//                     // value={phonenumber}
//                     value={`+${phonenumber.slice(1, 3)} ${phonenumber.slice(
//                       3,
//                       13
//                     )}`}
//                   />
//                   {errors.phone_number && touched.phone_number && (
//                     <Text
//                       style={{
//                         fontSize: 10,
//                         color: "red",
//                         marginTop: "-3%",
//                         marginLeft: "7%",
//                         marginBottom: "2%",
//                       }}
//                     >
//                       {errors.phone_number}
//                     </Text>
//                   )}
//                 </View>
//                 <View style={{ marginTop: "-3%" }}>
//                   <TextInput
//                     placeholder="Email Id"
//                     style={styles.input}
//                     keyboardType="email-address"
//                     onChangeText={handleChange("emailid")}
//                     onBlur={handleBlur("emailid")}
//                     placeholderTextColor="#acacac"
//                     defaultValue=""
//                   />
//                   {errors.emailid && touched.emailid && (
//                     <Text
//                       style={{
//                         fontSize: 10,
//                         color: "red",
//                         marginTop: "-3%",
//                         marginLeft: "7%",
//                         // marginTop: "-2%",
//                         marginBottom: "2%",
//                         // marginHorizontal: 20,
//                       }}
//                     >
//                       {errors.emailid}
//                     </Text>
//                   )}
//                 </View>
//                 <View style={{}}>
//                   <Controller
//                     name="gender"
//                     defaultValue=""
//                     control={control}
//                     render={({ field: { onChange, value } }) => (
//                       <View style={styles.dropdownGender}>
//                         <DropDownPicker
//                           style={[
//                             styles.dropdown,
//                             {
//                               width: "90%",
//                               marginHorizontal: 20,
//                               // marginVertical: 6,
//                               borderColor: "#fff",
//                             },
//                           ]}
//                           open={genderOpen}
//                           value={genderValue} //genderValue
//                           items={gender}
//                           setOpen={setGenderOpen}
//                           setValue={setGenderValue}
//                           setItems={setGender}
//                           placeholder="Select Gender"
//                           placeholderStyle={{ color: "#acacac" }}
//                           dropDownContainerStyle={{
//                             width: "90%",
//                             marginHorizontal: 20,
//                           }}
//                           listMode="SCROLLVIEW"
//                           onOpen={onGenderOpen}
//                           onChangeValue={onChange}
//                           zIndex={3000}
//                           zIndexInverse={1000}
//                         />
//                       </View>
//                     )}
//                   />
//                 </View>
//                 {
//                   // <TouchableOpacity onPress={showDatepicker}>
//                   <View style={{}}>
//                     <Pressable onPress={showDatepicker}>
//                       <TextInput
//                         ref={textInputRef}
//                         placeholder="Date of Birth"
//                         style={[styles.input, { position: "relative" }]}
//                         underlineColorAndroid="transparent"
//                         placeholderTextColor={"#acacac"}
//                         onTouchStart={showDatepicker}
//                         // placeholderTextColor={editable ? "grey" : "#707070"}
//                         defaultValue={
//                           showplace ? "" : date.toDateString().slice(3)
//                         }
//                         theme={{ colors: { text: "black" } }}
//                         // value={date.toDateString()}
//                         // onFocus={showDatepicker}
//                       />
//                     </Pressable>
//                     <Pressable onPressOut={showDatepicker}>
//                       <FontAwesome5
//                         name="calendar-alt"
//                         size={20}
//                         color="#1e5966"
//                         style={{
//                           position: "absolute",
//                           right: 40,
//                           bottom: 30,
//                         }}
//                       />
//                     </Pressable>
//                     {errors.password && touched.password && (
//                       <Text
//                         style={{
//                           fontSize: 13,
//                           color: "red",
//                           marginTop: "-3%",
//                           marginLeft: "7%",
//                         }}
//                       >
//                         {errors.password}
//                       </Text>
//                     )}
//                   </View>
//                   // </TouchableOpacity>
//                 }
//               </View>
//               {/* <View style={{ marginTop: "-3%" }}>
//                 <TextInput
//                   placeholder="Aadhar Number"
//                   style={[styles.input, { position: "relative" }]}
//                   underlineColorAndroid="transparent"
//                   onChangeText={handleChange("proof")}
//                   keyboardType="number-pad"
//                   onBlur={handleBlur("proof")}
//                   placeholderTextColor="#acacac"
//                 />

//                 {errors.proof && touched.proof && (
//                   <Text
//                     style={{
//                       fontSize: 10,
//                       color: "red",
//                       marginTop: "-3%",
//                       marginLeft: "7%",
//                       marginBottom: "2%",
//                     }}
//                   >
//                     {errors.proof}
//                   </Text>
//                 )}
//               </View> */}
//               {/* <View style={styles.skill}>
//                   {skills === null ? (
//                     <View>
//                       <Text style={{ color: "#707070", marginHorizontal: 30 }}>
//                         Loading...
//                       </Text>
//                     </View>
//                   ) : (
//                     <DropDownPicker
//                       placeholder={t("skillpla")}
//                       open={open}
//                       value={value}
//                       items={skills}
//                       setOpen={setOpen}
//                       setValue={setValue}
//                       setItems={setSkills}
//                       multiple={true}
//                       searchable={true}
//                       dropDownDirection="AUTO"
//                       mode="BADGE"
//                       listMode="MODAL"
//                       style={{
//                         borderWidth: 0.3,
//                         borderColor: "black",
//                         marginHorizontal: 20,
//                         width: 355,
//                       }}
//                       modalAnimationType="slide"
//                       placeholderStyle={{
//                         fontWeight: "bold",
//                       }}
//                       badgeColors={"black"}
//                       badgeTextStyle={{
//                         fontStyle: "italic",
//                         color: "white",
//                       }}
//                       badgeDotColors={["#00B4D8"]}
//                     />
//                   )}
//                 </View> */}
//               <TouchableOpacity
//                 onPress={() => navigation.navigate("eduexp")}
//                 // disabled={route.params.education_given}
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     // width: "50%",
//                     // marginLeft: "1%",
//                     marginLeft: "6%",

//                     justifyContent: "flex-start",
//                     alignItems: "center",
//                     alignContent: "center",
//                     marginVertical: 10,
//                   }}
//                 >
//                   <View style={{}}>
//                     <AntDesign name="pluscircleo" size={18} color="#1E5966" />
//                   </View>
//                   <View>
//                     <Text
//                       style={{
//                         fontSize: 17,
//                         fontWeight: "400",
//                         marginLeft: "8%",
//                         color: "#1E5966",
//                       }}
//                     >
//                       Add Highest Education
//                     </Text>
//                   </View>
//                   {/* {route.params.education_given ? (
//                     <MaterialIcons
//                       name="verified-user"
//                       size={24}
//                       color="black"
//                     />
//                   ) : (
//                     ""
//                   )} */}
//                 </View>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate("workexp")}
//                 // disabled={route.params.experience_given}
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     // width: "50%",
//                     // marginLeft: "1%",
//                     justifyContent: "flex-start",
//                     alignItems: "center",
//                     marginLeft: "6%",

//                     alignContent: "center",
//                     marginVertical: 10,
//                   }}
//                 >
//                   <View style={{}}>
//                     <AntDesign name="pluscircleo" size={18} color="#1E5966" />
//                   </View>
//                   <View>
//                     <Text
//                       style={{
//                         fontSize: 17,
//                         fontWeight: "400",
//                         marginLeft: "8%",
//                         color: "#1E5966",
//                       }}
//                     >
//                       Add Highest Experience
//                     </Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//               {/* <Text style={{ marginHorizontal: 20 }}>
//                   {fileResponse === null || fileResponse.type === "cancel"
//                     ? "No resume is added"
//                     : fileResponse.name}
//                 </Text> */}
//               <TouchableOpacity onPress={handleDocumentSelection}>
//                 {fileResponse === null ? (
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       // width: "50%",
//                       // marginLeft: "1%",
//                       justifyContent: "flex-start",
//                       alignItems: "center",
//                       marginLeft: "6%",
//                       alignContent: "center",
//                       marginVertical: 10,
//                     }}
//                   >
//                     <View style={{}}>
//                       <AntDesign name="pluscircleo" size={18} color="#1E5966" />
//                     </View>
//                     <View>
//                       <Text
//                         style={{
//                           fontSize: 17,
//                           fontWeight: "400",
//                           marginLeft: "8%",
//                           color: "#1E5966",
//                         }}
//                       >
//                         Add Resume
//                       </Text>
//                     </View>
//                     <View>
//                       <Text style={{ color: "red", fontWeight: "600" }}>
//                         {cancel ? "Resume selection cancelled" : ""}
//                       </Text>
//                     </View>
//                   </View>
//                 ) : (
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       // width: "50%",
//                       // marginLeft: "1%",
//                       justifyContent: "flex-start",
//                       alignItems: "center",
//                       alignContent: "center",
//                       marginLeft: "6%",

//                       marginVertical: 10,
//                     }}
//                   >
//                     <View style={{}}>
//                       <AntDesign name="pluscircleo" size={18} color="#1E5966" />
//                     </View>
//                     <View
//                       style={{
//                         // backgroundColor: "red",
//                         flexDirection: "row",
//                         // marginTop: "2%",
//                         // marginLeft: "1%",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         alignContent: "center",
//                         marginVertical: 10,
//                       }}
//                     >
//                       <Text
//                         style={{
//                           borderColor: "#707070",
//                           borderWidth: 1,
//                           borderRadius: 10,
//                           alignItems: "center",
//                           justifyContent: "center",
//                           fontSize: 17,
//                           fontWeight: "400",
//                           marginLeft: "8%",
//                           color: "#1E5966",
//                         }}
//                       >
//                         {fileResponse.name}
//                       </Text>
//                     </View>
//                   </View>
//                 )}
//               </TouchableOpacity>
//               {/* <TouchableOpacity onPress={() => handlecall()}>
//                   <Text>enter details</Text>
//                 </TouchableOpacity> */}
//               <LinearGradient
//                 colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
//                 style={{
//                   backgroundColor: isValid ? "#6BC3FF" : "#87CEEB",
//                   fontWeight: "600",
//                   opacity: isValid ? 1 : 0.5,
//                   padding: 10,
//                   width: "50%",
//                   alignSelf: "center",
//                   borderRadius: 10,
//                   marginVertical: 20,
//                 }}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 useAngle={45}
//               >
//                 <TouchableOpacity
//                   // style={{
//                   //   padding: 10,
//                   //   width: "50%",
//                   //   alignSelf: "center",
//                   //   borderRadius: 10,
//                   //   marginVertical: 20,
//                   // }}
//                   onPress={handleSubmit}
//                   disabled={!isValid}
//                 >
//                   <Text
//                     style={{
//                       textAlign: "center",
//                       fontWeight: "600",
//                       fontSize: 17,
//                       color: isValid ? "#fff" : "white",
//                     }}
//                   >
//                     Create
//                   </Text>
//                 </TouchableOpacity>
//               </LinearGradient>
//             </>
//           )}
//         </Formik>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
const styles = StyleSheet.create({
  title: {
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "0%",
    height: 40,
  },
  edutext: {
    fontSize: 17,
    fontWeight: "400",
    marginLeft: "8%",
    color: "#1E5966",
    paddingTop: 8,
  },
  titlestyle: {
    fontWeight: "500",
    fontSize: 22,
    color: "#333",
  },
  iconstotal: {
    // backgroundColor: "red",
    alignItems: "center",
    alignContent: "center",
    paddingTop: "3%",
    // paddingBottom: "-10%",
  },
  education: {
    flexDirection: "row",
    width: "50%",
    // marginLeft: "1%",
    justifyContent: "center",
    alignItems: "flex-end",
    marginVertical: 10,
  },
  centeredView: {
    flex: 1,
    width: "90%",
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 25,
    width: "80%",
    borderColor: "#d9d9d9",
    padding: 100,
    height: "42%",
    alignItems: "center",
    shadowColor: "#000",
    borderWidth: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 10,
  },
  input: {
    borderRadius: 10,
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#d9d9d9",
    borderWidth: 0.3,
    // borderColor: "#707070",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // borderWidth: 1,
    // color: "#acacac",
    width: "90%",
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 15,
    justifyContent: "center",
  },
});
