import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const LIST_ITEM_HEIGHT = 65;

function SetCard({ data, setNumber }) {
  const [weight, setWeight] = useState(data.weight || "");
  const [reps, setReps] = useState(data.reps || "");

  return (
    <View style={styles.taskContainer}>
      <View style={styles.iconContainer}>
        <Feather name={"trash-2"} size={24} color={"#CE2029"} />
      </View>
      <View style={styles.task}>
        <View style={styles.column}>
          <View style={styles.row}>
            <View style={styles.setLabelContainer}>
              <Text style={styles.label}>Set</Text>
            </View>
            <View style={styles.setInputContainer}>
              <View style={styles.setView}>
                <Text style={styles.setNumber}>{setNumber}</Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.otherLabelContainer}>
              <Text style={styles.label}>Reps</Text>
              <Text style={styles.label}>Weight</Text>
            </View>
            <View style={styles.otherInputContainer}>
              <View style={styles.input}>
                <Text style={styles.inputText}></Text>
              </View>
              <View style={styles.input}>
                <Text style={styles.inputText}></Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  task: {
    width: "100%",
    height: LIST_ITEM_HEIGHT,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: "#151919",
    borderRadius: 10,
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
  },
  column: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "column",
    flex: 1,
    height: LIST_ITEM_HEIGHT,
  },
  setLabelContainer: {
    flex: 1 / 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: 7,
  },
  setInputContainer: {
    flex: 2 / 3,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  otherLabelContainer: {
    flex: 1 / 3,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 7,
  },
  otherInputContainer: {
    flex: 2 / 3,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  label: {
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFAFA",
  },
  setView: {
    width: "25%",
    height: "100%",
    borderRadius: 5,
    backgroundColor: "#253237",
    justifyContent: "center",
    alignItems: "center",
  },
  setNumber: {
    color: "#FFFAFA",
    fontSize: 18,
    fontWeight: "700",
  },
  input: {
    width: "40%",
    borderRadius: 5,
    backgroundColor: "#253237",
    color: "#FFFAFA",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default SetCard;
