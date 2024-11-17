import { redirect } from 'react-router-dom';

export async function action() {
  await fetch('http://localhost:8080/logout', {
    method: 'POST',
    credentials: 'include',
  });

  return redirect('/');
}
