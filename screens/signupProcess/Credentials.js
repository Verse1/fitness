import React, { useLayoutEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
  Easing,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Haptics from "expo-haptics";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Credentials = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useContext(AuthContext);

  const route = useRoute();
  const {
    userInfo,
    userGender,
    userAge,
    userWeight,
    userHeight,
    userCalories,
    userProtein,
    userCarbs,
    userFats,
  } = route.params;

  const handleCredentials = async () => {
    try {
      const resp = await axios.post("http://localhost:8000/api/signup", {
        name: userInfo,
        email,
        password,
        gender: userGender,
        weight: userWeight,
        height: userHeight,
        age: userAge,
        dailyCalories: userCalories,
        dailyProtein: userProtein,
        dailyCarbs: userCarbs,
        dailyFats: userFats,
      });
      console.log(resp.data.error);
      if (resp.data.error) {
        alert(resp.data.error);
      } else {
        setState(resp.data);
        await AsyncStorage.setItem("auth-rn", JSON.stringify(resp.data));
        alert("Nice");
        navigation.navigate("Dashboard");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const progressAnim = useRef(new Animated.Value((6 / 8) * 100)).current;

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
      toValue: (8 / 8) * 100,
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
              <Text style={styles.progressText}>8 of 8</Text>
            </View>
            <View style={styles.Titles}>
              <Text style={styles.title}>Create Your Login Details</Text>
            </View>
          </LinearGradient>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.fullScreen}>
          <View style={styles.content}>
            <View style={styles.main}>
              <View style={styles.textboxShadow}>
                <LinearGradient
                  colors={["#151919", "#253237"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.textboxBackground}>
                  <TextInput
                    placeholder="Email Address"
                    placeholderTextColor={"#D7F2F4"}
                    style={styles.textbox}
                    onChangeText={setEmail}
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardAppearance="dark"
                  />
                </LinearGradient>
              </View>
            </View>
            <View style={styles.main}>
              <View style={styles.textboxShadow}>
                <LinearGradient
                  colors={["#151919", "#253237"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.textboxBackground}>
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor={"#D7F2F4"}
                    style={styles.textbox}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    keyboardAppearance="dark"
                  />
                </LinearGradient>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.buttonView}>
              <Pressable style={styles.continue} onPress={handleCredentials}>
                <Text style={styles.text}>Done</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
  },
  textbox: {
    backgroundColor: "transparent",
    width: screenWidth * 0.9,
    height: screenHeight * 0.05,
    alignSelf: "center",
    borderRadius: 8,
    position: "absolute",
    zIndex: 1,
    fontWeight: "500",
    fontSize: 14,
    paddingLeft: 20,
    color: "#D7F2F4",
  },
  textboxBackground: {
    backgroundColor: "#151919",
    width: screenWidth * 0.9,
    height: screenHeight * 0.05,
    padding: 15,
    alignSelf: "center",
    borderRadius: 8,
    justifyContent: "center",
    fontSize: 15,
  },
  textboxShadow: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.05,
    alignSelf: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    backgroundColor: "#151919",
  },
  main: {
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: "#151919",
    textAlign: "center",
    fontWeight: "700",
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

export default Credentials;

// {/* <View style={styles.content}>
//   {/* Email input */}
//   <View style={styles.main}>
//     <TextInput
//       placeholder="Email Address"
//       placeholderTextColor={"#D7F2F4"}
//       style={styles.textbox}
//       onChangeText={setEmail}
//       autoFocus={true}
//       autoCorrect={false}
//       autoCapitalize="none"
//     />
//     <TextInput
//       placeholder="Password"
//       placeholderTextColor={"#D7F2F4"}
//       style={styles.textbox}
//       onChangeText={setPassword}
//       secureTextEntry={true}
//     />
//   </View>
// </View>; */}
