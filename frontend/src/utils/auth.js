import getApiUrl from '../utils/getApiUrl';

export async function tokenLoader() {
  const apiUrl = getApiUrl();
  const url = `${apiUrl}/auth-check`;

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    return null;
  }

  const resData = await response.json();

  if (resData.guest) {
    return null;
  }

  return resData;
}
