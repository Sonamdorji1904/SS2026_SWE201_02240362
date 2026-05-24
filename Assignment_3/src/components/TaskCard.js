// src/components/TaskCard.js
// Card displayed in the task list

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, RADIUS } from '../utils/theme';
import { statusColor, statusLabel, priorityColor, formatDate } from '../utils/helpers';

const TaskCard = ({ task, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      {/* Priority stripe on left edge */}
      <View style={[styles.stripe, { backgroundColor: priorityColor(task.priority) }]} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>{task.title}</Text>
          {/* Status badge */}
          <View style={[styles.badge, { backgroundColor: statusColor(task.status) + '22' }]}>
            <Text style={[styles.badgeText, { color: statusColor(task.status) }]}>
              {statusLabel(task.status)}
            </Text>
          </View>
        </View>

        {task.description ? (
          <Text style={styles.description} numberOfLines={2}>{task.description}</Text>
        ) : null}

        <View style={styles.footer}>
          <Text style={styles.category}>{task.category || 'No category'}</Text>
          <Text style={styles.date}>{formatDate(task.createdAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    overflow: 'hidden',
  },
  stripe: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.gray900,
    marginRight: SPACING.sm,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  badgeText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
  description: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray400,
    marginBottom: SPACING.sm,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  date: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray400,
  },
});

export default TaskCard;
