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

const LIST_ITEM_HEIGHT = 65;
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
        <Feather name={"trash-2"} size={24} color={"#CE2029"} />
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          <View style={styles.column}>
            <View style={styles.row}>
              <View style={styles.setLabelContainer}>
                <Text style={styles.label}>Set</Text>
              </View>
              <View style={styles.setInputContainer}>
                <View style={styles.setView}>
                  <Text style={styles.setNumber}>{setNumber}</Text>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.otherLabelContainer}>
                <Text style={styles.label}>Reps</Text>
                <Text style={styles.label}>Weight</Text>
              </View>
              <View style={styles.otherInputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={reps}
                  onChangeText={setReps}
                  keyboardAppearance="dark"
                  maxLength={4}
                />
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight}
                  keyboardAppearance="dark"
                  maxLength={4}
                />
              </View>
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
    backgroundColor: "#151919",
    borderRadius: 10,
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
  },
  column: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "column",
    flex: 1,
    height: LIST_ITEM_HEIGHT,
  },
  setLabelContainer: {
    flex: 1 / 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: 7,
  },
  setInputContainer: {
    flex: 2 / 3,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  otherLabelContainer: {
    flex: 1 / 3,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 7,
  },
  otherInputContainer: {
    flex: 2 / 3,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  label: {
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFAFA",
  },
  setView: {
    width: "25%",
    height: "100%",
    borderRadius: 5,
    backgroundColor: "#253237",
    justifyContent: "center",
    alignItems: "center",
  },
  setNumber: {
    color: "#FFFAFA",
    fontSize: 18,
    fontWeight: "700",
  },
  input: {
    textAlign: "center",
    width: "40%",
    borderRadius: 5,
    backgroundColor: "#253237",
    color: "#FFFAFA",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default SetCard;
