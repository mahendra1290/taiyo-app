import { Link } from 'react-router-dom';
import { Contact } from '../types';
import Button from './Button';
import { useAppDispatch } from '../app/hooks';
import { removeContact } from '../features/contacts/contactsSlice';

const ContactCard = ({ id, firstName, lastName, status }: Contact) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(removeContact(id));
  };

  return (
    <div className='bg-white border rounded-md p-4 shadow-md mb-3'>
      <p>
        {firstName} {lastName}
      </p>
      <p>{status}</p>
      <Link to={`${id}/edit`}>
        <Button className='mr-2'>Edit</Button>
      </Link>
      <Button onClick={handleDelete} className='mr-2' variant='danger'>
        Delete
      </Button>
      <Link to={`${id}`}>
        <Button className='mr-2' variant='secondary'>
          View
        </Button>
      </Link>
    </div>
  );
};

export default ContactCard;
