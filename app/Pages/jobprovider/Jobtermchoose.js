import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { AuthContext } from "../../../App";
import { useContext } from "react";
import { useDispatch } from "react-redux";
// create a component
function Jobmainselect({ naviagtion }) {
  const { state, dispatch } = useContext(AuthContext);
  //use selector
  const job_provider_info = useSelector((state) => state.job_provider_info);
  const is_company_provider = useSelector(
    (state) => state.job_Provider_company_user_details
  );
  const redux_dispatch = useDispatch();

  const navigation = useNavigation();
  const handlecall = () => {
    // redux_dispatch({ type: "personal_job_provider" });
    // if (job_provider_info) {
    //   navigation.navigate("jobprovidebottamtab");
    // } else {
    navigation.navigate("p_job_provider", { screen: "post" });
    // }
  };
  const handlecall2 = () => {
    // redux_dispatch({ type: "job_Provider_company" });
    // if (job_provider_info) {
    //   navigation.navigate("jobprovidebottamtab");
    // } else {
    navigation.navigate("c_job_provider", { screen: "post" });
    // }
  };

  return (
    <>
      <StatusBar style="auto" />
      {/* <View style={styles.container}> */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: "#333",
            fontSize: 22,
            fontWeight: "500",
            marginHorizontal: 10,
            marginTop: "10%",
            justifyContent: "center",
          }}
        >
          Choose Your Account Type
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
          marginTop: "50%",
        }}
      >
        <TouchableOpacity onPress={() => handlecall()}>
          <LinearGradient
            colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
            style={{
              height: 42,
              width: 200,
              borderRadius: 10,
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: "3%",
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            useAngle={45}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "500",
                marginHorizontal: 10,
                justifyContent: "center",
              }}
            >
              Personal Account
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlecall2()}>
          <LinearGradient
            colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
            style={{
              height: 42,
              width: 200,
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
                fontSize: 16,
                fontWeight: "500",
                marginHorizontal: 10,
                justifyContent: "center",
              }}
            >
              Business Account
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignContent: "center",
    // alignItems: "center",
  },
});

//make this component available to the app
export default Jobmainselect;
