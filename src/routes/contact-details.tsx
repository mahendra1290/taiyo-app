import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectContacts } from '../features/contacts/contactsSlice';
import Button from '../components/Button';

const ContactDetails = () => {
  const contacts = useAppSelector(selectContacts);
  const { id } = useParams();

  const contact = contacts.find((contact) => contact.id === id);

  return (
    <div className='p-4 border rounded-md'>
      <p>fist name: {contact?.firstName}</p>
      <p>last name: {contact?.lastName}</p>
      <p>status: {contact?.status}</p>
      <Link to={`/edit-contact/${id}`}>
        <Button>Edit</Button>
      </Link>
    </div>
  );
};

export default ContactDetails;
