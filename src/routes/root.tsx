import { NavLink, Outlet } from 'react-router-dom';

const Root = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) => {
    const baseClasses = 'p-2 w-40 text-center flex-1 sm:flex-none p-2 rounded-lg';
    return `${isActive ? 'bg-teal-200' : ''} ${baseClasses}`;
  };

  return (
    <>
      <section className='flex h-[calc(100vh-56px)] overflow-auto sm:h-auto'>
        <nav className='min-h-screen hidden sm:block'>
          <ul className='min-h-full flex flex-col gap-2 py-4 px-2 bg-gray-100'>
            <NavLink to='/' className={navLinkClasses}>
              Contacts
            </NavLink>
            <NavLink to='/charts' className={navLinkClasses}>
              Charts & Maps
            </NavLink>
          </ul>
        </nav>
        <div className='flex-1 p-2 md:p-4'>
          <Outlet />
        </div>
      </section>
      <ul className='fixed bottom-0 left-0 right-0 flex sm:hidden justify-around bg-gray-100 p-2'>
        <NavLink to='/contacts' className={navLinkClasses}>
          Contacts
        </NavLink>
        <NavLink to='/charts' className={navLinkClasses}>
          Charts & Maps
        </NavLink>
      </ul>
    </>
  );
};

export default Root;
