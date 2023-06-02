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
import { Entypo } from "@expo/vector-icons";
import {
  EvilIcons,
  FontAwesome,
  FontAwesome5,
  Octicons,
} from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";

// create a component

export default function Privacypolicy() {
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
            Privacy Policy
          </Text>
        </View>
      </View>

      <ScrollView style={{ height: "80%" }}>
        <View
          style={{
            // justifyContent: "center",
            // alignContent: "center",
            // alignItems: "center",
            marginHorizontal: 14,
          }}
        >
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            1.Introduction
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            Our job portal is committed to protecting the privacy and personal
            information of our users. This privacy policy outlines how we
            collect, use, and protect the personal information of our users.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            2. Information We Collect
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            We collect personal information from users who register on our job
            portal. This information includes:
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                lineHeight: 20,
                marginLeft: 8,
                color: "#707070",
              }}
            >
              -Name
            </Text>
            <Text
              style={{
                lineHeight: 20,
                marginLeft: 8,
                color: "#707070",
              }}
            >
              - Contact - information, such as email address and phone number
            </Text>
            <Text
              style={{
                lineHeight: 20,
                marginLeft: 8,
                color: "#707070",
              }}
            >
              - Employment history
            </Text>
            <Text
              style={{
                lineHeight: 20,
                marginLeft: 8,
                color: "#707070",
              }}
            >
              - Education and qualifications
            </Text>
            <Text
              style={{
                lineHeight: 20,
                marginLeft: 8,
                color: "#707070",
              }}
            >
              - Professional skills and experience In addition to this.
            </Text>
          </View>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            we may also collect non-perso -nal information, such as job
            preferences and search history.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            3. How We Use Your Information
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            We use the information that we collect for the following purposes:
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                lineHeight: 20,
                marginLeft: 8,
                color: "#707070",
              }}
            >
              - To match job seekers with potential job oppor -tunities
            </Text>
            <Text
              style={{
                lineHeight: 20,
                marginLeft: 8,
                color: "#707070",
              }}
            >
              - To communicate with job seekers about job opportunities
            </Text>
            <Text
              style={{
                lineHeight: 20,
                marginLeft: 8,
                color: "#707070",
              }}
            >
              - To improve our job portal and user experience
            </Text>
            <Text
              style={{
                lineHeight: 20,
                marginLeft: 8,
                color: "#707070",
              }}
            >
              - To comply with legal requirements
            </Text>
          </View>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            We may also use non-personal information to im -prove our job portal
            and services.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            4. Sharing Your Information
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            We may share your personal information with potential employers who
            are seeking job candida -tes. However, we will only share your
            information with your explicit consent. In addition to this, we may
            also share your inform -ation with third-party service providers who
            help us provide our services, such as email providers and data
            storage providers.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            5. Security of Your Information
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            We take the security of our users' personal infor -mation seriously
            and have implemented various security measures to protect it.
            However, please note that no data transmission over the internet can
            be guaranteed to be 100% secure.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            6. Your Rights
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            You have the right to access, correct, and delete your personal
            information that we hold. You can do this by logging into your
            account or contacting us directly.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            7. Changes to this Privacy Policy
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            We may update this privacy policy from time to time to reflect
            changes to our practices or services. We encourage users to review
            this policy periodically.
          </Text>
          <Text style={{ fontSize: 17, marginBottom: 5, color: "#333" }}>
            8. Contact Us
          </Text>
          <Text
            style={{
              marginBottom: 10,
              lineHeight: 20,
              marginLeft: 8,
              color: "#707070",
            }}
          >
            If you have any questions or concerns about this privacy policy,
            please contact us at [insert contact information].
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
// define your styles

//make this component available to the app
