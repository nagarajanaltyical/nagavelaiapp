import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function UserProfileEdit() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isNew, setisNew] = useState(false);
  const [oldjob, setoldjob] = useState(false);

  return (
    <>
      <View style={{ width: "100%", height: 80, backgroundColor: "#f2f2f2" }}>
        <View style={styles.TopC1}>
          <View style={{ flex: 0.4 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Profile Info
            </Text>
          </View>
          <View style={{ flexDirection: "row", flex: 0.2 }}>
            <Pressable style={{ marginRight: 10 }}>
              <MaterialCommunityIcons
                name="account-voice"
                size={24}
                color="black"
              />
            </Pressable>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Ionicons name="globe-outline" size={24} color="black" />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "800",
                  borderBottomWidth: 2,
                }}
              >
                EN
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={{ flex: 1, marginTop: 20 }}>
          <View
            style={{
              width: "100%",
              height: 50,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="idcard" size={24} color="black" />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  paddingHorizontal: 5,
                  alignItems: "flex-end",
                }}
              >
                Name
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                Akash Poovan
              </Text>
              <AntDesign
                name="right"
                size={15}
                color="grey"
                style={{ alignSelf: "flex-end" }}
              />
            </View>
          </View>
          <View style={{ width: "100%" }}>
            <View
              style={{
                width: "100%",
                height: 50,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 30,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Entypo name="suitcase" size={20} color="black" />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                    paddingHorizontal: 5,
                    alignItems: "flex-end",
                  }}
                >
                  job
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "600", fontSize: 15 }}>
                  Devloper
                </Text>
                <AntDesign
                  name="right"
                  size={15}
                  color="grey"
                  style={{ alignSelf: "flex-end" }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 50,
              justifyContent: "center",
            }}
          >
            <View style={{ flexDirection: "row", paddingHorizontal: 30 }}>
              <Feather
                name="square"
                size={24}
                color="black"
                style={{ paddingRight: 10 }}
              />
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                I am actively looking for the jobs
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ backgroundColor: "#f2f2f2", width: "100%", height: 400 }}
        >
          <View style={{ paddingHorizontal: 30 }}>
            <Text style={{ fontSize: 15, fontWeight: "600", paddingBottom: 5 }}>
              Your key skills
            </Text>
            <TextInput
              placeholder="Enter your skills"
              style={{
                backgroundColor: "white",
                borderRadius: 5,
                height: 50,
                width: "100%",
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
            <Text style={{ fontSize: 15, fontWeight: "600", paddingBottom: 5 }}>
              A short description about you
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Enter details about you"
              style={{
                backgroundColor: "white",
                width: "100%",
                textAlignVertical: "top",
                borderRadius: 5,
              }}
            />
            <View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "white",
                  marginTop: 5,
                  borderRadius: 5,
                }}
              >
                <Text style={{ paddingHorizontal: 10 }}>
                  Click here to record a audio description
                </Text>
                <AntDesign name="play" size={24} color="black" />
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
            <Text style={{ fontSize: 15, fontWeight: "600", paddingBottom: 5 }}>
              Your Profile Image
            </Text>
            <View
              style={{
                backgroundColor: "white",
                height: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="camera-plus"
                size={24}
                color="grey"
              />
              <Text style={{ color: "grey", fontWeight: "600" }}>
                click here to add your profile Image
              </Text>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: "#f2f2f2", height: 200 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", paddingLeft: 30 }}>
            My basics
          </Text>
          <View
            style={{
              width: "100%",
              height: 50,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="chart-histogram"
                size={24}
                color="black"
              />
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View
                      style={{
                        width: "100%",
                        height: 80,
                        backgroundColor: "#f2f2f2",
                      }}
                    >
                      <View style={styles.TopC1}>
                        <View
                          style={{
                            flex: 0.4,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                          >
                            <Entypo name="cross" size={24} color="black" />
                          </Pressable>
                          <Text style={{ fontSize: 20, fontWeight: "600" }}>
                            Job History
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row", flex: 0.2 }}>
                          <Pressable style={{ marginRight: 10 }}>
                            <MaterialCommunityIcons
                              name="account-voice"
                              size={24}
                              color="black"
                            />
                          </Pressable>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "flex-end",
                              marginRight: 30,
                            }}
                          >
                            <Ionicons
                              name="globe-outline"
                              size={24}
                              color="black"
                            />
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: "800",
                                borderBottomWidth: 2,
                              }}
                            >
                              EN
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 80,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity onPress={() => setisNew(!isNew)}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#FFA85A",
                            height: 50,
                            width: 350,
                            borderRadius: 5,
                          }}
                        >
                          <AntDesign
                            name="pluscircleo"
                            size={18}
                            color="white"
                            style={{ marginRight: 10 }}
                          />
                          <Text
                            style={{
                              color: "white",
                              fontSize: 14,
                              fontWeight: "700",
                            }}
                          >
                            Add New Company
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => setoldjob(!oldjob)}>
                      <View
                        style={{
                          backgroundColor: "white",
                          height: 80,
                          borderRadius: 5,
                          width: "90%",
                          borderWidth: 0.5,
                          marginHorizontal: 23,
                        }}
                      >
                        <Text
                          style={{
                            padding: 10,
                            fontSize: 14,
                            fontWeight: "600",
                          }}
                        >
                          Zeal Zoft Private Limited
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 10,
                          }}
                        >
                          <Text style={{ fontSize: 14, fontWeight: "600" }}>
                            1 year 3 months
                          </Text>
                          <Pressable onPress={() => setoldjob(!oldjob)}>
                            <AntDesign
                              name="downcircle"
                              size={25}
                              color="#FFA85A"
                            />
                          </Pressable>
                        </View>
                      </View>
                    </TouchableOpacity>
                    {oldjob && (
                      <View
                        style={{
                          backgroundColor: "white",
                          height: 300,
                          marginTop: 30,
                          width: "90%",
                          borderWidth: 1,
                          borderColor: "grey",
                          marginHorizontal: 23,
                        }}
                      >
                        <View style={{ margin: 5, paddingHorizontal: 15 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "600",
                              marginBottom: 5,
                            }}
                          >
                            Company Name
                          </Text>
                          <TextInput
                            placeholder="Enter company name"
                            style={{
                              borderWidth: 0.5,
                              width: "80%",
                              borderColor: "grey",
                            }}
                          />
                        </View>
                        <View style={{ margin: 5, paddingHorizontal: 15 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "600",
                              marginBottom: 5,
                            }}
                          >
                            Your Role
                          </Text>
                          <TextInput
                            placeholder="Enter company name"
                            style={{
                              borderWidth: 0.5,
                              width: "80%",
                              borderColor: "grey",
                            }}
                          />
                        </View>
                        <View style={{ margin: 5, paddingHorizontal: 15 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "600",
                              marginBottom: 5,
                            }}
                          >
                            Period
                          </Text>
                          <TextInput
                            placeholder="Enter company name"
                            style={{
                              borderWidth: 0.5,
                              width: "80%",
                              borderColor: "grey",
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            backgroundColor: "#f2f2f2",
                            height: 70,
                            paddingHorizontal: 2,
                            marginTop: 30,
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <TouchableOpacity>
                            <View
                              style={{
                                flexDirection: "row",
                                backgroundColor: "#FF5A5F",
                                alignItems: "center",
                                marginLeft: 20,
                                padding: 10,
                                borderRadius: 5,
                              }}
                            >
                              <AntDesign
                                name="delete"
                                size={20}
                                color="white"
                              />
                              <Text style={{ padding: 0, color: "white" }}>
                                Delete
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <View>
                            <AntDesign
                              name="upcircle"
                              size={24}
                              color="#FFA85A"
                              style={{ marginRight: 10 }}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                    {isNew && (
                      <View
                        style={{
                          backgroundColor: "white",
                          height: 300,
                          marginTop: 30,
                          width: "90%",
                          borderWidth: 1,
                          borderColor: "grey",
                          marginHorizontal: 23,
                        }}
                      >
                        <View style={{ margin: 5, paddingHorizontal: 15 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "600",
                              marginBottom: 5,
                            }}
                          >
                            Company Name
                          </Text>
                          <TextInput
                            placeholder="Enter company name"
                            style={{
                              borderWidth: 0.5,
                              width: "80%",
                              borderColor: "grey",
                            }}
                          />
                        </View>
                        <View style={{ margin: 5, paddingHorizontal: 15 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "600",
                              marginBottom: 5,
                            }}
                          >
                            Your Role
                          </Text>
                          <TextInput
                            placeholder="Enter company name"
                            style={{
                              borderWidth: 0.5,
                              width: "80%",
                              borderColor: "grey",
                            }}
                          />
                        </View>
                        <View style={{ margin: 5, paddingHorizontal: 15 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "600",
                              marginBottom: 5,
                            }}
                          >
                            Period
                          </Text>
                          <TextInput
                            placeholder="Enter company name"
                            style={{
                              borderWidth: 0.5,
                              width: "80%",
                              borderColor: "grey",
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            backgroundColor: "#f2f2f2",
                            height: 70,
                            paddingHorizontal: 2,
                            marginTop: 30,
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <TouchableOpacity>
                            <View
                              style={{
                                flexDirection: "row",
                                backgroundColor: "green",
                                alignItems: "center",
                                marginLeft: 20,
                                padding: 10,
                                borderRadius: 5,
                              }}
                            >
                              <AntDesign
                                name="checkcircle"
                                size={20}
                                color="white"
                              />
                              <Text style={{ padding: 3, color: "white" }}>
                                Create
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <View>
                            <AntDesign
                              name="upcircle"
                              size={24}
                              color="#FFA85A"
                              style={{ marginRight: 10 }}
                            />
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </Modal>
              <Pressable onPress={() => setModalVisible(true)}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                    paddingHorizontal: 5,
                    alignItems: "flex-end",
                  }}
                >
                  Job History
                </Text>
              </Pressable>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                2 companies
              </Text>
              <AntDesign
                name="right"
                size={15}
                color="grey"
                style={{ alignSelf: "flex-end" }}
              />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 50,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="book-education-outline"
                size={24}
                color="black"
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  paddingHorizontal: 5,
                  alignItems: "flex-end",
                }}
              >
                Education
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                2 insitutes
              </Text>
              <AntDesign
                name="right"
                size={15}
                color="grey"
                style={{ alignSelf: "flex-end" }}
              />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 50,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <FontAwesome name="globe" size={24} color="black" />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  paddingHorizontal: 5,
                  alignItems: "flex-end",
                }}
              >
                Social media
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                2 accounts
              </Text>
              <AntDesign
                name="right"
                size={15}
                color="grey"
                style={{ alignSelf: "flex-end" }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#f2f2f2",
            height: 100,
            borderBottomWidth: 3,
            borderBottomColor: "white",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", paddingLeft: 30 }}>
            More about me
          </Text>
          <View
            style={{
              width: "100%",
              height: 50,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="certificate"
                size={24}
                color="black"
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  paddingHorizontal: 5,
                  alignItems: "flex-end",
                }}
              >
                certifications
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                2 companies
              </Text>
              <AntDesign
                name="right"
                size={15}
                color="grey"
                style={{ alignSelf: "flex-end" }}
              />
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: "#f2f2f2", height: 200 }}>
          <View
            style={{
              alignSelf: "center",
              width: "60%",
              height: 100,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  backgroundColor: "#ff5a5f",
                  padding: 12,

                  fontSize: 14,
                  fontWeight: "600",
                  borderRadius: 5,
                  color: "white",
                  textAlign: "center",
                }}
              >
                Get started
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
            <Text
              style={{ fontSize: 14, fontWeight: "600", borderBottomWidth: 2 }}
            >
              Back to user roles
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  TopC1: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
  },
  centeredView: {
    backgroundColor: "#f2f2f2",
  },
});
