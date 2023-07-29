import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const WeightBar = (props) => {
  return (
    <LinearGradient colors={["#151919", "#1D2528"]} start={{ x: 0, y: 0 }}  end={{ x: 1, y: 0 }} style={styles.container}>
      <View style={{ flexDirection: "row", paddingTop: 10, paddingLeft: 17.5 }}>
        <Text style={styles.dateText}>{props.date}</Text>
        <Text style={styles.actualWeight}>{props.weight}</Text>
      </View>
      {props.change > 0 ? (
        <View style={{flexDirection: 'row'}}>

          <Text style={[styles.weightChange, {color: "#118c4f"}]}>+{props.change}</Text>
          <Text style={{fontSize: 15,fontWeight: "300", color: "#118c4f"}}> kg</Text>
        </View>
    ) : props.change < 0 ? (
        <Text style={[styles.weightChange, {color: "#e75757"}]}>{props.change} kg</Text>
    ) : (
      <Text style={[styles.weightChange]}>{props.change} kg</Text>

    )}
    </LinearGradient> 
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.09,
    borderRadius: "30%",
    marginBottom: 10,
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 2.5 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderRadius: 20,
   
  },
  dateText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#D7F2F4"

  },
  weightChange: {
    fontSize: 17,
    fontWeight: "400",
    color: "#D7F2F4",
    paddingLeft: 18,
  },
  actualWeight: {
    marginLeft: screenWidth * 0.45,
    marginTop: 15,
    fontSize: 18,
    fontWeight: "500",
    color: "#D7F2F4"

  },
});

export default WeightBar;
