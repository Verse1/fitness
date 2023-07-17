import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
  const navigation = useNavigation();

  const navigateToPage = (page) => {
    navigation.navigate(page);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {/* Nutrition button */}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigateToPage("Nutrition")}>
          <Feather name="activity" size={24} color="#FFF" />
          <Text style={styles.label}>Nutrition</Text>
        </TouchableOpacity>

        {/* Home button */}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigateToPage("Dashboard")}>
          <Feather name="home" size={24} color="#FFF" />
          <Text style={styles.label}>Home</Text>
        </TouchableOpacity>

        {/* Weight button */}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigateToPage("Weight")}>
          <Feather name="bar-chart-2" size={24} color="#FFF" />
          <Text style={styles.label}>Weight</Text>
        </TouchableOpacity>

        {/* Workout button */}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigateToPage("Workout")}>
          <Feather name="award" size={24} color="#FFF" />
          <Text style={styles.label}>Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00A3FF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 20,
  },
  iconContainer: {
    alignItems: "center",
  },
  label: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 12,
  },
});

export default Navbar;
