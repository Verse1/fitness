import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { createUUID } from "../utils/generateUUID";
import Feather from "react-native-vector-icons/Feather";
import SetCard from "./SetCard";

const ExerciseCard = ({
  exercise,
  handleAddSet,
  handleDeleteSet,
  handleDeleteExercise,
}) => {
  const initialSet = {
    id: createUUID(),
    weight: "",
    reps: "",
  };
  const [sets, setSets] = useState(
    exercise.sets?.length > 0 ? exercise.sets : [initialSet]
  );
  const [showIcon, setShowIcon] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    handleAddSet(exercise.id, sets);
  }, [sets]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: showIcon ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showIcon]);

  const handleSetChange = (index, weight, reps) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], weight, reps };
    setSets(newSets);
  };

  const handleAddSetLocal = () => {
    if (showIcon) return;
    setSets((prevSets) => {
      const newSets = [
        ...prevSets,
        {
          id: createUUID(),
          weight: "",
          reps: "",
        },
      ];
      // dont remove this, prevents double call to each exercisecard
      if (prevSets.length === 0) {
        handleAddSet(exercise.id, newSets);
      }
      return newSets;
    });
  };

  const backgroundColorInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#151919", "#0f0e0e"],
  });

  const animatedStyle = {
    backgroundColor: backgroundColorInterpolation,
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setShowIcon(false)}
      onLongPress={() => setShowIcon(true)}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <View style={styles.header}>
          <Text style={[styles.cardTitle, showIcon && styles.disabledTitle]}>
            {exercise.name}
          </Text>
          {showIcon && (
            <TouchableOpacity
              style={styles.trashIcon}
              onPress={() => handleDeleteExercise(exercise.id)}>
              <Feather name="trash-2" size={24} color="#CE2029" />
            </TouchableOpacity>
          )}
        </View>
        {exercise.sets.map((set, index) => (
          <SetCard
            key={set.id}
            data={set}
            setNumber={index + 1}
            onDelete={() => {
              handleDeleteSet(exercise.id, set.id);
              setSets(sets.filter((s) => s.id !== set.id));
            }}
            onSetChange={(weight, reps) => handleSetChange(index, weight, reps)}
          />
        ))}
        <TouchableOpacity
          style={[styles.addSetButton, showIcon && styles.disabledButton]}
          onPress={handleAddSetLocal}
          activeOpacity={showIcon ? 1 : 0.2}>
          <Text style={styles.addSetText}>Add Set</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#151919",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    color: "#FFFAFA",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    lineHeight: 24,
  },
  disabledTitle: {
    color: "#323334",
  },
  trashIcon: {
    view: "hidden",
    alignSelf: "center",
    marginBottom: 10,
  },
  addSetButton: {
    alignSelf: "center",
    width: "30%",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#D7F2F2",
    borderRadius: 10,
    borderColor: "#FFFAFA",
    borderWidth: 1,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#323334",
    borderWidth: 0,
  },
  addSetText: {
    color: "#151919",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default ExerciseCard;
