import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

function LogButton({ onPress, icon = "plus", color = "#5067FF" }) {
  return (
    <View style={styles.floatingButtonContainer}>
      <TouchableOpacity
        style={[styles.floatingButton, { backgroundColor: color }]}
        onPress={onPress}>
        <Feather name={icon} size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: "absolute",
    right: 5,
    bottom: 0,
  },
  floatingButton: {
    borderRadius: 30,
    width: 60,
    height: 60,
    padding: 15,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 20,
  },
});

export default LogButton;
