import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/auth";
import CalendarModal from "./CalendarModal";
import Boxes from "../../components/Box";
import LogButton from "../../components/LogButton";
import Calendar from "../../components/CalendarContainer";
import axios from "axios";

// Calls to Backend :
// 1. When user signs in get all workouts for user
// Inside all of these workouts there will be a list of exercises
// Each exercise has a list of sets
// Each list of sets has a weight recorded and a number of reps
// 2. When User presses generate workout get all templates for user
// 3. Get users workout split

function Workout({ deleteBox, route }) {
  const navigation = useNavigation();
  const newWorkout = route.params?.newWorkout;

  const [state] = useContext(AuthContext);
  const workouts = state.user.workouts.map((workout) => workout.workoutName);
  const workoutIds = state.user.workouts.map((workout) => workout._id);

  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");

  const handleGoToGeneratedWorkout = () => {
    navigation.navigate("Loading");
  };

  const handleGoToWorkoutView = (workoutName) => {
    navigation.navigate("WorkoutView", { workoutName });
  };

  const handleGoToCalendar = (day) => {
    setSelectedDay(day);
    setCalendarModalVisible(true);
  };

  const closeCalendarModal = () => {
    setCalendarModalVisible(false);
    setSelectedDay("");
  };

  const handleGoToWorkoutSplit = () => {
    navigation.navigate("WorkoutSplit");
  };

  const handleGoToAddWorkout = () => {
    navigation.navigate("AddWorkout");
  };

  const onDeleteHandler = (index) => {
    deleteBox(index);
  };

  const handleAddWorkout = () => {
    // Inside here add the new workout to the database
    // and add it to the user's temporary workouts array
  };

  return (
    <View style={styles.outerView}>
      <ScrollView style={styles.scrollView}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.pfp} source={require("../../images/cole.jpeg")} />
            <Text style={styles.headerText}>My Workout</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.editButton} onPress={handleGoToWorkoutSplit}>
              <Feather name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Calendar handleGoToCalendar={handleGoToCalendar} selectedDay={selectedDay} />
          <View style={styles.listContainer}>
            {workouts.length === 0 && (
              <Text style={styles.noWorkoutsText}>
                You have no workouts, create a new template or generate one!
              </Text>
            )}

            {workouts.map((workout, index) => (
              <Boxes
                box={workout}
                key={index}
                isLastBox={workouts.length % 2 !== 0 && index === workouts.length - 1}
                handleGoToWorkoutView={() => handleGoToWorkoutView(workout)}
                onDeleteBox={() => onDeleteHandler(index)}
              />
            ))}
            <TouchableOpacity
              style={styles.aiButton}
              onPress={handleGoToGeneratedWorkout}>
              <Text style={styles.aiButtonText}>Generate a Workout</Text>
            </TouchableOpacity>
            <View style={{ height: 100 }} />
          </View>
        </SafeAreaView>
      </ScrollView>
      <LogButton onPress={handleGoToAddWorkout} />
      <CalendarModal
        visible={calendarModalVisible}
        onModalClose={closeCalendarModal}
        selectedDay={selectedDay}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    justifyContent: "flex-start",
  },
  pfp: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 50,
  },
  editButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
    elevation: 2,
  },
  listContainer: {
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "center",
    marginBottom: 10,
  },
  aiButton: {
    backgroundColor: "#5067FF",
    borderRadius: 30,
    padding: 20,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "96%",
    marginTop: 10,
  },
  aiButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Workout;
