import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { active } from "d3";

const Navbar = ({ activePage }) => {
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
          <Feather
            name="activity"
            size={24}
            color={activePage === "Nutrition" ? "#1b77ee" : "#D7F2F4"}
          />
          <Text style={[styles.label, activePage === "Nutrition" && styles.activeLabel]}>
            Nutrition
          </Text>
        </TouchableOpacity>

        {/* Home button */}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigateToPage("Dashboard")}>
          <Feather
            name="home"
            size={24}
            color={activePage === "Dashboard" ? "#1b77ee" : "#D7F2F4"}
          />
          <Text style={[styles.label, activePage === "Dashboard" && styles.activeLabel]}>
            Home
          </Text>
        </TouchableOpacity>

        {/* Weight button */}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigateToPage("Weight")}>
          <Feather
            name="bar-chart-2"
            size={24}
            color={activePage === "Weight" ? "#1b77ee" : "#D7F2F4"}
          />
          <Text style={[styles.label, activePage === "Weight" && styles.activeLabel]}>
            Weight
          </Text>
        </TouchableOpacity>

        {/* Workout button */}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigateToPage("Workout")}>
          <Feather
            name="award"
            size={24}
            color={activePage === "Workout" ? "#1b77ee" : "#D7F2F4"}
          />
          <Text style={[styles.label, activePage === "Workout" && styles.activeLabel]}>
            Workout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151919",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    color: "#D7F2F4",
    fontSize: 12,
  },
  activeLabel: {
    color: "#1b77ee",
  },
});

export default Navbar;
