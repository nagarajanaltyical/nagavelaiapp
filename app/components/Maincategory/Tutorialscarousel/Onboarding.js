import { View, Text, FlatList, StyleSheet, Animated } from "react-native";
import React from "react";
import Paginator from "./Paginator";
import { useState, useRef } from "react";
import OnboardingItem from "./OnboardingItem";
import { useDispatch } from "react-redux";
// import tutorialData from "../slider";
import tutorialData from "../../../../slider";
import NextButton from "./NextButton";
export default function Onboarding({ route }) {
  console.log("im the data of route");
  console.log(route.params);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastitem, setlastItem] = useState(false);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const slidersRef = useRef(null);
  const Reduxdispatch = useDispatch();
  //make the arrow to move slides
  const scrollTo = () => {
    console.log(tutorialData.length);
    if (currentIndex < tutorialData.length - 1) {
      slidersRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log("Last Item");
      Reduxdispatch({ type: "Iam_user" });
    }
  };

  const scrollx = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <FlatList
        data={tutorialData}
        horizontal
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollx } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        ref={slidersRef}
        renderItem={({ item }) => <OnboardingItem item={item} />}
      />
      {/* <Paginator data={tutorialData} scrollx={scrollx} /> */}
      <NextButton scrollTo={scrollTo} lastitem={lastitem} />
    </View>
  );
}
