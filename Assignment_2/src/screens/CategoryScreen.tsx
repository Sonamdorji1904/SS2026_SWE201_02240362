// src/screens/CategoryScreen.tsx
// Shows all workout categories and lets user filter + select workouts

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WorkoutCard from '../components/WorkoutCard';
import { WORKOUTS, CATEGORIES, Workout } from '../data/workouts';

type Props = {
  navigation: any;
};

const CategoryScreen: React.FC<Props> = ({ navigation }) => {
  // Track which category filter is selected
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter workouts based on selected category
  const filteredWorkouts: Workout[] =
    selectedCategory === 'All'
      ? WORKOUTS
      : WORKOUTS.filter((w) => w.category === selectedCategory);

  const handleWorkoutPress = (workout: Workout) => {
    navigation.navigate('Detail', { workout });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Workouts</Text>

        {/* Category filter buttons — horizontal scroll */}
        <View style={styles.filterRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterButton,
                selectedCategory === cat && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === cat && styles.filterTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Count label */}
        <Text style={styles.countLabel}>
          {filteredWorkouts.length} workout{filteredWorkouts.length !== 1 ? 's' : ''}
        </Text>

        {/* Workout list using FlatList */}
        <FlatList
          data={filteredWorkouts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WorkoutCard workout={item} onPress={handleWorkoutPress} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
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
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a2e',
    marginTop: 16,
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButtonActive: {
    backgroundColor: '#4F8EF7',
    borderColor: '#4F8EF7',
  },
  filterText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  countLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 12,
  },
});

export default CategoryScreen;
