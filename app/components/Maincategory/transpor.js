import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import data from "./data/data";
import { MotiView } from "moti";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import BottomTAb from "../../Rootstack/RootTabnav";

//get dataa
const renderItem = ({ item, index }) => {
  return (
    // <MotiView
    //   style={styles.listContainer}
    //   from={{ opacity: 0, translateY: 50 }}
    //   animate={{ opacity: 1, translateY: 0 }}
    //   transition={{ delay: 1000 + index * 200 }}
    // >
    <View>
      <TouchableWithoutFeedback
      // onPress={() => {
      //
      // }}
      //  onPress={() =>
      //   //  navigation.navigate("rentalswipe", {
      //   //    // userId: id,
      //   //    // Details: userDetails,
      //   //  })
      //  }
      >
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            source={item.image}
            style={styles.image}
          />
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.priceText}>{item.price}</Text>
      {/* <View style={styles.button}>
          <Text style={styles.buttonText}>Buy Now!</Text>
        </View> */}
    </View>
  );
};

function Transport({ route }) {
  const hi = "helllo";

  const navigation = useNavigation();
  const selected_Tools = useSelector((state) => state.selected_Tools);

  const [data, setData] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  useEffect(() => {
    getuserdata("Transport");
  }, [selected_Tools]);
  async function getuserdata(paras) {
    try {
      await fetch(`http://103.174.10.108:5002/api/rent_post_fillter/${paras}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setData(result.rent);
          setRefreshing(false);
        });
    } catch (error) {
      console.warn(error);
    }
  }
  // getuserdata();
  //
  // const userDetails = route.params.Details;
  //
  //
  // const id = route.params.userId;

  return (
    <SafeAreaView style={styles.container}>
      {refreshing ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getuserdata()} />
          }
        />
      )}
    </SafeAreaView>
  );
}

export default Transport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    // width: Dimensions.get("window").width / 2 - 20,
    width: 100,
    height: 140,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderColor: "#707070",
    borderWidth: 2,
    margin: 5,
    borderRadius: 20,
  },
  imageContainer: {
    // margin: 15,
    width: 80,
    height: "60%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",

    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 190,
    height: "60%",
    // aspectRatio: 1,
  },
  nameText: {
    color: "black",
    fontWeight: "700",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    // marginLeft: 15,
  },
  priceText: {
    color: "black",
    fontWeight: "700",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    // marginLeft: 15,
    marginTop: 3,
  },
  button: {
    backgroundColor: "#62513E",
    padding: 10,
    margin: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
