import { FontAwesome5 } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";

// import { isValidPhoneNumber } from "react-phone-number-input";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSelector } from "react-redux";
import { LocalizationContext } from "../../App";
import workvalidationSchema from "../components/workformvalidation";
export default function Workexperience({ navigation }) {
  const { t, language, setlanguage } = useContext(LocalizationContext);
  const [ActivityIndicators, setActivityIndicators] = useState(false);
  const [image, setImage] = useState(null);
  //set to date using this method
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const userID = useSelector((state) => state.ID);

  const showDatePicker1 = () => {
    setDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
    setshowplace1(false);
  };
  //
  const [selectedDate, setSelectedDate] = useState(new Date());
  //to get skills
  // useEffect(() => {
  //   async function fetchdata() {
  //     try {
  //       await fetch("http://192.168.1.6:5000/skills/api", {
  //         method: "GET", // *GET, POST, PUT, DELETE, etc.
  //         mode: "cors", // no-cors, *cors, same-origin
  //         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //         credentials: "same-origin", // include, *same-origin, omit
  //         headers: {
  //           "Content-Type": "application/json",
  //           // 'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //       })
  //         .then((response) => response.json())
  //         .then((result) => (
  //     } catch (error) {
  //       console.warn(error);
  //     }
  //   }
  //   fetchdata();
  // }, []);
  //DAte picker
  const [isChecked, setChecked] = useState(false);
  const [isclicked, setisclicked] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showplace, setshowplace] = useState(true);
  const [showplace1, setshowplace1] = useState(true);
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
    setshowplace(false);
  };
  //select Gender
  const [genderValue, setGenderValue] = useState(null);
  const [genderOpen, setGenderOpen] = useState(false);
  const { handleSubmit, control } = useForm();

  const handleSubmits = (values) => {
    values.start = date;
    values.end = selectedDate;
    values.user_id = userID;

    // const finalOBj = {};
    // finalOBj.experience = values;
    // finalOBj.user_id = userID;
    //

    async function submitdata(paras) {
      try {
        await fetch("http://103.174.10.108:5002/api/user/experience", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
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
              navigation.goBack({
                experience_given: true,
                experience_given: true,
              });
            }
          });
      } catch (error) {
        console.warn(error);
      }
    }
    submitdata(values);
  };
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#eeFBFF",
      }}
    >
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
          Experience Details
        </Text>
      </View>
      <ScrollView nestedScrollEnabled={true}>
        <Formik
          validationSchema={workvalidationSchema}
          initialValues={{
            job_description: "",
            Designation: "",
            industry: "",
            company_name: "",
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
                      {/* <Text style={styles.labelname}>Company Name</Text> */}
                      <TextInput
                        placeholder="Company Name"
                        name="firstname"
                        style={styles.input}
                        placeholderTextColor="#ACACAC"
                        onChangeText={handleChange("company_name")}
                        onBlur={handleBlur("company_name")}
                        defaultValue=""
                        underlineColorAndroid={"transparent"}
                      />
                      {errors.company_name && touched.company_name && (
                        <Text
                          style={{
                            fontSize: 10,
                            color: "red",
                            marginTop: "-2%",
                            marginLeft: "7%",
                            marginBottom: "2%",
                          }}
                        >
                          {errors.company_name}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.phone}>
                    {/* <Text style={styles.labelname}>Industry</Text> */}
                    <TextInput
                      placeholder="Industry Type"
                      style={styles.input}
                      placeholderTextColor="#ACACAC"
                      onChangeText={handleChange("industry")}
                      onBlur={handleBlur("industry")}
                      defaultValue=""
                    />
                    {errors.industry && touched.industry && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          marginTop: "-2%",
                          marginLeft: "7%",
                          marginBottom: "2%",
                        }}
                      >
                        {errors.industry}
                      </Text>
                    )}
                  </View>
                  <View style={styles.email}>
                    {/* <Text style={styles.labelname}>My Designation</Text> */}
                    <TextInput
                      placeholder="Your Designation"
                      style={styles.input}
                      onChangeText={handleChange("Designation")}
                      onBlur={handleBlur("Designation")}
                      placeholderTextColor="#ACACAC"
                      defaultValue=""
                    />
                    {errors.Designation && touched.Designation && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          marginTop: "-2%",
                          marginLeft: "7%",
                          marginBottom: "2%",
                        }}
                      >
                        {errors.Designation}
                      </Text>
                    )}
                  </View>

                  <View style={styles.password}>
                    {/* <Text style={styles.labelname}>From:</Text> */}
                    <TextInput
                      placeholder="Start Date"
                      style={[styles.input, { position: "relative" }]}
                      placeholderTextColor="#ACACAC"
                      defaultValue={
                        showplace ? "" : date.toDateString().slice(3)
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
                          bottom: 23,
                        }}
                      />
                    </Pressable>
                    {errors.password && touched.password && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          marginTop: "-2%",
                          marginLeft: "7%",
                          marginBottom: "2%",
                        }}
                      >
                        {errors.password}
                      </Text>
                    )}
                  </View>

                  <View style={[styles.section, { marginLeft: 25 }]}>
                    <Checkbox
                      style={styles.checkbox}
                      value={isChecked}
                      onValueChange={() => {
                        setisclicked(!isclicked), setChecked(!isChecked);
                      }}
                    />
                    <Text style={[styles.paragraph, { color: "#333" }]}>
                      Currently working
                    </Text>
                  </View>
                  {!isChecked ? (
                    <View style={styles.password}>
                      {/* <Text style={styles.labelname}>To:</Text> */}
                      <TextInput
                        placeholder="End Date"
                        style={[styles.input, { position: "relative" }]}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#ACACAC"
                        defaultValue={
                          showplace1 ? "" : selectedDate.toDateString().slice(3)
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
                            bottom: 23,
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
                  ) : (
                    ""
                  )}
                  <View style={styles.email}>
                    {/* <Text style={styles.labelname}>Your Job Description</Text> */}
                    <TextInput
                      placeholder="Enter Your Description"
                      style={[
                        styles.input,
                        { height: 150, textAlignVertical: "top" },
                      ]}
                      onChangeText={handleChange("job_description")}
                      onBlur={handleBlur("job_description")}
                      placeholderTextColor="#ACACAC"
                      defaultValue=""
                      multiline={true}
                      numberOfLines={2}
                    />
                    {errors.job_description && touched.job_description && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          marginTop: "-2%",
                          marginLeft: "7%",
                          marginBottom: "2%",
                        }}
                      >
                        {errors.job_description}
                      </Text>
                    )}
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
    fontWeight: "500",
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
    marginVertical: 10,
    justifyContent: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
    marginLeft: 5,
  },
});
