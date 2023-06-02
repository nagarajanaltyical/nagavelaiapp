import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

export default function Updatefile() {
  const [fileResponse, setfileResponse] = useState([]);
  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });

      setfileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);
  return (
    <View style={Styles.container}>
      <Text>{fileResponse ? fileResponse.name : ""}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "black",
          color: "white",
          width: "90%",
          alignItems: "center",
          alignSelf: "center",
          padding: 10,
          borderRadius: 10,
        }}
        onPress={handleDocumentSelection}
      >
        <Text style={{ color: "white", fontSize: 20 }}>attach your files</Text>
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
