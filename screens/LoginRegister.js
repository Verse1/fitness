import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Dimensions,
  Image,
  PanResponder,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const LoginRegister = ({ navigation }) => {
  const appleScale = useRef(new Animated.Value(1)).current;
  const signInScale = useRef(new Animated.Value(1)).current;
  const swipeButtonWidth = screenWidth * 0.9;
  const circleRadius = 30;

  const pan = useRef(new Animated.ValueXY()).current;

  const colorAnimation = useRef(new Animated.Value(0)).current;

  const colorSequence = Animated.sequence([
    Animated.timing(colorAnimation, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
    }),
    Animated.timing(colorAnimation, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
    }),
  ]);

  useEffect(() => {
    Animated.loop(colorSequence).start();
  }, []);

  const colorInterpolation = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e0dfdf", "#151919"],
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (
        gestureState.dx >= 0 &&
        gestureState.dx <= swipeButtonWidth - circleRadius * 2
      ) {
        pan.x.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: () => {
      if (pan.x._value > swipeButtonWidth - circleRadius * 3) {
        navigation.navigate("Name");
      }

      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
        friction: 500,
        tension: 100,
      }).start();
    },
  });

  const animatePress = (animatedValue) => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require("../images/blackman.png")}>
        <View style={styles.overlay} />
        <View style={styles.topContainer}>
          <View style={styles.spacer}></View>
          <Text style={styles.mainText}>Welcome to Owzn</Text>
          <Text style={styles.subText}>Measure your progress, Meet your potential</Text>
          <View style={styles.spacer}></View>
        </View>
        <LinearGradient
          locations={[0.15, 0.85]}
          colors={["rgba(25,25,25,0.0)", "#151919"]}
          style={styles.linearGradient}
        />
      </ImageBackground>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonsContainer}>
          <Pressable onPressIn={() => animatePress(appleScale)}>
            <Animated.View
              style={[
                {
                  transform: [{ scale: appleScale }],
                },
                styles.appleButton,
              ]}>
              <View style={styles.buttonContent}>
                <Image
                  source={require("../images/appleLogo.png")}
                  style={{ width: 16, height: 16, marginTop: 2, marginRight: 5 }}
                />
                <Text style={styles.appleText}>Sign In with Apple</Text>
              </View>
            </Animated.View>
          </Pressable>
          <Pressable style={[styles.swipeButton, { backgroundColor: "#253237" }]}>
            <LinearGradient
              colors={["#253237", "#131616"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                borderRadius: 20,
              }}>
              <Animated.View
                {...panResponder.panHandlers}
                style={[pan.getLayout(), styles.circle]}>
                <LinearGradient
                  colors={["#9FE0E5", "#D7F2F4"]}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: circleRadius,
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Feather name="arrow-right" size={32} color="black" />
                </LinearGradient>
              </Animated.View>
              <Animated.Text style={[styles.swipeText, { color: colorInterpolation }]}>
                {" "}
                Swipe to Start
              </Animated.Text>
            </LinearGradient>
          </Pressable>
        </View>
        <View style={styles.signInContainer}>
          <Text style={styles.smallText}> Already have an account?</Text>
          <Pressable
            onPressIn={() => animatePress(signInScale)}
            onPressOut={() => navigation.navigate("Login")}>
            <Animated.View
              style={[
                {
                  transform: [{ scale: signInScale }],
                },
                styles.signIn,
              ]}>
              <Text style={styles.signInText}> Sign In</Text>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: screenHeight * 0.17,
  },
  buttonContent: {
    flexDirection: "row",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#151919",
    opacity: 0.3,
  },
  container: {
    flex: 1,
    backgroundColor: "#151919",
  },
  image: {
    width: "100%",
    height: screenHeight * 0.7,
  },
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  bottomContainer: {
    alignItems: "center",
    flex: 1,
  },
  spacer: {
    height: 20,
  },
  buttonsContainer: {},
  appleButton: {
    top: screenHeight * 0.03,
    width: screenWidth * 0.9,
    height: screenHeight * 0.06,
    borderRadius: 20,
    backgroundColor: "#0f0e0e",
    justifyContent: "center",
    alignItems: "center",
  },
  swipeButton: {
    marginTop: screenHeight * 0.05,
    backgroundColor: "#253237",
    flexDirection: "row",
    width: screenWidth * 0.9,
    height: screenHeight * 0.06,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
  },
  circle: {
    width: 44,
    height: 44,
    backgroundColor: "white",
    borderRadius: 100,
    marginLeft: 5,
    marginTop: 3,
    marginBottom: 3,
    zIndex: 10,
  },
  signInContainer: {
    flexDirection: "row",
    marginTop: screenHeight * 0.04,
  },
  signIn: {
    justifyContent: "center",
    alignItems: "center",
    height: screenHeight * 0.03,
    width: screenWidth * 0.15,
    backgroundColor: "#D9D9D9",
    borderRadius: 45,
  },
  signInText: {
    color: "#151919",
    fontSize: 12,
    fontWeight: 500,
  },
  mainText: {
    position: "absolute",
    top: screenHeight * 0.48,
    fontWeight: 800,
    color: "#D7F2F4",
    fontSize: 32,
  },
  subText: {
    position: "absolute",
    top: screenHeight * 0.52,
    color: "#BFC1C2",
    fontWeight: 500,
    marginTop: 5,
    color: "white",
    fontSize: 14,
  },
  appleText: {
    color: "white",
    fontSize: 16,
    fontWeight: 500,
  },
  swipeText: {
    color: "white",
    fontSize: 16,
    fontWeight: 500,
    marginLeft: "24%",
  },
  smallText: {
    marginTop: 6,
    marginRight: 10,
    color: "white",
    fontSize: 12,
    fontWeight: 500,
  },
});

export default LoginRegister;
