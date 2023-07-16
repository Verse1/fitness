import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Dimensions,
  Switch,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Metrics = () => {
  const route = useRoute();
  const { userName, userGender, userAge } = route.params;

  const navigation = useNavigation();
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [isMetricWeight, setIsMetricWeight] = useState(false);
  const [isMetricHeight, setIsMetricHeight] = useState(false);

  const weightOptions = Array.from({ length: 161 }, (_, i) => ({
    label: `${i + 40}`,
    value: i + 40,
  }));
  const heightOptions = Array.from({ length: 151 }, (_, i) => ({
    label: `${i + 100}`,
    value: i + 100,
  }));

  const toggleWeightSwitch = () => setIsMetricWeight((previousState) => !previousState);
  const toggleHeightSwitch = () => setIsMetricHeight((previousState) => !previousState);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleMeasure = () => {
    navigation.navigate("Macros", {
      userInfo: userName,
      userGender: userGender,
      userAge: userAge,
      userHeight: height,
      userWeight: weight,
      heightUnit: isMetricHeight,
      weightUnit: isMetricWeight,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
        <Text style={styles.progressText}>4 of 6</Text>
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
        <View style={styles.measureContainer}>
          {/* Weight input */}
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={setWeight}
                items={weightOptions}
                placeholder={{ label: "Weight", value: null }}
              />
            </View>
            <View style={styles.switchContainer}>
              <Switch onValueChange={toggleWeightSwitch} value={isMetricWeight} />
              <Text>{isMetricWeight ? "kg" : "lbs"}</Text>
            </View>
          </View>

          {/* Height input */}
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={setHeight}
                items={heightOptions}
                placeholder={{ label: "Height", value: null }}
              />
            </View>
            <View style={styles.switchContainer}>
              <Switch onValueChange={toggleHeightSwitch} value={isMetricHeight} />
              <Text>{isMetricHeight ? "cm" : "inches"}</Text>
            </View>
          </View>
        </View>

        {/* Continue button */}
        <View style={styles.buttonView}>
          <Pressable style={styles.cont} onPress={handleMeasure}>
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
    width: `${(4 / 6) * 100}%`,
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
  measureContainer: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  input: {
    width: "70%",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "25%",
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
    marginRight: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
});

export default Metrics;
