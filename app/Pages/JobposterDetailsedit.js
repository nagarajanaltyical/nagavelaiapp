// import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
// import { ScrollView } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { Ionicons } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";
// import { Feather } from "@expo/vector-icons";
// import { TextInput } from "react-native";
// import { useState } from "react";
// import { TouchableOpacity } from "react-native";

// export default function JobPosterProfileEdit() {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isNew, setisNew] = useState(false);
//   const [oldjob, setoldjob] = useState(false);

//   return (
//     <>
//       <View style={{ width: "100%", height: 80, backgroundColor: "#f2f2f2" }}>
//         <View style={styles.TopC1}>
//           <View style={{ flex: 0.4 }}>
//             <Text style={{ fontSize: 20, fontWeight: "600" }}>
//               Profile Info
//             </Text>
//           </View>
//           <View style={{ flexDirection: "row", flex: 0.2 }}>
//             <Pressable style={{ marginRight: 10 }}>
//               <MaterialCommunityIcons
//                 name="account-voice"
//                 size={24}
//                 color="black"
//               />
//             </Pressable>
//             <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
//               <Ionicons name="globe-outline" size={24} color="black" />
//               <Text
//                 style={{
//                   fontSize: 18,
//                   fontWeight: "800",
//                   borderBottomWidth: 2,
//                 }}
//               >
//                 EN
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>
//       <ScrollView>
//         <View style={{ flex: 1, marginTop: 20 }}>
//           <View
//             style={{
//               width: "100%",
//               height: 50,
//               alignItems: "center",
//               flexDirection: "row",
//               justifyContent: "space-between",
//               paddingHorizontal: 30,
//             }}
//           >
//             <View style={{ flexDirection: "row" }}>
//               <AntDesign name="idcard" size={24} color="black" />
//               <Text
//                 style={{
//                   fontSize: 18,
//                   fontWeight: "400",
//                   paddingHorizontal: 5,
//                   alignItems: "flex-end",
//                 }}
//               >
//                 Name
//               </Text>
//             </View>
//             <View style={{ flexDirection: "row" }}>
//               <Text style={{ fontWeight: "600", fontSize: 15 }}>
//                 Akash Poovan
//               </Text>
//               <AntDesign
//                 name="right"
//                 size={15}
//                 color="grey"
//                 style={{ alignSelf: "flex-end" }}
//               />
//             </View>
//           </View>
//           <View style={{ width: "100%" }}>
//             <View
//               style={{
//                 width: "100%",
//                 height: 50,
//                 alignItems: "center",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 paddingHorizontal: 30,
//               }}
//             >
//               <View style={{ flexDirection: "row" }}>
//                 <Entypo name="suitcase" size={20} color="black" />
//                 <Text
//                   style={{
//                     fontSize: 18,
//                     fontWeight: "400",
//                     paddingHorizontal: 5,
//                     alignItems: "flex-end",
//                   }}
//                 >
//                   job
//                 </Text>
//               </View>
//               <View style={{ flexDirection: "row" }}>
//                 <Text style={{ fontWeight: "600", fontSize: 15 }}>
//                   Devloper
//                 </Text>
//                 <AntDesign
//                   name="right"
//                   size={15}
//                   color="grey"
//                   style={{ alignSelf: "flex-end" }}
//                 />
//               </View>
//             </View>
//           </View>
//           <View
//             style={{
//               width: "100%",
//               height: 50,
//               justifyContent: "center",
//             }}
//           >
//             <View style={{ flexDirection: "row", paddingHorizontal: 30 }}>
//               <Feather
//                 name="square"
//                 size={24}
//                 color="black"
//                 style={{ paddingRight: 10 }}
//               />
//               <Text style={{ fontSize: 15, fontWeight: "600" }}>
//                 I am actively looking for the jobs
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View
//           style={{ backgroundColor: "#f2f2f2", width: "100%", height: 400 }}
//         >
//           <View style={{ paddingHorizontal: 30 }}>
//             <Text style={{ fontSize: 15, fontWeight: "600", paddingBottom: 5 }}>
//               Your key skills
//             </Text>
//             <TextInput
//               placeholder="Enter your skills"
//               style={{
//                 backgroundColor: "white",
//                 borderRadius: 5,
//                 height: 50,
//                 width: "100%",
//               }}
//             />
//           </View>
//           <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
//             <Text style={{ fontSize: 15, fontWeight: "600", paddingBottom: 5 }}>
//               A short description about you
//             </Text>
//             <TextInput
//               multiline={true}
//               numberOfLines={4}
//               placeholder="Enter details about you"
//               style={{
//                 backgroundColor: "white",
//                 width: "100%",
//                 textAlignVertical: "top",
//                 borderRadius: 5,
//               }}
//             />
//             <View>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   backgroundColor: "white",
//                   marginTop: 5,
//                   borderRadius: 5,
//                 }}
//               >
//                 <Text style={{ paddingHorizontal: 10 }}>
//                   Click here to record a audio description
//                 </Text>
//                 <AntDesign name="play" size={24} color="black" />
//               </View>
//             </View>
//           </View>
//           <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
//             <Text style={{ fontSize: 15, fontWeight: "600", paddingBottom: 5 }}>
//               Your Profile Image
//             </Text>
//             <View
//               style={{
//                 backgroundColor: "white",
//                 height: 100,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <MaterialCommunityIcons
//                 name="camera-plus"
//                 size={24}
//                 color="grey"
//               />
//               <Text style={{ color: "grey", fontWeight: "600" }}>
//                 click here to add your profile Image
//               </Text>
//             </View>
//           </View>
//         </View>

//         <View style={{ backgroundColor: "#f2f2f2", height: 100 }}>
//           <Text style={{ fontSize: 18, fontWeight: "600", paddingLeft: 30 }}>
//             My basics
//           </Text>

//           <View
//             style={{
//               width: "100%",
//               height: 50,
//               alignItems: "center",
//               flexDirection: "row",
//               justifyContent: "space-between",
//               paddingHorizontal: 30,
//             }}
//           >
//             <View style={{ flexDirection: "row" }}>
//               <FontAwesome name="globe" size={24} color="black" />
//               <Text
//                 style={{
//                   fontSize: 18,
//                   fontWeight: "400",
//                   paddingHorizontal: 5,
//                   alignItems: "flex-end",
//                 }}
//               >
//                 Social media
//               </Text>
//             </View>
//             <View style={{ flexDirection: "row" }}>
//               <Text style={{ fontWeight: "600", fontSize: 15 }}>
//                 2 accounts
//               </Text>
//               <AntDesign
//                 name="right"
//                 size={15}
//                 color="grey"
//                 style={{ alignSelf: "flex-end" }}
//               />
//             </View>
//           </View>
//         </View>
//         <Text style={{ fontSize: 18, fontWeight: "600", paddingLeft: 30 }}>
//           My job needs
//         </Text>
//         <View
//           style={{
//             backgroundColor: "#f2f2f2",
//             height: 200,
//             width: "95%",
//             paddingLeft: 30,
//             borderBottomWidth: 3,
//             borderBottomColor: "white",
//           }}
//         >
//           <View
//             style={{
//               width: "100%",
//               height: 180,
//               flexDirection: "row",
//               justifyContent: "center",
//               marginTop: 10,
//               backgroundColor: "white",
//               alignItems: "center",
//               paddingHorizontal: 30,
//             }}
//           >
//             <View
//               style={{
//                 width: "80%",
//                 height: "60%",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Text
//                 style={{
//                   textAlign: "center",
//                   color: "#BBB6B6",
//                   fontSize: 14,
//                   fontWeight: "600",
//                 }}
//               >
//                 currently there are no job postings click below add a job
//               </Text>
//               <TouchableOpacity>
//                 <Text
//                   style={{
//                     backgroundColor: "#4A4242",
//                     padding: 10,
//                     width: 202,
//                     height: 40,
//                     borderRadius: 10,
//                     textAlign: "center",
//                     color: "white",
//                     marginTop: 30,
//                   }}
//                 >
//                   Add job
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//         <View style={{ backgroundColor: "#f2f2f2", height: 200 }}>
//           <View
//             style={{
//               alignSelf: "center",
//               width: "60%",
//               height: 100,
//               justifyContent: "center",
//             }}
//           >
//             <TouchableOpacity>
//               <Text
//                 style={{
//                   backgroundColor: "#ff5a5f",
//                   padding: 12,

//                   fontSize: 14,
//                   fontWeight: "600",
//                   borderRadius: 5,
//                   color: "white",
//                   textAlign: "center",
//                 }}
//               >
//                 Get started
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
//             <Text
//               style={{ fontSize: 14, fontWeight: "600", borderBottomWidth: 2 }}
//             >
//               Back to user roles
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   TopC1: {
//     height: 80,
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "flex-end",
//     paddingHorizontal: 30,
//     justifyContent: "space-between",
//     backgroundColor: "#f2f2f2",
//   },
// });
