import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdateProfile = () => {
    // Logic to update profile settings, such as sending a request to an API
    console.log("Profile updated:", { name, email });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather name="chevron-left" size={24} color="#FFFAFA" onPress={handleGoBack} />
        <Text style={styles.label}>Profile</Text>
        <View style={{ width: 30 }} />
      </View>
      <View>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} onChangeText={setName} value={name} />
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} onChangeText={setEmail} value={email} />

        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
      <View />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#0F0E0E",
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "700",
    color: "#FFFAFA",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#1b77ee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: "#FFFAFA",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Profile;
