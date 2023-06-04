import { NavLink, Outlet } from 'react-router-dom';

const Root = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) => {
    const baseClasses = 'p-2 rounded-md text-center';
    return `${isActive ? 'bg-red-300' : ''} ${baseClasses}`;
  };

  return (
    <>
      <section className='flex h-[calc(100vh-56px)] overflow-auto sm:h-auto pb-4'>
        <nav className='min-h-screen hidden sm:block'>
          <ul className='min-h-full flex flex-col gap-2  p-4 bg-gray-100'>
            <NavLink to='/contacts' className={navLinkClasses}>
              Contacts
            </NavLink>
            <NavLink to='/charts' className={navLinkClasses}>
              Charts
            </NavLink>
          </ul>
        </nav>
        <div className='flex-1 p-4'>
          <Outlet />
        </div>
      </section>
      <ul className='fixed bottom-0 left-0 right-0 flex sm:hidden justify-around bg-gray-100 px-4 py-2'>
        <NavLink to='/contacts' className={navLinkClasses}>
          Contacts
        </NavLink>
        <NavLink to='/charts' className={navLinkClasses}>
          Charts
        </NavLink>
      </ul>
    </>
  );
};

export default Root;
