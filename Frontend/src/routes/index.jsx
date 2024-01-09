import { createBrowserRouter, redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        return redirect('/login');
      }
      return null;
    },
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    loader: () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        return redirect('/');
      }
      return null;
    },
  },
]);

export default router;
