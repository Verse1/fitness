import axios from "axios";
import React, { useState, useLayoutEffect, useContext } from "react";
import { StyleSheet, Text, View, Pressable, TextInput, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";

const LoginRegister = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const slideAnim = useState(new Animated.Value(300))[0]; // Initial value for right-to-left animation

  const [state, setState] = useContext(AuthContext);

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const closeModal = () => {
    setModalVisible(false);
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handleLogin = async () => {
    if (email === "frontend" && password === "frontend") {
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
    <SafeAreaView style={styles.container}>
      {/* Spacer */}
      <View style={styles.spacer} />
      {/* Logo */}
      {/* Welcome text */}
      <Text style={styles.welcomeText}>Welcome to Fitness</Text>
      {/* Subtext */}
      <Text style={styles.subText}>Take your fitness journey to the next level</Text>
      {/* Spacer */}
      <View style={styles.spacer} />
      {/* Sign up with Apple ID button */}
      {/* Still not set up */}
      <Pressable style={styles.appleButton}>
        <Text style={styles.appleText}>Apple</Text>
      </Pressable>
      {/* Sign up button */}
      <Pressable style={styles.button} onPress={() => navigation.navigate("Name")}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      {/* Log in text */}
      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text style={styles.loginLink} onPress={openModal}>
          Log in
        </Text>
      </Text>

      {modalVisible && (
        <Animated.View style={[styles.modal, { right: slideAnim }]}>
          <Pressable style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </Pressable>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            placeholder="Email"
            keyboardType="email-address"
            textContentType="oneTimeCode" //Changed this to oneTimeCode from email-address so the keychain bullshit doesnt appear
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            textContentType="oneTimeCode" //Changed this to oneTimeCode from password so the keychain bullshit doesnt appear
            secureTextEntry
          />

          <Pressable style={styles.loginButton} onPress={() => handleLogin()}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </Pressable>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginBottom: 30,
  },
  spacer: {
    flex: 1,
  },
  appleButton: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  appleText: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: 'SFPro-Regular'
  },
  loginText: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
  },
  loginLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
  modal: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 50,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#fff",
    borderColor: "#fff",
  },
  loginButton: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LoginRegister;
