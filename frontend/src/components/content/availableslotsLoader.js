import { defer, json } from 'react-router-dom';
import getApiUrl from '../../utils/getApiUrl';
import { tokenLoader } from '../../utils/auth';

export async function availableslotsLoader() {
  const token = await tokenLoader();

  const apiUrl = getApiUrl();

  const slotsUrl = `${apiUrl}/slots-available`;

  const slotsPromise = fetch(slotsUrl, {
    method: 'GET',
    credentials: 'include',
  }).then(async (res) => {
    const slotsResponse = res;
    if (!slotsResponse.ok) {
      const errorData = await slotsResponse.json();
      throw json(
        { message: errorData.message || 'Failed to fetch slots. Please try again.' },
        { status: slotsResponse.status }
      );
    }
    return slotsResponse.json();
  });

  const userPromise = token
    ? fetch(`${apiUrl}/profile`, {
        method: 'GET',
        credentials: 'include',
      }).then((res) => res.json())
    : Promise.resolve(null);

  return defer({ slots: slotsPromise, user: userPromise });
}
