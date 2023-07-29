import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import FoodCard from "../components/FoodCard";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const GeneratedMeals = (props) => {
  const route = useRoute();
  const { numberOfMeals, protein, carbs, fats  } = route.params;

  const [results, setResults] = useState([])


  const mealProtein = protein/numberOfMeals
  const mealCarbs = carbs/numberOfMeals
  const mealFats = fats/numberOfMeals


  const navigation = useNavigation();
  const spoon = "https://api.spoonacular.com/recipes/complexSearch";

  useEffect(() => {

     
    fetchData(Math.floor(mealProtein), Math.floor(mealCarbs), Math.floor(mealFats));
  }, []);


  const fetchData = (protein, carbs, fats) => {
    console.log(protein, carbs, fats  )
    fetch(`${spoon}?apiKey=ca4056c513174da8bf675ceab7388293&minProtein=${protein}&maxProtein=100&minCarbs=${carbs}&minFat=${fats}&number=${numberOfMeals}&maxCalories=700`)
      .then((resp) => resp.json())
      .then((json) => {
        // Filter results that include the search value
        setResults(json.results)
        
      })
      .catch((error) => console.log(error));
  };

  // console.log(results[0].nutrition.nutrients[1])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]); // re-run effect if navigation object changes
  return (
    <ScrollView style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: '#0F0E0E' }}>
      {results.map((meal, index) => (
        <>
          <View key={index} style={{ flexDirection: "row" }}>
            <Text
              style={{
                paddingLeft: screenWidth * 0.08,
                paddingTop: screenHeight * 0.04,
                fontSize: screenWidth * 0.075,
                fontWeight: "700",
                color: '#D7F2F4'
              }}>
              Meal {index + 1}
            </Text>
          </View>
          <View
            style={{ paddingLeft: screenWidth * 0.07, paddingTop: screenHeight * 0.025 }}>
            {/* <FoodCard foodname={meal.title} protein={meal.nutrition.nutrients[0]} carbs={meal.nutrition.nutrients[1]} fats={meal.nutrition.nutrients[2]} /> */}
            <FoodCard foodname={meal.title} protein={Math.floor(meal.nutrition.nutrients[1].amount)}  carbs={Math.floor(meal.nutrition.nutrients[2].amount)} fats={Math.floor(meal.nutrition.nutrients[3].amount)} cals={Math.floor(meal.nutrition.nutrients[0].amount)}/>

          </View>
        </>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  today: {
    fontSize: screenWidth * 0.09,
    textAlign: "center",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "white",
    width: screenWidth * 0.5,
    height: screenHeight * 0.07,
    marginTop: screenHeight * 0.08,
    marginLeft: screenWidth * 0.225,
    textAlign: "center",
    fontSize: 27.5,
    borderRadius: "20%",
  },
  button: {
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    width: screenWidth * 0.8,
    backgroundColor: "blue",
    borderRadius: 6,
    borderWidth: 0.7,
    borderColor: "blue",
    marginLeft: screenWidth * 0.1,
    height: screenHeight * 0.05,
    marginTop: screenHeight * 0.03,
  },
  add: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
  },
});
export default GeneratedMeals;
