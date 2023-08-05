import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Modal, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const Box = ({ box, isLastBox, handleGoToWorkoutView, onDeleteBox }) => {
  const [longPress, setLongPress] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const onLongPress = () => {
    setLongPress(true);
    setDeleteModalVisible(true);
  };

  const handleDelete = () => {
    if (onDeleteBox) {
      onDeleteBox();
      cancelLongPress();
    }
  };

  const cancelLongPress = () => {
    setLongPress(false);
    setDeleteModalVisible(false);
  };

  const containerStyle = isLastBox
    ? [styles.oddBoxContainer, longPress ? styles.boxLongPress : null]
    : [styles.evenBoxContainer, longPress ? styles.boxLongPress : null];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handleGoToWorkoutView}
      onLongPress={onLongPress}
      delayLongPress={1000}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={cancelLongPress}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you want to delete the workout?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.confirmDeleteButton} onPress={handleDelete}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.noButton} onPress={cancelLongPress}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          width: "80%",
        }}>
        {longPress && (
          <Feather
            name="trash-2"
            size={24}
            color="#151919"
            style={{ position: "absolute", top: 10, right: 0 }}
          />
        )}
        <Text style={longPress ? styles.boxTextLongPress : styles.boxText}>{box}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  evenBoxContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b77ee",
    width: "46%",
    aspectRatio: 1,
    margin: "2%",
    borderRadius: 15,
  },
  oddBoxContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b77ee",
    width: "96%",
    aspectRatio: 2,
    margin: "2%",
    borderRadius: 15,
  },
  boxLongPress: {
    backgroundColor: "#ce2029",
  },
  boxText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFAFA",
  },
  boxTextLongPress: {
    fontSize: 18,
    fontWeight: "700",
    color: "#151919",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    backgroundColor: "#151919",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmDeleteButton: {
    flex: 1,
    margin: 10,
    backgroundColor: "#CE2029",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  noButton: {
    flex: 1,
    margin: 10,
    backgroundColor: "#A9A9A9",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    color: "#FFFAFA",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Box;
