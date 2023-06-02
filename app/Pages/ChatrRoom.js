import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import moment from "moment/moment";
const ChatRoom = ({ route }) => {
  console.log("Hello Prandsss");
  const userID = useSelector((state) => state.ID);
  const states = useSelector((state) => state);
  console.log(route.params);
  const [messages, setMessages] = useState([]); // State for storing messages
  const [input, setInput] = useState(""); // State for storing input text
  const { width } = useWindowDimensions();
  const handleSend = () => {
    if (input !== "") {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          msg: input,
          place: "right",
          date: Date.now(),
          date1: moment().utcOffset("+05:30").format(" hh:mm A"),
        },
      ]);
      async function givemesagedata() {
        try {
          const body = {};
          body.user_id = userID;
          body.sender_id = route.params.sender_id;
          body.userType = !states.job_seeker_info
            ? !states.job_provider_info
              ? !states.rental_provider_info
                ? "rental_seeker_info"
                : "rental_provider_info"
              : "job_provider_info"
            : "job_seeker_info";

          body.msg = input;
          body.viwed = false;
          await fetch(`http://103.174.10.108:5002/api/chat`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(body), // body data
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
            });
        } catch (error) {
          console.warn(error);
        }
      }
      givemesagedata();
      setInput("");
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  //   React.useEffect(() => {
  //     navigation.addListener("tabPress", () => fetchdata());
  //   }, []);
  const [nodata, setnodata] = useState(false);
  const [propic, setpropic] = useState("");
  const getchecktheTime = (paras) => {
    console.log(paras);
    const timeString12Hour = moment(paras).format("hh:mm A");
    console.log("im the tiime svchange");
    console.log(moment(paras).fromNow());
    console.log(timeString12Hour);
  };

  async function fetchdata() {
    try {
      const body = {};
      body.user_id = userID;
      body.sender_id = route.params.sender_id;
      body.userType = !states.job_seeker_info
        ? !states.job_provider_info
          ? !states.rental_provider_info
            ? "rental_seeker_info"
            : "rental_provider_info"
          : "job_provider_info"
        : "job_seeker_info";
      await fetch(`http://103.174.10.108:5002/api/job_pro_msg`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(body), // body data
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setMessages(result["data"]);
          //   console.log(result["data"][0]["date"]);
          //   getchecktheTime(result["data"][0]["date"]);
          // setRefreshing(false);
          // var newdata = result["liked_job"];

          // if (newdata.length == 0) {
          //   setnodata(true);
          //   setloading(false);
          // } else {
          //   setdata(newdata);
          //   setloading(false);
          //   setnodata(false);
          // }
          // setdata(newdata);
          // setloading(false);
        });
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <View
      // behavior={Platform.OS === "android" ? "position" : "padding"}
      style={styles.container}
    >
      <View
        style={{
          backgroundColor: "#fff",
          // borderRadius: 15,
          height: "7%",
          width: "100%",
          // marginLeft: "5%",
          marginBottom: 15,
          justifyContent: "center",
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 5.62,
          elevation: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 20,
            }}
          >
            {route.params.profile_pic == "" ? (
              <Image
                resizeMode="contain"
                source={require("../images/account.png")}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 40 / 2,
                  // borderColor: "#1e5966",
                  // borderWidth: 0.5,
                }}
              />
            ) : (
              <Image
                style={{
                  width: 35,
                  height: 35,

                  borderRadius: 40 / 2,
                  borderColor: "#1e5966",
                  borderWidth: 0.5,
                }}
                source={{
                  uri: route.params.profile_pic,
                }}
              />
            )}
          </View>
          <View
            style={{
              justifyContent: "center",
              marginLeft: 20,
              width: "75%",
              marginVertical: 5,
            }}
          >
            <Text
              style={{
                color: "#333",
                fontSize: 15,
                textTransform: "capitalize",
                fontWeight: "500",
                lineHeight: 20,
              }}
            >
              {route.params.username}
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={messages}
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 10 }}
        renderItem={({ item }) => (
          <View
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomRightRadius: item.place == "right" ? 0 : 10,
              borderBottomLeftRadius: item.place == "left" ? 0 : 10,
              padding: 8,
              borderColor: "#d9d9d9",
              borderWidth: 0.5,
              marginVertical: 4,
              marginLeft: item.place == "right" ? width / 4 : 0,
              marginRight: item.place == "left" ? width / 3 : 0,
              backgroundColor: item.place == "right" ? "#fff" : "#1E5966",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: item.place == "right" ? "#333" : "#fff",
                lineHeight: 21,
              }}
            >
              {item.msg}
            </Text>
            <View
              style={
                {
                  // backgroundColor: "red",
                }
              }
            >
              <Text
                style={{
                  right: 5,
                  marginBottom: 2,
                  marginTop: 5,
                  marginLeft: item.place == "right" ? 190 : 160,
                  fontSize: 10,
                  fontWeight: "400",
                  color: item.place == "right" ? "#333" : "#fff",
                }}
              >
                {item.date1}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.date}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={{ fontSize: 16, width: "90%" }}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={{ marginLeft: 5 }} onPress={handleSend}>
          <MaterialCommunityIcons
            name="send-circle"
            size={34}
            color="#1E5966"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    // marginHorizontal: 10,

    backgroundColor: "#eefbff",
  },
  messageContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 8,
    marginVertical: 4,
  },
  messageText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#fff",
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderColor: "#d9d9d9",
    borderWidth: 0.5,
    padding: 8,
  },
  input: {
    fontSize: 16,
  },
  sendButton: {
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: "blue",
    fontSize: 16,
  },
});

export default ChatRoom;
