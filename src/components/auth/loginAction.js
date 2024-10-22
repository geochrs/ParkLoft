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
  });

  if (response.status === 422) {
    const errorData = await response.json();
    return { errors: errorData.error };
  }

  if (!response.ok) {
    throw json({ message: 'Login failed, please try again.' }, { status: 500 });
  }

  return redirect('/');
}
