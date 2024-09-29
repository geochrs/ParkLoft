import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { loginAction } from './components/auth/loginAction';
import { signupAction } from './components/auth/signUpAction';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage />, action: loginAction },
      { path: 'signup', element: <SignUpPage />, action: signupAction },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
