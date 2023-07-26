import React, { useLayoutEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import FemaleInactive from "../../assets/femaleInactive.svg";
import FemaleActive from "../../assets/femaleActive.png";
import MaleInactive from "../../assets/maleInactive.svg";
import MaleActive from "../../assets/maleActive.png";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Gender = () => {
  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState(null);
  const scaleValue1 = useRef(new Animated.Value(1)).current;
  const scaleValue2 = useRef(new Animated.Value(1)).current;

  const route = useRoute();
  const { userName } = route.params;

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  const handlePressIn = (buttonNumber) => {
    Animated.spring(buttonNumber === 1 ? scaleValue1 : scaleValue2, {
      toValue: 0.95,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (buttonNumber) => {
    Animated.spring(buttonNumber === 1 ? scaleValue1 : scaleValue2, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleContinue = () => {
    navigation.navigate("Age", { userInfo: userName, userGender: selectedGender });
  };

  const progressAnim = useRef(new Animated.Value(0)).current;

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
      toValue: (2 / 8) * 100,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.elastic(1),
    }).start();
  }, []);

  return (
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
              <Text style={styles.progressText}>2 of 8</Text>
            </View>
            <View style={styles.Titles}>
              <Text autoCorrect={false} style={styles.title}>
                What is your gender?
              </Text>
            </View>
          </LinearGradient>
        </View>
      </View>
      <View style={styles.fullScreen}>
        <View style={styles.content}>
          <View style={styles.buttonContainer}>
            <Animated.View
              style={[
                styles.buttonStyle,
                {
                  marginRight: 12.5,
                  transform: [{ scale: scaleValue1 }],
                },
              ]}>
              <TouchableOpacity
                style={styles.buttonInner}
                onPressIn={() => handlePressIn(1)}
                onPressOut={() => handlePressOut(1)}
                onPress={() => handleGenderSelection("female")}>
                {selectedGender === "female" ? (
                  <Image source={FemaleActive} style={styles.buttonSvg} />
                ) : (
                  <FemaleInactive style={styles.buttonSvg} />
                )}
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={[
                styles.buttonStyle,
                {
                  marginLeft: 12.5,
                  transform: [{ scale: scaleValue2 }],
                },
              ]}>
              <TouchableOpacity
                style={styles.buttonInner}
                onPressIn={() => handlePressIn(2)}
                onPressOut={() => handlePressOut(2)}
                onPress={() => handleGenderSelection("male")}>
                {selectedGender === "male" ? (
                  <Image source={MaleActive} style={styles.buttonSvg} />
                ) : (
                  <MaleInactive style={styles.buttonSvg} />
                )}
              </TouchableOpacity>
            </Animated.View>
          </View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: Dimensions.get("window").width - 140,
    borderRadius: 5,
    marginRight: 10,
    margingLeft: 5,
  },
  progress: {
    height: "100%",
    width: `${(2 / 8) * 100}%`,
    borderRadius: 5,
    backgroundColor: "#116CE4",
  },
  progressText: {
    marginRight: 10,
    color: "#FFFAFA",
    fontWeight: "500",
  },
  Titles: {
    top: screenHeight * 0.1,
    width: "70%",
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
  },
  content: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  buttonStyle: {
    width: 150,
    height: 175,
    backgroundColor: "#151919",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  buttonSvg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
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
    marginVertical: 5,
    position: "absolute",
    bottom: 10,
  },
  text: {
    color: "#151919",
    textAlign: "center",
    fontWeight: "700",
  },
});

export default Gender;
