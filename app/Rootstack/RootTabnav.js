import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { S_FILTER } from "../../App";
import { L_FILTER } from "../../App";

import {
  Image,
  Pressable,
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
} from "react-native";
import { LocalizationContext } from "../../App";
import Saved from "../Pages/Applies";
import New from "../Pages/Filter/NEW";
import Heart from "../Pages/Heart";
import SwiperCard from "../Pages/Post";
import Rentalproducthistory from "../Pages/Rental/Rentalprovider/Rentalhistory";
import Rentalproviderpost from "../Pages/Rental/Rentalprovider/Rentalproviderpost";
import Rental from "../Pages/Rental/rental/Rentalmain";
import Rentalseeker from "../Pages/Rental/rental/Rentalsaved";
import ChatScreen from "../Pages/jobprovider/Chatscreen";
import Hire from "../Pages/jobprovider/JobhIre";
import Jobposterapplied from "../Pages/jobprovider/Jobposterappliied";
import Jobpostermain from "../Pages/jobprovider/Jobpostermainterm";
import LongtimeSwiperCard from "../Swipe/Longtimeswipe";
import SelectCategory from "../components/Maincategory/Selectcategory";
import Top from "../components/Topcontainer";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons, Octicons } from "@expo/vector-icons";

import Coming from "../Lottie/Comingsoon";
import ShorttimeSwiperCard from "../Swipe/Shorttimeswipe";
import Top2 from "../components/Topcontainer2";
import Top3 from "../components/Topcontainer3";
import { LinearGradient } from "expo-linear-gradient";
import Shorttermmainlist from "../components/Shorttermmaincategory";
import Longtermmainlist from "../components/Longtermmaincategory";
import Userjobseekerprofile from "../Pages/Userjobseekerprofile";
import EduInfo from "../Pages/Educationprofile";
import Workexperience from "../Pages/Workexperience";

const { height, width } = Dimensions.get("window");

const Homestack = createNativeStackNavigator();
function SettingsScreen({ route }) {
  // const Details = route.params.Details;
  //
  //
  return (
    <View style={{ flex: 1 }}>
      {/* <Top />
      <Profile */}
      {/* userDetails={Details} */}
      {/* /> */}
      <SwiperCard />
    </View>
  );
}

export function ModifyHome({ route }) {
  const navigation = useNavigation();

  const [isvoice, setisvoice] = useState(true);
  const { t, language, setlanguage } = useContext(LocalizationContext);
  return (
    <Homestack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "white", shadowOpacity: 0, elevation: 0 },
      }}
    >
      <Homestack.Screen
        name="tophome"
        component={SelectCategory}
        options={{
          headerShown: false,
        }}
      />
      <Homestack.Screen
        name="bottomhome"
        component={SwipeChatmainScreen}
        options={{
          // headerBackImage: {
          //   color: "#333",
          // },
          // headerShown: true,
          headerLeft: (props) => (
            <View style={{ flexDirection: "row", marginTop: -10 }}>
              <Image
                resizeMode="contain"
                source={require("../images/velailogo.png")}
                style={{ width: 30, height: 30 }}
              />
            </View>
          ),
          title: "",
          headerRight: (props) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: -2,
                // backgroundColor: "red",
                // marginLeft: "6%",
              }}
            >
              {/* <View
                style={{
                  flexDirection: "row",
                }}
              > */}
              {/* <Ionicons name="md-globe-outline" size={24} color="#333" />
                <Pressable>
                  <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                </Pressable> */}
              {/* </View> */}
              {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 12,
                }}
              > */}
              {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                  {isvoice ? (
                    <MaterialCommunityIcons
                      name="account-voice"
                      size={26}
                      color="#333"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="account-voice-off"
                      size={24}
                      color="black"
                    />
                  )}
                </Pressable> */}
              {/* </View> */}
              {/* <Pressable
                onPress={() => setisvoice(!isvoice)}
                style={{ marginRight: 14 }}
              >
                {isvoice ? (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        "Voice Assistant",
                        "Our new features are just around the corner."
                      );
                    }}
                  >
                    <MaterialCommunityIcons
                      name="account-voice"
                      size={22}
                      color="#333"
                    />
                  </TouchableOpacity>
                ) : (
                  <MaterialCommunityIcons
                    name="account-voice-off"
                    size={22}
                    color="#333"
                  />
                )}
              </Pressable> */}
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#Eefbff"
                onPress={() => navigation.navigate("Rentalprovidernotifi")}
              >
                <Image
                  resizeMode="contain"
                  source={require("../images/notification.png")}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 2,
                    marginRight: 14,
                    // borderColor: "#1e5966",
                    // borderWidth: 0.5,
                  }}
                />
              </TouchableHighlight>
              <Top3 />
            </View>
          ),
          headerShadowVisible: false,
          // cardStyle: { shadowColor: null },
          headerStyle: {
            backgroundColor: "#eefbff",
          },

          // headerBackImage: ({ tintColor }) => (
          //   <CustomHeaderBackImage tintColor={tintColor} />
          // ),
          // headerRight: () => <></>,
        }}
        // options={{
        //   title: "",
        //   headerShown: true,
        //   headerRight: (props) => (
        //     <View
        //       style={{
        //         flexDirection: "row",
        //         justifyContent: "flex-end",
        //         alignItems: "center",
        //         marginRight: -100,
        //       }}
        //     >
        //       <Top2 />
        //     </View>
        //   ),
        //   headerStyle: {
        //     backgroundColor: "#fff",
        //   },
        // }}
      />
      <Homestack.Screen
        name="fill"
        component={New}
        options={{ headerShown: false }}
      />
    </Homestack.Navigator>
  );
}

// function LikedScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1 }}>
//       <StatusBar style="auto" />

//       <Heart navigation={navigation} />
//     </View>
//   );
// }
// function ApplieScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1 }}>
//       <StatusBar style="auto" />

//       <Saved navigation={navigation} />
//     </View>
//   );
// }
function LikedScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Heart navigation={navigation} route={route} />
    </View>
  );
}
function ApplieScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1 }}>
      <Saved navigation={navigation} route={route} />
    </View>
  );
}
// function ChatScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Top />
//       <Messagemain />
//     </View>
//   );
// }

function Longtermfilter({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <New />
      {/* <Text>gjuhgdf</Text> */}
    </View>
  );
}

function Shorttermfilter({ route }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications</Text>
    </View>
  );
}
function FilterScreenTabs() {
  return (
    <>
      <Top />
      {/* <LinearGradient
      colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
    style={{ flex: 1, width: "100%", justifyContent: "center" }}
    > */}
      <MealsTabs.Navigator
        tabBarOptions={{
          activeTintColor: "#ffffff",
          inactiveTintColor: "#333",
          showIcon: true,
          pressColor: "#e9eef0",
          scrollEnabled: false,
          tabStyle: {
            borderRadius: 10,
            justifyContent: "center",
            alignContent: "center",
          },
          indicatorStyle: {
            backgroundColor: "#16323B",
            height: "100%",
            borderRadius: 10,
            // marginBottom: 8,
            width: "50%",
          },
          style: {
            backgroundColor: "#fff",
            marginHorizontal: 60,
            borderRadius: 10,
            height: 40,
            width: 280,
          },
          labelStyle: { fontSize: 14 },
        }}
        style={{ flex: 1, width: "100%", justifyContent: "center" }}
      >
        <MealsTabs.Screen name="Shorttime" component={Shorttermfilter} />
        <MealsTabs.Screen name="Longtime" component={Longtermfilter} />
      </MealsTabs.Navigator>
    </>
  );
}

export function Filterscreenmain() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FilterScreenTabs />
    </View>
  );
}

// for jobseeker message.......========

const MealsStack = createStackNavigator();
const MealsTabs = createMaterialTopTabNavigator();

function MealsUpcomingScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ChatScreen navigation={navigation} />
      {/* <Messagemain /> */}
    </View>
  );
}

function MealsPastScreen({ route }) {
  return (
    <View style={{ flex: 1 }}>
      <Coming />
      {/* <Notificationjobseeker /> */}
    </View>
  );
}

function MealsScreenTabs() {
  const { t, language, setlanguage } = useContext(LocalizationContext);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {/* <Top2 /> */}
      {/* <LinearGradient
      colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
    style={{ flex: 1, width: "100%", justifyContent: "center" }}
    > */}
      <MealsTabs.Navigator
        // animationEnabled={false}
        // screenOptions={{
        //   tabBarGap: 1,

        //   tabBarActiveTintColor: "#fff",
        //   tabBarInactiveTintColor: "red",
        //   tabBarPressColor: "transparent",
        //   tabBarLabelStyle: {
        //     fontSize: 14,
        //     fontWeight: "700",
        //     marginTop: -5,
        //     paddingTop: 0,
        //   },

        //   // showIcon: true,
        //   // pressColor: "#e9eef0",
        //   // tabStyle: {
        //   //   borderRadius: 10,
        //   //   justifyContent: "center",
        //   //   alignContent: "center",
        //   //   marginVertical: -10,
        //   // },
        //   tabBarIndicatorStyle: {
        //     backgroundColor: "#1F4C5B",
        //     height: "100%",
        //     borderRadius: 15,
        //     // marginBottom: 8,
        //     width: "50%",
        //   },
        //   // tabBarBounces: true,
        //   // swipeEnabled: false,
        //   tabBarStyle: {
        //     marginVertical: 10,
        //     backgroundColor: "#fff",
        //     alignContent: "center",
        //     margin: 35,
        //     borderRadius: 15,
        //     height: 40,
        //     // width: 320,
        //   },
        //   // labelStyle: { fontSize: 14 },
        // }}
        // style={{
        //   flex: 1,
        //   width: "100%",
        //   justifyContent: "center",
        //   // backgroundColor: "#eefbff",
        // }}
        animationEnabled={false}
        screenOptions={{
          tabBarActiveTintColor: "#333",
          // tabBarInactiveTintColor: "#fff",
          tabBarPressColor: "#eefbff",
          tabBarLabelStyle: {
            fontSize: 22,
            fontWeight: "500",

            // backgroundColor: "#1F4C5B",
            justifyContent: "center",
            alignItems: "center",
            // height: 30,
            // borderRadius: 20,
            // paddingTop: 7,
            // marginTop: -5,
          },

          // showIcon: true,
          // pressColor: "#e9eef0",
          tabStyle: {
            borderRadius: 10,
            justifyContent: "center",
            alignContent: "center",
            // marginVertical: -10,
          },
          // tabBarIndicatorStyle: {
          //   backgroundColor: "red",
          //   // height: "10%",
          //   borderRadius: 10,
          //   // marginBottom: 8,
          // },
          // tabBarBounces: true,
          swipeEnabled: false,
          // tabBarItemStyle: { backgroundColor: "red" },
          tabBarStyle: {
            shadowColor: "transparent",
            // marginVertical: 13,
            // marginTop: "5%",
            borderColor: "#d9d9d9",
            borderBottomWidth: 0.5,
            backgroundColor: "#eefbff",
            // alignContent: "center",
            // margin: 35,
            // marginHorizontal: "15%",
            // borderRadius: 10,
            // height: 40,
            // width: 320,
          },
          // labelStyle: { fontSize: 14 },
        }}
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          backgroundColor: "#eefbff",
        }}
      >
        <MealsTabs.Screen
          name={t("YourConversations")}
          component={MealsUpcomingScreen}
          // options={<Linear />}
        />
        {/* <MealsTabs.Screen
          name={t("Notification")}
          component={MealsPastScreen}
        /> */}
      </MealsTabs.Navigator>
    </View>
  );
}
function ChatmainScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eefbff",
      }}
    >
      <MealsScreenTabs />
    </View>
  );
}

function SwipeMealsUpcomingScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <LongtimeSwiperCard />
    </View>
  );
}

function SwipeMealsPastScreen({ route }) {
  return (
    <View style={{ flex: 1 }}>
      <ShorttimeSwiperCard />
    </View>
  );
}

function SwipeMealsScreenTabs() {
  const { t, language, setlanguage } = useContext(LocalizationContext);
  return (
    <>
      {/* <Top2 /> */}
      {/* <LinearGradient
      colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
    style={{ flex: 1, width: "100%", justifyContent: "center" }}
    > */}
      <MealsTabs.Navigator
        animationEnabled={false}
        lazy={true}
        removeClippedSubviews={true}
        screenOptions={{
          tabBarActiveTintColor: "#DAA520",
          tabBarInactiveTintColor: "#fff",
          tabBarPressColor: "#eefbff",
          // tabBarGap: 10,
          tabBarItemStyle: {
            // width: 100,
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "600",
            backgroundColor: "#1F4C5B",
            justifyContent: "center",
            alignItems: "center",
            // height: 30,
            width: 150,
            height: 40,

            borderRadius: 10,
            paddingTop: 10,
            marginTop: -5,
          },

          // showIcon: true,
          // pressColor: "#e9eef0",
          tabStyle: {
            borderRadius: 10,
            justifyContent: "center",
            alignContent: "center",
            // marginVertical: -10,
          },
          // tabBarIndicatorStyle: {
          //   backgroundColor: "transparent",
          //   height: "10%",
          //   borderRadius: 10,
          //   // marginBottom: 8,
          // },
          // tabBarBounces: true,
          swipeEnabled: false,
          // tabBarItemStyle: { backgroundColor: "red" },
          tabBarStyle: {
            shadowColor: "transparent",
            // marginVertical: 13,
            // marginTop: "5%",
            borderColor: "#d9d9d9",
            // borderBottomWidth: 0.5,
            backgroundColor: "#eefbff",
            // alignContent: "center",
            // margin: 35,
            // marginHorizontal: "15%",
            // borderRadius: 10,
            // height: 40,
            // width: 320,
          },
          // labelStyle: { fontSize: 14 },
        }}
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          backgroundColor: "#eefbff",
        }}
      >
        <MealsTabs.Screen
          name={t("Short_Term")}
          component={SwipeMealsPastScreen}
        />
        <MealsTabs.Screen
          name={t("Long_Term")}
          component={SwipeMealsUpcomingScreen}
        />
      </MealsTabs.Navigator>
    </>
  );
}
export const SwipeChatmainScreen = React.memo(({ navigation, route }) => {
  const [loading, setloading] = useState(true);
  const { state1, dispatch1 } = useContext(S_FILTER);

  React.useEffect(() => {
    fetchdata();
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
  const [short, setishort] = useState(true);
  const { t, language, setlanguage } = useContext(LocalizationContext);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyValue, setCompanyValue] = useState(null);
  const [company, setComapny] = useState([
    { label: "PUCIT", value: "pucit" },
    { label: "UCP", value: "ucp" },
    { label: "UET", value: "uet" },
  ]);
  const { handleSubmit, control } = useForm();

  const onCompanyOpen = useCallback(() => {
    // setGenderOpen(false);
  }, []);
  const handlejobTitle = () => {
    if (!(companyValue == null)) {
      const result = company.filter(checkcom);
      function checkcom(com) {
        return com.value == companyValue;
      }
      console.log(result[0].label);
      const finalJob = result[0].label;
      dispatch1({ type: "SET_JOBTITLE", payload: finalJob });
      dispatch1({ type: "Is_filter_clicked" });
      //  GETdATASEARCH(finalJob, "longtime_job", userID);
      //
      //
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#eefbff" }}>
      <View
        style={{
          height: "7%",
          width: "100%",
          marginTop: -4.5,
          marginBottom: 3,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "#eefbff",
        }}
      >
        <View
          style={{
            width: 300,
            height: 40,

            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "#fff",
            borderColor: "#d9d9d9",
            borderWidth: 0.5,
            borderRadius: 12,
          }}
        >
          <Pressable
            onPress={() => setishort(true)}
            // disabled={is_rent == "true" ? true : false}
            // android_ripple={{ color: "gray", radius: 30 }}
          >
            <LinearGradient
              colors={
                short == true
                  ? ["#16323B", "#1F4C5B", "#1E5966", "#16323B"]
                  : ["#fff", "#fff"]
              }
              style={{
                height: 38.5,
                width: 148,
                borderRadius: 12,
                // marginLeft: "1%",
                // opacity: short == false ? 0.5 : 1,
                // marginTop: 20,
                // marginBottom: 20,

                justifyContent: "center",
                alignItems: "center",
                // flexDirection: "row",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              useAngle={45}
            >
              <Text
                style={{
                  color: short == false ? "#333" : "#fff",
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                {t("Short_Term")}
                {/* {is_rent == "true" ? "Rented" : "Rent"} */}
              </Text>
            </LinearGradient>
          </Pressable>
          {/* <SwipeMealsScreenTabs /> */}
          <Pressable
            onPress={() => setishort(false)}
            // android_ripple={{ color: "gray", radius: 30 }}

            // disabled={is_rent == "true" ? true : false}
          >
            <LinearGradient
              colors={
                short == false
                  ? ["#16323B", "#1F4C5B", "#1E5966", "#16323B"]
                  : ["#fff", "#fff"]
              }
              style={{
                height: 38.5,
                width: 149,
                borderRadius: 12,
                // marginLeft: "1%",
                // opacity: short == true ? 0.5 : 1,
                // marginTop: 20,
                // marginBottom: 20,
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
                  color: short == false ? "#fff" : "#333",
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                {t("Long_Term")}
                {/* {is_rent == "true" ? "Rented" : "Rent"} */}
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
        {/* <AntDesign name="search1" size={24} color="black" />
        <Octicons name="filter" size={24} color="black" /> */}
      </View>

      {/* {short ? <ShorttimeSwiperCard /> : <LongtimeSwiperCard />} */}
      {short ? (
        <View style={{ height: "100%", width: "100%" }}>
          <Shorttermmainlist navigation={navigation} />
          <View
            style={{
              width: "11%",
              height: 90,
              marginLeft: Math.round(width) - 35,
              alignContent: "flex-end",
              alignItems: "flex-end",
              position: "relative",
              borderBottomLeftRadius: 10,
              borderTopLeftRadius: 10,
              marginTop: -300,
            }}
          >
            <LinearGradient
              colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              useAngle={45}
              style={{
                width: "100%",
                height: "100%",
                // marginLeft: "90%",
                // marginTop: Math.round(height) - 300,
                flexDirection: "column",
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("shorttimeList")}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 4,
                  }}
                >
                  <FontAwesome name="search" size={22} color="#fff" />
                  {/* <Controller
                  name="job_title"
                  defaultValue=""
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DropDownPicker
                      // style={{
                      //   borderWidth: 0.5,
                      //   paddingLeft: 20,
                      //   // margin: 5,
                      //   height: 20,
                      //   width: "98%",
                      //   borderRadius: 20,
                      //   // marginLeft: 200,
                      //   borderColor: "transparent",
                      //   backgroundColor: "red",
                      // }}
                      style={{
                        borderColor: "transparent",
                        height: 10,
                        width: 50,
                        backgroundColor: "transparent",
                      }}
                      open={companyOpen}
                      value={companyValue} //companyValue
                      items={company}
                      showArrowIcon={false}
                      setOpen={setCompanyOpen}
                      listMode="MODAL"
                      modalTitle="Select job title"
                      modalProps={{
                        animationType: "slide",
                      }}
                      modalContentContainerStyle={{
                        backgroundColor: "#fff",
                      }}
                      setValue={setCompanyValue}
                      setItems={setComapny}
                      placeholder={
                        <FontAwesome name="search" size={22} color="#fff" />
                        // <EvilIcons name="search" size={24} color="#333" />
                      }
                      placeholderStyle={{ color: "#fff", marginLeft: 3.5 }}
                      loading={loading}
                      activityIndicatorColor="#5188E3"
                      searchable={true}
                      searchPlaceholder="Search title here..."
                      onOpen={onCompanyOpen}
                      onChangeValue={handlejobTitle}
                      zIndex={1000}
                      zIndexInverse={3000}
                    />
                  )}
                /> */}
                </View>
              </TouchableOpacity>

              <View
                style={{ position: "relative", marginTop: 13, marginRight: 4 }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Shorttimefilter"), setloading(true);
                    //setIndex(0);
                    // dispatch1({ type: "HASH_VALUES" });
                  }}
                >
                  <Image
                    // resizeMode="contain"
                    source={require("../images/setting.png")}
                    style={{ width: 23, height: 23 }}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>
      ) : (
        <View style={{ height: "100%", width: "100%" }}>
          <Longtermmainlist navigation={navigation} />
          <View
            style={{
              width: "11%",
              height: 90,
              marginLeft: Math.round(width) - 35,
              alignContent: "flex-end",
              alignItems: "flex-end",
              position: "relative",
              borderBottomLeftRadius: 10,
              borderTopLeftRadius: 10,
              marginTop: -300,
            }}
          >
            <LinearGradient
              colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              useAngle={45}
              style={{
                width: "100%",
                height: "100%",
                // marginLeft: "90%",
                // marginTop: Math.round(height) - 300,
                flexDirection: "column",
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // marginTop: -15,
                  marginRight: 4,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("LongtimeList")}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 4,
                    }}
                  >
                    <FontAwesome name="search" size={22} color="#fff" />
                    {/* <Controller
                  name="job_title"
                  defaultValue=""
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DropDownPicker
                      // style={{
                      //   borderWidth: 0.5,
                      //   paddingLeft: 20,
                      //   // margin: 5,
                      //   height: 20,
                      //   width: "98%",
                      //   borderRadius: 20,
                      //   // marginLeft: 200,
                      //   borderColor: "transparent",
                      //   backgroundColor: "red",
                      // }}
                      style={{
                        borderColor: "transparent",
                        height: 10,
                        width: 50,
                        backgroundColor: "transparent",
                      }}
                      open={companyOpen}
                      value={companyValue} //companyValue
                      items={company}
                      showArrowIcon={false}
                      setOpen={setCompanyOpen}
                      listMode="MODAL"
                      modalTitle="Select job title"
                      modalProps={{
                        animationType: "slide",
                      }}
                      modalContentContainerStyle={{
                        backgroundColor: "#fff",
                      }}
                      setValue={setCompanyValue}
                      setItems={setComapny}
                      placeholder={
                        <FontAwesome name="search" size={22} color="#fff" />
                        // <EvilIcons name="search" size={24} color="#333" />
                      }
                      placeholderStyle={{ color: "#fff", marginLeft: 3.5 }}
                      loading={loading}
                      activityIndicatorColor="#5188E3"
                      searchable={true}
                      searchPlaceholder="Search title here..."
                      onOpen={onCompanyOpen}
                      onChangeValue={handlejobTitle}
                      zIndex={1000}
                      zIndexInverse={3000}
                    />
                  )}
                /> */}
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{ position: "relative", marginTop: 13, marginRight: 5 }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Longtimefilter"), setloading(true);
                    //  setIndex(0);
                    //dispatch2({ type: "RESET" });
                  }}
                  // style={{ marginRight: 40 }}
                >
                  <Image
                    // resizeMode="contain"
                    source={require("../images/setting.png")}
                    style={{ width: 23, height: 23 }}
                  />
                  {/* <MaterialIcons name="filter-list" size={22} color="#333" /> */}
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>
      )}
    </View>
  );
});

// jobposter message.....

function JobposterMealsUpcomingScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ChatScreen navigation={navigation} />
      {/* <JobposterMessagemain /> */}
    </View>
  );
}

function JobposterMealsPastScreen({ route }) {
  return (
    <View style={{ flex: 1 }}>
      <Coming />
      {/* <JobposterNotification /> */}
    </View>
  );
}

function JobMealsScreenTabs() {
  const { t, language, setlanguage } = useContext(LocalizationContext);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {/* <LinearGradient
      colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
    style={{ flex: 1, width: "100%", justifyContent: "center" }}
    > */}
      <MealsTabs.Navigator
        animationEnabled={false}
        screenOptions={{
          tabBarActiveTintColor: "#333",
          tabBarInactiveTintColor: "#fff",
          tabBarPressColor: "#eefbff",
          tabBarLabelStyle: {
            fontSize: 22,
            fontWeight: "500",
            // backgroundColor: "#1F4C5B",
            justifyContent: "center",
            alignItems: "center",

            // paddingTop: 9,
          },

          // showIcon: true,
          // pressColor: "#e9eef0",
          tabStyle: {
            borderRadius: 10,
            justifyContent: "center",
            alignContent: "center",
            // marginVertical: -10,
          },
          // tabBarIndicatorStyle: {
          //   backgroundColor: "transparent",
          //   height: "10%",
          //   borderRadius: 10,
          //   // marginBottom: 8,
          // },
          // tabBarBounces: true,
          swipeEnabled: false,
          // tabBarItemStyle: { backgroundColor: "red" },
          tabBarStyle: {
            shadowColor: "transparent",
            // marginVertical: 13,
            // marginTop: "5%",
            borderColor: "#d9d9d9",
            borderBottomWidth: 0.5,
            backgroundColor: "#eefbff",
            // alignContent: "center",
            // margin: 35,
            // marginHorizontal: "15%",
            // borderRadius: 10,
            // height: 40,
            // width: 320,
          },
          // labelStyle: { fontSize: 14 },
        }}
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          backgroundColor: "#eefbff",
        }}
      >
        <MealsTabs.Screen
          name={t("YourConversations")}
          component={JobposterMealsUpcomingScreen}
        />
        {/* <MealsTabs.Screen
          name={t("Notification")}
          component={JobposterMealsPastScreen}
        /> */}
      </MealsTabs.Navigator>
    </View>
  );
}
function Jobpostermessage() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eefbff",
      }}
    >
      <JobMealsScreenTabs />
    </View>
  );
}

// Rentalseeker message

function RentalseekerMealsUpcomingScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ChatScreen navigation={navigation} />

      {/* <Text>we are working on MESSAGES feature</Text> */}
      {/* <RentalMessagemain /> */}
    </View>
  );
}

function RentalseekrrMealsPastScreen({ route }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Coming />
      {/* <Text>we are working on MESSAGES feature</Text> */}
      {/* <Rentalnotification /> */}
    </View>
  );
}

function RentalseekerMealsScreenTabs() {
  const { t, language, setlanguage } = useContext(LocalizationContext);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {/* <LinearGradient
      colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
    style={{ flex: 1, width: "100%", justifyContent: "center" }}
    > */}
      <MealsTabs.Navigator
        animationEnabled={false}
        screenOptions={{
          tabBarActiveTintColor: "#333",
          tabBarInactiveTintColor: "#fff",
          // tabBarPressColor: "#eefbff",
          tabBarLabelStyle: {
            fontSize: 22,
            fontWeight: "500",
            // backgroundColor: "#1F4C5B",
            justifyContent: "center",
            alignItems: "center",
            // height: 30,
            // width: 250,
            // height: 40,
            // paddingTop: 9,
          },

          // showIcon: true,
          // pressColor: "#e9eef0",
          tabStyle: {
            borderRadius: 10,
            justifyContent: "center",
            alignContent: "center",
          },
          // tabBarIndicatorStyle: {
          //   backgroundColor: "transparent",
          //   height: "10%",
          //   borderRadius: 10,
          //   // marginBottom: 8,
          // },
          // tabBarBounces: true,
          swipeEnabled: false,
          // tabBarItemStyle: { backgroundColor: "red" },
          tabBarStyle: {
            shadowColor: "transparent",
            // marginVertical: 13,
            // marginTop: "5%",
            borderColor: "#d9d9d9",
            borderBottomWidth: 0.5,
            backgroundColor: "#eefbff",
            // alignContent: "center",
            // margin: 35,
            // marginHorizontal: "15%",
            // borderRadius: 10,
            // height: 40,
            // width: 320,
          },
          // labelStyle: { fontSize: 14 },
        }}
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          backgroundColor: "#eefbff",
        }}
      >
        <MealsTabs.Screen
          name={t("YourConversations")}
          component={RentalseekerMealsUpcomingScreen}
        />
        {/* <MealsTabs.Screen
          name={t("Notification")}
          component={RentalseekrrMealsPastScreen}
        /> */}
      </MealsTabs.Navigator>
    </View>
  );
}
function Rentalseekermessage() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eefbff",
      }}
    >
      {/* <Text>we are working on MESSAGES feature</Text> */}
      <RentalseekerMealsScreenTabs />
    </View>
  );
}

// rental provider message
function RentalposterMealsUpcomingScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ChatScreen navigation={navigation} />
      {/* <Text>we are working on MESSAGES feature</Text> */}
      {/* <RentalposterMessagemain /> */}
    </View>
  );
}

export function RentalposterMealsPastScreen({ route }) {
  const { t, language, setlanguage } = useContext(LocalizationContext);
  return (
    <View style={{ flex: 1, backgroundColor: "#eefbff" }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 22,
          fontWeight: "500",
          marginTop: 10,
          borderBottomColor: "#d9d9d9",
          borderBottomWidth: 0.5,
        }}
      >
        {t("Notification")}
      </Text>
      {/* <Text>we are working on MESSAGES feature</Text> */}
      <Coming />
      {/* <Rentalposternotification /> */}
    </View>
  );
}

function RentalposterMealsScreenTabs() {
  const { t, language, setlanguage } = useContext(LocalizationContext);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {/* <LinearGradient
      colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
    style={{ flex: 1, width: "100%", justifyContent: "center" }}
    > */}
      <MealsTabs.Navigator
        // animationEnabled={false}
        // screenOptions={{
        //   tabBarGap: 1,

        //   tabBarActiveTintColor: "#fff",
        //   tabBarInactiveTintColor: "#333",
        //   tabBarPressColor: "transparent",
        //   tabBarLabelStyle: {
        //     fontSize: 14,
        //     fontWeight: "700",
        //     marginTop: -5,
        //     paddingTop: 0,
        //   },

        //   // showIcon: true,
        //   // pressColor: "#e9eef0",
        //   // tabStyle: {
        //   //   borderRadius: 10,
        //   //   justifyContent: "center",
        //   //   alignContent: "center",
        //   //   marginVertical: -10,
        //   // },
        //   tabBarIndicatorStyle: {
        //     backgroundColor: "#1F4C5B",
        //     height: "100%",
        //     borderRadius: 15,
        //     // marginBottom: 8,
        //     width: "50%",
        //   },
        //   // tabBarBounces: true,
        //   // swipeEnabled: true,
        //   tabBarStyle: {
        //     marginVertical: 10,
        //     backgroundColor: "#fff",
        //     alignContent: "center",
        //     margin: 35,
        //     borderRadius: 15,
        //     height: 40,
        //     // width: 320,
        //   },
        //   // labelStyle: { fontSize: 14 },
        // }}
        // style={{
        //   flex: 1,
        //   width: "100%",
        //   justifyContent: "center",
        //   // backgroundColor: "#eefbff",
        // }}
        animationEnabled={false}
        screenOptions={{
          tabBarActiveTintColor: "#333",
          // tabBarInactiveTintColor: "#707070",
          tabBarPressColor: "#eefbff",
          tabBarLabelStyle: {
            fontSize: 22,
            fontWeight: "500",
            // backgroundColor: "#1F4C5B",
            justifyContent: "center",
            alignItems: "center",
            // height: 30,
            // height: 40,
            // paddingTop: 9,
            // marginTop: -5,
          },

          // showIcon: true,
          // pressColor: "#e9eef0",
          // tabStyle: {
          //   borderRadius: 10,
          //   justifyContent: "center",
          //   alignContent: "center",
          //   marginVertical: -10,
          // },
          tabBarIndicatorStyle: {
            backgroundColor: "transparent",
            // height: "10%",
            // borderRadius: 10,
            // marginBottom: 8,
          },
          // tabBarBounces: true,
          swipeEnabled: false,
          // tabBarItemStyle: { backgroundColor: "red" },
          tabBarStyle: {
            shadowColor: "transparent",
            // marginVertical: 13,
            // marginTop: "5%",
            borderColor: "#d9d9d9",
            borderBottomWidth: 0.5,
            backgroundColor: "#eefbff",
            // alignContent: "center",
            // margin: 35,
            // marginHorizontal: "15%",
            // borderRadius: 10,
            // height: 40,
            // width: 320,
          },
          // labelStyle: { fontSize: 14 },
        }}
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          backgroundColor: "#eefbff",
        }}
      >
        <MealsTabs.Screen
          name={t("YourConversations")}
          component={RentalposterMealsUpcomingScreen}
        />
        {/* <MealsTabs.Screen
          name={t("Notification")}
          component={RentalposterMealsPastScreen}
        /> */}
      </MealsTabs.Navigator>
    </View>
  );
}

function Basicinfo() {
  return <Userjobseekerprofile />;
}

function Educationinfo() {
  return <EduInfo />;
}
function Experienceinfo() {
  return <Workexperience />;
}
export function JobseekerProfilttopnav() {
  const { t, language, setlanguage } = useContext(LocalizationContext);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {/* <LinearGradient
      colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
    style={{ flex: 1, width: "100%", justifyContent: "center" }}
    > */}
      <MealsTabs.Navigator
        // animationEnabled={false}
        // screenOptions={{
        //   tabBarGap: 1,

        //   tabBarActiveTintColor: "#fff",
        //   tabBarInactiveTintColor: "#333",
        //   tabBarPressColor: "transparent",
        //   tabBarLabelStyle: {
        //     fontSize: 14,
        //     fontWeight: "700",
        //     marginTop: -5,
        //     paddingTop: 0,
        //   },

        //   // showIcon: true,
        //   // pressColor: "#e9eef0",
        //   // tabStyle: {
        //   //   borderRadius: 10,
        //   //   justifyContent: "center",
        //   //   alignContent: "center",
        //   //   marginVertical: -10,
        //   // },
        //   tabBarIndicatorStyle: {
        //     backgroundColor: "#1F4C5B",
        //     height: "100%",
        //     borderRadius: 15,
        //     // marginBottom: 8,
        //     width: "50%",
        //   },
        //   // tabBarBounces: true,
        //   // swipeEnabled: true,
        //   tabBarStyle: {
        //     marginVertical: 10,
        //     backgroundColor: "#fff",
        //     alignContent: "center",
        //     margin: 35,
        //     borderRadius: 15,
        //     height: 40,
        //     // width: 320,
        //   },
        //   // labelStyle: { fontSize: 14 },
        // }}
        // style={{
        //   flex: 1,
        //   width: "100%",
        //   justifyContent: "center",
        //   // backgroundColor: "#eefbff",
        // }}
        animationEnabled={false}
        screenOptions={{
          tabBarActiveTintColor: "#1E5966",
          tabBarInactiveTintColor: "#707070",
          tabBarPressColor: "#eefbff",
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: "500",
            // backgroundColor: "#1F4C5B",
            justifyContent: "center",
            alignItems: "center",
            // height: 30,
            // height: 40,
            // paddingTop: 9,
            // marginTop: -5,
          },

          // showIcon: true,
          // pressColor: "#e9eef0",
          // tabStyle: {
          //   borderRadius: 10,
          //   justifyContent: "center",
          //   alignContent: "center",
          //   marginVertical: -10,
          // },
          tabBarIndicatorStyle: {
            backgroundColor: "#1E5966",
            // height: "10%",
            // borderRadius: 10,
            // marginBottom: 8,
          },
          // tabBarBounces: true,
          swipeEnabled: false,
          // tabBarItemStyle: { backgroundColor: "red" },
          tabBarStyle: {
            shadowColor: "transparent",
            // marginVertical: 13,
            // marginTop: "5%",
            borderColor: "#d9d9d9",
            borderBottomWidth: 0.5,
            backgroundColor: "#eefbff",
            // alignContent: "center",
            // margin: 35,
            // marginHorizontal: "15%",
            // borderRadius: 10,
            // height: 40,
            // width: 320,
          },
          // labelStyle: { fontSize: 14 },
        }}
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          backgroundColor: "#eefbff",
        }}
      >
        <MealsTabs.Screen name={"Personal"} component={Basicinfo} />
        <MealsTabs.Screen name={"Education"} component={Educationinfo} />
        <MealsTabs.Screen name={"Experience"} component={Experienceinfo} />
      </MealsTabs.Navigator>
    </View>
  );
}
function Rentalpostermessage() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eefbff",
      }}
    >
      <RentalposterMealsScreenTabs />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function BottomTAb({ route }) {
  //
  //
  const [isvoice, setisvoice] = useState(true);
  const { t, language, setlanguage } = useContext(LocalizationContext);
  return (
    <>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Homes") {
              iconName = focused ? "home-sharp" : "ios-home-outline";
            } else if (route.name == "liked") {
              iconName = focused ? "heart" : "ios-heart-outline";
            } else if (route.name == "applied") {
              iconName = focused
                ? "checkmark-circle"
                : "checkmark-circle-outline";
            } else if (route.name == "messagefake") {
              iconName = focused
                ? "chatbubble-ellipses"
                : "chatbubble-ellipses-outline";
            }
            return (
              <Ionicons name={iconName} size={22} color={color} fill={"red"} />
            );
          },

          tabBarActiveTintColor: "#56909d",
          tabBarInactiveTintColor: "#56909d",
          headerShown: false,
          tabBarPosition: "bottom",
          tabBarHideOnKeyboard: true,

          tabBarLabelStyle: { paddingBottom: 10, fontWeight: "500" },
          tabBarIconStyle: { paddingBottom: -11 },
          tabBarStyle: {
            backgroundColor: "#fff",
            position: "absolute",
            borderTopWidth: 1,
            borderColor: "#333",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            shadowColor: "#333",
            shadowOffset: {
              width: 3,
              height: 6,
            },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 8,
            height: "7.5%",
          },
        })}
      >
        <Tab.Screen
          name="Homes"
          component={ModifyHome}
          options={{ title: t("Home") }}
          // initialParams={{ userID: route.params.userId }}
        />
        {/* <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{ title: "" }} */}
        {/* initialParams={{ Details: route.params.Details }} */}
        {/* /> */}
        {/* <Tab.Screen
        name="Select"
        component={SwiperCard}
        options={{ title: "" }}
        // initialParams={{ Details: route. .Details }}
      /> */}

        <Tab.Screen
          name="liked"
          component={LikedScreen}
          options={{
            headerShown: true,
            headerTintColor: "#333",
            // tabBarLabel: (props) => {
            //   <Image
            //     resizeMode="contain"
            //     source={require("../images/velailogo.png")}
            //     style={{ width: 35, height: 35 }}
            //   />;
            // }
            // tabBarLabel: "home",
            // headerTitleAlign: "center",
            headerLeft: (props) => (
              <View
                style={{ marginLeft: 14, flexDirection: "row", marginTop: -10 }}
              >
                <Image
                  resizeMode="contain"
                  source={require("../images/velailogo.png")}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            ),
            headerRight: (props) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: "5.8%",
                  // marginHorizontal: 12,
                }}
              >
                {/* <View
                    style={{
                      flexDirection: "row",
                      marginLeft: "70%",
                    }}
                  >
                    <Ionicons name="md-globe-outline" size={24} color="#333" />
                    <Pressable>
                      <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                    </Pressable>
                  </View> */}
                {/* <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: "50%",
                    // marginHorizontal: 12,
                  }}
                > */}
                {/* <Pressable
                  onPress={() => setisvoice(!isvoice)}
                  style={{ marginRight: "5%" }}
                >
                  {isvoice ? (
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          "Voice Assistant",
                          "Our new features are just around the corner."
                        );
                      }}
                    >
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    </TouchableOpacity>
                  ) : (
                    <MaterialCommunityIcons
                      name="account-voice-off"
                      size={22}
                      color="#333"
                    />
                  )}
                </Pressable> */}
                <Top2 />
                {/* </View> */}
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },
            title: t("Saves"),
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Tab.Screen
          name="applied"
          component={ApplieScreen}
          options={{
            headerShadowVisible: false,

            headerShown: true,
            headerTintColor: "#333",
            headerLeft: (props) => (
              <View
                style={{ marginLeft: 14, flexDirection: "row", marginTop: -10 }}
              >
                <Image
                  resizeMode="contain"
                  source={require("../images/velailogo.png")}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            ),
            headerRight: (props) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: "5.8%",
                  // marginHorizontal: 12,
                }}
              >
                {/* <View
                    style={{
                      flexDirection: "row",
                      marginLeft: "70%",
                    }}
                  >
                    <Ionicons name="md-globe-outline" size={24} color="#333" />
                    <Pressable>
                      <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                    </Pressable>
                  </View> */}
                {/* <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: "50%",
                    // marginHorizontal: 12,
                  }}
                > */}
                {/* <Pressable
                  onPress={() => setisvoice(!isvoice)}
                  style={{ marginRight: "5%" }}
                >
                  {isvoice ? (
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          "Voice Assistant",
                          "Our new features are just around the corner."
                        );
                      }}
                    >
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    </TouchableOpacity>
                  ) : (
                    <MaterialCommunityIcons
                      name="account-voice-off"
                      size={22}
                      color="#333"
                    />
                  )}
                </Pressable> */}
                <Top2 />
                {/* </View> */}
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },
            title: t("Applied"),
            headerTitle: "",
          }}
        />

        {/* <Tab.Screen name="chat" component={ChatScreen} options={{ title: "" }} /> */}
        <Tab.Screen
          name="messagefake"
          component={ChatmainScreen}
          options={{
            headerShown: true,
            headerTintColor: "#333",
            headerLeft: (props) => (
              <View
                style={{ marginLeft: 14, flexDirection: "row", marginTop: -10 }}
              >
                <Image
                  resizeMode="contain"
                  source={require("../images/velailogo.png")}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            ),
            headerRight: (props) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: "5.8%",
                  // marginHorizontal: 12,
                }}
              >
                {/* <View
                    style={{
                      flexDirection: "row",
                      marginLeft: "70%",
                    }}
                  >
                    <Ionicons name="md-globe-outline" size={24} color="#333" />
                    <Pressable>
                      <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                    </Pressable>
                  </View> */}
                {/* <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: "50%",
                    // marginHorizontal: 12,
                  }}
                > */}
                {/* <Pressable
                  onPress={() => setisvoice(!isvoice)}
                  style={{ marginRight: "5%" }}
                >
                  {isvoice ? (
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          "Voice Assistant",
                          "Our new features are just around the corner."
                        );
                      }}
                    >
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    </TouchableOpacity>
                  ) : (
                    <MaterialCommunityIcons
                      name="account-voice-off"
                      size={22}
                      color="#333"
                    />
                  )}
                </Pressable> */}
                <Top2 />
                {/* </View> */}
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },
            title: t("Chat"),
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        {/* <Tab.Screen
        name="filter"
        component={filterscreenmain}
        options={{ title: "message" }}
      /> */}
      </Tab.Navigator>
    </>
  );
}

function Jobapplies() {
  return (
    <View style={{ flex: 1 }}>
      <Jobposterapplied />
    </View>
  );
}

export function JobProviderBottomTAb({ route }) {
  //
  const { t, language, setlanguage } = useContext(LocalizationContext);

  return (
    <Tab.Navigator
      initialRouteName="post"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Homes") {
          } else if (route.name == "Hire") {
            iconName = focused ? "ios-people-sharp" : "ios-people-outline";
          } else if (route.name == "applied") {
            iconName = focused
              ? "ios-checkmark-circle-sharp"
              : "checkmark-circle-outline";
          } else if (route.name == "post") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name == "messagefake") {
            iconName = focused
              ? "chatbubble-ellipses"
              : "chatbubble-ellipses-outline";
          }
          // <Ionicons name="add-circle-outline" size={24} color="black" />;
          return (
            <Ionicons name={iconName} size={22} color={color} fill={"red"} />
          );
        },
        tabBarActiveTintColor: "#56909d",
        tabBarInactiveTintColor: "#56909d",

        headerShown: false,
        tabBarPosition: "bottom",
        // tabBarAllowFontScaling: 20,
        tabBarHideOnKeyboard: true,
        // tabBarActiveBackgroundColor: "red",
        tabBarLabelStyle: { paddingBottom: 10, fontWeight: "500" },
        tabBarIconStyle: { paddingBottom: -11 },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#333",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          shadowColor: "#333",
          shadowOffset: {
            width: 3,
            height: 6,
          },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 8,
          height: "7.5%",
        },
      })}
    >
      {/* <Tab.Screen
        name="Homes"
        component={ModifyHome}
        options={{ title: "Home" }}
        // initialParams={{ userID: route.params.userId }}
      /> */}
      {/* <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{ title: "" }} */}
      {/* initialParams={{ Details: route.params.Details }} */}
      {/* /> */}
      {/* <Tab.Screen
        name="Select"
        component={SwiperCard}
        options={{ title: "" }}
        // initialParams={{ Details: route.params.Details }}
      /> */}

      <Tab.Screen name="Hire" component={Hire} options={{ title: t("Hire") }} />

      <Tab.Screen
        name="post"
        component={Jobpostermain}
        options={{ title: t("Post") }}
      />
      <Tab.Screen
        name="applied"
        component={Jobapplies}
        options={{ title: t("Applied") }}
      />

      {/* <Tab.Screen name="chat" component={ChatScreen} options={{ title: "" }} /> */}
      <Tab.Screen
        name="messagefake"
        component={Jobpostermessage}
        options={{ title: t("Chat") }}
      />
      {/* <Tab.Screen
        name="filter"
        component={filterscreenmain}
        options={{ title: "message" }}
      /> */}
    </Tab.Navigator>
  );
}

export function Rentalseekerbottomtab({ route }) {
  //
  const Tab = createBottomTabNavigator();

  const { t, language, setlanguage } = useContext(LocalizationContext);
  return (
    <Tab.Navigator
      // tabBarColor="red"

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Homes") {
            iconName = focused ? "ios-home-outline" : "ios-home-outline";
          } else if (route.name == "liked") {
            iconName = focused ? "ios-heart" : "ios-heart-outline";
          } else if (route.name == "applied") {
            iconName = focused ? "ios-flash-sharp" : "ios-flash-outline";
          } else if (route.name == "post") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name == "messagefake") {
            iconName = focused
              ? "chatbubble-ellipses"
              : "chatbubble-ellipses-outline";
          }
          // <Ionicons name="add-circle-outline" size={24} color="black" />;
          return (
            <Ionicons name={iconName} size={22} color={color} fill={"red"} />
          );
        },
        tabBarActiveTintColor: "#56909d",
        tabBarInactiveTintColor: "#56909d",
        headerShown: false,
        tabBarPosition: "bottom",
        // tabBarAllowFontScaling: 20,
        tabBarHideOnKeyboard: true,
        // tabBarActiveBackgroundColor: "red",
        tabBarLabelStyle: { paddingBottom: 10, fontWeight: "500" },
        tabBarIconStyle: { paddingBottom: -11 },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#333",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          shadowColor: "#333",
          shadowOffset: {
            width: 3,
            height: 6,
          },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 8,
          height: "7.5%",
        },
      })}
    >
      {/* <Tab.Screen
        name="Homes"
        component={ModifyHome}
        options={{ title: "Home" }}
        // initialParams={{ userID: route.params.userId }}
      /> */}
      {/* <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{ title: "" }} */}
      {/* initialParams={{ Details: route.params.Details }} */}
      {/* /> */}
      {/* <Tab.Screen
        name="Select"
        component={SwiperCard}
        options={{ title: "" }}
        // initialParams={{ Details: route.params.Details }}
      /> */}
      <Tab.Screen
        name="post"
        component={Rental}
        options={{ title: t("categories") }}
      />

      <Tab.Screen
        name="liked"
        component={Rentalseeker}
        options={{ title: t("Saves") }}
      />
      {/* <Tab.Screen
        name="applied"
        component={Rentalstatus}
        options={{ title: "Status" }}
      /> */}

      {/* <Tab.Screen name="chat" component={ChatScreen} options={{ title: "" }} /> */}
      <Tab.Screen
        name="messagefake"
        component={Rentalseekermessage}
        options={{ title: t("Chat") }}
      />
      {/* <Tab.Screen
        name="filter"
        component={filterscreenmain}
        options={{ title: "message" }}
      /> */}
    </Tab.Navigator>
  );
}

export function Rentalproviderbottomtab({ route, navigation }) {
  //
  const { t, language, setlanguage } = useContext(LocalizationContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Homes") {
          } else if (route.name == "liked") {
            iconName = focused ? "ios-cube" : "ios-cube-outline";
          } else if (route.name == "history") {
            iconName = focused ? "timer" : "timer-outline";
          } else if (route.name == "post") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name == "messagefake") {
            iconName = focused
              ? "chatbubble-ellipses"
              : "chatbubble-ellipses-outline";
          }
          // <Ionicons name="add-circle-outline" size={24} color="black" />;
          return (
            <Ionicons name={iconName} size={22} color={color} fill={"red"} />
          );
        },
        tabBarActiveTintColor: "#56909d",
        tabBarInactiveTintColor: "#56909d",
        headerShown: false,
        tabBarPosition: "bottom",
        // tabBarAllowFontScaling: 20,
        tabBarHideOnKeyboard: true,
        // tabBarActiveBackgroundColor: "red",
        tabBarLabelStyle: { paddingBottom: 10, fontWeight: "500" },
        tabBarIconStyle: { paddingBottom: -11 },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#333",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          shadowColor: "#333",
          shadowOffset: {
            width: 3,
            height: 6,
          },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 8,
          height: "7.5%",
        },
      })}
    >
      {/* <Tab.Screen
        name="liked"
        component={Rentalproductdetail}
        options={{ title: "Rented" }}
      /> */}
      <Tab.Screen
        name="history"
        component={Rentalproducthistory}
        options={{ title: t("History") }}
        navigation={navigation}
      />
      <Tab.Screen
        name="post"
        component={Rentalproviderpost}
        options={{ title: t("Post") }}
      />
      {/* <Tab.Screen name="chat" component={ChatScreen} options={{ title: "" }} /> */}
      <Tab.Screen
        name="messagefake"
        component={Rentalpostermessage}
        options={{ title: t("Chat") }}
      />
      {/* <Tab.Screen
        name="filter"
        component={filterscreenmain}
        options={{ title: "message" }}
      /> */}
    </Tab.Navigator>
  );
}
