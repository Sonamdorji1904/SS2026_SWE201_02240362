// src/components/WorkoutCard.tsx
// Reusable card component used on Category and Home screens

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Workout } from '../data/workouts';

type Props = {
  workout: Workout;
  onPress: (workout: Workout) => void;
};

// Simple reusable card — accepts a workout and a press handler
const WorkoutCard: React.FC<Props> = ({ workout, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(workout)}
      activeOpacity={0.75}
    >
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.name}>{workout.name}</Text>
          <Text style={styles.category}>{workout.category}</Text>
        </View>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{workout.duration}</Text>
          <Text style={styles.statLabel}>min</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{workout.calories}</Text>
          <Text style={styles.statLabel}>kcal</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    // Simple shadow for iOS and Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    marginBottom: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  category: {
    fontSize: 13,
    color: '#4F8EF7',
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default WorkoutCard;
