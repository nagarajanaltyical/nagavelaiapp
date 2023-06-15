//import liraries
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Pressable,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  TextInput,
  Search,
  Image,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import Top from "../components/Topcontainer";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Octicons,
  SimpleLineIcons,
  EvilIcons,
  Entypo,
} from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { Use } from "react-native-svg";
import Top2 from "../components/Topcontainer2";
import LottieViewloading from "../components/Loading";

//get a item

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

//onshare
//on share
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

const Items = ({
  title,
  sal,
  per,
  time,
  loc,
  page,
  Dis,
  name,
  short,
  longs,
  shortID,
  Id,
  navigation,
}) => (
  <View style={{ flex: 1, marginBottom: 20, marginTop: 10 }}>
    <TouchableWithoutFeedback
      onPress={() => {
        // console.log("how are you?");
        // console.log(longs);
        // console.log(short == "True" ? shortID : longs),
        //   console.log(short),
        //   navigation.navigate({
        //     post_id: short == "True" ? shortID : longs,
        //     table_name: short == "True" ? "shorttime_job" : "long_job_post",
        //     page: page,
        //   });
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
        <View style={{ marginHorizontal: 10 }}>
          <Text
            style={{
              color: "#333",
              fontSize: 18,
              fontWeight: "500",
              width: "95%",
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 10,
            }}
          >
            {title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              // backgroundColor: "red",
              marginBottom: 10,

              width: "98%",
            }}
          >
            <Image
              // resizeMode="contain"
              source={require("../images/history.png")}
              style={{ width: 23, height: 23 }}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 13,
                fontWeight: "400",
              }}
            >
              {time}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
              width: "98%",
              // backgroundColor: "red",
            }}
          >
            <Image
              // resizeMode="contain"
              source={require("../images/link.png")}
              style={{ width: 16, height: 16 }}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 13,
                width: "90%",
                color: "#0047FF",
                lineHeight: 20,
                textDecorationLine: "underline",

                fontWeight: "400",
              }}
              onPress={() => {
                Linking.openURL(loc);
              }}
            >
              {loc}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </View>
);

// create a component

const GovJobList = ({ navigation, route }) => {
  // const [search, setSearch] = useState("");
  const [search, setSearch] = useState("");

  const user_id = useSelector((state) => state.ID);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  useEffect(() => {
    fetchdata();
  }, []);
  React.useEffect(() => {
    navigation.addListener("tabPress", () => fetchdata());
  }, []);

  async function fetchdata() {
    try {
      await fetch(`http://103.174.10.108:5002/api/govt_job_post_show`, {
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
          setRefreshing(false);
          var newdata = result;

          setdata(newdata);
          setloading(false);
        });
    } catch (error) {
      console.warn(error);
    }
  }
  const handleSearch = (text) => {
    setSearchQuery(text);
  };
  const filteredData = data.filter((item) =>
    item.job_title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (loading && data.length > 0) {
    return <LottieViewloading />;
  }
  return (
    <View style={{ backgroundColor: "#EEFBFF", flex: 1 }}>
      {/* <Top2 /> */}
      <Text
        style={{
          textAlign: "center",
          fontSize: 22,
          fontWeight: "500",
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        Government Jobs
      </Text>
      {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: "87%",
            height: 35,
            borderWidth: 1,
            // paddingLeft: 20,
            // margin: 5,

            justifyContent: "space-evenly",
            flexDirection: "row",
            borderRadius: 20,
            // marginLeft: 200,
            borderColor: "#707070",
            backgroundColor: "#fffff",
            marginHorizontal: 55,
            marginVertical: 20,
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <EvilIcons name="search" size={22} color="#707070" />
          </View>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Search by Jobtitle"
            onChangeText={handleSearch}
            value={searchQuery}
            style={{ marginLeft: 10 }}
          />
          <View
            style={{
              marginLeft: 130,
              marginTop: 5,
            }}
          >
            <FontAwesome name="microphone" size={22} color="#707070" />
          </View>
        </View>
      </View> */}
      <SafeAreaView style={styles.container}>
        <View>
          {refreshing ? <ActivityIndicator /> : null}
          {console.log(data)}
          <FlatList
            data={filteredData}
            decelerationRate="fast"
            renderItem={({ item }) => (
              <Items
                title={item.job_title}
                sal={item.Salary}
                per={item.per}
                time={item.Expiry_date}
                name={item.username}
                loc={item.link}
                page={route.name}
                Dis={item.distance}
                short={item.link}
                longs={item.long_id}
                shortID={item.short_id}
                Id={item.id}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.link}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchdata} />
            }
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default GovJobList;
