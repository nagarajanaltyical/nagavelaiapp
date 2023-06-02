//import liraries
import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Pressable,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  Image,
  Search,
  Alert,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import { useSelector } from "react-redux";
import { LocalizationContext } from "../../App";
import { useContext } from "react";
import Top from "../components/Topcontainer";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Nodata from "../Lottie/Nodata";
import {
  MaterialCommunityIcons,
  FontAwesome,
  SimpleLineIcons,
  EvilIcons,
  Entypo,
} from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Top2 from "../components/Topcontainer2";
import LottieViewloading from "../components/Loading";
const Items = ({
  title,
  sal,
  per,
  time,
  work,
  loc,
  page,
  Dis,
  name,
  short,
  longs,
  shortID,
  Id,
  navigation,
}) => (
  <View style={{ flex: 1, marginBottom: 20, marginTop: 10 }}>
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("jobseekerswipe", {
          post_id: short == "True" ? shortID : longs,
          table_name: short == "True" ? "shorttime_job" : "long_job_post",
          page: page,
        });
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 15,
          height: "100%",
          width: "90%",
          marginLeft: "5%",
          marginBottom: 10,
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
            justifyContent: "space-between",
            alignItems: "center",

            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: "#333",
              fontSize: 18,
              fontWeight: "500",
              width: 130,
              marginTop: 10,
              marginLeft: 10,
            }}
          >
            {title}
          </Text>
          <LinearGradient
            colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
            style={{
              borderRadius: 10,
              width: 80,
              height: 30,
              marginTop: 10,

              marginLeft: "20%",
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            useAngle={45}
          >
            {/* <View
              style={{
                borderTopWidth: 20,
                backgroundColor: "red",
                borderColor: "red",
              }}
            > */}

            <Text
              style={{
                fontSize: 13,
                color: "#fff",
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              {short == "True" ? "Short" : "Long"}
            </Text>
            {/* </View> */}
          </LinearGradient>
          <View
            style={{
              marginTop: 10,
              marginRight: "20%",
              marginLeft: "3%",
            }}
          >
            <MaterialCommunityIcons
              name="share-all-outline"
              size={22}
              color="#333"
            />
          </View>
        </View>

        <Text
          style={{
            color: "#535353",
            fontSize: 14,
            fontWeight: "400",
            marginTop: 5,
            marginBottom: 10,
            marginHorizontal: 20,
          }}
        >
          Posted By: {name}
        </Text>

        <View
          style={{
            flexDirection: "row",
            width: "57%",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              width: 150,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                marginLeft: 10,

                alignContent: "center",
              }}
            >
              <Image
                // resizeMode="contain"
                source={require("../images/rupee.png")}
                style={{ width: 18, height: 18 }}
              />
              {/* <FontAwesome5 name="coins" size={20} color="#333" /> */}
              <Text
                style={{
                  // marginTop: 3,
                  fontSize: 13,
                  color: "#535353",
                  marginLeft: 10,
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
                marginBottom: 10,
                width: 150,
                marginLeft: 10,
                marginTop: 8,

                alignContent: "center",
              }}
            >
              <Image
                // resizeMode="contain"
                source={require("../images/history.png")}
                style={{ width: 19, height: 19 }}
              />
              {/* <MaterialCommunityIcons
                name="calendar-clock"
                size={20}
                color="#333"
              /> */}
              <Text
                style={{
                  // marginTop: 3,
                  fontSize: 13,
                  color: "#535353",
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: "400",
                }}
              >
                {short == "True" ? time : work}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              marginLeft: "9%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                width: 180,
                alignContent: "center",
              }}
            >
              <Image
                // resizeMode="contain"
                source={require("../images/mappin.png")}
                style={{ width: 18, height: 18 }}
              />
              {/* <Entypo name="location-pin" size={20} color="#333" /> */}
              <Text
                style={{
                  // marginTop: 3,
                  fontSize: 13,
                  color: "#535353",
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: "400",
                }}
              >
                {loc.split(",")[0]}
              </Text>
            </View>
            <View
              style={{
                alignContent: "center",
                marginTop: 8,

                flexDirection: "row",
                marginBottom: 10,
                width: "80%",
              }}
            >
              {/* <MaterialCommunityIcons
                name="map-marker-distance"
                size={20}
                color="#333"
              /> */}
              <Image
                // resizeMode="contain"
                source={require("../images/distance.png")}
                style={{ width: 20, height: 20 }}
              />
              <Text
                style={{
                  // marginTop: 3,
                  fontSize: 13,
                  color: "#535353",
                  marginLeft: 10,
                  fontSize: 14,
                  fontWeight: "400",
                }}
              >
                {Dis} km
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </View>
  // <View style={styles.item}>
  //   <Text style={styles.title}>{title}</Text>
  // </View>
);
// create a component
function Saved({ navigation, route }) {
  const user_id = useSelector((state) => state.ID);
  const [search, setSearch] = useState("");
  const { t, language, setlanguage } = useContext(LocalizationContext);

  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchdata();
  }, []);

  React.useEffect(() => {
    navigation.addListener("tabPress", () => fetchdata());
  }, []);
  const [nodata, setnodata] = useState(false);
  async function fetchdata() {
    try {
      await fetch(`http://103.174.10.108:5002/api/s_apply_details/${user_id}`, {
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
        .then((result) => {
          setRefreshing(false);
          var newdata = result["s_job_apply_details"];

          if (newdata.length == 0) {
            setnodata(true);
            setloading(false);
          } else {
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
      <View style={{ height: "100%", backgroundColor: "#eefbff" }}>
        <Text>
          <LottieViewloading />;
        </Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#eefbff" }}>
      {/* <Top2 /> */}
      <View>
        {/* <Top2 /> */}
        <Text
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: "500",
            marginTop: 10,
          }}
        >
          {t("Applied")}
        </Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {/* <View
            style={{
              width: "87%",
              height: 35,
              borderWidth: 0.5,
              // paddingLeft: 20,
              // margin: 5,

              justifyContent: "space-evenly",
              flexDirection: "row",
              borderRadius: 20,
              // marginLeft: 200,
              borderColor: "#d9d9d9",
              backgroundColor: "#fff",
              marginHorizontal: 55,
              marginVertical: 20,
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <EvilIcons name="search" size={22} color="#707070" />
            </View>
            <TextInput
              placeholder={t("search_by_job_title")}
              onChangeText={handleSearch}
              value={searchQuery}
              underlineColorAndroid="transparent"
              style={{
                // marginRight: "15%",
                fontSize: language == "English" ? 12 : 12,
              }}
            />
            <View
              style={{
                marginLeft: language == "English" ? 130 : 10,
                marginTop: 5,
              }}
            >
              <FontAwesome name="microphone" size={22} color="#707070" />
            </View>
          </View> */}
        </View>
      </View>
      <View style={styles.container}>
        {refreshing ? <ActivityIndicator /> : null}
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
              <Text
                style={{ fontSize: 20, fontWeight: "500", color: "#1e5966" }}
              >
                No data found
              </Text>
            </View>
          </View>
        ) : (
          <SafeAreaView style={styles.container}>
            <View>
              {refreshing ? <ActivityIndicator /> : null}
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View
                  style={{
                    width: "87%",
                    height: 35,
                    borderWidth: 0.5,
                    // paddingLeft: 20,
                    // margin: 5,

                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    borderRadius: 20,
                    // marginLeft: 200,
                    borderColor: "#d9d9d9",
                    backgroundColor: "#fff",
                    marginHorizontal: 55,
                    marginVertical: 20,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "space-evenly",
                      flexDirection: "row",
                      alignItems: "center",
                      // marginRight: 30,
                    }}
                  >
                    <EvilIcons name="search" size={22} color="#707070" />
                    <TextInput
                      placeholder={t("search_by_job_title")}
                      onChangeText={handleSearch}
                      value={searchQuery}
                      underlineColorAndroid="transparent"
                      style={{
                        // marginRight: "15%",
                        marginLeft: 10,
                        width: "75%",

                        fontSize: language == "English" ? 12 : 12,
                      }}
                    />
                    <View
                      style={{
                        // marginTop: 5,
                        marginLeft: 5,
                      }}
                    >
                      {/* <FontAwesome
                        name="microphone"
                        size={22}
                        color="#707070"
                      /> */}
                    </View>
                  </View>
                </View>
              </View>
              <FlatList
                data={filteredData}
                placeholder="Search by jobtitle"
                onChangeText={handleSearch}
                value={searchQuery}
                decelerationRate="fast"
                renderItem={({ item }) => (
                  <Items
                    title={item.job_title}
                    sal={item.Salary}
                    time={item.Duration}
                    work={item.time}
                    name={item.username}
                    page={route.name}
                    loc={item.location}
                    Dis={item.distance}
                    per={item.per}
                    short={item.is_short}
                    longs={item.long_id}
                    shortID={item.short_id}
                    Id={item.id}
                    navigation={navigation}
                  />
                )}
                keyExtractor={(item) => item.unique_id}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={fetchdata}
                  />
                }
              />
            </View>
          </SafeAreaView>
        )}
      </View>
      <View style={{ height: "18%" }}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eefbff",

    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

//make this component available to the app
export default Saved;
