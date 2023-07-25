import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Dimensions,
  Image
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import {LinearGradient} from 'expo-linear-gradient'
import Icon from 'react-native-ionicons'

// Screen dimensions
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Gender = () => {
  const route = useRoute();
  const { userName } = route.params;

  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  const handleContinue = () => {
    navigation.navigate("Age", { userInfo: userName, userGender: selectedGender });
  };

  return (
    <View style={styles.container}>
      {/* Progress bar */}
      <LinearGradient  colors={['#151919', '#253237']} start={{x:0}} end={{x:1}} style={styles.progressContainer}>
        <View style={{flexDirection: 'row'}}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
      
              <AntDesign name="arrowleft" style={{ color: "#FFFAFA", fontSize: 20, paddingTop: 0, paddingRight: screenWidth * 0.01}} />
          </Pressable>
            <View style={styles.progressBar}>
              <View style={styles.progress} />
            </View>
            <Text style={styles.progressText}>5 of 6</Text>
          </View>
          <Text style={{color: '#D7F2F4', paddingBottom: screenHeight  *0.035, fontSize: 42, width: screenWidth * 1, fontWeight: '700', paddingLeft: screenWidth * .02}}>What is your gender?</Text>

      </LinearGradient>

      {/* Back button */}
      {/* <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
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
      </Pressable> */}

      <View style={styles.content}>
        {/* Gender buttons */}
        <View style={styles.buttonContainer}>
        
        <LinearGradient  colors={['#151919', '#253237']} start={{x:0}} end={{x:1}}

            style={[
              styles.genderButton,
              selectedGender === "female" && styles.selectedGenderButton,
            ]}
            onPress={() => handleGenderSelection("female")}>
              <Text style={styles.genderButtonText}>Female</Text>
          </LinearGradient>

          <LinearGradient  colors={['#151919', '#253237']} start={{x:0}} end={{x:1}}
            style={[
              styles.genderButton,
              selectedGender === "male" && styles.selectedGenderButton,
            ]}
            onPress={() => handleGenderSelection("male")}>
            {/* <Text style={styles.genderButtonText}>♂</Text> */}
            <Icon name="male-outline"  color="white"/>
          </LinearGradient>
        </View>

        {/* Continue button */}
        <View style={styles.buttonView}>
          <Pressable style={styles.cont} onPress={handleContinue}>
            <Text style={styles.text}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  "#0F0E0E"
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
    width: `${(4 / 6) * 100}%`,
    borderRadius: 5,
    backgroundColor: "blue",
  },
  backButton: {
    paddingLeft: 8,
    marginTop:  screenHeight * 0.073,
    paddingRight: 10
  },
  backButtonText: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    
  },
  genderButton: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    width: 150,
    height: 150,
    borderColor: "#ccc",
    // justifyContent: "center",
    // alignItems: "center",
    marginBottom: 70,
    marginHorizontal: 10
  },
  selectedGenderButton: {
    backgroundColor: "blue",
    borderColor: "blue",
  },
  genderButtonText: {
    fontWeight: "700",
    color: "#fff",
    fontSize: 150,
    right: '30%'
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

export default Gender;
