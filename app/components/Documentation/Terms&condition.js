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

export default function Termscondition() {
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
          <Text style={{ fontWeight: "700", fontSize: 20 }}>
            Terms & Conditions
          </Text>
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
            1. Introduction
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            Welcome to our job portal application. By using our application, you
            agree to comply with these terms and conditions.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            2. Use of the Application
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            You must be at least 18 years of age to use our job portal
            application. By using our application, you agree that you will not:
            Use our application for any unlawful purpose Violate any applicable
            laws, rules or regulati- ons Use the application to transmit any
            harmful or offensive content Misrepresent your identity or
            qualifications Use the application to spam or harass other users
            Attempt to access or use another user's account without their
            permission We reserve the right to terminate your access to our
            application at any time if we believe you have violated any of these
            terms and conditions.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            3. User Accounts
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            To use certain features of our job portal applica- tion, you may
            need to create an account. You agree to provide accurate and
            complete informa -tion when creating your account and to keep your
            account information up-to-date. You are responsible for maintaining
            the confiden -tiality of your account credentials, and for all
            activities that occur under your account. You agree to notify us
            immediately if you become aware of any unauthorized use of your
            account.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            4. Intellectual Property
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            Our job portal application and all of its content are protected by
            intellectual property laws. You may not copy, modify, distribute, or
            create deriva -tive works based on our application without our prior
            written consent.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            5. Disclaimer of Warranties
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            Our job portal application is provided on an "as is" and "as
            available" basis. We do not make any warranties or representations,
            express or implied, about the operation of the application or the
            inf- ormation, content, materials, or products included on the
            application.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            6. Limitation of Liability
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            In no event shall we be liable for any direct, indir- ect,
            incidental, special, or consequential damag- es arising out of or in
            any way connected with the use of our job portal application,
            whether based on contract, tort, strict liability, or other legal
            theory.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            7. Indemnification
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            You agree to indemnify and hold us harmless from any claims,
            damages, losses, and expenses (including reasonable attorneys' fees)
            arising out of or in connection with your use of our job portal
            application or any breach of these terms and co- nditions.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            8. Modification of Terms and Conditions
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            We reserve the right to modify these terms and conditions at any
            time. You agree to review these terms and conditions periodically to
            be aware of any modifications.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            9. Governing Law
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            These terms and conditions are governed by the laws of [insert
            governing jurisdiction]. Any disp- utes arising out of or in
            connection with these terms and conditions shall be resolved by the
            courts of [insert governing jurisdiction].
          </Text>

          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            10. Contact Us
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            If you have any questions or concerns about these terms and
            conditions, please contact us at [insert contact information].
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
// define your styles

//make this component available to the app
