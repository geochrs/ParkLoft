export const validateInputs = (username, email, password, mode = 'signup') => {
  const errors = {};
  if (mode === 'signup') {
    if (!username) errors.username = 'Username is required.';
  }
  if (!email) errors.email = 'Email is required.';
  if (!password) errors.password = 'Password is required.';
  return errors;
};

export const validateBookInputs = (
  fullName,
  phone,
  licensePlate,
  vehicleId
) => {
  const errors = {};
  if (!fullName) errors.fullName = 'Full name is required.';
  if (!phone) errors.phone = 'Phone is required.';
  if (!vehicleId && !licensePlate) {
    errors.licensePlate = 'License plate is required.';
  }
  return errors;
};
