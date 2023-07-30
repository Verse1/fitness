import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarContainer({ handleGoToCalendar, selectedDay }) {
  const today = new Date();
  const currentDay = today.getDay();
  const prevDays = [
    days[(currentDay - 3 + 7) % 7],
    days[(currentDay - 2 + 7) % 7],
    days[(currentDay - 1 + 7) % 7],
  ];
  const nextDays = Array.from({ length: 7 }, (_, i) => {
    const dayDate = new Date();
    dayDate.setDate(today.getDate() + i - 3);
    return {
      day: days[dayDate.getDay()],
      date: dayDate.getDate(),
    };
  });

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.calendar}>
        {nextDays.map((dayObj, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.day,
              index === 3 && styles.today,
              dayObj.day === selectedDay && styles.selectedDay,
            ]}
            onPress={() => handleGoToCalendar(dayObj.day)}>
            <Text style={index === 3 ? styles.todayDateText : styles.dateText}>
              {dayObj.date}
            </Text>
            <Text style={styles.dayText}>{dayObj.day}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    paddingVertical: 10,
    marginTop: 15,
    alignItems: "center",
  },
  calendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  today: {
    backgroundColor: "#FFFAFA",
  },
  selectedDay: {
    backgroundColor: "#D7F2F4",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFAFA",
  },
  todayDateText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f0e0e",
  },
  dayText: {
    color: "#BFC1C2",
    fontSize: 14,
    fontWeight: "500",
  },
  day: {
    width: screenWidth * 0.12,
    height: screenHeight * 0.07,
    borderWidth: 1,
    borderColor: "#FFFAFA",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    margin: 4,
  },
});

export default CalendarContainer;
