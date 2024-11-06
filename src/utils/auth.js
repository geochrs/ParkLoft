export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export function tokenLoader() {
  const token = getCookie('public_id');
  console.log(getCookie('public_id'));
  return token ? token : null;
}
