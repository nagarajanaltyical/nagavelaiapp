import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Linking,
  RefreshControl,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import LottieViewloadingmodal from "../components/Loadinmodal";
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

const Item = ({ title, email, number, resume }) => (
  <View style={{ flex: 1, marginBottom: 20, marginTop: 10 }}>
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
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="person" size={20} color="#1E5966" />
          <Text
            style={{
              color: "#535353",
              fontSize: 16,
              marginBottom: 12,
              marginLeft: 12,

              fontWeight: "400",
              width: "90%",
              // backgroundColor: "red",
              // marginTop: 10,
              // marginLeft: 10,
            }}
          >
            {title}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="ios-mail" size={20} color="#1E5966" />
          <Text
            style={{
              color: "#535353",
              fontSize: 16,
              marginBottom: 12,
              marginLeft: 12,

              fontWeight: "400",
              width: "90%",
              // backgroundColor: "red",
              // marginTop: 10,
              // marginLeft: 10,
            }}
          >
            {email}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="ios-call" size={20} color="#1E5966" />
          <Text
            style={{
              color: "#535353",
              fontSize: 16,
              marginBottom: 10,
              marginLeft: 12,
              fontWeight: "400",
              width: "90%",
              // backgroundColor: "red",
              // marginTop: 10,
              // marginLeft: 10,
            }}
          >
            {number}
          </Text>
        </View>
        {resume == "" ? (
          ""
        ) : (
          <View style={{ flexDirection: "row", marginLeft: 5 }}>
            <FontAwesome5 name="file-download" size={20} color="#1E5966" />
            <Text
              style={{
                color: "#333",
                fontSize: 18,
                marginBottom: 10,
                marginLeft: 15,

                fontWeight: "500",
                width: "90%",
                textDecorationLine: "underline",
                // backgroundColor: "red",
                // marginTop: 10,
                // marginLeft: 10,
              }}
              onPress={() => Linking.openURL(resume)}
            >
              Resume
            </Text>
          </View>
        )}
      </View>
    </View>
  </View>
);

const JOBApplied = ({ route }) => {
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const [data, setdata] = useState("");

  useEffect(() => {
    if (route.params.short === "True") {
      submitdata(route.params.id);
    } else {
      submitdata1(route.params.id);
    }
  }, []);
  async function submitdata(paras1) {
    try {
      await fetch(`http://103.174.10.108:5002/api/job_s_apply_user/${paras1}`, {
        method: "GET",
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
          var newdata = result["user"];

          setdata(newdata);
          setloading(false);
        });
    } catch (error) {
      console.warn(error);
    }
  }
  async function submitdata1(paras1) {
    try {
      await fetch(`http://103.174.10.108:5002/api/job_l_apply_user/${paras1}`, {
        method: "GET",
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
          var newdata = result["user"];
          setdata(newdata);
          setloading(false);
        });
    } catch (error) {
      console.warn(error);
    }
  }
  if (loading) {
    return <LottieViewloadingmodal />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: "500",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Applied Candidates
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            title={item.username}
            email={item.emailid}
            number={item.number}
            resume={item.resume}
          />
        )}
        keyExtractor={(item) => item.id}
        //   keyExtractor={(item) => item.id}
        // refreshControl={
        // //   <RefreshControl
        // //     refreshing={refreshing}
        // //     onRefresh={
        // //       route.params.short == "True"
        // //         ? submitdata(route.params.id)
        // //         : submitdata1(route.params.id)
        // //     }
        // //   />
        // }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEFBFF",
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
});

export default JOBApplied;
