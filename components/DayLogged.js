import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <View style={styles.container}>
      <View style={{ paddingTop: 15, paddingLeft: 15 }}>
        <Text style={{ fontSize: 17.5, fontWeight: "600" }}>{props.day}</Text>
        <Text style={{ fontSize: 12.5, paddingTop: 2.5 }}>{props.date}</Text>
      </View>

      <View style={{ paddingLeft: 12, paddingTop: 25 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ width: "40%" }}>Calories</Text>
          <Text style={{textAlign: 'right', width: "50%"}}>{Math.floor(props.calories)} kcal</Text>
        </View>

        <View style={{ flexDirection: "row", paddingTop: 22.5 }}>
          <Text style={{ width: "40%" }}>Protien</Text>
          <Text style={{textAlign: 'right', width: "50%"}}>{Math.floor(props.protein)} grams</Text>
        </View>

        <View style={{ flexDirection: "row", paddingTop: 22.5 }}>
          <Text style={{ width: "40%" }}>Carbs</Text>
          <Text style={{textAlign: 'right', width: "50%"}}>{Math.floor(props.carbs)} grams</Text>
        </View>
        <View style={{ flexDirection: "row", paddingTop: 22.5 }}>
          <Text style={{ width: "40%" }}>Fats</Text>
          <Text style={{textAlign: 'right', width: "50%"}}>{Math.floor(props.fats)} grams</Text>
        </View>
      </View>
    </View>
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
