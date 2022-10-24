import './index.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Forks from './pages/Forks';
import { CookiesProvider } from 'react-cookie';
import Home from './pages/Home';
import Login from './pages/Login';
import Logs from './pages/Logs';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <div>Error page</div>,
  },
  {
    path: 'home',
    element: <Home />,
  },
  {
    path: 'logs',
    element: <Logs />,
  },
  {
    path: 'forks',
    element: <Forks />,
  },
]);

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
);
