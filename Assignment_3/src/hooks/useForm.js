// src/hooks/useForm.js
// Reusable form hook: manages field values, validation errors, and submission state

import { useState } from 'react';

/**
 * useForm — generic form state manager
 * @param {Object} initialValues - default field values
 * @param {Function} validate - fn(values) => { field: 'error message' } | {}
 */
const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Update a single field value and clear its error
  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Run validation; returns true if valid
  const runValidation = () => {
    if (!validate) return true;
    const errs = validate(values);
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Wrap async submit handler with validation + loading state
  const handleSubmit = async (onSubmit) => {
    if (!runValidation()) return;
    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, submitting, handleChange, handleSubmit, resetForm, setValues };
};

export default useForm;
