import {
  AntDesign,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
// import * as Progress from "react-native-progress";
import { Formik } from "formik";
import { xorBy } from "lodash";
import { useContext, useEffect, useState } from "react";
import { LogBox, ScrollView, TextInput } from "react-native";
import loginValidationSchema from "../components/formvalidation";
// import DropDownLanguage2 from "../components/dropdown/DropDownlanguage2";
import { LocalizationContext } from "../../App";

export default function UserInfo({ navigation, route }) {
  const { t, language, setlanguage } = useContext(LocalizationContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [skills, setSkills] = useState(null);
  const [jobseeker, setjobseeker] = useState(false);
  const [jobprovider, setjobprovider] = useState(false);

  const userloc = route.params.edit
    ? route.params.details.location
    : `${route.params.location[0].street},\n${route.params.location[0].district},\n${route.params.location[0].region},\n${route.params.location[0].postalCode}`;

  const [selectedTeam, setSelectedTeam] = useState({});
  const [selectedTeams, setSelectedTeams] = useState([]);

  const showToastWithGravity = (parans) => {
    ToastAndroid.showWithGravity(parans, ToastAndroid.SHORT, ToastAndroid.TOP);
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    // async function fetchdata() {
    //   try {
    //     await fetch("http://103.174.10.108:5002/skills/api", {
    //       method: "GET", // *GET, POST, PUT, DELETE, etc.
    //       mode: "cors", // no-cors, *cors, same-origin
    //       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //       credentials: "same-origin", // include, *same-origin, omit
    //       headers: {
    //         "Content-Type": "application/json",
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //     })
    //       .then((response) => response.json())
    //       .then((result) => (
    //   } catch (error) {
    //     console.warn(error);
    //   }
    // }
    // fetchdata();
  }, []);

  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], "id"));
  }

  const handleSubmits = (paras) => {
    if (paras.phone_number.length == 10) {
      paras.is_phone_number_verified = true;
    } else {
      paras.is_phone_number_verified = false;
    }

    const seletitemsId = [];

    selectedTeams.map((i) => seletitemsId.push(i.item));

    if (jobprovider) {
      paras.is_provider = true;
    } else {
      paras.is_provider = false;
    }
    paras.skills = seletitemsId.toString();
    route.params.edit
      ? (paras.location = route.params.details.location)
      : (paras.location = userloc);
    //
    paras.latitude = route.params.location2.coords.latitude;
    paras.longitude = route.params.location2.coords.longitude;

    // const postdata = async () => {
    //   try {
    //     await fetch("http://103.174.10.108:5002/users/api/post", {
    //       method: "POST", // *GET, POST, PUT, DELETE, etc.
    //       mode: "cors", // no-cors, *cors, same-origin
    //       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //       credentials: "same-origin", // include, *same-origin, omit
    //       headers: {
    //         "Content-Type": "application/json",
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //       body: JSON.stringify(paras), // body data
    //     })
    //       .then((response) => response.json())
    //       .then((result) => {
    //         showToastWithGravity(result);

    //         if (result === "success") {
    //           navigation.navigate("Home");
    //         } else {
    //           showToastWithGravity(result);
    //         }
    //       });
    //   } catch (error) {
    //     console.warn(error);
    //   }
    // };
    // postdata();
  };
  const goHome = () => {
    navigation.navigate("Home");
  };
  return (
    <>
      <View style={styles.topConatainer}>
        <View style={styles.topitem}>
          <View style={styles.topitem1}>
            <Text style={{ fontSize: 14, fontWeight: "700" }}>
              {t("roletitle")}
            </Text>
          </View>
          <View style={styles.topitem2}>
            <View>
              <Pressable>
                <MaterialCommunityIcons
                  name="account-voice"
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: 80,
              }}
            >
              <View style={{ marginLeft: 2, marginTop: -12 }}>
                {/* <DropDownLanguage2 /> */}
              </View>
              {/* <Ionicons name="md-globe-outline" size={24} color="black" /> */}
              <View style={{ marginLeft: 37, marginTop: 4 }}>
                <Entypo name="language" size={24} color="#d2042d" />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomItem}>
          {/* <Progress.Bar
            progress={0.8}
            width={350}
            color={"#05A7FF"}
            borderWidth={3}
            unfilledColor={"#BBB6B6"}
            borderColor={"#BBB6B6"}
            borderRadius={6}
            height={4}
          /> */}
        </View>
      </View>
      <ScrollView nestedScrollEnabled={true}>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            // email: "",
            // password: "",
            // phone_number: "",
            first_name: "",
            last_name: "",
            //location: "",
          }}
          onSubmit={(values) => handleSubmits(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
            isValid,
          }) => (
            <>
              <View style={{ marginTop: 30 }}>
                <View style={styles.inputform}>
                  <View style={styles.name}>
                    <View style={styles.fname}>
                      <Text style={{ paddingLeft: 18, paddingBottom: 5 }}>
                        {t("firstname")}
                      </Text>
                      <TextInput
                        placeholder={t("firstname")}
                        name="firstname"
                        style={styles.input}
                        onChangeText={handleChange("first_name")}
                        onBlur={handleBlur("first_name")}
                        defaultValue={
                          route.params.edit
                            ? route.params.details.first_name
                            : ""
                        }
                      />
                      {errors.first_name && touched.first_name && (
                        <Text
                          style={{
                            fontSize: 13,
                            color: "red",
                            marginHorizontal: 20,
                          }}
                        >
                          {errors.first_name}
                        </Text>
                      )}
                    </View>
                    <View style={styles.lname}>
                      <Text style={{ paddingBottom: 5 }}>{t("lastname")}</Text>
                      <TextInput
                        placeholder={t("lastname")}
                        style={[styles.input, { marginRight: 30 }]}
                        onChangeText={handleChange("last_name")}
                        onBlur={handleBlur("last_name")}
                        defaultValue={
                          route.params.edit
                            ? route.params.details.last_name
                            : ""
                        }
                      />
                      {errors.last_name && touched.last_name && (
                        <Text
                          style={{
                            fontSize: 13,
                            color: "red",
                            marginHorizontal: 20,
                          }}
                        >
                          {errors.last_name}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.phone}>
                    <Text style={{ paddingLeft: 18, paddingBottom: 5 }}>
                      {t("phonenumber")}
                    </Text>
                    <TextInput
                      placeholder={t("phoneplace")}
                      style={styles.input}
                      maxLength={10}
                      keyboardType="number-pad"
                      onChangeText={handleChange("phone_number")}
                      onBlur={handleBlur("phone_number")}
                      defaultValue={
                        route.params.edit
                          ? route.params.details.phone_number
                          : ""
                      }
                    />
                    {errors.phone_number && touched.phone_number && (
                      <Text
                        style={{
                          fontSize: 13,
                          color: "red",
                          marginHorizontal: 20,
                        }}
                      >
                        {errors.phone_number}
                      </Text>
                    )}
                    <View
                      style={{ flexDirection: "row", marginHorizontal: 20 }}
                    >
                      <Text
                        style={{
                          color: !errors.phone_number ? "green" : "red",
                        }}
                      >
                        {!errors.phone_number && touched.phone_number
                          ? "Phone number verified"
                          : "Phone number not verified"}
                      </Text>
                      {!errors.phone_number && touched.phone_number ? (
                        <FontAwesome5
                          name="user-check"
                          size={20}
                          color="green"
                          padding={20}
                        />
                      ) : (
                        <Entypo
                          name="circle-with-cross"
                          size={24}
                          color="red"
                        />
                      )}
                    </View>
                  </View>
                  <View style={styles.email}>
                    <Text style={{ paddingLeft: 18, paddingBottom: 5 }}>
                      {t("emailId")}
                    </Text>
                    <TextInput
                      placeholder={t("emailplace")}
                      style={styles.input}
                      keyboardType="email-address"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      defaultValue={
                        route.params.edit ? route.params.details.email : ""
                      }
                    />
                    {errors.email && touched.email && (
                      <Text
                        style={{
                          fontSize: 13,
                          color: "red",
                          marginHorizontal: 20,
                        }}
                      >
                        {errors.email}
                      </Text>
                    )}
                  </View>
                  <View style={styles.email}>
                    <Text style={{ paddingLeft: 18, paddingBottom: 5 }}>
                      {t("location")}
                    </Text>
                    <TextInput
                      placeholder={t("locplace")}
                      multiline={true}
                      numberOfLines={4}
                      style={styles.input}
                      // onChangeText={setnewlocation(handleChange("location"))}
                      // onChange={(e) => {
                      //   setnewlocation(e.nativeEvent.text);
                      // }}
                      onBlur={handleBlur("location")}
                      value={
                        route.params.edit
                          ? (values.location = route.params.details.location)
                          : (values.location = userloc)
                      }
                    />
                    {errors.location && touched.location && (
                      <Text
                        style={{
                          fontSize: 13,
                          color: "red",
                          marginHorizontal: 20,
                        }}
                      >
                        {errors.location}
                      </Text>
                    )}
                  </View>
                  {route.params.edit ? null : (
                    <View style={styles.selectRole}>
                      <View style={styles.jobposter}>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Pressable
                            onPress={() => (
                              setjobseeker(true), setjobprovider(false)
                            )}
                          >
                            {jobseeker ? (
                              <AntDesign
                                name="checkcircle"
                                size={24}
                                color="green"
                              />
                            ) : (
                              <Entypo name="circle" size={24} color="black" />
                            )}
                          </Pressable>
                          <Pressable
                            onPress={() => (
                              setjobseeker(true), setjobprovider(false)
                            )}
                          >
                            <Text style={{ paddingLeft: 10 }}>{t("job2")}</Text>
                          </Pressable>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Pressable
                            onPress={() => {
                              setjobprovider(true);
                              setjobseeker(false);
                            }}
                          >
                            {jobprovider ? (
                              <AntDesign
                                name="checkcircle"
                                size={24}
                                color="green"
                              />
                            ) : (
                              <Entypo name="circle" size={24} color="black" />
                            )}
                          </Pressable>
                          <Pressable
                            onPress={() => {
                              setjobprovider(true);
                              setjobseeker(false);
                            }}
                          >
                            <Text style={{ paddingLeft: 10 }}>{t("job1")}</Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  )}
                  {route.params.edit ? null : (
                    <View style={styles.password}>
                      <Text
                        style={{
                          paddingLeft: 18,
                          paddingBottom: 5,
                          marginTop: 10,
                        }}
                      >
                        {t("pass")}
                      </Text>
                      <TextInput
                        placeholder={t("passpla")}
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        defaultValue={
                          route.params.edit ? route.params.details.password : ""
                        }
                      />
                      {errors.password && touched.password && (
                        <Text
                          style={{
                            fontSize: 13,
                            color: "red",
                            marginHorizontal: 20,
                          }}
                        >
                          {errors.password}
                        </Text>
                      )}
                    </View>
                  )}
                </View>

                <View style={styles.skill}>
                  <Text
                    style={{
                      paddingLeft: 18,
                      paddingBottom: 5,
                      marginTop: 10,
                    }}
                  >
                    {t("skill")} :
                  </Text>

                  {skills === null ? (
                    <View>
                      <Text>Loading...</Text>
                    </View>
                  ) : (
                    <DropDownPicker
                      placeholder={t("skillpla")}
                      open={open}
                      value={value}
                      items={skills}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setSkills}
                      multiple={true}
                      searchable={true}
                      dropDownDirection="AUTO"
                      mode="BADGE"
                      listMode="MODAL"
                      style={{
                        borderWidth: 0.3,
                        borderColor: "black",
                        marginHorizontal: 20,
                        width: 355,
                      }}
                      modalAnimationType="slide"
                      placeholderStyle={{
                        fontWeight: "bold",
                      }}
                      badgeColors={"black"}
                      badgeTextStyle={{
                        fontStyle: "italic",
                        color: "white",
                      }}
                      badgeDotColors={["#00b4d8"]}
                    />
                  )}
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: isValid ? "#6BC3FF" : "#87ceeb",
                      padding: 10,
                      width: "50%",
                      alignSelf: "center",
                      borderRadius: 10,
                      marginVertical: 20,
                    }}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "600",
                        color: isValid ? "black" : "white",
                      }}
                    >
                      {route.params.edit ? "update" : "create Profile"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  topConatainer: {
    backgroundColor: "#fafafa",
    justifyContent: "flex-end",
    paddingTop: 30,
  },
  buttonContainer: {
    height: 200,
    flex: 1,
  },
  name: {
    flexDirection: "row",
    marginLeft: 9,
  },
  fname: {
    width: 200,
  },
  buttonContainer: {
    backgroundColor: "#fafafa",
  },
  lname: {
    width: 200,
  },
  middle: {
    height: 430,
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
  },
  bottom: {
    backgroundColor: "#f2f2f2",
    height: 300,
    paddingRight: 30,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    paddingLeft: 20,
    marginBottom: 10,
  },
  jobposter: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
  },
  input: {
    backgroundColor: "#FFF",
    fontWeight: "600",
    fontSize: 15,
    width: "90%",
    padding: 10,
    borderColor: "black",
    borderWidth: 0.3,
    alignSelf: "center",
    borderRadius: 8,
    shadowRadius: 1,
    color: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowColor: "black",
  },
  topitem: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  mainbnox: {
    backgroundColor: "pink",
    width: 300,
    height: 400,
  },
  topitem1: {
    flex: 0.6,
    marginHorizontal: 10,
  },
  topitem2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flex: 0.3,
  },
  bottomItem: {
    marginHorizontal: 13,
    marginVertical: 5,
  },
  icon: {
    flex: 0.2,
    marginTop: 10,
  },
  icon2: {
    flex: 0.2,
    marginTop: 10,
  },
  Info: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 0.7,
    marginTop: 10,
  },
  card1: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 20,
    height: 170,
    padding: 10,
    marginBottom: 60,
  },
  card2: {
    alignContent: "flex-start",
    backgroundColor: "white",
    flexDirection: "row",
    marginHorizontal: 20,
    height: 150,
    padding: 10,
    width: 280,
    position: "relative",
  },
  Info2: {
    flexDirection: "row",
    flex: 0.6,
    flexWrap: "wrap",
    marginTop: 10,
    position: "relative",
  },
  cardsItem: {
    flex: 1,
  },
  image1: {
    marginTop: 30,
    marginRight: -35,
  },
  image2: {
    position: "absolute",
    marginLeft: 160,
    marginTop: 50,
  },
  inputform: {
    backgroundColor: "#fafafa",
  },
  skill: {
    backgroundColor: "#fafafa",
  },
});
