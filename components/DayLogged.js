import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const DayLogged = (props) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <LinearGradient
    colors={["#151919", "#1D2528"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }} style={styles.container}>
      <View style={{ paddingTop: 15, paddingLeft: 15 }}>
        <Text style={{ fontSize: 17.5, fontWeight: "600", color: '#D7F2F4' }}>{props.day}</Text>
        <Text style={{ fontSize: 12.5, paddingTop: 2.5, color: '#D7F2F4'}}>{props.date}</Text>
      </View>

      <View style={{ paddingLeft: 12, paddingTop: 25 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ width: "40%", color: '#D7F2F4' }}>Calories</Text>
          <Text style={{textAlign: 'right', width: "50%", color: '#D7F2F4'}}>{Math.floor(props.calories)} kcal</Text>
        </View>

        <View style={{ flexDirection: "row", paddingTop: 22.5 }}>
          <Text style={{ width: "40%" , color: '#D7F2F4'}}>Protien</Text>
          <Text style={{textAlign: 'right', width: "50%", color: '#D7F2F4'}}>{Math.floor(props.protein)} grams</Text>
        </View>

        <View style={{ flexDirection: "row", paddingTop: 22.5 }}>
          <Text style={{ width: "40%", color: '#D7F2F4' }}>Carbs</Text>
          <Text style={{textAlign: 'right', width: "50%", color: '#D7F2F4'}}>{Math.floor(props.carbs)} grams</Text>
        </View>
        <View style={{ flexDirection: "row", paddingTop: 22.5 }}>
          <Text style={{ width: "40%", color: '#D7F2F4'}}>Fats</Text>
          <Text style={{textAlign: 'right', width: "50%", color: '#D7F2F4'}}>{Math.floor(props.fats)} grams</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.45,
    height: screenHeight * 0.3,
    borderRadius: 20,
    backgroundColor: "white",
    marginLeft: 10,
  },
});

export default DayLogged;
