import { json} from 'react-router-dom';
import getApiUrl from '../../utils/getApiUrl';

export async function slotFinderLoader() {

  const apiUrl = getApiUrl();
  const url = `${apiUrl}/slots-available`;

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw json(
      {
        message:
          errorData.message || 'Failed to fetch slots. Please try again.',
      },
      { status: response.status }
    );
  }
  const resData = await response.json();
  return resData;
}
