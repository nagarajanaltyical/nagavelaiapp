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
import { FontAwesome5 } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
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
import eduValidationSchema from "../components/educationvalidation";
// import { isValidPhoneNumber } from "react-phone-number-input";
import { LinearGradient } from "expo-linear-gradient";
import OtpScreen from "./Otpscreen";
import OTPInput from "../components/otp/otpInput";
import * as ImagePicker from "expo-image-picker";
import { LocalizationContext } from "../../App";
import { number } from "yup";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSelector } from "react-redux";

// import { Button } from "react-native-paper";
import LottieViewloading from "../components/Loading";
export default function EduInfo2({ navigation: { goBack }, route }) {
  const { t, language, setlanguage } = useContext(LocalizationContext);
  const [refreshing, setRefreshing] = React.useState(false);

  const [loading, setloading] = useState(true);

  //user_ID
  const userID = useSelector((state) => state.ID);

  //  const onRefresh = React.useCallback(() => {
  //    setRefreshing(true);
  //    setTimeout(() => {
  //      setRefreshing(false);
  //    }, 2000);
  //  }, []);
  //handleDates
  const handleDates = (paras) => {
    // const dateString = "2023-03-05T06:26:08.021Z";
    const dateObj = new Date(paras);
    const options = {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);

    return formattedDate.split(",").join(" ");
  };
  //Date 2
  const [ActivityIndicators, setActivityIndicators] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [datechanged1, setdatechanged1] = useState(false);

  const showDatePicker1 = () => {
    setDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const handleConfirm = (date) => {
    setSelectedDate(date);
    setdatechanged1(true);
    hideDatePicker();
  };
  //
  const [data, setdata] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [image, setImage] = useState(null);
  //to get skills
  useEffect(() => {
    fetchdata();
  }, []);
  async function fetchdata() {
    const details = {};
    details.id = route.params.id;
    details.tableType = "education";
    try {
      await fetch("http://103.174.10.108:5002/api/exp_eductaion_re", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(details),
      })
        .then((response) => response.json())
        .then((result) => {
          setloading(false);
        });
    } catch (error) {
      console.warn(error);
    }
  }
  //DAte picker
  const [date, setDate] = useState(new Date());
  const [datechanged, setdatechanged] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setdatechanged(true);
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
  }
  const showDatepicker = () => {
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
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Prefer Not to Say", value: "Prefer Not to Say" },
  ]);
  const [isvoice, setisvoice] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [skills, setSkills] = useState(null);
  const [jobseeker, setjobseeker] = useState(false);
  const [jobprovider, setjobprovider] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleSubmits = (values) => {
    values.start = datechanged ? date : data.start;
    values.end = datechanged1 ? selectedDate : data.end;
    values.id = route.params.id;
    values.tableType = "education";
    // const finalOBj = {};
    // finalOBj.education = values;
    // finalOBj.user_id = userID;
    // console.log(finalOBj);

    async function submitdata(paras) {
      console;
      try {
        await fetch("http://103.174.10.108:5002/api/edu_exp_update", {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(paras),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.user == "success") {
              goBack();
            }
          });
      } catch (error) {
        console.warn(error);
      }
    }
    submitdata(values);
  };
  if (loading) {
    return <LottieViewloading />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#eefbff" }}>
      <StatusBar style="auto" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "3%",
          marginBottom: "8%",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "500", color: "#333" }}>
          Education Details
        </Text>
      </View>
      <ScrollView nestedScrollEnabled={true}>
        <Formik
          validationSchema={eduValidationSchema}
          initialValues={{
            inisitute: "",
            eduaction_level: "",
            Grade: "",
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
              <View style={{}}>
                <View style={{}}>
                  {console.log("im at dats return type")}
                  {console.log(data)}
                  <TextInput
                    placeholder="Institute Name"
                    name="inisitute"
                    style={styles.input}
                    placeholderTextColor="#acacac"
                    onChangeText={handleChange("inisitute")}
                    onBlur={handleBlur("inisitute")}
                    defaultValue={data.inisitute}
                    underlineColorAndroid={"transparent"}
                  />
                  {errors.inisitute && touched.inisitute && (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "red",
                        marginTop: "-3%",
                        marginLeft: "7%",
                        marginBottom: "2%",
                      }}
                    >
                      {errors.inisitute}
                    </Text>
                  )}
                  <View style={{}}>
                    <TextInput
                      placeholder="Education Level"
                      style={styles.input}
                      placeholderTextColor="#acacac"
                      onChangeText={handleChange("eduaction_level")}
                      onBlur={handleBlur("eduaction_level")}
                      defaultValue={data.eduaction_level}
                    />
                    {errors.eduaction_level && touched.eduaction_level && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          marginTop: "-3%",
                          marginLeft: "7%",
                          marginBottom: "2%",
                        }}
                      >
                        {errors.eduaction_level}
                      </Text>
                    )}
                  </View>
                  <View style={styles.email}>
                    <TextInput
                      placeholder="Marks/CGPA"
                      style={styles.input}
                      onChangeText={handleChange("Grade")}
                      onBlur={handleBlur("Grade")}
                      placeholderTextColor="#acacac"
                      defaultValue={data.Grade}
                    />
                    {errors.Grade && touched.Grade && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          marginTop: "-3%",
                          marginLeft: "7%",
                          marginBottom: "2%",
                        }}
                      >
                        {errors.Grade}
                      </Text>
                    )}
                  </View>
                  <View style={{}}>
                    <TextInput
                      placeholder={t("passpla")}
                      style={[styles.input, { position: "relative" }]}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#acacac"
                      defaultValue={
                        datechanged
                          ? date.toDateString()
                          : handleDates(data.start)
                      }
                    />
                    <Pressable onPressOut={showDatepicker}>
                      <FontAwesome5
                        name="calendar-alt"
                        size={20}
                        color="#1e5966"
                        style={{
                          position: "absolute",
                          right: 40,
                          bottom: 30,
                        }}
                      />
                    </Pressable>
                  </View>
                  <View style={{}}>
                    <TextInput
                      placeholder={t("passpla")}
                      style={[styles.input, { position: "relative" }]}
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#acacac"
                      defaultValue={
                        datechanged1
                          ? selectedDate.toDateString()
                          : handleDates(data.end)
                      }
                    />
                    <Pressable onPressOut={showDatePicker1}>
                      <FontAwesome5
                        name="calendar-alt"
                        size={20}
                        color="#1e5966"
                        style={{
                          position: "absolute",
                          right: 40,
                          bottom: 30,
                        }}
                      />
                    </Pressable>
                    <DateTimePickerModal
                      date={selectedDate}
                      isVisible={datePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                  </View>
                </View>
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
                  <TouchableOpacity
                    // style={{
                    //   padding: 10,
                    //   width: "50%",
                    //   alignSelf: "center",
                    //   borderRadius: 10,
                    //   marginVertical: 20,
                    // }}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: 17,
                        color: isValid ? "#fff" : "white",
                      }}
                    >
                      Update
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
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
  labelname: {
    marginHorizontal: 23,
    color: "#333",
    fontSize: 16,
    fontWeight: "400",
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
    borderColor: "#D9D9D9",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 0.5,
    width: "90%",
    padding: 10,
    marginHorizontal: 20,
    marginTop: "1%",
    marginBottom: "4%",
    // marginVertical: 10,
    justifyContent: "center",
  },
});
