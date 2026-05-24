// src/api/authService.js
// Authentication — using a simple mock/dummy token approach

import AsyncStorage from '@react-native-async-storage/async-storage';

// Dummy users stored locally (simulates a real auth backend)
const MOCK_USERS = [
  { id: '1', email: 'sonam@gmail.com', password: '123456', name: 'Sonam Dorji' },
  { id: '2', email: 'test@example.com', password: 'test123', name: 'Test User' },
];

const authService = {
  // Sign in — validate credentials and return a fake JWT-like token
  signIn: async ({ email, password }) => {
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 800));

    const user = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      throw { type: 'client', message: 'Invalid email or password.' };
    }

    const token = `mock-token-${user.id}-${Date.now()}`;
    const userData = { id: user.id, email: user.email, name: user.name };

    // Persist token and user info
    await AsyncStorage.setItem('auth_token', token);
    await AsyncStorage.setItem('auth_user', JSON.stringify(userData));

    return { token, user: userData };
  },

  // Sign up — add a new user and return token
  signUp: async ({ name, email, password }) => {
    await new Promise((res) => setTimeout(res, 800));

    const exists = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      throw { type: 'client', message: 'An account with this email already exists.' };
    }

    const newUser = { id: String(Date.now()), email, password, name };
    MOCK_USERS.push(newUser);

    const token = `mock-token-${newUser.id}-${Date.now()}`;
    const userData = { id: newUser.id, email: newUser.email, name: newUser.name };

    await AsyncStorage.setItem('auth_token', token);
    await AsyncStorage.setItem('auth_user', JSON.stringify(userData));

    return { token, user: userData };
  },

  // Sign out — clear stored credentials
  signOut: async () => {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('auth_user');
  },

  // Rehydrate session from AsyncStorage on app start
  rehydrate: async () => {
    const token = await AsyncStorage.getItem('auth_token');
    const userRaw = await AsyncStorage.getItem('auth_user');
    if (token && userRaw) {
      return { token, user: JSON.parse(userRaw) };
    }
    return null;
  },
};

export default authService;
