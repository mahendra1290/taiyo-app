import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './index.css';
import AddContact from './routes/add-contact';
import Root from './routes/root';
import Contacts from './routes/contacts';
import ContactDetails from './routes/contact-details';
import { Provider } from 'react-redux';
import store from './app/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ContactsRoot = lazy(() => import('./routes/contacts-root'));
const Charts = lazy(() => import('./routes/charts'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Navigate to='/contacts' />,
      },
      {
        path: '/contacts',
        element: <ContactsRoot />,
        children: [
          {
            path: ':id/edit',
            element: <AddContact />,
          },
          {
            path: 'add',
            element: <AddContact />,
          },
          {
            path: ':id',
            element: <ContactDetails />,
          },
          {
            index: true,
            element: <Contacts />,
          },
        ],
      },
      {
        path: 'charts',
        element: <Charts />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
