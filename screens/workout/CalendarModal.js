import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function CalendarModal({ visible, onModalClose, selectedDay, workoutSplit }) {
  const dayMap = {
    Sun: "Sunday",
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
  };

  const selectedDayFull = dayMap[selectedDay];
  const selectedWorkout = "Rest";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onModalClose}>
      <TouchableOpacity
        style={styles.modalSafeArea}
        activeOpacity={1}
        onPress={onModalClose}>
        <View style={styles.modalView} onStartShouldSetResponder={() => true}>
          <LinearGradient
            colors={["#D7F2F4", "#bfeaed"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientContainer}>
            <View style={styles.topRow}>
              <Text style={styles.dayText}>{selectedDayFull}</Text>
            </View>
            <Text> Bruh what was I thinking</Text>
            <Text> What is this ass feature</Text>
            <Text style={styles.workoutText}>{selectedWorkout}</Text>
            <TouchableOpacity style={styles.workoutButton}>
              <Text style={styles.workoutButtonText}>View Workout</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </TouchableOpacity>
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
    width: screenWidth * 0.9,
    height: screenHeight * 0.2,
    marginHorizontal: 20,
    alignSelf: "center",
    borderRadius: 25,
  },
  gradientContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 25,
  },
  topRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
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
    color: "#151919",
    textAlign: "center",
    marginTop: 10,
  },
  workoutButton: {
    marginTop: 35,
    backgroundColor: "#151919",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  workoutButtonText: {
    color: "#FFFAFA",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CalendarModal;
