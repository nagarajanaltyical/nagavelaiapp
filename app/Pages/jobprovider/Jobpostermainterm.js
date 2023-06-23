import React, { Component, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Modal } from "react-native";
import { useWindowDimensions } from "react-native";
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
  Image,
  TextInput,
  Search,
  LogBox,
  Share,
  Alert,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  SimpleLineIcons,
  EvilIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import LottieViewloading from "../../components/Loading";
import { LocalizationContext } from "../../../App";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigation } from "@react-navigation/native";
import Nodata from "../../Lottie/Nodata";
//to navigate

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

//flaatlist design
const Iteems = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
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
const Items = ({
  title,
  sal,
  per,
  time,
  cou,
  loc,
  Dis,
  name,
  short,
  days_ago,
  work,
  iD,
  navigation,
}) => {
  // const { navigation } = this.props.navigation;
  return (
    <View style={{ flex: 1, marginBottom: 20 }}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 15,
          height: "100%",
          width: "95%",
          marginHorizontal: 10,
          // marginLeft: "5%",
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
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "column",
              width: "96%",
              // backgroundColor: "red",
              marginHorizontal: 10,
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#333",
                  fontSize: 18,
                  marginBottom: 20,
                  fontWeight: "500",
                  width: "75%",
                  textTransform: "capitalize",

                  // backgroundColor: "green",
                  // marginTop: 10,
                  marginLeft: 10,
                }}
              >
                {title}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "20%",

                  justifyContent: "flex-end",
                  // backgroundColor: "blue",
                }}
              >
                {/* <LinearGradient
                    colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
                    style={{
                      alignContent: "center",
                      borderRadius: 10,
                      width: 75,
                      height: 30,
                      // marginLeft: 70,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    useAngle={45}
                  > */}
                {/* <View
              style={{
                borderTopWidth: 20,
                backgroundColor: "red",
                borderColor: "red",
              }}
            > */}
                {/* <Text
                      style={{
                        fontSize: 13,
                        color: "#fff",
                        fontWeight: "400",
                      }}
                    >
                      View Post
                    </Text> */}
                {/* </View> */}
                {/* </LinearGradient> */}
                <TouchableOpacity
                  onPress={() =>
                    onShare({
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
                    })
                  }
                  // style={{ backgroundColor: "red", width: "45%" }}
                >
                  <MaterialCommunityIcons
                    name="share-all-outline"
                    size={22}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableWithoutFeedback
              onPress={() =>
                short == "True"
                  ? navigation.navigate("Jobswipe1", {
                      postid: iD,
                      dates: days_ago,
                    })
                  : navigation.navigate("Jobswipe2", {
                      postid: iD,
                      dates: days_ago,
                    })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 15,
                  marginLeft: 10,
                  // backgroundColor: "red",
                  width: "80%",
                  alignContent: "center",
                }}
              >
                <Image
                  // resizeMode="contain"
                  source={require("../../images/rupee.png")}
                  style={{ width: 18, height: 18 }}
                />
                <Text
                  style={{
                    // marginTop: 3,
                    color: "#535353",
                    marginLeft: 15,
                    fontSize: 13,
                    fontWeight: "400",
                  }}
                >
                  {sal} {short == "True" ? per : "LPA"}
                </Text>
              </View>
              <View
                style={{
                  // backgroundColor: "red",
                  flexDirection: "row",
                  marginBottom: 15,
                  // width: 150,
                  marginLeft: 10,
                  // marginTop: 8,
                  width: "80%",

                  alignContent: "center",
                }}
              >
                <Image
                  // resizeMode="contain"
                  source={require("../../images/history.png")}
                  style={{ width: 19, height: 19 }}
                />
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 14,
                    color: "#535353",

                    fontWeight: "400",
                  }}
                >
                  {short == "True" ? time : work}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 15,
                  marginLeft: 10,
                  width: "80%",
                  marginBottom: 20,
                  alignContent: "center",
                }}
              >
                <Image
                  // resizeMode="contain"
                  source={require("../../images/mappin.png")}
                  style={{ width: 18, height: 18 }}
                />
                {/* <Entypo name="location-pin" size={20} color="#333" /> */}
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 14,
                    textAlign: "left",
                    color: "#535353",
                    fontWeight: "400",
                  }}
                >
                  {loc.split(",")[0]}, {loc.split(",")[1]}, {loc.split(",")[2]}
                </Text>
              </View>
            </TouchableWithoutFeedback>

            <View
              style={{
                flexDirection: "row",
                // marginLeft: 10,
                // width: "100%",
                justifyContent: "space-around",
                marginHorizontal: 15,
                // backgroundColor: "red",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    short == "True" ? "short_Edit" : "Long_edit",
                    {
                      post_id: iD,
                      table_name:
                        short == "True" ? "shorttime_job" : "long_job_post",
                    }
                  )
                }
              >
                <LinearGradient
                  colors={["#fff", "#fff", "#fff", "#fff"]}
                  style={{
                    borderRadius: 8,
                    flexDirection: "row",
                    height: 30,
                    width: "65%",
                    marginLeft: -20,
                    justifyContent: "center",
                    alignItems: "center",
                    // paddingBottom: 15,
                    //marginBottom: 14,
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  useAngle={45}
                >
                  <MaterialCommunityIcons
                    name="file-edit"
                    size={22}
                    color="#fff"
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      // marginBottom: 10,

                      fontSize: 14,
                      color: "#56909d",
                      textDecorationLine: "underline",
                      fontWeight: "600",
                    }}
                  >
                    Edit me
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // chagePage();
                  navigation.navigate("JobApppliedPersons", {
                    id: iD,
                    short: short,
                  });
                }}
              >
                {/* <LinearGradient
                  colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
                  style={{
                    alignContent: "center",
                    borderRadius: 8,
                    width: 210,
                    height: 30,
                    // marginLeft: 70,
                    justifyContent: "center",
                    alignItems: "center",
                    // marginBottom: 14,
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  useAngle={45}
                > */}
                {/* <View
              style={{
                borderTopWidth: 20,
                backgroundColor: "red",
                borderColor: "red",
              }}
            > */}

                <Text
                  style={{
                    fontSize: 14,
                    color: "#56909d",
                    fontWeight: "600",
                    textDecorationLine: "underline",
                  }}
                >
                  {short == "True" ? "Short Term" : "Long Term"} - {cou} Persons
                  Applied
                </Text>
                {/* </View> */}
              </TouchableOpacity>
              {/* </LinearGradient> */}
              {/* </View></View>  </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

// create a component
export default function Jobpostermain({ navigation }) {
  const [jobcount, setjobcount] = useState(2);
  const [loading, setloading] = useState(true);
  const { t, language, setlanguage, userDetails } =
    useContext(LocalizationContext);
  const [data, setdata] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const states = useSelector((state) => state);
  const { width } = useWindowDimensions();
  const userID = useSelector((state) => state.ID);
  const isFocused = useIsFocused();

  const chagePage = () => {
    navigation.navigate("JobApppliedPersons");
  };

  React.useEffect(() => {
    if (isFocused) {
      // callback
      submitdata();
      LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    }
  }, [isFocused]);

  useEffect(() => {
    submitdata();
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  React.useEffect(() => {
    navigation.addListener("tabPress", () => submitdata());
  }, []);
  const [phonenumber, setphonenumber] = useState("");
  const myIDnumber = useSelector((state) => state.ID);

  useEffect(() => {
    getphonenumber();
  }, []);
  async function getphonenumber() {
    try {
      await fetch(`http://103.174.10.108:5002/api/user_number/${myIDnumber}`, {
        method: "GET",
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          Accept: "application/json",
          // "Content-Type": "multipart/form-data",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // body: formdata, // body data type must match "Content-Type" header
      })
        .then((response) => response.json())
        .then((result) => {
          setphonenumber(result.number);
          // setjobpostpic(result["updated"]);
          // setActivityIndicators(false);
          // setModalVisible(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function getthedays(paras) {
    const dateoo = `${new Date(paras).getMonth() + 1}/${new Date(
      paras
    ).getDate()}/${new Date(paras).getFullYear()}`;
    console.log(dateoo);
    const dateof = `${
      new Date().getMonth() + 1
    }/${new Date().getDate()}/${new Date().getFullYear()}`;
    console.log(dateof);
    var date1 = new Date(dateoo);
    var date2 = new Date(dateof);
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Difference_In_Days;
  }
  const [nodata, setnodata] = useState(false);
  async function submitdata() {
    try {
      await fetch(`http://103.174.10.108:5002/api/provide_jobs/${userID}`, {
        method: "GET",
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
          console.log(result);
          var newdata = result["posted_job"];
          //
          console.log(newdata);
          if (newdata.length == 0) {
            setnodata(true);
            setloading(false);
          } else {
            setdata(newdata);
            setloading(false);
            setnodata(false);
          }
        });
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#eefbff" }}>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",

          // marginTop: "5%",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "500",
            color: "#333",
          }}
        >
          {t("create_post")}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: "-3%",
          borderBottomWidth: 0.5,
          borderBottomColor: "#D9D9D9",
          // marginHorizontal: 20,
          // marginBottom: 20,
          paddingBottom: 20,
          alignItems: "center",
          // alignContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            // phonenumber == "+918825848880"
            //   ? navigation.navigate("shortTermadminforms")
            //   :
            navigation.navigate("short")
          }
          style={{ marginHorizontal: 5 }}
        >
          <LinearGradient
            colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
            style={{
              height: 42,
              width: 160,
              borderRadius: 10,
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center",

              flexDirection: "row",
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            useAngle={45}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: language == "தமிழ்" ? 13 : 16,
                fontWeight: "500",
                // marginHorizontal: 10,
                justifyContent: "center",
              }}
            >
              {t("Short_Term_Job")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            // phonenumber == "+918825848880"
            //   ? navigation.navigate("LongTermsuperadmin")
            //   :
            navigation.navigate("Long")
          }
          // style={{ marginVertical: "" }}
          style={{
            marginHorizontal: 5,
          }}
        >
          <LinearGradient
            colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
            style={{
              height: 42,
              width: 160,
              borderRadius: 10,
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            useAngle={45}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "500",
                fontSize: language == "தமிழ்" ? 13 : 16,
                justifyContent: "center",
              }}
            >
              {t("Long_Term_Job")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, height: "100%" }}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3%",

            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "500",
              color: "#333",
            }}
          >
            {t("your")} {t("Post")}
          </Text>
        </View>
        {loading ? (
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",

              // marginVertical: 30,
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
                marginTop: "-17%",
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
              // marginTop: "50%",
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
                alignItems: "center",
                position: "absolute",
                bottom: 50,
                left: width / 2.8,
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
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <Items
                    iD={item.id}
                    title={item.job_title}
                    sal={item.Salary}
                    per={item.per}
                    time={item.Duration}
                    loc={item.location}
                    short={item.is_short}
                    work={item.workspace}
                    days_ago={getthedays(item.posteddatetime)}
                    cou={item.count}
                    navigation={navigation}
                    // count={item.count}
                  />
                )}
                keyExtractor={(item) => item.unique_id}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={submitdata}
                  />
                }
              />
            </View>
          </SafeAreaView>
        )}
      </ScrollView>
      <View style={{ height: "8%" }}></View>
    </View>
  );
}
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
