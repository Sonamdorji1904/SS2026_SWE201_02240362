// src/screens/TaskDetailScreen.js
// Shows full detail of a single task with edit and delete actions

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from '../store/useStore';
import useFetchTask from '../hooks/useFetchTask';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { statusColor, statusLabel, priorityColor, formatDate } from '../utils/helpers';
import { COLORS, SPACING, FONT_SIZE, RADIUS } from '../utils/theme';

const TaskDetailScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const deleteTask = useStore((s) => s.deleteTask);
  const [deleting, setDeleting] = useState(false);

  // Custom hook fetches the task by id
  const { task, loading, error, retry } = useFetchTask(taskId);

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            try {
              await deleteTask(taskId);
              navigation.goBack();
            } catch (err) {
              Alert.alert('Error', err.message || 'Could not delete task.');
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading task...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <ErrorMessage message={error} onRetry={retry} />
      </SafeAreaView>
    );
  }

  if (!task) return null;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Status + priority row */}
        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: statusColor(task.status) + '22' }]}>
            <Text style={[styles.badgeText, { color: statusColor(task.status) }]}>
              {statusLabel(task.status)}
            </Text>
          </View>
          <View style={[styles.badge, { backgroundColor: priorityColor(task.priority) + '22' }]}>
            <Text style={[styles.badgeText, { color: priorityColor(task.priority) }]}>
              {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) + ' Priority' : ''}
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>{task.title}</Text>

        {/* Meta */}
        <View style={styles.meta}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Category</Text>
            <Text style={styles.metaValue}>{task.category || '—'}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Created</Text>
            <Text style={styles.metaValue}>{formatDate(task.createdAt)}</Text>
          </View>
        </View>

        {/* Description */}
        {task.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Description</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.noDescription}>No description provided.</Text>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title="Edit Task"
            onPress={() => navigation.navigate('EditTask', { task })}
            style={{ flex: 1, marginRight: SPACING.sm }}
          />
          <Button
            title={deleting ? '' : 'Delete'}
            onPress={handleDelete}
            loading={deleting}
            variant="danger"
            style={{ flex: 1 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: SPACING.lg },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: SPACING.md },
  loadingText: { color: COLORS.gray400 },
  badges: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.md },
  badge: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.full },
  badgeText: { fontSize: FONT_SIZE.sm, fontWeight: '700' },
  title: { fontSize: FONT_SIZE.xxl, fontWeight: '800', color: COLORS.gray900, marginBottom: SPACING.md, lineHeight: 32 },
  meta: { backgroundColor: COLORS.white, borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.md },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: SPACING.xs },
  metaLabel: { fontSize: FONT_SIZE.md, color: COLORS.gray400 },
  metaValue: { fontSize: FONT_SIZE.md, color: COLORS.gray900, fontWeight: '600' },
  section: { backgroundColor: COLORS.white, borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.lg },
  sectionLabel: { fontSize: FONT_SIZE.sm, fontWeight: '700', color: COLORS.gray400, textTransform: 'uppercase', letterSpacing: 1, marginBottom: SPACING.sm },
  description: { fontSize: FONT_SIZE.lg, color: COLORS.gray900, lineHeight: 26 },
  noDescription: { fontSize: FONT_SIZE.md, color: COLORS.gray400, fontStyle: 'italic' },
  actions: { flexDirection: 'row' },
});

export default TaskDetailScreen;
