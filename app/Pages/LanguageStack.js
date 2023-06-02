import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const DATA = [
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "தமிழ்",
    value: "ta",
    // img: (
    //   <Image
    //     resizeMode="contain"
    //     style={{ height: 22, width: 22 }}
    //     source={require("../images/english.png")}
    //   />
    // ),
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "English",
    value: "en",
    // img: (
    //   <Image
    //     resizeMode="contain"
    //     style={{ height: 22, width: 22 }}
    //     source={require("../images/english.png")}
    //   />
    // ),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "తెలుంగు  (Coming soon)",
    value: "ml",
    // img: (
    //   <Image
    //     resizeMode="contain"
    //     style={{ height: 22, width: 22 }}
    //     source={require("../images/english.png")}
    //   />
    // ),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d71",
    title: "हिंदी  (Coming soon)",
    value: "hi",
    // img: (
    //   <Image
    //     resizeMode="contain"
    //     style={{ height: 22, width: 22 }}
    //     source={require("../images/english.png")}
    //   />
    // ),
  },
];

const Item = ({ item, index, setSelectedIndex, selectedIndex }) => {
  const [isvoice, setisvoice] = useState(true);

  return (
    <TouchableOpacity
      onPress={() => setSelectedIndex(selectedIndex === item ? null : item)}
      style={[
        styles.item,
        selectedIndex === item && styles.select, // apply selected style if it's the selected index
      ]}
    >
      {/* <View style={{ flexDirection: "row" }}> */}
      <Text style={[styles.normal, selectedIndex === item && styles.text]}>
        {item.title}
      </Text>
      {/* <Text>{item.img}</Text> */}
      {/* </View> */}

      {/* <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("../images/english.png")}
      /> */}
    </TouchableOpacity>
  );
};

const LanguageStack = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#EEFBFF",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "500",
            color: "#333",
          }}
        >
          Select your Language
        </Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={({ item, index }) => (
          <Item
            item={item}
            index={index}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            // style={{ backgroundColor: "red" }}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={{ marginHorizontal: "5%", marginVertical: 5 }}>
        <TouchableOpacity
          onPress={() => {
            console.log(selectedIndex);
            dispatch({ type: "language", payload: selectedIndex.title }),
              dispatch({
                type: "language_value",
                payload: selectedIndex.value,
              });
            navigation.goBack();
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LinearGradient
            colors={["#16323B", "#1F4C5B", "#1E5966", "#16323B"]}
            style={{
              // backgroundColor: isValid ? "#6BC3FF" : "#87CEEB",
              textAlign: "center",
              // marginHorizontal: 60,
              padding: 10,
              width: "100%",
              // paddingVertical: 15,
              borderRadius: 10,
              alignItems: "center",
              // marginTop: 20,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            useAngle={45}
          >
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 17 }}>
              Set My Language
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 0.5,
    borderRadius: 10,
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 5.62,
    // elevation: 8,
    borderBottomColor: "#D9D9D9",
    marginHorizontal: "5%",
    marginVertical: 5,
  },
  select: {
    backgroundColor: "#1E5966",
    color: "#fff",
  },
  normal: {
    color: "#333",
    fontWeight: "400",
    fontSize: 15,
  },
  text: {
    color: "#fff",
  },
});

export default LanguageStack;
