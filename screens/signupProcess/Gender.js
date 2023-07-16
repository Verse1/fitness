import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

// Screen dimensions
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Gender = () => {
  const route = useRoute();
  const { userName } = route.params;

  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  const handleContinue = () => {
    navigation.navigate("Age", { userInfo: userName, userGender: selectedGender });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
        <Text style={styles.progressText}>2 of 6</Text>
      </View>

      {/* Back button */}
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <View
          style={{
            backgroundColor: "blue",
            width: screenWidth * 0.1,
            height: screenWidth * 0.1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
          }}>
          <AntDesign name="arrowleft" style={{ color: "white", fontSize: 20 }} />
        </View>
      </Pressable>

      <View style={styles.content}>
        {/* Gender buttons */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.genderButton,
              selectedGender === "female" && styles.selectedGenderButton,
            ]}
            onPress={() => handleGenderSelection("female")}>
            <Text style={styles.genderButtonText}>Female</Text>
          </Pressable>

          <Pressable
            style={[
              styles.genderButton,
              selectedGender === "male" && styles.selectedGenderButton,
            ]}
            onPress={() => handleGenderSelection("male")}>
            <Text style={styles.genderButtonText}>Male</Text>
          </Pressable>
        </View>

        {/* Continue button */}
        <View style={styles.buttonView}>
          <Pressable style={styles.cont} onPress={handleContinue}>
            <Text style={styles.text}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  progressBar: {
    backgroundColor: "lightgrey",
    height: 10,
    width: Dimensions.get("window").width - 90,
    borderRadius: 5,
    marginRight: 10,
  },
  progress: {
    height: "100%",
    width: `${(2 / 6) * 100}%`,
    borderRadius: 5,
    backgroundColor: "blue",
  },
  backButton: {
    alignSelf: "flex-start",
    paddingLeft: 15,
  },
  backButtonText: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  genderButton: {
    backgroundColor: "#ccc",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 70,
  },
  selectedGenderButton: {
    backgroundColor: "blue",
    borderColor: "blue",
  },
  genderButtonText: {
    textAlign: "center",
    fontWeight: "700",
    color: "#fff",
    fontSize: 24,
  },
  cont: {
    backgroundColor: "blue",
    width: "80%",
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.7,
    borderColor: "blue",
    alignSelf: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
  buttonView: {
    alignItems: "center",
    marginBottom: 20,
  },
  progressText: {
    marginRight: 10,
  },
});

export default Gender;
