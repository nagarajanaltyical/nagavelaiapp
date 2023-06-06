//import liraries
import React, { Component, useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { S_FILTER } from "../../../App";
// import { useDispatch } from "react-redux";

// create a component
export default function Salery() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const { state1, dispatch1 } = useContext(S_FILTER);
  const [items, setItems] = useState([
    {
      label: "Hourly payment",

      value: "Hourly payment",
    },
    { label: "Daily payment", value: "Daily payment" },
    { label: "Weekly payment", value: "Weekly payment" },
    { label: "Monthly Payment", value: "Monthly Payment" },
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
          placeholder={"Select Package"}
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
          // multiple={true}
          placeholderStyle={{ color: "#acacac" }}
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
            dispatch1({ type: "SET_SALARY", payload: value });
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
