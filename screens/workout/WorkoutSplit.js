import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function WorkoutSplit() {
  const navigation = useNavigation();
  const [splits, setSplits] = useState({
    Sunday: "",
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
  });

  const handleSplitUpdate = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.container} activeOpacity={1}>
        <View style={styles.modalView}>
          {days.map((day) => (
            <View key={day} style={styles.dayContainer}>
              <Text style={styles.day}>{day}:</Text>
              <TextInput
                style={styles.inputBox}
                value={splits[day]}
                onChangeText={(text) => setSplits((prev) => ({ ...prev, [day]: text }))}
                placeholder="Rest"
              />
            </View>
          ))}
          <TouchableOpacity style={styles.saveButton} onPress={handleSplitUpdate}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 100,
  },
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  day: {
    fontSize: 18,
    color: "#fff",
    width: 100,
  },
  inputBox: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    minWidth: 200,
    fontSize: 18,
  },
  saveButton: {
    alignSelf: "center",
    backgroundColor: "#5067FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 100,
  },
  saveText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default WorkoutSplit;
