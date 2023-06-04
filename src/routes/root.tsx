import { NavLink, Outlet } from 'react-router-dom';

const Root = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) => {
    const baseClasses = 'p-2 rounded-md text-center';
    return `${isActive ? 'bg-red-300' : ''} ${baseClasses}`;
  };

  return (
    <>
      <section className='flex'>
        <nav className='min-h-screen'>
          <ul className='min-h-full flex flex-col gap-2  p-4 bg-gray-100'>
            <NavLink to='/add-contact' className={navLinkClasses}>
              Add Contact
            </NavLink>
            <NavLink to='/contacts' className={navLinkClasses}>
              Contacts
            </NavLink>
          </ul>
        </nav>
        <div>
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Root;
