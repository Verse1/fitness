import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  Image,
  ScrollView,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { create, style } from "d3";
import { useState, useContext, useRoute, useRef } from "react";
import { useLayoutEffect, useEffect } from "react";
const spoon = "https://api.spoonacular.com/recipes/complexSearch";
const headerConfig = { headers: { Accept: "application/json" } };
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { AuthContext } from "../context/auth";
// const detailedMacros = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json`

//Logic --> On press use the link above and insert the idea, then extract all the macros and add them to the button

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Reco = () => {
  const navigation = useNavigation();
  const [suggestions, setSuggestions] = useState([]);
  const [state, setState] = useContext(AuthContext);
  const [foodArray, setFoodArray] = useState([]);
  const [weekArray, setWeekArray] = useState([]);

  const [dailyProtein, setDailyProtein] = useState(0);
  const [dailyCarbs, setDailyCarbs] = useState(0);
  const [dailyFats, setDailyFats] = useState(0);
  const [dailyCalories, setDailyCalories] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const isItemSelected = (item) => {
    return selectedItem === item;
  };

  const [input, setInput] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (state) {
      setFoodArray(state.user.dailyFood);
      setWeekArray(state.user.weeklyFood);

      setDailyCalories(state.user.dailyCalories);
      setDailyProtein(state.user.dailyProtein);
      setDailyCarbs(state.user.dailyCarbs);
      setDailyFats(state.user.dailyFats);
    }
  }, [state]);


  const totalProtein = foodArray.reduce((sum, item) => sum + item.protein, 0);
  const totalCarbs = foodArray.reduce((sum, item) => sum + item.carbs, 0);
  const totalFats = foodArray.reduce((sum, item) => sum + item.fats, 0);
  const totalCals = foodArray.reduce((sum, item) => sum + item.calories, 0);

  // Fetch data from Spoon API
  const fetchData = (value) => {
    fetch(`${spoon}?apiKey=cc26ee6ac9ab4f9baddaa1343d79c0f8`)
      .then((resp) => resp.json())
      .then((json) => {
        // Filter results that include the search value
        const result = json.results.filter((obj) => {
          return obj.title.toLowerCase().includes(value.toLowerCase());
        });
        setText(result);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (text) => {
    setInput(text);

    // If the input has more than two characters, fetch data
    if (text.length > 2) {
      fetchData(text);
    }
  };

  

  const handleButtonPress = () => {
    // setSuggestions([...suggestions, item]);
    navigation.navigate("GeneratedMeals", {
      numberOfMeals: selectedItem, 
      protein: Math.max(dailyProtein - Math.floor(totalProtein)),
      carbs: Math.max(dailyCarbs - Math.floor(totalCarbs),0) , 
      fats:  Math.max(dailyFats - Math.floor(totalFats),0)})
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    // <View>
    //     <View style={styles.grayCard}>
    //         <View style={styles.total}>
    //         <View style={styles.SearchBack}>
    //         {/* Text input for search with change handler */}
    //         <TextInput
    //             placeholder="Input Your Meal!"
    //             value={input}
    //             style={styles.search}
    //             onChangeText={(text) => handleChange(text)}
    //             placeholderTextColor="gray"
    //         />
    //         </View>
    //         {/* Pass fetched data and input setters to SearchFilter */}
    //         <View style={styles.filter}>
    //         {/* Render a list of pressable components based on passed data */}
    //         <FlatList
    //         data={text}
    //         renderItem={({ item }) => {
    //             // Return nothing if input is empty
    //             if (input == "") {
    //             return <Text></Text>;
    //             }

    //             // Return pressable component for each item in data
    //             return (
    //             <Pressable style={styles.press} onPress={() => handleButtonPress(item)}>
    //                 <Text style={styles.output}>{item.title}</Text>
    //             </Pressable>
    //             );
    //         }}
    //         />
    //     </View>
    //     </View>
    //         <Image style={styles.foodPic} source={require("../images/food.png")}></Image>

    //     </View>
    //     {suggestions.map((item) => (
    //         <View style={styles.foodCard}>
    //             <Image style={styles.foodPick} source={{uri: `${item.image}`}}></Image>
    //         </View>

    //     ))}

    // </View>
    <SafeAreaView style={{backgroundColor: '#0F0E0E', height: '100%'}}>
      <Text
        style={{
          fontSize: screenWidth * 0.09,
          fontWeight: "500",
          paddingLeft: screenWidth * 0.1,
          paddingTop: 20,

          color: "#D7F2F4"
        }}>
        You've got
      </Text>
      <View style={{ flexDirection: "row", paddingTop: screenHeight * 0.05 }}>
        <View style={{ paddingLeft: screenWidth * 0.1 }}>
          <Text style={{ fontSize: screenWidth * 0.05, fontWeight: "700", color: "#D7F2F4" }}>
            {Math.max(dailyCarbs - Math.floor(totalCarbs),0)}g
          </Text>
          <Text style={{ fontSize: screenWidth * 0.045, fontWeight: "700", color: "#D7F2F4"}}>Carbs</Text>
        </View>

        <View style={{ paddingLeft: screenWidth * 0.2 }}>
          <Text style={{ fontSize: screenWidth * 0.05, fontWeight: "700" , color: "#D7F2F4"}}>
            {Math.max(dailyProtein - Math.floor(totalProtein),0)}g
          </Text>
          <Text style={{ fontSize: screenWidth * 0.04, fontWeight: "700", color: "#D7F2F4" }}>Protien</Text>
        </View>

        <View style={{ paddingLeft: screenWidth * 0.2 }}>
          <Text style={{ fontSize: screenWidth * 0.05, fontWeight: "700", color: "#D7F2F4" }}>
            {Math.max(dailyFats - Math.floor(totalFats),0)}g
          </Text>
          <Text style={{ fontSize: screenWidth * 0.045, fontWeight: "700", color: "#D7F2F4" }}>Fat</Text>
        </View>
      </View>

      <Text
        style={{
          fontSize: screenWidth * 0.09,
          fontWeight: "500",
          paddingLeft: screenWidth * 0.1,
          paddingTop: 30,
          color: "#D7F2F4"
        }}>
        left...
      </Text>

      <View style={{ justifyContent: "center", alignItems: "center", paddingTop: screenHeight * 0.125 }}>
        <LinearGradient
            colors={["#151919", "#1D2528"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} style={styles.barContainer}>
          <TouchableOpacity
            style={[
              styles.item,
              isItemSelected(1) && styles.selectedItem,
              {
                opacity: isItemSelected(1) ? fadeAnim : 1,
              },
            ]}
            onPress={() => handleItemClick(1)}>
            <Text style={[{ color: "#D7F2F4", fontSize: 20, fontWeight: "700" },  isItemSelected(1) && styles.selectedText,]}>1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.item,
              isItemSelected(2) && styles.selectedItem,
              {
                opacity: isItemSelected(2) ? fadeAnim : 2,
              },
            ]}
            onPress={() => handleItemClick(2)}>
            <Text style={[{ color: "#D7F2F4", fontSize: 20, fontWeight: "700" },  isItemSelected(2) && styles.selectedText,]}>2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.item,
              isItemSelected(3) && styles.selectedItem,
              {
                opacity: isItemSelected(3) ? fadeAnim : 3,
              },
            ]}
            onPress={() => handleItemClick(3)}>
            <Text style={[{ color: "#D7F2F4", fontSize: 20, fontWeight: "700" },  isItemSelected(3) && styles.selectedText,]}>3</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <TouchableOpacity
        onPress={() => handleButtonPress()}
        style={styles.button}>
        <Text style={{ color: "#151919", fontSize: 22.5, fontWeight: "500" }}>
          Close your rings
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  grayCard: {
    backgroundColor: "rgb(215,215,215)",
    height: screenHeight * 0.5,
    borderRadius: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    paddingLeft: 70,
    paddingTop: 60,
  },
  foodPic: {
    width: screenWidth * 0.75,
    height: screenWidth * 0.75,
  },
  press: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: "#e8e8e8",
  },
  SearchBack: {
    backgroundColor: "white",
    width: "80%",
    paddingVertical: 8,
    paddingLeft: 15,
    borderRadius: 15,
    borderWidth: 0.7,
    borderColor: "#e8e8e8",
  },
  total: {
    width: screenWidth * 0.95,
    marginLeft: 65,
    marginTop: 50,
  },
  search: {
    color: "black",
    height: screenHeight * 0.0225,
  },
  foodPick: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: 20,
  },
  foodCard: {
    paddingVertical: 20,
    paddingLeft: 20,
    backgroundColor: "pink",
    width: screenWidth * 0.9,
    height: screenHeight * 0.4,
  },
  button: {
    backgroundColor: "#D7F2F4",
    width: screenWidth * 0.9,
    height: screenHeight * 0.05,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: screenWidth * 0.05,
    marginTop: screenHeight * 0.34,
  },
  barContainer: {
    width: "60%",
    height: screenHeight * 0.05,
    backgroundColor: "#00A3FF",
    borderRadius: 25,
    marginTop: 40,
    flexDirection: "row",
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: "#D7F2F4",
    borderRadius: 25,
  },
  selectedText:{
    color: "#151919"
  }
});

export default Reco;
