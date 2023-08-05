import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ViewSet from "./ViewSet";

const ViewCard = ({ exercise }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.cardTitle}>{exercise.name}</Text>
      </View>
      {exercise.sets.map((set, index) => (
        <ViewSet key={set.id} data={set} setNumber={index + 1} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#151919",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    color: "#FFFAFA",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default ViewCard;
