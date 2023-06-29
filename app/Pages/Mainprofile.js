import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  Pressable,
  ActivityIndicator,
  TouchableHighlight,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";

// import * as MailComposer from "expo-mail-composer";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../App";
import { useContext } from "react";
import { LocalizationContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import LottieViewloadingmodal from "../components/Loadinmodal";
import LottieViewloading from "../components/Loading";
export default function Profilepage({ navigation, route }) {
  const { t, language, setlanguage } = useContext(LocalizationContext);
  const is_details_given = useSelector((state) => state.user_details_given);
  // const user_type = useSelector((state) => state.job_seeker_info);
  const userID = useSelector((state) => state.ID);
  const [profileupdated, setprofileupdated] = useState(false);

  const states = useSelector((state) => state);
  delete states["_persist"];
  const dispatch2 = useDispatch();

  const handleUpdate1 = (paras) => {
    for (let i = 0; i < Object.keys(paras).length; i++) {
      if (
        !(Object.keys(paras)[i] == "user_details_given") &&
        !(Object.keys(paras)[i] == "IS_user_login") &&
        !(Object.keys(paras)[i] == "ID") &&
        Object.values(paras)[i]
      ) {
        return Object.keys(paras)[i];
      }
    }
  };
  const userType = handleUpdate1(states);
  //

  //set profile
  const [profilemodal, setprofilemodal] = useState(false);
  const [profileActivityIndicators, setprofileActivityIndicators] =
    useState(false);
  const [profile, setprofile] = useState(null);
  const [profilepic, setprofilepic] = useState("");
  // to addd the

  //add image to backend
  const addprofile = async (paras1) => {
    const body = {};
    body.userType = !states.job_seeker_info
      ? !states.job_provider_info
        ? !states.rental_provider_info
          ? "rental_seeker_info"
          : "rental_provider_info"
        : "job_provider_info"
      : "job_seeker_info";
    body.user_id = userID;
    body.profilepic = paras1;

    try {
      await fetch(`http://103.174.10.108:5002/api/prfilepic_update`, {
        method: "PUT",
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {
          getdataofuser();
        });
    } catch (error) {}
  };

  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [status1, requestPermission1] = MediaLibrary.usePermissions();
  if (status1 === null) {
    requestPermission1();
  }
  console.log(status);
  const [image, setImage] = useState(null);
  //to get the image
  async function takeAndUploadPhotoAsync1(paras) {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    // let result =
    //   paras === "files"
    //     ? await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //       })
    //     : await ImagePicker.launchCameraAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //       });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    result;
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    console.log(result);
    if (!result.canceled) {
      setprofileActivityIndicators(true);

      let localUri = result.assets[0]["uri"];

      setprofile(localUri);
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
            `http://103.174.10.108:5002/api/job_post/aws_upload/${userID}`, //this IP address need to change and check
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
              setprofilepic(result["updated"]);
              addprofile(result["updated"]);
              getdataofuser();
              setprofileupdated(true);
              setprofileActivityIndicators(false);
              setprofilemodal(false);
            });
        } catch (error) {
          console.log(error);
        }
      }
      submitdata();
    } else {
      setprofileActivityIndicators(false);
      setprofilemodal(false);
    }
  }

  const { state, dispatch } = useContext(AuthContext);
  const [data, setdata] = useState({});
  const [loading, setloading] = useState(true);

  //
  //
  useEffect(() => {
    getdataofuser();
  }, []);

  const handleLogout = () => {
    dispatch2({ type: "Restart" });
    setTimeout(() => navigation.navigate("Home"), 2000);
  };

  //handleSUpport

  function composeEmail1() {
    MailComposer.composeAsync({
      recipients: ["help@velaiapp.com"],
    });
  }
  function composeEmail2() {
    MailComposer.composeAsync({
      recipients: ["sales@velaiapp.com"],
    });
  }
  const getdataofuser = async () => {
    const body = {};

    body.user_id = userID;
    body.userType = !states.job_seeker_info
      ? !states.job_provider_info
        ? !states.rental_provider_info
          ? "rental_seeker_info"
          : "rental_provider_info"
        : "job_provider_info"
      : "job_seeker_info";
    try {
      await fetch(`http://103.174.10.108:5002/api/profile_details_show`, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result["profile_info"].length > 0) {
            setdata(result["profile_info"]);
            setloading(false);
          } else {
            setloading(false);
          }
        });
    } catch (error) {}
  };
  const handleUpdate = (paras) => {
    navigation.navigate("personalprofile", {
      userType: userType,
      user_id: 4,
    });
  };
  if (loading) {
    return <LottieViewloading />;
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        style={{
          // backgroundColor: "red",
          flexDirection: "row",
          marginTop: "4%",
          marginHorizontal: 20,
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginTop: 5,

            // flexGrow: 0.11,
            // alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => setprofilemodal(true)}>
            {data[0].profilepic == "" && profile == null ? (
              <>
                <FontAwesome name="user-circle" size={80} color="#1e5966" />
                <MaterialCommunityIcons
                  name="pencil-circle"
                  size={33}
                  color="#1E5966"
                  style={{ position: "relative", bottom: 22, left: 48 }}
                />
              </>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                {profileupdated ? (
                  <Image
                    source={{
                      uri: profile,
                    }}
                    style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
                  />
                ) : (
                  <Image
                    source={{
                      uri:
                        data[0].profilepic == "" ? profile : data[0].profilepic,
                    }}
                    style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
                  />
                )}
                <MaterialCommunityIcons
                  name="pencil-circle"
                  size={33}
                  color="#1E5966"
                  style={{ position: "relative", left: 32, marginTop: -22 }}
                />
              </View>
            )}
          </TouchableOpacity>
          <Modal
            animationType="slide"
            //animationInTiming = {13900}
            transparent={true}
            visible={profilemodal}
            animationOut="slide"
            swipeDirection="down"
            onRequestClose={() => {
              setprofilemodal(!profilemodal);
              setprofileActivityIndicators(false);
            }}
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
                {profileActivityIndicators ? (
                  <View>
                    <LottieViewloadingmodal />
                    {/* <Text>Loading. please wait</Text>
                    <ActivityIndicator size="large" /> */}
                  </View>
                ) : (
                  <>
                    {/* <TouchableHighlight
                      style={{
                        ...styles.openButton,
                        width: 150,
                        backgroundColor: "#1E5966",
                      }}
                      onPress={() => {
                        requestPermission();
                        takeAndUploadPhotoAsync1("camera");
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <AntDesign name="camera" size={24} color="white" />
                        <Text
                          style={{
                            color: "#fff",
                            fontWeight: "500",
                            marginRight: "6%",
                          }}
                        >
                          {t("pic")}
                          Take Pic
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
                        requestPermission1(), takeAndUploadPhotoAsync1("files")
                      )}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <FontAwesome name="files-o" size={24} color="white" />
                        <Text
                          style={{
                            color: "#fff",
                            fontWeight: "500",
                            marginRight: "6%",
                          }}
                        >
                          {/* {t("fi")} */}
                          Upload Pic
                        </Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableOpacity
                      style={{ marginTop: 50 }}
                      onPress={() => setprofilemodal(!profilemodal)}
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
        </View>
        <View style={{ marginLeft: 20, marginTop: "-6%", width: "67%" }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 18,
                color: "#333",
                marginBottom: 10,
                // lineHeight: 20,
                // textAlign: "left",
                textTransform: "capitalize",
                // fontSize: 15,
                fontWeight: "500",
              }}
            >
              {data[0].username ? data[0].username : "Your name"}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 15, color: "#333", fontWeight: "400" }}>
              {data[0].number.replace(/^(\+91)(\d{10})$/, "$1 $2")}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ marginHorizontal: 20 }}>
        {/* {states.job_seeker_info && !is_details_given ? (
          <View
            style={{
              height: 130,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              borderColor: "#D9D9D9",
              borderBottomWidth: 1,
            }}
          >
            <View style={{ marginBottom: 10 }}>
              <Text>Need to Add Your Details</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Userprofile")}
                // style={{
                //   backgroundColor: "green",
                //   padding: 10,
                //   borderRadius: 10,
                // }}
              >
                <LinearGradient
                  colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
                  style={{
                    height: 49,
                    width: 290,
                    justifyContent: "center",
                    alignItems: "center",
                    // marginHorizontal: 50,
                    borderRadius: 10,
                    // opacity: mobilenumber.length > 1 && !istick ? 1 : 0.5,
                    // marginTop: 30,
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  useAngle={45}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                  >
                    Add Personal Details
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <></>
        )} */}
        <View
          style={{
            height: 60,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "flex-start",
            // paddingLeft: 30,
            borderColor: "#acacac",
            borderTopWidth: 1,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              handleUpdate(state);
            }}
          >
            <View
              style={{
                // marginBottom: 10,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Feather name="edit" size={22} color="#56909d" />
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Update Profile
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 60,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "flex-start",
            // paddingLeft: 30,
            borderColor: "#acacac",
            // borderBottomWidth: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Privacypolicy");
            }}
          >
            <View
              style={{
                // marginBottom: 10,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <MaterialIcons name="security" size={22} color="#56909d" />
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Privacy Policies
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 60,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "flex-start",
            // paddingLeft: 30,
            borderColor: "#acacac",
            // borderBottomWidth: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Termscondition");
            }}
          >
            <View
              style={{
                // marginBottom: 10,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Ionicons
                name="ios-information-circle-outline"
                size={22}
                color="#56909d"
              />
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Terms and Conditions
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 60,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "flex-start",
            // paddingLeft: 30,
            borderColor: "#acacac",
            // borderBottomWidth: 1,
          }}
        >
          <TouchableOpacity onPress={() => composeEmail1()}>
            <View
              style={{
                // marginBottom: 10,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <AntDesign name="customerservice" size={22} color="#56909d" />

              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Help
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 60,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "flex-start",
            // paddingLeft: 30,
            borderColor: "#acacac",
            // borderBottomWidth: 1,
          }}
        >
          <TouchableOpacity onPress={() => composeEmail2()}>
            <View
              style={{
                // marginBottom: 10,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <FontAwesome5 name="handshake" size={20} color="#56909d" />
              <Text
                style={{
                  marginLeft: 19,
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Sales
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 60,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "flex-start",
            // paddingLeft: 30,
            borderColor: "#acacac",
            // borderBottomWidth: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Faq");
            }}
          >
            <View
              style={{
                // marginBottom: 10,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <SimpleLineIcons name="question" size={22} color="#56909d" />
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                FAQ
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            height: 60,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "flex-start",
            // paddingLeft: 30,
            borderColor: "#acacac",
            // borderBottomWidth: 1,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View
              style={{
                // marginBottom: 10,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Octicons name="arrow-switch" size={22} color="#333" />
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Switch Account
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}
        {/* <View
          style={{
            height: 60,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "flex-start",
            // paddingLeft: 30,
            // borderColor: "#D9D9D9",
            // borderBottomWidth: 1,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View
              style={{
                // marginBottom: 10,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Ionicons name="person-add-outline" size={22} color="#333" />
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Add Account
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            height: 60,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "flex-start",
            // paddingLeft: 30,
            borderColor: "#D9D9D9",
            // borderBottomWidth: 1,
          }}
        >
          {/* <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            // onPress={() => handleLogout()}
          >
            <View
              style={{
                // marginBottom: 10,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <SimpleLineIcons name="logout" size={22} color="#333" />
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Log out
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  title: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  top2: {
    // flexGrow: 0.6,
    height: "100%",
    marginRight: 130,
    justifyContent: "center",
    // marginBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#eefbff",
  },
  edutext: {
    fontSize: 17,
    fontWeight: "400",
    paddingLeft: 5,
    color: "#1E5966",
    paddingTop: 8,
  },
  titlestyle: {
    fontWeight: "500",
    fontSize: 22,
  },
  iconstotal: {
    alignItems: "center",
    alignContent: "center",
    // paddingTop: 20,
    justifyContent: "center",
    height: 200,
    flexDirection: "row",
  },
  education: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "center",
    alignItems: "flex-end",
    marginVertical: 10,
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
    borderColor: "#707070",
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
  input: {
    borderRadius: 10,
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#707070",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    width: "90%",
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: "center",
  },
  inputs: {
    height: 40,
    margin: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
