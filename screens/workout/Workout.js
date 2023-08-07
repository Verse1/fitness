import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TopSheet from "../../components/TopSheet";

screenWidth = Dimensions.get("window").width;
screenHeight = Dimensions.get("window").height;

function Workout({ route }) {
  const navigation = useNavigation();
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");

  // Get all the data stored in the user now contains each workout information too
  const [state] = useContext(AuthContext);

  // ***************************************************************************************
  // If user creates a new workout instead of fetching the data from the backend instead route it locally and save it locally
  // ( the database and local state are copies of each other but do not talk to each other)
  // To save like the data shit idk what it saves but it saves calls
  // When the user logs in all the workout data is fetched once so there is no need for constant get calls
  const newWorkout = route.params?.newWorkout;
  const [localWorkouts, setLocalWorkouts] = useState(state.user.workouts || []);

  useEffect(() => {
    if (newWorkout) {
      setLocalWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
    }
  }, [newWorkout]);
  // ***************************************************************************************

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

  const handleGoToWorkoutSplit = () => {
    navigation.navigate("WorkoutSplit", { workoutSplit: state.user.workoutSplit });
  };

  const handleGoToAddWorkout = () => {
    navigation.navigate("AddWorkout", { userId: state.user._id });
  };

  const handleGoToProfile = () => {
    navigation.navigate("Profile");
  };

  const closeCalendarModal = () => {
    setCalendarModalVisible(false);
    setSelectedDay("");
  };

  const onDeleteHandler = async (index) => {
    const workoutToDelete = localWorkouts[index];
    if (workoutToDelete._id) {
      try {
        await axios.delete(`http://localhost:8000/api/workout/${workoutToDelete._id}`, {
          data: { userId: state.user._id },
        });

        setLocalWorkouts((prevWorkouts) =>
          prevWorkouts.filter((workout) => workout._id !== workoutToDelete._id)
        );
      } catch (error) {
        console.error("Error deleting workout:", error);
      }
    } else {
      console.error("Cannot delete workout with undefined ID");
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <TouchableOpacity onPress={handleGoToProfile}>
                <Image style={styles.pfp} source={require("../../images/cole.jpeg")} />
              </TouchableOpacity>
              <Text style={styles.headerText}>My Workout</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleGoToWorkoutSplit}>
                <Feather name="edit-2" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Calendar
              style={styles.calendarContainer}
              handleGoToCalendar={handleGoToCalendar}
              selectedDay={selectedDay}
            />
          </View>
          <TopSheet />
        </View>
        <ScrollView style={styles.scrollView}>
          <SafeAreaView style={styles.container}>
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
          workoutSplit={state.user.workoutSplit}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0E0E",
  },
  headerContainer: {
    position: "absolute",
    paddingBottom: 10,
    zIndex: 2,
    width: "100%",
  },
  scrollView: {
    flex: 1,
    top: screenHeight * 0.28,
    backgroundColor: "#0F0E0E",
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 52,
    position: "absolute",
    height: screenHeight * 0.28,
    width: "100%",
    padding: 10,
    backgroundColor: "#151919",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  pfp: {
    width: screenWidth * 0.14,
    height: screenWidth * 0.14,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 30,
    marginTop: 8,
  },
  headerText: {
    fontSize: 32,
    color: "#FFFAFA",
    fontWeight: "bold",
  },
  editButton: {
    position: "absolute",
    top: -10,
    right: 0,
    padding: 10,
  },
  listContainer: {
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "center",
    marginBottom: 10,
  },
  noWorkoutsText: {
    color: "#FFFAFA",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  aiButton: {
    backgroundColor: "#D7F2F4",
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
