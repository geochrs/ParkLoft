export const validateInputs = (username, email, password) => {
  const errors = {};
  if (!username) errors.username = 'Username is required.';
  if (!email) errors.email = 'Email is required.';
  if (!password) errors.password = 'Password is required.';
  return errors;
};
