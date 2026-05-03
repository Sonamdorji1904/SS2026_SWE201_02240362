// src/screens/DetailScreen.tsx
// Shows full details of a selected workout
// Includes: scale animation on load + long press gesture on the Start button

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Workout } from '../data/workouts';

type Props = {
  route: {
    params: {
      workout: Workout;
    };
  };
  navigation: any;
};

const DetailScreen: React.FC<Props> = ({ route, navigation }) => {
  // Get the workout passed from the previous screen
  const { workout } = route.params;

  // Track if workout is marked as done
  const [isDone, setIsDone] = useState(false);

  // Scale animation — bounces in when screen loads
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the card in on mount
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Long press on the Start button — gesture interaction
  const handleLongPress = () => {
    Alert.alert(
      'Quick Start',
      'Long press detected! Starting workout immediately.',
      [{ text: 'Let\'s Go!', onPress: () => setIsDone(true) }]
    );
  };

  // Regular press — mark as complete
  const handleStart = () => {
    setIsDone(true);
    Alert.alert(
      'Workout Logged',
      `Great job completing ${workout.name}! You burned ~${workout.calories} calories.`,
      [{ text: 'Awesome!', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Animated hero section with scale effect */}
        <Animated.View
          style={[
            styles.heroCard,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.workoutName}>{workout.name}</Text>
          <Text style={styles.category}>{workout.category}</Text>

          {/* Quick stats */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{workout.duration}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{workout.calories}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.content}>
          {/* Description */}
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{workout.description}</Text>

          {/* Steps */}
          <Text style={styles.sectionTitle}>Steps</Text>
          {workout.steps.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}

          {/* Gesture hint */}
          <Text style={styles.hint}>
            Tip: Long press the button below to quick-start!
          </Text>

          {/* Start / Done button — supports both press and long press (gesture) */}
          <TouchableOpacity
            style={[styles.startButton, isDone && styles.doneButton]}
            onPress={handleStart}
            onLongPress={handleLongPress}  // Gesture: long press
            delayLongPress={600}
            activeOpacity={0.8}
            disabled={isDone}
          >
            <Text style={styles.startButtonText}>
              {isDone ? 'Workout Done!' : 'Start Workout'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  heroCard: {
    backgroundColor: '#4F8EF7',
    margin: 16,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
  },
  workoutName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
    paddingTop: 16,
    width: '100%',
    justifyContent: 'center',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4F8EF7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 1,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  hint: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  startButton: {
    backgroundColor: '#4F8EF7',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  doneButton: {
    backgroundColor: '#4CAF50',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default DetailScreen;
