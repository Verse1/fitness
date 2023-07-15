import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const days = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];

function CalendarContainer({ handleGoToCalendar, selectedDay }) {
  const today = new Date();
  const currentDay = today.getDay();
  const prevTwoDays = [days[(currentDay - 2 + 7) % 7], days[(currentDay - 1 + 7) % 7]];
  const nextDays = [
    ...prevTwoDays,
    days[(currentDay + 7) % 7],
    days[(currentDay + 1) % 7],
    days[(currentDay + 2) % 7],
    days[(currentDay + 3) % 7],
    days[(currentDay + 4) % 7],
  ];

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.calendar}>
        {nextDays.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.day,
              index === 2 && styles.today,
              day === selectedDay && styles.selectedDay,
            ]}
            onPress={() => handleGoToCalendar(day)}>
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    paddingVertical: 10,
    marginTop: 30,
    alignItems: "center",
  },
  calendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  today: {
    backgroundColor: "#5067FF",
  },
  selectedDay: {
    backgroundColor: "red",
  },
  dayText: {
    fontSize: screenWidth / 20,
    fontWeight: "bold",
  },
  day: {
    width: screenWidth / 9,
    height: screenWidth / 9,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    margin: 5,
  },
});

export default CalendarContainer;
