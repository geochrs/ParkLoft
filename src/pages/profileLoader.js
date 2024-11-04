import { json } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';
import { redirect } from 'react-router-dom';

export async function profileLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/login');
  }

  const url = 'http://localhost:8080/profile';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401 || response.status === 403) {
    return redirect('/login');
  }

  if (!response.ok) {
    throw json(
      { message: 'Failed to fetch profile data. Please try again.' },
      { status: 500 }
    );
  }

  const resData = await response.json();
  return resData;
}
