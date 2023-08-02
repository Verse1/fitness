import React, { useLayoutEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
  Easing,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DraggableFlatList from "react-native-draggable-flatlist";
import * as Haptics from "expo-haptics";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

function WorkoutSplit() {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.goBack();
  };

  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const DRAGGABLE_DATA = [
    { key: "0", label: "Rest" },
    { key: "1", label: "Rest" },
    { key: "2", label: "Rest" },
    { key: "3", label: "Rest" },
    { key: "4", label: "Rest" },
    { key: "5", label: "Rest" },
    { key: "6", label: "Rest" },
  ];

  const [draggableData, setDraggableData] = useState(DRAGGABLE_DATA);

  return (
    <View style={styles.container}>
      <View style={styles.top}></View>
      <View style={styles.content}>
        <View style={styles.dayListContainer}>
          {DAYS.map((day, index) => (
            <View key={index} style={styles.dayItem}>
              <Text style={styles.cardText}>{day}</Text>
            </View>
          ))}
        </View>
        <View style={styles.draggableListContainer}>
          <DraggableFlatList
            data={draggableData}
            scrollEnabled={false}
            onDragBegin={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            onDragEnd={({ data }) => setDraggableData(data)}
            renderItem={({ item, index, drag, isActive }) => (
              <Pressable
                style={[styles.card, isActive && styles.activeCard]}
                onLongPress={drag}>
                <TextInput
                  style={styles.cardText}
                  value={item.label}
                  onChangeText={(text) => {
                    let newData = [...draggableData];
                    let itemIndex = newData.findIndex(
                      (dataItem) => dataItem.key === item.key
                    );
                    if (itemIndex !== -1) {
                      newData[itemIndex].label = text;
                      setDraggableData(newData);
                    }
                  }}
                  keyboardAppearance="dark"
                />
              </Pressable>
            )}
            keyExtractor={(item) => item.key}
          />
        </View>
      </View>
      <Pressable style={styles.continue} onPress={handleContinue}>
        <Text> Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0E0E",
  },
  top: {
    height: screenHeight * 0.28,
  },
  headerContainer: {
    paddingBottom: 10,
    overflow: "visible",
    position: "absolute",
    zIndex: 2,
    width: "100%",
  },
  shadow: {
    backgroundColor: "transparent",
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  header: {
    justifyContent: "flex-start",
    borderBottomRightRadius: 117,
    height: screenHeight * 0.28,
  },
  progressContainer: {
    top: screenHeight * 0.07,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingLeft: 5,
    paddingRight: 10,
  },
  progressBar: {
    backgroundColor: "#FFFAFA",
    height: 10,
    width: screenWidth - 140,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 5,
  },
  progressText: {
    marginRight: 10,
    color: "#FFFAFA",
    fontWeight: "500",
  },
  Titles: {
    top: screenHeight * 0.1,
    width: "90%",
    paddingLeft: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 40,
    textAlign: "left",
    color: "#D7F2F4",
  },
  fullScreen: {
    flex: 1,
    marginTop: screenHeight * 0.28,
    backgroundColor: "#0F0E0E",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 55,
  },
  dayListContainer: {
    flex: 0.4,
    height: "100%",
    width: "100%",
    marginBottom: 10,
  },
  draggableListContainer: {
    flex: 0.6,
    height: "100%",
    width: "100%",
    marginBottom: 10,
  },
  dayItem: {
    justifyContent: "center",
    alignItems: "center",
    height: screenHeight * 0.05,
    marginTop: 15,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B77EE",
    height: screenHeight * 0.05,
    width: screenWidth * 0.46,
    borderRadius: 8,
    marginBottom: 15,
  },
  activeCard: {
    backgroundColor: "#151919",
  },
  cardText: {
    color: "#FFFAFA",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    flex: 1,
    paddingHorizontal: 20,
  },
  footer: {
    height: screenHeight * 0.15,
    justifyContent: "flex-end",
  },
  buttonView: {
    alignItems: "center",
    marginBottom: 40,
  },
  continue: {
    backgroundColor: "#D7F2F4",
    width: "80%",
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.7,
    marginVertical: 5,
    position: "absolute",
    bottom: 10,
  },
  text: {
    color: "#151919",
    textAlign: "center",
    fontWeight: "700",
  },
});

export default WorkoutSplit;
