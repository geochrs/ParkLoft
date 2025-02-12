import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import { loginAction } from './components/auth/loginAction';
import { signupAction } from './components/auth/signupAction';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ErrorPage from './pages/ErrorPage';
import { action as logoutAction } from './pages/LogoutPage';
import { profileLoader, profileAction } from './pages/profile';
import TosPage from './pages/TosPage';
import { availableslotsLoader } from './components/content/availableslotsLoader';
import AvailableSlots from './components/content/AvailableSlots';
import { bookingAction } from './components/content/bookingAction';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    id: 'root',
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage />, action: loginAction },
      { path: 'signup', element: <SignUpPage />, action: signupAction },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'logout', action: logoutAction },
      {
        path: 'profile',
        id: 'profile',
        element: <ProfilePage />,
        loader: profileLoader,
        action: profileAction,
      },
      {
        path: 'slots-available',
        element: <AvailableSlots />,
        loader: availableslotsLoader,
        action: bookingAction,
      },
    ],
  },
  {
    path: 'tos',
    element: <TosPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
