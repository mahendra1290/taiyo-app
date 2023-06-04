import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import AddContact from './routes/add-contact';
import Root from './routes/root';
import Contacts from './routes/contacts';
import Charts from './routes/charts';
import ContactDetails from './routes/contact-details';
import { Provider } from 'react-redux';
import store from './app/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'charts',
        element: <Charts />,
      },
      {
        path: 'contacts/:id',
        element: <ContactDetails />,
      },
      {
        path: 'edit-contact/:id',
        element: <AddContact />,
      },
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
