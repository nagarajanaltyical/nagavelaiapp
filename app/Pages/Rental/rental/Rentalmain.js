import * as React from "react";
import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Maincategory from "../../../components/Maincategory/Maincategory";
// import Location from "./Location";
// import MyComponent from "./Category";
// import Workmode from "./Workmode";
// import Duration from "./Duration";
// import Salery from "./Salery";
// import Education from "./Education";
// import Experiance from "./Experiance";
// import Company from "./ComapanySearch";
// import Post from "./Post";

const listTab = [
  {
    status: "Tools",

    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("./rentimages/support.png")}
      />
    ),
  },
  {
    status: "Transport",

    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("./rentimages/car.png")}
      />
    ),
  },
  {
    status: "Jewellery",
    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("./rentimages/necklace.png")}
      />
    ),
  },
  {
    status: "Home Appliances",
    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("./rentimages/responsive-design.png")}
      />
    ),
  },
  {
    status: "Kitchen Tools",
    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("./rentimages/kitchen-tool.png")}
      />
    ),
  },
  {
    status: "Makeup",
    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("./rentimages/makeup.png")}
      />
    ),
  },
  {
    status: "Cloths",
    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("./rentimages/t-shirt.png")}
      />
    ),
  },
  {
    status: "PG&Space",
    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("./rentimages/building.png")}
      />
    ),
  },
  {
    status: "Furnitures",
    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("./rentimages/armchair.png")}
      />
    ),
  },
  {
    status: "Hospital",
    icon: (
      <Image
        resizeMode="contain"
        style={{ height: 22, width: 22 }}
        source={require("./rentimages/pharmacy.png")}
      />
    ),
  },
];

// Linking content
const data = [
  {
    name: <Maincategory />,
    status: "Tools",
  },
  {
    name: <Maincategory />,
    status: "Transport",
  },

  {
    name: <Maincategory />,
    status: "Jewellery",
  },
  {
    name: <Maincategory />,
    status: "Home Appliances",
  },
  {
    name: <Maincategory />,
    status: "Kitchen Tools",
  },
  {
    name: <Maincategory />,
    status: "Makeup",
  },
  {
    name: <Maincategory />,
    status: "Cloths",
  },
  {
    name: <Maincategory />,

    status: "PG&Space",
  },
  {
    name: <Maincategory />,
    status: "Furnitures",
  },
  {
    name: <Maincategory />,
    status: "Hospital",
  },
];

export default function Rental(navigation) {
  const Redux_Dispatch = useDispatch();

  const selected_Tools = useSelector((state) => state.selected_Tools);

  const [status, setStatus] = useState(selected_Tools);
  const [dataList, setDataList] = useState([
    ...data.filter((e) => e.status === selected_Tools),
  ]);

  const setStatusFilter = (status) => {
    if (status !== selected_Tools) {
      setDataList([...data.filter((e) => e.status === status)]);

      Redux_Dispatch({ type: "select_items", payload: status });
    } else {
      setDataList([...data.filter((e) => e.status === selected_Tools)]);
    }

    setStatus(status);
  };
  return (
    <View style={styles.container}>
      <StatusBar style={"auto"} />
      <View style={styles.listTab}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {listTab.map((e) => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  marginVertical: "10%",
                  height: "7.5%",
                }}
              >
                {/* <View
                  // style={{
                  //   justifyContent: "center",
                  //   marginVertical: "10%",
                  //   height: "7.5%",
                  // }}
                  > */}
                <TouchableOpacity
                  style={[
                    styles.btnTab,
                    status === e.status && styles.btnTabActive,
                  ]}
                  onPress={() => setStatusFilter(e.status)}
                >
                  <Text
                    style={[
                      styles.iconTab,
                      status === e.status && styles.textTabActive,
                    ]}
                  >
                    {e.icon}
                  </Text>
                  <Text style={styles.textTab}> {e.status}</Text>
                </TouchableOpacity>
              </View>
              // </View>
            );
          })}
        </ScrollView>
      </View>
      <FlatList
        data={dataList}
        // style={{ height: "100%", marginBottom: "30%" }}
        // keyExtractor={(e, i) => i.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
const renderItem = ({ item, index, navigation }) => {
  return (
    <View style={styles.itemContainer}>
      <View key={index}>
        {item.name}

        {/* <Text>{item.text}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: "100%",
    flexDirection: "row",
    // paddingHorizontal: 1,
    backgroundColor: "#EEFBFF",
    justifyContent: "center",
  },
  listTab: {
    borderColor: "#d9d9d9",
    borderWidth: 1,
    height: "90%",
    width: 80,
    marginTop: 10,
    // marginHorizontal: "2%",
    // paddingVertical: "5%",
    backgroundColor: "#FFF",
    flexDirection: "column",
    // justifyContent: "space-evenly",
    // justifyContent: "center",
    alignItems: "center",
    // marginTop: 20,
    // marginLeft: 5,
    // borderRadius: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,

    // backgroundColor: "red",
  },
  btnTab: {
    width: 78,
    // backgroundColor: "red",
    // flexDirection: "column",
    // marginBottom: 5,
    // marginTop: "5%",
    // marginLeft: "2%",
    height: 60,
    // paddingHorizontal: "-2%",
    // paddingVertical: 3,
    alignContent: "center",
    alignItems: "center",
    // paddingTop: "10%",
    // borderBottomWidth: 1,
    // borderBottomColor: "#333",
    justifyContent: "center",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  textTab: {
    fontSize: 9,
    fontWeight: "400",
    color: "#1e5966",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  iconTab: {
    height: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  btnTabActive: {
    backgroundColor: "#d5f4fe",
    // marginTop: "5%",
    height: "100%",
    // width: "100%",
    // paddingTop: "35%",

    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    alignContent: "center",
    alignItems: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: "#333",
    justifyContent: "center",
  },
  textTabActive: {
    color: "#fff",
    // backgroundColor: "red",
  },
  itemContainer: {
    // backgroundColor: "green",
    // position: "relative",
    // paddingVertical: 15,
    height: "100%",
    width: "99%",
    flex: 1,
    marginTop: 10,

    marginBottom: "20%",
    // flexDirection: "column",
    // justifyContent: "center",
    // marginLeft: 30,
    // marginRight: "100%",
    // marginLeft: "1%",
    // marginTop: 100,
  },
  // itemName: {
  //   fontWeight: "bold",
  //   fontSize: 20,
  //   marginBottom: 5,
  // },
});
