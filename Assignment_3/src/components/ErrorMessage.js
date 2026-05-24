// src/components/ErrorMessage.js
// Displays a user-friendly error with optional retry button

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, RADIUS } from '../utils/theme';
import Button from './Button';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Button title="Retry" onPress={onRetry} variant="outline" style={styles.button} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF2F2',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
  },
  icon: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  message: {
    fontSize: FONT_SIZE.md,
    color: COLORS.danger,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.sm,
  },
  button: {
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.xl,
  },
});

export default ErrorMessage;
