import { json, redirect } from 'react-router-dom';
import getApiUrl from '../../utils/getApiUrl';

export async function slotFinderActions({ request }) {
  const data = await request.formData();

  const slotData = {
    entryTime: data.get('entryTime'),
    exitTime: data.get('exitTime'),
  };

  const apiUrl = getApiUrl();
  const url = `${apiUrl}/slot-available`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(slotData),
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
