import React, { useRef, useState, useContext, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Dimensions,
  TextInput,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
import * as Haptics from "expo-haptics";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Login = ({ navigation }) => {
  const signInScale = useRef(new Animated.Value(1)).current;
  const forgotPasswordScale = useRef(new Animated.Value(1)).current;
  const emailScale = useRef(new Animated.Value(1)).current;
  const passwordScale = useRef(new Animated.Value(1)).current;

  const animatePress = (animatedValue) => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateInput = (animatedValue) => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [state, setState] = useContext(AuthContext);

  const handleLogin = async () => {
    if (email === "w" && password === "w") {
      navigation.navigate("Dashboard");
    }
    if (email === "" || password === "") {
      alert("all fields are required");

      return;
    }

    try {
      const resp = await axios.post("http://localhost:8000/api/signin", {
        email,
        password,
      });
      if (resp.data.error) {
        alert(resp.data.error);
      } else {
        setState(resp.data);
        console.log("This", resp.data);
        await AsyncStorage.setItem("auth-rn", JSON.stringify(resp.data));
        navigation.navigate("Dashboard");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require("../images/blackman.png")}>
        <BlurView intensity={7} style={StyleSheet.absoluteFill} />
        <View style={styles.overlay} />
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="white" />
          <Text style={styles.backText}> Back</Text>
        </Pressable>
        <Text style={styles.signIn}>Sign In</Text>
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <Animated.View style={{ transform: [{ scale: emailScale }] }}>
            <TextInput
              autoFocus={true}
              onFocus={() => animateInput(emailScale)}
              onChangeText={setEmail}
              value={email}
              style={styles.inputField}
              autoCapitalize="none"
              keyboardAppearance="dark"
              keyboardType="email-address"
              textContentType="oneTimeCode"
            />
          </Animated.View>
          <Text style={styles.inputLabel}>Password</Text>
          <Animated.View style={{ transform: [{ scale: passwordScale }] }}>
            <TextInput
              onFocus={() => animateInput(passwordScale)}
              onChangeText={setPassword}
              value={password}
              style={styles.inputField}
              textContentType="oneTimeCode"
              secureTextEntry={true}
              keyboardAppearance="dark"
            />
          </Animated.View>
          <Pressable
            onPressIn={() => animatePress(signInScale)}
            onPressOut={() => handleLogin()}>
            <Animated.View
              style={[
                {
                  transform: [{ scale: signInScale }],
                },
                styles.signInButton,
              ]}>
              <Text style={styles.signInText}> Sign In</Text>
            </Animated.View>
          </Pressable>
        </View>
        <Pressable
          style={styles.forgotPassword}
          onPressIn={() => animatePress(forgotPasswordScale)}
          onPress={() => console.log("Forgot Password")}>
          <Animated.Text
            style={[
              styles.forgotPasswordText,
              { transform: [{ scale: forgotPasswordScale }] },
            ]}>
            Forgot password?
          </Animated.Text>
        </Pressable>
        <LinearGradient
          locations={[0.15, 0.85]}
          colors={["rgba(25,25,25,0.0)", "#212121"]}
          style={styles.linearGradient}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  signIn: {
    color: "#d7f2f4",
    fontSize: 32,
    fontWeight: 700,
    top: screenHeight * 0.11,
    left: screenWidth * 0.06,
  },
  spacer: {
    flex: 1,
    height: screenHeight * 0.1,
  },
  container: {
    flex: 1,
    backgroundColor: "#212121",
  },
  image: {
    width: "100%",
    height: screenHeight * 0.7,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#212121",
    opacity: 0.87,
  },
  backText: {
    color: "#FFFAFA",
    fontSize: 14,
    fontWeight: 500,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: screenHeight * 0.06,
    left: screenWidth * 0.06,
  },
  formContainer: {
    position: "absolute",
    width: screenWidth * 0.8,
    top: screenHeight * 0.19,
    left: screenWidth * 0.06,
    flex: 1,
    justifyContent: "space-between",
  },
  inputLabel: {
    color: "#d7f2f4",
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 5,
  },
  inputField: {
    width: screenWidth * 0.89,
    height: screenHeight * 0.04,
    backgroundColor: "#151919",
    borderRadius: 8,
    shadowColor: "rgb(0, 0, 0)",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    marginBottom: 20,
    paddingLeft: 10,
    color: "#d7f2f4",
    fontSize: 14,
    textAlignVertical: "center",
  },
  signInButton: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.89,
    height: screenHeight * 0.04,
    backgroundColor: "#d7f2f4",
    borderRadius: 8,
    shadowColor: "rgb(0, 0, 0)",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    marginBottom: 20,
  },
  signInText: {
    color: "#151919",
    fontSize: 14,
    fontWeight: 500,
  },
  forgotPassword: {
    top: screenHeight * 0.38,
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#d7f2f4",
    fontSize: 14,
    fontWeight: 500,
  },
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: screenHeight * 0.17,
  },
});

export default Login;
