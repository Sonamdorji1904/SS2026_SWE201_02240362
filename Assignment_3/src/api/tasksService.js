// src/api/tasksService.js
// All CRUD operations for tasks — uses local in-memory mock data
// so the app works without any external backend.

let mockTasks = [
  {
    id: '1',
    title: 'Complete SWE201 Assignment 3',
    description: 'Build a full CRUD React Native app with Zustand and REST API.',
    status: 'in-progress',
    priority: 'high',
    category: 'Study',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, vegetables.',
    status: 'pending',
    priority: 'medium',
    category: 'Personal',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Morning run',
    description: '5km run at the park.',
    status: 'completed',
    priority: 'low',
    category: 'Health',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Team standup meeting',
    description: 'Daily sync with the dev team at 9am.',
    status: 'completed',
    priority: 'medium',
    category: 'Work',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

// Simulate network delay so loading indicators are visible
const delay = (ms = 500) => new Promise((res) => setTimeout(res, ms));

const tasksService = {
  // GET all tasks
  getAll: async () => {
    await delay();
    return [...mockTasks];
  },

  // GET single task by id
  getById: async (id) => {
    await delay();
    const task = mockTasks.find((t) => t.id === id);
    if (!task) throw { type: 'not_found', message: 'Task not found.' };
    return { ...task };
  },

  // POST — create new task
  create: async (taskData) => {
    await delay();
    const newTask = {
      ...taskData,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    };
    mockTasks = [newTask, ...mockTasks];
    return { ...newTask };
  },

  // PUT — update existing task
  update: async (id, taskData) => {
    await delay();
    const index = mockTasks.findIndex((t) => t.id === id);
    if (index === -1) throw { type: 'not_found', message: 'Task not found.' };
    mockTasks[index] = { ...mockTasks[index], ...taskData };
    return { ...mockTasks[index] };
  },

  // DELETE — remove task
  delete: async (id) => {
    await delay();
    const index = mockTasks.findIndex((t) => t.id === id);
    if (index === -1) throw { type: 'not_found', message: 'Task not found.' };
    mockTasks = mockTasks.filter((t) => t.id !== id);
    return { success: true };
  },
};

export default tasksService;