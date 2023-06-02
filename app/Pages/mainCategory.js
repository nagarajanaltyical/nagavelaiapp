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
// const renderItem = ({ item, index }) => {
//   return (
//     // <MotiView
//     //   style={styles.listContainer}
//     //   from={{ opacity: 0, translateY: 50 }}
//     //   animate={{ opacity: 1, translateY: 0 }}
//     //   transition={{ delay: 1000 + index * 200 }}
//     // >
//     <View>
//       <TouchableWithoutFeedback
//       // onPress={() => {
//       //
//       // }}
//       //  onPress={() =>
//       //   //  navigation.navigate("rentalswipe", {
//       //   //    // userId: id,
//       //   //    // Details: userDetails,
//       //   //  })
//       //  }
//       >
//         <View style={styles.imageContainer}>
//           <Image
//             resizeMode="contain"
//             source={item.image}
//             style={styles.image}
//           />
//         </View>
//       </TouchableWithoutFeedback>
//       <Text style={styles.nameText}>{item.name}</Text>
//       <Text style={styles.priceText}>{item.price}</Text>
//       {/* <View style={styles.button}>
//           <Text style={styles.buttonText}>Buy Now!</Text>
//         </View> */}
//     </View>
//   );
// };

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ title, index, time, product_fees, pic, navigation, id }) => (
  <TouchableWithoutFeedback
    onPress={() =>
      navigation.navigate("rentalswipe", {
        post_id: id,
      })
    }
  >
    <MotiView
      style={styles.listContainer}
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 10 + index * 200 }}
    >
      <View>
        {/* <View style={styles.imageContainer}> */}
        <Image
          resizeMode="contain"
          source={{ uri: pic }}
          style={{
            height: 130,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        />

        {/* </View> */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginHorizontal: 3,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#333",
              textAlign: "left",
              textTransform: "capitalize",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
              color: "#535353",
              marginTop: 5,
            }}
          >
            Rs: {product_fees} {time}
          </Text>
        </View>
      </View>
    </MotiView>
  </TouchableWithoutFeedback>
);

function Maincategory({ route }) {
  const hi = "helllo";

  const navigation = useNavigation();
  const selected_Tools = useSelector((state) => state.selected_Tools);

  const [data, setData] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  useEffect(() => {
    getuserdata();
  }, [selected_Tools]);
  async function getuserdata() {
    try {
      await fetch(
        `http://103.174.10.108:5002/api/rent_post_fillter/${selected_Tools}`,
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
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
    <>
      {refreshing ? (
        <ActivityIndicator />
      ) : (
        <View>
          <FlatList
            data={data}
            // style={{ backgroundColor: "red", width: 180 }}
            renderItem={({ item, index }) => (
              <Item
                title={item.product_name}
                index={index}
                id={item.id}
                pic={item.pic}
                product_fees={item.product_fees}
                time={item.product_fees_hour}
                navigation={navigation}
              />
            )}
            numColumns={2}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </>
  );
}

export default Maincategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
    // backgroundColor: "red",
    // backgroundColor: "#fff",
  },
  listContainer: {
    // width: Dimensions.get("window").width / 2 - 20,
    width: "49.5%",
    // height: 170,
    // justifyContent: "center",
    // alignContent: "center",
    // alignItems: "center",
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 6,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 15.62,
    // elevation: 18,
    backgroundColor: "#fff",
    borderColor: "#acacac",
    borderWidth: 0.5,
    margin: 1,
    borderRadius: 5,
  },
  imageContainer: {
    // margin: 15,

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
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
