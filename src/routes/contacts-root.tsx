import { Outlet } from 'react-router-dom';

const ContactsRoot = () => {
  return (
    <>
      <header className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Contacts</h1>
      </header>
      <Outlet />
    </>
  );
};

export default ContactsRoot;
