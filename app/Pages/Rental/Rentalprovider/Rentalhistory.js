//import liraries
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import Nodata from "../../../Lottie/Nodata";
import LottieViewloading from "../../../components/Loading";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { LocalizationContext } from "../../../../App";

// create a component

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
const Item = ({ product_name, date, pic }) => {
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
    <View style={{ flex: 1, marginBottom: 5, marginTop: 10 }}>
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
        {/* <View
          style={{
            width: 50,
            marginTop: 5,
            position: "absolute",
          }}
        >
          <Image
            source={{
              uri: "https://images.pexels.com/photos/442559/pexels-photo-442559.jpeg?auto=compress&cs=tinysrgb&w=600",
            }}
            style={{
              backgroundColor: "purple",
              width: 46,
              height: 46,
              //   marginTop: 3,
              borderRadius: 110,
              resizeMode: "cover",
              // borderColor: "#f6ab03",
              // borderWidth: 1,
            }}
          />
        </View> */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          <View>
            <Image
              source={{
                uri: pic,
              }}
              style={{
                backgroundColor: "#EEFBFF",
                width: 50,
                height: 50,
                //   marginTop: 3,
                borderRadius: 7,
                borderColor: "#1e5966",
                borderWidth: 1,
                resizeMode: "cover",

                // borderColor: "#f6ab03",
                // borderWidth: 1,
              }}
            />
          </View>
          <View style={{ marginLeft: "5%", width: "80%" }}>
            <Text
              style={{
                color: "#333",
                fontSize: 18,
                // marginHorizontal: 10,
                fontWeight: "500",
              }}
            >
              {product_name}
            </Text>

            <Text
              style={{
                color: "#535353",
                fontSize: 13,
                marginTop: "4%",
                fontWeight: "400",
              }}
            >
              Rented on : {result}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
function Rentalproducthistory({ navigation }) {
  const [isclick, setIsclick] = useState(false);
  const { t, language, setlanguage } = useContext(LocalizationContext);

  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setloading] = useState(true);
  const [nodata, setnodata] = useState(false);

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text) => {
    setSearchQuery(text);
  };
  const filteredData = data.filter((item) =>
    item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const userID = useSelector((state) => state.ID);
  useEffect(() => {
    getuserdata();
  }, []);
  React.useEffect(() => {
    navigation.addListener("tabPress", () => getuserdata());
  }, []);
  async function getuserdata() {
    try {
      await fetch(`http://103.174.10.108:5002/api/rented_products/${userID}`, {
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
        .then((result) => {
          console.log("hiii");
          if (result.rented.length == 0) {
            setnodata(true);
            setloading(false);
          } else {
            setData(result.rented);
            setloading(false);
            setnodata(false);
            setRefreshing(false);
          }
          // console.log(result.rented);
          // if (result.rented) setData(result.rented);
          // setRefreshing(false);
        });
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#eefbff" }}>
      {/* tob bar */}
      <View style={{ flex: 1 }}>
        <View
          style={{
            //   justifyContent: "center",
            //   alignContent: "center",
            marginVertical: 10,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "500", fontSize: 22, color: "#333" }}>
            {t("History")}
          </Text>
        </View>

        <SafeAreaView style={styles.containers}>
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
            <>
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
                    underlineColorAndroid="transparent"
                    placeholder={t("search_by_product_title")}
                    onChangeText={handleSearch}
                    value={searchQuery}
                    style={{
                      marginLeft: 10,
                      width: "75%",
                      // marginRight: "15%",
                      fontSize: language == "English" ? 12 : 12,
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
                        Alert.alert(
                          "Our new features are just around the corner."
                        );
                      }}
                    >
                      <FontAwesome
                        name="microphone"
                        size={22}
                        color="#707070"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                  <Item
                    product_name={item.product_name}
                    date={item.renteddatetime}
                    pic={item.pic}
                  />
                )}
                keyExtractor={(item) => item.id}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={getuserdata}
                  />
                }
              />
            </>
          )}
        </SafeAreaView>
      </View>
      <View style={{ height: "8%" }} />
    </View>
  );
}
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: "red",
    justifyContent: "space-between",
    alignItems: "flex-end",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
  containers: {
    flex: 1,
    backgroundColor: "#eefbff",
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  leftSide: {
    flex: 0.5,
  },
  rightContainer: {
    flex: 0.7,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});

//make this component available to the app
export default Rentalproducthistory;
