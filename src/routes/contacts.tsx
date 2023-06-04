import { Link } from 'react-router-dom';
import ContactCard from '../components/contact-card';
import Button from '../components/Button';
import { useAppSelector } from '../app/hooks';
import { selectContacts } from '../features/contacts/contactsSlice';

const Contacts = () => {
  const contacts = useAppSelector(selectContacts);

  return (
    <>
      <h1 className='text-2xl font-bold mb-4'>Contacts</h1>
      <div className='grid md:grid-cols-2 gap-2'>
        {contacts.map((contact) => {
          return (
            <div key={contact.id}>
              <ContactCard {...contact} />
            </div>
          );
        })}
        {contacts.length === 0 && <p>No contacts found</p>}
      </div>
      <Link to='/add-contact'>
        <Button>Add Contact</Button>
      </Link>
    </>
  );
};

export default Contacts;
