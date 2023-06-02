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

const Item = React.memo(
  ({ title, index, time, product_fees, pic, navigation, id }) => (
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
              height: 100,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              backgroundColor: "#EEFBFF",
            }}
          />

          {/* </View> */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: "#333",
                textAlign: "left",
                textTransform: "capitalize",
              }}
            >
              {title}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#333" }}>
              Rs: {product_fees} / {time}
            </Text>
          </View>
        </View>
      </MotiView>
    </TouchableWithoutFeedback>
  )
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

// //import liraries
// import React, { Component } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   StatusBar,
//   Pressable,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import Top from "../Topcontainer";
// import { useNavigation } from "@react-navigation/native";
// import BottomTAb from "../../Rootstack/RootTabnav";

// // create a component
// export default function Maincategory({ route }) {
//   const hi = "helllo";
//
//   const navigation = useNavigation();
//
//   const userDetails = route.params.Details;
//
//
//   const id = route.params.userId;

//   return (
//     <View>
//       <ScrollView>
//         <Top />
//         <LinearGradient colors={["#1da1f2", "#1da1f2"]}>
//           <View style={styles.container}>
//             <Pressable
//               onPress={() =>
//                 navigation.navigate("botnav", {
//                   userId: id,
//                   Details: userDetails,
//                 })
//               }
//             >
//               <LinearGradient
//                 colors={["#fafafa", "#fafafa"]}
//                 style={{
//                   marginBottom: -10,
//                   backgroundColor: "#FFFFFF",
//                   justifyContent: "space-evenly",
//                   marginHorizontal: 5,
//                   marginVertical: 20,

//                   borderBottomWidth: 15,
//                   borderWidth: 1,
//                   borderColor: "#fcea5e",
//                   borderRadius: 38,
//                   backgroundColor: "#63eec9",
//                   alignContent: "center",
//                   position: "relative",
//                   shadowColor: "#000000",
//                   shadowOffset: {
//                     width: 0,
//                     height: 6,
//                   },
//                   shadowOpacity: 0.2,
//                   shadowRadius: 15.62,
//                   elevation: 18,
//                 }}
//               >
//                 <Image
//                   resizeMode="contain"
//                   source={{
//                     uri: "https://www.hellopeo.com/uploads/1/2/0/1/12012548/published/deb44308-db0d-48e9-8e35-b0690816e4a0_1.jpeg",
//                   }}
//                   style={{ width: 140, height: 140, borderRadius: 30 }}
//                 />

//                 <Text
//                   style={{
//                     fontSize: 23,
//                     textAlign: "center",
//                     color: "#2a180c",
//                     fontWeight: "600",
//                   }}
//                 >
//                   HR Admin
//                 </Text>
//               </LinearGradient>
//             </Pressable>
//             <LinearGradient
//               colors={["#fafafa", "#fafafa"]}
//               style={{
//                 marginBottom: -10,
//                 backgroundColor: "#FFFFFF",
//                 marginHorizontal: 5,
//                 marginVertical: 20,

//                 justifyContent: "center",
//                 borderBottomWidth: 15,
//                 borderWidth: 1,
//                 borderColor: "#fcea5e",
//                 borderRadius: 38,
//                 backgroundColor: "#63eec9",
//                 alignContent: "center",
//                 position: "relative",
//                 shadowColor: "#000000",
//                 shadowOffset: {
//                   width: 0,
//                   height: 6,
//                 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 15.62,
//                 elevation: 18,
//               }}
//               // style={{
//               //   borderRadius: 30,
//               //   backgroundColor: "#63eec9",
//               //   marginVertical: 30,
//               //   shadowColor: "#000000",
//               //   shadowOffset: {
//               //     width: 0,
//               //     height: 6,
//               //   },
//               //   shadowOpacity: 0.2,
//               //   shadowRadius: 15.62,
//               //   elevation: 18,
//               // }}
//             >
//               <Image
//                 resizeMode="contain"
//                 source={{
//                   uri: "https://www.shutterstock.com/image-vector/cartoon-plumber-holding-big-wrench-260nw-72074980.jpg",
//                 }}
//                 style={{ width: 140, height: 140, borderRadius: 30 }}
//               />
//               <Text
//                 style={{
//                   fontSize: 23,
//                   textAlign: "center",
//                   color: "#2a180c",
//                   fontWeight: "600",
//                 }}
//               >
//                 Plumber
//               </Text>
//             </LinearGradient>
//             <LinearGradient
//               colors={["#fafafa", "#fafafa"]}
//               style={{
//                 marginBottom: -10,

//                 backgroundColor: "#FFFFFF",
//                 justifyContent: "space-evenly",

//                 borderBottomWidth: 15,
//                 marginVertical: 20,
//                 marginHorizontal: 5,

//                 borderWidth: 1,
//                 borderColor: "#fcea5e",
//                 borderRadius: 38,
//                 backgroundColor: "#63eec9",
//                 alignContent: "center",
//                 position: "relative",
//                 shadowColor: "#000000",
//                 shadowOffset: {
//                   width: 0,
//                   height: 6,
//                 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 15.62,
//                 elevation: 18,
//               }}
//             >
//               <Image
//                 resizeMode="contain"
//                 source={{
//                   uri: "https://www.teriin.org/sites/default/files/images/environment/land/food-land-land.jpg",
//                 }}
//                 style={{ width: 140, height: 140, borderRadius: 30 }}
//               />
//               <Text
//                 style={{
//                   fontSize: 23,
//                   textAlign: "center",
//                   color: "#2a180c",
//                   fontWeight: "600",
//                 }}
//               >
//                 Paddy pluger
//               </Text>
//             </LinearGradient>
//             <LinearGradient
//               colors={["#fafafa", "#fafafa"]}
//               style={{
//                 marginBottom: -10,
//                 marginHorizontal: 5,

//                 backgroundColor: "#FFFFFF",
//                 justifyContent: "space-evenly",

//                 borderBottomWidth: 15,
//                 cardStyle: { borderColor: "rde", borderWidth: 50 },
//                 borderWidth: 1,
//                 borderColor: "#fcea5e",
//                 borderRadius: 38,
//                 backgroundColor: "#63eec9",
//                 marginVertical: 20,
//                 alignContent: "center",
//                 position: "relative",
//                 shadowColor: "#000000",
//                 shadowOffset: {
//                   width: 0,
//                   height: 6,
//                 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 15.62,
//                 elevation: 18,
//               }}
//             >
//               <Image
//                 resizeMode="contain"
//                 source={{
//                   uri: "https://choicesiki.com/assets/images/services/maid-service/house-maid-services.webp",
//                 }}
//                 style={{ width: 140, height: 140, borderRadius: 30 }}
//               />
//               <Text
//                 style={{
//                   fontSize: 23,
//                   textAlign: "center",
//                   color: "#2a180c",
//                   fontWeight: "600",
//                 }}
//               >
//                 House maid
//               </Text>
//             </LinearGradient>
//             <LinearGradient
//               colors={["#fafafa", "#fafafa"]}
//               style={{
//                 marginBottom: -10,

//                 backgroundColor: "#FFFFFF",
//                 justifyContent: "space-evenly",
//                 marginHorizontal: 5,

//                 borderBottomWidth: 15,
//                 borderWidth: 1,
//                 borderColor: "#fcea5e",
//                 borderRadius: 38,
//                 backgroundColor: "#63eec9",
//                 marginVertical: 20,
//                 alignContent: "center",
//                 position: "relative",
//                 shadowColor: "#000000",
//                 shadowOffset: {
//                   width: 0,
//                   height: 6,
//                 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 15.62,
//                 elevation: 18,
//               }}
//             >
//               <Image
//                 resizeMode="contain"
//                 source={{
//                   uri: "https://latitudetechnolabs.com/wp-content/uploads/2022/05/ReactJS-logo.png",
//                 }}
//                 style={{ width: 150, height: 150, borderRadius: 30 }}
//               />
//               <Text
//                 style={{
//                   fontSize: 23,
//                   textAlign: "center",
//                   color: "#2a180c",
//                   fontWeight: "600",
//                 }}
//               >
//                 React
//               </Text>
//             </LinearGradient>
//             <LinearGradient
//               colors={["#fafafa", "#fafafa"]}
//               style={{
//                 marginBottom: -10,

//                 backgroundColor: "#FFFFFF",
//                 justifyContent: "space-evenly",
//                 marginHorizontal: 5,

//                 borderBottomWidth: 15,
//                 borderWidth: 1,
//                 borderColor: "#fcea5e",
//                 borderRadius: 38,
//                 backgroundColor: "#63eec9",
//                 marginVertical: 20,
//                 alignContent: "center",
//                 position: "relative",
//                 shadowColor: "#000000",
//                 shadowOffset: {
//                   width: 0,
//                   height: 6,
//                 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 15.62,
//                 elevation: 18,
//               }}
//             >
//               <Image
//                 source={{
//                   uri: "https://cdn.pixabay.com/photo/2016/02/05/10/18/painter-1180676__340.jpg",
//                 }}
//                 resizeMode="contain"
//                 style={{ width: 150, height: 150, borderRadius: 30 }}
//               />
//               <Text
//                 style={{
//                   fontSize: 23,
//                   textAlign: "center",
//                   color: "#2a180c",
//                   fontWeight: "600",
//                 }}
//               >
//                 Painter
//               </Text>
//             </LinearGradient>
//             <LinearGradient
//               colors={["#fafafa", "#fafafa"]}
//               style={{
//                 marginBottom: -10,

//                 backgroundColor: "#FFFFFF",
//                 justifyContent: "space-evenly",
//                 marginHorizontal: 5,

//                 borderBottomWidth: 15,
//                 borderWidth: 1,
//                 borderColor: "#fcea5e",
//                 borderRadius: 38,
//                 backgroundColor: "#63eec9",
//                 marginVertical: 30,
//                 alignContent: "center",
//                 position: "relative",
//                 shadowColor: "#000000",
//                 shadowOffset: {
//                   width: 0,
//                   height: 6,
//                 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 15.62,
//                 elevation: 18,
//               }}
//             >
//               <Image
//                 source={{
//                   uri: "https://www.tristatetechnology.com/tristate-website/blog/wp-content/uploads/2017/09/Why-AngularJS-A1.jpg",
//                 }}
//                 resizeMode="contain"
//                 style={{ width: 150, height: 150, borderRadius: 30 }}
//               />
//               <Text
//                 style={{
//                   fontSize: 23,
//                   textAlign: "center",
//                   color: "#2a180c",
//                   fontWeight: "600",
//                 }}
//               >
//                 Angular
//               </Text>
//             </LinearGradient>
//             <LinearGradient
//               colors={["#fafafa", "#fafafa"]}
//               style={{
//                 marginBottom: -10,
//                 marginHorizontal: 5,

//                 backgroundColor: "#FFFFFF",
//                 justifyContent: "space-evenly",

//                 borderBottomWidth: 15,
//                 borderWidth: 1,
//                 borderColor: "#fcea5e",
//                 borderRadius: 38,
//                 backgroundColor: "#63eec9",
//                 marginVertical: 30,
//                 alignContent: "center",
//                 position: "relative",
//                 shadowColor: "#000000",
//                 shadowOffset: {
//                   width: 0,
//                   height: 6,
//                 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 15.62,
//                 elevation: 18,
//               }}
//             >
//               <Image
//                 source={{
//                   uri: "https://content.jdmagicbox.com/comp/chennai/t4/044pxx44.xx44.221011124705.x7t4/catalogue/e-and-p-services-thoraipakkam-chennai-electricians-nvprtrngjf.jpg",
//                 }}
//                 resizeMode="contain"
//                 style={{ width: 150, height: 150, borderRadius: 30 }}
//               />
//               <Text
//                 style={{
//                   fontSize: 23,
//                   textAlign: "center",
//                   color: "#2a180c",
//                   fontWeight: "600",
//                 }}
//               >
//                 Electrician
//               </Text>
//             </LinearGradient>
//             <LinearGradient
//               colors={["#fafafa", "#fafafa"]}
//               style={{
//                 marginBottom: -10,

//                 backgroundColor: "#FFFFFF",
//                 justifyContent: "space-evenly",
//                 marginHorizontal: 5,

//                 borderBottomWidth: 15,
//                 borderWidth: 1,
//                 borderColor: "#fcea5e",
//                 borderRadius: 38,
//                 backgroundColor: "#63eec9",
//                 marginVertical: 30,
//                 alignContent: "center",
//                 position: "relative",
//                 shadowColor: "#000000",
//                 shadowOffset: {
//                   width: 0,
//                   height: 6,
//                 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 15.62,
//                 elevation: 18,
//               }}
//             >
//               <Image
//                 source={{
//                   uri: "https://images.newindianexpress.com/uploads/user/imagelibrary/2022/10/3/w900X450/agriculture.jpg?w=400&dpr=2.6",
//                 }}
//                 resizeMode="contain"
//                 style={{ width: 150, height: 150, borderRadius: 30 }}
//               />
//               <Text
//                 style={{
//                   fontSize: 23,
//                   textAlign: "center",
//                   color: "#2a180c",
//                   fontWeight: "600",
//                 }}
//               >
//                 Pest feeder
//               </Text>
//             </LinearGradient>
//             <LinearGradient
//               colors={["#fafafa", "#fafafa"]}
//               style={{
//                 marginBottom: -10,

//                 backgroundColor: "#FFFFFF",
//                 justifyContent: "space-evenly",
//                 marginHorizontal: 5,

//                 borderBottomWidth: 15,
//                 borderWidth: 1,
//                 borderColor: "#fcea5e",
//                 borderRadius: 38,
//                 backgroundColor: "#63eec9",
//                 marginVertical: 30,
//                 alignContent: "center",
//                 position: "relative",
//                 shadowColor: "#000000",
//                 shadowOffset: {
//                   width: 0,
//                   height: 6,
//                 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 15.62,
//                 elevation: 18,
//               }}
//             >
//               <Image
//                 resizeMode="contain"
//                 source={{
//                   uri: "https://nexttechnology.io/app/uploads/2021/09/hiring-java-developer.png",
//                 }}
//                 style={{ width: 150, height: 150, borderRadius: 30 }}
//               />
//               <Text
//                 style={{
//                   fontSize: 20,
//                   textAlign: "center",
//                   color: "#2a180c",
//                   fontWeight: "600",
//                 }}
//               >
//                 Java Developer
//               </Text>
//             </LinearGradient>
//             <LinearGradient
//               colors={["#fafafa", "#fafafa"]}
//               style={{
//                 marginBottom: 20,

//                 backgroundColor: "#FFFFFF",
//                 justifyContent: "space-evenly",
//                 marginHorizontal: 5,

//                 borderBottomWidth: 15,
//                 borderWidth: 1,
//                 borderColor: "#fafafa",
//                 borderRadius: 38,
//                 backgroundColor: "#63eec9",
//                 marginVertical: 30,
//                 alignContent: "center",
//                 position: "relative",
//                 shadowColor: "#000000",
//                 shadowOffset: {
//                   width: 0,
//                   height: 6,
//                 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 15.62,
//                 elevation: 18,
//               }}
//             >
//               <Image
//                 source={{
//                   uri: "https://www.jawanservices.com/assets/custom/images/s2.jpg",
//                 }}
//                 resizeMode="contain"
//                 style={{ width: 150, height: 150, borderRadius: 30 }}
//               />
//               <Text
//                 style={{
//                   fontSize: 23,
//                   textAlign: "center",
//                   color: "#2a180c",
//                   fontWeight: "600",
//                 }}
//               >
//                 Security
//               </Text>
//             </LinearGradient>
//             <LinearGradient
//               colors={["#fafafa", "#fafafa"]}
//               style={{
//                 marginBottom: 20,

//                 backgroundColor: "#FFFFFF",
//                 justifyContent: "space-evenly",
//                 marginHorizontal: 5,

//                 borderBottomWidth: 15,
//                 borderWidth: 1,
//                 borderColor: "#fafafa",
//                 borderRadius: 38,
//                 backgroundColor: "#63eec9",
//                 marginVertical: 30,
//                 alignContent: "center",
//                 position: "relative",
//                 shadowColor: "#000000",
//                 shadowOffset: {
//                   width: 0,
//                   height: 6,
//                 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: 15.62,
//                 elevation: 18,
//               }}
//             >
//               <Image
//                 source={{
//                   uri: "https://i.insider.com/5afb25dae3186e2b008b4c29?width=750&format=jpeg&auto=webp",
//                 }}
//                 resizeMode="contain"
//                 style={{ width: 150, height: 150, borderRadius: 30 }}
//               />
//               <Text
//                 style={{
//                   fontSize: 23,
//                   textAlign: "center",
//                   color: "#2a180c",
//                   fontWeight: "600",
//                 }}
//               >
//                 Car cleaner
//               </Text>
//             </LinearGradient>
//           </View>
//         </LinearGradient>
//       </ScrollView>
//     </View>
//   );
// }

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 0.8,
//     flexWrap: "wrap",
//     marginHorizontal: 10,
//     flexDirection: "row",
//     marginTop: 80,
//     justifyContent: "center",
//     alignContent: "center",
//   },
//   top: {
//     flex: 1,
//   },
// });

// //make this component available to the app
