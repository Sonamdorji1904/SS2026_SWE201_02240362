// src/api/client.js
// Centralized axios instance with interceptors for auth and error handling

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, TIMEOUT_MS } from './config';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: inject auth token if available
client.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      // If AsyncStorage fails, proceed without token
      console.warn('Could not read auth token:', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: normalize errors into readable messages
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error or timeout
      return Promise.reject({
        type: 'network',
        message: 'Network error. Please check your internet connection.',
      });
    }

    const { status } = error.response;

    if (status === 401) {
      return Promise.reject({ type: 'auth', message: 'Unauthorized. Please log in again.' });
    } else if (status === 404) {
      return Promise.reject({ type: 'not_found', message: 'Resource not found.' });
    } else if (status >= 400 && status < 500) {
      return Promise.reject({
        type: 'client',
        message: error.response.data?.message || 'Invalid request.',
      });
    } else if (status >= 500) {
      return Promise.reject({
        type: 'server',
        message: 'Server error. Please try again later.',
      });
    }

    return Promise.reject({ type: 'unknown', message: 'Something went wrong.' });
  }
);

export default client;
