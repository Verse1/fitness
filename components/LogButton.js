import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

function LogButton({ onPress }) {
  return (
    <View style={styles.floatingButtonContainer}>
      <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
        <Feather name={"plus"} size={30} color="#151919" />
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
    backgroundColor: "#1b77ee",
  },
});

export default LogButton;
