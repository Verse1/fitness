import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState} from "react";
import { useNavigation,  } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressChart } from "react-native-chart-kit";
import axios from "axios";
import { AuthContext } from "../context/auth";
import { LinearGradient } from "expo-linear-gradient";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const FoodCard = (props) => {
  const navigation = useNavigation();
  const [state, setState] = useContext(AuthContext);

  const [dailyProtein, setDailyProtein] = useState(0);
  const [dailyCarbs, setDailyCarbs] = useState(0);
  const [dailyFats, setDailyFats] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const data = {
    labels: ["Protien"], // optional
    data: [props.protein / 250],
    colors: ["#CE2029"],
  };

  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "white",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1, _index) => `rgba(255,0,0,0.2)`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.35,
    useShadowColorFromDataset: false, // optional,
  };

  const dataC = {
    labels: ["Carbs"], // optional
    data: [props.carbs / 250],
    colors: ["#4CB944"],
  };

  const chartConfigCarbs = {
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "white",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1, _index) => `rgba(0,255,0,0.2)`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.35,
    useShadowColorFromDataset: false, // optional,
  };

  const dataF = {
    labels: ["Fats"], // optional
    data: [props.fats / 250],
    colors: ["#1B77EE"],
  };

  const chartConfigFat = {
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "white",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1, _index) => `rgba(0,0,255,.2)`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.35,
    useShadowColorFromDataset: false, // optional,
  };

  useEffect(() => {
    if (state) {
  

      setDailyProtein(state.user.dailyProtein);
      setDailyCarbs(state.user.dailyCarbs);
      setDailyFats(state.user.dailyFats);
    }
  }, [state]);
  
 
  const handleAddMeal = async () => {
    const foodObject = {
      foodName: props.foodname,
      protein: props.protein,
      carbs: props.carbs,
      fats: props.fats,
      servingAmount: 0,
      calories: props.cals,
    };
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/addFood",
        { foodObject, id: state.user._id }
      );

      if (resp.data.error) {
        alert(resp.data.error);
      } else {
        setState(resp.data);
        await AsyncStorage.setItem("auth-rn", JSON.stringify(resp.data));
        setVisible(false);
        navigation.navigate("Nutrition");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <View>
      <LinearGradient
            colors={["#151919", "#1D2528"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} style={styles.container}>
        {/* Custom TextInput with placeholder passed from props */}
        <Text style={{ fontSize: 18, fontWeight: "700", width: "90%", color: '#D7F2F4'}}>{props.foodname}</Text>

        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "500", paddingTop: 20, width: "50%", color: '#D7F2F4'}}>
            Serving
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              paddingTop: 21,
              width: "50%",
              textAlign: "right",
              color: '#D7F2F4'
            }}>
            One Serving
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 18, fontWeight: "500", paddingTop: 15, width: "50%" , color: '#D7F2F4'}}>
            Calories
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              paddingTop: 15,
              width: "50%",
              textAlign: "right",
              color: '#D7F2F4'
            }}>
            {props.cals} kcal
          </Text>
        </View>
        <View style={{ flexDirection: "row", paddingTop: 15 }}>
          <View>
            <ProgressChart
              data={data}
              width={screenWidth * 0.2}
              height={screenHeight * 0.125}
              strokeWidth={14}
              radius={28}
              chartConfig={chartConfig}
              hideLegend={true}
              withCustomBarColorFromData={true}
              style={styles.graph}
            />
            <Text style={{ color: "#CE2029", fontWeight: "bold", paddingLeft: 15 }}>
              Protein
            </Text>
            <Text
              style={{
                color: "rgba(180,180,180,1)",
                fontWeight: "bold",
                paddingLeft: 15,
                fontSize: 12,
              }}>
              {props.protein}/{dailyProtein}g
            </Text>
          </View>

          <View style={{ paddingLeft: screenWidth * 0.075 }}>
            <ProgressChart
              data={dataC}
              width={screenWidth * 0.2}
              height={screenHeight * 0.125}
              strokeWidth={14}
              radius={28}
              chartConfig={chartConfigCarbs}
              hideLegend={true}
              withCustomBarColorFromData={true}
              style={styles.graph}
            />
            <Text style={{ color: "#4CB944", fontWeight: "bold", paddingLeft: 15 }}>
              Carbs
            </Text>
            <Text
              style={{
                color: "rgba(180,180,180,1)",
                fontWeight: "bold",
                paddingLeft: 11,
                fontSize: 12,
              }}>
              {props.carbs}/{dailyCarbs}g
            </Text>
          </View>
          <View style={{ paddingLeft: screenWidth * 0.08 }}>
            <ProgressChart
              data={dataF}
              width={screenWidth * 0.2}
              height={screenHeight * 0.125}
              strokeWidth={14}
              radius={28}
              chartConfig={chartConfigFat}
              hideLegend={true}
              withCustomBarColorFromData={true}
              style={styles.graph}
            />
            <Text
              style={{
                color: "#1B77EE",
                fontWeight: "bold",
                paddingLeft: screenWidth * 0.058,
              }}>
              Fats
            </Text>
            <Text
              style={{
                color: "rgba(180,180,180,1)",
                fontWeight: "bold",
                paddingLeft: 13,
                fontSize: 12,
              }}>
              {props.fats}/{dailyFats}g
            </Text>
          </View>
        </View>
      </LinearGradient>
      <TouchableOpacity style={styles.LogButton} onPress={() => handleAddMeal()}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "700", color:"#151919"}}>Log</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.85,
    height: screenHeight * 0.38,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
  },

  input: {},
  LogButton: {
    backgroundColor: "#D7F2F4",
    width: screenWidth * 0.85,
    height: screenHeight * 0.05,
    borderRadius: 12.5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: screenWidth * 0.0,
    marginTop: screenHeight * 0.0125,
  },
});

export default FoodCard;
