//import liraries
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";

// create a component

export default function Faq() {
  const [isclick, setIsclick] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
          <Text style={{ fontWeight: "700", fontSize: 20 }}>FAQ </Text>
        </View>

        {/* <View
          style={{
            width: 280,
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
            marginVertical: 15,
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <EvilIcons name="search" size={24} color="#707070" />
          </View>
          <TextInput
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search here"
            style={{ marginLeft: 10 }}
          />
          <View
            style={{
              marginLeft: 130,
              marginTop: 5,
            }}
          >
            <FontAwesome name="microphone" size={24} color="#707070" />
          </View>
        </View> */}
      </View>

      <ScrollView style={{ height: "80%" }}>
        <View
          style={{
            // justifyContent: "center",
            // alignContent: "center",
            // alignItems: "center",
            marginHorizontal: 13,
          }}
        >
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            1. What is this job portal application and how does it work?
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            This job portal application helps job seekers find and apply to job
            opportunities that match their qualifications and interests.
            Employers can also use the application to find and hire qualified
            can- didates for their job openings.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            2. How do I create an account?
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            To create an account, simply click on the "OTP Verification" button
            and follow the prompts to enter your personal information and create
            a Account.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            3. How do I search for job opportunities?
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            To search for job opportunities, click on the "Search Jobs" button
            and enter your search criteria, such as job title, location, or
            keyword. You can also save your search criteria to receive email
            alerts when new job opportunities that match your criteria become
            available.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            4. How do I apply to job opportunities?
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            To apply to a job opportunity, click on the "Apply Now" button and
            follow the prompts to submit your application, including your resume
            and cover letter.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            5. How do I manage my account?{" "}
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            To manage your account, log in to your account and click on the
            "Profile" icon. From there, you can update your personal
            information, change your password, and view your job application
            history.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            6. Is my personal information secure?
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            Yes, we take the security of your personal infor- mation seriously
            and have implemented various security measures to protect it.
            However, please note that no data transmission over the internet can
            be guaranteed to be 100% secure.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            7. How do I contact an employer?
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            To contact an employer, click on the "Call" button and follow the
            prompts to send a message to the employer.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            8. Can I delete my account?
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            No, you can’t delete your account.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            9. How do I report inappropriate content or behavior?
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            If you encounter any inappropriate content or behavior on the job
            portal application, please contact us immediately so we can
            investigate and take appropriate action.
          </Text>

          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            10. How do I get help or support?
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            If you need help or support, please contact us at [insert contact
            information] and we will be happy to assist you.
          </Text>
        </View>
      </ScrollView>
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
