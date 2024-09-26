import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { loginAction } from './components/loginAction';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage />, action: loginAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
