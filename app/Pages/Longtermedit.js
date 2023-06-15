import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  Modal,
  Alert,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "expo-checkbox";
import { useEffect } from "react";
import LottieViewloading from "../components/Loading";
import { FontAwesome5 } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

// import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIsFocused } from "@react-navigation/native";

import * as yup from "yup";
import { useContext } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LocalizationContext } from "../../App";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import LottieViewloadingmodal from "../components/Loadinmodal";
// const schema = yup.object().shape({
//   job_title: yup
//     .string()
//     .required("Job title cant be empty")
//     .typeError("Job title  cannot be null"),
//   workspace: yup
//     .string()
//     .required("Workspace is required")
//     .typeError("Workspace cannot be null"),
//   // location: yup.string().required("location of the job is required"),
//   country: yup
//     .string()
//     .required("Country cant be empty")
//     .typeError("Country  cannot be null"),
//   state: yup
//     .string()
//     .required("State cant be empty")
//     .typeError("State  cannot be null"),
//   District: yup
//     .string()
//     .required("District cant be empty")
//     .typeError("District  cannot be null"),
//   Duration: yup
//     .string()
//     .typeError("Duration cannot be null")
//     .required("Duration is required"),
//   per: yup
//     .string()
//     .required("Salary details can't be empty")

//     .typeError("Job title  cannot be null"),
//   Salary: yup.string().required("Please enter the salary Details"),
//   // mobile_number: yup.string().required("Mobile number is required"),
//   email: yup.string().required("Email id is required"),
// });
const LongTermedit = ({ navigation, route }) => {
  //gender
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isclicked, setisclicked] = useState(false);
  const isFocused = useIsFocused();
  //const loading
  const [loading, setloading] = useState(true);
  const userID = useSelector((state) => state.ID);
  //t for language translation
  const { t, language, setlanguage } = useContext(LocalizationContext);

  //pic for image
  const [modalVisible, setModalVisible] = useState(false);
  const [ActivityIndicators, setActivityIndicators] = useState(false);
  const [image, setImage] = useState(null);

  //image
  const [jobpost, setjobpostpic] = useState(null);

  //Ask Permission
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [status1, requestPermission1] =
    ImagePicker.useMediaLibraryPermissions();
  console.log(status);

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
    result;
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    if (result.canceled) {
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
    } else {
      setActivityIndicators(false);
      setModalVisible(false);
    }
  }

  const [gender, setGender] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Prefer Not to Say", value: "neutral" },
  ]);
  //workspace
  const [workspaceopen, setworkspaceopen] = useState(false);
  const [workspacevalue, setworkspacevalue] = useState(false);
  const [workspace, setworkspace] = useState([
    { label: "Work From Office", value: "Work From Office" },
    { label: "Remote", value: "Remote" },
    { label: "Hybrid", value: "Hybrid" },
    { label: "Onsite", value: "Onsite" },
  ]);
  //to get the date
  // To get the Expire date
  const [opens, setisopen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showplace, setshowplace] = useState(true);

  const showDatepicker = () => {
    setisopen(true);
    showMode("date");
    setshowplace(false);
    minDate: new Date();
  };
  const onChange = (event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate;
    console.log(
      currentDate.getDate(),
      currentDate.getMonth(),
      currentDate.getFullYear()
    );
    setDate(currentDate);
    setisopen(false);
  };
  function convertDate(dateString) {
    // Convert the date string to a Date object.
    let date = new Date(dateString);

    // Get the year, month, day, hour, minute, second, and millisecond properties of the Date object.
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let millisecond = date.getMilliseconds();

    // Return a JavaScript object containing the date data.
    return {
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond,
    };
  }
  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
    });
  };

  //jobtype1
  const [jobtypeopen1, setjobtypeopen1] = useState(false);
  const [jobtypevalue1, setjobtypevalue1] = useState(false);
  const [jobtype1, setjobtype1] = useState([
    { label: "Fresher", value: "Fresher" },
    { label: "0 - 6 Months", value: "0 - 6 Months" },
    { label: "7 - 12 Months", value: "7 - 12 Months" },
    { label: "1 - 5 Years", value: "1 - 5 Years" },
    { label: "5 - 10 Years", value: "5 - 10 Years" },
    { label: "10+ Years", value: "10+ Years" },
  ]);

  //duration
  const [durationopen, setdurationopen] = useState(false);
  const [durationvalue, setdurationvalue] = useState(false);
  const [duration, setduration] = useState([
    { label: "1-15 Days", value: "1-15 Days" },
    { label: "11-30 Days", value: "11-30 Days" },
    { label: "2-6 Months", value: "2-6 Months" },
    { label: "7-12 Months", value: "7-12 Months" },
    { label: "Permanent", value: "Permanent" },
  ]);
  //company
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyValue, setCompanyValue] = useState(null);
  const [company, setComapny] = useState([
    { label: "PUCIT", value: "pucit" },
    { label: "UCP", value: "ucp" },
    { label: "UET", value: "uet" },
  ]);
  const [companyOpen1, setCompanyOpen1] = useState(false);
  const [companyValue1, setCompanyValue1] = useState(null);
  const [jobtypeopen, setjobtypeopen] = useState(false);
  const [jobtypevalue, setjobtypevalue] = useState(false);
  const [jobtype, setjobtype] = useState([
    { label: "Full Time", value: "Full Time" },
    { label: "Internship", value: "Internship" },
    { label: "Part Time", value: "Part Time" },
  ]);
  const [company1, setComapny1] = useState([
    { label: "PUCIT", value: "pucit" },
    { label: "UCP", value: "ucp" },
    { label: "UET", value: "uet" },
  ]);
  const [cityopen, setcityopen] = useState(false);
  const [cityvalue, setcityvalue] = useState(null);
  //per
  const [houropen, sethouropen] = useState(false);
  const [hourvalue, sethourvalue] = useState(false);
  const [hour, sethour] = useState([
    { label: "Per Month", value: "Per Month" },
    { label: "LPA", value: "LPA" },
  ]);

  //to get the job title
  const [datas, setData] = useState([]);
  useEffect(() => {
    fetchdata();
    getCountries();
    getuserdata();
    getdata();
  }, []);
  const getdata = async (paras) => {
    console.log("im the dATA iVING");
    const body = {};
    body.user_id = userID;
    body.post_id = route.params.post_id;
    body.table_name = route.params.table_name;
    console.log(body);
    // body.page = route.params.page;

    // body.page = 0;
    try {
      await fetch(`http://192.168.1.10:5000/api/like_apply_slideshow`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("im the data of the first");
          console.log(result["post"][0]);
          setData(result["post"][0]);
          console.log(result["post"][0].designation);
          //   setCompanyValue(result["post"][0].designation);
          setloading(false);
          // setloading(false);
          //   setpage(page + 1);
        });
    } catch (error) {
      console.log(error);
    }
  };
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
  async function fetchdata() {
    try {
      await fetch("http://103.174.10.108:5002/api/job_title", {
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
          (result) => (
            console.log("hhhiidisiid"), console.log(result), setComapny(result)
          )
        );
    } catch (error) {
      console.warn(error);
    }
  }
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
  //   const [loading, setLoading] = useState(false);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const onCompanyOpen = useCallback(() => {
    setGenderOpen(false);
    setdurationopen(false);
  }, []);

  //duration
  const ondurationOpen = useCallback(() => {
    setCompanyOpen(false);
    setworkspaceopen(false);
  });
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors, isValid },
  // } = useForm({ mode: "onBlur" });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  // const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    // console.log(company);
    const result = company.filter(checkcom);
    function checkcom(com) {
      // console.log(com);
      // console.log(companyValue);
      const company = companyValue == null ? datas.designation : companyValue;
      // console.log(company);
      return com.value == company;
    }
    console.log("im the dataaa");
    console.log(result.length);
    const finalJob = result.length == 0 ? datas.job_title : result[0].label;
    data.Duration = "";
    data.Education = data.Education == "" ? datas.Education : data.Education;
    data.Salary = data.Salary == "" ? datas.Salary : data.Salary;
    data.email = data.email == "" ? datas.email : data.email;
    data.job_description =
      data.job_description == "" ? datas.job_description : data.job_description;
    data.District =
      data.District == null ? datas.location.split(",")[0] : data.District;
    data.country =
      data.country == null ? datas.location.split(",")[2] : data.country;
    data.state = data.state == null ? datas.location.split(",")[1] : data.state;
    data.per = data.per == "" ? datas.per : data.per;
    data.Required_Skills =
      data.Required_Skills == "" ? datas.Required_Skills : data.Required_Skills;
    data.jobpic = "";
    data.experience =
      data.experience == "" ? datas.experience : data.experience;
    data.is_short = "False";
    data.exp_date = date == new Date() ? datas.exp_date : date;
    console.log("im thee data of the");
    console.log(data.workspace);
    data.workspace = data.workspace == "" ? datas.workspace : data.workspace;
    // data.isallow_tocall = isclicked;
    data.jobtype = data.jobtype == "" ? datas.jobtype : data.jobtype;
    data.Openings = data.Openings == "" ? datas.Openings : data.Openings;
    data.user_id = userID;
    data.mobile_number = phonenumber;
    data.card_id = route.params.post_id;
    data.tableType = "long_job_post";
    console.log("Im the dataaa");
    console.log(data);
    async function submitdata() {
      try {
        await fetch(
          `http://103.174.10.108:5002/api/post_edit_update/${userID}`,
          {
            method: "PUT",
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          }
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.post == "updated") {
              Alert.alert("Sucessfully updated");
              navigation.goBack();
            } else {
              Alert.alert(result.post);
            }
          });
      } catch (error) {
        console.warn(error);
      }
    }
    submitdata();
  };
  //to find the
  // console.log(loading);
  if (loading) {
    return <LottieViewloading />;
  }
  return (
    <View
      style={{
        backgroundColor: "#eefbff",
        height: "100%",
        // marginHorizontal: 10,
      }}
    >
      {/* {console.log(datas.location.split(",")[2])} */}
      {/* <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "3%",
          marginBottom: "6%",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "500", color: "#333" }}>
          LongTerm Job Form
        </Text>
      </View> */}
      <ScrollView style={{ marginHorizontal: 10 }}>
        <View></View>
        <View>
          {/*workspace*/}
          <Controller
            name="workspace"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.dropdownCompany}>
                <DropDownPicker
                  style={styles.dropdown}
                  open={workspaceopen}
                  value={workspacevalue} //companyValue
                  items={workspace}
                  setOpen={setworkspaceopen}
                  setValue={setworkspacevalue}
                  setItems={setworkspace}
                  placeholder={datas.workspace}
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
                  onOpen={onCompanyOpen}
                  onChangeValue={onChange}
                />
              </View>
            )}
          />
          {errors.workspace && (
            <Text
              style={{
                fontSize: 10,
                color: "red",
                marginTop: "-4%",
                marginLeft: "5%",
                marginBottom: "2%",
              }}
            >
              {errors.workspace.message}
            </Text>
          )}
        </View>
        <View>
          {/*workspace*/}
          <Controller
            name="jobtype"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.dropdownCompany}>
                <DropDownPicker
                  style={styles.dropdown}
                  open={jobtypeopen}
                  value={jobtypevalue} //companyValue
                  items={jobtype}
                  setOpen={setjobtypeopen}
                  setValue={setjobtypevalue}
                  setItems={setjobtype}
                  placeholder={datas.jobtype}
                  dropDownContainerStyle={{
                    position: "relative", // to fix scroll issue ... it is by default 'absolute'
                    top: 0, //to fix gap between label box and container
                  }}
                  placeholderStyle={styles.placeholderStyles}
                  containerStyle={{ zIndex: 50 }}
                  loading={loading}
                  listMode="SCROLLVIEW"
                  activityIndicatorColor="#5188E3"
                  // searchable={true}
                  // searchPlaceholder="Set duration here..."
                  onOpen={onCompanyOpen}
                  onChangeValue={onChange}
                />
              </View>
            )}
          />
          {errors.jobtype && (
            <Text
              style={{
                fontSize: 10,
                color: "red",
                marginTop: "-4%",
                marginLeft: "5%",
                marginBottom: "2%",
              }}
            >
              {errors.jobtype.message}
            </Text>
          )}
        </View>
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
                placeholder={
                  loading == true ? "" : datas.location.split(",")[2]
                }
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
                // marginTop: "-4%",
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
                  placeholder={
                    loading == true ? "" : datas.location.split(",")[1]
                  }
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
                <View style={styles.dropdownCompany}>
                  <DropDownPicker
                    style={[styles.dropdown, { width: "100%" }]}
                    open={cityopen}
                    value={cityvalue} //companyValue
                    items={districtsobj}
                    setOpen={setcityopen}
                    setValue={setcityvalue}
                    // setItems={sethour}
                    placeholder={
                      loading == true ? "" : datas.location.split(",")[0]
                    }
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
                    searchPlaceholder="Set duration here..."
                    onOpen={ondurationOpen}
                    onChangeValue={(onCityChange(cityvalue), onChange)}
                  />
                </View>
              )}
            />
            {errors.District && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  marginTop: "-9%",
                  marginLeft: "10%",
                  marginBottom: "4%",
                }}
              >
                {errors.District.message}
              </Text>
            )}
          </View>
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
                  // placeholder="Salary"
                  defaultValue={datas.Salary}
                  onChangeText={onChange}
                  value={value == "" ? datas.Salary : value}
                />
              )}
            />
            {errors.Salary && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  marginTop: "-7%",
                  marginLeft: "8%",
                  marginBottom: "6%",
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
                <DropDownPicker
                  style={[styles.dropdown, { width: "100%" }]}
                  open={houropen}
                  value={hourvalue} //companyValue
                  items={hour}
                  setOpen={sethouropen}
                  setValue={sethourvalue}
                  setItems={sethour}
                  placeholder={datas.per}
                  dropDownContainerStyle={{
                    position: "relative", // to fix scroll issue ... it is by default 'absolute'
                    top: 0, //to fix gap between label box and container
                  }}
                  placeholderStyle={[styles.placeholderStyles]}
                  containerStyle={{ zIndex: 50, width: 130 }}
                  loading={loading}
                  listMode="SCROLLVIEW"
                  activityIndicatorColor="#5188E3"
                  searchable={true}
                  searchPlaceholder="Set duration here..."
                  onOpen={ondurationOpen}
                  onChangeValue={onChange}
                />
              )}
            />
            {errors.per && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  marginLeft: "4%",
                  marginBottom: "6%",
                }}
              >
                {errors.per.message}
              </Text>
            )}
          </View>
        </View>
        <Controller
          name="Education"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              selectionColor={"#5188E3"}
              //   placeholder="Education"
              defaultValue={datas.Education}
              onChangeText={onChange}
              value={value == "" ? datas.Education : value}
            />
          )}
        />
        <Controller
          name="experience"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.dropdownCompany}>
              <DropDownPicker
                style={styles.dropdown}
                open={jobtypeopen1}
                value={jobtypevalue1} //companyValue
                items={jobtype1}
                setOpen={setjobtypeopen1}
                setValue={setjobtypevalue1}
                setItems={setjobtype1}
                placeholder={datas.experience}
                arrowIconStyle={{ Color: "red" }}
                dropDownContainerStyle={{
                  position: "relative", // to fix scroll issue ... it is by default 'absolute'
                  top: 0, //to fix gap between label box and container
                }}
                placeholderStyle={styles.placeholderStyles}
                containerStyle={{ zIndex: 50 }}
                loading={loading}
                listMode="SCROLLVIEW"
                activityIndicatorColor="#5188E3"
                // searchable={true}
                // searchPlaceholder="Set duration here..."
                onOpen={onCompanyOpen}
                onChangeValue={onChange}
              />
            </View>
          )}
        />
        <Controller
          name="job_description"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[
                styles.input,
                { height: 100, textAlignVertical: "top", paddingTop: 10 },
              ]}
              selectionColor={"#5188E3"}
              //   placeholder={data[0].job_description}
              defaultValue={datas.job_description}
              multiline={true}
              numberOfLines={50}
              onChangeText={onChange}
              value={value == "" ? datas.job_description : value}
            />
          )}
        />
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
                defaultValue={datas.Openings}
                multiline={true}
                numberOfLines={50}
                onChangeText={onChange}
                value={value == "" ? datas.Openings : value}
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

        <Controller
          name="mobile_number"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input]}
              selectionColor={"#5188E3"}
              placeholder="Mobile Number"
              keyboardType="number-pad"
              multiline
              // maxLength={}
              numberOfLines={4}
              onChangeText={onChange}
              value={
                phonenumber == ""
                  ? value
                  : phonenumber.replace(/^(\+91)(\d{10})$/, "$1 $2")
              }
            />
          )}
        />
        {/* {errors.mobile_number && (
          <Text style={{ color: "red", marginLeft: 20 }}>
            {errors.mobile_number.message}
          </Text>
        )} */}
        <Controller
          name="email"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input]}
              selectionColor={"#5188E3"}
              placeholder="abc@gmail.com"
              defaultValue={datas.email}
              keyboardType="email-address"
              multiline
              onChangeText={onChange}
              value={value == "" ? datas.email : ""}
            />
          )}
        />
        {errors.email && (
          <Text
            style={{
              fontSize: 10,
              color: "red",
              marginTop: "-4%",
              marginLeft: "4%",
              marginBottom: "2%",
            }}
          >
            {errors.email.message}
          </Text>
        )}
        <View style={{ height: 70 }}>
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
            placeholder={"Expire date"}
            multiline={true}
            numberOfLines={50}
            //onChangeText={onChange}
            defaultValue={
              showplace
                ? new Date(datas.exp_date).toDateString()
                : date.toDateString().slice(3)
            }
            value={date}
            keyboardType="numeric"
          />

          <TouchableOpacity onPressIn={() => showDatepicker()}>
            <FontAwesome5
              name="calendar-alt"
              size={24}
              color="#333"
              style={{
                position: "absolute",
                right: 40,
                bottom: 28,
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Controller
            name="Required_Skills"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  { height: 200, textAlignVertical: "top", paddingTop: 10 },
                ]}
                selectionColor={"#5188E3"}
                defaultValue={datas.Required_Skills}
                multiline={true}
                numberOfLines={50}
                onChangeText={onChange}
                value={value == "" ? datas.Required_Skills : value}
              />
            )}
          />
          {errors.Required_Skills && (
            <Text
              style={{
                fontSize: 10,
                color: "red",
                // marginTop: "-3%",
                marginLeft: "2%",
                // marginBottom: "2%",
              }}
            >
              {errors.Required_Skills.message}
            </Text>
          )}
        </View>
        {/* <Text
          // style={{ paddingLeft: 20, marginBottom: 10 }}
          style={{
            marginLeft: "4%",
            // marginHorizontal: 10,
            color: "#333",
            fontSize: 17,
            fontWeight: "500",
          }}
        >
          Your Preference
        </Text> */}
        {/* <View style={[styles.section, { marginLeft: 10, marginBottom: "5%" }]}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={() => {
              setisclicked(true), setChecked(!isChecked);
            }}
          />
          <Text style={[styles.paragraph]}>Allow candidates to call HR</Text>
        </View> */}
        {/* <Text
          style={{
            marginLeft: "4%",
            // marginHorizontal: 10,
            color: "#333",
            fontSize: 17,
            fontWeight: "500",
          }}
        >
          Add image
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
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
                marginVertical: 10,
                marginHorizontal: 20,
              }}
            >
              <Entypo name="camera" size={24} color="#333" />
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
        </TouchableOpacity> */}
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
                  {/* <Text>Loading. please wait</Text>
                  <ActivityIndicator size="large" /> */}
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
                        Take Pic
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
                    onPress={() => takeAndUploadPhotoAsync("files")}
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
      </ScrollView>
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={{
          justifyContent: "center",
          alignItems: "center",
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
            Update job
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eefbff",
    marginHorizontal: 10,
    marginTop: 30,
  },
  input: {
    // borderStyle: "solid",
    borderColor: "#d9d9d9",
    borderRadius: 10,
    borderWidth: 0.5,
    fontSize: 13,
    height: 50,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    paddingStart: 10,
    marginBottom: 15,
  },
  label: {
    marginBottom: 7,
    marginStart: 10,
  },
  placeholderStyles: {
    color: "#333",
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
    borderColor: "#d9d9d9",
    borderWidth: 0.5,

    height: 50,
  },
  getStarted: {
    backgroundColor: "#5188E3",
    color: "white",
    textAlign: "center",
    marginHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 50,
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
  // container: {
  //   flex: 1,
  //   marginHorizontal: 16,
  //   marginVertical: 32,
  // },
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

export default LongTermedit;
