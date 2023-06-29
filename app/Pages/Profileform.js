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
  Animated,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import { FlatList } from "react-native";
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
import { UserIdcontext } from "../../App";
import { LocalizationContext } from "../../App";
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
import { number } from "yup";

import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";

const dummyArray = new Set();
const dummyArray1 = new Set();
export default function Profileform({ navigation, route }) {
  const { t, language, setlanguage } = useContext(LocalizationContext);

  const { id, userId, setuserId } = useContext(UserIdcontext);

  const [ActivityIndicators, setActivityIndicators] = useState(false);
  const [jobpost, setjobpostpic] = useState(null);
  const [resume, setresume] = useState(null);
  const [eduDetails, seteduDetails] = useState({});
  const [opens, setisopen] = useState(false);
  try {
    if (!genderOpen) {
      if (route.params.eduDetails) {
        dummyArray.add(route.params.eduDetails);
      }
      if (route.params.expdetails) {
        dummyArray1.add(route.params.expdetails);
      }
    }
  } catch (error) {}

  //to get education flatlist
  const [listItems, setListItems] = useState();
  //to get experience flatlist
  const [listItems1, setListItems1] = useState(dummyArray1);
  const ItemView = ({ item }) => {
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <>
        <Text style={styles.item} onPress={() => getItem(item)}>
          {item.insitute_name}
        </Text>
        <Text>
          {item.from.toDateString().split("").slice(3).join("")}--
          {item.to.toDateString().split("").slice(3).join("")}
        </Text>
        <Text style={styles.item} onPress={() => getItem(item)}>
          {item.education_level} {item.grade}
        </Text>
      </>
    );
  };

  const ItemView2 = ({ item }) => {
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <>
        <Text style={styles.item} onPress={() => getItem(item)}>
          {item.companyname}
        </Text>
        <Text>
          {item.workfrom.toDateString()}-{item.workto.toDateString()}
        </Text>
        <Text style={styles.item} onPress={() => getItem(item)}>
          {item.mydesignation}
        </Text>
      </>
    );
  };

  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#C8C8C8" }}
      />
    );
  };

  const getItem = (item) => {
    //Function for click on an item
    alert("Id : " + item.id + " Value : " + item.value);
  };

  const [image, setImage] = useState(null);
  //to get skills
  useEffect(() => {
    // async function fetchdata() {
    //   try {
    //     await fetch("http://103.174.10.108:5002/skills/api", {
    //       method: "GET", // *GET, POST, PUT, DELETE, etc.
    //       mode: "cors", // no-cors, *cors, same-origin
    //       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //       credentials: "same-origin", // include, *same-origin, omit
    //       headers: {
    //         "Content-Type": "application/json",
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //     })
    //       .then((response) => response.json())
    //       .then((result) => ()
    //   } catch (error) {
    //     console.warn(error);
    //   }
    // }
    // fetchdata();
  }, []);
  //to get the files
  const [fileResponse, setfileResponse] = useState(null);
  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });

      setfileResponse(response);

      // setActivityIndicators(true);

      //
      let localUri = response.uri;

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
          await fetch(`http://103.174.10.108:5002/api/job_post/aws_upload/25`, {
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
          })
            .then((response) => response.json())
            .then((result) => {
              setresume(result["updated"]);
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
  //to useprofilepic
  const [propic, setpropic] = useState();
  const [localpro, setlocalpro] = useState();
  async function takeAndUploadProfile(paras) {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    let result =
      paras === "files"
        ? await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          })
        : await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
    result;
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    if (!result.canceled) {
      setActivityIndicators(true);

      let localUri = result.assets[0]["uri"];

      setlocalpro(localUri);
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
          await fetch(`http://103.174.10.108:5002/api/job_post/aws_upload/11`, {
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
          })
            .then((response) => response.json())
            .then((result) => {
              setpropic(result["updated"]);
              setActivityIndicators(false);
              setModalVisible(false);
            });
        } catch (error) {}
      }
      submitdata();
    } else {
      setActivityIndicators(false);
      setModalVisible(false);
    }
  }

  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [status1, requestPermission1] =
    ImagePicker.useMediaLibraryPermissions();

  //profile pic end
  async function takeAndUploadPhotoAsync(paras) {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    let result =
      paras === "files"
        ? await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          })
        : await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
    result;
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    if (!result.canceled) {
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
          await fetch(`http://103.174.10.108:5002/api/job_post/aws_upload/5`, {
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
          })
            .then((response) => response.json())
            .then((result) => {
              setjobpostpic(result["updated"]);
              setActivityIndicators(false);
              setModalVisible(false);
            });
        } catch (error) {}
      }
      submitdata();
    } else {
      setActivityIndicators(false);
      setModalVisible(false);
    }
  }

  const showDatepicker = () => {
    setisopen(true);
    showMode("date");
  };
  //select Gender
  const [genderValue, setGenderValue] = useState(null);

  const [genderOpen, setGenderOpen] = useState(false);
  const { handleSubmit, control } = useForm();
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
  const [modalVisible1, setModalVisible1] = useState(false);

  const handleSubmits = (paras) => {
    paras.gender = genderValue;
    paras.dob = date;
    paras.education = dummyArray;
    paras.experience = dummyArray1;
    paras.proof = jobpost;
    paras.resume = resume;
    paras.profilepic = propic;

    async function submitdata() {
      try {
        await fetch("http://103.174.10.108:5002/api/user/update/10", {
          method: "PUT",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(paras), // body data type must match "Content-Type" header
        })
          .then((response) => response.json())
          .then((result) => {});
      } catch (error) {
        console.warn(error);
      }
    }
    submitdata();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View
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
          ></Pressable>
        </View>
      </View>
      <View style={styles.title}>
        <Text style={styles.titlestyle}>Personal Information</Text>
      </View>

      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.iconstotal}>
          <View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible1(!modalVisible1);
              }}
            >
              {localpro ? (
                <Image
                  source={{ uri: localpro }}
                  style={{ width: 150, height: 140, borderRadius: 150 / 2 }}
                />
              ) : (
                <>
                  <FontAwesome name="user-circle" size={100} color="#D9D9D9" />

                  <MaterialCommunityIcons
                    name="pencil-circle"
                    size={34}
                    color="#1e5966"
                    style={{ position: "relative", bottom: 28, left: 65 }}
                  />
                </>
              )}
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            //animationInTiming = {13900}
            transparent={true}
            visible={modalVisible1}
            animationOut="slide"
            swipeDirection="down"
            onRequestClose={() => {
              setModalVisible1(!modalVisible1);
              setActivityIndicators(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {ActivityIndicators ? (
                  <View>
                    <Text>Loading. please wait</Text>
                    <ActivityIndicator size="large" />
                  </View>
                ) : (
                  <>
                    {/* <TouchableHighlight
                      style={{
                        ...styles.openButton,
                        width: 150,
                        backgroundColor: "#2196F3",
                      }}
                      onPress={() => {
                        requestPermission(), takeAndUploadProfile("camera");
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <AntDesign name="camera" size={24} color="white" />
                        <Text style={styles.textStyle}>{t("pic")}</Text>
                      </View>
                    </TouchableHighlight> */}

                    <TouchableHighlight
                      style={{
                        ...styles.openButton,
                        width: 150,
                        backgroundColor: "#2196F3",
                        marginTop: 20,
                      }}
                      onPress={() => (
                        requestPermission1(), takeAndUploadProfile("files")
                      )}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FontAwesome name="files-o" size={24} color="white" />
                        <Text style={styles.textStyle}>{t("fi")}</Text>
                      </View>
                    </TouchableHighlight>
                  </>
                )}
              </View>
            </View>
          </Modal>
        </View>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            username: "",
            mobilenumber: "",
            mailid: "",
          }}
          onSubmit={(values) => handleSubmits(values)}
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
                        placeholder={t("firstname")}
                        name="Username"
                        style={styles.input}
                        placeholderTextColor="#707070"
                        onChangeText={handleChange("username")}
                        onBlur={handleBlur("username")}
                        defaultValue=""
                        underlineColorAndroid={"transparent"}
                      />
                      {errors.username && touched.username && (
                        <Text
                          style={{
                            fontSize: 13,
                            color: "red",
                            marginHorizontal: 20,
                          }}
                        >
                          {errors.username}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.phone}>
                    <TextInput
                      placeholder={t("phoneplace")}
                      style={styles.input}
                      maxLength={10}
                      keyboardType="number-pad"
                      placeholderTextColor="#707070"
                      onChangeText={handleChange("mobilenumber")}
                      onBlur={handleBlur("mobilenumber")}
                      defaultValue=""
                    />
                    {errors.mobilenumber && touched.mobilenumber && (
                      <Text
                        style={{
                          fontSize: 13,
                          color: "red",
                          marginHorizontal: 20,
                        }}
                      >
                        {errors.mobilenumber}
                      </Text>
                    )}
                  </View>
                  <View style={styles.email}>
                    <TextInput
                      placeholder={t("emailplace")}
                      style={styles.input}
                      keyboardType="email-address"
                      onChangeText={handleChange("mailid")}
                      onBlur={handleBlur("mailid")}
                      placeholderTextColor="#707070"
                      defaultValue=""
                    />
                    {errors.email && touched.email && (
                      <Text
                        style={{
                          fontSize: 13,
                          color: "red",
                          marginHorizontal: 20,
                        }}
                      >
                        {errors.email}
                      </Text>
                    )}
                  </View>
                  <View style={styles.email}>
                    <Controller
                      name="gender"
                      defaultValue=""
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <View style={styles.dropdownGender}>
                          <DropDownPicker
                            style={[
                              styles.dropdown,
                              {
                                width: "90%",
                                marginHorizontal: 20,
                                marginVertical: 6,
                                borderColor: "#707070",
                              },
                            ]}
                            open={genderOpen}
                            value={genderValue} //genderValue
                            items={gender}
                            setOpen={setGenderOpen}
                            setValue={setGenderValue}
                            setItems={setGender}
                            placeholder="Select Gender"
                            placeholderStyle={styles.placeholderStyles}
                            dropDownContainerStyle={{
                              width: "90%",
                              marginHorizontal: 20,
                            }}
                            listMode="SCROLLVIEW"
                            onOpen={onGenderOpen}
                            onChangeValue={onChange}
                            zIndex={3000}
                            zIndexInverse={1000}
                          />
                        </View>
                      )}
                    />
                  </View>

                  {
                    <View style={styles.password}>
                      <TextInput
                        placeholder={t("passpla")}
                        style={[styles.input, { position: "relative" }]}
                        underlineColorAndroid="transparent"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        placeholderTextColor="#707070"
                        value={opens ? date.toDateString() : value}
                      />
                      <Pressable onPress={showDatepicker}>
                        <FontAwesome5
                          name="calendar-alt"
                          size={24}
                          color="#333"
                          style={{
                            position: "absolute",
                            right: 40,
                            bottom: 23,
                          }}
                        />
                      </Pressable>
                      {errors.password && touched.password && (
                        <Text
                          style={{
                            fontSize: 13,
                            color: "red",
                            marginHorizontal: 20,
                          }}
                        >
                          {errors.password}
                        </Text>
                      )}
                    </View>
                  }
                </View>

                <View style={styles.password}>
                  <TextInput
                    placeholder={t("passplac")}
                    style={[styles.input, { position: "relative" }]}
                    underlineColorAndroid="transparent"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    placeholderTextColor="#707070"
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#D9d9d9",
                      padding: 10,
                      width: "30%",
                      borderRadius: 10,
                      position: "absolute",
                      right: 30,
                      top: 15,
                    }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={{ textAlign: "center", color: "#333" }}>
                      Browse
                    </Text>
                  </TouchableOpacity>
                  <Modal
                    animationType="slide"
                    //animationInTiming = {13900}
                    transparent={true}
                    visible={modalVisible}
                    animationOut="slide"
                    swipeDirection="down"
                    onRequestClose={() => {
                      setModalVisible(!modalVisible);
                      setActivityIndicators(false);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        {ActivityIndicators ? (
                          <View>
                            <Text>Loading. please wait</Text>
                            <ActivityIndicator size="large" />
                          </View>
                        ) : (
                          <>
                            {/* <TouchableHighlight
                              style={{
                                ...styles.openButton,
                                width: 150,
                                backgroundColor: "#2196F3",
                              }}
                              onPress={() => {
                                takeAndUploadPhotoAsync("camera");
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <AntDesign
                                  name="camera"
                                  size={24}
                                  color="white"
                                />
                                <Text style={styles.textStyle}>{t("pic")}</Text>
                              </View>
                            </TouchableHighlight> */}

                            <TouchableHighlight
                              style={{
                                ...styles.openButton,
                                width: 150,
                                backgroundColor: "#2196F3",
                                marginTop: 20,
                              }}
                              onPress={() => takeAndUploadPhotoAsync("files")}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {/* <FontAwesome
                                  name="files-o"
                                  size={24}
                                  color="white"
                                /> */}
                                <Text style={styles.textStyle}>{t("fi")}</Text>
                              </View>
                            </TouchableHighlight>
                          </>
                        )}
                      </View>
                    </View>
                  </Modal>
                  {image === null ? (
                    <Text></Text>
                  ) : (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      <Image
                        source={{ uri: image }}
                        style={{ width: 50, height: 50 }}
                      />
                    </View>
                  )}
                  {errors.password && touched.password && (
                    <Text
                      style={{
                        fontSize: 13,
                        color: "red",
                        marginHorizontal: 20,
                      }}
                    >
                      {errors.password}
                    </Text>
                  )}
                </View>
                <View style={styles.skill}>
                  {skills === null ? (
                    <View>
                      <Text style={{ color: "#707070", marginHorizontal: 30 }}>
                        Loading...
                      </Text>
                    </View>
                  ) : (
                    <DropDownPicker
                      placeholder={t("skillpla")}
                      open={open}
                      value={value}
                      items={skills}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setSkills}
                      multiple={true}
                      searchable={true}
                      dropDownDirection="AUTO"
                      mode="BADGE"
                      listMode="MODAL"
                      style={{
                        borderWidth: 0.3,
                        borderColor: "black",
                        marginHorizontal: 20,
                        width: 355,
                      }}
                      modalAnimationType="slide"
                      placeholderStyle={{
                        fontWeight: "bold",
                      }}
                      badgeColors={"black"}
                      badgeTextStyle={{
                        fontStyle: "italic",
                        color: "white",
                      }}
                      badgeDotColors={["#00b4d8"]}
                    />
                  )}
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("eduexp")}>
                  <View style={[styles.education, { paddingRight: 10 }]}>
                    <View style={styles.educationIcon}>
                      <AntDesign name="pluscircleo" size={24} color="#1E5966" />
                    </View>
                    <View>
                      <Text style={styles.edutext}>Add Education</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <View style={styles.container}>
                    <ScrollView>
                      <FlatList
                        data={Array.from(dummyArray)}
                        //data defined in constructor
                        ItemSeparatorComponent={ItemSeparatorView}
                        //Item Separator View
                        renderItem={ItemView}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </ScrollView>
                  </View>
                  <View style={styles.container}></View>
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate("workexp")}
                >
                  <View style={styles.education}>
                    <View style={styles.educationIcon}>
                      <AntDesign name="pluscircleo" size={24} color="#1E5966" />
                    </View>
                    <View>
                      <Text style={styles.edutext}>Add Experience</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <View style={styles.container}>
                    <ScrollView>
                      <FlatList
                        data={Array.from(dummyArray1)}
                        //data defined in constructor
                        ItemSeparatorComponent={ItemSeparatorView}
                        //Item Separator View
                        renderItem={ItemView2}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </ScrollView>
                  </View>
                  <View style={styles.container}></View>
                </View>
                <Text style={{ marginHorizontal: 20 }}>
                  {fileResponse === null ? "loading" : fileResponse.name}
                </Text>
                <TouchableOpacity onPress={handleDocumentSelection}>
                  <View style={[styles.education, { paddingRight: 15 }]}>
                    <View style={styles.educationIcon}>
                      <AntDesign name="pluscircleo" size={24} color="#1E5966" />
                    </View>
                    <View>
                      <Text style={styles.edutext}>Add Resume</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: isValid ? "#6BC3FF" : "#87ceeb",
                      padding: 10,
                      width: "50%",
                      alignSelf: "center",
                      borderRadius: 10,
                      marginVertical: 20,
                    }}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "600",
                        color: isValid ? "black" : "white",
                      }}
                    >
                      Create
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
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
    borderColor: "#707070",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
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
