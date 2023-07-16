import React, { useState, useEffect } from "react";
import { TextInput, Dimensions, StyleSheet, Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

const LIST_ITEM_HEIGHT = 50;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

function SetCard({ data, setNumber, onDelete, onSetChange }) {
  const translateX = useSharedValue(0);
  const [weight, setWeight] = useState(data.weight || "");
  const [reps, setReps] = useState(data.reps || "");

  useEffect(() => {
    onSetChange(weight, reps);
  }, [weight, reps]);

  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withSpring(-SCREEN_WIDTH);
        runOnJS(onDelete)();
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
    };
  });

  return (
    <Animated.View style={styles.taskContainer}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <Feather name={"trash-2"} size={LIST_ITEM_HEIGHT * 0.4} color={"red"} />
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Set</Text>
              <Text style={styles.label}>Previous</Text>
              <Text style={styles.label}>Weight</Text>
              <Text style={styles.label}>Reps</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.input}>{setNumber}</Text>
              <TextInput style={styles.input} keyboardType="numeric" />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={reps}
                onChangeText={setReps}
              />
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  task: {
    width: "100%",
    height: LIST_ITEM_HEIGHT,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
  },
  row: {
    flexDirection: "column",
    flex: 1,
    height: LIST_ITEM_HEIGHT,
  },
  labelContainer: {
    flex: 1 / 3,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  inputContainer: {
    flex: 2 / 3,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  label: {
    flex: 1,
    fontSize: 12,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 2,
  },
});

export default SetCard;
