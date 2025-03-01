import { json, redirect } from 'react-router-dom';
import { tokenLoader } from '../utils/auth';
import getApiUrl from '../utils/getApiUrl';

export async function profileLoader() {
  const token = await tokenLoader();

  if (!token) {
    return redirect('/login');
  }

  const apiUrl = getApiUrl();
  const url = `${apiUrl}/profile`;

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  if (response.status === 401 || response.status === 403) {
    return redirect('/login');
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw json(
      {
        message:
          errorData.message ||
          'Failed to fetch profile data. Please try again.',
      },
      { status: errorData.status || 500 }
    );
  }

  const resData = await response.json();
  return resData;
}

export async function profileAction({ request }) {
  const formData = await request.formData();
  const updatedProfile = {
    username: formData.get('username'),
    phone: formData.get('phone'),
    dateOfBirth: formData.get('dateOfBirth'),
  };

  const token = tokenLoader();
  if (!token) {
    return redirect('/login');
  }

  const apiUrl = getApiUrl();
  const url = `${apiUrl}/profile`;

  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedProfile),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw json(
      { message: errorData.message || 'Failed to update profile.' },
      { status: response.status }
    );
  }

  const resData = await response.json();
  return resData;
}
