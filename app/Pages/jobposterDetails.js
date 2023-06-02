import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import Multi from "../components/multiselect";
import { useState } from "react";
import Updatefile from "../components/uploadfiles";

export default function JobPoster() {
  const [userName, setUserName] = useState("");
  return (
    <>
      <View style={styles.main}>
        <View style={styles.topConatainer}>
          <View style={styles.topitem}>
            <View style={styles.topitem1}>
              <Text style={{ fontSize: 14, fontWeight: "700" }}>
                Final steps!
              </Text>
            </View>
            <View style={styles.topitem2}>
              <View>
                <Pressable>
                  <MaterialCommunityIcons
                    name="account-voice"
                    size={24}
                    color="black"
                  />
                </Pressable>
              </View>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Ionicons name="md-globe-outline" size={24} color="black" />
                <Text>EN</Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomItem}>
            <Progress.Bar
              progress={0.8}
              width={350}
              color={"orange"}
              borderWidth={3}
              unfilledColor={"#BBB6B6"}
              borderColor={"#BBB6B6"}
              borderRadius={6}
              height={4}
            />
          </View>
        </View>
        <View style={styles.middle}>
          <View>
            <Text style={styles.title}>Name</Text>
            <TextInput
              value={userName}
              onChangeText={(userName) => setUserName(userName)}
              placeholder={"Enter your name"}
              mode="outlined"
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.title}>Email</Text>
            <TextInput
              value={userName}
              onChangeText={(userName) => setUserName(userName)}
              placeholder={"Enter your name"}
              mode="outlined"
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.title}>A short description about you</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={[styles.input, { marginBottom: 20 }]}
            />
          </View>
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Text style={[styles.title, { marginBottom: 1 }]}>
              add any of your proofs
            </Text>
            <Updatefile />
          </View>

          <View
            style={{
              borderBottomColor: "white",
              width: "90%",
              alignSelf: "center",
              borderBottomWidth: 4,
            }}
          />
        </View>

        <View style={styles.bottom}>
          <View>
            <Text style={[styles.title, { fontSize: 12 }]}>
              You can either start with this basic information about you or go
              ahead to create your full profile
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              width: "100%",
              padding: 10,
              alignItems: "center",
            }}
          >
            <View>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 202,
                  borderRadius: 10,
                  alignItems: "center",
                  marginBottom: 20,
                  justifyContent: "center",
                  backgroundColor: "#FF5A5F",
                }}
              >
                <Text style={{ color: "white" }}>Create Profile</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  height: 40,
                  padding: 10,
                  width: 202,
                  borderRadius: 10,
                  marginBottom: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#4A4242",
                }}
              >
                <Text style={{ color: "white" }}>search jobs</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                alignItems: "center",
              }}
            >
              <View>
                <AntDesign name="arrowleft" size={24} color="black" />
              </View>

              <View>
                <Text
                  style={[
                    styles.title,
                    {
                      fontSize: 12,
                      marginBottom: 3,
                      paddingLeft: 1,
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  Back to user roles
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  topConatainer: {
    backgroundColor: "#F2F2F2",
    justifyContent: "flex-end",
    paddingTop: 50,
  },
  middle: {
    height: 420,
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
  },
  bottom: {
    backgroundColor: "#f2f2f2",
    height: 300,
    paddingRight: 30,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    paddingLeft: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    width: "90%",
    padding: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  topitem: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginBottom: 10,
  },

  topitem1: {
    flex: 0.6,
    marginHorizontal: 10,
  },
  topitem2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flex: 0.3,
  },
  bottomItem: {
    marginHorizontal: 13,
    marginVertical: 5,
  },
  icon: {
    flex: 0.2,
    marginTop: 10,
  },
  icon2: {
    flex: 0.2,
    marginTop: 10,
  },
  Info: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 0.7,
    marginTop: 10,
  },
  card1: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 20,
    height: 170,
    padding: 10,
    marginBottom: 60,
  },
  card2: {
    alignContent: "flex-start",
    backgroundColor: "white",
    flexDirection: "row",
    marginHorizontal: 20,
    height: 150,
    padding: 10,
    width: 280,
    position: "relative",
  },
  Info2: {
    flexDirection: "row",
    flex: 0.6,
    flexWrap: "wrap",
    marginTop: 10,
    position: "relative",
  },
  cardsItem: {
    flex: 1,
  },
  image1: {
    marginTop: 30,
    marginRight: -35,
  },
  image2: {
    position: "absolute",
    marginLeft: 160,
    marginTop: 50,
  },
});
