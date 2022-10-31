import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { CookiesProvider } from 'react-cookie';
import CreateForkPage from './pages/CreateForkPage';
import DetailPage from './pages/DetailPage';
import EditPage from './pages/DetailPage';
import { ErrorPage } from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Logs from './pages/Logs';
import { ProtectedRoute } from './utils/ProtectedRoute';
import React from 'react';
import ReactDOM from 'react-dom/client';
import SetSecretsPage from './pages/SetSecretsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'home',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    )
  },
  {
    path: 'create_fork',
    element: (
      <ProtectedRoute>
        <CreateForkPage />
      </ProtectedRoute>
    )
  },
  {
    path: 'set_secrets/:id',
    element: (
      <ProtectedRoute>
        <SetSecretsPage />
      </ProtectedRoute>
    )
  },
  {
    path: 'logs',
    element: (
      <ProtectedRoute>
        <Logs />
      </ProtectedRoute>
    ),
  },
  {
    path: 'details/:id',
    element: (
      <ProtectedRoute>
        <DetailPage />
      </ProtectedRoute>
    ),
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>
);
