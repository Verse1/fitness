import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import SetCard from "./SetCard";
import { createUUID } from "../utils/generateUUID";

const ExerciseCard = ({ exercise, handleAddSet, handleDeleteSet }) => {
  const [sets, setSets] = useState(exercise.sets || []);

  useEffect(() => {
    handleAddSet(exercise.id, sets);
  }, [sets]);

  const handleSetChange = (index, weight, reps) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], weight, reps };
    setSets(newSets);
  };

  const handleAddSetLocal = () => {
    setSets((prevSets) => {
      const newSets = [
        ...prevSets,
        {
          id: createUUID(),
          weight: "",
          reps: "",
        },
      ];
      handleAddSet(exercise.id, newSets);
      return newSets;
    });
  };

  return (
    <View key={exercise.id} style={styles.card}>
      <Text style={styles.cardTitle}>{exercise.name}</Text>
      {exercise.sets.map((set, index) => (
        <SetCard
          key={set.id}
          data={set}
          setNumber={index + 1}
          // Ong chatgpt the goat Ion even know what the fuck this code does but it works
          onDelete={() => {
            handleDeleteSet(exercise.id, set.id);
            setSets(sets.filter((s) => s.id !== set.id));
          }}
          onSetChange={(weight, reps) => handleSetChange(index, weight, reps)}
        />
      ))}
      <TouchableOpacity style={styles.addSetButton} onPress={handleAddSetLocal}>
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
