import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const categories = [
  "Chest",
  "Back",
  "Legs",
  "Arms",
  "Shoulders",
  "Abs",
  "Cardio",
  "Other",
];

function ExerciseCategoryModal({ visible, onClose, onOpenCategoryModal }) {
  const handleCategoryClick = (category) => {
    onOpenCategoryModal(category);
    onClose();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <SafeAreaView style={styles.modalSafeArea}>
        <View style={styles.exerciseModal}>
          <View style={styles.exerciseModalHeader}>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <Feather name="x" size={24} color="#FFFAFA" />
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.boxContainer}
                onPress={() => handleCategoryClick(category)}>
                <Text style={styles.boxText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  backButton: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: "#151919",
    borderRadius: 8,
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
    justifyContent: "flex-start",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  boxContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151919",
    width: "45%",
    height: "45%",
    aspectRatio: 1,
    margin: "2.5%",
    borderRadius: 12,
  },
  boxText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#d7f2f4",
  },
});

export default ExerciseCategoryModal;
