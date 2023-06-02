import React, { useState } from "react";
import { View, Text, Image, TouchableHighlight, Pressable } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { LocalizationContext } from "../../App";
import { t } from "i18n-js";
export const ProfileBody = ({
  name,
  accountName,
  profileImage,
  post,
  followers,
  following,
}) => {
  const { t, language, setlanguage } = useContext(LocalizationContext);

  return (
    <View>
      {/* {accountName ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {accountName}
            </Text>
            <Feather
              name="chevron-down"
              style={{
                fontSize: 20,
                color: "black",
                paddingHorizontal: 5,
                opacity: 0.5,
              }}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather
              name="plus-square"
              style={{
                fontSize: 25,
                color: "black",
                paddingHorizontal: 15,
              }}
            />
            <Feather
              name="menu"
              style={{
                fontSize: 25,
              }}
            />
          </View>
        </View>
      ) : null} */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: "https://freefrontend.com/assets/img/css-masonry-examples/css-grid-responsive-masonry-layout.jpg",
            }}
            style={{
              resizeMode: "cover",
              width: 80,
              height: 80,
              borderRadius: 100,
              borderColor: "#6BC3FF",
              borderWidth: 2,
            }}
          />
          <Text
            style={{
              paddingVertical: 5,
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{post}</Text>
          <Text style={{ fontSize: language == "ta" ? 10 : 18 }}>
            {t("applied_job")}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{followers}</Text>
          <Text>Interviews</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{following}</Text>
          <Text>saved</Text>
        </View>
      </View>
    </View>
  );
};
export const ProfileButtons = ({
  id,
  name,
  accountName,
  profileImage,
  userInfo,
}) => {
  const { t, language, setlanguage } = useContext(LocalizationContext);

  const navigation = useNavigation();

  const [follow, setFollow] = useState(follow);
  return (
    <>
      {id === 0 ? (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-evenly",
            paddingVertical: 5,
          }}
        >
          <TouchableHighlight
            activeOpacity={-1}
            underlayColor="transparent"
            onPress={() =>
              navigation.navigate(
                "editinfo"
                // { edit: true, details: userInfo }
              )
            }
            style={{
              width: "100%",
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <LinearGradient
                colors={["#6BC3FF", "#1da1f2"]}
                style={{
                  width: "60%",
                  height: 35,
                  borderRadius: 13,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000000",
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 15.62,
                  elevation: 18,
                }}
              >
                <Pressable>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: language == "ta" ? 12 : 14,
                      color: "white",
                      letterSpacing: 2,
                      opacity: 1,
                    }}
                  >
                    {t("edit")}
                  </Text>
                </Pressable>
              </LinearGradient>
            </View>
          </TouchableHighlight>
          {/* {
            userInfo.is_provider ?
              ( */}
          <TouchableHighlight
            activeOpacity={-1}
            underlayColor="transparent"
            onPress={() => navigation.push("register")}
            style={{
              width: "100%",
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <LinearGradient
                colors={["#6BC3FF", "#1da1f2"]}
                style={{
                  width: "60%",
                  height: 35,
                  backgroundColor: "red",
                  marginTop: 20,
                  borderRadius: 13,
                  borderColor: "#DEDEDE",
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000000",
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 15.62,
                  elevation: 18,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: language == "ta" ? 11 : 14,
                    letterSpacing: 2,
                    opacity: 0.8,
                  }}
                >
                  {t("post")}
                </Text>
              </LinearGradient>
            </View>
          </TouchableHighlight>
          {/* ) : null} */}
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setFollow(!follow)}
            style={{ width: "42%" }}
          >
            <View
              style={{
                width: "100%",
                height: 35,
                borderRadius: 5,
                backgroundColor: follow ? null : "#3493D9",
                borderWidth: follow ? 1 : 0,
                borderColor: "#DEDEDE",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: follow ? "black" : "white" }}>
                {follow ? "Following" : "Follow"}
              </Text>
            </View>
          </TouchableOpacity>
          {/* <View
            style={{
              width: "42%",
              height: 35,
              borderWidth: 1,
              borderColor: "#DEDEDE",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              backgroundColor: "red",
            }}
          >
            <Text>Message</Text>
          </View> */}
          <View
            style={{
              width: "10%",
              height: 35,
              borderWidth: 1,
              borderColor: "#DEDEDE",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Feather
              name="chevron-down"
              style={{ fontSize: 20, color: "black" }}
            />
          </View>
        </View>
      )}
    </>
  );
};
