import { Suspense, lazy } from 'react';
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
// import AvailableSlots from './pages/AvailableSlotsPage';
import TosPage from './pages/TosPage';
import { availableslotsLoader } from './components/content/availableslotsLoader';

const AvailableSlots = lazy(() => import('./pages/AvailableSlotsPage'));

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
        element: (
          <Suspense fallback={<p>Loading available slots...</p>}>
            <AvailableSlots />
          </Suspense>
        ),
        loader: availableslotsLoader,
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
