import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import SearchLog from "../components/SearchLog";
import { AuthContext } from "../context/auth";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

//Spoonacular API shit
const APIKEY = "e1e9e17338544f5983922872c0475bd2";
const getIngredient = `https://api.spoonacular.com/food/ingredients/search?apiKey=${APIKEY}&number=5&query=`;

const LogMeal = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [foodArray, setFoodArray] = useState([]);
  const [amount, setAmount] = useState("");
  const [fixedAmount, setFixedAmount] = useState("");


  const [dailyProtein, setDailyProtein] = useState(0)
  const [dailyCarbs, setDailyCarbs] = useState(0)
  const [dailyFats, setDailyFats] = useState(0)
  const [dailyCalories, setDailyCalories] = useState(0)

  const [state, setState] = useContext(AuthContext);

  const showAlert = () => {
    Alert.alert(
      "Invalid Amount",
      "Please enter a valid amount",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  const fetchData = (value) => {
    setFoodArray([]);
    console.log("first Error");
    fetch(`${getIngredient}${value}`)
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json.results);
        // Filter results that include the search value
        const result = json.results
          .filter((obj) => obj.name.toLowerCase().includes(value.toLowerCase()))
          .map((obj) => obj.id);
        setSearchResults(result);

        result.forEach((id) => {
          const unit = "grams";
          const getMacros = `https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${APIKEY}&amount=${amount}&unit=${unit}`;
          fetch(getMacros)
            .then((resp) => resp.json())
            .then((foodJson) => {
              setFoodArray((prevFoodArray) => [...prevFoodArray, foodJson]);
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => console.log(error));
  };

  const handleTextInputSubmit = () => {
    //Make sure to include amount and Serving Unit

    setFixedAmount(amount);

    if (searchText.length > 3) {
      fetchData(searchText);
    } else {
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]); // re-run effect if navigation object changes

  useEffect(() => {
    if (state) {

      
      setDailyCalories(state.user.dailyCalories)
      setDailyProtein(state.user.dailyProtein)
      setDailyCarbs(state.user.dailyCarbs)
      setDailyFats(state.user.dailyFats)

    }
  }, [state]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingLeft: screenWidth * 0.065, paddingTop: screenHeight * 0.03 }}>
        <Text style={{ fontSize: screenWidth * 0.06, fontWeight: "700" }}>Log Food</Text>
      </View>

      <View
        style={{
          paddingLeft: screenWidth * 0.055,
          paddingTop: screenHeight * 0.025,
          flexDirection: "row",
        }}>
        <TextInput
          placeholder="Search Food..."
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
          }}
          style={styles.searchBar}
          onSubmitEditing={() => {
            if (Number.isInteger(amount)) {
              handleTextInputSubmit();
            } else {
              console.log("hel");
              showAlert();
            }
          }} // Call handleTextInputSubmit on submit event
        />

        <TextInput
          placeholder="Amount..."
          value={amount}
          onChangeText={(text) => {
            setAmount(text);
          }}
          style={styles.amountBar}
          onSubmitEditing={() => handleTextInputSubmit()}
        />
      </View>
      <View
        style={{
          paddingLeft: screenWidth * 0.055,
          paddingTop: screenHeight * 0.03,
          backgroundColor: "#00A3FF",
          height: "100%",
          marginTop: screenHeight * 0.05,
          borderTopRightRadius: "50%",
          borderTopLeftRadius: "50%",
        }}>
        <Text
          style={{
            fontSize: screenWidth * 0.06,
            fontWeight: "700",
            color: "white",
            paddingLeft: screenWidth * 0.02,
          }}>
          Search Results
        </Text>
        <View style={{ paddingTop: screenHeight * 0.01 }}>
          {foodArray.map((foodItem) => {
            const proteinNutrient = foodItem.nutrition.nutrients.find(
              (nutrient) => nutrient.name === "Protein"
            );

            const carbNutrient = foodItem.nutrition.nutrients.find(
              (nutrient) => nutrient.name === "Carbohydrates"
            );

            const fatNutrient = foodItem.nutrition.nutrients.find(
              (nutrient) => nutrient.name === "Fat"
            );

            const calories = foodItem.nutrition.nutrients.find(
              (nutrient) => nutrient.name === "Calories"
            );

            return (
              <SearchLog
                foodObject={foodItem}
                FoodName={foodItem.name}
                protein={proteinNutrient ? proteinNutrient.amount : 0}
                carbs={carbNutrient ? carbNutrient.amount : 0}
                fat={fatNutrient ? fatNutrient.amount : 0}
                // protein={200}
                // carbs={200}
                // fat={200}
                serving={fixedAmount}
                calories={calories ? calories.amount : 0}
                maxProtein={dailyProtein}
                maxCarbs={dailyCarbs}
                maxFats={dailyFats}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "white",
    width: screenWidth * 0.65,
    paddingVertical: 8,
    paddingLeft: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e8e8e8",
  },
  amountBar: {
    backgroundColor: "white",
    width: screenWidth * 0.2,
    paddingVertical: 8,
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    marginLeft: 10,
  },
});

export default LogMeal;
