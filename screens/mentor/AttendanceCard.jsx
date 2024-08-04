import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AttendanceCard = ({ eventName, reccuring }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{eventName}</Text>
        <Text style={styles.cardRecurring}>{reccuring}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    shadowOpacity: 1,
    backgroundColor:"#fe00ff30",
// elevation:50,
  },
  cardContent: {
    flexDirection: 'column',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color:"#070606"
  },
  cardRecurring: {
    fontSize: 14,
    color: '#666',
  },
});

export default AttendanceCard;
