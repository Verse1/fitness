import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

const categoryApiMapping = {
  legs: ["upper%20legs", "lower%20legs"],
  arms: ["upper%20arms", "lower%20arms"],
  abs: ["waist"],
  other: ["neck"],
};

function ExercisesModal({ visible, onClose, selectedCategory, onAddExercise }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiCategories = categoryApiMapping[selectedCategory] || [selectedCategory];
        let allData = [];

        for (const apiCategory of apiCategories) {
          const response = await axios.get(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${apiCategory}`,
            {
              headers: {
                "x-rapidapi-key": "da649500b0mshb1e7de48cddfd80p1378b5jsnb0aa765842fe",
                "x-rapidapi-host": "exercisedb.p.rapidapi.com",
              },
            }
          );
          if (response && response.data) {
            allData = [...allData, ...response.data];
          }
        }

        setData(allData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleExerciseSelect = (item) => {
    onAddExercise(item);
    onClose();
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <SafeAreaView style={styles.modalSafeArea}>
        <View style={styles.exerciseModal}>
          <View style={styles.exerciseModalHeader}>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleExerciseSelect(item)}>
                <Text style={styles.exerciseName}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalSafeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  exerciseModal: {
    width: "90%",
    height: "95%",
    borderRadius: 14,
    backgroundColor: "#fff",
    padding: 20,
  },
  exerciseModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  exerciseName: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ExercisesModal;
