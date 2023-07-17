import React, { useContext, useState, useEffect } from "react";
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

function Workout({ deleteBox, route }) {
  const navigation = useNavigation();
  const newWorkout = route.params?.newWorkout;

  const [localWorkouts, setLocalWorkouts] = useState([]);
  const [state] = useContext(AuthContext);

  // The WorkoutNames
  const workouts = localWorkouts.map((workout) => workout.name);
  const workoutIds = localWorkouts.map((workout) => workout._id);

  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    if (newWorkout) {
      setLocalWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
    }
  }, [newWorkout]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/workout/${state.user._id}`
        );
        setLocalWorkouts(response.data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  const handleGoToGeneratedWorkout = () => {
    navigation.navigate("Loading");
  };

  const handleGoToWorkoutView = (workout) => {
    navigation.navigate("WorkoutView", {
      workoutName: workout.name,
      workoutExercises: workout.exercises,
    });
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
    navigation.navigate("AddWorkout", { userId: state.user._id });
  };

  const onDeleteHandler = async (index) => {
    try {
      const workoutToDelete = localWorkouts[index];

      await axios.delete(`http://localhost:8000/api/workout/${workoutToDelete._id}`, {
        data: { userId: state.user._id },
      });

      setLocalWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout._id !== workoutToDelete._id)
      );
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
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
            {localWorkouts.length === 0 && (
              <Text style={styles.noWorkoutsText}>
                You have no workouts, create a new template or generate one!
              </Text>
            )}
            {localWorkouts.map((workout, index) => (
              <Boxes
                key={index}
                box={workout.name}
                isLastBox={
                  localWorkouts.length % 2 !== 0 && index === localWorkouts.length - 1
                }
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
