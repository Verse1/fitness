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

// const categoryApiMapping = {
//   legs: ["upper%20legs", "lower%20legs"],
//   arms: ["upper%20arms", "lower%20arms"],
//   abs: ["waist"],
//   other: ["neck"],
// };

// Removed selectedCategory from props
function ExercisesModal({ visible, onClose, onAddExercise }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises`,
          {
            headers: {
              "x-rapidapi-key": "3be595a465mshf6ee17a5dee2e17p159202jsn088a3d431df3",
              "x-rapidapi-host": "exercises-by-api-ninjas.p.rapidapi.com",
            },
            params: { muscle: "biceps" },
          }
        );

        if (response && response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const apiCategories = ["biceps"];
  //       let allData = [];

  //       for (const apiCategory of apiCategories) {
  //         const response = await axios.get(
  //           `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises`,
  //           {
  //             headers: {
  //               "x-rapidapi-key": "3be595a465mshf6ee17a5dee2e17p159202jsn088a3d431df3",
  //               "x-rapidapi-host": "exercises-by-api-ninjas.p.rapidapi.com",
  //             },
  //             params: { muscle: apiCategories },
  //           }
  //         );
  //         if (response && response.data) {
  //           allData = [...allData, ...response.data];
  //         }
  //       }

  //       setData(allData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, [selectedCategory]);

  const handleExerciseSelect = (item) => {
    onAddExercise(item);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <SafeAreaView style={styles.modalSafeArea}>
        <View style={styles.exerciseModal}>
          <View style={styles.exerciseModalHeader}>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <Feather name="x" size={24} color="#FFFAFA" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleExerciseSelect(item)}>
                <Text style={styles.exerciseName}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item.id || index.toString()}
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  exerciseModal: {
    width: "90%",
    height: "95%",
    borderRadius: 14,
    backgroundColor: "#253237",
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
    marginLeft: 10,
    backgroundColor: "#151919",
    borderRadius: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFAFA",
    marginBottom: 10,
    marginLeft: 10,
    marginVertical: 6,
  },
});

export default ExercisesModal;
