// src/components/StatBox.tsx
// Simple stat display box used on Home and Profile screens

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
};

const StatBox: React.FC<Props> = ({ label, value, unit = '', color = '#4F8EF7' }) => {
  return (
    <View style={[styles.box, { borderTopColor: color }]}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    borderTopWidth: 3,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
  },
  unit: {
    fontSize: 11,
    color: '#888',
    marginTop: 1,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default StatBox;
