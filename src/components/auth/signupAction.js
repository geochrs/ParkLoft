import { json, redirect } from 'react-router-dom';

export async function signupAction({ request }) {
  const data = await request.formData();

  const signupData = {
    username: data.get('username'),
    email: data.get('email'),
    password: data.get('password'),
  };

  const url = 'http://localhost:8080/signup';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupData),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw json(
      { message: errorData.message || 'Sign up failed, please try again.' },
      { status: response.status }
    );
  }

  return redirect('/');
}
