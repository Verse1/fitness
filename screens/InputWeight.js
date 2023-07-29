import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const InputWeight = () => {
  const navigation = useNavigation();
  const [state, setState] = useContext(AuthContext);

  const [weight, setWeight] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]); // re-run effect if navigation object changes

  const handleAdd = async () => {
    //Handle the add by sending back to backend etc
    if (weight === "") {
      alert("Please Enter Your Weight");
      return;
    }

    // Date details
    const today = new Date();
    const currentDate = today.toDateString();

    const weightToday = {
      weight: weight,
      date: currentDate.slice(4, 10) + currentDate.slice(10),
    };

    try {
      const resp = await axios.post("http://localhost:8000/api/addWeight", {
        weightToday,
        id: state.user._id,
      });
      if (resp.data.error) {
        alert(resp.data.error);
      } else {
        setState(resp.data);
        console.log("This", resp.data);
        await AsyncStorage.setItem("auth-rn", JSON.stringify(resp.data));
        navigation.navigate("Weight");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  return (
    <View style={{ flex: 1, paddingTop: screenHeight * 0.175, backgroundColor: '#0F0E0E'}}>
      <Text style={styles.today}>What is your weight today?</Text>
      <View style={{paddingTop: screenHeight * 0.2}}>
        <View style={styles.textboxShadow}>
        <LinearGradient
                    colors={["#151919", "#253237"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.textboxBackground}>
        <TextInput
          value={weight}
          caretHidden={true}
          placeholder="Enter Weight"
          style={styles.input}
          onChangeText={setWeight}
          placeholderTextColor="#D7F2F4"
                      keyboardAppearance="dark"
                      autoCorrect={false}></TextInput>
          </LinearGradient>
          </View>
        </View>

      <Pressable style={styles.button} onPress={handleAdd}>
        <Text style={styles.add}>Add Weight</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  today: {
    fontSize: screenWidth * 0.09,
    textAlign: "center",
    fontWeight: "500",
    color: '#D7F2F4'
  },
  input: {
    backgroundColor: "transparent",
    width: screenWidth * 0.5,
    height: screenHeight * 0.05,
    alignSelf: "center",
    borderRadius: 8,
    position: "absolute",
    zIndex: 1,
    fontWeight: "500",
    fontSize: 14,
    paddingLeft: 15,
    color: "#D7F2F4",
    // marginTop: screenHeight * 0.05

  },
  button: {
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    width: screenWidth * 0.8,
    backgroundColor: "#D7F2F4",
    borderRadius: 6,
    borderColor: "blue",
    marginLeft: screenWidth * 0.1,
    height: screenHeight * 0.05,
    marginTop: screenHeight * 0.35,
  },
  add: {
    color: "#151919",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
  },
  textboxBackground: {
    backgroundColor: "#151919",
    width: screenWidth * 0.5,
    height: screenHeight * 0.05,
    padding: 15,
    alignSelf: "center",
    borderRadius: 8,
    justifyContent: "center",
    fontSize: 15,

  },
  textboxShadow: {
    width: screenWidth * 0.5,
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
    // paddingTop: screenHeight * 0.05
  },
  
});

export default InputWeight;
