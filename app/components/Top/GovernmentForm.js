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
// import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";

import DropDownPicker from "react-native-dropdown-picker";
import { useContext } from "react";

import { LocalizationContext } from "../../../App";
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

const schema = yup.object().shape({
  Job_Title: yup.string().required("Job title cant be empty"),
  Expiry_date: yup.string().required("Job title cant be empty"),
  Link: yup.string().required("Job title cant be empty"),
});

const GovJobs = ({ navigation: { goBack } }) => {
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const { t, language, setlanguage } = useContext(LocalizationContext);

  const userID = useSelector((state) => state.ID);

  //to get the item
  //   useEffect(() => {
  //     fetchdata();
  //     getCountries();
  //     getuserdata();
  //   }, []);
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
  //
  // const CountryObj = Country.getAllCountries();

  //
  //
  //   City.getCitiesOfState("IN", "TN").filter((e) => e.name === "Chinnasalem")
  // );
  //
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    data.user_id = userID;

    async function submitdata() {
      try {
        await fetch("http://103.174.10.108:5002/api/govt_job_post", {
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
      <View
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
      </View>

      <ScrollView style={{ marginHorizontal: 10 }}>
        <Controller
          name="Job_Title"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, { marginTop: 10 }]}
              selectionColor={"#5188E3"}
              placeholderTextColor={"#acacac"}
              placeholder="Job Title"
              onChangeText={onChange}
              multiline={true}
              numberOfLines={4}
              value={value}
            />
          )}
        />
        {errors.Job_Title && (
          <Text
            style={{
              fontSize: 10,
              color: "red",
              marginTop: "-4%",
              marginLeft: "4%",
              marginBottom: "2%",
            }}
          >
            {errors.Job_Title.message}
          </Text>
        )}
        <Controller
          name="Expiry_date"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, { marginTop: 10 }]}
              selectionColor={"#5188E3"}
              placeholderTextColor={"#acacac"}
              placeholder="Expiry Date"
              onChangeText={onChange}
              multiline={true}
              value={value}
            />
          )}
        />
        {errors.Expiry_date && (
          <Text
            style={{
              fontSize: 10,
              color: "red",
              marginTop: "-4%",
              marginLeft: "4%",
              marginBottom: "2%",
            }}
          >
            {errors.Expiry_date.message}
          </Text>
        )}
        <Controller
          name="Link"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, { marginTop: 10 }]}
              selectionColor={"#5188E3"}
              placeholderTextColor={"#acacac"}
              placeholder="Link"
              onChangeText={onChange}
              multiline={true}
              numberOfLines={4}
              value={value}
            />
          )}
        />
        {errors.Link && (
          <Text
            style={{
              fontSize: 10,
              color: "red",
              marginTop: "-4%",
              marginLeft: "4%",
              marginBottom: "2%",
            }}
          >
            {errors.Link.message}
          </Text>
        )}
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
            Create Post
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
    height: 70,

    backgroundColor: "#fff",
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

export default GovJobs;
