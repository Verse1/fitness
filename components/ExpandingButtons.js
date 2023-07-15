import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";


const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const ExpandingButtons = (props) => {
  const navigation = useNavigation();

  const [icon_1] = useState(new Animated.Value(0));
  const [icon_2] = useState(new Animated.Value(0));
  const [pop, setPop] = useState(false);
  const [rotation] = useState(new Animated.Value(0));
  const [lastButtonRotation] = useState(new Animated.Value(0));

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 75,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 150,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(rotation, {
      toValue: 45,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(rotation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const rotateLastButton = () => {
    Animated.timing(lastButtonRotation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const plusButtonRotation = rotation.interpolate({
    inputRange: [0, 45],
    outputRange: ["0deg", "45deg"],
  });

  // const lastButtonRotateStyle = {
  //   transform: [
  //     {
  //       rotate: lastButtonRotation.interpolate({
  //         inputRange: [0, 1],
  //         outputRange: ["0deg", "deg"],
  //       }),
  //     },
  //   ],
  // };

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[styles.circle, { bottom: icon_1 }]}>
        <TouchableOpacity onPress={() => {
          navigation.navigate("LogMeal") 
          }}>
                    <Icon name="cloud-upload" size={25} color="white" />

        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.circle, { bottom: icon_2 }]}>
        <TouchableOpacity onPress={() => navigation.navigate("Reco")}>
          <Icon name="cloud-upload" size={25} color="white" />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={[styles.circle, { transform: [{ rotate: plusButtonRotation }] }]}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}
        activeOpacity={1}>
        <Animated.View>
          <Icon name="plus" size={25} color="white" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "blue",
    width: 60,
    height: 60,
    position: "absolute",
    right: screenWidth * 0.05,
    bottom: screenHeight * 0,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default ExpandingButtons;
