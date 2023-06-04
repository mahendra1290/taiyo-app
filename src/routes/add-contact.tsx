import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addContact, selectContacts, updateContact } from '../features/contacts/contactsSlice';
import { useNavigate, useParams } from 'react-router-dom';

const AddContact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive' | ''>('');

  const contacts = useAppSelector(selectContacts);

  const { id } = useParams();

  const contact = contacts.find((contact) => contact.id === id);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firstName || !lastName || !status) {
      return;
    }
    if (contact) {
      dispatch(
        updateContact({
          id: contact.id,
          firstName,
          lastName,
          status,
        }),
      );
      navigate('/contacts');
      return;
    }
    dispatch(
      addContact({
        firstName,
        lastName,
        status,
      }),
    );
    navigate('/contacts');
  };

  useEffect(() => {
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setStatus(contact.status);
    }
  }, [contact]);

  return (
    <>
      <h1 className='text-2xl font-bold mb-4'>{contact ? 'Edit' : 'Add'} Contact</h1>
      <form onSubmit={handleSubmit} className='mx-auto max-w-md p-4 bg-blue-50'>
        <label>
          <span className='capitalize'>fist name</span>
          <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          <span className='capitalize'>last name</span>
          <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <div>
          <p className='capitalize'>status</p>
          <label>
            <input
              type='radio'
              checked={status === 'active'}
              onChange={() => setStatus('active')}
            />
            <span>active</span>
          </label>
          <label>
            <input
              type='radio'
              checked={status === 'inactive'}
              onChange={() => setStatus('inactive')}
            />
            <span>inactive</span>
          </label>
        </div>
        <Button className='mx-auto block mt-4' type='submit'>
          Save Contact
        </Button>
      </form>
    </>
  );
};

export default AddContact;
