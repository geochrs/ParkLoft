import { json, redirect } from 'react-router-dom';
import getApiUrl from '../../utils/getApiUrl';

export async function bookingAction({ request }) {
  const data = await request.formData();

  const bookingData = {
    fullName: data.get('fullName'),
    phone: data.get('phone'),
    licensePlate: data.get('licensePlate'),
    entryTime: new Date(data.get('entryTime')).toISOString(),
    exitTime: new Date(data.get('exitTime')).toISOString(),
    location_id: data.get('location_id'),
  };
  console.log(bookingData);
  const apiUrl = getApiUrl();
  const url = `${apiUrl}/bookings`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw json(
      {
        message: errorData.message || 'Booking failed. Please try again.',
      },
      { status: response.status }
    );
  }
  const resData = await response.json();
  return json({
    bookingDetails: resData.booking,
    success: true,
  });
}
