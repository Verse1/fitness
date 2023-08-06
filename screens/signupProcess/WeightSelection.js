import React, { useLayoutEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
  Easing,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import SmoothPicker from "react-native-smooth-picker";
import * as Haptics from "expo-haptics";
// import { getWeightOptions } from "../../utils/weightOptions";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const data = Array.from({ length: 200 }, (v, k) => k + 1).map(String);
//  const weightOptions = getWeightOptions();

const ItemToRender = ({ item, index, indexSelected }) => {
  const isSelected = indexSelected === index;
  const style = isSelected ? styles.selectedText : styles.normalText;

  return (
    <View style={styles.OptionWrapper}>
      <Text style={style}>{item}</Text>
    </View>
  );
};

const WeightSelection = () => {
  const navigation = useNavigation();
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selected, setSelected] = useState(0);

  const route = useRoute();
  const { userInfo, userGender, userAge } = route.params;

  const handleWeightSelection = (weight) => {
    setSelectedWeight(weight);
  };

  const handleContinue = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("HeightSelection", {
      userInfo: userInfo,
      userGender: userGender,
      userAge: userAge,
      userWeight: selectedWeight,
    });
  };

  const progressAnim = useRef(new Animated.Value((2 / 8) * 100)).current;

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
      toValue: (4 / 8) * 100,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.elastic(1),
    }).start();
  }, []);

  const renderItem = React.useCallback(
    ({ item, index }, indexSelected) => (
      <ItemToRender item={item} index={index} indexSelected={indexSelected} />
    ),
    []
  );

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
              <Text style={styles.progressText}>4 of 8</Text>
            </View>
            <View style={styles.Titles}>
              <Text autoCorrect={false} style={styles.title}>
                How much do you weigh?
              </Text>
            </View>
          </LinearGradient>
        </View>
      </View>
      <View style={styles.fullScreen}>
        <View style={styles.smoothPickerContainer}>
          <SmoothPicker
            initialScrollToIndex={selected}
            data={data}
            scrollAnimation
            horizontal
            showsHorizontalScrollIndicator={false}
            onSelected={({ item, index }) => {
              setSelected(index);
              handleWeightSelection(data[index]);
            }}
            magnet
            renderItem={({ item, index }) => (
              <ItemToRender item={item} index={index} indexSelected={selected} />
            )}
            selectedItem={selected}
            offsetSelection={2}
          />
        </View>
        <View style={styles.content}>
          <Image
            source={require("../../assets/weightPicker.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.kgText}>kg</Text>
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
  OptionWrapper: {
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  selectedText: {
    fontSize: 42,
    fontWeight: "700",
    color: "#1B77EE",
    marginHorizontal: 10,
  },
  normalText: {
    fontSize: 36,
    fontWeight: "400",
    color: "#FFFAFA",
    marginHorizontal: 10,
  },
  smoothPickerContainer: {
    top: screenHeight * 0.14,
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: screenWidth * 0.98,
    height: screenHeight * 0.2,
  },
  kgText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#1B77EE",
    textAlign: "center",
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

export default WeightSelection;
