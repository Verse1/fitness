import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createUUID } from "../../utils/generateUUID";
import ExerciseCard from "../../components/ExerciseCard";

function WorkoutView({ route, navigation }) {
  const { workoutName, workoutExercises } = route.params;

  const handleStartWorkout = () => {};

  // const handleAddExercise = () => {};

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAddSet = (exerciseId) => {};
  const handleDeleteSet = (exerciseId) => {};

  // const handleAddSet = (exerciseId) => {
  //   setExercises(
  //     exercises.map((exercise) => {
  //       if (exercise._id === exerciseId) {
  //         const newSet = {
  //           _id: createUUID(),
  //           reps: 0,
  //           weight: 0,
  //         };
  //         return { ...exercise, sets: [...exercise.sets, newSet] };
  //       }
  //       return exercise;
  //     })
  //   );
  // };

  // const handleDeleteSet = (exerciseId, setId) => {
  //   setExercises(
  //     exercises.map((exercise) => {
  //       if (exercise._id === exerciseId) {
  //         return {
  //           ...exercise,
  //           sets: exercise.sets.filter((set) => set._id !== setId),
  //         };
  //       }
  //       return exercise;
  //     })
  //   );
  // };

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
      {workoutExercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          handleAddSet={handleAddSet}
          handleDeleteSet={handleDeleteSet}
        />
      ))}
      {/* Removed handleAddExercise from onPress */}
      <TouchableOpacity style={styles.addExerciseButton}>
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
