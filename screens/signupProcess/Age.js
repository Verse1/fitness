import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import SmoothPicker from "react-native-smooth-picker";
import * as Haptics from "expo-haptics";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const ageOptions = Array.from({ length: 33 }, (_, i) => i + 12);

const opacities = {
  0: 1,
  1: 1,
  2: 0.6,
  3: 0.3,
  4: 0.1,
};

const Item = React.memo(({ opacity, selected, name }) => {
  const textStyle = selected ? styles.selectedText : styles.normalText;
  const itemStyle = selected ? styles.selectedItemContainer : styles.itemContainer;

  return (
    <View style={[itemStyle, { opacity }]}>
      {!selected && <Text style={textStyle}>{name}</Text>}
    </View>
  );
});

const ItemToRender = ({ item, index }, indexSelected) => {
  const selected = index === indexSelected;
  const gap = Math.abs(index - indexSelected);

  let opacity = 1 - gap * 0.2;
  if (opacity < 0.1) {
    opacity = 0.1;
  }

  return <Item opacity={opacity} selected={selected} name={item} />;
};

const AgeSelection = () => {
  const navigation = useNavigation();
  const [selectedAge, setSelectedAge] = useState(22);
  const [selected, setSelected] = useState(4);
  const ageOptions = Array.from({ length: 82 }, (_, i) => i + 18);

  const scrollX = useRef(new Animated.Value(0)).current;

  const route = useRoute();
  const { userInfo, userGender } = route.params;

  const handleChange = (index) => {
    setSelected(index);
  };

  useEffect(() => {
    setSelected(4);
  }, []);

  const handleAgeSelection = (age) => {
    setSelectedAge(age);
  };

  const handleContinue = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("WeightSelection", {
      userInfo: userInfo,
      userGender: userGender,
      userAge: selectedAge,
    });
    console.log("Age", userInfo, userGender, selectedAge, "\n");
  };

  const progressAnim = useRef(new Animated.Value((1 / 8) * 100)).current;

  const progressStyle = {
    height: "100%",
    width: progressAnim.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
    }),
    borderRadius: 5,
    backgroundColor: "#116CE4",
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    Animated.timing(progressAnim, {
      toValue: (3 / 8) * 100,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.elastic(1),
    }).start();
  }, []);

  const handleSelected = (index) => {
    setSelectedAge(ageOptions[index]);
  };

  const renderOption = (option, index, isSelected) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={isSelected ? styles.itemTextSelected : styles.itemText}>
          {option.label}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.shadow}>
          <LinearGradient
            colors={["#151919", "#1D2528"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}>
            <View style={styles.progressContainer}>
              <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                <Feather name="chevron-left" size={24} color="white" />
              </Pressable>
              <View style={styles.progressBar}>
                <Animated.View style={progressStyle} />
              </View>
              <Text style={styles.progressText}>3 of 8</Text>
            </View>
            <View style={styles.Titles}>
              <Text autoCorrect={false} style={styles.title}>
                How old are you?
              </Text>
            </View>
          </LinearGradient>
        </View>
      </View>
      <View style={styles.fullScreen}>
        <View style={styles.content}>
          <View style={styles.scrollContainer}>
            <SmoothPicker
              initialScrollToIndex={selected}
              onScrollToIndexFailed={() => {}}
              keyExtractor={(_, index) => index.toString()}
              onSelected={({ index }) => handleChange(index)}
              data={ageOptions}
              horizontal
              scrollAnimation
              showsHorizontalScrollIndicator={false}
              renderItem={(option) => ItemToRender(option, selected)}
              magnet
              offsetSelection={0}
            />
          </View>
          <LinearGradient
            colors={["#151919", "#253237"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientContainer}></LinearGradient>
          <View style={styles.circle}>
            <Text style={styles.selectedText}>{ageOptions[selected]}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.buttonView}>
            <Pressable style={styles.continue} onPress={handleContinue}>
              <Text style={styles.text}>Continue</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0E0E",
  },
  headerContainer: {
    paddingBottom: 10,
    overflow: "visible",
    position: "absolute",
    zIndex: 2,
    width: "100%",
  },
  shadow: {
    backgroundColor: "transparent",
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  header: {
    justifyContent: "flex-start",
    borderBottomRightRadius: 117,
    height: screenHeight * 0.28,
  },
  progressContainer: {
    top: screenHeight * 0.07,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingLeft: 5,
    paddingRight: 10,
  },
  progressBar: {
    backgroundColor: "#FFFAFA",
    height: 10,
    width: screenWidth - 140,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 5,
  },
  progressText: {
    marginRight: 10,
    color: "#FFFAFA",
    fontWeight: "500",
  },
  Titles: {
    top: screenHeight * 0.1,
    width: "70%",
    paddingLeft: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 40,
    textAlign: "left",
    color: "#D7F2F4",
  },
  fullScreen: {
    flex: 1,
    marginTop: screenHeight * 0.28,
    backgroundColor: "#0F0E0E",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  gradientContainer: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.05,
    borderRadius: 45,
    position: "absolute",
    zIndex: -1,
  },
  itemContainer: {
    marginTop: screenHeight * 0.158,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderWidth: 0,
  },
  selectedItemContainer: {
    marginTop: screenHeight * 0.146,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 0,
  },
  normalText: {
    color: "#FFFAFA",
    fontWeight: "500",
    fontSize: 20,
  },
  selectedText: {
    color: "#151919",
    fontWeight: "700",
    fontSize: 32,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 100,
    borderColor: "#151919",
    borderWidth: 5,
    position: "absolute",
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D7F2F4",
    zIndex: 0,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonView: {
    alignItems: "center",
    marginBottom: 40,
  },
  continue: {
    backgroundColor: "#D7F2F4",
    width: "80%",
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.7,
    marginVertical: 5,
    position: "absolute",
    bottom: 10,
  },
  text: {
    color: "#151919",
    textAlign: "center",
    fontWeight: "700",
  },
});

export default AgeSelection;
