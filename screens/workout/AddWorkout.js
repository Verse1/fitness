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
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ExerciseCard from "../../components/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import ExerciseCategoryModal from "./ExerciseCategoryModal";
import ExercisesModal from "./ExercisesModal";

function AddWorkout({}) {
  const navigation = useNavigation();

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [exercisesModalVisible, setExercisesModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
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

  const handleSave = () => {
    if (workoutName === "") {
      Alert.alert("Missing Workout Name", "Please enter a name for the workout", [
        { text: "OK" },
      ]);
      return;
    }

    console.log({
      name: workoutName,
      notes: notes,
      exercises: exercises.map((exercise) => exercise.name),
    });

    setWorkoutName("");
    setNotes("");
    setExercises([]);
    navigation.goBack();
  };

  const handleOpenCategoryModal = () => {
    setCategoryModalVisible(true);
  };

  const handleCloseCategoryModal = () => {
    setCategoryModalVisible(false);
  };

  const handleAddExercise = (exercise) => {
    setExercises((prevExercises) => [...prevExercises, exercise]);
  };

  const handleDeleteExercise = (exerciseId) => {
    setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleOpenDeleteModal}>
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>New Workout</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={[styles.workoutName, workoutName ? styles.active : styles.inactive]}
        placeholder="Workout Name"
        onChangeText={(text) => setWorkoutName(text)}
      />
      <TextInput
        style={[styles.notes, { height: 100 }]}
        placeholder="Notes"
        multiline
        numberOfLines={4}
        maxLength={200}
        scrollEnabled={false}
      />
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          name={exercise.name}
          onDelete={() => handleDeleteExercise(exercise.id)}
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
              <TouchableOpacity style={styles.confirmDeleteButton} onPress={handleDelete}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.noButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    backgroundColor: "gray",
    borderRadius: 5,
  },
  saveButton: {
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "blue",
  },
  addButton: {
    width: "80%",
    alignSelf: "center",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: "lightblue",
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
    fontSize: 20,
    fontWeight: "500",
  },
  workoutName: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    marginBottom: 10,
  },
  active: {
    color: "black",
  },
  inactive: {
    color: "gray",
  },
  notes: {
    fontSize: 16,
    padding: 10,
    marginBottom: 20,
    borderColor: "transparent",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  addButtonText: {
    color: "blue",
    fontWeight: "bold",
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmDeleteButton: {
    flex: 1,
    margin: 10,
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  noButton: {
    flex: 1,
    margin: 10,
    backgroundColor: "gray",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  modalSafeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  exerciseModal: {
    width: "90%",
    height: "90%",
    borderRadius: 14,
    backgroundColor: "#fff",
    padding: 20,
  },
  exerciseModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  exerciseModalAdd: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  exerciseModalSearchBar: {
    height: 40,
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginTop: 20,
    marginRight: 10,
  },
  filterButton: {
    marginTop: 20,
  },
});

export default AddWorkout;
