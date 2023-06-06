//import liraries
import React, { Component, useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { S_FILTER } from "../../../App";

// create a component
export default function Duration() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const { state1, dispatch1 } = useContext(S_FILTER);
  const [items, setItems] = useState([
    { label: "1 - 10 Days", value: "1 - 10 Days" },
    { label: "11 - 30 Days", value: "11 - 30 Days" },
    { label: "1 - 6 Months", value: "1 - 6 Months" },
    { label: "7 - 12 Months", value: "7 - 12 Months" },
    { label: "1+ Years", value: "1+ Years" },
  ]);

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 45,
          // justifyContent: "center",
          // alignItems: "center",
          marginLeft: 20,
        }}
      >
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          placeholder={"Select Duration"}
          dropDownContainerStyle={{
            backgroundColor: "#DFDFDF",
          }}
          placeholderStyle={{ color: "#acacac" }}
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
          // multiple={true}
          showTickIcon={true}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{
            height: 50,
            width: 260,
            // marginTop: 100,
            backgroundColor: "transparent",
            borderColor: "#acacac",
            alignContent: "center",
            justifyContent: "center",
          }}
          showArrowIcon={true}
          customItemLabelStyle={{
            fontStyle: "italic",
          }}
          onChangeValue={(value) => {
            dispatch1({ type: "SET_Duration", payload: value });
          }}
          listItemLabelStyle={{
            color: "black",
          }}
        />
      </View>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
});

//make this component available to the app
