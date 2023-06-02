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
import moment from "moment";
import LottieViewloading from "../../components/Loading";
import { useNavigation } from "@react-navigation/native";
// create a component

const Items = ({ pic, name, msg, unviewd, nav, user_id }) => (
  <Pressable
    onPress={() =>
      nav.navigate("chatRoom", {
        sender_id: user_id,
        profile_pic: pic,
        username: name,
      })
    }
  >
    <View style={{ flex: 1, marginBottom: 5 }}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 15,
          width: "95%",
          marginHorizontal: "3%",
          flexDirection: "row",
          justifyContent: "center",
          shadowColor: "black",
          shadowOffset: {
            width: 1,
            height: 2,
          },
          shadowOpacity: 0.5,
          borderBottomColor: unviewd != 0 ? "green" : "white",
          borderBottomWidth: unviewd != 0 ? 3 : 0,
          shadowRadius: 1,
          elevation: 8,
        }}
      >
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
          {/* <Text
            style={{
              color: "#535353",
              fontSize: 10,
              fontWeight: "400",
            }}
          > */}
          {/* {time} ago */}
          {/* </Text> */}
        </View>
        <View
          style={{
            flexDirection: "column",
            marginHorizontal: 10,
            width: "70%",
            marginVertical: 10,
          }}
        >
          <View style={{ width: "98%", marginBottom: 5 }}>
            <Text
              style={{
                color: "#333",
                fontSize: 17,
                lineHeight: 20,
                textTransform: "capitalize",
                marginLeft: 8,
                fontWeight: "500",
              }}
            >
              {name}
            </Text>
          </View>
          <View style={{ width: "98%" }}>
            <Text
              style={{
                color: "#333",
                fontSize: 13,
                fontWeight: "500",
                marginLeft: 8,
                lineHeight: 20,
                // marginLeft: 55,
              }}
            >
              {msg.length < 30 ? msg : `${msg.slice(0, 38)}...`}
              {console.log(msg.length)}
            </Text>
          </View>
          {unviewd != 0 ? (
            <View
              style={{
                backgroundColor: "green",
                width: 20,
                height: 20,
                borderRadius: 20 / 2,
                marginLeft: "92%",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  justifyContent: "center",
                  fontWeight: "600",
                  marginLeft: 6,
                  alignItems: "center",
                }}
              >
                {unviewd}
              </Text>
            </View>
          ) : (
            ""
          )}
        </View>
      </View>
    </View>
  </Pressable>
);

function ChatScreen({ navigation }) {
  const [isclick, setIsclick] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const states = useSelector((state) => state);

  const userType = !states.job_seeker_info
    ? !states.job_provider_info
      ? !states.rental_provider_info
        ? "rental_seeker_info"
        : "rental_provider_info"
      : "job_provider_info"
    : "job_seeker_info";
  console.log("im the user typpeee");
  console.log(userType);
  const { t, language, setlanguage } = useContext(LocalizationContext);
  const handleSearch = (text) => {
    console.log(text);
    setSearchQuery(text);
  };
  const filteredData = data.filter((item) =>
    item.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log("filteredData");
  //   useEffect(() => {
  //     navigation.addListener("", () => fetchdata);
  //   }, []);
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
  React.useEffect(() => {
    navigation.addListener("tabpress", () => console.log("dataat"));
  }, []);
  async function fetchdata() {
    console.log("i am at the dataa");
    // console.log(navigation);
    try {
      const body = {};
      body.user_id = userID;
      body.userType = !states.job_seeker_info
        ? !states.job_provider_info
          ? !states.rental_provider_info
            ? "rental_seeker_info"
            : "rental_provider_info"
          : "job_provider_info"
        : "job_seeker_info";
      //   body.userType = "job_provider_info";
      await fetch(`http://103.174.10.108:5002/api/pro_msg`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          console.log(result["user"]);
          console.log(result["user"][0]);
          const mergedArray = [].concat(...result["user"]); // Merge the arrays
          //   console.log(mergedArray);
          //   const flattenedArray = mergedArray.reduce(
          //     (acc, val) => acc.concat(val),
          //     []
          //   ); // Flatten the merged array

          //   console.log(flattenedArray);
          // get_the_days(flattenedArray[0]["date"]);
          setdata(mergedArray);
          setRefreshing(false);
          //   setloading(false);
        });
    } catch (error) {
      console.warn(error);
    }
  }
  console.log(isclick);
  //   if (data.length >= 0) {
  //     return (
  //       <LottieViewloading />
  //       // <View>
  //       //   <Text>Loading..</Text>
  //       // </View>
  //     );
  //   }
  return (
    <View style={{ flex: 1, backgroundColor: "#eefbff" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginBottom: "5%",
          marginTop: "5%",
          backgroundColor: "#eefbff",
        }}
      >
        <View
          style={{
            width: "80%",
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
            placeholder="Search by name"
            onChangeText={handleSearch}
            value={searchQuery}
            style={{
              // marginRight: "15%",
              width: "70%",
              fontSize: language == "English" ? 12 : 12,
            }}
          />
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: "#eefbff" }}>
        {refreshing ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <Items
                title={item.username}
                // sal={item.Salary}
                // per={item.per}
                // time={item.time}
                //   time={item.apply_datetime}
                msg={item.msg}
                nav={navigation}
                unviewd={item.unviwed}
                name={item.username}
                user_id={item.user_id}
                pic={item.profilepic}
                // Dis={item.distance}
                // short={item.is_short}
              />
            )}
            keyExtractor={(item) => item.username}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchdata} />
            }
          />
        )}
      </View>
      <View style={{ height: "9%" }}></View>
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
export default ChatScreen;
