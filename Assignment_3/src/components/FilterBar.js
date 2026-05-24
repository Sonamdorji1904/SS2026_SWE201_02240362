// src/components/FilterBar.js
// Horizontal scrollable filter pills for task status

import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, RADIUS } from '../utils/theme';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
];

const FilterBar = ({ active, onSelect }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {FILTERS.map((f) => {
          const isActive = active === f.value;
          return (
            <TouchableOpacity
              key={f.value}
              style={[styles.pill, isActive && styles.pillActive]}
              onPress={() => onSelect(f.value)}
            >
              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>{f.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.md,
  },
  row: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  pill: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.gray100,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  pillActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  pillText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray600,
    fontWeight: '500',
  },
  pillTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});

export default FilterBar;
