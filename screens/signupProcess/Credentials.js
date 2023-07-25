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
import { LinearGradient } from "expo-linear-gradient";
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
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              {/* Progress bar */}
              <LinearGradient  colors={['#151919', '#253237']} start={{x:0}} end={{x:1}} style={styles.progressContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
              
                      <AntDesign name="arrowleft" style={{ color: "#FFFAFA", fontSize: 20, paddingTop: 0, paddingRight: screenWidth * 0.01}} />
                  </Pressable>
                    <View style={styles.progressBar}>
                      <View style={styles.progress} />
                    </View>
                    <Text style={styles.progressText}>6 of 6</Text>
                  </View>
                  <Text style={{color: '#D7F2F4', paddingBottom: screenHeight  *0.1, fontSize: 38, width: screenWidth * 1, fontWeight: '700', paddingLeft: screenWidth * .02}}>Almost Done!</Text>

              </LinearGradient>

              {/* Prompt */}
            
            </View>

            {/* Content */}
            <View style={styles.content}>
              {/* Email input */}
              <View style={styles.main}>
                <TextInput
                  placeholder="Email Address"
                  placeholderTextColor={'#D7F2F4'}
                  style={styles.textbox}
                  onChangeText={setEmail}
                  autoFocus={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={'#D7F2F4'}
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
                  <Text style={styles.text}>Done</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  "#0F0E0E"
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
    backgroundColor: "#D7F2F4",
    width: "80%",
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.7,
    borderColor: "blue",
    alignSelf: "center",
  },
  textbox: {
    backgroundColor: "#151919",
    width: "80%",
    padding: 15,
    borderRadius: 8,

    borderColor: "gray",
    alignSelf: "center",
    marginVertical: 10,
  },
  main: {
    width: "100%",
  },
  text: {
    color: "#151919",
    textAlign: "center",
    fontWeight: "700",
  },
  Titles: {
    paddingBottom: 20,
  },
  buttonView: {
    alignItems: "center",
    marginBottom: screenHeight * 0.05,
  },
  backButton: {
    paddingLeft: 8,
    marginTop:  screenHeight * 0.073,
    paddingRight: 10
  },
  backButtonText: {
    fontSize: 18,
  },
  progressContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: '#151919',
    height: screenHeight * 0.28,
    borderBottomRightRadius: 120

  },
  progressBar: {
    backgroundColor: "lightgrey",
    height: 10,
    width: Dimensions.get("window").width - 140,
    borderRadius: 5,
    marginRight: 10,
    marginTop:  screenHeight * 0.08
  },
  progress: {
    height: "100%",
    width: `${(6 / 6) * 100}%`,
    borderRadius: 5,
    backgroundColor: "blue",
  },
  progressText: {
    marginRight: 8,
    color:  "#D7F2F4",
    marginTop:  screenHeight * 0.075,
    marginLeft: 8

  },
});

export default Credentials;
