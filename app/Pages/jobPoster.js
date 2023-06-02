import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
// import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import { useCallback, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, TextInput } from "react-native";
import { LocalizationContext } from "../../App";
import PostValidationSchema from "../components/posterFormvalidation";
export default function JobposterDetails({ route }) {
  const { t, language, setlanguage } = useContext(LocalizationContext);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [fileResponse, setfileResponse] = useState([]);
  const { handleSubmit, control } = useForm();
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [gender, setGender] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Prefer Not to Say", value: "neutral" },
  ]);
  const [image, setImage] = useState(null);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [companyValue, setCompanyValue] = useState(null);
  const [jobpost, setjobpostpic] = useState(null);
  const [ActivityIndicators, setActivityIndicators] = useState(false);
  const [company, setComapny] = useState([
    { label: "PUCIT", value: "1" },
    { label: "UCP", value: "2" },
    { label: "UET", value: "3" },
  ]);
  const [loading, setLoading] = useState(false);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);
  const onCompanyOpen = useCallback(() => {
    setGenderOpen(false);
  }, []);
  useEffect(() => {
    fetchdata();
  }, []);
  async function fetchdata() {
    try {
      await fetch("http://103.174.10.108:5002/api/job_title", {
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
  const [items, setItems] = useState([
    { label: "hours", value: "Hours" },
    { label: "Days", value: "Days" },
    { label: "Weeks", value: "Weeks" },
    { label: "Months", value: "Monts" },
    { label: "Year", value: "Year" },
    { label: "Permanent", value: "permanenet" },
  ]);
  const showToastWithGravity = (parans) => {
    ToastAndroid.showWithGravity(parans, ToastAndroid.SHORT, ToastAndroid.TOP);
  };

  const final_Id = route.params.userId;
  const Details = route.params.Details;

  const handleSubmits = (paras) => {
    paras.Duration2 = value;
    paras.uid = final_Id;
    paras.phonenumber = Details.phone_number;
    const result = company.filter(checkcom);
    function checkcom(com) {
      return com.value == companyValue;
    }
    const finalJob = result[0].label;
    paras.job = finalJob;
    paras.post_pic = jobpost;

    const JobpostingData = async () => {
      try {
        await fetch("http://103.174.10.108:5002/api/poster", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(paras), // body data
        })
          .then((response) => response.json())
          .then((result) => {
            showToastWithGravity(result);
            if (result == "success") {
              navigation.navigate("category", {
                userDetails: route.params.Details,
              });
            }
          });
      } catch (error) {}
    };
    JobpostingData();
  };
  //request Permsiion
  //Ask Permission
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [status1, requestPermission1] =
    ImagePicker.useMediaLibraryPermissions();

  //to upload Image
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
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
    result;
    // ImagePicker saves the taken photo to disk and returns a local URI to it

    if (!result.canceled) {
      setActivityIndicators(true);

      let localUri = result.assets[0]["uri"];

      setImage(localUri);
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
            `http://192.168.1.8:5000/api/job_post/aws_upload/${userID}`,
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
              setjobpostpic(result["updated"]);
              setActivityIndicators(false);
              setModalVisible(false);
            });
        } catch (error) {
          console.log(error);
        }
      }
      submitdata();
    } else {
      setActivityIndicators(false);
      setModalVisible(false);
    }
  }
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
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Ionicons name="md-globe-outline" size={24} color="black" />
              <Text>EN</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomItem}>
          {/* <Progress.Bar
            progress={0.8}
            width={350}
            color={"#1DA1F2"}
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
          initialValues={{
            job: "",
            Duration: "",
            payment: "",
            e_skill_set: "",
            location: "",
            Description: "",
            phonenumber: "",
          }}
          validationSchema={PostValidationSchema}
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
              <View>
                <View style={styles.inputform}>
                  <View style={styles.name}>
                    <View style={styles.fname}>
                      <Text style={{ paddingLeft: 18, paddingBottom: 5 }}>
                        {t("jobtitle")}
                      </Text>
                      {/* <TextInput
                        placeholder="Enter the job tittle"
                        placeholderTextColor={"black"}
                        name="job"
                        style={styles.input}
                        onChangeText={handleChange("job")}
                        onBlur={handleBlur("job")}
                        value={values.job}
                      /> */}
                      <Controller
                        name="company"
                        defaultValue=""
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <View style={styles.dropdownCompany}>
                            <DropDownPicker
                              style={styles.dropdown}
                              open={companyOpen}
                              value={companyValue} //companyValue
                              items={company}
                              setOpen={setCompanyOpen}
                              listMode="MODAL"
                              modalTitle="Select job title"
                              modalProps={{
                                animationType: "slide",
                              }}
                              modalContentContainerStyle={{
                                backgroundColor: "white",
                              }}
                              setValue={setCompanyValue}
                              setItems={setComapny}
                              placeholder={t("selectjob")}
                              placeholderStyle={styles.placeholderStyles}
                              loading={loading}
                              activityIndicatorColor="#5188E3"
                              searchable={true}
                              searchPlaceholder="Search title here..."
                              onOpen={onCompanyOpen}
                              onChangeValue={onChange}
                              zIndex={1000}
                              zIndexInverse={3000}
                            />
                          </View>
                        )}
                      />
                      {errors.job && touched.job && (
                        <Text
                          style={{
                            fontSize: 13,
                            color: "red",
                            marginHorizontal: 20,
                          }}
                        >
                          {errors.job}
                        </Text>
                      )}
                    </View>
                    <View style={styles.lname}>
                      <View style={styles.Duration}>
                        <Text style={{ paddingLeft: 18, paddingBottom: 5 }}>
                          {t("duration")}
                        </Text>
                        <View style={{ marginLeft: 12 }}>
                          <TextInput
                            placeholder={t("duration")}
                            placeholderTextColor={"black"}
                            style={styles.input}
                            onChangeText={handleChange("Duration")}
                            onBlur={handleBlur("Duration")}
                            value={values.Duration}
                            keyboardType="number-pad"
                          />
                        </View>
                        {errors.Duration && touched.Duration && (
                          <Text
                            style={{
                              fontSize: 13,
                              color: "red",
                              alignSelf: "center",
                              marginHorizontal: 20,
                            }}
                          >
                            {errors.Duration}
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          width: "40%",
                          marginTop: 25,
                          height: open ? 210 : 0,
                        }}
                      >
                        <DropDownPicker
                          open={open}
                          value={value}
                          items={items}
                          setOpen={setOpen}
                          setValue={setValue}
                          stickyHeader={true}
                          style={{
                            borderWidth: 0,
                          }}
                          showBadgeDot={true}
                          placeholder="Select duration"
                          placeholderStyle={{
                            color: "grey",
                            fontWeight: "bold",
                          }}
                          labelStyle={{
                            fontWeight: "700",
                          }}
                          listMode="SCROLLVIEW"
                          searchable={false}
                          setItems={setItems}
                          zIndex={0}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.phone}>
                    <Text style={{ paddingLeft: 18, paddingBottom: 5 }}>
                      {t("pay")}
                    </Text>
                    <TextInput
                      placeholder={t("payplace")}
                      placeholderTextColor={"black"}
                      style={styles.input}
                      maxLength={10}
                      keyboardType="number-pad"
                      onChangeText={handleChange("payment")}
                      onBlur={handleBlur("payment")}
                      value={values.payment}
                    />
                    {errors.payment && touched.payment && (
                      <Text
                        style={{
                          fontSize: 13,
                          color: "red",
                          marginHorizontal: 20,
                        }}
                      >
                        {errors.payment}
                      </Text>
                    )}
                  </View>
                  <View style={{ flexDirection: "column", flex: 1 }}>
                    <Text style={[styles.title, { marginBottom: 1 }]}>
                      {t("adding")}
                    </Text>
                    <View style={styles.container}>
                      <Text>{fileResponse ? fileResponse.name : ""}</Text>
                      <Modal
                        animationType="slide"
                        //animationInTiming = {13900}
                        transparent={true}
                        visible={modalVisible}
                        animationOut="slide"
                        swipeDirection="down"
                        onRequestClose={() => {
                          setModalVisible(!modalVisible);
                          setActivityIndicators(false);
                        }}
                      >
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                            {ActivityIndicators ? (
                              <View>
                                <Text>Loading. please wait</Text>
                                <ActivityIndicator size="large" />
                              </View>
                            ) : (
                              <>
                                <TouchableHighlight
                                  style={{
                                    ...styles.openButton,
                                    width: 150,
                                    backgroundColor: "#2196F3",
                                  }}
                                  onPress={() => {
                                    requestPermission();
                                    takeAndUploadPhotoAsync("camera");
                                  }}
                                >
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <AntDesign
                                      name="camera"
                                      size={24}
                                      color="white"
                                    />
                                    <Text style={styles.textStyle}>
                                      {t("pic")}
                                    </Text>
                                  </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                  style={{
                                    ...styles.openButton,
                                    width: 150,
                                    backgroundColor: "#2196F3",
                                    marginTop: 20,
                                  }}
                                  onPress={() => (
                                    requestPermission1(),
                                    takeAndUploadPhotoAsync("files")
                                  )}
                                >
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <FontAwesome
                                      name="files-o"
                                      size={24}
                                      color="white"
                                    />
                                    <Text style={styles.textStyle}>
                                      {t("fi")}
                                    </Text>
                                  </View>
                                </TouchableHighlight>
                              </>
                            )}
                          </View>
                        </View>
                      </Modal>
                      {image === null ? (
                        <Text>Loading</Text>
                      ) : (
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 10,
                          }}
                        >
                          <Image
                            source={{ uri: image }}
                            style={{ width: 50, height: 50 }}
                          />
                        </View>
                      )}
                      <TouchableOpacity
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          width: "90%",
                          alignItems: "center",
                          alignSelf: "center",
                          padding: 10,
                          borderRadius: 10,
                        }}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 20 }}>
                          {t("uploadIm")}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.e_skill_set}>
                    <Text style={{ paddingLeft: 18, paddingBottom: 5 }}>
                      {t("e_skill")}
                    </Text>
                    <TextInput
                      placeholder={t("e_skill_pla")}
                      placeholderTextColor={"black"}
                      style={styles.input}
                      keyboardType="default"
                      onChangeText={handleChange("e_skill_set")}
                      onBlur={handleBlur("e_skill_set")}
                      value={values.e_skill_set}
                    />
                    {errors.e_skill_set && touched.e_skill_set && (
                      <Text
                        style={{
                          fontSize: 13,
                          color: "red",
                          marginHorizontal: 20,
                        }}
                      >
                        {errors.e_skill_set}
                      </Text>
                    )}
                  </View>
                  <View style={styles.location}>
                    <Text style={{ paddingLeft: 18, paddingBottom: 5 }}>
                      {t("location")}
                    </Text>
                    <TextInput
                      placeholder={t("locplace")}
                      placeholderTextColor={"black"}
                      multiline={true}
                      numberOfLines={4}
                      style={styles.input}
                      onChangeText={handleChange("location")}
                      onBlur={handleBlur("location")}
                      defaultValue={Details.location}
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
                  <View style={styles.location}>
                    <Text style={{ paddingLeft: 18, paddingBottom: 5 }}>
                      {t("desc")}
                    </Text>
                    <TextInput
                      placeholder={t("desc_place")}
                      placeholderTextColor={"black"}
                      multiline={true}
                      numberOfLines={4}
                      style={styles.input}
                      onChangeText={handleChange("Description")}
                      onBlur={handleBlur("Description")}
                      value={values.Description}
                    />
                    {errors.Description && touched.Description && (
                      <Text
                        style={{
                          fontSize: 13,
                          color: "red",
                          marginHorizontal: 20,
                        }}
                      >
                        {errors.Description}
                      </Text>
                    )}
                  </View>
                  <View style={styles.location}>
                    <Text style={{ paddingLeft: 18, paddingBottom: 5 }}>
                      {t("phonenumber")}
                    </Text>
                    <TextInput
                      placeholder={t("phoneplace")}
                      placeholderTextColor={"black"}
                      maxLength={10}
                      style={styles.input}
                      onChangeText={handleChange("phonenumber")}
                      onBlur={handleBlur("phonenumber")}
                      defaultValue={Details.phone_number}
                      keyboardType="number-pad"
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        paddingHorizontal: 30,
                        color: "red",
                        fontWeight: "600",
                      }}
                    >
                      *job postings are automatically expired in 15 days
                    </Text>
                    {errors.phonenumber && touched.phonenumber && (
                      <Text
                        style={{
                          fontSize: 13,
                          color: "red",
                          marginHorizontal: 20,
                        }}
                      >
                        {errors.phonenumber}
                      </Text>
                    )}
                  </View>
                </View>
                <LinearGradient
                  colors={["#6BC3FF", "#1DA1F2"]}
                  style={{
                    padding: 10,
                    width: "50%",
                    alignSelf: "center",
                    borderRadius: 10,
                    marginVertical: 20,
                  }}
                >
                  <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "700",
                        color: isValid ? "black" : "grey",
                      }}
                    >
                      {t("create")}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
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
    backgroundColor: "red",
  },
  topConatainer: {
    backgroundColor: "#FAFAFA",
    justifyContent: "flex-end",
    paddingTop: 50,
  },
  lname: {
    flexDirection: "row",
  },
  buttonContainer: {
    height: 200,
    flex: 1,
  },
  name: {
    flexDirection: "column",
  },
  buttonContainer: {
    backgroundColor: "#F2F2F2",
  },
  dropdown: {
    width: "90%",
    marginLeft: 20,
  },
  middle: {
    height: 430,
    flexDirection: "column",
    backgroundColor: "#F2F2F2",
  },
  bottom: {
    backgroundColor: "#F2F2F2",
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
    backgroundColor: "#fff",
    width: "90%",
    padding: 10,
    borderRadius: 10,
    color: "black",
    marginBottom: 10,
    alignSelf: "center",
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
    backgroundColor: "#F2F2F2",
  },
  skill: {
    backgroundColor: "#F2F2F2",
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
    padding: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    paddingLeft: 3,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
