import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressChart } from "react-native-chart-kit";
import { AuthContext } from "../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const SearchLog = (props) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [state, setState] = useContext(AuthContext);


  const data = {
    labels: ["Protien"], // optional
    data: [props.protein / props.maxProtein],
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
    data: [props.carbs / props.maxCarbs],
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
    data: [props.fat / props.maxFats],
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



  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleLog = async () => {
    const foodObject = {
      foodName: props.foodObject.name,
      protein: props.protein,
      carbs: props.carbs,
      fats: props.fat,
      servingAmount: props.serving,
      calories: props.calories,
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


  const handleOverlayPress = () => {
    setVisible(false);
  };


  function capitalizeFirstChar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            flex: 1,
            paddingLeft: 15,
            paddingTop: 15,
            fontSize: 18,
            fontWeight: "500",
            color: '#151919'
          }}
        >
          {capitalizeFirstChar(props.FoodName)}
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setVisible(true)}>
          <Feather name="plus" color="#D7F2F4" size={20} />
        </TouchableOpacity>
      </View>

      <Text style={{ paddingLeft: 15, fontWeight: "400", paddingTop: 10, width: "60%" ,color: '#151919', fontWeight: '700'}}>
        {props.serving} Grams{" "}
      </Text>

      <Modal transparent visible={visible}>
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <LinearGradient
                  colors={["#151919", "#253237"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }} style={styles.modalContainer}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ width: "70%", fontSize: 20, fontWeight: "500", color: '#D7F2f4' }}>
                    {capitalizeFirstChar(props.FoodName)}
                  </Text>
                    <TouchableOpacity
                      onPress={handleLog}
                      style={{
                        backgroundColor: "#D7F2f5",
                        width: screenWidth * 0.2,
                        height: screenHeight * 0.05,
                        borderRadius: 15,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 18, color: "#151919", fontWeight: "700" }}>
                        Log
                      </Text>
                    </TouchableOpacity>
                   
                </View>

                <View style={{ paddingTop: screenHeight * 0.04, flexDirection: "row",  }}>
                  <Text style={{ fontSize: 18, fontWeight: "400", width: "80%", color:'#D7F2F4' }}>
                    Serving
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "700", color:'#D7F2F4'}}>{props.serving}g</Text>
                </View>

                <View style={{ paddingTop: 20, flexDirection: "row" }}>
                  <Text style={{ fontSize: 18, fontWeight: "400", width: "70%", color:'#D7F2F4'}}>
                    Calories
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "700", color:'#D7F2F4' }}>
                    {Math.floor(props.calories)} kcal
                  </Text>
                </View>

                <View style={{ flexDirection: "row", paddingTop: screenHeight * 0.02, paddingLeft: 12.5 }}>
                  <View style={{ textAlign: "center", paddingTop: 10 }}>
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
                    <View style={{ paddingTop: 10 }}>
                      <Text style={{ color: "#CE2029", fontWeight: "bold", paddingLeft: 10 }}>
                        Protein
                      </Text>
                      <Text
                        style={{
                          color: "rgba(180,180,180,1)",
                          fontWeight: "bold",
                          paddingLeft: 10,
                          fontSize: 12.5,
                        }}
                      >
                        {Math.floor(props.protein)}/{props.maxProtein}g
                      </Text>
                    </View>
                  </View>

                  <View style={{ textAlign: "center", paddingLeft: 15, paddingTop: 10 }}>
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
                    <View style={{ paddingTop: 10 }}>
                      <Text style={{ color: "#4CB944", fontWeight: "bold", paddingLeft: 20 }}>
                        Carbs
                      </Text>
                      <Text
                        style={{
                          color: "rgba(180,180,180,1)",
                          fontWeight: "bold",
                          paddingLeft: 15,
                          fontSize: 12.5,
                        }}
                      >
                        {Math.floor(props.carbs)}/{props.maxCarbs}g
                      </Text>
                    </View>
                  </View>

                  <View style={{ textAlign: "center", paddingLeft: 20, paddingTop: 10 }}>
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
                    <View style={{ paddingTop: 10, paddingLeft: 4 }}>
                      <Text style={{ color: "#1B77EE", fontWeight: "bold", paddingLeft: 20 }}>
                        Fats
                      </Text>
                      <Text
                        style={{
                          color: "rgba(180,180,180,1)",
                          fontWeight: "bold",
                          paddingLeft: 15,
                          fontSize: 12.5,
                        }}
                      >
                        {Math.floor(props.fat)}/{props.maxFats}g
                      </Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D7F2F4",
    width: screenWidth * 0.9,
    height: screenHeight * 0.1,
    borderRadius: 20,
    marginVertical: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: screenWidth * 0.85,
    height: screenHeight * 0.45,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
  },
  graph: {
    paddingTop: 7,
  },
  addButtonWrapper: {
    marginRight: 20,
    marginTop: 10,
  },
  addButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#151919",
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
});

export default SearchLog;