import './index.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Forks from './pages/Forks';
import { CookiesProvider } from 'react-cookie';
import Home from './pages/Home';
import Login from './pages/Login';
import Logs from './pages/Logs';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

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

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>
);
