import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ExerciseCard from "../../components/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { createUUID } from "../../utils/generateUUID";
import ExerciseCategoryModal from "./ExerciseCategoryModal";
import ExercisesModal from "./ExercisesModal";
import axios from "axios";

function AddWorkout({ route }) {
  const navigation = useNavigation();
  const userId = route.params.userId;

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [exercisesModalVisible, setExercisesModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isExerciseAdded, setIsExerciseAdded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [workoutName, setWorkoutName] = useState("");
  const [notes, setNotes] = useState("");
  const [exercises, setExercises] = useState([]);

  const handleOpenExerciseModal = (category) => {
    setSelectedCategory(category.toLowerCase());
    setExercisesModalVisible(true);
  };

  const handleCloseExerciseModal = () => {
    setExercisesModalVisible(false);
    if (isExerciseAdded) {
      setCategoryModalVisible(true);
    } else {
      setIsExerciseAdded(false);
    }
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const handleDelete = () => {
    setWorkoutName("");
    setNotes("");
    setExercises([]);
    navigation.goBack();
  };

  const handleSave = async () => {
    if (workoutName === "") {
      Alert.alert("Missing Workout Name", "Please enter a name for the workout", [
        { text: "OK" },
      ]);
      return;
    }

    const workout = {
      // Change here if you want to change names in schema
      name: workoutName,
      notes: notes,
      exercises: exercises.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets.map((set) => ({
          reps: set.reps === "" ? 0 : set.reps,
          weight: set.weight === "" ? 0 : set.weight,
        })),
      })),
    };
    try {
      const response = await axios.post("http://localhost:8000/api/workout", {
        userId: userId,
        workoutName: workout.name,
        notes: workout.notes,
        exercises: workout.exercises,
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      // Give elon musk my number
      const savedWorkout = {
        ...workout,
        _id: response.data._id,
      };

      navigation.navigate("Workout", { newWorkout: savedWorkout });
    } catch (error) {
      console.error("Error creating workout:", error);
      Alert.alert("Sorry", "Your workout is so trash we cant save it");
    }
    setWorkoutName("");
    setNotes("");
    setExercises([]);
  };

  const handleOpenCategoryModal = () => {
    setCategoryModalVisible(true);
  };

  const handleCloseCategoryModal = () => {
    setCategoryModalVisible(false);
  };

  const handleAddExercise = (exercise) => {
    setExercises((prevExercises) => [
      ...prevExercises,
      {
        id: createUUID(),
        name: exercise.name,
        sets: [],
      },
    ]);
    setIsExerciseAdded(true);
  };

  const handleDeleteExercise = (exerciseId) => {
    setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
  };

  const handleAddSet = (exerciseId, sets) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === exerciseId ? { ...exercise, sets: sets } : exercise
      )
    );
  };

  const handleDeleteSet = (exerciseId, setId) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.filter((set) => set.id !== setId),
            }
          : exercise
      )
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleOpenDeleteModal}>
              <Feather name="x" size={24} color="#FFFAFA" />
            </TouchableOpacity>
            <Text style={styles.title}>New Workout</Text>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.workoutName}
            placeholder="Workout Name"
            placeholderTextColor={"#a9a9a9"}
            onChangeText={(text) => setWorkoutName(text)}
          />
          <TextInput
            style={[styles.notes, { height: 100 }]}
            placeholder="Notes"
            placeholderTextColor={"#a9a9a9"}
            multiline
            numberOfLines={4}
            maxLength={200}
            scrollEnabled={false}
          />

          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              handleAddSet={handleAddSet}
              handleDeleteSet={handleDeleteSet}
              handleDeleteExercise={handleDeleteExercise}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleOpenCategoryModal}>
            <Text style={styles.addButtonText}>Add Exercise</Text>
          </TouchableOpacity>

          <ExerciseCategoryModal
            visible={categoryModalVisible}
            onClose={handleCloseCategoryModal}
            onOpenCategoryModal={handleOpenExerciseModal}
          />
          <ExercisesModal
            visible={exercisesModalVisible}
            selectedCategory={selectedCategory}
            onAddExercise={handleAddExercise}
            onClose={handleCloseExerciseModal}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={deleteModalVisible}
            onRequestClose={() => {
              setDeleteModalVisible(!deleteModalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Do you want to delete the workout?</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.confirmDeleteButton}
                    onPress={handleDelete}>
                    <Text style={styles.modalButtonText}>Delete</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.noButton}
                    onPress={() => setDeleteModalVisible(false)}>
                    <Text style={styles.modalButtonText}>Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0f0e0e",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: "#151919",
    borderRadius: 8,
  },
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderRadius: 8,
    height: 44,
    width: 60,
    backgroundColor: "#1B77EE",
  },
  buttonText: {
    color: "#151919",
    fontWeight: "bold",
    fontSize: 16,
  },
  addButton: {
    width: "80%",
    alignSelf: "center",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: "#1B77EE",
    alignItems: "center",
  },
  deleteButton: {
    width: "80%",
    alignSelf: "center",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: "red",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#FFFAFA",
    fontWeight: "700",
  },
  workoutName: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    marginBottom: 10,
    color: "#FFFAFA",
  },
  notes: {
    fontSize: 16,
    padding: 10,
    marginBottom: 20,
    borderColor: "transparent",
    color: "#FFFAFA",
    fontWeight: "400",
  },
  addButtonText: {
    color: "#151919",
    fontWeight: "700",
    fontSize: 18,
  },
  deleteButtonText: {
    color: "darkred",
    fontWeight: "bold",
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    backgroundColor: "#151919",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmDeleteButton: {
    flex: 1,
    margin: 10,
    backgroundColor: "#CE2029",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  noButton: {
    flex: 1,
    margin: 10,
    backgroundColor: "#A9A9A9",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    color: "#FFFAFA",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default AddWorkout;
