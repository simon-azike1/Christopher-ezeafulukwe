export const isValidEmail = (email) => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
};

export const validateForm = (form, rules = {}) => {
  const errors = {};
  
  if (rules.email && !isValidEmail(form.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (rules.requiredFields) {
    rules.requiredFields.forEach(field => {
      if (!form[field]?.trim()) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const isValidPassword = (password) => password.length >= 6;
