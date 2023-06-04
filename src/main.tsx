import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import AddContact from './routes/add-contact';
import Root from './routes/root';
import Contacts from './routes/contacts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'add-contact',
        element: <AddContact />,
      },
      {
        path: 'contacts',
        element: <Contacts />,
      },
      {
        index: true,
        element: <Contacts />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
