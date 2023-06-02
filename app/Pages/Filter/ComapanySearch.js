//import liraries
import React, { Component, useState } from "react";
import { TextInput } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { useContext } from "react";
import { L_FILTER } from "../../../App";
// create a component
export default function Company() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [search, setSearch] = useState("");
  const { state2, dispatch2 } = useContext(L_FILTER);
  //   const [items, setItems] = useState([
  //     {
  //       label: "0-1 year",

  //       value: "1",
  //     },
  //     { label: "1-5 year", value: "2" },
  //     { label: "5-10", value: "3" },
  //     { label: "Permanent", value: "4" },
  //   ]);

  return (
    <View style={styles.container}>
      <View style={{ margin: 10 }}>
        <TextInput
          // value={search}
          value={search}
          onChangeText={(dist) => setSearch(dist)}
          // onChange
          underlineColorAndroid="transparent"
          placeholder="Type Company Name"
          style={styles.input}
          onBlur={() => {
            dispatch2({ type: "SET_Company_NAME_long", payload: search });
          }}
        />
        <View
          style={{
            marginLeft: 130,
            marginTop: 5,
          }}
        ></View>
      </View>
      {/* <DropDownPicker
        open={open}
        value={value}
        items={items}
        placeholder={"Select Duration"}
        dropDownContainerStyle={{
          backgroundColor: "#DFDFDF",
        }}
        listMode="MODAL"
        modalTitle="Select an item"
        modalAnimationType="slide"
        modalContentContainerStyle={{
          backgroundColor: "#fff",
        }}
        modalTitleStyle={{
          fontWeight: "bold",
        }}
        searchable={true}
        mode="BADGE"
        categorySelectable={true}
        closeAfterSelecting={true}
        multiple={true}
        showTickIcon={true}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={{ width: 250 }}
        showArrowIcon={true}
        customItemLabelStyle={{
          fontStyle: "italic",
        }}
        listItemLabelStyle={{
          color: "black",
        }}
      /> */}
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#ffffff",
  },
  input: {
    width: 260,
    height: 50,
    padding: 10,
    marginLeft: 10,
    marginTop: 20,
    borderColor: "#acacac",
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
});

//make this component available to the app
