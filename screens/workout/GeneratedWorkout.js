import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function GeneratedWorkout() {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.pop(2);
  };

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Feather name="chevron-left" size={24} color="#FFFAFA" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: "#0f0e0e",
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    marginLeft: 20,
  },
});

export default GeneratedWorkout;
