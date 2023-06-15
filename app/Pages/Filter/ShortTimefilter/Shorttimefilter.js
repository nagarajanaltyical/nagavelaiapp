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
} from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Location from "../Location";
import MyComponent from "../Category";
import Workmode from "../Workmode";
import Duration from "../Duration";
import Salery from "../Salery";
import Education from "../Education";
import Experiance from "../Experiance";
import Company from "../ComapanySearch";
import Post from "../Post";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { S_FILTER } from "../../../../App";
import { useSelector, useDispatch } from "react-redux";

const listTab = [
  {
    status: "Location",

    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("../../../images/Imagefilter/locationpin.png")}
      />
    ),
  },
  // {
  //   status: "Category",

  //   icon: (
  //     <Image
  //       resizeMode="contain"
  //       style={{ height: 22, width: 22 }}
  //       source={require("../../../images/Imagefilter/categories.png")}
  //     />
  //   ),
  // },
  {
    status: "Duration",
    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("../../../images/Imagefilter/hourglass.png")}
      />
    ),
  },

  {
    status: "Salary",
    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("../../../images/Imagefilter/payment.png")}
      />
    ),
  },
];

// Linking content
const data = [
  {
    name: <Location />,
    status: "Location",
  },
  // {
  //   name: <MyComponent />,
  //   status: "Category",
  // },

  {
    name: <Duration />,
    status: "Duration",
  },
  //   {
  //     name: <Workmode />,
  //     text: "Here we give you information on how to contact us for business discussions and possible collaborations.",
  //     status: "Work Mode",
  //   },
  {
    name: <Salery />,
    status: "Salary",
  },
  //   {
  //     name: <Education />,
  //     text: "Here we give you information on how to contact us for business discussions and possible collaborations.",
  //     status: "Education",
  //   },
  //   {
  //     name: <Experiance />,
  //     text: "This is my homepage. Here I welcome you to my website and try me best to make a good impression. I tell you about the services I provide and encourage you to venture into my site.",
  //     status: "Experiance",
  //   },
  //   {
  //     name: <Company />,

  //     text: "work",
  //     status: "Company",
  //   },
  // {
  //   name: <Post />,
  //   text: "Here we give you information on how to contact us for business discussions and possible collaborations.",
  //   status: "Posted by",
  // },
];

export default function Shorttimefilter({ navigation: { goBack } }) {
  const userID = useSelector((state) => state.ID);
  const Redux_Dispatch = useDispatch();
  const [status, setStatus] = useState("Location");

  const { state1, dispatch1 } = useContext(S_FILTER);
  console.log("Im the filterData");
  console.log(state1);
  const [dataList, setDataList] = useState([
    ...data.filter((e) => e.status === "Location"),
  ]);

  async function getthechangedvalue(paras) {
    // Redux_Dispatch({ type: "GET Data", payload: userID });

    // paras.user_id = userID;
    dispatch1({ type: "Is_filter_clicked" });
    goBack();
    // try {
    //   await fetch(`http://192.168.1.20:5000/api/job_fillter`, {
    //     method: "POST", // *GET, POST, PUT, DELETE, etc.
    //     mode: "cors", // no-cors, *cors, same-origin
    //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: "same-origin", // include, *same-origin, omit
    //     headers: {
    //       "Content-Type": "application/json",
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: JSON.stringify(paras),
    //   })
    //     .then((response) => response.json())
    //     .then((result) => {
    //
    //       goBack();
    //     });
    // } catch (error) {
    //   console.warn(error);
    // }
  }
  const setStatusFilter = (status) => {
    if (status !== "Location") {
      setDataList([...data.filter((e) => e.status === status)]);
    } else {
      setDataList([...data.filter((e) => e.status === "Location")]);
    }

    setStatus(status);
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 19,
          borderRadius: 10,
        }}
      >
        <ScrollView style={{ width: "93%", borderRadius: 10 }}>
          <View
            style={{
              // backgroundColor: "red",
              height: "100%",

              // justifyContent: "space-evenly",
            }}
          >
            <ScrollView horizontal style={{ height: "30%" }}>
              <View
                style={{
                  height: 40,
                  // width: 60,
                  borderRadius: 10,
                  justifyContent: "center",
                  backgroundColor: state1.states == "$" ? "#fff" : "#eefbff",
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
                  {state1.states == "$" ? "" : state1.states}
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  // width: 60,
                  borderRadius: 10,
                  justifyContent: "center",
                  backgroundColor: state1.district == "$" ? "#fff" : "#eefbff",
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
                  {state1.district == "$" ? "" : state1.district}
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  // width: 60,
                  borderRadius: 10,
                  justifyContent: "center",
                  backgroundColor: state1.job_title == "$" ? "#fff" : "#eefbff",
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
                  {state1.job_title == "$" ? "" : state1.job_title}
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  // width: 60,
                  borderRadius: 10,
                  justifyContent: "center",
                  backgroundColor: state1.duration == "$" ? "#fff" : "#eefbff",
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
                  {state1.duration == "$" ? "" : state1.duration}
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  // width: 60,
                  borderRadius: 10,
                  justifyContent: "center",
                  backgroundColor: state1.salary == "$" ? "#fff" : "#eefbff",
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
                  {state1.salary == "$" ? "" : state1.salary}
                </Text>
              </View>
              {/* <View
                style={{
                  height: 40,
                  // width: 60,
                  borderRadius: 10,
                  justifyContent: "center",
                  backgroundColor: "#eefbff",
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
              >
                <Text style={{}}>
                  {state1.salary == "$" ? "" : state1.salary}
                </Text>
              </View> */}
            </ScrollView>
          </View>
        </ScrollView>
      </View>

      {/* <View style={{ flexDirection: "row" }}> */}
      <View style={styles.container}>
        <View style={styles.listTab}>
          {listTab.map((e) => {
            return (
              <>
                <View
                  style={{
                    // backgroundColor: "red",
                    marginVertical: "10%",
                    height: "18%",
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
              </>
            );
          })}
        </View>

        <FlatList
          scrollEnabled={false}
          data={dataList}
          keyExtractor={(e, i) => i.toString()}
          renderItem={renderItem}
        />
        {/* <View style={{ backgroundColor: "red", marginRight: -30 }}>
          <Text>Choose your preference</Text>
        </View> */}
      </View>
      {/* </View> */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          marginTop: "-20%",
          marginBottom: "7%",
        }}
      ></View>

      <View
        style={{
          alignItems: "center",
          // backgroundColor: "#EEFBFF",
        }}
      >
        <TouchableOpacity
          onPress={() => getthechangedvalue(state1)}
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
    </View>
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
  container: {
    // flex: 1,
    flexDirection: "row",
    height: 530,
    // paddingHorizontal: 1,
    // backgroundColor: "#EEFBFF",
    justifyContent: "center",
  },
  listTab: {
    borderColor: "#acacac",
    borderWidth: 1,
    height: "60%",
    width: "20%",
    // paddingVertical: "5%",
    backgroundColor: "#FFF",
    flexDirection: "column",
    // justifyContent: "space-evenly",
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: "10%",
    paddingTop: 35,
    // marginLeft: 5,
    // borderRadius: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,

    // backgroundColor: "red",
  },
  btnTab: {
    // width: 0,
    // flexDirection: "column",
    // marginBottom: 5,
    // marginTop: "5%",
    height: 70,
    marginBottom: 40,
    // backgroundColor: "red",
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
    height: 50,
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
    // marginTop: 100,
  },
  // itemName: {
  //   fontWeight: "bold",
  //   fontSize: 20,
  //   marginBottom: 5,
  // },
});
