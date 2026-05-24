// src/screens/CreateTaskScreen.js
// Form to create a new task

import React from 'react';
import {
  View, ScrollView, StyleSheet, Alert, KeyboardAvoidingView, Platform, Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from '../store/useStore';
import useForm from '../hooks/useForm';
import Input from '../components/Input';
import Button from '../components/Button';
import SelectPicker from '../components/SelectPicker';
import { validateTask } from '../utils/helpers';
import { COLORS, SPACING, FONT_SIZE } from '../utils/theme';

const STATUS_OPTIONS = [
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
];

const PRIORITY_OPTIONS = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

const CATEGORY_OPTIONS = [
  { label: 'Work', value: 'Work' },
  { label: 'Personal', value: 'Personal' },
  { label: 'Study', value: 'Study' },
  { label: 'Health', value: 'Health' },
  { label: 'Other', value: 'Other' },
];

const CreateTaskScreen = ({ navigation }) => {
  const createTask = useStore((s) => s.createTask);

  const form = useForm(
    {
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      category: 'Work',
    },
    validateTask
  );

  const handleCreate = async () => {
    await form.handleSubmit(async (values) => {
      try {
        await createTask(values);
        Alert.alert('Success ✅', 'Task created successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } catch (err) {
        Alert.alert('Error', err.message || 'Failed to create task. Please try again.');
      }
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>New Task</Text>

          <Input
            label="Title *"
            value={form.values.title}
            onChangeText={(v) => form.handleChange('title', v)}
            error={form.errors.title}
            placeholder="What needs to be done?"
            autoCapitalize="sentences"
          />

          <Input
            label="Description"
            value={form.values.description}
            onChangeText={(v) => form.handleChange('description', v)}
            error={form.errors.description}
            placeholder="Add details (optional)"
            multiline
            numberOfLines={4}
            autoCapitalize="sentences"
          />

          <SelectPicker
            label="Status"
            options={STATUS_OPTIONS}
            value={form.values.status}
            onChange={(v) => form.handleChange('status', v)}
          />

          <SelectPicker
            label="Priority"
            options={PRIORITY_OPTIONS}
            value={form.values.priority}
            onChange={(v) => form.handleChange('priority', v)}
          />

          <SelectPicker
            label="Category"
            options={CATEGORY_OPTIONS}
            value={form.values.category}
            onChange={(v) => form.handleChange('category', v)}
          />

          <View style={styles.actions}>
            <Button
              title="Cancel"
              onPress={() => navigation.goBack()}
              variant="outline"
              style={{ flex: 1, marginRight: SPACING.sm }}
            />
            <Button
              title="Create Task"
              onPress={handleCreate}
              loading={form.submitting}
              style={{ flex: 1 }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: SPACING.lg },
  heading: { fontSize: FONT_SIZE.xxl, fontWeight: '800', color: COLORS.gray900, marginBottom: SPACING.lg },
  actions: { flexDirection: 'row', marginTop: SPACING.md },
});

export default CreateTaskScreen;
