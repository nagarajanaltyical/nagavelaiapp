//import liraries
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Pressable,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  TextInput,
  Search,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { S_FILTER } from "../../App";
import Top from "../components/Topcontainer";
import { useEffect } from "react";
import { LocalizationContext } from "../../App";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Octicons,
  SimpleLineIcons,
  EvilIcons,
  Entypo,
} from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { Use } from "react-native-svg";
import Top2 from "../components/Topcontainer2";
import LottieViewloading from "../components/Loading";
import Nodata from "../Lottie/Nodata";
import { MotiView } from "moti";
import { endAsyncEvent } from "react-native/Libraries/Performance/Systrace";
//get a item

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

//onshare
//on share
const onShare = async ({
  title,
  sal,
  per,
  time,
  loc,
  cou,
  Dis,
  name,
  short,
  work,
}) => {
  try {
    const result = await Share.share({
      title: "Message from Velai app",
      message: `Job Title:${title}\nSalary:${sal}/${
        short == "True" ? per : "LPA"
      }\nTime:${
        short == "True" ? time : work
      }\nLocation:${loc}\n Message sent from velai app`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

const Items = ({
  title,
  sal,
  per,
  time,
  loc,
  work,
  page,
  Dis,
  pic,
  name,
  short,
  longs,
  shortID,
  Id,
  navigation,
}) => (
  <View
    style={{
      flex: 1,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      marginTop: 3,
      marginBottom: 3,
    }}
  >
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("shorttimeswipe");
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          height: "100%",
          width: "98%",
          paddingHorizontal: 7,

          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2.62,
          elevation: 3,
        }}
      >
        <View
          style={{
            // height: 170,
            height: "100%",
            marginLeft: 5,
            flexDirection: "column",
            // marginHorizontal: 30,
          }}
        >
          <View
            style={{ flexDirection: "row", marginBottom: 10, marginTop: 5 }}
          >
            <Text
              style={{
                color: "#333",
                fontSize: 18,
                textAlign: "left",
                fontWeight: "500",
                textAlign: "left",
                marginTop: 10,
                lineHeight: 21,
                width: "85%",
                // backgroundColor: "red",
                // marginHorizontal: 30,
              }}
            >
              {title}
            </Text>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <EvilIcons
                name="heart"
                size={24}
                color="black"
                style={{ marginTop: 10 }}
              />
              <Text
                style={{ color: "#BDBCBC", fontSize: 10, fontWeight: "400" }}
              >
                2 days ago
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                // resizeMode="contain"
                source={require("../images/rupee.png")}
                style={{ width: 18, height: 18 }}
              />
              <Text
                style={{
                  // marginTop: 3,
                  color: "#535353",
                  fontSize: 13,
                  width: 150,
                  marginLeft: 10,
                  // backgroundColor: "red",
                  fontSize: 14,
                  fontWeight: "400",
                }}
              >
                {sal} {per}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",
              }}
            >
              <Image
                // resizeMode="contain"
                source={require("../images/history.png")}
                style={{ width: 19, height: 23 }}
              />
              <Text
                style={{
                  // marginTop: 3,
                  color: "#535353",
                  fontSize: 13,
                  fontSize: 14,
                  marginLeft: 10,
                  width: 120,

                  fontWeight: "400",
                }}
              >
                {short == "True" ? time : work}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 10,
                alignContent: "center",
              }}
            >
              <Image
                // resizeMode="contain"
                source={require("../images/mappin.png")}
                style={{ width: 19, height: 19 }}
              />
              <Text
                style={{
                  // marginTop: 3,
                  color: "#535353",
                  fontSize: 13,
                  fontSize: 14,
                  width: 210,
                  marginLeft: 10,
                  fontWeight: "400",
                }}
              >
                Adyar, {loc.split(",")[0]} | {Dis} km
              </Text>
            </View>
          </View>

          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              width: "100%",
              marginBottom: 15,
            }}
          >
            <View
              style={{
                width: 45,
                height: 45,
                //   marginTop: 3,

                borderRadius: 50,
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 5.62,
                elevation: 8,

                resizeMode: "cover",
              }}
            >
              <Image
                source={{
                  uri: pic,
                }}
                style={{
                  backgroundColor: "#EEFBFF",
                  width: 45,
                  height: 45,
                  //   marginTop: 3,

                  borderRadius: 50,

                  resizeMode: "cover",
                  // borderColor: "#f6ab03",
                  // borderWidth: 1,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                width: "65%",
                paddingLeft: 10,

                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "#56909D", fontSize: 15, fontWeight: "500" }}
              >
                {name}
              </Text>
              <Text
                style={{
                  color: "#56909D",
                  fontSize: 13,
                  fontWeight: "400",
                  textTransform: "capitalize",
                }}
              >
                Owner
              </Text>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  // marginTop: 3,

                  color: "#56909D",
                  fontSize: 13,
                  fontSize: 14,

                  fontWeight: "400",
                }}
              >
                2 Openings
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </View>
);

// create a component

function Shorttermmainlist({ navigation, route }) {
  // const [search, setSearch] = useState("");
  const { t, language, setlanguage } = useContext(LocalizationContext);
  const { state1, dispatch1 } = useContext(S_FILTER);
  console.log(state1);
  const [search, setSearch] = useState("");
  const states = useSelector((state) => state);

  const user_id = useSelector((state) => state.ID);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  useEffect(() => {
    fetchdata();
  }, []);
  React.useEffect(() => {
    navigation.addListener("tabPress", () => fetchdata());
  }, []);
  const [nodata, setnodata] = useState(false);
  const [end, OnEnd] = useState(false);
  const [no_more, setnomore] = useState(false);
  const Onfetch = async () => {
    OnEnd(true);
    const body = {};
    const pagevalue = state1.page + 1;
    body.page = pagevalue;
    dispatch1({ type: "Page_Increase", payload: pagevalue });
    body.filter = {
      states: "$",
      district: "$",
      job_title: "$",
      duration: "$",
      salary: "$",
      filter_click: false,
    };
    body.language = states.lang_value;

    try {
      await fetch(
        `http://103.174.10.108:5002/api/limit/s_like_apply_check/${user_id}`,
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setRefreshing(false);
          var newdata = result["short"];

          if (newdata.length == 0) {
            setnomore(true);
            OnEnd(false);
          } else {
            setdata([...data, ...newdata]);

            OnEnd(false);
          }
          // setdata(newdata);
          // setloading(false);
        });
    } catch (error) {
      console.warn(error);
    }
  };

  async function fetchdata() {
    console.log(states);
    const body = {};
    body.page = 0;
    body.filter = {
      states: "$",
      district: "$",
      job_title: "$",
      duration: "$",
      salary: "$",
      filter_click: false,
    };
    body.language = states.lang_value;

    try {
      await fetch(
        `http://103.174.10.108:5002/api/limit/s_like_apply_check/${user_id}`,
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setRefreshing(false);
          var newdata = result["short"];

          if (newdata.length == 0) {
            setnodata(true);
            setloading(false);
          } else {
            dispatch1({ type: "Page_Increase", payload: 1 });
            setdata(newdata);
            setloading(false);
            setnodata(false);
          }
          // setdata(newdata);
          // setloading(false);
        });
    } catch (error) {
      console.warn(error);
    }
  }
  const handleSearch = (text) => {
    setSearchQuery(text);
  };
  const filteredData = data.filter((item) =>
    item.job_title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (loading && data.length > 0) {
    return (
      <View style={{ backgroundColor: "#eefbff" }}>
        <LottieViewloading />
      </View>
    );
  }
  return (
    <View style={{ height: "100%", width: "100%" }}>
      {/* <Top2 /> */}
      {/* <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: "500",
            marginTop: 10,
          }}
        >
          {t("Saved")} {t("jobs")}
        </Text>
      </View> */}

      {loading ? (
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            marginVertical: "50%",
          }}
        >
          <LottieViewloading />
          {/* <Nodata /> */}
          {/* <Image
              style={{
                height: "50%",
                width: "100%",
                resizeMode: "contain",
              }}
              source={require("../../images/jobpost.png")}
            /> */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              marginTop: "30%",
            }}
          >
            {/* <Text
                  style={{ fontSize: 20, fontWeight: "600", color: "#1e5966" }}
                >
                  Don’t have an any post
                </Text> */}
          </View>
        </View>
      ) : nodata ? (
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            marginTop: "70%",
          }}
        >
          <Nodata />
          {/* <Image
              style={{
                height: "50%",
                width: "100%",
                resizeMode: "contain",
              }}
              source={require("../../images/jobpost.png")}
            /> */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              paddingTop: "40%",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "500", color: "#1e5966" }}>
              No data found
            </Text>
          </View>
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          {refreshing ? <ActivityIndicator /> : null}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "#eefbff",
            }}
          >
            <FlatList
              data={filteredData}
              decelerationRate="fast"
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <Items
                  title={item.job_title}
                  sal={item.Salary}
                  per={item.per}
                  time={item.Duration}
                  work={item.time}
                  name={item.username}
                  loc={item.location}
                  // page={route.name}
                  pic={item.pic}
                  Dis={item.distance}
                  short={item.is_short}
                  longs={item.long_id}
                  shortID={item.short_id}
                  Id={item.id}
                  end={end}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item) => item.unique_id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={fetchdata} />
              }
              onEndReached={() => (!no_more ? Onfetch() : console.log("hii"))}
            />
          </View>
        </SafeAreaView>
      )}

      {end ? (
        <View style={{}}>
          <View
            style={{
              height: 40,
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator />
            {!no_more ? (
              <Text style={{ marginLeft: 10 }}>Loading..</Text>
            ) : (
              <Text style={{ marginLeft: 10 }}>No more data</Text>
            )}
          </View>
        </View>
      ) : (
        ""
      )}
      <View style={{ height: "14.7%", backgroundColor: "#eefbff" }}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#eefbff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Shorttermmainlist;