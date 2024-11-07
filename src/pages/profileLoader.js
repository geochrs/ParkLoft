import { json } from 'react-router-dom';
import { tokenLoader } from '../utils/auth';
import { redirect } from 'react-router-dom';

export async function profileLoader() {
  const token = tokenLoader();

  if (!token) {
    return redirect('/login');
  }

  const url = 'http://localhost:8080/profile';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
