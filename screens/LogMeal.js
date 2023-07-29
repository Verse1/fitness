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
import { LinearGradient } from "expo-linear-gradient";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

//Spoonacular API shit
const APIKEY = "ca4056c513174da8bf675ceab7388293";
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0E0E'}}>
      <View style={{ paddingLeft: screenWidth * 0.065, paddingTop: screenHeight * 0.03 }}>
        <Text style={{ fontSize: screenWidth * 0.06, fontWeight: "700", color: '#D7F2F4' }}>Log Food</Text>
      </View>

      <View
        style={{
          paddingLeft: screenWidth * 0.055,
          paddingTop: screenHeight * 0.025,
          flexDirection: "row",
        }}>


        <View style={[styles.textboxShadow, {marginRight: 20}]}>
                <LinearGradient
                  colors={["#151919", "#253237"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.textboxBackground, {paddingRight: 20}]}>
                  <TextInput
                    placeholder="Search Food..."
                    style={[styles.textbox,{paddingRight: 20} ]}
                    value={searchText}
                    onChangeText={(text) => {
                      setSearchText(text);
                    }}

                    onSubmitEditing={() => {
                    if (Number.isInteger(amount)) {
                      handleTextInputSubmit();
                    } else {
                      console.log("hel");
                      showAlert();
                    }}}
                    
                    // onChangeText={setName}
                    placeholderTextColor="#D7F2F4"
                    keyboardAppearance="dark"
                    autoCorrect={false}
                  />
                </LinearGradient>
        </View>
        <View style={styles.textboxShadow}>
                <LinearGradient
                  colors={["#151919", "#253237"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.textboxBackground}>
                  <TextInput
                  placeholder="Amount..."
                  value={amount}
                  onChangeText={(text) => {
                    setAmount(text);
                  }}
                    style={styles.textbox}
                    onSubmitEditing={() => handleTextInputSubmit()}
                    // onChangeText={setName}
                    placeholderTextColor="#D7F2F4"
                    keyboardAppearance="dark"
                    autoCorrect={false}
                  />
                  <Text style={{color: "#D7F2F4", position: 'absolute', right: 15, fontWeight: '700'}}>g</Text>
                </LinearGradient>
        </View>
      </View>
      <LinearGradient
            colors={["#151919", "#1D2528"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        style={{
          paddingLeft: screenWidth * 0.055,
          paddingTop: screenHeight * 0.03,
          height: "100%",
          marginTop: screenHeight * 0.05,
          borderTopRightRadius: "50%",
          borderTopLeftRadius: "50%",
        }}>
        <Text
          style={{
            fontSize: screenWidth * 0.06,
            fontWeight: "700",
            color: "#D7F2F4",
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
      </LinearGradient>
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
  textbox: {
    backgroundColor: "transparent",
    width: screenWidth * 0.4,
    height: screenHeight * 0.05,
    alignSelf: "center",
    borderRadius: 8,
    position: "absolute",
    zIndex: 1,
    fontWeight: "500",
    fontSize: 14,
    paddingLeft: 20,
    color: "#D7F2F4",
  },
  textboxBackground: {
    backgroundColor: "#151919",
    width: screenWidth * 0.4,
    height: screenHeight * 0.05,
    padding: 15,
    alignSelf: "center",
    borderRadius: 8,
    justifyContent: "center",
    fontSize: 15,
  },
  textboxShadow: {
    width: screenWidth * 0.4,
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
  }
});

export default LogMeal;
