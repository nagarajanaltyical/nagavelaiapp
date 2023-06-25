//import liraries
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  View,
  Alert,
} from "react-native";
import LottieViewloading from "../../../components/Loading";
import Nodata from "../../../Lottie/Nodata";
import { LocalizationContext } from "../../../../App";

import {
  EvilIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useContext } from "react";
import { useSelector } from "react-redux";

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

const Item = ({ dur2, loc, per, price, pic, title, dur, navigation, id }) => (
  <View
    style={{
      flex: 1,
      marginBottom: 20,
      marginTop: 10,
    }}
  >
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 15,
        height: "100%",
        width: "90%",
        marginLeft: "5%",
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
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("rentalproviderswipe", {
              post_id: id,
            })
          }
        >
          <View
            style={{
              flexDirection: "column",
              width: "75%",
              // backgroundColor: "green",
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#333",
                  fontSize: 18,
                  marginBottom: 10,
                  fontWeight: "500",
                  width: "80%",
                  // backgroundColor: "red",
                  // marginTop: 10,
                  marginLeft: 10,
                }}
              >
                {title}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                marginLeft: 10,
                // backgroundColor: "red",
                width: "80%",
                alignContent: "center",
              }}
            >
              <Image
                // resizeMode="contain"
                source={require("../../../images/rupee.png")}
                style={{ width: 18, height: 18 }}
              />
              <Text
                style={{
                  // marginTop: 3,
                  color: "#535353",

                  marginLeft: 10,
                  fontSize: 13,
                  fontWeight: "400",
                }}
              >
                {price} {per}
              </Text>
            </View>

            <View
              style={{
                // backgroundColor: "red",
                flexDirection: "row",
                marginBottom: 10,
                // width: 150,
                marginLeft: 10,
                // marginTop: 8,
                width: "80%",

                alignContent: "center",
              }}
            >
              {/* <MaterialCommunityIcons
                name="calendar-clock"
                size={20}
                color="#333"
              /> */}
              <Image
                // resizeMode="contain"
                source={require("../../../images/history.png")}
                style={{ width: 19, height: 23 }}
              />
              <Text
                style={{
                  // marginTop: 3,
                  color: "#535353",

                  marginLeft: 10,
                  fontSize: 13,
                  fontWeight: "400",
                }}
              >
                {dur} {dur2}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                marginLeft: 10,
                width: "80%",
                marginBottom: 20,
                alignContent: "center",
              }}
            >
              <Image
                // resizeMode="contain"
                source={require("../../../images/mappin.png")}
                style={{ width: 18, height: 18 }}
              />
              {/* <Entypo name="location-pin" size={20} color="#333" /> */}
              <Text
                style={{
                  // marginTop: 3,
                  color: "#535353",
                  lineHeight: 18,
                  marginLeft: 10,
                  fontSize: 13,
                  fontWeight: "400",
                }}
              >
                {loc}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            position: "relative",
            flexDirection: "column",
            marginLeft: -8,
            // backgroundColor: "red",
            // width: "18%",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginTop: "-4%",
              // backgroundColor: "red",
              width: "80%",
              paddingLeft: 23,
              // justifyContent: "flex-end",

              // marginLeft: "5%",
            }}
          >
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
                color="#56909d"
              />
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: pic,
            }}
            style={{
              backgroundColor: "#eefbff",
              width: 60,
              height: 60,
              //   marginTop: 3,
              borderRadius: 10,
              borderColor: "#1e5966",
              borderWidth: 1,
              resizeMode: "cover",

              // borderColor: "#f6ab03",
              // borderWidth: 1,
            }}
          />
        </View>
      </View>
    </View>
    {/* <View style={{ height: "25%" }}></View> */}
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
// create a component
function Rentalseeker({ navigation }) {
  const [search, setSearch] = useState("");
  const { t, language, setlanguage } = useContext(LocalizationContext);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setloading] = useState(true);
  const [nodata, setnodata] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const UserID = useSelector((state) => state.ID);
  useEffect(() => {
    getData();
  }, []);
  React.useEffect(() => {
    navigation.addListener("tabPress", () => getData());
  }, []);
  const handleSearch = (text) => {
    setSearchQuery(text);
  };
  const filteredData = data.filter((item) =>
    item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const getData = async () => {
    try {
      await fetch(
        `http://103.174.10.108:5002/api/rental_see_call_history/${UserID}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log("result");
          console.log(result);
          if (result.length == 0) {
            setnodata(true);
            setloading(false);
            setRefreshing(false);
          } else {
            setData(result);
            setloading(false);
            setnodata(false);
            setRefreshing(false);
          }
          // setData(result);
          // setRefreshing(false);
          // const updated = [...data, ...result["short"]];
          //
          // // setnewcards();
          // // setData(result["short"]);
          // setData(updated);
          //
          // setpage(page + 1);
          // setloading(false);
        });
    } catch (error) {}
  };
  return (
    <View style={styles.container}>
      {/* <Top /> */}
      {/* tob bar */}
      {/* center */}
      {/* <LinearGradient
        colors={["#fafafa", "#fafafa"]}
        style={{ flex: 1, backgroundColor: "#F2F2F2" }}
      > */}

      <View
        style={{
          //   justifyContent: "center",
          //   alignContent: "center",
          // marginVertical: 15,
          width: "100%",
          backgroundColor: "#eefbff",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 20 }}>
          {t("saved_products")}
        </Text>
      </View>

      {refreshing ? <ActivityIndicator /> : null}
      {loading ? (
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
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
        </View>
      ) : nodata ? (
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            marginTop: "60%",
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
            <Text style={{ fontSize: 20, fontWeight: "500", color: "#1e5966" }}>
              No data found
            </Text>
          </View>
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <View
            style={{
              width: "75%",
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
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                // marginRight: 30,
              }}
            >
              <EvilIcons name="search" size={22} color="#707070" />
              <TextInput
                onChangeText={handleSearch}
                value={searchQuery}
                underlineColorAndroid="transparent"
                placeholder={t("Search_here")}
                style={{
                  marginLeft: 10,
                  width: "75%",
                  fontSize: language == "English" ? 12 : 10,
                }}
              />
              <View
                style={{
                  // marginTop: 5,
                  marginLeft: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert("Our new features are just around the corner.");
                  }}
                >
                  <FontAwesome name="microphone" size={24} color="#707070" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <Item
                title={item.product_name}
                pic={item.pic}
                id={item.id}
                price={item.product_fees}
                per={item.product_fees_hour}
                loc={item.location}
                dur={item.Duration}
                navigation={navigation}
                dur2={item.Duration2}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      )}
      <View style={{ height: "8%" }}></View>
    </View>
  );
}

export default Rentalseeker;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eefbff",

    // backgroundColor: "#eefbff",

    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#eefbff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
