import React, { useState, useEffect } from "react";
import Workout from "./Workout";
import WorkoutView from "./WorkoutView";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WorkoutManager() {
  // State management for the visibility of each component
  const [workoutVisible, setWorkoutVisible] = useState(true);
  const [workoutViewVisible, setWorkoutViewVisible] = useState(false);

  const [boxName, setBoxName] = useState("");

  // A function that manages the navigation between components.
  // It takes the current component and the target component as parameters and sets their visibility accordingly.
  const handleNavigate = (current, target, boxName) => {
    switch (current) {
      case "workout":
        setWorkoutVisible(false);
        break;

      case "workoutView":
        setWorkoutViewVisible(false);
        break;
    }

    switch (target) {
      case "workout":
        setWorkoutVisible(true);
        break;
      case "workoutView":
        setWorkoutViewVisible(true);
        setBoxName(boxName);
        break;
    }
  };

  return (
    <>
      {workoutVisible && <Workout navigate={handleNavigate} />}

      {workoutViewVisible && <WorkoutView boxName={boxName} navigate={handleNavigate} />}
    </>
  );
}
