// src/screens/HomeScreen.tsx
// Home screen — shows daily summary and recent workouts

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatBox from '../components/StatBox';
import WorkoutCard from '../components/WorkoutCard';
import { WORKOUTS, Workout } from '../data/workouts';

// Type for navigation prop — keep it simple with 'any' for beginner clarity
type Props = {
  navigation: any;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  // Simple state for today's stats
  const [steps] = useState(7432);
  const [caloriesBurned] = useState(420);
  const [workoutsToday] = useState(1);

  // Animated value for fade-in effect on mount
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Fade in + slide up animation when screen loads
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Show only first 3 workouts as "recent suggestions"
  const recentWorkouts: Workout[] = WORKOUTS.slice(0, 3);

  const handleWorkoutPress = (workout: Workout) => {
    navigation.navigate('Detail', { workout });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Animated header section */}
        <Animated.View
          style={[
            styles.header,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.subGreeting}>Let's crush today's workout</Text>
        </Animated.View>

        {/* Today's stats */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>
          <View style={styles.statsRow}>
            <StatBox label="Steps" value={steps.toLocaleString()} color="#4F8EF7" />
            <StatBox label="Calories" value={caloriesBurned} unit="kcal" color="#FF6B6B" />
            <StatBox label="Workouts" value={workoutsToday} color="#4CAF50" />
          </View>
        </Animated.View>

        {/* Quick action button */}
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => navigation.navigate('Categories')}
          activeOpacity={0.8}
        >
          <Text style={styles.quickButtonText}>+ Start a Workout</Text>
        </TouchableOpacity>

        {/* Suggested workouts */}
        <Text style={styles.sectionTitle}>Suggested for You</Text>
        {recentWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onPress={handleWorkoutPress}
          />
        ))}

        {/* Bottom spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 16,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  subGreeting: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 12,
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: -4,
  },
  quickButton: {
    backgroundColor: '#4F8EF7',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  quickButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
