// import React from "react";
// import {
//   SafeAreaView,
//   View,
//   FlatList,
//   StyleSheet,
//   Text,
//   StatusBar,
//   ScrollView,
//   Image,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import { AntDesign } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useEffect, useState, useRef } from "react";
// import { ProfileBody, ProfileButtons } from "../components/ProfileBody";
// import Entypo from "react-native-vector-icons/Entypo";
// import BottomTabView from "../components/BottomTabView";
// import { Button, Menu, Divider, Provider } from "react-native-paper";

// export default function Profile(props) {
//   //
//   const [data, setData] = useState(null);
//   const [posts, setposts] = useState([]);
//   const [loading, setloading] = useState(true);
//   //
//   // const myData = [];
//   //
//   //
//   // //to get the count
//   // const getid = async () => {
//   //   try {
//   //
//   //     await fetch(
//   //       `http://192.168.1.9:5000/api/count_apply_job/${props.userDetails.user_id}`,
//   //       {
//   //         method: "GET", // *GET, POST, PUT, DELETE, etc.
//   //         mode: "cors", // no-cors, *cors, same-origin
//   //         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//   //         credentials: "same-origin", // include, *same-origin, omit
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           // 'Content-Type': 'application/x-www-form-urlencoded',
//   //         },
//   //       }
//   //     )
//   //       .then((response) => response.json())
//   //       .then((result) => {
//   //
//   //         setData(result);
//   //         add_Post(result);
//   //       });
//   //   } catch (error) {
//   //     console.warn(error);
//   //   }
//   // };
//   // const getpost = async () => {
//   //   try {
//   //
//   //     await fetch(
//   //       `http://192.168.1.9:5000/api/job_provide_count/${props.userDetails.user_id}`,
//   //       {
//   //         method: "GET", // *GET, POST, PUT, DELETE, etc.
//   //         mode: "cors", // no-cors, *cors, same-origin
//   //         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//   //         credentials: "same-origin", // include, *same-origin, omit
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           // 'Content-Type': 'application/x-www-form-urlencoded',
//   //         },
//   //       }
//   //     )
//   //       .then((response) => response.json())
//   //       .then((result) => {
//   //
//   //         setData(result);
//   //         add_Post(result);
//   //       });
//   //   } catch (error) {
//   //     console.warn(error);
//   //   }
//   // };
//   // const add_Post = async (params) => {
//   //
//   //
//   //   try {
//   //     for (let i = 0; i < params.length; i++) {
//   //       await fetch(
//   //         `http://192.168.1.9:5000/api/apply_jobed/${params[i].post_id}`,
//   //         {
//   //           method: "GET", // *GET, POST, PUT, DELETE, etc.
//   //           mode: "cors", // no-cors, *cors, same-origin
//   //           cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//   //           credentials: "same-origin", // include, *same-origin, omit
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //             // 'Content-Type': 'application/x-www-form-urlencoded',
//   //           },
//   //         }
//   //       )
//   //         .then((response) => response.json())
//   //         .then((result) => {
//   //
//   //
//   //           myData.push(result[0]);
//   //         });
//   //     }
//   //     setloading(false);
//   //     setposts(myData);
//   //
//   //
//   //
//   //   } catch (error) {
//   //
//   //   }
//   // };
//   // useEffect(() => {
//   //   props.userDetails.is_provider === 1 ? getpost() : getid();
//   // }, []);

//   // let circuls = [];
//   // let numberofcircels = 10;
//   // for (let index = 0; index < numberofcircels; index++) {
//   //   circuls.push(
//   //     <View key={index}>
//   //       {index === 0 ? (
//   //         <View
//   //           style={{
//   //             width: 60,
//   //             height: 60,
//   //             borderRadius: 100,
//   //             borderWidth: 1,
//   //             opacity: 0.7,
//   //             marginHorizontal: 5,
//   //             justifyContent: "center",
//   //             alignItems: "center",
//   //           }}
//   //         >
//   //           <Entypo name="plus" style={{ fontSize: 40, color: "black" }} />
//   //         </View>
//   //       ) : (
//   //         <View
//   //           style={{
//   //             width: 60,
//   //             height: 60,
//   //             borderRadius: 100,
//   //             backgroundColor: "black",
//   //             opacity: 0.1,
//   //             marginHorizontal: 5,
//   //           }}
//   //         ></View>
//   //       )}
//   //     </View>
//   //   );
//   // }
//   const navigation = useNavigation();

//   const [visible, setVisible] = React.useState(false);

//   const openMenu = () => setVisible(true);

//   const closeMenu = () => setVisible(false);
//   return (
//     <>
//       <StatusBar style="auto" />
//       <LinearGradient
//         colors={["#fafafa", "#fafafa"]}
//         style={{
//           flex: 1,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "white",
//         }}
//       >
//         <Provider>
//           <View style={{ width: "100%", padding: 10 }}>
//             <View
//               style={{
//                 flexDirection: "row-reverse",
//               }}
//             >
//               <Menu
//                 visible={visible}
//                 onDismiss={closeMenu}
//                 anchor={
//                   <Button onPress={openMenu}>
//                     <AntDesign name="menu-fold" size={24} color="black" />
//                   </Button>
//                 }
//               >
//                 <Menu.Item
//                   onPress={() => navigation.navigate("Home")}
//                   title={
//                     <>
//                       <MaterialCommunityIcons
//                         name="logout"
//                         size={24}
//                         color="black"
//                       />
//                       Logout
//                     </>
//                   }
//                 />
//                 <Divider />

//                 <Menu.Item onPress={() => {}} title="Switch Account" />
//               </Menu>
//             </View>
//             <ProfileBody
//               // name={props.userDetails.first_name}
//               accountName="mr_peobody"
//               followers="3.6M"
//               following="35"
//               // post={data ? data.length : 0}
//             />
//             <ProfileButtons
//               id={0}
//               name="Mr Peobody"
//               accountName="mr_peobody"
//               // userInfo={props.userDetails}
//             />
//           </View>
//         </Provider>
//         {/* <View>
//           <Text
//             style={{
//               padding: 10,
//               letterSpacing: 1,
//               fontSize: 14,
//             }}
//           >
//             Story Highlights
//           </Text>
//           <ScrollView
//             horizontal={true}
//             showsHorizontalScrollIndicator={false}
//             style={{
//               paddingVertical: 5,
//               paddingHorizontal: 10,
//             }}
//           >
//             {circuls}
//           </ScrollView>
//         </View> */}
//         {/* <BottomTabView
//         length={posts && posts}
//         is_provider={props.userDetails.is_provider}
//         /> */}
//       </LinearGradient>
//     </>
//   );
// }
