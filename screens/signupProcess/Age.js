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
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const AgeSelection = () => {
  const route = useRoute();
  const { userInfo, userGender } = route.params;

  console.log(userInfo);
  const navigation = useNavigation();
  const [selectedAge, setSelectedAge] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Age options
  const ageOptions = Array.from({ length: 82 }, (_, i) => {
    const age = i + 18;
    return { label: age.toString(), value: age };
  });

  const handleAgeSelection = (age) => {
    setSelectedAge(age);
  };

  const handleContinue = () => {
    navigation.navigate("Metrics", {
      userName: userInfo,
      userGender: userGender,
      userAge: selectedAge,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
        <Text style={styles.progressText}>3 of 6</Text>
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
            borderRadius: 50,
          }}>
          <AntDesign name="arrowleft" style={{ color: "white", fontSize: 20 }} />
        </View>
      </Pressable>

      <View style={styles.content}>
        {/* Age selector */}
        <View style={styles.ageSelectorContainer}>
          <RNPickerSelect
            onValueChange={handleAgeSelection}
            items={ageOptions}
            style={pickerSelectStyles}
            value={selectedAge}
            placeholder={{ label: "Select your age...", value: null }}
          />
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
    width: `${(3 / 6) * 100}%`,
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
  ageSelectorContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  cont: {
    backgroundColor: "blue",
    width: "80%",
    padding: 10,
    borderRadius: 10,
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
    marginRight: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "rgb(225,225,225)",
    width: 200,
    padding: 20,
    borderColor: "gray",
    alignSelf: "center",
    marginVertical: 5,
    borderRadius: 20,
    fontSize: 15,
  },
});

export default AgeSelection;
