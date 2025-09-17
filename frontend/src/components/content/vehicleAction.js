import { json, redirect } from 'react-router-dom';
import getApiUrl from '../../utils/getApiUrl';

export async function vehicleAction({ request }) {
  const data = await request.formData();
  const apiUrl = getApiUrl();

  const method = request.method;
  let url = `${apiUrl}/vehicles`;

  const vehicleId = data.get('vehicleId');
  if (method !== 'POST' && vehicleId) {
    url += `/${vehicleId}`;
  }

  let body;
  if (method !== 'DELETE') {
    body = JSON.stringify({ licensePlate: data.get('licensePlate') });
  }

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    credentials: 'include',
  });

  if (response.status === 422) {
    const errorData = await response.json();
    return { message: errorData.message };
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw json(
      {
        message:
          errorData.message || 'Vehicle action failed. Please try again.',
      },
      { status: response.status }
    );
  }
  const resData = await response.json();
  if (method === 'POST') return { actionType: 'create', vehicle: resData };
  if (method === 'PUT') return { actionType: 'update', vehicle: resData };
  if (method === 'DELETE')
    return { actionType: 'delete', deletedId: vehicleId };
}
