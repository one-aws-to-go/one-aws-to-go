//import "./Typography.css";

import './index.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import Configurations from './pages/Configurations';
import { CookiesProvider } from 'react-cookie';
import Home from './pages/Home';
import Login from './pages/Login';
import Logs from './pages/Logs';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Test from './Test';

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
    path: 'configurations',
    element: <Configurations />,
  },
]);

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
);
