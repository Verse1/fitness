import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import React, { useLayoutEffect, useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
// import a from "@ant-design/react-native/lib/modal/alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { json } from "d3";
import { AuthContext } from "../../context/auth";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Credentials = () => {
  const route = useRoute();

  const {
    userInfo,
    userGender,
    userAge,
    userHeight,
    userWeight,
    heightUnit,
    weightUnit,
    userCalories,
    userProtein,
    userCarbs,
    userFats,
  } = route.params;


  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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
        heightUnit: heightUnit,
        weightUnit: weightUnit,
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
      // Handle the error case
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              {/* Progress bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={styles.progress} />
                </View>
                <Text style={styles.progressText}>6 of 6!</Text>
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

              {/* Prompt */}
              <View style={styles.Titles}>
                <Text style={styles.title}>Almost There</Text>
                <Text style={styles.title}>Some text over here</Text>
              </View>
            </View>

            {/* Content */}
            <View style={styles.content}>
              {/* Email input */}
              <View style={styles.main}>
                <TextInput
                  placeholder="Email Address"
                  style={styles.textbox}
                  onChangeText={setEmail}
                  autoFocus={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <TextInput
                  placeholder="Password"
                  style={styles.textbox}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                />
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              {/* Continue button */}
              <View style={styles.buttonView}>
                <Pressable style={styles.cont} onPress={handleCredentials}>
                  <Text style={styles.text}>Continue</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: "flex-start",
  },
  content: {
    flex: 2,
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontWeight: "700",
    fontSize: 30,
    textAlign: "center",
    paddingLeft: 15,
    paddingTop: 10,
  },
  cont: {
    backgroundColor: "blue",
    width: "80%",
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.7,
    borderColor: "blue",
    marginVertical: 5,
  },
  textbox: {
    backgroundColor: "white",
    width: "80%",
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.7,
    borderColor: "gray",
    alignSelf: "center",
    marginVertical: 5,
  },
  main: {
    width: "100%",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
  Titles: {
    paddingBottom: 20,
  },
  buttonView: {
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingLeft: 15,
  },
  backButtonText: {
    fontSize: 18,
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
    width: `${(6 / 6) * 100}%`,
    borderRadius: 5,
    backgroundColor: "blue",
  },
  progressText: {
    marginRight: 7.5,
  },
});

export default Credentials;
