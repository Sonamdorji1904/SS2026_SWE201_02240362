import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

// Weekly timetable data
const SCHEDULE: Record<string, { time: string; subject: string; room: string; color: string }[]> = {
  Mon: [
    { time: '08:00–09:50', subject: 'CTE205', room: 'IT06', color: '#ffffff' },
    { time: '10:00–11:50', subject: 'SWE201', room: 'CR07', color: '#ffffff' },
    { time: '13:00–14:50', subject: 'SDA202', room: 'IT06', color: '#ffffff' },
  ],
  Tue: [
    { time: '08:00–09:50', subject: 'DIS303', room: 'IT05', color: '#ffffff' },
    { time: '10:00–11:50', subject: 'NWC201', room: 'CR06', color: '#ffffff' },
  ],
  Wed: [
    { time: '08:00–09:50', subject: 'DAM101', room: 'CR17', color: '#ffffff' },
    { time: '13:00–14:50', subject: 'SWS101', room: 'IT07', color: '#ffffff' },
    { time: '15:00–16:50', subject: 'MAT205', room: 'CR12', color: '#ffffff' },
  ],
  Thu: [
    { time: '08:00–09:50', subject: 'DSO101', room: 'IT06', color: '#ffffff' },
    { time: '10:00–11:50', subject: 'DBS101', room: 'IT08', color: '#ffffff' },
  ],
  Fri: [
    { time: '08:00–09:50', subject: 'DAM303', room: 'CR08', color: '#ffffff' },
    { time: '10:00–11:50', subject: 'MAT', room: 'CR13', color: '#ffffff' },
  ],
};

export default function ScheduleScreen() {
  const today = DAYS[new Date().getDay() - 1] ?? 'Mon';
  const [activeDay, setActiveDay] = useState(today);

  const classes = SCHEDULE[activeDay] ?? [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Schedule</Text>

      {/* Day selector */}
      <View style={styles.dayRow}>
        {DAYS.map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dayBtn, activeDay === day && styles.dayBtnActive]}
            onPress={() => setActiveDay(day)}
          >
            <Text style={[styles.dayText, activeDay === day && styles.dayTextActive]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {classes.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>🎉 No classes today!</Text>
          </View>
        ) : (
          classes.map((cls, index) => (
            <View key={index} style={styles.classCard}>
              <View style={[styles.colorBar, { backgroundColor: cls.color }]} />
              <View style={styles.classInfo}>
                <Text style={styles.classTime}>{cls.time}</Text>
                <Text style={styles.classSubject}>{cls.subject}</Text>
                <View style={styles.classRoomRow}>
                  <Ionicons name="location-outline" size={14} color="#8E8E93" />
                  <Text style={styles.classRoom}>{cls.room}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1C1C1E',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
  },
  dayRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 20,
  },
  dayBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  dayBtnActive: {
    backgroundColor: '#0A84FF',
  },
  dayText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
  },
  dayTextActive: {
    color: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 110,
    gap: 12,
  },
  classCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  colorBar: {
    width: 5,
  },
  classInfo: {
    flex: 1,
    padding: 14,
  },
  classTime: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
    marginBottom: 4,
  },
  classSubject: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  classRoom: {
    fontSize: 13,
    color: '#8E8E93',
    marginLeft: 4,
  },
  classRoomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#8E8E93',
    fontWeight: '600',
  },
});
