//import liraries
import React, { Component } from "react";
import { StatusBar } from "react-native";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// create a component
function MyComponent() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
      <Button
        title="This works"
        onPress={() =>
          navigation.navigate("Meals", {
            screen: "Meals",
            params: { screen: "Past" },
          })
        } // << HERE - How do I get to the "Past" tab?
      />
    </View>
  );
}

function MealsUpcomingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Upcoming</Text>
    </View>
  );
}

function MealsPastScreen({ route }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>PAST!!!!!!</Text>
    </View>
  );
}

const MealsStack = createStackNavigator();
const MealsTabs = createMaterialTopTabNavigator();
function MealsNavigator() {
  return (
    <MealsStack.Navigator>
      <MealsStack.Screen
        name="Meals"
        component={MealsScreenTabs}
        options={{ headerTitle: "Meals" }}
      />
    </MealsStack.Navigator>
  );
}

function MealsScreenTabs() {
  return (
    <MealsTabs.Navigator
      tabBarOptions={{
        activeTintColor: "#ffffff",
        inactiveTintColor: "#36A7E7",
        showIcon: true,
        pressColor: "#9BC9E2",
        scrollEnabled: false,
        tabStyle: {
          borderRadius: 30,
          margin: 12,
          justifyContent: "center",
          alignContent: "center",
        },
        indicatorStyle: {
          backgroundColor: "#36A7E7",
          height: "80%",
          borderRadius: 30,
          marginBottom: 8,
          marginLeft: 12,
          width: "45%",
        },
        style: {
          backgroundColor: "#1F4C5B ",
          borderRadius: 36,
          margin: 24,
          height: 76,
          width: "90%",
        },
        labelStyle: { fontSize: 14 },
      }}
    >
      <MealsTabs.Screen name="Upcoming" component={MealsUpcomingScreen} />
      <MealsTabs.Screen name="Past" component={MealsPastScreen} />
    </MealsTabs.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Meals" component={MealsNavigator} />
    </Tab.Navigator>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

//make this component available to the app
export default MyComponent;
