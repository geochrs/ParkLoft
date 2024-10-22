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
  });

  if (response.status === 422) {
    const errorData = await response.json();
    return { errors: errorData.error };
  }

  if (!response.ok) {
    throw json(
      { message: 'Sign up failed, please try again.' },
      { status: 500 }
    );
  }

  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem('token', token);

  return redirect('/');
}
