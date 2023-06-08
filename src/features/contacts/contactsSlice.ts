import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Contact } from '../../types';

interface ContactState {
  value: Contact[];
}

const initialState: ContactState = {
  value: [...Array(5)].map((_, index) => ({
    id: String(index),
    firstName: `First Name ${index}`,
    lastName: `Last Name ${index}`,
    status: index % 2 === 0 ? 'active' : 'inactive',
  })),
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<Contact, 'id'>>) => {
      const previousId = state.value[state.value.length - 1]?.id ?? 0;
      state.value.push({
        id: String(Number(previousId) + 1),
        ...action.payload,
      });
    },
    removeContact: (state, action) => {
      state.value = state.value.filter((contact) => contact.id !== action.payload);
    },
    updateContact: (state, action) => {
      const { id, firstName, lastName, status } = action.payload;
      const existingContact = state.value.find((contact) => contact.id === id);
      if (existingContact) {
        existingContact.firstName = firstName;
        existingContact.lastName = lastName;
        existingContact.status = status;
      }
    },
  },
});

export const { addContact, removeContact, updateContact } = contactsSlice.actions;

export const selectContacts = (state: { contacts: ContactState }) => state.contacts.value;

export default contactsSlice.reducer;
