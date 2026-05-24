// src/utils/helpers.js

/**
 * Format an ISO date string to a readable format: "Jan 5, 2025"
 */
export const formatDate = (isoString) => {
  if (!isoString) return '—';
  const d = new Date(isoString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

/**
 * Return a color hex for a given task status
 */
export const statusColor = (status) => {
  switch (status) {
    case 'completed':  return '#22c55e'; // green
    case 'in-progress': return '#f59e0b'; // amber
    case 'pending':    return '#6b7280'; // gray
    default:           return '#6b7280';
  }
};

/**
 * Return a display label for a task status
 */
export const statusLabel = (status) => {
  switch (status) {
    case 'completed':   return 'Completed';
    case 'in-progress': return 'In Progress';
    case 'pending':     return 'Pending';
    default:            return status;
  }
};

/**
 * Return a color hex for a task priority
 */
export const priorityColor = (priority) => {
  switch (priority) {
    case 'high':   return '#ef4444'; // red
    case 'medium': return '#f59e0b'; // amber
    case 'low':    return '#22c55e'; // green
    default:       return '#6b7280';
  }
};

/**
 * Validate task form fields
 * Returns an object of { field: errorMessage }; empty means valid
 */
export const validateTask = (values) => {
  const errors = {};
  if (!values.title || values.title.trim().length === 0) {
    errors.title = 'Title is required.';
  } else if (values.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters.';
  } else if (values.title.trim().length > 100) {
    errors.title = 'Title must be under 100 characters.';
  }
  if (values.description && values.description.length > 500) {
    errors.description = 'Description must be under 500 characters.';
  }
  return errors;
};

/**
 * Validate auth form fields
 */
export const validateSignIn = (values) => {
  const errors = {};
  if (!values.email || !values.email.includes('@')) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.password || values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }
  return errors;
};

export const validateSignUp = (values) => {
  const errors = {};
  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }
  if (!values.email || !values.email.includes('@')) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.password || values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }
  return errors;
};
