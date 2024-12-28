import { redirect } from 'react-router-dom';
import getApiUrl from '../utils/getApiUrl';

export async function action() {
  const apiUrl = getApiUrl();
  const url = `${apiUrl}/logout`;

  await fetch(url, {
    method: 'POST',
    credentials: 'include',
  });

  return redirect('/');
}
