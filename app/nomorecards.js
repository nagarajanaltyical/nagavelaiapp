//React Native Button
//https://aboutreact.com/react-native-button/

//import React in our code
import React from "react";

//import all the components we are going to use
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";

const NomoreCards = ({ navigation }) => {
  const onPressLearnMore = () => {
    //For generating alert on buttton click
    navigation.navigate("bottomhome");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* enclose all components in this View tag */}
      <View style={styles.container}>
        <Text>Button Example</Text>
        {/* Button whith handler function named onPressLearnMore*/}
        <Button onPress={onPressLearnMore} title="Click Me" color="#841584" />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default NomoreCards;
