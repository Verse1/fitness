import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ProgressChart } from "react-native-chart-kit";

const Modalpop = (props) => {
  const [showModal, setShowModal] = React.useState(props.visible);

  useEffect(() => {
    toggleModal();
  }, [props.visible]);

  const scaleValue = React.useRef(new Animated.Value(0)).current;

  const toggleModal = () => {
    if (props.visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);

      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          {props.children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const FoodLogged = (props) => {
  const [visible, setVisible] = useState(false);
  const data = {
    labels: ["Protien"], // optional
    data: [props.protein / 250],
    colors: ["red"],
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
    colors: ["green"],
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
    colors: ["blue"],
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

  return (
    <View>
      <Modalpop protein={props.protein} visible={visible}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 18, fontWeight: "700", width: "90%" }}>Food Name</Text>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Image
              style={styles.tinyLogo}
              source={require("../images/close.png")}></Image>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 18, fontWeight: "400", paddingTop: 20, width: "50%" }}>
            Serving
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              paddingTop: 21,
              width: "50%",
              textAlign: "right",
            }}>
            {props.serving}g
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 18, fontWeight: "400", paddingTop: 20, width: "50%" }}>
            Calories
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              paddingTop: 21,
              width: "50%",
              textAlign: "right",
            }}>
            {Math.floor(Math.floor(props.calories))} kcal
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginRight: 20, paddingTop: 5 }}>
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
              <Text style={{ color: "red", fontWeight: "bold", paddingLeft: 20 }}>
                Protein
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontWeight: "bold",
                  paddingLeft: 20,
                  fontSize: 12.5,
                }}>
                {props.protein}/290g
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
              <Text style={{ color: "green", fontWeight: "bold", paddingLeft: 25 }}>
                Carbs
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontWeight: "bold",
                  paddingLeft: 20,
                  fontSize: 12.5,
                }}>
                {props.carbs}/290g
              </Text>
            </View>
          </View>

          <View style={{ textAlign: "center", paddingLeft: 15, paddingTop: 10 }}>
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
              <Text style={{ color: "blue", fontWeight: "bold", paddingLeft: 30 }}>
                Fats
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontWeight: "bold",
                  paddingLeft: 20,
                  fontSize: 12.5,
                }}>
                {props.fats}/290g
              </Text>
            </View>
          </View>
        </View>
      </Modalpop>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              paddingLeft: 12,
              paddingTop: 12.5,
              fontSize: 16,
              fontWeight: "500",
              width: '75%'
            }}>
            {props.foodName}
            
          </Text>
          <Text
            style={{
              textAlign: "right",
              paddingTop: 22.5,
              color: "#42a5f5",
              fontWeight: "bold",
            }}>
            {props.calories} kcal
          </Text>
        </View>

        <Text style={{ paddingLeft: 14, fontWeight: "bold" }}>Serving: {props.serving}G</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 0.9 * screenWidth,
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 10,
    height: screenHeight * 0.08,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: screenWidth * 0.85,
    height: screenHeight * 0.4,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
  },
  graph: {
    paddingTop: 7,
    marginLeft: 10,
  },
  tinyLogo: {
    width: screenWidth * 0.08,
    height: screenWidth * 0.08,
  },
});

export default FoodLogged;
