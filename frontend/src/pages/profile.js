import { json, redirect } from 'react-router-dom';
import { tokenLoader } from '../utils/auth';
import getApiUrl from '../utils/getApiUrl';

export async function profileLoader() {
  const token = await tokenLoader();

  if (!token) {
    return redirect('/login');
  }

  const apiUrl = getApiUrl();
  const profileUrl = `${apiUrl}/profile`;
  const bookingsUrl = `${apiUrl}/bookings`;

  const profilePromise = await fetch(profileUrl, {
    method: 'GET',
    credentials: 'include',
  });

  const bookingsPromise = fetch(bookingsUrl, {
    method: 'GET',
    credentials: 'include',
  });

  const [profileResponse, bookingsResponse] = await Promise.all([
    profilePromise,
    bookingsPromise,
  ]);

  const handleResponse = async (response, type) => {
    if (response.status === 401 || response.status === 403) {
      return redirect('/login');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw json(
        {
          message:
            errorData.message ||
            `Failed to fetch ${type} data. Please try again.`,
        },
        { status: response.status }
      );
    }

    return response.json();
  };

  const profileData = await handleResponse(profileResponse, 'profile');
  const bookingsData = await handleResponse(bookingsResponse, 'bookings');

  return { profile: profileData, bookings: bookingsData };
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
