export const validateSignupInput = (username, email, password) => {
  const errors = [];

  if (!username || !email || !password) {
    errors.push('All fields are required.');
  }

  if (username.length < 3 || username.length > 30) {
    errors.push('Username must be between 3 and 30 characters.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Invalid email format.');
  }

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long.');
  }

  return errors;
};

export const validateLoginInput = (email, password) => {
  const errors = [];

  if (!email || !password) {
    errors.push('Email and password are required.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Invalid email format.');
  }

  return errors;
};

export const validateBookingInput = (
  fullName,
  phone,
  licensePlate,
  vehicleId
) => {
  const errors = [];

  if (!fullName) errors.push('Full name is required.');

  const phoneRegex = /^\d{10}$/;
  if (!phone) {
    errors.push('Phone is required.');
  } else if (!phoneRegex.test(phone.trim())) {
    errors.push('Phone must contain exactly 10 digits.');
  }

  if (!vehicleId) {
    if (!licensePlate) {
      errors.push('License plate is required.');
    } else {
      const licensePlateRegex = /^[A-Za-z0-9]{7}$/;
      if (!licensePlateRegex.test(licensePlate.trim())) {
        errors.push('License plate must be exactly 7 characters.');
      }
    }
  }
  return errors;
};
