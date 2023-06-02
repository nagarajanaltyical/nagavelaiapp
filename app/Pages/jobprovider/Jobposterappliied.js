import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useContext } from "react";
import { LocalizationContext } from "../../../App";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";
import MessageSelect from "../message/MessageSelect";
import { useSelector, useDispatch } from "react-redux";
import LottieViewloading from "../../components/Loading";
// create a component

const Items = ({ pic, name, title, time }) => (
  <View style={{ flex: 1, marginBottom: 20 }}>
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 15,
        height: "100%",
        width: "90%",
        marginLeft: "5%",
        justifyContent: "center",
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5.62,
        elevation: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <View
          style={{
            // justifyContent: "center",
            // alignItems: "center",
            width: "80%",
            // backgroundColor: "red",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#333",
                fontSize: 17,
                width: "75%",
                marginBottom: "4%",
                textTransform: "capitalize",
                marginLeft: 8,
                fontWeight: "500",
              }}
            >
              {name}
            </Text>
          </View>
          <View
            style={{ flexDirection: "column", width: "75%", marginLeft: 8 }}
          >
            <Text
              style={{
                color: "#333",
                fontSize: 13,
                fontWeight: "500",
                marginBottom: "1%",

                // marginLeft: 55,
              }}
            >
              Applied for :{" "}
            </Text>

            <Text
              style={{
                color: "#535353",
                fontSize: 13,
                fontWeight: "400",
                textTransform: "capitalize",
                // marginRight: 30,
              }}
            >
              {title}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "18%",
          }}
        >
          <Image
            source={{
              uri:
                pic == ""
                  ? "https://cdn.pixabay.com/photo/2013/07/13/10/44/man-157699__340.png"
                  : pic,
            }}
            style={{
              backgroundColor: "#EEFBFF",
              width: 46,
              height: 46,
              //   marginTop: 3,
              borderRadius: 110,
              resizeMode: "cover",
              borderColor: "#1e5966",
              borderWidth: 0.5,
              // borderColor: "#f6ab03",
              // borderWidth: 1,
            }}
          />
          <Text
            style={{
              color: "#535353",
              fontSize: 10,
              fontWeight: "400",
            }}
          >
            {time} ago
          </Text>
        </View>
      </View>
    </View>
  </View>
);

function Jobposterapplied() {
  const [isclick, setIsclick] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { t, language, setlanguage } = useContext(LocalizationContext);
  const handleSearch = (text) => {
    console.log(text);
    setSearchQuery(text);
  };
  const filteredData = data.filter((item) =>
    item.job_title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log("filteredData");

  console.log(filteredData);
  const userID = useSelector((state) => state.ID);
  const Tofindtimediff = (paras, paras2) => {
    const date1 = new Date(paras);
    const date2 = new Date(paras2);

    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    if (minutesDiff < 60) {
      return `${Math.floor(minutesDiff)} mins`;
    } else if (minutesDiff > 60 && minutesDiff < 1440) {
      return `${Math.floor(minutesDiff / 60)} hrs`;
    } else {
      return `${Math.floor(minutesDiff / 1440)} day`;
    }
  };
  const cretaedateToString = (date) => {
    const datafirst = new Date(date);
    const datesecond = datafirst.toISOString();
    const datafinal = new Date(datesecond);
    return datafinal;
  };
  // Example usage
  // const date1 = new Date();
  // console.log(date1);
  // const date2 = "Fri, 24 Feb 2023 10:12:05 GMT";
  // const dateObject = new Date(date2);
  // console.log(dateObject);
  // // Format the Date object into the new format
  // const newDateString = dateObject.toISOString();
  // const newDatestring1 = date1.toISOString();
  // const finaldate = new Date(newDateString);
  // const finaldate1 = new Date(newDatestring1);
  // console.log(getDateDiff(date1, finaldate));
  useEffect(() => {
    fetchdata();
  }, []);
  async function fetchdata() {
    console.log("i am at the dataa");
    // console.log(navigation);
    try {
      await fetch(
        `http://103.174.10.108:5002/api/job_user_apply_list/${userID}`,
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
          console.log(result);
          const newdatas = [];
          const uniquedata = [];
          const date1 = new Date();
          var newdata = result["posted_job"];

          for (let i = 0; i < newdata.length; i++) {
            const copy = {
              ...newdata[i],
              apply_datetime: Tofindtimediff(
                date1,
                newdata[i]["apply_datetime"]
              ),
            };
            console.log(copy);
            newdatas.push(copy);
          }
          console.log("newdatas.length");
          let count = 1;
          console.log(newdatas.length);
          for (let i = 0; i < newdatas.length; i++) {
            // newdatas[i]["unique_id"] = count;
            newdatas[i]["unique_id"] = count;
            //  data[i]"unique_id"=count
            uniquedata.push(newdatas[i]);
            count++;
          }
          console.log("uniquedata");
          console.log(uniquedata);
          setdata(uniquedata);
          setRefreshing(false);
          setloading(false);
        });
    } catch (error) {
      console.warn(error);
    }
  }
  console.log(isclick);
  if (loading && data.length > 0) {
    return (
      <LottieViewloading />
      // <View>
      //   <Text>Loading..</Text>
      // </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#eefbff" }}>
      {/* tob bar */}
      {/* <View
            style={{
              height: 80,
              width: 340,
              alignContent: "flex-start",
              justifyContent: "space-between",
              position: "absolute",
              marginHorizontal: 20,
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                color: "#4A4242",
                fontSize: 22,
                fontWeight: "700",
                marginTop: 21,
              }}
            >
              You have
            </Text>
            <Text
              style={{
                color: "#f6ab03",
                fontSize: 27,
                width: 400,
                marginLeft: 90,
                fontWeight: "900",
                position: "absolute",
              }}
            >
              <Text style={{ fontSize: 30 }}> 12</Text> unread chats
              <MaterialIcons name="message" size={44} color="#FF5A5F" />
            </Text>
          </View> */}
      <View
        style={{
          //   justifyContent: "center",
          //   alignContent: "center",
          marginVertical: 10,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 22, color: "#333" }}>
          {t("Interested_Candidates")}
        </Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginBottom: "5%",
          backgroundColor: "#eefbff",
        }}
      >
        <View
          style={{
            width: "70%",
            height: 35,
            borderWidth: 0.5,
            // paddingLeft: 20,
            // margin: 5,

            justifyContent: "space-evenly",
            flexDirection: "row",
            borderRadius: 20,
            // marginLeft: 200,
            borderColor: "#D9D9D9",
            backgroundColor: "#fff",
            // marginHorizontal: 55,
            // marginVertical: 15,
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <EvilIcons name="search" size={22} color="#707070" />
          </View>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder={t("search_by_job_title")}
            onChangeText={handleSearch}
            value={searchQuery}
            style={{
              // marginRight: "15%",
              width: "66%",
              fontSize: language == "English" ? 12 : 12,
            }}
          />
          <View
            style={{
              marginLeft: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Our new features are just around the corner.");
              }}
            >
              <FontAwesome name="microphone" size={22} color="#707070" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            // backgroundColor: "red",
            width: "15%",
            marginLeft: "4%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Our new features are just around the corner.");
            }}
          >
            <Image
              // resizeMode="contain"
              source={require("../../images/filters.png")}
              style={{ width: 40, height: 40, marginLeft: -16 }}
            />
            {/* <FontAwesome name="filter" size={24} color="#333" /> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Our new features are just around the corner.");
            }}
          >
            <Ionicons name="heart" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: "#eefbff" }}>
        {refreshing ? (
          <ActivityIndicator />
        ) : (
          (console.log("highrt traaa"), console.log(data))
        )}
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <Items
              title={item.job_title}
              // sal={item.Salary}
              // per={item.per}
              // time={item.time}
              time={item.apply_datetime}
              name={item.username}
              pic={item.profilepic}
              // Dis={item.distance}
              // short={item.is_short}
            />
          )}
          keyExtractor={(item) => item.unique_id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchdata} />
          }
        />
      </View>
      <View style={{ height: "8%" }}></View>
    </View>
  );
}
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: "red",
    justifyContent: "space-between",
    alignItems: "flex-end",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
  leftSide: {
    flex: 0.5,
  },
  rightContainer: {
    flex: 0.7,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});

//make this component available to the app
export default Jobposterapplied;
