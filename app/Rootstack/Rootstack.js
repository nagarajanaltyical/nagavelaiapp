import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import ShortTermFormsedit from "../Pages/shorttermformedit";
import LongTermsuperadmin from "../Pages/Longtermsuperadmin";
import ShortTermadminForms from "../Pages/Shorttermsuperadmin";
import LongTermedit from "../Pages/Longtermedit";
import LottieViewforing from "../Lottie/LottieforApp";
import EduInfo2 from "../Pages/EducationProfile2edit";
import RentalproviderSwiperCard from "../Pages/Rental/Rentaljobprovider";
import RentalJobProvider from "../Pages/Rentaljobproviderform";
import JOBApplied from "../Pages/jobAppliedPersons";
import RentalSeeker from "../Pages/rentalseekerform";
import GovernmentjobswitheDelete from "../Pages/Rental/Govermentjobslistwithdelete";
import NomoreCards from "../nomorecards";
import LottieViewfor from "./Noconnection";
import ChatRoom from "../Pages/ChatrRoom";
import { useContext } from "react";
import { useSelector } from "react-redux";
import Mobillogin from "../Pages/MobileLogin";
import OtpScreen from "../Pages/Otpscreen";
import UserProfileEdit from "../Pages/ProfileEdit";
import JobProvidercards from "../Pages/Rental/jobproviderjobsSwipe";
import ShortTermRental from "../Pages/Rentalshort";
// import SelectRole from "../Pages/Roleslectionpage";
import UserInfo from "../Pages/USerInfo";
import UserInfoTwo from "../Pages/UserInfoEdit";
import JobposterDetails from "../Pages/jobPoster";
import MessageSelect from "../Pages/message/MessageSelect";
import Workexperience2 from "../Pages/workexperience2";
import BottomTAb, {
  Filterscreenmain,
  JobProviderBottomTAb,
  ModifyHome,
  RentalposterMealsPastScreen,
  Rentalproviderbottomtab,
  Rentalseekerbottomtab,
} from "./RootTabnav";
// import DropDownLanguage from "../components/dropdown/DropDownLanguage";
import { createStackNavigator } from "@react-navigation/stack";
import { LocalizationContext } from "../../App";
import EduInfo from "../Pages/Educationprofile";
import New from "../Pages/Filter/NEW";
import Shorttimefilter from "../Pages/Filter/ShortTimefilter/Shorttimefilter";
import Onboarding from "../components/Maincategory/Tutorialscarousel/Onboarding";
// import Profilepage from "../Pages/Mainprofile";
// import Sign from "../Pages/Longform";
// import GovJobs from "../components/Top/GovernmentForm";
import GovJobList from "../Pages/Govertjoblist";
import LanguageStack from "../Pages/LanguageStack";
import Sign from "../Pages/Longform";
import Profilepage from "../Pages/Mainprofile";
import PersonProfilepage from "../Pages/Personalprofile";
import RentalproviderbriefSwiperCard from "../Pages/Rental/Rentalpostbreif";
import RentalSwiperCard from "../Pages/Rental/Rentalswipe";
import JobseekerSwiperCard from "../Pages/Rental/jobseekerswiper";
import ShortTermForms from "../Pages/ShortTermform";
import Userprofile from "../Pages/Userprofile";
import Workexperience from "../Pages/Workexperience";
import CompanyJobProvider from "../Pages/companyjobprovider";
import Jobmainselect from "../Pages/jobprovider/Jobtermchoose";
import PersonalJobProvider from "../Pages/personalJobProvider";
import ShorttimeSwiperCard from "../Swipe/Shorttimeswipe";
import Faq from "../components/Documentation/Faq.js";
import Privacypolicy from "../components/Documentation/Privacypolicy";
import Termscondition from "../components/Documentation/Terms&condition";
import SelectCategory from "../components/Maincategory/Selectcategory";
import SelectCategoryform from "../components/Maincategory/Selectcategoryform";
import GovJobs from "../components/Top/GovernmentForm";
import Topforjobprovider from "../components/Top/Topforjobprovider";
import Mainjobpost from "../components/Top/Mainjobpost";
import Insurance from "../components/Insurance/Insurance";
import Freelance from "../components/Freelance/Freelance";
import LongtimeSwiperCard from "../Swipe/Longtimeswipe";
const Stack = createStackNavigator();

function CustomHeaderBackImage({ navigation }) {
  return (
    <View
      style={{
        width: "32%",
        // backgroundColor: "red",
        flexDirection: "row",
        // backgroundColor: "red",
        alignItems: "center",
        paddingLeft: "5%",
        // marginLeft: "10%",
      }}
    >
      <Image
        resizeMode="contain"
        style={{ height: 24, width: 22 }}
        source={require("../images/home.png")}
      />
    </View>
  );
}
function Root({ navigation }) {
  // const navigation = useNavigation();
  const state = useSelector((state) => state);

  const userlogin = useSelector((state) => state.IS_user_login);
  const personal_job_provider = useSelector(
    (state) => state.job_provider_personal_user_details
  );
  const company_job_provider = useSelector(
    (state) => state.job_Provider_company_user_details
  );

  const { language, t, setlanguage } = useContext(LocalizationContext);

  const MyTheme = {
    dark: false,
    colors: {
      border: "#f2f2f2",
    },
  };
  const [isvoice, setisvoice] = useState(true);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        {userlogin ? (
          <Stack.Screen
            name="botnav"
            component={BottomTAb}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Mobillogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OTP"
              component={LottieViewforing}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="onboard"
              component={Onboarding}
              options={{ headerShown: false }}
            ></Stack.Screen>
          </>
        )}
        <Stack.Screen
          name="short"
          component={ShortTermForms}
          options={{
            headerTintColor: "#333",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitle: (props) => (
              <View>
                <Text
                  style={{ fontSize: 20, fontWeight: "500", color: "#333" }}
                >
                  {t("Short_Term_Form")}
                </Text>
              </View>
            ),
            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },
            title: "",
          }}
        />
        {!personal_job_provider ? (
          <Stack.Screen
            name="p_job_provider"
            component={PersonalJobProvider}
            options={{
              headerTintColor: "#333",
              headerShadowVisible: false,

              headerRight: (props) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                      marginHorizontal: 12,
                    }}
                  >
                    <Pressable onPress={() => setisvoice(!isvoice)}>
                      {isvoice ? (
                        <MaterialCommunityIcons
                          name="account-voice"
                          size={22}
                          color="#333"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="account-voice-off"
                          size={22}
                          color="#333"
                        />
                      )}
                    </Pressable>
                  </View> */}
                </View>
              ),
              headerStyle: {
                backgroundColor: "#eefbff",
              },
              title: "",
            }}
          />
        ) : (
          <></>
        )}
        {!company_job_provider ? (
          <Stack.Screen
            name="c_job_provider"
            component={CompanyJobProvider}
            options={{
              headerTintColor: "#333",
              headerShadowVisible: false,

              headerRight: (props) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 12,
                    }}
                  >
                    {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                      {isvoice ? (
                        <MaterialCommunityIcons
                          name="account-voice"
                          size={22}
                          color="#333"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="account-voice-off"
                          size={22}
                          color="#333"
                        />
                      )}
                    </Pressable> */}
                  </View>
                </View>
              ),
              headerStyle: {
                backgroundColor: "#eefbff",
              },
              title: "",
            }}
          />
        ) : (
          <></>
        )}
        <Stack.Screen
          name="languagedropee"
          component={LanguageStack}
          options={{
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#EEFBFF",
            },
            title: "",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="jobseekerswipe"
          component={JobseekerSwiperCard}
          options={{
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#fff",
            },
            title: "",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="shorttimeswipe"
          component={ShorttimeSwiperCard}
          options={{
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                      {isvoice ? (
                        <MaterialCommunityIcons
                          name="account-voice"
                          size={22}
                          color="#333"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="account-voice-off"
                          size={22}
                          color="#333"
                        />
                      )}
                    </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },
            title: "",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="longtimeswipe"
          component={LongtimeSwiperCard}
          options={{
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                      {isvoice ? (
                        <MaterialCommunityIcons
                          name="account-voice"
                          size={22}
                          color="#333"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="account-voice-off"
                          size={22}
                          color="#333"
                        />
                      )}
                    </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },
            title: "",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="shortTermadminforms"
          component={ShortTermadminForms}
          options={{ headerShown: true }}
        ></Stack.Screen>
        <Stack.Screen
          name="Mainjob"
          component={Mainjobpost}
          options={{ headerShown: true }}
        ></Stack.Screen>
        <Stack.Screen
          name="Long"
          component={Sign}
          options={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerTitle: (props) => (
              <View>
                <Text
                  style={{ fontSize: 20, fontWeight: "500", color: "#333" }}
                >
                  {t("Long_Term_Form")}
                </Text>
              </View>
            ),
            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),

            headerStyle: {
              backgroundColor: "#eefbff",
            },
            title: "",
          }}
        />
        <Stack.Screen
          name="Rent"
          component={ShortTermRental}
          options={{
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitle: (props) => (
              <View>
                <Text
                  style={{ fontSize: 17, fontWeight: "500", color: "#333" }}
                >
                  {t("Product_Details_Form")}
                </Text>
              </View>
            ),
            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },
            title: "",
          }}
        />
        <Stack.Screen
          name="short_Edit"
          component={ShortTermFormsedit}
          options={{
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitle: (props) => (
              <View>
                <Text
                  style={{ fontSize: 20, fontWeight: "500", color: "#333" }}
                >
                  Edit Short Term Form
                </Text>
              </View>
            ),
            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },
            title: "",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Long_edit"
          component={LongTermedit}
          options={{
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitle: (props) => (
              <View>
                <Text
                  style={{ fontSize: 20, fontWeight: "500", color: "#333" }}
                >
                  Edit Long Term Form
                </Text>
              </View>
            ),
            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },
            title: "",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="jobprovidebottamtab"
          component={JobProviderBottomTAb}
          options={{
            title: "",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  // backgroundColor: "red",
                  marginRight: "5%",
                }}
              >
                {/* <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                {/* <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Pressable onPress={() => setisvoice(!isvoice)}>
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
                  </Pressable>
                </View> */}
                {/* <Ionicons name="md-globe-outline" size={22} color="#333" /> */}

                <Topforjobprovider />
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },

            headerBackImage: ({ tintColor }) => (
              <CustomHeaderBackImage tintColor={tintColor} />
            ),
            // headerRight: () => <></>,
          }}
          // headerMode="screen"
          // options={{
          //   headerShown: true,
          // headerBackImage: () => {
          //   <Feather name="home" size={24} color="black" />;
          // },
          // // headerStyle: { backgroundColor: "#000000", height: RFValue(102) },
          // // headerTintStyle: { fontWeight: "bold" },
          // // headerTitleStyle: {
          // //   marginLeft: RFValue(72),
          // //   fontFamily: "Aldrich-Regular",
          // //   color: "white",
          // // },
          // }}
        ></Stack.Screen>
        <Stack.Screen
          name="rentalseekerbottamtab"
          component={Rentalseekerbottomtab}
          options={{
            title: "",
            headerShadowVisible: false,

            headerRight: (props) => (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    // backgroundColor: "red",
                    marginRight: "5%",
                  }}
                >
                  {/* <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 12,
                    }}
                  >
                    <Pressable onPress={() => setisvoice(!isvoice)}>
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
                    </Pressable>
                  </View> */}

                  {/* <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}

                  <Topforjobprovider />
                </View>
              </>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },

            headerBackImage: ({ tintColor }) => (
              <CustomHeaderBackImage tintColor={tintColor} />
            ),
            // headerRight: () => <></>,
          }}
        />
        <Stack.Screen
          name="rentalproviderbottamtab"
          component={Rentalproviderbottomtab}
          options={{
            title: "",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // marginLeft: "42%",
                  marginRight: "5%",
                }}
              >
                {/* <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                {/* <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                    marginRight: 8,
                  }}
                >
                  <Pressable onPress={() => setisvoice(!isvoice)}>
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
                  </Pressable>
                </View> */}

                <Topforjobprovider />
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },

            headerBackImage: ({ tintColor }) => (
              <CustomHeaderBackImage tintColor={tintColor} />
            ),
            // headerRight: () => <></>,
          }}
        />
        {!state.Rental_provider_user_details ? (
          <Stack.Screen
            name="providerform"
            component={RentalJobProvider}
            options={{
              title: "",
              headerShadowVisible: false,

              headerRight: (props) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* <View
                    style={{
                      flexDirection: "row",
                      marginLeft: "70%",
                    }}
                  >
                    <Ionicons name="md-globe-outline" size={22} color="#333" />
                    <Pressable>
                      <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                    </Pressable>
                  </View> */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 12,
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      source={require("../images/velailogo.png")}
                      style={{ width: 35, height: 35 }}
                    />
                    {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                      {isvoice ? (
                        <MaterialCommunityIcons
                          name="account-voice"
                          size={22}
                          color="#333"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="account-voice-off"
                          size={22}
                          color="black"
                        />
                      )}
                    </Pressable> */}
                  </View>
                </View>
              ),
              headerStyle: {
                backgroundColor: "#eefbff",
              },
            }}
          ></Stack.Screen>
        ) : (
          <></>
        )}
        {/* <Stack.Screen
          name="category"
          component={Maincategory}
          options={{ headerShown: false }}
        ></Stack.Screen> */}
        <Stack.Screen
          name="rentalproviderswipe"
          component={RentalproviderSwiperCard}
          options={{
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#Eefbff",
            },
            title: "",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="rentalproviderbriefswipe"
          component={RentalproviderbriefSwiperCard}
          options={{
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#Eefbff",
            },
            title: "",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="JobPRocards"
          component={JobProvidercards}
          options={{
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#Eefbff",
            },
            title: "",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="SelectCategory"
          component={SelectCategory}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="LongTermsuperadmin"
          component={LongTermsuperadmin}
          options={{ headerShown: true }}
        ></Stack.Screen>
        <Stack.Screen
          name="Dletejob"
          component={GovernmentjobswitheDelete}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="chatRoom"
          component={ChatRoom}
          options={{
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#EEFBFF",
            },
            title: "",
          }}
        />
        <Stack.Screen
          name="Goveee"
          component={GovJobs}
          options={{
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#EEFBFF",
            },
            title: "",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="JobGov"
          component={GovJobList}
          options={{
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#EEFBFF",
            },
            title: "",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="nomoreCards"
          component={NomoreCards}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="SelectCategoryform"
          component={SelectCategoryform}
          options={{ headerShown: true }}
        ></Stack.Screen>
        <Stack.Screen
          name="noconnection"
          component={LottieViewfor}
          options={{ headerShown: false }}
        ></Stack.Screen>
        {!company_job_provider && !personal_job_provider ? (
          <Stack.Screen
            name="Jobmainselect"
            component={Jobmainselect}
            options={{
              title: "",
              headerShadowVisible: false,

              headerRight: (props) => (
                <View
                  style={{
                    flexDirection: "row",
                    // marginLeft: "45%",
                    alignItems: "center",
                    // backgroundColor: "red",
                  }}
                >
                  {/* <View
                    style={{
                      flexDirection: "row",
                      marginLeft: "15%",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="md-globe-outline" size={22} color="#333" />
                    <Pressable>
                      <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                    </Pressable>
                  </View> */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 12,
                    }}
                  >
                    {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                      {isvoice ? (
                        <MaterialCommunityIcons
                          name="account-voice"
                          size={22}
                          color="#333"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="account-voice-off"
                          size={22}
                          color="#333"
                        />
                      )}
                    </Pressable> */}
                  </View>
                </View>
              ),
              headerStyle: {
                backgroundColor: "#fff",
              },
              headerBackImage: ({ tintColor }) => (
                <CustomHeaderBackImage tintColor={tintColor} />
              ),
            }}
          />
        ) : (
          <></>
        )}
        <Stack.Screen
          name="rentalSeeker"
          component={RentalSeeker}
          options={{
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#Eefbff",
            },
            title: "",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Faq"
          component={Faq}
          options={{
            title: "",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#fff",
            },
          }}
        />

        <Stack.Screen
          name="Termscondition"
          component={Termscondition}
          options={{
            title: "",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#fff",
            },
          }}
        />
        <Stack.Screen
          name="Privacypolicy"
          component={Privacypolicy}
          options={{
            title: "",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#fff",
            },
          }}
        />
        <Stack.Screen
          name="mainprofile"
          component={Profilepage}
          options={{
            title: "Profile",
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#EEFBFF",
            },
          }}
        />
        {/* <Stack.Screen
          name="Linear"
          component={Linear}
          options={{ headerShown: true }}
        /> */}
        <Stack.Screen
          name="personalprofile"
          component={PersonProfilepage}
          options={{
            title: "",
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#EEFBFF",
            },
          }}
        />
        {/* <Stack.Screen
          name="role"
          component={SelectRole}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name="Moblog"
          component={Mobillogin}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="editinfo"
          component={UserInfoTwo}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="post"
          component={SwiperCard}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="JobProvider"
          component={JobposterDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Shorttimefilter"
          component={Shorttimefilter}
          options={{
            headerTintColor: "#333",
            title: "",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: "3%",
                }}
              >
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                    marginRight: "2%",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#fff",
            },
          }}
        />
        <Stack.Screen
          name="Longtimefilter"
          component={New}
          options={{
            title: "",

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
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
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#fff",
            },
          }}
        />
        <Stack.Screen
          name="MessageSelect"
          component={MessageSelect}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileEdit"
          component={UserProfileEdit}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Userprofile"
          component={Userprofile}
          options={{
            title: "",
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "60%",
                    alignItems: "center",
                  }}
                >
                <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // marginHorizontal: 12,
                    marginRight: "7%",
                  }}
                >
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },
          }}
        />
        <Stack.Screen
          name="Rentalprovidernotifi"
          component={RentalposterMealsPastScreen}
          options={{
            title: "",
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "60%",
                    alignItems: "center",
                  }}
                >
                <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // marginHorizontal: 12,
                    marginRight: "7%",
                  }}
                >
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
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
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },
          }}
        />
        <Stack.Screen
          name="Freelance"
          component={Freelance}
          options={{
            title: "",
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "60%",
                    alignItems: "center",
                  }}
                >
                <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // marginHorizontal: 12,
                    marginRight: "7%",
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
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
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },
          }}
        />
        <Stack.Screen
          name="Insurance"
          component={Insurance}
          options={{
            title: "",
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "60%",
                    alignItems: "center",
                  }}
                >
                <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // marginHorizontal: 12,
                    marginRight: "7%",
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
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
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },
          }}
        />
        <Stack.Screen
          name="filter"
          component={Filterscreenmain}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Homex"
          component={ModifyHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="JobApppliedPersons"
          component={JOBApplied}
          options={{
            title: "",
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },
          }}
        />
        <Stack.Screen
          name="eduexp"
          component={EduInfo}
          options={{
            title: "",
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },
          }}
        />
        {/* 
        <Stack.Screen
          name="eduexp"
          component={EduInfo}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="workexp"
          component={Workexperience}
          options={{
            title: "",
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="black"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#eefbff",
            },
          }}
        />
        <Stack.Screen
          name="workexp2"
          component={Workexperience2}
          options={{
            title: "",
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#Eefbff",
            },
          }}
        />
        <Stack.Screen
          name="register"
          component={UserInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="rentalswipe"
          component={RentalSwiperCard}
          options={{
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#Eefbff",
            },
            title: "",
          }}
        />
        <Stack.Screen
          name="eduexp2"
          component={EduInfo2}
          options={{
            headerTintColor: "#333",
            headerShadowVisible: false,

            headerRight: (props) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    marginLeft: "70%",
                  }}
                >
                  <Ionicons name="md-globe-outline" size={22} color="#333" />
                  <Pressable>
                    <Text style={{ Text: 18, color: "#333" }}>EN</Text>
                  </Pressable>
                </View> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 12,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../images/velailogo.png")}
                    style={{ width: 35, height: 35 }}
                  />
                  {/* <Pressable onPress={() => setisvoice(!isvoice)}>
                    {isvoice ? (
                      <MaterialCommunityIcons
                        name="account-voice"
                        size={22}
                        color="#333"
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="account-voice-off"
                        size={22}
                        color="#333"
                      />
                    )}
                  </Pressable> */}
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#Eefbff",
            },
            title: "",
          }}
        />
        <Stack.Screen
          name="Otpscreen"
          component={OtpScreen}
          options={{
            headerShadowVisible: false,

            headerStyle: {
              backgroundColor: "#F2F2F2",
            },
            headerRight: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="globe-outline" size={22} color="#333" />
                {/* <DropDownLanguage /> */}
              </View>
            ),
            title: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Root;
