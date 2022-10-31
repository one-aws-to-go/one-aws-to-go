import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { CookiesProvider } from 'react-cookie';
import CreateForkPage from './pages/CreateForkPage';
import EditPage from './pages/EditPage';
import { ErrorPage } from './pages/ErrorPage';
import Forks from './pages/Forks';
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
    path: 'forks',
    element: (
      <ProtectedRoute>
        <Forks />
      </ProtectedRoute>
    ),
  },
  {
    path: 'edit/:id',
    element: (
      <ProtectedRoute>
        <EditPage />
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
