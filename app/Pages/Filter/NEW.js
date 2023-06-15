import * as React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimension,
  FlatList,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useContext } from "react";
import { L_FILTER } from "../../../App";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
// import Location from "./LongtimeFilter/longloc";
import Location1 from "./LongtimeFilter/longloc";
import MyComponent1 from "./LongtimeFilter/longcat";
import LongSalery from "./LongtimeFilter/longsal";
import Duration1 from "./LongtimeFilter/longdu";
// import MyComponent from "./LongtimeFilter/longcat";
import Workmode from "./Workmode";
// import Duration from "./LongtimeFilter/longdu";
// import Salery from "./LongtimeFilter/longsal";
import Education from "./Education";
import Experiance from "./Experiance";
import Company from "./ComapanySearch";
import Post from "./Post";
import { LinearGradient } from "expo-linear-gradient";

const listTab = [
  {
    status: "Location",

    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("../../images/Imagefilter/locationpin.png")}
      />
    ),
  },
  // {
  //   status: "Category",

  //   icon: (
  //     <Image
  //       resizeMode="contain"
  //       style={{ height: 22, width: 22 }}
  //       source={require("../../images/Imagefilter/categories.png")}
  //     />
  //   ),
  // },
  {
    status: "Duration",
    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("../../images/Imagefilter/hourglass.png")}
      />
    ),
  },
  {
    status: "Experience",

    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("../../images/Imagefilter/Experience.png")}
      />
    ),
  },
  {
    status: "Work Space",
    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("../../images/Imagefilter/workspace.png")}
      />
    ),
  },
  {
    status: "Salary",
    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("../../images/Imagefilter/payment.png")}
      />
    ),
  },
  {
    status: "Education",
    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("../../images/Imagefilter/college.png")}
      />
    ),
  },
  // {
  //   status: "Experiance",
  //   icon: (
  //     <Image
  //       resizeMode="contain"
  //       style={{ height: 30, width: 30 }}
  //       source={require("../../images/Imagefilter/portfolio.png")}
  //     />
  //   ),
  // },
  {
    status: "Company",

    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("../../images/Imagefilter/company.png")}
      />
    ),
  },

  // {
  //   status: "Posted by",
  //   icon: (
  //     <Image
  //       resizeMode="contain"
  //       style={{ height: 30, width: 30 }}
  //       source={require("../../images/Imagefilter/postnote.png")}
  //     />
  //   ),
  // },
];

// Linking content
const data = [
  {
    name: <Location1 />,
    text: "This is my homepage. Here I welcome you to my website and try me best to make a good impression. I tell you about the services I provide and encourage you to venture into my site.",
    status: "Location",
  },
  // {
  //   name: <MyComponent1 />,
  //   text: "This is my homepage. Here I welcome you to my website and try me best to make a good impression. I tell you about the services I provide and encourage you to venture into my site.",
  //   status: "Category",
  // },

  {
    name: <Duration1 />,
    text: "Here I go into details about myself and my business, including the services we provide, how we started and our overall ethos.",
    status: "Duration",
  },
  {
    name: <Experiance />,

    text: "work",
    status: "Experience",
  },
  {
    name: <Workmode />,
    text: "Here we give you information on how to contact us for business discussions and possible collaborations.",
    status: "Work Space",
  },
  {
    name: <LongSalery />,
    text: "Here we give you information on how to contact us for business discussions and possible collaborations.",
    status: "Salary",
  },
  {
    name: <Education />,
    text: "Here we give you information on how to contact us for business discussions and possible collaborations.",
    status: "Education",
  },
  // {
  //   name: <Experiance />,
  //   text: "This is my homepage. Here I welcome you to my website and try me best to make a good impression. I tell you about the services I provide and encourage you to venture into my site.",
  //   status: "Experiance",
  // },
  {
    name: <Company />,

    text: "work",
    status: "Company",
  },

  // {
  //   name: <Post />,
  //   text: "Here we give you information on how to contact us for business discussions and possible collaborations.",
  //   status: "Posted by",
  // },
];

export default function New({ navigation: { goBack } }) {
  const [status, setStatus] = useState("Location");
  const { state2, dispatch2 } = useContext(L_FILTER);
  console.log(state2);
  const [dataList, setDataList] = useState([
    ...data.filter((e) => e.status === "Location"),
  ]);

  const setStatusFilter = (status) => {
    if (status !== "Location") {
      setDataList([...data.filter((e) => e.status === status)]);
    } else {
      setDataList([...data.filter((e) => e.status === "Location")]);
    }

    setStatus(status);
  };
  const callTheApplyFilter = () => {
    dispatch2({ type: "Is_filter_clicked_long" });
    goBack();
  };
  return (
    <>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 19,
          borderRadius: 10,
        }}
      >
        <ScrollView style={{ width: "85%", borderRadius: 10 }}>
          <View style={{ height: "100%" }}>
            <ScrollView horizontal style={{ height: "30%" }}>
              <View
                style={{
                  height: 40,
                  // width: 60,
                  borderRadius: 10,
                  justifyContent: "center",
                  backgroundColor: state2.states == "$" ? "#fff" : "#eefbff",
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    color: "#333",
                    fontSize: 12,
                    textTransform: "capitalize",
                  }}
                >
                  {state2.states == "$" ? "" : state2.states}
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  // width: 60,
                  borderRadius: 10,
                  justifyContent: "center",
                  backgroundColor: state2.district == "$" ? "#fff" : "#eefbff",
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    color: "#333",
                    fontSize: 12,
                    textTransform: "capitalize",
                  }}
                >
                  {state2.district == "$" ? "" : state2.district}
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  // width: 60,
                  borderRadius: 10,
                  justifyContent: "center",
                  backgroundColor: state2.job_title == "$" ? "#fff" : "#eefbff",
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    color: "#333",
                    fontSize: 12,
                    textTransform: "capitalize",
                  }}
                >
                  {state2.job_title == "$" ? "" : state2.job_title}
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  // width: 60,
                  borderRadius: 10,
                  justifyContent: "center",
                  backgroundColor: state2.duration == "$" ? "#fff" : "#eefbff",
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
              >
                <Text style={{}}>
                  {state2.duration == "$" ? "" : state2.duration}
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  // width: 60,
                  borderRadius: 10,
                  justifyContent: "center",
                  backgroundColor: state2.salary == "$" ? "#fff" : "#eefbff",
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    color: "#333",
                    fontSize: 12,
                    textTransform: "capitalize",
                  }}
                >
                  {state2.salary == "$" ? "" : state2.salary}
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  // width: 60,
                  borderRadius: 10,
                  justifyContent: "center",
                  backgroundColor: state2.workmode == "$" ? "#fff" : "#eefbff",
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    color: "#333",
                    fontSize: 12,
                    textTransform: "capitalize",
                  }}
                >
                  {state2.workmode == "$" ? "" : state2.workmode}
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  // width: 60,
                  borderRadius: 10,
                  justifyContent: "center",
                  backgroundColor: state2.education == "$" ? "#fff" : "#eefbff",
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    color: "#333",
                    fontSize: 12,
                    textTransform: "capitalize",
                  }}
                >
                  {state2.education == "$" ? "" : state2.education}
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  // width: 60,
                  borderRadius: 10,
                  justifyContent: "center",
                  backgroundColor:
                    state2.experience == "$" ? "#fff" : "#eefbff",
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    color: "#333",
                    fontSize: 12,
                    textTransform: "capitalize",
                  }}
                >
                  {state2.experience == "$" ? "" : state2.experience}
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  // width: 60,
                  borderRadius: 10,
                  justifyContent: "center",
                  // backgroundColor: "#eefbff",
                  backgroundColor:
                    state2.companyname == "$" ? "#fff" : "#eefbff",

                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    color: "#333",
                    fontSize: 12,
                    textTransform: "capitalize",
                  }}
                >
                  {state2.companyname == "$" ? "" : state2.companyname}
                </Text>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>

      <View style={styles.container}>
        <View style={styles.listTab}>
          {/* <ScrollView> */}
          {listTab.map((e) => {
            return (
              <View
                style={{
                  // backgroundColor: "red",
                  marginVertical: "10%",
                  height: "10%",
                  justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.btnTab,
                    status === e.status && styles.btnTabActive,
                  ]}
                  onPress={() => setStatusFilter(e.status)}
                >
                  <Text
                    style={[
                      styles.iconTab,
                      status === e.status && styles.textTabActive,
                    ]}
                  >
                    {e.icon}
                  </Text>
                  <Text style={styles.textTab}> {e.status}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
          {/* </ScrollView> */}
        </View>
        {/* <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}> */}
        <FlatList
          data={dataList}
          keyExtractor={(e, i) => i.toString()}
          renderItem={renderItem}
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps="always"
        />
        {/* </KeyboardAvoidingView> */}
      </View>
      <View
        style={{
          marginTop: "-19%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => callTheApplyFilter()}>
          <LinearGradient
            colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
            style={{
              height: 49,
              width: 200,
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
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
              Apply Filter
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
}
const renderItem = ({ item, index }) => {
  return (
    <View key={index} style={styles.itemContainer}>
      <Text>{item.name}</Text>

      {/* <Text>{item.text}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     flexDirection: "row",
  //     paddingHorizontal: 10,
  //     justifyContent: "center",
  //   },
  //   listTab: {
  //     borderColor: "#f5f5f5",
  //     borderWidth: 2,
  //     backgroundColor: "#fff",
  //     flexDirection: "column",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     marginTop: 20,
  //     marginLeft: 5,
  //     borderRadius: 20,
  //     // height: "60%",
  //     // width: "30%",
  //   },
  //   btnTab: {
  //     // width: 0,
  //     // flexDirection: "column",
  //     marginBottom: 5,
  //     paddingHorizontal: 5,
  //     paddingVertical: 3,
  //     alignContent: "center",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  //   textTab: {
  //     fontSize: 12,
  //     flexDirection: "column",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     alignContent: "center",
  //   },
  //   iconTab: {
  //     height: 40,
  //     flexDirection: "column",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     alignContent: "center",
  //   },
  //   btnTabActive: {
  //     backgroundColor: "#1E5966",
  //     height: "10%",
  //     borderRadius: 10,
  //   },
  //   textTabActive: {
  //     color: "#333",
  //   },
  //   itemContainer: {
  //     paddingVertical: 15,
  //     height: "100%",
  //     width: "100%",
  //     flex: 1,
  //     justifyContent: "center",
  //     marginLeft: 30,
  //     marginTop: 10,
  //   },
  //   itemName: {
  //     fontWeight: "bold",
  //     fontSize: 20,
  //     marginBottom: 5,
  //   },
  // });

  container: {
    // flex: 1,
    height: 570,
    flexDirection: "row",
    // paddingHorizontal: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  listTab: {
    marginTop: 10,
    borderColor: "#d9d9d9",
    borderWidth: 1,
    height: "90%",
    width: "20%",
    paddingTop: 20,
    // paddingVertical: "5%",
    backgroundColor: "#FFF",
    flexDirection: "column",
    // justifyContent: "space-evenly",
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 20,
    // marginLeft: 5,
    // borderRadius: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,

    // backgroundColor: "red",
  },
  btnTab: {
    // width: 0,
    // backgroundColor: "red",
    // flexDirection: "column",
    // marginBottom: 5,
    // marginTop: "5%",
    height: "100%",
    // paddingHorizontal: 5,
    // paddingVertical: 3,
    alignContent: "center",
    alignItems: "center",
    // paddingTop: "10%",
    // borderBottomWidth: 1,
    // borderBottomColor: "#333",
    justifyContent: "center",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  textTab: {
    fontSize: 11,
    fontWeight: "400",
    color: "#1e5966",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  iconTab: {
    height: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  btnTabActive: {
    backgroundColor: "#d5f4fe",
    // marginTop: "5%",
    height: "100%",
    width: "93%",
    // paddingTop: "35%",

    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    alignContent: "center",
    alignItems: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: "#333",
    justifyContent: "center",
  },
  textTabActive: {
    color: "#fff",
    // backgroundColor: "red",
  },
  itemContainer: {
    // backgroundColor: "red",
    // position: "relative",
    // paddingVertical: 15,
    // height: "100%",
    // width: "100%",
    // flex: 1,
    // flexDirection: "column",
    // justifyContent: "center",
    // marginLeft: 30,
    // marginRight: "100%",
    // marginLeft: "1%",
    marginTop: -11,
  },
  // itemName: {
  //   fontWeight: "bold",
  //   fontSize: 20,
  //   marginBottom: 5,
  // },
});
