import React, { useCallback } from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const TopSheet = () => {
  const translateY = useSharedValue(0);

  const scrollTo = useCallback((destination) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const swipeThreshold = screenHeight * 0.4 * 0.1;
  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.min(translateY.value, screenHeight * 0.4);
      translateY.value = Math.max(translateY.value, 0);
    })
    .onEnd(() => {
      if (translateY.value > screenHeight * 0.2) {
        scrollTo(screenHeight * 0.4);
        return;
      } else if (translateY.value > screenHeight * 0.4 - swipeThreshold) {
        scrollTo(screenHeight * 0.4);
        return;
      } else if (translateY.value < screenHeight * 0.2) {
        scrollTo(0);
      }
    });

  const rTopSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [screenHeight * 0.4, 0],
      [10, 25],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, rTopSheetStyle]}>
        <View style={styles.topMargin} />
        <Text style={styles.text}> Social Media shit here </Text>
        <View style={styles.line} />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  topMargin: {
    backgroundColor: "red",
    height: 80,
  },
  container: {
    height: screenHeight * 0.5,
    width: screenWidth,
    backgroundColor: "white",
    position: "absolute",
    bottom: -screenHeight * 0.3,
    borderRadius: 25,
    zIndex: -1,
    backgroundColor: "#151919",
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    borderRadius: 2,
    top: screenHeight * 0.5 - 15,
    position: "absolute",
  },
  text: {
    color: "#FFFAFA",
    zIndex: 1,
  },
});
export default TopSheet;
