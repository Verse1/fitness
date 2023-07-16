import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

const Macros = () => {
  const route = useRoute();

  const {
    userInfo,
    userGender,
    userAge,
    userHeight,
    userWeight,
    heightUnit,
    weightUnit,
  } = route.params;

  const navigation = useNavigation();
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleContinue = () => {
    navigation.navigate("Credentials", {
      userInfo: userInfo,
      userGender: userGender,
      userAge: userAge,
      userHeight: userHeight,
      userWeight: userWeight,
      heightUnit: heightUnit,
      weightUnit: weightUnit,
      userCalories: calories,
      userProtein: protein,
      userCarbs: carbs,
      userFats: fats,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
        <Text style={styles.progressText}>5 of 6</Text>
      </View>
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
      <View style={styles.inputContainer}>
        <TextInput placeholder="Cals" style={styles.input} onChangeText={setCalories} />
        <TextInput placeholder="Protein" style={styles.input} onChangeText={setProtein} />
        <TextInput placeholder="Carbs" style={styles.input} onChangeText={setCarbs} />
        <TextInput placeholder="Fats" style={styles.input} onChangeText={setFats} />
      </View>
      <View style={styles.buttonView}>
        <Pressable style={styles.cont} onPress={handleContinue}>
          <Text style={styles.text}>Continue</Text>
        </Pressable>
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
    width: `${(5 / 6) * 100}%`,
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
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#ccc",
    width: 200,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    paddingLeft: 10,
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
    marginRight: 7.5,
  },
});

export default Macros;
