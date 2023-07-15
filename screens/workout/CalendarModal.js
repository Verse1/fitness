import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StyleSheet,
} from "react-native";

function CalendarModal({ visible, onModalClose, selectedDay, workoutSplit }) {
  const dayMap = {
    Su: "Sunday",
    M: "Monday",
    Tu: "Tuesday",
    W: "Wednesday",
    Th: "Thursday",
    F: "Friday",
    Sa: "Saturday",
  };

  const selectedDayFull = dayMap[selectedDay];
  const selectedWorkout =
    workoutSplit && selectedDayFull && workoutSplit[selectedDayFull];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onModalClose}>
      <SafeAreaView style={styles.modalSafeArea}>
        <View style={styles.modalView}>
          <View style={styles.topRow}>
            <TouchableOpacity style={styles.buttonClose} onPress={onModalClose}>
              <Text style={styles.textStyle}>X</Text>
            </TouchableOpacity>
            <Text style={styles.dayText}>{selectedDayFull}</Text>
          </View>
          <Text style={styles.workoutText}>{selectedWorkout || "Rest"}</Text>
          <TouchableOpacity style={styles.workoutButton}>
            <Text style={styles.workoutButtonText}>View Exercises</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalSafeArea: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalView: {
    width: "90%",
    height: "30%",
    marginHorizontal: 20,
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  topRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonClose: {
    fontSize: 20,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  dayText: {
    fontSize: 24,
    fontWeight: "600",
  },
  workoutText: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
  },
  workoutButton: {
    marginTop: 20,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
  },
  workoutButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});

export default CalendarModal;
