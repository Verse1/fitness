import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton, FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";

const Navbar = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Nutrition button */}
        <IconButton
          style={styles.image}
          icon={(props) => (
            <Icon style={[styles.icon, { fontSize: 30 }]} name="scale" {...props} />
          )}
          onPress={() => navigation.navigate("Nutrition")}
        />

        {/* Home button */}
        <IconButton
          style={styles.image}
          icon={(props) => (
            <Icon style={[styles.icon, { fontSize: 30 }]} name="home" {...props} />
          )}
          onPress={() => navigation.navigate("Dashboard")}
        />

        {/* Weight button */}
        <IconButton
          style={styles.image}
          icon={(props) => (
            <Icon style={[styles.icon, { fontSize: 30 }]} name="weight" {...props} />
          )}
          onPress={() => navigation.navigate("Weight")}
        />

        {/* Workout button */}
        <IconButton
          style={styles.image}
          icon={(props) => (
            <Icon
              style={[styles.icon, { fontSize: 30 }]}
              name="weight-lifter"
              {...props}
            />
          )}
          onPress={() => navigation.navigate("Workout")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "rgb(119,167,196)", //119 167 196
    height: 100,
    borderTopLeftRadius: "25%",
    borderTopRightRadius: "25%",
  },
  icon: {
    color: "white",
  },
  image: {
    marginHorizontal: 20,
  },
  imageContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Navbar;
