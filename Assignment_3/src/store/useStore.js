// src/store/useStore.js
// Global state management using Zustand
// Stores: auth session, tasks list, filters, loading/error states

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tasksService from '../api/tasksService';
import authService from '../api/authService';

const useStore = create((set, get) => ({
  // ─── Auth State ────────────────────────────────────────────────
  user: null,
  token: null,
  isAuthLoading: true, // true while rehydrating on app start

  signIn: async (credentials) => {
    const { token, user } = await authService.signIn(credentials);
    set({ token, user });
  },

  signUp: async (data) => {
    const { token, user } = await authService.signUp(data);
    set({ token, user });
  },

  signOut: async () => {
    await authService.signOut();
    set({ user: null, token: null, tasks: [] });
  },

  // Rehydrate auth from AsyncStorage on app start
  rehydrateAuth: async () => {
    try {
      const session = await authService.rehydrate();
      if (session) {
        set({ user: session.user, token: session.token });
      }
    } catch (err) {
      console.warn('Rehydrate failed:', err);
    } finally {
      set({ isAuthLoading: false });
    }
  },

  // ─── Tasks State ───────────────────────────────────────────────
  tasks: [],
  tasksLoading: false,
  tasksError: null,

  // Filter persisted in AsyncStorage (rehydrated on start)
  filterStatus: 'all', // 'all' | 'pending' | 'in-progress' | 'completed'

  setFilterStatus: async (status) => {
    set({ filterStatus: status });
    // Persist the user's preferred filter
    await AsyncStorage.setItem('filter_status', status);
  },

  rehydrateFilter: async () => {
    const saved = await AsyncStorage.getItem('filter_status');
    if (saved) set({ filterStatus: saved });
  },

  // Selector: return tasks filtered by current filterStatus
  getFilteredTasks: () => {
    const { tasks, filterStatus } = get();
    if (filterStatus === 'all') return tasks;
    return tasks.filter((t) => t.status === filterStatus);
  },

  // Fetch all tasks from backend
  fetchTasks: async () => {
    set({ tasksLoading: true, tasksError: null });
    try {
      const data = await tasksService.getAll();
      set({ tasks: data, tasksLoading: false });
    } catch (err) {
      set({ tasksError: err.message || 'Failed to load tasks.', tasksLoading: false });
    }
  },

  // Create a new task and prepend to list
  createTask: async (taskData) => {
    const newTask = await tasksService.create({
      ...taskData,
      createdAt: new Date().toISOString(),
    });
    set((state) => ({ tasks: [newTask, ...state.tasks] }));
    return newTask;
  },

  // Update an existing task in the list
  updateTask: async (id, taskData) => {
    const updated = await tasksService.update(id, taskData);
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? updated : t)),
    }));
    return updated;
  },

  // Delete a task and remove from list
  deleteTask: async (id) => {
    await tasksService.delete(id);
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
  },
}));

export default useStore;
