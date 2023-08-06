import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DraggableFlatList from "react-native-draggable-flatlist";
import * as Haptics from "expo-haptics";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

function WorkoutSplit({ route }) {
  const navigation = useNavigation();
  const workoutSplit = route.params.workoutSplit;

  const handleContinue = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.goBack();
  };

  const handleCancel = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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

  const DRAGGABLE_DATA = workoutSplit.map((label, index) => ({
    key: index.toString(),
    label,
  }));

  const [draggableData, setDraggableData] = useState(DRAGGABLE_DATA);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}> Your Workout Split </Text>
      </View>
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
      <Pressable style={styles.cancel} onPress={handleCancel}>
        <Text style={styles.cancelText}> Cancel </Text>
      </Pressable>
      <Pressable style={styles.continue} onPress={handleContinue}>
        <Text style={styles.saveText}> Save </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0E0E",
    justifyContent: "center",
    alignItems: "center",
  },
  topContainer: {
    width: "100%",
    height: screenHeight * 0.25,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFFAFA",
    fontWeight: "700",
    fontSize: 32,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  dayListContainer: {
    flex: 0.5,
    width: "100%",
    marginBottom: 10,
  },
  draggableListContainer: {
    flex: 0.5,
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
  continue: {
    backgroundColor: "#D7F2F4",
    width: "75%",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    bottom: screenHeight * 0.08,
  },
  cancel: {
    backgroundColor: "#CE2029",
    width: "75%",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    bottom: screenHeight * 0.095,
  },
  saveText: {
    fontWeight: "700",
    fontSize: 16,
  },
  cancelText: {
    fontWeight: "700",
    fontSize: 16,
  },
});

export default WorkoutSplit;
