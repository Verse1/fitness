import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import SetCard from "./SetCard";

const ExerciseCard = ({ exercise, handleAddSet, handleDeleteSet }) => {
  return (
    <View key={exercise.id} style={styles.card}>
      <Text style={styles.cardTitle}>{exercise.name}</Text>
      {exercise.sets.map((set, index) => (
        <SetCard
          key={set.id}
          data={set}
          setNumber={index + 1}
          onDelete={() => handleDeleteSet(exercise.id, set.id)}
        />
      ))}
      <TouchableOpacity
        style={styles.addSetButton}
        onPress={() => handleAddSet(exercise.id)}>
        <Text style={styles.addSetText}>Add Set</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addSetButton: {
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 1,
    marginTop: 10,
  },
  addSetText: {
    color: "#fff",
  },
});

export default ExerciseCard;
