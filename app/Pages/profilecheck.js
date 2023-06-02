// {
//   /*//React Native FlatList
// //https://aboutreact.com/react-native-flatlist/

// //import React in our code
// import React, { useEffect,useState,useRef } from 'react';

// //import all the components we are going to use
// import { FlatList, View, Text, SafeAreaView, StyleSheet, Dimensions, Animated, Easing } from 'react-native';

// const dummyArray = [
//   { id: '1', value: 'A' },
//   { id: '2', value: 'B' },
//   { id: '3', value: 'C' },
//   { id: '4', value: 'D' },
//   { id: '5', value: 'E' },
//   { id: '6', value: 'F' },
//   { id: '7', value: 'G' },
//   { id: '8', value: 'H' },
//   { id: '9', value: 'I' },
//   { id: '10', value: 'J' },
//   { id: '11', value: 'K' },
//   { id: '12', value: 'L' },
//   { id: '13', value: 'M' },
//   { id: '14', value: 'N' },
//   { id: '15', value: 'O' },
//   { id: '16', value: 'P' },
//   { id: '17', value: 'Q' },
//   { id: '18', value: 'R' },
//   { id: '19', value: 'S' },
//   { id: '20', value: 'T' },
//   { id: '21', value: 'U' },
//   { id: '22', value: 'V' },
//   { id: '23', value: 'W' },
//   { id: '24', value: 'X' },
//   { id: '25', value: 'Y' },
//   { id: '26', value: 'Z' },
// ];

// const App = () => {
//   const [listItems, setListItems] = useState(dummyArray);
//   const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current 
//   useEffect(()=>{
//     Animated.timing(translateX,{toValue:0,duration:2000}).start();
//   })
//   const ItemView = ({ item }) => {

//     return (
//       // Single Comes here which will be repeatative for the FlatListItems
//       <Animated.View style={{transform:[{translateY:translateX}]}} >
//         <Text style={styles.item} onPress={() => getItem(item)}>
//           {item.value}
//         </Text>
//       </Animated.View>
//     );
//   };

//   const ItemSeparatorView = () => {
//     return (
//       //Item Separator
//       <View
//         style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
//       />
//     );
//   };

//   const getItem = (item) => {
//     //Function for click on an item
//     alert('Id : ' + item.id + ' Value : ' + item.value);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <FlatList
//           data={listItems}
//           //data defined in constructor
//           ItemSeparatorComponent={ItemSeparatorView}
//           //Item Separator View
//           renderItem={ItemView}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       </View>
//        <View style={styles.container}>
       
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     flex: 1,
//     marginLeft: 10,
//     marginRight: 10,
//     marginBottom: 10,
//     marginTop: 30,
    
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
// });

// export default App;
//  */
// }

// import {
//   SafeAreaView,
//   View,
//   FlatList,
//   StyleSheet,
//   Text,
//   StatusBar,
// } from "react-native";

// const Item = ({ title }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );
// const DATA = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     title: "First Item",
//   },
//   {
//     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//     title: "Second Item",
//   },
//   {
//     id: "58694a0f-3da1-471f-bd96-145571e29d72",
//     title: "Third Item",
//   },
// ];
// import { useEffect, useState, useRef } from "react";
// export default function CheckProfile() {
//   const [data, setData] = useState(null);
//   const [posts, setposts] = useState([]);
//   const myData = [];
//   const [loading, setloading] = useState(true);

//   const renderItem = ({ item }) => <Item title={item.e_skill_set} />;

//   const getid = async () => {
//     try {
      
//       await fetch("http://103.174.10.108:5002/api/count_apply_job/11", {
//         method: "GET", // *GET, POST, PUT, DELETE, etc.
//         mode: "cors", // no-cors, *cors, same-origin
//         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: "same-origin", // include, *same-origin, omit
//         headers: {
//           "Content-Type": "application/json",
//           // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       })
//         .then((response) => response.json())
//         .then((result) => {
//           setData(result), add_Post(result);
//         });
//     } catch (error) {
//       console.warn(error);
//     }
//   };
//   const add_Post = async (params) => {
//     try {
//       for (let i = 0; i < params.length; i++) {
//         await fetch(
//           `http://103.174.10.108:5002/api/apply_jobed/${params[i].post_id}`,
//           {
//             method: "GET", // *GET, POST, PUT, DELETE, etc.
//             mode: "cors", // no-cors, *cors, same-origin
//             cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//             credentials: "same-origin", // include, *same-origin, omit
//             headers: {
//               "Content-Type": "application/json",
//               // 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//           }
//         )
//           .then((response) => response.json())
//           .then((result) => {
//             myData.push(result[0]);
//           });
//       }
//       setloading(false);
      
//       setposts(myData);
//     } catch (error) {
      
//       return error;
//     }
//   };
//   useEffect(() => {
//     getid();
//   }, []);

//   return (
//     <View
//       style={{
//         backgroundColor: "pink",
//         justifyContent: "center",
//         flex: 1,
//         alignItems: "center",
//       }}
//     >
//       {data ? <Text>{data.length}</Text> : <Text>Loading</Text>}
//       {loading ? (
//         <View style={{ backgroundColor: "yellow" }}>
//           {
//           {
//           <Text>Loading</Text>
//         </View>
//       ) : (
//         <View>
//           {
//           {
//           <SafeAreaView style={styles.container}>
//             <FlatList data={posts} renderItem={renderItem} />
//           </SafeAreaView>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "grey",
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
// });
