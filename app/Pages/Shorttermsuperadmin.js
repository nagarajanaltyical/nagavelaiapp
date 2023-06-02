import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
  Image,
  TouchableHighlight,
} from "react-native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
// import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useContext } from "react";
import { LocalizationContext } from "../../App";
import Checkbox from "expo-checkbox";
import { AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import LottieViewloadingmodal from "../components/Loadinmodal";

//short term form
const schema = yup.object().shape({
  job_title: yup
    .string()
    .required("Job title cant be empty")
    .typeError("Job title  cannot be null"),
  // workspace: yup
  //   .string()
  //   .required("workspace is required")
  //   .typeError("workspace cannot be null"),
  // location: yup.string().required("location of the job is required"),
  // job_description: yup
  //   .string()
  //   .required("job_description of the job is required"),
  Duration: yup
    .string()
    .typeError("Duration cannot be null")
    .required("Duration is required"),
  per: yup
    .string()
    .required("Salary details cant be empty")
    .typeError("Job title  cannot be null"),
  Salary: yup.string().required("Please enter the salary Details"),
  country: yup
    .string()
    .required("Country cant be empty")
    .typeError("Country  cannot be null"),
  state: yup
    .string()
    .required("State cant be empty")
    .typeError("State  cannot be null"),
  District: yup
    .string()
    .required("District can't be empty")
    .typeError("District  cannot be null"),
  Openings: yup
    .string()
    .required("openings can't be empty")

    .typeError("openings cannot be null"),
  // mobile_number: yup.string().required("Mobile number is required"),
  // email: yup.string().required("email id is required"),
});

const ShortTermadminForms = ({ navigation: { goBack } }) => {
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const { t, language, setlanguage } = useContext(LocalizationContext);
  console.log(language);
  const userID = useSelector((state) => state.ID);
  const [gender, setGender] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Prefer Not to Say", value: "neutral" },
  ]);

  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyValue, setCompanyValue] = useState(null);
  const [company, setComapny] = useState([
    { label: "PUCIT", value: "pucit" },
    { label: "UCP", value: "ucp" },
    { label: "UET", value: "uet" },
  ]);

  //companyopen1
  const [companyOpen1, setCompanyOpen1] = useState(false);
  const [companyValue1, setCompanyValue1] = useState(null);

  const [company1, setComapny1] = useState([
    { label: "PUCIT", value: "pucit" },
    { label: "UCP", value: "ucp" },
    { label: "UET", value: "uet" },
  ]);

  //checkcbox
  const [isChecked, setChecked] = useState(false);
  const [isclicked, setisclicked] = useState(false);
  //postpic
  const [jobpost, setjobpostpic] = useState(null);
  const [jobpost1, setjobpostpic1] = useState(null);

  //duration
  const [durationopen, setdurationopen] = useState(false);
  const [durationvalue, setdurationvalue] = useState(false);
  const [duration, setduration] = useState([
    { label: "1-10 Days", value: "1-10 Days" },
    { label: "11-30 Days", value: "11-30 Days" },
    { label: "1-6 Months", value: "1-6 Months" },
    { label: "7-12 Months", value: "7-12 Months" },
    { label: "2 Year or Above", value: "2 Year or Above " },
  ]);
  const ondurationOpen = useCallback(() => {
    setCompanyOpen(false);
  });
  const states = useSelector((state) => state);

  //perday hour
  const [houropen, sethouropen] = useState(false);
  const [hourvalue, sethourvalue] = useState(false);
  const [hour, sethour] = useState([
    { label: "Per Hour", value: "Per Hour" },
    { label: "Per Day", value: "Per Day" },
    { label: "Per Week", value: "Per Week" },
    { label: "Per Month", value: "Per Month" },
    { label: "Per Year", value: "Per Year" },
  ]);
  const [phonenumber, setphonenumber] = useState("");
  async function getuserdata() {
    try {
      await fetch(`http://103.174.10.108:5002/api/user_number/${userID}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => response.json())
        .then(
          (result) => (console.log(result), setphonenumber(result["number"]))
        );
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    setlanguage(states.lang);
  }, [states.lang]);
  //to get the item
  useEffect(() => {
    fetchdata();
    getCountries();
    getuserdata();
  }, []);
  async function fetchdata() {
    try {
      await fetch("http://103.174.10.108:5002/api/s_job_title", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => response.json())
        .then((result) => (console.log(result), setComapny(result)));
    } catch (error) {
      console.warn(error);
    }
  }
  const [loading, setLoading] = useState(false);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const onCompanyOpen = useCallback(() => {
    setGenderOpen(false);
  }, []);

  const [cityopen, setcityopen] = useState(false);
  const [cityvalue, setcityvalue] = useState(null);
  const [countryopen, setcountryopen] = useState(false);
  const [countryvalue, setcountryvalue] = useState(null);
  const [data1, setdata1] = useState([]);

  async function getCountries() {
    try {
      await fetch(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json",
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          setdata1(result);
        });
    } catch (error) {
      console.warn(error);
    }
  }
  const country = [...new Set(data1.map((items) => items.country))];

  country.sort();
  const countryObj = [];
  const statesObj = [];
  const districtsobj = [];
  for (let i = 0; i < country.length; i++) {
    countryObj.push({ label: country[i], value: country[i] });
  }

  // //to get the states
  const onCountryChange = (paras) => {
    let states = data1.filter((e) => e.country == paras);

    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();

    for (let i = 0; i < states.length; i++) {
      statesObj.push({ label: states[i], value: states[i] });
    }
  };
  //state change
  const onstateChange = (paras) => {
    let districts = data1.filter((e) => e.subcountry == paras);

    districts = [...new Set(districts.map((item) => item.name))];
    for (let i = 0; i < districts.length; i++) {
      districtsobj.push({ label: districts[i], value: districts[i] });
    }
  };

  //city
  const onCityChange = (paras) => {
    let city = data1.filter((e) => e.name == paras);
  };

  //image index
  //pic for image
  const [modalVisible, setModalVisible] = useState(false);

  const [ActivityIndicators, setActivityIndicators] = useState(false);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [status1, requestPermission1] =
    ImagePicker.useMediaLibraryPermissions();
  console.log(status);
  const [image, setImage] = useState(null);
  //upload IMage syntax
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
    console.log(result.canceled);
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

  const [modalVisible1, setModalVisible1] = useState(false);

  const [ActivityIndicators1, setActivityIndicators1] = useState(false);
  const [status2, requestPermission2] = ImagePicker.useCameraPermissions();
  const [status3, requestPermission3] =
    ImagePicker.useMediaLibraryPermissions();
  console.log(status);
  const [image1, setImage1] = useState(null);
  //upload IMage syntax
  async function takeAndUploadPhotoAsync1(paras) {
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
    console.log(result.canceled);
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    if (!result.canceled) {
      setActivityIndicators1(true);

      let localUri = result.assets[0]["uri"];

      setImage1(localUri);
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
      async function submitdata1() {
        console.log("PHOTCOME");
        try {
          await fetch(`http://103.174.10.108:5002/api/job_post/aws_upload/1`, {
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
              setjobpostpic1(result["updated"]);
              setActivityIndicators1(false);
              setModalVisible1(false);
            });
        } catch (error) {
          console.log(error);
        }
      }
      submitdata1();
    } else {
      setActivityIndicators1(false);
      setModalVisible1(false);
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    const result = company.filter(checkcom);
    function checkcom(com) {
      return com.value == companyValue;
    }
    const finalJob = result[0].label;

    data.job_title = finalJob;
    data.pic = jobpost;
    data.logo = jobpost1;
    data.number = phonenumber;
    data.user_id = userID;
    data.is_short = "True";
    data.s_admin = "True";
    data.isallow_tocall = isclicked;
    console.log(data);
    async function submitdatas() {
      try {
        await fetch("http://103.174.10.108:5002/api/shorttime_job", {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if (result.post == "success") {
              Alert.alert("Sucessfully posted");
              goBack();
            } else {
              Alert.alert(result.post);
            }
          });
      } catch (error) {
        console.warn(error);
      }
    }
    submitdatas();
  };
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });
  return (
    <View style={{ backgroundColor: "#eefbff", height: "100%" }}>
      {/* <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "3%",
          marginBottom: "6%",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "500", color: "#333" }}>
          Short Term Form
        </Text>
      </View> */}
      <ScrollView style={{ marginHorizontal: 10 }}>
        <View style={styles.dropdownCompany}>
          <Controller
            name="job_title"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <DropDownPicker
                style={styles.dropdown}
                open={companyOpen}
                value={companyValue} //companyValue
                items={company}
                setOpen={setCompanyOpen}
                listMode="MODAL"
                modalTitle="Select job title"
                modalProps={{
                  animationType: "slide",
                }}
                modalContentContainerStyle={{
                  backgroundColor: "white",
                }}
                setValue={setCompanyValue}
                setItems={setComapny}
                placeholder={t("job_title")}
                placeholderStyle={styles.placeholderStyles}
                loading={loading}
                activityIndicatorColor="#5188E3"
                searchable={true}
                searchPlaceholder="Search title here..."
                onOpen={onCompanyOpen}
                onChangeValue={onChange}
                zIndex={1000}
                zIndexInverse={3000}
              />
            )}
          />
          {errors.job_title && (
            <Text
              style={{
                fontSize: 10,
                color: "red",
                // marginTop: "-3%",
                marginLeft: "2%",
                // marginBottom: "2%",
              }}
            >
              {errors.job_title.message}
            </Text>
          )}
        </View>
        <Controller
          name="company"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input]}
              selectionColor={"#5188E3"}
              placeholder="Company_name"
              //   keyboardType="number-pad"
              multiline
              // maxLength={}
              numberOfLines={4}
              onChangeText={onChange}
              value={
                value
                // phonenumber == ""
                //   ? value
                //   : phonenumber.replace(/^(\+91)(\d{10})$/, "$1 $2")
              }
            />
          )}
        />
        <Controller
          name="position"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input]}
              selectionColor={"#5188E3"}
              placeholder="Account managaer"
              //   keyboardType="number-pad"
              multiline
              // maxLength={}
              numberOfLines={4}
              onChangeText={onChange}
              value={
                value
                // phonenumber == ""
                //   ? value
                //   : phonenumber.replace(/^(\+91)(\d{10})$/, "$1 $2")
              }
            />
          )}
        />
        <View style={styles.dropdownCompany}>
          <Controller
            name="country"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <DropDownPicker
                style={styles.dropdown}
                open={countryopen}
                value={countryvalue} //companyValue
                items={countryObj}
                setOpen={setcountryopen}
                setValue={setcountryvalue}
                // setItems={sethour}
                placeholder={t("Select_Country")}
                dropDownContainerStyle={{
                  position: "relative", // to fix scroll issue ... it is by default 'absolute'
                  top: 0, //to fix gap between label box and container
                }}
                placeholderStyle={[styles.placeholderStyles]}
                containerStyle={{ zIndex: 50 }}
                loading={loading}
                listMode="SCROLLVIEW"
                activityIndicatorColor="#5188E3"
                searchable={true}
                searchPlaceholder="Set duration here..."
                onOpen={ondurationOpen}
                onChangeValue={(onCountryChange(countryvalue), onChange)}
              />
            )}
          />
          {errors.country && (
            <Text
              style={{
                fontSize: 10,
                color: "red",
                // marginTop: "-3%",
                marginLeft: "2%",
                // marginBottom: "2%",
              }}
            >
              {errors.country.message}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            marginBottom: 15,
            // backgroundColor: "red",
            justifyContent: "space-between",
            // alignItems: "center",
            // justifyContent: "space-between",
          }}
        >
          <View>
            <Controller
              name="state"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <DropDownPicker
                  style={[styles.dropdown, { width: "100%" }]}
                  open={companyOpen1}
                  value={companyValue1} //companyValue
                  items={statesObj}
                  setOpen={setCompanyOpen1}
                  listMode="MODAL"
                  modalTitle="Select job title"
                  modalProps={{
                    animationType: "slide",
                  }}
                  modalContentContainerStyle={{
                    backgroundColor: "white",
                  }}
                  setValue={setCompanyValue1}
                  setItems={setComapny1}
                  placeholder={t("State")}
                  placeholderStyle={styles.placeholderStyles}
                  loading={loading}
                  activityIndicatorColor="#5188E3"
                  searchable={true}
                  containerStyle={{ zIndex: 50, width: 150 }}
                  searchPlaceholder="Search title here..."
                  // onOpen={onCompanyOpen1}
                  onChangeValue={(onstateChange(companyValue1), onChange)}
                  zIndex={1000}
                  zIndexInverse={3000}
                />
              )}
            />
            {errors.state && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  // marginTop: "-3%",
                  marginLeft: "4%",
                  marginBottom: "4%",
                }}
              >
                {errors.state.message}
              </Text>
            )}
          </View>
          <View>
            <Controller
              name="District"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <DropDownPicker
                  style={[styles.dropdown, { width: "100%" }]}
                  open={cityopen}
                  value={cityvalue} //companyValue
                  items={districtsobj}
                  setOpen={setcityopen}
                  setValue={setcityvalue}
                  // setItems={sethour}
                  placeholder={t("District")}
                  dropDownContainerStyle={{
                    position: "relative", // to fix scroll issue ... it is by default 'absolute'
                    top: 0, //to fix gap between label box and container
                  }}
                  placeholderStyle={[styles.placeholderStyles]}
                  containerStyle={{ zIndex: 50, width: 155 }}
                  loading={loading}
                  listMode="SCROLLVIEW"
                  activityIndicatorColor="#5188E3"
                  searchable={true}
                  searchPlaceholder="Set District here..."
                  onOpen={ondurationOpen}
                  onChangeValue={(onCityChange(cityvalue), onChange)}
                />
              )}
            />
            {errors.District && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  marginLeft: "4%",
                  marginBottom: "4%",
                }}
              >
                {errors.District.message}
              </Text>
            )}
          </View>
        </View>
        <Controller
          name="number"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input]}
              selectionColor={"#5188E3"}
              placeholder={t("Mobile_Number")}
              keyboardType="number-pad"
              multiline
              // maxLength={}
              numberOfLines={4}
              onChangeText={onChange}
              value={
                value
                // phonenumber == ""
                //   ? value
                //   : phonenumber.replace(/^(\+91)(\d{10})$/, "$1 $2")
              }
            />
          )}
        />
        <Controller
          name="job_description"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={{
                borderColor: "#D9D9D9",
                backgroundColor: "#FFF",
                borderRadius: 10,
                borderWidth: 0.5,
                fontSize: 13,
                height: 50,
                paddingVertical: 10,
                marginHorizontal: 10,
                paddingStart: 10,
                marginBottom: 15,
                height: 200,
                textAlignVertical: "top",
              }}
              selectionColor={"#5188E3"}
              placeholder={t("Job_Description")}
              multiline={true}
              numberOfLines={50}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {/* {errors.job_description && (
          <Text style={{ color: "red", marginLeft: 20 }}>
            {errors.job_description.message}
          </Text>
        )} */}
        <View>
          <Controller
            name="Duration"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.dropdownCompany}>
                <DropDownPicker
                  style={styles.dropdown}
                  open={durationopen}
                  value={durationvalue} //companyValue
                  items={duration}
                  setOpen={setdurationopen}
                  setValue={setdurationvalue}
                  setItems={setduration}
                  placeholder={t("Select_Duration")}
                  dropDownContainerStyle={{
                    position: "relative", // to fix scroll issue ... it is by default 'absolute'
                    top: 0, //to fix gap between label box and container
                  }}
                  placeholderStyle={styles.placeholderStyles}
                  containerStyle={{ zIndex: 50 }}
                  loading={loading}
                  listMode="SCROLLVIEW"
                  activityIndicatorColor="#5188E3"
                  searchable={true}
                  searchPlaceholder="Set duration here..."
                  onOpen={ondurationOpen}
                  onChangeValue={onChange}
                />
              </View>
            )}
          />
          {errors.Duration && (
            <Text
              style={{
                fontSize: 10,
                color: "red",
                marginTop: "-4%",
                marginLeft: "4%",
                marginBottom: "2%",
              }}
            >
              {errors.Duration.message}
            </Text>
          )}
        </View>
        <View>
          <Controller
            name="Openings"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={{
                  borderColor: "#D9D9D9",
                  backgroundColor: "#FFF",
                  borderRadius: 10,
                  borderWidth: 0.5,
                  fontSize: 13,
                  height: 50,
                  marginHorizontal: 10,
                  paddingStart: 10,
                  marginBottom: 15,
                }}
                selectionColor={"#5188E3"}
                placeholder={t("Number_of_Openings")}
                multiline={true}
                numberOfLines={50}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
          />
          {errors.Openings && (
            <Text
              style={{
                fontSize: 10,
                color: "red",
                marginTop: "-4%",
                marginLeft: "5%",
                marginBottom: "4%",
              }}
            >
              {errors.Openings.message}
            </Text>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View>
            <Controller
              name="Salary"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, { width: 180 }]}
                  selectionColor={"#5188E3"}
                  placeholder={t("Salary")}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.Salary && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  marginTop: "-6%",
                  marginLeft: "8%",
                  marginBottom: "4%",
                }}
              >
                {errors.Salary.message}
              </Text>
            )}
          </View>
          <View>
            <Controller
              name="per"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <View style={styles.dropdownCompany}>
                  <DropDownPicker
                    style={[styles.dropdown, { width: 120 }]}
                    open={houropen}
                    value={hourvalue} //companyValue
                    items={hour}
                    setOpen={sethouropen}
                    setValue={sethourvalue}
                    setItems={sethour}
                    placeholder={t("Per")}
                    dropDownContainerStyle={{
                      position: "relative", // to fix scroll issue ... it is by default 'absolute'
                      top: 0, //to fix gap between label box and container
                    }}
                    placeholderStyle={[styles.placeholderStyles]}
                    containerStyle={{ zIndex: 50, width: 120 }}
                    loading={loading}
                    listMode="SCROLLVIEW"
                    activityIndicatorColor="#5188E3"
                    searchable={true}
                    searchPlaceholder="Set duration here..."
                    onOpen={ondurationOpen}
                    onChangeValue={onChange}
                  />
                </View>
              )}
            />
            {errors.per && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  marginTop: "-9%",
                  marginLeft: "10%",
                  marginBottom: "4%",
                }}
              >
                {errors.per.message}
              </Text>
            )}
          </View>
          <View></View>
        </View>
        <Text
          style={{
            marginLeft: "4%",
            // marginHorizontal: 10,
            color: "#333",
            fontSize: 17,
            fontWeight: "500",
          }}
        >
          {t("Add_Image")}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          {image === null ? (
            <View
              style={{
                backgroundColor: "#D9D9D9",
                padding: 20,
                width: 70,
                height: 70,
                borderRadius: 70 / 2,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
                marginHorizontal: 20,
              }}
            >
              <View>
                <Entypo name="camera" size={24} color="#333" />
              </View>
            </View>
          ) : (
            <View>
              <Image
                source={{ uri: image }}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 10,
                  marginLeft: 20,
                  marginBottom: 20,
                  // marginVertical: 10,
                  borderRadius: 10,
                }}
                resizeMode="cover"
              />
            </View>
          )}
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
              {ActivityIndicators ? (
                <View>
                  <LottieViewloadingmodal />
                  {/* <Text>Loading. please wait</Text>
                  <ActivityIndicator size="large" /> */}
                </View>
              ) : (
                <>
                  <TouchableHighlight
                    style={{
                      ...styles.openButton,
                      width: 150,
                      backgroundColor: "#1E5966",
                    }}
                    onPress={() => {
                      requestPermission();
                      takeAndUploadPhotoAsync("camera");
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
                        {t("Take_Pic")}
                      </Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{
                      ...styles.openButton,
                      width: 150,
                      backgroundColor: "#1E5966",
                      marginTop: 20,
                    }}
                    onPress={() => (
                      requestPermission1(), takeAndUploadPhotoAsync("files")
                    )}
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
                          fontSize: language == "தமிழ்" ? 10 : 14,
                          fontWeight: "500",
                          marginRight: "6%",
                        }}
                      >
                        {t("Upload_Pic")}
                      </Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableOpacity
                    style={{ marginTop: 50 }}
                    onPress={() => setModalVisible(!modalVisible)}
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

        <Text
          style={{
            marginLeft: "4%",
            // marginHorizontal: 10,
            color: "#333",
            fontSize: 17,
            fontWeight: "500",
          }}
        >
          Company Profile
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible1(true);
          }}
        >
          {image1 === null ? (
            <View
              style={{
                backgroundColor: "#D9D9D9",
                padding: 20,
                width: 70,
                height: 70,
                borderRadius: 70 / 2,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
                marginHorizontal: 20,
              }}
            >
              <View>
                <Entypo name="camera" size={24} color="#333" />
              </View>
            </View>
          ) : (
            <View>
              <Image
                source={{ uri: image1 }}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 10,
                  marginLeft: 20,
                  marginBottom: 20,
                  // marginVertical: 10,
                  borderRadius: 10,
                }}
                resizeMode="cover"
              />
            </View>
          )}
        </TouchableOpacity>
        <Modal
          animationType="slide"
          //animationInTiming = {13900}
          transparent={true}
          visible={modalVisible1}
          animationOut="slide"
          swipeDirection="down"
          onRequestClose={() => {
            setModalVisible1(!modalVisible1);
            setActivityIndicators1(false);
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
              {ActivityIndicators1 ? (
                <View>
                  <LottieViewloadingmodal />
                </View>
              ) : (
                <>
                  <TouchableHighlight
                    style={{
                      ...styles.openButton,
                      width: 150,
                      backgroundColor: "#1E5966",
                    }}
                    onPress={() => {
                      requestPermission2();
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
                        {t("Take_Pic")}
                      </Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{
                      ...styles.openButton,
                      width: 150,
                      backgroundColor: "#1E5966",
                      marginTop: 20,
                    }}
                    onPress={() => (
                      requestPermission3(), takeAndUploadPhotoAsync1("files")
                    )}
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
                          fontSize: language == "தமிழ்" ? 10 : 14,
                          fontWeight: "500",
                          marginRight: "6%",
                        }}
                      >
                        {t("Upload_Pic")}
                      </Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableOpacity
                    style={{ marginTop: 50 }}
                    onPress={() => setModalVisible1(!modalVisible1)}
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
        <Text
          // style={{ paddingLeft: 20, marginBottom: 10 }}
          style={{
            marginLeft: "4%",
            // marginHorizontal: 10,
            color: "#333",
            fontSize: 17,
            fontWeight: "500",
          }}
        >
          {t("Your_Preference")}
        </Text>
        <View style={[styles.section, { marginLeft: 10 }]}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={() => {
              setisclicked(!isclicked), setChecked(!isChecked);
            }}
          />
          <Text style={[styles.paragraph, { color: "#333" }]}>
            {t("Allow_Call")}
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "10%",
        }}
      >
        <LinearGradient
          colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
          style={{
            // backgroundColor: isValid ? "#6BC3FF" : "#87CEEB",
            textAlign: "center",
            // marginHorizontal: 60,
            padding: 10,
            width: "50%",
            // paddingVertical: 15,
            borderRadius: 10,
            alignItems: "center",
            // marginTop: 20,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          useAngle={45}
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 17 }}>
            {t("Create_Job")}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 30,

    backgroundColor: "#eefbff",
  },

  label: {
    marginBottom: 7,
    marginStart: 10,
  },
  placeholderStyles: {
    color: "grey",
  },
  dropdownGender: {
    marginHorizontal: 10,
    width: "50%",
    marginBottom: 15,
  },
  dropdownCompany: {
    marginHorizontal: 10,
    marginBottom: 15,
  },
  dropdown: {
    borderColor: "#B7B7B7",
    height: 50,
  },
  getStarted: {
    backgroundColor: "#5188E3",
    color: "white",
    textAlign: "center",
    marginHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  logIn: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  links: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: "#758580",
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 30,
  },
  input: {
    // borderStyle: "solid",
    borderColor: "#D9D9D9",
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 0.5,
    fontSize: 13,
    height: 50,
    marginHorizontal: 10,
    paddingStart: 10,
    marginBottom: 15,
  },
  label: {
    marginBottom: 7,
    marginStart: 10,
  },
  placeholderStyles: {
    color: "#ACACAC",
    fontSize: 13,
  },
  dropdownGender: {
    marginHorizontal: 10,
    width: "50%",
    marginBottom: 15,
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
  dropdownCompany: {
    marginHorizontal: 10,
    marginBottom: 15,
  },
  dropdown: {
    borderColor: "#D9D9D9",
    borderRadius: 10,
    borderWidth: 0.5,
    height: 50,
  },
  getStarted: {
    backgroundColor: "#5188E3",
    color: "white",
    textAlign: "center",
    marginHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  logIn: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  links: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: "#758580",
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});

export default ShortTermadminForms;
