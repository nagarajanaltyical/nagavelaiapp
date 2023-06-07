//import liraries
import React, { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import { LocalizationContext } from "../../../../App";
import LottieViewloading from "../../../components/Loading";
import Nodata from "../../../Lottie/Nodata";
import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";

//Data
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
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

//flatlist item for the page

// create a component
export default function Rentalproviderpost({ navigation, route }) {
  const [data, setdata] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  const [nodata, setnodata] = useState(false);
  const [loading, setloading] = useState(true);

  // const [isclick, setisclick] = useState(false);
  const userID = useSelector((state) => state.ID);
  const { t, language, setlanguage } = useContext(LocalizationContext);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      // callback
      getuserdata();
      // LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    }
  }, [isFocused]);
  useEffect(() => {
    getuserdata();
  }, []);
  React.useEffect(() => {
    navigation.addListener("tabPress", () => getuserdata());
  }, []);
  const handleRentedProducts = async (paras, paras2) => {
    const body = {};
    body.user_id = paras;
    body.rent_id = paras2;

    try {
      await fetch(`http://103.174.10.108:5002/api/rented_products`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.rented === "success") {
            navigation.navigate("history");
          }
        });
    } catch (error) {
      console.warn(error);
    }
  };
  async function getuserdata() {
    try {
      await fetch(
        `http://103.174.10.108:5002/api/rent_pro_post_show/${userID}`,
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log("im the data");
          console.log(result.posts.length);
          if (result.posts.length == 0) {
            setnodata(true);
            setloading(false);
          } else {
            setdata(result.posts);
            setloading(false);
            setnodata(false);
            setRefreshing(false);
          }
          // setdata(result.posts);
          // setRefreshing(false);
        });
    } catch (error) {
      console.warn(error);
    }
  }
  //user
  const Items = ({ date, type, title, pic, post_id, user_id, is_rent }) => {
    const returndate = (paras) => {
      const date = new Date(paras);

      // Extract the date and time components from the Date object
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // add 1 to get 1-12 range instead of 0-11
      const day = date.getDate();

      // Construct the readable date string in your desired format
      const readableDate = `${day}/${month}/${year}`;
      return readableDate;
    };
    const result = returndate(date);
    return (
      <View
        style={{
          flex: 1,
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("rentalproviderbriefswipe", {
              post_id: post_id,
            })
          }
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
            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: "column",
                      // backgroundColor: "green",
                      width: "75%",
                    }}
                  >
                    <Text
                      style={{
                        color: "#333",
                        fontSize: 18,
                        marginBottom: 10,
                        fontWeight: "500",
                        width: "90%",
                        // backgroundColor: "red",
                        // marginTop: 10,
                        // marginLeft: 10,
                      }}
                    >
                      {title}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginBottom: "3%",
                        marginTop: "3%",

                        alignItems: "center",
                      }}
                    >
                      <Image
                        resizeMode="contain"
                        style={{ height: 15, width: 15, marginRight: "5%" }}
                        source={require("../../../images/category.png")}
                      />
                      <Text
                        style={{
                          // marginTop: 3,
                          color: "#535353",
                          width: "90%",
                          // backgroundColor: "red",
                          // marginLeft: 10,
                          fontSize: 13,
                          fontWeight: "400",
                        }}
                      >
                        {type}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: "3%",

                        alignItems: "center",
                      }}
                    >
                      <Image
                        resizeMode="contain"
                        style={{ height: 15, width: 15, marginRight: "5%" }}
                        source={require("../../../images/calendar.png")}
                      />
                      <Text
                        style={{
                          // marginTop: 3,
                          color: "#535353",
                          // marginLeft: 10,
                          fontSize: 13,
                          // backgroundColor: "red",
                          width: "90%",

                          fontWeight: "400",
                        }}
                      >
                        {result}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      // backgroundColor: "blue",
                      width: "20%",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{
                        uri: pic,
                      }}
                      style={{
                        backgroundColor: "#EEFBFF",
                        width: 70,
                        height: 70,
                        //   marginTop: 3,
                        borderRadius: 10,
                        borderColor: "#1e5966",
                        borderWidth: 1,
                        resizeMode: "cover",
                        // borderColor: "#f6ab03",
                        // borderWidth: 1,
                      }}
                    />
                    {/* <View
                style={{
                  marginLeft: 20,
                  backgroundColor: "blue",
                  padding: 8,
                  borderRadius: 20,
                }}
              >
               
              
              </View>  */}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: "3%",
                    // width: "100%",
                    marginTop: "-2%",
                    justifyContent: "flex-end",
                    // backgroundColor: "red",
                    // alignItems: "center",
                    marginRight: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#535353",
                      marginTop: "3%",
                      textDecorationLine: "underline",
                      marginRight: "2%",
                    }}
                  >
                    {is_rent == "false" ? "Is this Rented?" : ""}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleRentedProducts(user_id, post_id)}
                    disabled={is_rent == "true" ? true : false}
                  >
                    <LinearGradient
                      colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
                      style={{
                        height: 25,
                        width: 63,
                        borderRadius: 7,
                        marginLeft: "1%",
                        opacity: is_rent == "true" ? 0.5 : 1,
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
                          color: "#fff",
                          fontSize: 15,
                          fontWeight: "400",
                        }}
                      >
                        {is_rent == "true" ? "Rented" : "Rent"}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          // marginBottom: 20,
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
      {/* <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "500",
              color: "#333",
            }}
          >
            Rent Product
          </Text>
        </View> */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginHorizontal: 20,
          borderBottomWidth: 0.5,
          borderBottomColor: "#D9D9D9",
          // alignItems: "center",
          // alignContent: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Rent")}>
          <LinearGradient
            colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
            style={{
              height: 42,
              width: 320,
              borderRadius: 10,
              marginTop: 20,
              marginBottom: 20,
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
                fontSize: 18,
                fontWeight: "500",
                marginHorizontal: 10,
                justifyContent: "center",
              }}
            >
              {t("Add_Your_Rental_Product")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        {/* <TouchableOpacity>
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
                  fontSize: 18,
                  fontWeight: "600",
                  marginHorizontal: 10,
                  justifyContent: "center",
                }}
              >
                Shorttime Job
              </Text>
            </LinearGradient>
          </TouchableOpacity> */}
      </View>

      {/* <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          marginVertical: 30,
        }}
      >
        <Text></Text>
        <Image
          style={{
            height: "50%",
            width: "100%",

            resizeMode: "contain",
          }}
          source={require("../../../images/jobpost.png")}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 15, fontWeight: "600" }}>
            Don’t have an any post
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "600" }}>
            create your post
          </Text>
        </View>
      </View> */}
      <View style={{ flex: 1 }}>
        {loading ? (
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              marginVertical: "50%",
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
                marginTop: "30%",
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
              marginTop: "70%",
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
              <Text
                style={{ fontSize: 20, fontWeight: "500", color: "#1e5966" }}
              >
                No data found
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={data}
            decelerationRate="fast"
            renderItem={({ item }) => (
              <Items
                title={item.product_name}
                type={item.product_type}
                date={item.posteddatetime}
                is_rent={item.rent}
                pic={item.pic}
                post_id={item.id}
                user_id={userID}
              />
            )}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getuserdata} />
            }
          />
        )}
      </View>
      <View style={{ height: "8%" }} />
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eefbff",
  },
});

//make this component available to the app
