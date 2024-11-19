import { json, redirect } from 'react-router-dom';

export async function loginAction({ request }) {
  const data = await request.formData();

  const loginData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const url = 'http://localhost:8080/login';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
    credentials: 'include',
  });

  if (response.status === 422) {
    const errorData = await response.json();
    return ({message: errorData.message})
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw json(
      { message: errorData.message || 'Login failed, please try again.' },
      { status: response.status }
    );
  }

  return redirect('/');
}
