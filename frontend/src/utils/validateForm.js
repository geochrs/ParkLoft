export const validateInputs = (username, email, password, mode = 'signup') => {
  const errors = {};
  if (mode === 'signup') {
    if (!username) errors.username = 'Username is required.';
  }
  if (!email) errors.email = 'Email is required.';
  if (!password) errors.password = 'Password is required.';
  return errors;
};

export const validateBookInputs = (fullName, phone, licensePlate) => {
  const errors = {};
  if (!fullName) errors.fullName = 'Full name is required.';

  const phoneRegex = /^\d{10}$/;
  if (!phone) {
    errors.phone = 'Phone is required.';
  } else if (!phoneRegex.test(phone.trim())) {
    errors.phone = 'Phone must contain exactly 10 digits.';
  }
  const licensePlateRegex = /^[A-Za-z0-9]{7}$/;
  if (!licensePlate) {
    errors.licensePlate = 'License plate is required.';
  } else if (!licensePlateRegex.test(licensePlate.trim())) {
    errors.licensePlate =
      'License plate must be exactly 7 characters.';
  }
  return errors;
};
