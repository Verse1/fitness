import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import ViewCard from "../../components/ViewCard";

function WorkoutView({ route, navigation }) {
  const { workoutName, workoutExercises } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color="#FFFAFA" />
        </TouchableOpacity>
        <Text style={styles.title}>Your {workoutName} Routine</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Feather name="download" size={24} color="#FFFAFA" />
        </TouchableOpacity>
      </View>
      {workoutExercises.map((exercise) => (
        <ViewCard key={exercise._id} exercise={exercise} />
      ))}
      <TouchableOpacity style={styles.addExerciseButton}>
        <Text style={styles.buttonText}>Edit Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.startWorkoutButton}>
        <Text style={styles.buttonText}>Start Workout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0f0e0e",
  },
  header: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#D7F2F4",
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
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#1b77ee",
    margin: 10,
    width: "90%",
    alignSelf: "center",
  },
  startWorkoutButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#CE2029",
    margin: 10,
    width: "90%",
    alignSelf: "center",
    marginBottom: 150,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFAFA",
    fontWeight: "700",
    textAlign: "center",
  },
  backButton: {
    marginLeft: 20,
  },
  exportButton: {
    marginRight: 20,
  },
});

export default WorkoutView;
