export const loginSchema = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters',
    },
  },
};

export const registerSchema = {
  name: {
    required: 'Full name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters',
    },
    maxLength: {
      value: 50,
      message: 'Name cannot exceed 50 characters',
    },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    },
  },
  password_confirmation: {
    required: 'Please confirm your password',
    validate: (value, allValues) => value === allValues.password || 'Passwords do not match',
  },
  phone: {
    pattern: {
      value: /^[+]?[\d\s\-()]+$/,
      message: 'Invalid phone number',
    },
  },
};

export const userUpdateSchema = {
  name: {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters',
    },
    maxLength: {
      value: 50,
      message: 'Name cannot exceed 50 characters',
    },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email address',
    },
  },
  phone: {
    pattern: {
      value: /^[+]?[\d\s\-()]+$/,
      message: 'Invalid phone number',
    },
  },
};

export const validateForm = (data, schema) => {
  const errors = {};

  Object.keys(schema).forEach((field) => {
    const rules = schema[field];
    const value = data[field];

    // Check required
    if (rules.required && (!value || value.trim() === '')) {
      errors[field] = rules.required;
      return;
    }

    // Check minLength
    if (rules.minLength && value && value.length < rules.minLength.value) {
      errors[field] = rules.minLength.message;
      return;
    }

    // Check maxLength
    if (rules.maxLength && value && value.length > rules.maxLength.value) {
      errors[field] = rules.maxLength.message;
      return;
    }

    // Check pattern
    if (rules.pattern && value && !rules.pattern.value.test(value)) {
      errors[field] = rules.pattern.message;
      return;
    }

    // Check custom validation
    if (rules.validate) {
      const validationResult = rules.validate(value, data);
      if (validationResult !== true) {
        errors[field] = validationResult;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};