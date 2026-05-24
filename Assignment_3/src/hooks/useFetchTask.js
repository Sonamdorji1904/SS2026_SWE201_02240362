// src/hooks/useFetchTask.js
// Custom hook to fetch a single task by id, with retry support

import { useState, useEffect, useCallback } from 'react';
import tasksService from '../api/tasksService';

const useFetchTask = (id) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await tasksService.getById(id);
      setTask(data);
    } catch (err) {
      setError(err.message || 'Failed to load task.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // retry — exposed so UI can show a "Retry" button
  return { task, loading, error, retry: fetch };
};

export default useFetchTask;
