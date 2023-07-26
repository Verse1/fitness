import React, { useLayoutEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
  Easing,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const MacroSelection = () => {
  const navigation = useNavigation();
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  const route = useRoute();
  const { userInfo, userGender, userAge, userWeight, userHeight } = route.params;

  const scrollViewRef = useRef(null);
  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]).current;
  const offsets = useRef([0, 0, 0, 0]).current;

  const handleContinue = () => {
    const inputs = [calories, protein, carbs, fats];
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i]) {
        scrollViewRef.current.scrollTo({
          x: 0,
          y: offsets.current[i] - 200,
          animated: true,
        });
        inputRefs[i].current.focus();
        return;
      }
    }
    navigation.navigate("WorkoutSplitSelection", {
      userInfo: userInfo,
      userGender: userGender,
      userAge: userAge,
      userWeight: userWeight,
      userHeight: userHeight,
      userCalories: calories,
      userProtein: protein,
      userCarbs: carbs,
      userFats: fats,
    });
  };

  const progressAnim = useRef(new Animated.Value((4 / 8) * 100)).current;

  const progressStyle = {
    height: "100%",
    width: progressAnim.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
    }),
    borderRadius: 5,
    backgroundColor: "#116CE4",
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    Animated.timing(progressAnim, {
      toValue: (6 / 8) * 100,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.elastic(1),
    }).start();
  }, []);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      ref={scrollViewRef}
      contentContainerStyle={styles.containerContent}
      getTextInputRefs={() => inputRefs}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.shadow}>
            <LinearGradient
              colors={["#151919", "#1D2528"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.header}>
              <View style={styles.progressContainer}>
                <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                  <Feather name="chevron-left" size={24} color="white" />
                </Pressable>
                <View style={styles.progressBar}>
                  <Animated.View style={progressStyle} />
                </View>
                <Text style={styles.progressText}>6 of 8</Text>
              </View>
              <View style={styles.Titles}>
                <Text style={styles.title}>What is your daily macro intake?</Text>
              </View>
            </LinearGradient>
          </View>
        </View>
        <View style={styles.fullScreen}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={styles.inputContainer}>
              <Text style={styles.quantityText}>Quantity Per Day</Text>
              {[
                { name: "Calories", setFunction: setCalories, unit: "kCal" },
                { name: "Protein", setFunction: setProtein, unit: "g" },
                { name: "Carbs", setFunction: setCarbs, unit: "g" },
                { name: "Fats", setFunction: setFats, unit: "g" },
              ].map((item, index) => (
                <View
                  key={index}
                  style={styles.inputRow}
                  onLayout={(event) => {
                    offsets.current[index] = event.nativeEvent.layout.y;
                  }}>
                  <Text style={styles.inputLabel}>{item.name}</Text>
                  <View style={styles.inputAndUnit}>
                    <LinearGradient
                      colors={["#151919", "#253237"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.inputBackground}
                    />
                    <TextInput
                      ref={inputRefs[index]}
                      style={styles.input}
                      onChangeText={item.setFunction}
                      placeholderTextColor="#D7F2F4"
                      keyboardType="numeric"
                      maxLength={4}
                      keyboardAppearance="dark"
                    />
                    <Text style={styles.inputUnit}>{item.unit}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.footer}>
              <View style={styles.buttonView}>
                <Pressable style={styles.continue} onPress={handleContinue}>
                  <Text style={styles.text}>Continue</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0E0E",
  },
  containerContent: {
    flexGrow: 1,
    backgroundColor: "#0F0E0E",
  },
  headerContainer: {
    paddingBottom: 10,
    overflow: "visible",
    position: "absolute",
    zIndex: 2,
    width: "100%",
  },
  shadow: {
    backgroundColor: "transparent",
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  header: {
    justifyContent: "flex-start",
    borderBottomRightRadius: 117,
    height: screenHeight * 0.28,
  },
  progressContainer: {
    top: screenHeight * 0.07,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingLeft: 5,
    paddingRight: 10,
  },
  progressBar: {
    backgroundColor: "#FFFAFA",
    height: 10,
    width: screenWidth - 140,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 5,
  },
  progressText: {
    marginRight: 10,
    color: "#FFFAFA",
    fontWeight: "500",
  },
  Titles: {
    top: screenHeight * 0.1,
    width: "90%",
    paddingLeft: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 40,
    textAlign: "left",
    color: "#D7F2F4",
  },
  fullScreen: {
    flex: 1,
    marginTop: screenHeight * 0.28,
    backgroundColor: "#0F0E0E",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  content: {
    flex: 2,
    justifyContent: "center",
  },
  inputContainer: {
    alignItems: "flex-start",
    paddingLeft: screenWidth * 0.165,
    paddingTop: screenHeight * 0.12,
  },
  quantityText: {
    fontSize: 24,
    color: "#FFFAFA",
    fontWeight: "700",
    paddingBottom: screenHeight * 0.03,
    alignSelf: "flex-start",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inputLabel: {
    color: "#D7F2F4",
    width: screenWidth * 0.3,
    fontSize: 16,
    fontWeight: "700",
  },
  inputAndUnit: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    width: 140,
    height: 40,
    marginLeft: 10,
  },
  inputBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    color: "#D7F2F4",
    paddingHorizontal: 5,
    backgroundColor: "transparent",
    fontWeight: "500",
    fontSize: 16,
  },
  inputUnit: {
    color: "#D7F2F4",
    marginLeft: 5,
    fontWeight: "100",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  buttonView: {
    alignItems: "center",
    marginBottom: 40,
  },
  continue: {
    backgroundColor: "#D7F2F4",
    width: "80%",
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.7,
    height: screenHeight * 0.045,
  },
  text: {
    color: "#151919",
    textAlign: "center",
    fontWeight: "700",
  },
});

export default MacroSelection;
