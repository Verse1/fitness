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
import {LinearGradient} from 'expo-linear-gradient'
import { Feather } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

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
    <View style={styles.container}>
      {/* Progress bar */}
      <LinearGradient  colors={['#151919', '#253237']} start={{x:0}} end={{x:1}} style={styles.progressContainer}>
        <View style={{flexDirection: 'row'}}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
      
              <Feather name="chevron-left" size={24}  style={{ color: "#FFFAFA", paddingRight: screenWidth * 0.01}} />
          </Pressable>
            <View style={styles.progressBar}>
              <View style={styles.progress} />
            </View>
            <Text style={styles.progressText}>5 of 8</Text>
          </View>
          <Text style={{color: '#D7F2F4', paddingBottom: screenHeight  *0.035, fontSize: 38, width: screenWidth * 1, fontWeight: '700', paddingLeft: screenWidth * .02}}>What is your daily macro intake?</Text>

      </LinearGradient>
      
      <View style={styles.inputContainer}>
        <Text style={{fontSize: 18, color: "#FFFAFA", fontWeight: '700', paddingBottom: screenHeight * 0.03}}>Qunaitity Per Day</Text>
        
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#D7F2F4', width: screenWidth * 0.2, fontSize: 16, fontWeight: '700'}}>Calories</Text>
          <TextInput  style={styles.input} onChangeText={setCalories} placeholderTextColor="#D7F2F4" />
          <Text style={{color: "#D7F2F4", position: 'absolute', right: '4%', top: '20%'}}>kCal</Text>

        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: '#D7F2F4', width: screenWidth * 0.2, fontSize: 16, fontWeight: '700'}}>Protein</Text>
          <TextInput style={styles.input} onChangeText={setProtein} placeholderTextColor="#D7F2F4" />
          <Text style={{color: "#D7F2F4", position: 'absolute', right: '4%', top: '20%'}}>g</Text>

        </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#D7F2F4', width: screenWidth * 0.2, fontSize: 16, fontWeight: '700',}}>Carbs</Text>
          <TextInput  style={styles.input} onChangeText={setCarbs} placeholderTextColor="#D7F2F4" />
          <Text style={{color: "#D7F2F4", position: 'absolute', right: '4%', top: '20%'}}>g</Text>
          </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: '#D7F2F4', width: screenWidth * 0.2, fontSize: 16, fontWeight: '700'}}>Fats</Text>
        <TextInput  style={styles.input} onChangeText={setFats} placeholderTextColor="#D7F2F4"/>
        <Text style={{color: "#D7F2F4", position: 'absolute', right: '4%', top: '20%'}}>g</Text>
        </View>
      </View>
      <View style={styles.buttonView}>
        <Pressable style={styles.cont} onPress={handleContinue}>
          <Text style={styles.text}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0E0E'
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
    width: `${(5 / 8) * 100}%`,
    borderRadius: 5,
    backgroundColor: "#116CE4",
  },
  backButton: {
    paddingLeft: 8,
    marginTop:  screenHeight * 0.073,
    paddingRight: 10
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
    backgroundColor: "#253237",
    width: screenWidth * 0.25,
    height: 40,
    borderRadius: 10,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: screenWidth * 0.05, 
    paddingLeft: 10,
    color: '#D7F2F4'
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
  text: {
    color: "#151919",
    textAlign: "center",
    fontWeight: "700",
  },
  buttonView: {
    alignItems: "center",
    marginBottom: screenHeight * 0.05,
  },
  progressText: {
    marginRight: 8,
    color:  "#D7F2F4",
    marginTop:  screenHeight * 0.075,
    marginLeft: 8

  },
});

export default Macros;
