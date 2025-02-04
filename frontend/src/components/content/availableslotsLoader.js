import { defer, json } from 'react-router-dom';
import getApiUrl from '../../utils/getApiUrl';
import { tokenLoader } from '../../utils/auth';

export async function availableslotsLoader() {
  const token = await tokenLoader();

  const apiUrl = getApiUrl();

  const slotsUrl = `${apiUrl}/slots-available`;

  const slotsPromise = await fetch(slotsUrl, {
    method: 'GET',
    credentials: 'include',
  });

  let userData = null;
  const userPromise = token
    ? fetch(`${apiUrl}/profile`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => (userData = data))
    : Promise.resolve();

  const [slotsResponse] = await Promise.all([slotsPromise, userPromise]);

  if (!slotsResponse.ok) {
    const errorData = await slotsResponse.json();
    throw json(
      {
        message:
          errorData.message || 'Failed to fetch slots. Please try again.',
      },
      { status: slotsResponse.status }
    );
  }
  const slotsData = await slotsResponse.json();
  return defer({ slots: slotsData, user: userData });
}
