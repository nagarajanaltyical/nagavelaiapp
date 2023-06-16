//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useContext } from "react";
import { L_FILTER } from "../../../App";
// create a component
export default function Education() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const { state2, dispatch2 } = useContext(L_FILTER);
  const [items, setItems] = useState([
    {
      label: "B.tech/B.E",

      value: "B.tech/B.E",
    },
    { label: "B.sc", value: "B.sc" },
    { label: "10th", value: "10th" },
    { label: "12th", value: "12th" },
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
          placeholder={"Select Education"}
          dropDownContainerStyle={{
            backgroundColor: "#DFDFDF",
          }}
          listMode="MODAL"
          placeholderStyle={{ color: "#acacac" }}
          modalTitle="Select Education"
          modalAnimationType="slide"
          modalContentContainerStyle={{
            backgroundColor: "#fff",
          }}
          modalTitleStyle={{
            fontWeight: "bold",
          }}
          //  searchable={true}
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
            dispatch2({ type: "SET_EDUCATION_long", payload: value });
            // handledistrict(value);
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
