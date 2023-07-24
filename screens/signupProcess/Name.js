import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import {LinearGradient} from 'expo-linear-gradient'
import { Line } from "react-native-svg";

// Screen dimensions
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Name = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleName = () => {
    navigation.navigate("Gender", { userName: name });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Header */}
            <LinearGradient  colors={['#151919', '#253237']} start={{x:0}} end={{x:1}} style={styles.header}>

              {/* Progress bar */}
              <View style={styles.progressContainer}>
              <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                  <AntDesign name="arrowleft" style={{ color: "white", fontSize: 20 }} />
              </Pressable>
                <View style={styles.progressBar}>
                  <View style={styles.progress} />
                </View>
                <Text style={styles.progressText}>1 of 6</Text>

              </View>


              {/* Back button */}
             

              <View style={styles.Titles}>
                <Text autoCorrect={false} style={styles.title}>
                  What's Your Name?
                </Text>
              </View>
            </LinearGradient>

            {/* Content */}
            <View style={styles.content}>
              {/* Name input */}
              <View style={styles.main}>
                <TextInput
                  placeholder="Full Name"
                  style={styles.textbox}
                  onChangeText={setName}
                  placeholderTextColor="#D7F2F4"
                  autoFocus={true}
                />

              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              {/* Continue button */}
              <View style={styles.buttonView}>
                <Pressable style={styles.cont} onPress={handleName}>
                  <Text style={styles.text}>Continue</Text>
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
    backgroundColor: "#0F0E0E",
  },
  header: {
    flex: 1,
    justifyContent: "flex-start",
    borderBottomRightRadius: 112,
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
    fontSize: 40,
    textAlign: "Left",
    color: "#D7F2F4"
  },
  cont: {
    backgroundColor: "#D7F2F4",
    width: "80%",
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.7,
    marginVertical: 5,
  },
  textbox: {
    backgroundColor: "#151919",
    width: "80%",
    padding: 15,
    borderColor: "gray",
    alignSelf: "center",
    marginVertical: 5,
    borderRadius: 8,
    fontSize: 15,
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
    paddingTop: 10,
    width: '70%',
    paddingLeft: 20,
  },
  buttonView: {
    alignItems: "center",
    marginBottom: 40,
    
  },
  backButton: {
    alignSelf: "flex-start",
    paddingLeft: 5,
    paddingRight: 10
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
    paddingTop: 60,
  },
  progressBar: {
    backgroundColor: "lightgrey",
    height: 10,
    width: Dimensions.get("window").width - 140,
    borderRadius: 5,
    marginRight: 10,
    margingLeft: 5
  },
  progress: {
    height: "100%",
    width: `${(1 / 6) * 100}%`,
    borderRadius: 5,
    backgroundColor: "blue",
  },
  progressText: {
    marginRight: 10,
    color:  "#D7F2F4"
  },
});

export default Name;
