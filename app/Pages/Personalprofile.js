import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  RefreshControl,
  Linking,
  LogBox,
  FlatList,
} from "react-native";
import React from "react";
import { useContext } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useIsFocused } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";

import { useCallback } from "react";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
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
import { AuthContext, LocalizationContext } from "../../App";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import LottieViewloadingmodal from "../components/Loadinmodal";
import LottieViewloading from "../components/Loading";

//const data of the Education details/workexperience details
const dummyArray = [{ id: 1, value: "ADD Your Deatils Here" }];

export default function PersonProfilepage({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const [ActivityIndicators, setActivityIndicators] = useState(false);
  //setprofile
  const [profilemodal, setprofilemodal] = useState(false);
  const [profileActivityIndicators, setprofileActivityIndicators] =
    useState(false);
  const [profile, setprofile] = useState(null);
  const [profilepic, setprofilepic] = useState("");
  const [profileupdated, setprofileupdated] = useState(false);
  // for comapny name
  const [companymodalVisible, setcompanymodalVisible] = useState(false);
  const [companyname, setcompanyname] = useState("");
  //for mailID
  const [emailmodalVisible, setemailmodalVisible] = useState(false);
  const [email, setemail] = useState("");
  //for username
  const [usernamemodal, setusernamemodal] = useState(false);
  const [username, setusername] = useState("");
  //for designation
  const [designationmodalVisible, setdesignationmodalVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  //
  const [designation, setdesignation] = useState("");
  const { t, language, setlanguage } = useContext(LocalizationContext);
  const { state, dispatch } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  console.log();
  const userID = useSelector((state) => state.ID);
  const [data, setdata] = useState({});
  console.log(route.params);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      // callback
      getdataofuser();
      getexperienceataofuser();
      getedudataofuser();
      // submitdata();
      // LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    }
  }, [isFocused]);

  useEffect(() => {
    getdataofuser();
    getexperienceataofuser();
    getedudataofuser();
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getdataofuser();
    getexperienceataofuser();
    getedudataofuser();
    setRefreshing(false);
  }, []);
  //getData
  const [eduexp, seteduexp] = useState(dummyArray);
  const [workexp, setworkexp] = useState(dummyArray);
  const [loading, setloading] = useState(true);
  //data
  const [resume, setresume] = useState("");
  const [fileResponse, setfileResponse] = useState(null);
  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });
      console.log(response);
      setfileResponse(response);
      console.log(response);
      // setActivityIndicators(true);
      console.log("result is " + response);
      // console.log(result);
      let localUri = response.uri;

      let filename = localUri.split("/").pop();
      console.log(filename);
      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      console.log(type);
      var formdata = new FormData();
      formdata.append("file", { uri: localUri, name: filename, type });
      // Upload the image using the fetch and FormData APIs
      let FFormData = new FormData();
      // Assume "photo" is the name of the form field the server expects
      FFormData.append("photo", { uri: localUri, name: filename, type });
      async function submitdata() {
        try {
          console.log("im inside");
          await fetch(
            `http://103.174.10.108:5002/api/file/aws_upload/${userID}`,
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
              console.log(result);
              setresume(result["updated"]);
              // setjobpostpic(result["updated"]);
              // setActivityIndicators(false);
              // setModalVisible(false);
            });
        } catch (error) {
          console.log(error);
        }
      }
      submitdata();
    } catch (err) {
      console.warn(err);
    }
  }, []);
  const handleSubmit = async (data) => {
    data.userType = !states.job_seeker_info
      ? !states.job_provider_info
        ? !states.rental_provider_info
          ? "rental_seeker_info"
          : "rental_provider_info"
        : "job_provider_info"
      : "job_seeker_info";
    console.log(data.companyname);
    if (data.userType == "job_provider_info" && data.companyname == null) {
      delete data.companyname;
    }
    console.log(data);
    try {
      await fetch(
        `http://103.174.10.108:5002/api/user_details_update/${userID}`,
        {
          method: "PUT",
          mode: "cors", // no-cors, *cors, same-origin
          // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          // credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setdata(result["profile_info"]);
          navigation.goBack();
        });
    } catch (error) {
      console.log(error);
    }
  };
  const states = useSelector((state) => state);
  delete states["_persist"];
  console.log("im at the states");
  console.log(states);
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
    console.log(body);
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
          console.log(result);
          setdata(result["profile_info"]);
          setloading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  //education info
  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#C8C8C8" }}
      />
    );
  };
  const getedudataofuser = async () => {
    // const body = {};
    // body.user_id = userID;
    // body.userType = userType;
    // console.log(body);
    try {
      await fetch(`http://103.174.10.108:5002/api/education/${userID}`, {
        method: "GET",
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          seteduexp(result["education"]);
        });
    } catch (error) {
      console.log(error);
    }
  };
  //edu info flatlist
  const eduinfodetails = ({ item }) => {
    const fromdate_string = item.start;
    const year1 = new Date(fromdate_string).getFullYear();
    const to_string = item.end;
    const year2 = new Date(to_string).getFullYear();
    return (
      <View
        style={{
          // height: "100%",
          // backgroundColor: "red",
          // padding: 10,
          marginBottom: 20,
          marginVertical: 10,
          flexDirection: "row",
          // marginHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 14, fontWeight: "400", color: "#acacac" }}>
            {item.eduaction_level}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "400", color: "#acacac" }}>
            {item.inisitute}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "400", color: "#acacac" }}>
            {year1}-{year2}
          </Text>
        </View>
        <View style={{ marginLeft: "52%" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("eduexp2", { id: item.id })}
          >
            <View>
              <Feather name="edit" size={22} color="#1E5966" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  //work flatlist data
  const workinfodetails = ({ item }) => {
    console.log("im at the workk info details");
    console.log(item);
    const fromdate_string = item.start;
    const year1 = new Date(fromdate_string).getFullYear();
    const to_string = item.end;
    const year2 = new Date(to_string).getFullYear();
    return (
      <View
        style={{
          // padding: 10,
          // paddingRight: 20,
          marginBottom: 20,

          flexDirection: "row",
          marginVertical: 10,

          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 14, fontWeight: "400", color: "#acacac" }}>
            {item.Designation}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "400", color: "#acacac" }}>
            {item.company_name}
          </Text>

          <Text style={{ fontSize: 14, fontWeight: "400", color: "#acacac" }}>
            {year1}-{year2}
          </Text>
        </View>
        <View style={{ marginLeft: "52%" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("workexp2", { id: item.id })}
          >
            <View>
              <Feather name="edit" size={22} color="#1E5966" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getexperienceataofuser = async () => {
    // const body = {};
    // body.user_id = userID;
    // body.userType = userType;
    // console.log(body);
    try {
      await fetch(`http://103.174.10.108:5002/api/experience/${userID}`, {
        method: "GET",
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("im athe theeee experience");
          console.log(result);
          setworkexp(result["experience"]);
        });
    } catch (error) {
      console.log(error);
    }
  };
  async function takeAndUploadPhotoAsync(paras) {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    let result =
      paras === "files"
        ? await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          })
        : await ImagePicker.launchCameraAsync({
            // mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            // aspect: [4, 3],
            // quality: 1,
          });
    result;
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    console.log(result);
    setActivityIndicators(true);
    console.log("result is " + result);
    console.log(result);
    let localUri = result.assets[0]["uri"];
    console.log(localUri);
    setImage(localUri);
    let filename = localUri.split("/").pop();
    console.log(filename);
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    console.log(type);
    var formdata = new FormData();
    formdata.append("file", { uri: localUri, name: filename, type });
    // Upload the image using the fetch and FormData APIs
    let FFormData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    FFormData.append("photo", { uri: localUri, name: filename, type });
    async function submitdata() {
      try {
        console.log("im inside");
        await fetch(
          `http://103.174.10.108:5002/api/job_post/aws_upload/${userID}`,
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
            console.log(result);
            setjobpostpic(result["updated"]);
            setActivityIndicators(false);
            setModalVisible(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
    submitdata();
  }

  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [status1, requestPermission1] = MediaLibrary.usePermissions();
  if (status1 === null) {
    requestPermission1();
  }

  async function takeAndUploadPhotoAsync1(paras) {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    console.log("imm the claaa");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    // if (!result.canceled) {
    //   setprofileActivityIndicators(true);

    //   let localUri = result.assets[0]["uri"];

    //   setImage(localUri);
    //   let filename = localUri.split("/").pop();

    //   // Infer the type of the image
    //   let match = /\.(\w+)$/.exec(filename);
    //   let type = match ? `image/${match[1]}` : `image`;

    //   var formdata = new FormData();
    //   formdata.append("file", { uri: localUri, name: filename, type });
    //   // Upload the image using the fetch and FormData APIs
    //   let FFormData = new FormData();
    //   // Assume "photo" is the name of the form field the server expects
    //   FFormData.append("photo", { uri: localUri, name: filename, type });
    //   async function submitdata() {
    //     try {
    //       await fetch(
    //         `http://103.174.10.108:5002/api/job_post/aws_upload/${userID}`,
    //         {
    //           method: "POST",
    //           mode: "cors", // no-cors, *cors, same-origin
    //           // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //           // credentials: "same-origin", // include, *same-origin, omit
    //           headers: {
    //             // Accept: "application/json",
    //             "Content-Type": "multipart/form-data",
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //           },
    //           body: formdata, // body data type must match "Content-Type" header
    //         }
    //       )
    //         .then((response) => response.json())
    //         .then((result) => {
    //           setjobpostpic(result["updated"]);
    //           setprofileActivityIndicators(false);
    //           setModalVisible(false);
    //         });
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   submitdata();
    // } else {
    //   setActivityIndicators(false);
    //   setModalVisible(false);
    // }

    if (!result.canceled) {
      console.log(result);
      setprofileActivityIndicators(true);
      console.log("result is " + result);
      console.log(result);
      let localUri = result.assets[0]["uri"];
      console.log(localUri);
      setprofile(localUri);
      let filename = localUri.split("/").pop();
      console.log(filename);
      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      console.log(type);
      var formdata = new FormData();
      formdata.append("file", { uri: localUri, name: filename, type });
      // Upload the image using the fetch and FormData APIs
      let FFormData = new FormData();
      // Assume "photo" is the name of the form field the server expects
      FFormData.append("photo", { uri: localUri, name: filename, type });
      async function submitdata() {
        try {
          console.log("im inside");
          await fetch(
            `http://103.174.10.108:5002/api/job_post/aws_upload/${userID}`,
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
              console.log(result);
              setprofilepic(result["updated"]);
              setprofileActivityIndicators(false);
              setprofileupdated(true);
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
  if (loading) {
    return;
    <LottieViewloading />;
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        style={{
          alignItems: "center",
          alignContent: "center",
          // paddingTop: 20,
          marginTop: 10,
          // justifyContent: "space-around",
          // height: 200,
          flexDirection: "column",
        }}
      >
        <TouchableOpacity onPress={() => setprofilemodal(true)}>
          <View style={{}}>
            {data[0].profilepic == "" && profile == null ? (
              <>
                <FontAwesome name="user-circle" size={80} color="#1e5966" />
                <MaterialCommunityIcons
                  name="pencil-circle"
                  size={33}
                  color="#1E5966"
                  style={{ position: "relative", bottom: 23, left: 50 }}
                />
              </>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // marginBottom: 10,
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
                  style={{ position: "relative", bottom: 23, left: 30 }}
                />
              </View>
            )}
          </View>
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
                backgroundColor: "#fff",
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
                <View style={{ backgroundColor: "red" }}>
                  <LottieViewloadingmodal />
                  {/* <ActivityIndicator size="large" /> */}
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
                      <AntDesign name="camera" size={20} color="#fff" />
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "500",
                          marginRight: "6%",
                        }}
                      >
                        Take pic
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
                    onPress={() => {
                      requestPermission1;
                      takeAndUploadPhotoAsync1("files");
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <FontAwesome name="files-o" size={20} color="white" />
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "500",
                        }}
                      >
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
        {/* <View style={{ marginVertical: 5, flexDirection: "row" }}>
            <Text style={{ fontSize: 18, color: "#333" }}>{data.number}</Text>
            <LinearGradient
              colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
              style={{
                height: 35,
                width: 100,
                marginLeft: 20,
                borderRadius: 10,
                marginTop: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              useAngle={45}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: "400",
                  marginHorizontal: 10,
                  justifyContent: "center",
                }}
              >
                Profile: 100%
              </Text>
            </LinearGradient> */}
        {/* <TouchableOpacity
              style={{ backgroundColor: "green", borderRadius: 25 }}
            >
              <Text>Profile:100%</Text>
            </TouchableOpacity> */}
        {/* </View> */}
        {/* <Text style={{ fontSize: 18, color: "#333" }}>
          {state.location == "" ? "Your Location" : state.location}
        </Text> */}
      </View>
      <ScrollView
        style={{ marginBottom: 50 }}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: "500", color: "#333" }}>
            {states.job_provider_info && data[0].companyname != null
              ? "Company Information"
              : "Personal Information"}
          </Text>
        </View>
        <View
          style={{
            // height: 60,
            alignContent: "center",
            justifyContent: "center",
            borderWidth: 0.5,
            backgroundColor: "#fff",

            borderColor: "#d9d9d9",
            borderRadius: 10,
            marginBottom: 10,
            marginHorizontal: 20,
            // borderBottomColor: "#333",
          }}
        >
          <View
            style={{
              marginLeft: 10,
              marginVertical: 10,
              // padding: 25,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "#333",
                marginBottom: 5,
              }}
            >
              Mobile No
            </Text>

            <Text style={{ fontSize: 14, fontWeight: "400", color: "#acacac" }}>
              {data[0].number.replace(/^(\+91)(\d{10})$/, "$1 $2")}
            </Text>
          </View>
        </View>
        {
          (console.log("immm the personal"),
          console.log(data[0].companyname),
          console.log(data[0].companyname == ""))
        }
        {states.job_provider_info && data[0].companyname != null ? (
          <>
            <View
              style={{
                alignContent: "center",
                justifyContent: "center",
                borderWidth: 0.5,
                backgroundColor: "#fff",
                borderColor: "#d9d9d9",
                borderRadius: 10,
                marginBottom: 10,
                marginHorizontal: 20,
                // borderBottomColor: "#333",

                // borderBottomColor: "#333",
              }}
            >
              <View style={{ marginVertical: 10, marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "400",
                    color: "#333",
                    marginBottom: 5,
                  }}
                >
                  Company Name
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "85%" }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        color: "#acacac",
                      }}
                    >
                      {companyname == "" ? data[0].companyname : companyname}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setcompanymodalVisible(true)}
                  >
                    <View style={{ marginLeft: "5%" }}>
                      <Feather name="edit" size={22} color="#1E5966" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <Modal
                animationType="slide"
                //animationInTiming = {13900}
                transparent={true}
                visible={companymodalVisible}
                animationOut="slide"
                swipeDirection="down"
              >
                <View
                  style={{
                    flex: 1,
                    width: "90%",
                    // marginHorizontal: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    // marginTop: 22,
                  }}
                >
                  <View
                    style={{
                      margin: 20,
                      backgroundColor: "#fff",
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
                    <Text
                      style={{
                        // justifyContent: "center",
                        fontSize: 14,
                        // backgroundColor: "red",
                        width: 250,
                        marginBottom: 10,
                        marginLeft: 10,
                        fontWeight: "500",
                        textTransform: "capitalize",
                      }}
                    >
                      Enter your new company name :
                    </Text>
                    <TextInput
                      // value={companyname}
                      onChangeText={(companyname) =>
                        setcompanyname(companyname)
                      }
                      defaultValue={data[0].companyname}
                      placeholder={"Comapny name"}
                      style={{
                        width: 250,
                        height: 44,
                        padding: 10,
                        borderColor: "#acacac",
                        borderWidth: 1,
                        borderRadius: 10,
                        marginBottom: 10,
                        backgroundColor: "#fff",
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setcompanymodalVisible(false);
                      }}
                    >
                      <LinearGradient
                        colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
                        style={{
                          height: 35,
                          width: 100,
                          marginLeft: 20,
                          borderRadius: 10,
                          marginTop: 4,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        useAngle={45}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 12,
                            fontWeight: "400",
                            marginHorizontal: 10,
                            justifyContent: "center",
                          }}
                        >
                          Done
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            <View
              style={{
                alignContent: "center",
                justifyContent: "center",
                borderWidth: 0.5,
                backgroundColor: "#fff",
                borderColor: "#d9d9d9",
                borderRadius: 10,
                marginBottom: 10,
                marginHorizontal: 20,
                // borderBottomColor: "#333",

                // borderBottomColor: "#333",
              }}
            >
              <View style={{ marginVertical: 10, marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "400",
                    color: "#333",
                    marginBottom: 5,
                  }}
                >
                  Designation
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "85%" }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        color: "#acacac",
                      }}
                    >
                      {designation == "" ? data[0].designation : designation}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setdesignationmodalVisible(true)}
                  >
                    <View style={{ marginLeft: "5%" }}>
                      <Feather name="edit" size={22} color="#1E5966" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <Modal
                animationType="slide"
                //animationInTiming = {13900}
                transparent={true}
                visible={designationmodalVisible}
                animationOut="slide"
                swipeDirection="down"
              >
                <View
                  style={{
                    flex: 1,
                    width: "90%",
                    // marginHorizontal: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    // marginTop: 22,
                  }}
                >
                  <View
                    style={{
                      margin: 20,
                      backgroundColor: "#fff",
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
                    <Text
                      style={{
                        // justifyContent: "center",
                        fontSize: 14,
                        // backgroundColor: "red",
                        width: 250,
                        marginBottom: 10,
                        marginLeft: 10,
                        fontWeight: "500",
                        textTransform: "capitalize",
                      }}
                    >
                      Enter your new Designation
                    </Text>
                    <TextInput
                      // value={companyname}
                      onChangeText={(designation) =>
                        setdesignation(designation)
                      }
                      defaultValue={data[0].designation}
                      placeholder={"Company name"}
                      style={{
                        width: 250,
                        height: 44,
                        padding: 10,
                        borderColor: "#acacac",
                        borderWidth: 1,
                        borderRadius: 10,
                        marginBottom: 10,
                        backgroundColor: "#fff",
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setdesignationmodalVisible(false);
                      }}
                    >
                      <LinearGradient
                        colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
                        style={{
                          height: 35,
                          width: 100,
                          marginLeft: 20,
                          borderRadius: 10,
                          marginTop: 4,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        useAngle={45}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 12,
                            fontWeight: "400",
                            marginHorizontal: 10,
                            justifyContent: "center",
                          }}
                        >
                          Done
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </>
        ) : (
          <></>
        )}
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            borderWidth: 0.5,
            backgroundColor: "#fff",
            borderColor: "#d9d9d9",
            borderRadius: 10,
            marginBottom: 10,
            marginHorizontal: 20,
            // borderBottomColor: "#333",

            // borderBottomColor: "#333",
          }}
        >
          <View style={{ marginVertical: 10, marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "#333",
                marginBottom: 5,
              }}
            >
              Email
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "85%" }}>
                <Text
                  style={{ fontSize: 14, fontWeight: "400", color: "#acacac" }}
                >
                  {email == "" ? data[0].emailid : email}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setemailmodalVisible(true)}>
                <View style={{ marginLeft: "5%" }}>
                  <Feather name="edit" size={22} color="#1E5966" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType="slide"
            //animationInTiming = {13900}
            transparent={true}
            visible={emailmodalVisible}
            animationOut="slide"
            swipeDirection="down"
          >
            <View
              style={{
                flex: 1,
                width: "90%",
                // marginHorizontal: 20,
                justifyContent: "center",
                alignItems: "center",
                // marginTop: 22,
              }}
            >
              <View
                style={{
                  margin: 20,
                  backgroundColor: "#fff",
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
                <Text
                  style={{
                    // justifyContent: "center",
                    fontSize: 14,
                    // backgroundColor: "red",
                    width: 250,
                    marginBottom: 10,
                    marginLeft: 10,
                    fontWeight: "500",
                    textTransform: "capitalize",
                  }}
                >
                  Enter your new email id
                </Text>
                <TextInput
                  // value={companyname}
                  onChangeText={(email) => setemail(email)}
                  keyboardType="email-address"
                  defaultValue={data[0].emailid}
                  placeholder={"Comapny name"}
                  style={{
                    width: 250,
                    height: 44,
                    padding: 10,
                    borderColor: "#acacac",
                    borderWidth: 1,
                    borderRadius: 10,
                    marginBottom: 10,
                    backgroundColor: "#fff",
                  }}
                />
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setemailmodalVisible(false);
                    }}
                  >
                    <LinearGradient
                      colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
                      style={{
                        height: 35,
                        width: 100,
                        // marginLeft: 20,
                        borderRadius: 10,
                        marginTop: 4,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      useAngle={45}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 12,
                          fontWeight: "400",
                          marginHorizontal: 10,
                          justifyContent: "center",
                        }}
                      >
                        Done
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            borderWidth: 0.5,
            backgroundColor: "#fff",
            borderColor: "#d9d9d9",
            borderRadius: 10,
            marginBottom: 10,
            marginHorizontal: 20,
            // borderBottomColor: "#333",

            // borderBottomColor: "#333",
          }}
        >
          <View style={{ marginVertical: 10, marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "#333",
                marginBottom: 5,
              }}
            >
              Gender
            </Text>

            <Text style={{ fontSize: 14, fontWeight: "400", color: "#acacac" }}>
              {data[0].gender}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
            borderWidth: 0.5,
            backgroundColor: "#fff",
            borderColor: "#d9d9d9",
            borderRadius: 10,
            marginBottom: 10,
            marginHorizontal: 20,
            // borderBottomColor: "#333",

            // borderBottomColor: "#333",
          }}
        >
          <View style={{ marginVertical: 10, marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "#333",
                marginBottom: 5,
              }}
            >
              Username
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "85%" }}>
                <Text
                  style={{ fontSize: 14, fontWeight: "400", color: "#acacac" }}
                >
                  {username == "" ? data[0].username : username}
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => setusernamemodal(true)}>
                  <View style={{ marginLeft: "5%" }}>
                    <Feather name="edit" size={22} color="#1E5966" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              animationType="slide"
              //animationInTiming = {13900}
              transparent={true}
              visible={usernamemodal}
              animationOut="slide"
              swipeDirection="down"
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
                  <SafeAreaView>
                    <Text
                      style={{
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: "500",
                      }}
                    >
                      Enter your new Username
                    </Text>
                    <TextInput
                      // value={companyname}
                      onChangeText={(username) => setusername(username)}
                      keyboardType="email-address"
                      defaultValue={data[0].username}
                      placeholder={"Comapny name"}
                      style={{
                        width: 250,
                        height: 44,
                        padding: 10,
                        borderColor: "#acacac",
                        borderWidth: 1,
                        borderRadius: 10,
                        marginBottom: 10,
                        backgroundColor: "#fff",
                      }}
                    />
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setusernamemodal(false);
                        }}
                      >
                        <LinearGradient
                          colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
                          style={{
                            height: 35,
                            width: 100,
                            marginLeft: 20,
                            borderRadius: 10,
                            marginTop: 4,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          useAngle={45}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: 12,
                              fontWeight: "400",
                              marginHorizontal: 10,
                              justifyContent: "center",
                            }}
                          >
                            Done
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </SafeAreaView>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        {states.job_seeker_info ? (
          <>
            <View
              style={{
                // flexDirection: "row",
                backgroundColor: "#FFF",
                marginHorizontal: 20,
                // height: 130,
                marginBottom: 20,
                alignItems: "center",
                // paddingHorizontal: 20,
                borderRadius: 10,
                // paddingBottom: 10,
                borderColor: "#D9D9D9",
                borderWidth: 0.5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
              >
                <View style={{}}>
                  <Text
                    style={{ fontSize: 15, fontWeight: "400", color: "#333" }}
                  >
                    Education Details
                  </Text>
                </View>
                <View style={{ marginLeft: "54%" }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("eduexp")}
                  >
                    <AntDesign name="plus" size={22} color="#1E5966" />
                  </TouchableOpacity>
                </View>
              </View>

              <FlatList
                nestedScrollEnabled={true}
                data={eduexp}
                //data defined in constructor
                ItemSeparatorComponent={ItemSeparatorView}
                //Item Separator View
                renderItem={eduinfodetails}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View
              style={{
                // flexDirection: "row",
                backgroundColor: "#FFF",
                marginHorizontal: 20,
                // height: 130,
                marginBottom: 20,
                alignItems: "center",
                // paddingHorizontal: 20,
                borderRadius: 10,
                // paddingBottom: 10,
                borderColor: "#D9D9D9",
                borderWidth: 0.5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
              >
                <View>
                  <Text
                    style={{ fontSize: 15, fontWeight: "400", color: "#333" }}
                  >
                    Experience Details
                  </Text>
                </View>

                <View style={{ marginLeft: "54%" }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("workexp")}
                  >
                    <AntDesign name="plus" size={22} color="#1E5966" />
                  </TouchableOpacity>
                </View>
              </View>

              <FlatList
                data={workexp}
                //data defined in constructor
                ItemSeparatorComponent={ItemSeparatorView}
                //Item Separator View
                renderItem={workinfodetails}
                keyExtractor={(item, index) => item.createddatetime}
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                backgroundColor: "#FFF",
                marginHorizontal: 20,
                height: 60,
                // alignItems: "center",
                // paddingHorizontal: 20,
                borderRadius: 10,
                // paddingBottom: 10,
                borderColor: "#D9D9D9",
                borderWidth: 0.5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 10,
                  marginTop: 10,

                  justifyContent: "space-between",
                }}
              >
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "400",
                      color: "#333",
                    }}
                  >
                    Add Resume
                  </Text>
                </View>
                <TouchableOpacity onPress={handleDocumentSelection}>
                  <View>
                    <Feather name="edit" size={22} color="#1E5966" />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <Text
                  style={{ color: "blue" }}
                  onPress={() => {
                    console.log(resume),
                      Linking.openURL(resume == "" ? data[0].resume : resume);
                  }}
                >
                  {resume == ""
                    ? "Your Previous Resume"
                    : "Your updated Resume"}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <></>
        )}
        <View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 30,
              // paddingLeft: 200,
            }}
          >
            <LinearGradient
              colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
              style={{
                height: 49,
                width: 170,
                // marginHorizontal: 50,
                borderRadius: 10,
                // opacity: mobilenumber.length > 1 && !istick ? 1 : 0.5,
                // marginTop: 30,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              useAngle={45}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "flex-end",
                  height: 49,
                  width: 170,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  {
                    console.log(states.job_seeker_info);

                    // !states.job_seeker_info
                    //   ? !states.job_provider_info
                    //     ? console.log("First Expression true")
                    //     : console.log("seconde Ecpression")
                    //   : console.log("Third expression");
                    !states.job_seeker_info
                      ? !states.job_provider_info
                        ? handleSubmit({
                            username:
                              username == "" ? data[0].username : username,
                            emailid: email == "" ? data[0].emailid : email,
                            profilepic:
                              profilepic == ""
                                ? data[0].profilepic
                                : profilepic,
                          })
                        : handleSubmit({
                            username:
                              username == "" ? data[0].username : username,
                            companyname:
                              data[0].companyname != null
                                ? companyname == ""
                                  ? data[0].companyname
                                  : companyname
                                : null,
                            emailid: email == "" ? data[0].emailid : email,
                            designation:
                              designation == ""
                                ? data[0].designation
                                : designation,
                            profilepic:
                              profilepic == ""
                                ? data[0].profilepic
                                : profilepic,
                          })
                      : handleSubmit({
                          username:
                            username == "" ? data[0].username : username,
                          emailid: email == "" ? data[0].emailid : email,
                          resume: resume == "" ? data[0].resume : resume,
                          profilepic:
                            profilepic == "" ? data[0].profilepic : profilepic,
                        });
                  }
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                >
                  Update
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
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
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#e8e8e8",
  },
  top2: {
    flexGrow: 0.5,
    height: "100%",
    justifyContent: "center",
    marginBottom: 20,
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
    paddingTop: 20,
    justifyContent: "space-around",
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
    backgroundColor: "white",
    borderRadius: 25,
    borderColor: "#707070",
    padding: 100,
    height: "42%",
    alignItems: "center",
    shadowColor: "#000",
    borderWidth: 2,
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
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
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
