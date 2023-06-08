import { Link } from 'react-router-dom';
import ContactCard from '../components/contact-card';
import Button from '../components/Button';
import { useAppSelector } from '../app/hooks';
import { selectContacts } from '../features/contacts/contactsSlice';

const Contacts = () => {
  const contacts = useAppSelector(selectContacts);

  return (
    <>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {contacts.map((contact) => {
          return (
            <div key={contact.id}>
              <ContactCard {...contact} />
            </div>
          );
        })}
        {contacts.length === 0 && <p className='my-4'>No contacts found</p>}
      </div>
      <Link to='add'>
        <Button>Add Contact</Button>
      </Link>
    </>
  );
};

export default Contacts;
