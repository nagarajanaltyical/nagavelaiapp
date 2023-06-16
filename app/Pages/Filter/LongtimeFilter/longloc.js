import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useState, useEffect, useMemo } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { L_FILTER } from "../../../../App";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { set } from "react-native-reanimated";
export default function Location1(props) {
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [open2, setOpen2] = useState(false);
  const { state2, dispatch2 } = useContext(L_FILTER);

  const [value2, setValue2] = useState(null);
  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [District, setDistrict] = useState(null);
  //   const { state1, dispatch1 } = useContext(S_FILTER);
  // const [loading, setloading] = useState(true);
  const [data, setdata] = useState([]);
  const [country, setcountry] = useState([]);

  //useEffect

  const [items1, setItems1] = useState([
    {
      label: "India",
      value: "en",
      //   icon: () => <Text style={{ fontSize: 17, fontWeight: "800" }}>EN </Text>,
    },
    {
      label: "Afghanistan",

      value: "ta",
      //   icon: () => <Text style={{ fontSize: 17, fontWeight: "800" }}>TN </Text>,
    },
    {
      label: "Albania",
      value: "ka",
      //   icon: () => <Text style={{ fontSize: 17, fontWeight: "800" }}>KA </Text>,
    },
    {
      label: "AlgeriaAzerbaijan",
      value: "te",
      //   icon: () => <Text style={{ fontSize: 17, fontWeight: "800" }}>TE </Text>,
    },
    {
      label: "England",
      value: "ma",
      //   icon: () => <Text style={{ fontSize: 14, fontWeight: "800" }}>MA </Text>,
    },
  ]);

  const [items2, setitems2] = useState([
    {
      label: "Andaman and Nicobar Islands",
      value: "Andaman and Nicobar Islands",
    },
    { label: "Andhra Pradesh", value: "Andhra Pradesh" },
    { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
    { label: "Assam", value: "Assam" },
    { label: "Bihar", value: "Bihar" },
    { label: "Chandigarh", value: "Chandigarh" },
    { label: "Chhattisgarh", value: "Chhattisgarh" },
    { label: "Dadra and Nagar Haveli", value: "Dadra and Nagar Haveli" },
    { label: "Daman and Diu", value: "Daman and Diu" },
    { label: "Goa", value: "Goa" },
    { label: "Gujarat", value: "Gujarat" },
    { label: "Haryana", value: "Haryana" },
    { label: "Himachal Pradesh", value: "Himachal Pradesh" },
    { label: "Jharkhand", value: "Jharkhand" },
    { label: "Karnataka", value: "Karnataka" },
    { label: "Kashmir", value: "Kashmir" },
    { label: "Kerala", value: "Kerala" },
    { label: "Madhya Pradesh", value: "Madhya Pradesh" },
    { label: "Maharashtra", value: "Maharashtra" },
    { label: "Manipur", value: "Manipur" },
    { label: "Meghalaya", value: "Meghalaya" },
    { label: "Mizoram", value: "Mizoram" },
    { label: "NCT", value: "NCT" },
    { label: "Nagaland", value: "Nagaland" },
    { label: "Odisha", value: "Odisha" },
    { label: "Pondicherry", value: "Pondicherry" },
    { label: "Punjab", value: "Punjab" },
    { label: "Rajasthan", value: "Rajasthan" },
    { label: "Sikkim", value: "Sikkim" },
    { label: "Tamil Nadu", value: "Tamil Nadu" },
    { label: "Telangana", value: "Telangana" },
    { label: "Tripura", value: "Tripura" },
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    { label: "Uttarakhand", value: "Uttarakhand" },
    { label: "West Bengal", value: "West Bengal" },
  ]);
  const [items3, setItems3] = useState([
    {
      label: "chennai",
      value: "en",
      //   icon: () => <Text style={{ fontSize: 17, fontWeight: "800" }}>EN </Text>,
    },
    {
      label: "Erode",
      value: "ta",
      //   icon: () => <Text style={{ fontSize: 17, fontWeight: "800" }}>TN </Text>,
    },
    {
      label: "selam",
      value: "ka",
      //   icon: () => <Text style={{ fontSize: 17, fontWeight: "800" }}>KA </Text>,
    },
    {
      label: "pudukottai",
      value: "te",
      //   icon: () => <Text style={{ fontSize: 17, fontWeight: "800" }}>TE </Text>,
    },
    {
      label: "vilupuram",
      value: "ma",
      //   icon: () => <Text style={{ fontSize: 14, fontWeight: "800" }}>MA </Text>,
    },
  ]);

  // const cachedValue = useMemo(() => getData(), [data]);
  //
  // useEffect(() => {
  //   getData();
  // }, []);
  // const getData = async () => {
  //   try {
  //     await fetch(
  //       "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json",
  //       {
  //         method: "GET", // *GET, POST, PUT, DELETE, etc.
  //         mode: "cors", // no-cors, *cors, same-origin
  //         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //         credentials: "same-origin", // include, *same-origin, omit
  //         headers: {
  //           "Content-Type": "application/json",
  //           // 'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((result) => {
  //         setdata(result), setloading(false);
  //       });
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };
  //
  // let states = data.filter((state) => state.country == "India");
  //
  // states = [...new Set(states.map((item) => item.subcountry))];
  // states.sort();
  //
  // const statesObj = [];
  // for (let i = 0; i < states.length; i++) {
  //   statesObj.push({ label: states[i], value: states[i] });
  // }
  // const handledistrict = async (e) => {
  //
  //   // await getData();
  //   //
  //   //
  //   // const [state, setsttae] = useState("");
  //   if (data != undefined) {
  //     //
  //
  //     //
  //     let cities = data.filter((city) => city.subcountry == e);
  //
  //     let newCitites = cities.map((e) => e.name);
  //
  //     for (let i = 0; i < newCitites.length; i++) {
  //       districtObj.push({
  //         label: newCitites[i],
  //         value: newCitites[i],
  //       });
  //     }
  //
  //
  //     // let data = cities.map((item) => item.name);
  //     //
  //   } else {
  //
  //   }
  // };

  // if (loading) {
  //   return <Text>Loading....</Text>;
  // }
  return (
    <View
      View
      style={{
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          marginTop: 45,
          // justifyContent: "center",
          // alignItems: "center",
          marginLeft: 20,
        }}
      >
        <DropDownPicker
          open={open2}
          value={value2}
          items={items2}
          placeholder={"Enter State"}
          dropDownContainerStyle={{
            backgroundColor: "#DFDFDF",
          }}
          listMode="MODAL"
          placeholderStyle={{ color: "#acacac" }}
          modalTitle="Select an item"
          searchPlaceholder="Select State"
          modalAnimationType="slide"
          modalContentContainerStyle={{
            backgroundColor: "#fff",
            // color: "red",
          }}
          modalTitleStyle={{
            fontWeight: "bold",
          }}
          searchable={true}
          mode="BADGE"
          setOpen={setOpen2}
          setValue={setValue2}
          setItems={setitems2}
          style={styles.drope}
          showArrowIcon={true}
          // multiple={true}
          customItemLabelStyle={{
            fontStyle: "italic",
          }}
          onChangeValue={(value) => {
            dispatch2({ type: "SET_STATE_long", payload: value });
            // handledistrict(value);
          }}
          listItemLabelStyle={{
            color: "black",
          }}
        />
      </View>
      <View style={{ margin: 10 }}>
        <TextInput
          value={District}
          onChangeText={(dist) => setDistrict(dist)}
          placeholder={"Enter the District"}
          style={styles.input}
          placeholderTextColor={"#acacac"}
          onBlur={() => {
            dispatch2({ type: "SET_DISTRICT_long", payload: District });
          }}
          // onBlur={() => dispatch1({ type: "SET_DISTRICT", payload: District })}
        />
        {/* {/* <DropDownPicker
          open={open3}
          value={value3}
          items={items3}
          placeholder={"Enter District"}
          dropDownContainerStyle={{
            backgroundColor: "#DFDFDF",
          }}
          listMode="MODAL"
          modalTitle="Select an item"
          modalAnimationType="slide"
          modalContentContainerStyle={{
            backgroundColor: "#fff",
            color: "red",
          }}
          modalTitleStyle={{
            fontWeight: "bold",
          }}
          searchable={true}
          // onBlur={habldeBlur}
          mode="BADGE"
          // setOpen={setOpen3}
          // setValue={setValue3}
          // setItems={setItems3}
          style={styles.drope}
          showArrowIcon={true}
          customItemLabelStyle={{
            fontStyle: "italic",
          }}
          // onChangeValue={(value) => {
          //   
          //   
          //   dispatch1({ type: "SET_DISTRICT", payload: value });
          // }}
          listItemLabelStyle={{
            color: "black",
          }}
        /> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  drope: {
    // flex: 1,
    height: "20%",
    width: 260,
    // marginTop: 100,
    // backgroundColor: "red",
    borderColor: "#acacac",
    alignContent: "center",
    justifyContent: "center",
  },
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   // marginTop: 20,
  //   backgroundColor: "red",
  // },
  input: {
    // backgroundColor: "red",
    width: 260,
    height: 50,
    padding: 10,
    marginLeft: 10,
    marginTop: 20,
    borderColor: "#acacac",
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
});
