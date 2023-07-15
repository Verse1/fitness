import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import ExerciseCard from "../../components/ExerciseCard";
import { createUUID } from "../../utils/generateUUID";

function WorkoutView({ route, navigation }) {
  const { workoutName } = route.params;

  const [exercises, setExercises] = useState([
    {
      id: createUUID(),
      name: "Exercise 1",
      sets: [
        { id: createUUID(), name: "Set 1" },
        { id: createUUID(), name: "Set 2" },
      ],
    },
    {
      id: createUUID(),
      name: "Exercise 2",
      sets: [
        { id: createUUID(), name: "Set 1" },
        { id: createUUID(), name: "Set 2" },
      ],
    },
  ]);

  const handleStartWorkout = () => {};

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAddExercise = () => {};

  const handleAddSet = (exerciseId) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const newSet = { id: createUUID(), name: `Set ${exercise.sets.length + 1}` };
          return { ...exercise, sets: [...exercise.sets, newSet] };
        }
        return exercise;
      })
    );
  };

  const handleDeleteSet = (exerciseId, setId) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return { ...exercise, sets: exercise.sets.filter((set) => set.id !== setId) };
        }
        return exercise;
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Your {workoutName} Routine</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Feather name="download" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {exercises.map((exercise) => (
        <View key={exercise.id} style={styles.card}>
          <Text style={styles.cardTitle}>{exercise.name}</Text>
          {exercise.sets.map((set) => (
            <ExerciseCard
              key={set.id}
              data={set.name}
              onDelete={() => handleDeleteSet(exercise.id, set.id)}
            />
          ))}
          <TouchableOpacity
            style={styles.addSetButton}
            onPress={() => handleAddSet(exercise.id)}>
            <Text style={styles.addSetText}>Add Set</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addExerciseButton} onPress={handleAddExercise}>
        <Text style={styles.buttonText}>Add Exercise</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.startWorkoutButton} onPress={handleStartWorkout}>
        <Text style={styles.buttonText}>Start Workout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#2a2727",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#fff",
  },
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
  addExerciseButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: "blue",
    margin: 10,
    width: "90%",
    alignSelf: "center",
  },
  startWorkoutButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: "green",
    margin: 10,
    width: "90%",
    alignSelf: "center",
    marginBottom: 150,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    marginLeft: 10,
  },
  exportButton: {
    marginRight: 10,
  },
});

export default WorkoutView;
