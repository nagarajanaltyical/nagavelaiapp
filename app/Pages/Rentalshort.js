import React, { useState, useCallback } from "react";
// import { Country, State, City } from "country-state-city";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
  Alert,
  TouchableHighlight,
} from "react-native";
import { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";

import DropDownPicker from "react-native-dropdown-picker";
import { useContext } from "react";
import { LocalizationContext } from "../../App";
//form validation for the react hook form
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Checkbox from "expo-checkbox";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import LottieViewloading from "../components/Loading";
import LottieViewloadingmodal from "../components/Loadinmodal";

const schema = yup.object().shape({
  product_name: yup.string().required("Product Name Required"),
  product_type: yup
    .string()
    .required("Product Type Required")
    .typeError("Product Type Required"),
  // .typeError("workspace cannot be null")
  product_fees: yup.string().required("Product Fee Required"),
  product_fees_hour: yup
    .string()
    .required("Choose Anyone")
    .typeError("Choose Anyone"),
  Duration2: yup.string().required("Choose Anyone").typeError("Choose Anyone"),
  Duration: yup.string().required("Rental Duration Required"),
  country: yup
    .string()
    .required("Country is Required")
    .typeError("Country is Required"),
  state: yup
    .string()
    .required("State is Required")
    .typeError("State is Required"),
  District: yup
    .string()
    .required("District is Required")
    .typeError("District is Required"),
  address: yup.string().required("Address is Required"),
  // product_description: yup.string().required("location of the job is required"),
  // location: yup.string().required("location of the job is required"),
  // Duration: yup
  //   .string()
  //   .typeError("Duration cannot be null")
  //   .required("Duration is required"),
  // per: yup
  //   .string()
  //   .required("salary details cant be empty")
  //   .typeError("job title  cannot be null"),
  // Salary: yup.required("Please enter the salary Details"),
  // Salary: yup.string().required("Please enter the salary Details"),
  // mobile_number: yup.string().required("Mobile number is required"),
  // email: yup.string().required("email id is required"),
});

const ShortTermRental = ({ navigation: { goBack } }) => {
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const { t, language, setlanguage } = useContext(LocalizationContext);
  const states = useSelector((state) => state);

  const [gender, setGender] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Prefer Not to Say", value: "Prefer Not to Say" },
  ]);
  const [ProductOpen, setProductOpen] = useState(false);
  const [ProducttypeValue, setProducttypeValue] = useState(null);
  const [Product, setProduct] = useState([
    { label: "Tools", value: "Tools" },
    { label: "Transport", value: "Transport" },
    { label: "Jewellery", value: "Jewellery" },
    { label: "Home Appliances", value: "Home Appliances" },
    { label: "Kitchen Tools", value: "Kitchen Tools" },
    { label: "Makeup", value: "Makeup" },
    { label: "Cloths", value: "Cloths" },
    { label: "PG & Space", value: "PG & Space" },

    { label: "Furnitures", value: "Furnitures" },
    { label: "Hospital", value: "Hospital" },
  ]);

  //checkcbox
  const [isChecked, setChecked] = useState(false);
  const [isclicked, setisclicked] = useState(false);
  //postpic
  const [jobpost, setjobpostpic] = useState(null);

  //duration
  const [durationopen, setdurationopen] = useState(false);
  const [durationvalue, setdurationvalue] = useState(false);
  const [duration, setduration] = useState([
    { label: "1-10days", value: "1-10days" },
    { label: "11-30days", value: "11-30days" },
    { label: "1-6months", value: "1-6months" },
    { label: "7-12months", value: "7-12months" },
    { label: "Permanent", value: "Permanent" },
  ]);

  //per
  //  const [houropen, sethouropen] = useState(false);
  //  const [hourvalue, sethourvalue] = useState(false);
  //  const [hour, sethour] = useState([
  //    { label: "/Per Month", value: "Per Month" },
  //    { label: "/LPA", value: "/LPA" },
  //  ]);
  const ondurationOpen = useCallback(() => {
    setProductOpen(false);
  });

  //perday hour
  const [houropen, sethouropen] = useState(false);
  const [hourvalue, sethourvalue] = useState(false);
  const [houropen1, sethouropen1] = useState(false);
  const [hourvalue1, sethourvalue1] = useState(false);
  const [duration1, setduration1] = useState([
    { label: "Hour", value: "Hour" },
    { label: "Day", value: "Day" },
    { label: "Week", value: "Week" },
    { label: "Month", value: "Month" },
    { label: "Year", value: "Year" },
  ]);
  const [hour, sethour] = useState([
    { label: "Per Hour", value: "Per Hour" },
    { label: "Per Day", value: "Per Day" },
    { label: "Per Week", value: "Per Week" },
    { label: "Per Month", value: "Per Month" },
    { label: "Per Year", value: "Per Year" },
  ]);
  //city
  const [cityopen, setcityopen] = useState(false);
  const [cityvalue, setcityvalue] = useState(null);
  const [city, setcity] = useState([
    { label: "Per Hour", value: "Per Hour" },
    { label: "Per Day", value: "Per Day" },
    { label: "Per Week", value: "Per Week" },
    { label: "Per Month", value: "Per Month" },
    { label: "Per Year", value: "Per Year" },
  ]);
  //country
  const [countryopen, setcountryopen] = useState(false);
  const [countryvalue, setcountryvalue] = useState(null);

  //company
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyValue, setCompanyValue] = useState(null);
  const [company, setComapny] = useState([
    { label: "PUCIT", value: "pucit" },
    { label: "UCP", value: "ucp" },
    { label: "UET", value: "uet" },
  ]);

  const userID = useSelector((state) => state.ID);
  useEffect(() => {
    setlanguage(states.lang);
  }, [states.lang]);
  //to get the item
  useEffect(() => {
    fetchdata();
    getCountries();
    getuserdata();
  }, []);
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
  //country city state
  const [data, setdata] = useState([]);
  // console.log(Country.getAllCountries());
  // const CountryObj = Country.getAllCountries();

  // console.log(State.getAllStates());
  // console.log(
  //   City.getCitiesOfState("IN", "TN").filter((e) => e.name === "Chinnasalem")
  // );
  // console.log(
  //   City.getCitiesOfState("IN", "TN").filter((e) => e.name === "Abiramam")
  // );

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
          setdata(result);
        });
    } catch (error) {
      console.warn(error);
    }
  }
  const country = [...new Set(data.map((items) => items.country))];

  country.sort();
  const countryObj = [];
  const statesObj = [];
  const districtsobj = [];
  for (let i = 0; i < country.length; i++) {
    countryObj.push({ label: country[i], value: country[i] });
  }

  // //to get the states
  const onCountryChange = (paras) => {
    let states = data.filter((e) => e.country == paras);

    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();

    for (let i = 0; i < states.length; i++) {
      statesObj.push({ label: states[i], value: states[i] });
    }
  };
  //state change
  const onstateChange = (paras) => {
    let districts = data.filter((e) => e.subcountry == paras);

    districts = [...new Set(districts.map((item) => item.name))];
    for (let i = 0; i < districts.length; i++) {
      districtsobj.push({ label: districts[i], value: districts[i] });
    }
  };

  //city
  const onCityChange = (paras) => {
    let city = data.filter((e) => e.name == paras);
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
        .then((result) => (console.log(result), setComapny(result)));
    } catch (error) {
      console.warn(error);
    }
  }
  const [loading, setLoading] = useState(true);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const onCompanyOpen = useCallback(() => {
    setGenderOpen(false);
  }, []);
  //image index
  //pic for image

  const [modalVisible, setModalVisible] = useState(false);
  const [ActivityIndicators, setActivityIndicators] = useState(false);
  const [image, setImage] = useState(null);
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
        } catch (error) {}
      }
      submitdata();
    } else {
      setActivityIndicators(false);
      setModalVisible(false);
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

    // const finalJob = result[0].label;
    // console.log(finalJob);
    // data.job_title = finalJob;
    data.pic = jobpost;
    data.user_id = userID;
    data.number = phonenumber;
    // data.isallow_tocall = isclicked;
    // console.log(durationvalue);

    async function submitdata() {
      try {
        await fetch("http://103.174.10.108:5002/api/rental_pro_product_post", {
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
            if (result.post == "success") {
              goBack();
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
  return (
    <View style={styles.container}>
      {/* <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "3%",
          marginBottom: "6%",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "500", color: "#333" }}>
          Product Details
        </Text>
      </View> */}

      <ScrollView style={{ marginHorizontal: 10 }}>
        <Controller
          name="product_name"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, { marginTop: 10 }]}
              selectionColor={"#5188E3"}
              placeholderTextColor={"#acacac"}
              placeholder={t("Product_Name")}
              onChangeText={onChange}
              multiline={true}
              numberOfLines={4}
              value={value}
            />
          )}
        />
        {errors.product_name && (
          <Text
            style={{
              fontSize: 10,
              color: "red",
              marginTop: "-4%",
              marginLeft: "4%",
              marginBottom: "2%",
            }}
          >
            {errors.product_name.message}
          </Text>
        )}
        <View style={styles.dropdownCompany}>
          <Controller
            // name="hour"
            // defaultValue=""
            // control={control}
            name="product_type"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <DropDownPicker
                style={styles.dropdown}
                // open={houropen}
                // value={hourvalue} //companyValue
                // items={hour}
                // setOpen={sethouropen}
                // setValue={sethourvalue}
                // setItems={sethour}
                open={ProductOpen}
                value={ProducttypeValue} //companyValue
                items={Product}
                setOpen={setProductOpen}
                setValue={setProducttypeValue}
                setItems={setProduct}
                onBlur={onBlur}
                listMode="MODAL"
                modalTitle="SelecT Product Type"
                modalProps={{
                  animationType: "slide",
                }}
                modalContentContainerStyle={{
                  backgroundColor: "white",
                }}
                placeholder={t("Product_Type")}
                placeholderTextColor="#acacac"
                placeholderStyle={styles.placeholderStyles}
                loading={loading}
                activityIndicatorColor="#5188E3"
                searchable={true}
                searchPlaceholder="Search title here..."
                // onOpen={onCompanyOpen}
                // onChangeValue={onChange}
                onOpen={onCompanyOpen}
                onChangeValue={onChange}
                zIndex={1000}
                zIndexInverse={3000}
              />
            )}
          />
          {errors.product_type && (
            <Text
              style={{
                fontSize: 10,
                color: "red",
                // marginTop: "1%",
                marginLeft: "2%",
                // marginBottom: "2%",
              }}
            >
              {errors.product_type.message}
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
              name="product_fees"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, { width: 170 }]}
                  selectionColor={"#5188E3"}
                  placeholder={t("Product_Fees")}
                  keyboardType="number-pad"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.product_fees && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  marginTop: "-7%",
                  marginLeft: "8%",
                  marginBottom: "5%",
                }}
              >
                {errors.product_fees.message}
              </Text>
            )}
          </View>
          <View>
            <Controller
              name="product_fees_hour"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <DropDownPicker
                  style={[styles.dropdown, { width: 130 }]}
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
                  // searchable={true}
                  // searchPlaceholder="Set duration here..."
                  onOpen={onCompanyOpen}
                  onChangeValue={onChange}
                />
              )}
            />
            {errors.product_fees_hour && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  marginLeft: "7%",
                  marginBottom: "5%",
                }}
              >
                {errors.product_fees_hour.message}
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
              name="Duration"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, { width: 170 }]}
                  selectionColor={"#5188E3"}
                  placeholder={t("Rental_Duration")}
                  keyboardType="number-pad"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.Duration && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  marginTop: "-7%",
                  marginLeft: "8%",
                  marginBottom: "5%",
                }}
              >
                {errors.Duration.message}
              </Text>
            )}
          </View>

          <View>
            <Controller
              name="Duration2"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <DropDownPicker
                  style={[styles.dropdown, { width: 130 }]}
                  open={houropen1}
                  value={hourvalue1} //companyValue
                  items={duration1}
                  setOpen={sethouropen1}
                  setValue={sethourvalue1}
                  setItems={setduration1}
                  placeholder={t("Select")}
                  dropDownContainerStyle={{
                    position: "relative", // to fix scroll issue ... it is by default 'absolute'
                    top: 0, //to fix gap between label box and container
                  }}
                  placeholderStyle={[styles.placeholderStyles]}
                  containerStyle={{ zIndex: 50, width: 120 }}
                  loading={loading}
                  listMode="SCROLLVIEW"
                  activityIndicatorColor="#5188E3"
                  // searchable={true}
                  // searchPlaceholder="Set duration here..."
                  onOpen={ondurationOpen}
                  onChangeValue={onChange}
                />
              )}
            />
            {errors.Duration2 && (
              <Text
                style={{
                  fontSize: 10,
                  color: "red",
                  marginLeft: "7%",
                  marginBottom: "5%",
                }}
              >
                {errors.Duration2.message}
              </Text>
            )}
          </View>
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
                placeholder={t("Select_Country")}
                dropDownContainerStyle={{
                  position: "relative", // to fix scroll issue ... it is by default 'absolute'
                  top: 0, //to fix gap between label box and container
                }}
                placeholderStyle={[styles.placeholderStyles]}
                containerStyle={{ zIndex: 50 }}
                loading={loading}
                listMode="MODAL"
                activityIndicatorColor="#5188E3"
                searchable={true}
                searchPlaceholder="Search Country Here..."
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
                // marginTop: "1%",
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
            flexDirection: "row-reverse",
            justifyContent: "space-around",
          }}
        >
          <View>
            <Controller
              name="District"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <View style={styles.dropdownCompany}>
                  <DropDownPicker
                    style={[styles.dropdown, { width: 160 }]}
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
                    listMode="MODAL"
                    activityIndicatorColor="#5188E3"
                    searchable={true}
                    searchPlaceholder="Search District Here..."
                    onOpen={ondurationOpen}
                    onChangeValue={(onstateChange(companyValue), onChange)}
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
                  marginLeft: "9%",
                  marginBottom: "6%",
                }}
              >
                {errors.District.message}
              </Text>
            )}
          </View>
          <View>
            <Controller
              name="state"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <DropDownPicker
                  style={[styles.dropdown, { width: 160 }]}
                  open={companyOpen}
                  value={companyValue} //companyValue
                  items={statesObj}
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
                  placeholder={t("State")}
                  placeholderStyle={styles.placeholderStyles}
                  loading={loading}
                  activityIndicatorColor="#5188E3"
                  searchable={true}
                  containerStyle={{ zIndex: 50, width: 150 }}
                  searchPlaceholder="Search State Here..."
                  onOpen={onCompanyOpen}
                  onChangeValue={(onCityChange(cityvalue), onChange)}
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
                  marginTop: "-1%",
                  marginLeft: "4%",
                  marginBottom: "6%",
                }}
              >
                {errors.state.message}
              </Text>
            )}
          </View>
        </View>
        <Controller
          name="address"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[
                styles.input,
                { height: 130, textAlignVertical: "top", paddingTop: 10 },
              ]}
              selectionColor={"#5188E3"}
              placeholder={t("Address")}
              onChangeText={onChange}
              multiline={true}
              numberOfLines={4}
              value={value}
            />
          )}
        />
        {errors.address && (
          <Text
            style={{
              fontSize: 10,
              color: "red",
              marginTop: "-4%",
              marginLeft: "4%",
              marginBottom: "3%",
            }}
          >
            {errors.address.message}
          </Text>
        )}
        <Controller
          name="product_description"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[
                styles.input,
                { height: 160, textAlignVertical: "top", paddingTop: 10 },
              ]}
              selectionColor={"#5188E3"}
              placeholder={t("Product_Description")}
              onChangeText={onChange}
              multiline={true}
              numberOfLines={4}
              value={value}
            />
          )}
        />
        {/* {errors.product_description && (
          <Text style={{ color: "red", marginLeft: 20 }}>
            {errors.product_description.message}
          </Text>
        )} */}
        <View>
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
                  phonenumber == ""
                    ? value
                    : phonenumber.replace(/^(\+91)(\d{10})$/, "$1 $2")
                }
              />
            )}
          />
        </View>
        <Text
          style={{
            marginLeft: "4%",
            // marginHorizontal: 10,
            color: "#333",
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          {t("Add_Product_Image")}
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
                marginVertical: 10,
                marginHorizontal: 20,
              }}
            >
              <View>
                <Entypo name="camera" size={24} color="#333" />
              </View>
            </View>
          ) : (
            <View style={{}}>
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
          // onRequestClose={() => {
          //   setModalVisible(!modalVisible);
          //   setActivityIndicators(false);
          // }}
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
                <LottieViewloadingmodal />
              ) : (
                // <View>
                //   <Text>Loading. please wait</Text>
                //  <ActivityIndicator size="large" />
                // </View>
                <>
                  {/* <TouchableHighlight
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
                  </TouchableHighlight> */}

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
          <Text
            style={{
              color: "#fff",
              fontWeight: "500",
              fontSize: 16,
            }}
          >
            {t("Create_Post")}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   marginHorizontal: 10,
  //   marginTop: 30,
  // },

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
    color: "#acacac",
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
    backgroundColor: "#fff",
    borderRadius: 25,
    borderColor: "#acacac",
    padding: 100,
    height: "42%",
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    borderWidth: 1,
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
    backgroundColor: "#eefbff",
    // marginVertical: 32,
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

export default ShortTermRental;
