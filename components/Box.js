import React, { useState, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const Box = ({ box, isLastBox, handleGoToWorkoutView, onDeleteBox }) => {
  const [longPress, setLongPress] = useState(false);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const onLongPress = () => {
    setLongPress(!longPress);
    longPress ? shakeAnimation.stopAnimation() : startShake();
    if (!longPress) {
      Alert.alert("Delete Workout", "Are you sure you want to delete this workout?", [
        {
          text: "Cancel",
          onPress: () => {
            setLongPress(false);
            shakeAnimation.setValue(0);
            shakeAnimation.stopAnimation();
          },
        },
        {
          text: "OK",
          onPress: () => {
            if (onDeleteBox) {
              onDeleteBox();
              setLongPress(false);
              shakeAnimation.stopAnimation();
            }
          },
        },
      ]);
    }
  };

  const startShake = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ])
    ).start();
  };

  const containerStyle = isLastBox
    ? [styles.oddBoxContainer, longPress ? styles.boxLongPress : null]
    : [styles.evenBoxContainer, longPress ? styles.boxLongPress : null];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handleGoToWorkoutView}
      onLongPress={onLongPress}
      delayLongPress={1000}>
      <Animated.View
        style={{
          transform: [{ translateX: shakeAnimation }],
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}>
        <Text style={styles.boxText}>{box}</Text>
        {longPress && (
          <Feather
            name="trash-2"
            size={80}
            color="#fff"
            style={{ position: "absolute", top: 10 }}
          />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  evenBoxContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    width: "46%",
    aspectRatio: 1,
    margin: "2%",
    borderRadius: 12,
  },
  oddBoxContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    width: "96%",
    aspectRatio: 2,
    margin: "2%",
    borderRadius: 12,
  },
  boxLongPress: {
    backgroundColor: "red",
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Box;
