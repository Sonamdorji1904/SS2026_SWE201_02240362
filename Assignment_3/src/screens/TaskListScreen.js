// src/screens/TaskListScreen.js
// Main screen: shows all tasks, search bar, filter bar, FAB to create

import React, { useEffect, useState, useCallback } from 'react';
import {
  View, FlatList, StyleSheet, Text, TextInput,
  TouchableOpacity, ActivityIndicator, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from '../store/useStore';
import TaskCard from '../components/TaskCard';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import { COLORS, SPACING, FONT_SIZE, RADIUS } from '../utils/theme';

const TaskListScreen = ({ navigation }) => {
  const fetchTasks = useStore((s) => s.fetchTasks);
  const tasksLoading = useStore((s) => s.tasksLoading);
  const tasksError = useStore((s) => s.tasksError);
  const filterStatus = useStore((s) => s.filterStatus);
  const setFilterStatus = useStore((s) => s.setFilterStatus);
  const getFilteredTasks = useStore((s) => s.getFilteredTasks);
  const user = useStore((s) => s.user);

  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Pull-to-refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  }, [fetchTasks]);

  // Apply search filter on top of status filter
  const displayedTasks = getFilteredTasks().filter((t) =>
    !search || t.title?.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TaskCard task={item} onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })} />
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0]} 🐳</Text>
          <Text style={styles.subtitle}>
            {getFilteredTasks().length} task{getFilteredTasks().length !== 1 ? 's' : ''} total
          </Text>
        </View>
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileInitial}>{user?.name?.[0]?.toUpperCase() || 'U'}</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍  Search tasks..."
          placeholderTextColor={COLORS.gray400}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Status Filters */}
      <FilterBar active={filterStatus} onSelect={setFilterStatus} />

      {/* Task List */}
      {tasksLoading && !refreshing ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading tasks...</Text>
        </View>
      ) : tasksError ? (
        <ErrorMessage message={tasksError} onRetry={fetchTasks} />
      ) : (
        <FlatList
          data={displayedTasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.list,
            displayedTasks.length === 0 && { flex: 1 },
          ]}
          ListEmptyComponent={
            <EmptyState
              emoji="📋"
              title="No tasks found"
              subtitle={
                search
                  ? `No results for "${search}"`
                  : 'Tap the + button to add your first task'
              }
            />
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateTask')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  greeting: { fontSize: FONT_SIZE.xl, fontWeight: '700', color: COLORS.gray900 },
  subtitle: { fontSize: FONT_SIZE.sm, color: COLORS.gray400, marginTop: 2 },
  profileBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  profileInitial: { color: COLORS.white, fontWeight: '700', fontSize: FONT_SIZE.lg },
  searchRow: { paddingHorizontal: SPACING.md, marginBottom: SPACING.md },
  searchInput: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray900,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
  },
  list: { paddingHorizontal: SPACING.md, paddingBottom: 100 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: SPACING.md },
  loadingText: { color: COLORS.gray400, fontSize: FONT_SIZE.md },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: SPACING.lg,
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  fabIcon: { color: COLORS.white, fontSize: 30, fontWeight: '300', marginTop: -2 },
});

export default TaskListScreen;
