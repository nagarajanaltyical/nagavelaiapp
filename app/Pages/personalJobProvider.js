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
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";

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
import providerValidationSchema from "../components/jobProviderValidation";
import PhoneInput from "react-native-phone-number-input";
import { parsePhoneNumber } from "react-native-phone-number-input";
import Top from "../components/Topcontainer";
// import { isValidPhoneNumber } from "react-phone-number-input";
import { LinearGradient } from "expo-linear-gradient";
import OtpScreen from "./Otpscreen";
import OTPInput from "../components/otp/otpInput";
import * as ImagePicker from "expo-image-picker";
import { AuthContext, LocalizationContext } from "../../App";
import { yupResolver } from "@hookform/resolvers/yup";

import { number } from "yup";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
// import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import LottieViewloadingmodal from "../components/Loadinmodal";
import { color } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

//forschema
const schema = yup.object().shape({
  gender: yup
    .string()
    .required("gender cant be empty")
    .typeError("gender  cannot be null"),
});

export default function PersonalJobProvider({ navigation }) {
  const { t, language, setlanguage } = useContext(LocalizationContext);
  const [ActivityIndicators, setActivityIndicators] = useState(false);
  const userID = useSelector((state) => state.ID);

  const { state, dispatch } = useContext(AuthContext);
  const Redux_dispatch = useDispatch();
  const states = useSelector((state) => state);

  //to store the image
  //to set the image of the user
  const [profilemodal, setprofilemodal] = useState(false);
  const [profileActivityIndicators, setprofileActivityIndicators] =
    useState(false);
  const [phonenumber, setphonenumber] = useState("");
  const [profile, setprofile] = useState(null);
  const [profilepic, setprofilepic] = useState("");
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      // callback
      getdata();
    }
  }, [isFocused]);

  // to addd the
  useEffect(() => {
    getdata();
  }, []);
  //add image to backend
  const getdata = async () => {
    // body.user_id = userID;
    // console.log(body);
    try {
      await fetch(`http://103.174.10.108:5002/api/user_number/${userID}`, {
        method: "GET",
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {
          setphonenumber(result["number"]);
        });
    } catch (error) {}
  };
  //Ask Permission
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [status1, requestPermission1] = MediaLibrary.usePermissions();
  if (status1 === null) {
    requestPermission1();
  }
  console.log(status);

  //to get the image
  async function takeAndUploadPhotoAsync1(paras) {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    result;
    // ImagePicker saves the taken photo to disk and returns a local URI to it

    if (!result.canceled) {
      setprofileActivityIndicators(true);

      let localUri = result.assets[0]["uri"];

      setprofile(localUri);
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      var formdata = new FormData();
      formdata.append("file", { uri: localUri, name: filename, type });
      // Upload the image using the fetch and FormData APIs
      let FFormData = new FormData();
      // Assume "photo" is the name of the form field the server expects
      FFormData.append("photo", { uri: localUri, name: filename, type });
      async function submitdata() {
        try {
          await fetch(
            `http://103.174.10.108:5002/api/job_post/aws_upload/${userID}`,
            {
              method: "POST",
              mode: "cors", // no-cors, *cors, same-origin
              // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              // credentials: "same-origin", // include, *same-origin, omit
              headers: {
                // Accept: "application/json",
                "Content-Type": "multipart/form-data",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: formdata, // body data type must match "Content-Type" header
            }
          )
            .then((response) => response.json())
            .then((result) => {
              setprofilepic(result["updated"]);
              setprofileActivityIndicators(false);
              setModalVisible(false);
            });
        } catch (error) {
          console.log(error);
        }
      }
      submitdata();
    } else {
      setActivityIndicators(false);
      setModalVisible(false);
    }
  }

  const handlecall = () => {
    // console.log("console.log");
    // alert("hiiii");
    dispatch({ type: "userdetails" });
    // setuserdetails("true");
    setTimeout(() => navigation.navigate("bottomhome"), 100);
  };

  const [image, setImage] = useState(null);
  //to get skills

  //to get the files
  const [fileResponse, setfileResponse] = useState(null);
  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });

      setfileResponse(response);

      // setActivityIndicators(true);

      // console.log(result);
      let localUri = response.uri;

      setprofile(localUri);
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      var formdata = new FormData();
      formdata.append("file", { uri: localUri, name: filename, type });
      // Upload the image using the fetch and FormData APIs
      let FFormData = new FormData();
      // Assume "photo" is the name of the form field the server expects
      FFormData.append("photo", { uri: localUri, name: filename, type });
      async function submitdata() {
        try {
          await fetch(
            `http://103.174.10.108:5002/api/job_post/aws_upload/${userID}`,
            {
              method: "POST",
              mode: "cors", // no-cors, *cors, same-origin
              // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              // credentials: "same-origin", // include, *same-origin, omit
              headers: {
                // Accept: "application/json",
                "Content-Type": "multipart/form-data",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: formdata, // body data type must match "Content-Type" header
            }
          )
            .then((response) => response.json())
            .then((result) => {
              setprofilepic(result["updated"]);
              setActivityIndicators(false);
              setModalVisible(false);
            });
        } catch (error) {}
      }
      submitdata();
    } catch (err) {
      console.warn(err);
    }
  }, []);
  //Date picker
  const [date, setDate] = useState(new Date());
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
    });
  };
  async function takeAndUploadPhotoAsync(paras) {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    let result =
      paras === "files"
        ? await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          })
        : await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
    result;
    // ImagePicker saves the taken photo to disk and returns a local URI to it

    setActivityIndicators(true);

    let localUri = result.assets[0]["uri"];

    setImage(localUri);
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    var formdata = new FormData();
    formdata.append("file", { uri: localUri, name: filename, type });
    // Upload the image using the fetch and FormData APIs
    let FFormData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    FFormData.append("photo", { uri: localUri, name: filename, type });
    async function submitdata() {
      try {
        await fetch(
          `http://103.174.10.108:5002/api/job_post/aws_upload/${userID}`,
          {
            method: "POST",
            mode: "cors", // no-cors, *cors, same-origin
            // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
              // Accept: "application/json",
              "Content-Type": "multipart/form-data",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formdata, // body data type must match "Content-Type" header
          }
        )
          .then((response) => response.json())
          .then((result) => {
            setjobpostpic(result["updated"]);
            setActivityIndicators(false);
            setModalVisible(false);
          });
      } catch (error) {}
    }
    submitdata();
  }
  const showDatepicker = () => {
    showMode("date");
  };
  //select Gender
  const [genderValue, setGenderValue] = useState(null);
  const [genderOpen, setGenderOpen] = useState(false);
  //gender vlaidation
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });

  async function fetchdata(paras1) {
    try {
      await fetch("http://103.174.10.108:5002/api/job_pro_userinfo_details", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(paras1),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result == "success") {
            // alert("im at the sucess");
            Redux_dispatch({ type: "personal_job_provider" });
            navigation.navigate("jobprovidebottamtab");
          }
        });
    } catch (error) {
      console.warn(error);
    }
  }
  const handleDropdownChange = (value) => {
    setGenderValue(value);
  };
  const handlesubmits = (paras) => {
    paras.user_id = userID;
    paras.profilepic = profilepic;
    paras.number = phonenumber;
    paras.gender = genderValue == null ? "Prefer Not to Say" : genderValue;
    console.log("personal job provider");
    console.log(paras);
    fetchdata(paras);
  };
  //   const { handleSubmit, control } = useForm();
  const { control } = useForm();
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);
  const [gender, setGender] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Prefer Not to Say", value: "neutral" },
  ]);
  const [isvoice, setisvoice] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [skills, setSkills] = useState(null);
  const [jobseeker, setjobseeker] = useState(false);
  const [jobprovider, setjobprovider] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#EEFBFF" }}>
      <StatusBar style="auto" />

      <View style={styles.title}>
        <Text style={styles.titlestyle}>Personal Information</Text>
      </View>
      <ScrollView nestedScrollEnabled={true}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              color: "#707070",
              marginTop: 10,
              marginBottom: -10,
            }}
          >
            Your Pic
          </Text>
        </View>
        <View style={styles.iconstotal}>
          <View>
            <TouchableOpacity onPress={() => setprofilemodal(true)}>
              {!(profile == null) ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={{ uri: profile }}
                    style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
                  />
                  <MaterialCommunityIcons
                    name="pencil-circle"
                    size={33}
                    color="#1E5966"
                    style={{ position: "relative", bottom: 28, left: 35 }}
                  />
                </View>
              ) : (
                <>
                  <FontAwesome name="user-circle" size={100} color="#1e5966" />
                  <MaterialCommunityIcons
                    name="pencil-circle"
                    size={33}
                    color="#1E5966"
                    style={{ position: "relative", bottom: 25, left: 65 }}
                  />
                </>
              )}
            </TouchableOpacity>
            <Modal
              animationType="slide"
              //animationInTiming = {10900}
              transparent={true}
              visible={profilemodal}
              animationOut="slide"
              swipeDirection="down"
              onRequestClose={() => {
                setprofilemodal(!profilemodal);
                setprofileActivityIndicators(false);
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: "90%",
                  marginHorizontal: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 22,
                }}
              >
                <View
                  style={{
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
                  }}
                >
                  {profileActivityIndicators ? (
                    <View>
                      {/* <Text>Loading. please wait</Text>
                      <ActivityIndicator size="large" /> */}
                      <LottieViewloadingmodal />
                    </View>
                  ) : (
                    <>
                      {/* <TouchableHighlight
                        style={{
                          ...styles.openButton,
                          width: 150,
                          backgroundColor: "#1E5966",
                        }}
                        onPress={() => {
                          requestPermission();
                          takeAndUploadPhotoAsync1("camera");
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <AntDesign name="camera" size={20} color="#fff" />
                          <Text
                            style={{
                              color: "#fff",
                              fontWeight: "500",
                              marginRight: "6%",
                            }}
                          >
                            Take Pic
                          </Text>
                        </View>
                      </TouchableHighlight> */}
                      <TouchableHighlight
                        style={{
                          ...styles.openButton,
                          width: 150,
                          backgroundColor: "#1E5966",
                          marginTop: 20,
                        }}
                        onPress={() => {
                          requestPermission1();
                          takeAndUploadPhotoAsync1("files");
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <FontAwesome name="files-o" size={20} color="white" />
                          <Text
                            style={{
                              color: "#fff",
                              fontWeight: "500",
                              marginRight: "6%",
                            }}
                          >
                            Upload Pic
                          </Text>
                        </View>
                      </TouchableHighlight>
                      <TouchableOpacity
                        style={{ marginTop: 50 }}
                        onPress={() => setprofilemodal(!profilemodal)}
                      >
                        <Text
                          style={{
                            textDecorationLine: "underline",
                            fontSize: 17,
                            color: "red",
                          }}
                        >
                          Close
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <Formik
          validationSchema={providerValidationSchema}
          initialValues={{
            // email: "",
            // password: "",
            // phone_number: "",
            username: "",
            emailid: "",
            number: "",
            // proof: "",
            location: "",
            // gender: "",
            //location: "",
          }}
          onSubmit={(values) => handlesubmits(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
            isValid,
          }) => (
            <>
              <View style={{ marginTop: 0 }}>
                <View style={styles.inputform}>
                  <View style={styles.name}>
                    <View style={styles.fname}>
                      <TextInput
                        placeholder="Username"
                        name="firstname"
                        style={styles.input}
                        placeholderTextColor="#acacac"
                        onChangeText={handleChange("username")}
                        onBlur={handleBlur("username")}
                        defaultValue=""
                        underlineColorAndroid={"transparent"}
                      />
                      {errors.username && touched.username && (
                        <Text
                          style={{
                            fontSize: 10,
                            color: "red",
                            marginTop: "-2%",
                            marginLeft: "7%",
                            // marginTop: "-2%",
                            marginBottom: "2%",
                          }}
                        >
                          {errors.username}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.phone}>
                    <TextInput
                      placeholder="Mobile Number"
                      style={styles.input}
                      // maxLength={10}\
                      editable={phonenumber == "" ? false : true}
                      keyboardType="number-pad"
                      placeholderTextColor="#acacac"
                      onChangeText={handleChange("number")}
                      onBlur={handleBlur("number")}
                      value={
                        phonenumber == ""
                          ? ""
                          : phonenumber.replace(/^(\+91)(\d{10})$/, "$1 $2")
                      }
                    />
                    {errors.number && touched.number && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          marginTop: "-2%",
                          marginLeft: "7%",
                          // marginTop: "-2%",
                          marginBottom: "2%",
                        }}
                      >
                        {errors.number}
                      </Text>
                    )}
                  </View>
                  <View style={{}}>
                    <TextInput
                      placeholder="Email Id"
                      style={styles.input}
                      keyboardType="email-address"
                      onChangeText={handleChange("emailid")}
                      onBlur={handleBlur("emailid")}
                      placeholderTextColor="#acacac"
                      defaultValue=""
                    />
                    {errors.emailid && touched.emailid && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          marginTop: "-2%",
                          marginLeft: "7%",
                          // marginTop: "-2%",
                          marginBottom: "2%",
                        }}
                      >
                        {errors.emailid}
                      </Text>
                    )}
                  </View>
                  {/* <View style={{}}>
                    <TextInput
                      placeholder="Enter Aadhar Number"
                      style={styles.input}
                      onChangeText={handleChange("proof")}
                      onBlur={handleBlur("proof")}
                      placeholderTextColor="#acacac"
                      defaultValue=""
                    />
                    {errors.proof && touched.proof && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          marginTop: "-2%",
                          marginLeft: "7%",
                          // marginTop: "-2%",
                          marginBottom: "2%",
                          // marginHorizontal: 20,
                        }}
                      >
                        {errors.proof}
                      </Text>
                    )}
                  </View> */}
                  <View style={{}}>
                    <TextInput
                      placeholder="Location"
                      style={styles.input}
                      onChangeText={handleChange("location")}
                      onBlur={handleBlur("location")}
                      placeholderTextColor="#ACACAC"
                      defaultValue=""
                    />
                    {errors.location && touched.location && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          marginTop: "-2%",
                          marginLeft: "7%",
                          // marginTop: "-2%",
                          marginBottom: "2%",
                        }}
                      >
                        {errors.location}
                      </Text>
                    )}
                  </View>

                  <View style={{}}>
                    <Controller
                      name="gender"
                      defaultValue=""
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.dropdownGender}>
                          <DropDownPicker
                            style={[
                              styles.dropdown,
                              {
                                width: "90%",
                                marginHorizontal: 20,
                                marginVertical: 6,
                                borderColor: "#D9D9D9",
                                borderWidth: 0.5,
                                borderRadius: 10,
                              },
                            ]}
                            open={genderOpen}
                            value={genderValue} //genderValue
                            items={gender}
                            setOpen={setGenderOpen}
                            setValue={setGenderValue}
                            setItems={setGender}
                            placeholder="Select Gender"
                            placeholderStyle={[{ color: "#ACACAC" }]}
                            dropDownContainerStyle={{
                              width: "90%",
                              marginHorizontal: 20,
                            }}
                            listMode="SCROLLVIEW"
                            onOpen={onGenderOpen}
                            onBlur={onBlur}
                            onChangeValue={onChange}
                            zIndex={3000}
                            zIndexInverse={1000}
                          />
                        </View>
                      )}
                    />
                    {/* {touched.gender && errors.gender && (
                      <Text style={styles.errorText}>{errors.gender}</Text>
                    )} */}
                  </View>
                </View>

                <TouchableOpacity>
                  <LinearGradient
                    colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
                    style={{
                      backgroundColor: isValid ? "#6BC3FF" : "#87CEEB",
                      fontWeight: "600",

                      padding: 10,
                      width: "50%",
                      alignSelf: "center",
                      opacity: isValid ? 1 : 0.5,
                      borderRadius: 10,
                      marginVertical: 20,
                    }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    useAngle={45}
                  >
                    {/* {console.log(isValid)} */}
                    <TouchableOpacity
                      // style={{
                      //   padding: 10,
                      //   width: "50%",
                      //   alignSelf: "center",
                      //   borderRadius: 10,
                      //   marginVertical: 20,
                      // }}
                      onPress={() => handleSubmit()}
                      // disabled={!isValid}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "600",
                          fontSize: 17,
                          color: isValid ? "#fff" : "white",
                        }}
                      >
                        Create
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  title: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  edutext: {
    fontSize: 17,
    fontWeight: "400",
    paddingLeft: 5,
    color: "#1E5966",
    paddingTop: 8,
  },
  titlestyle: {
    fontWeight: "500",
    fontSize: 22,
  },
  iconstotal: {
    alignItems: "center",
    alignContent: "center",
    paddingTop: 20,
    marginBottom: -10,
  },
  education: {
    flexDirection: "row",
    width: "50%",
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
    borderColor: "#707070",
    padding: 100,
    height: "42%",
    alignItems: "center",
    shadowColor: "#000",
    borderWidth: 2,
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
    marginVertical: 10,
    justifyContent: "center",
  },
  inputs: {
    height: 40,
    margin: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
