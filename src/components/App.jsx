import ContactForm from './ContactForm/ContactForm';
import React, { useState } from 'react';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import { useLocalStorage } from 'hooks/useLocalStorage';

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');
  const handleAddContact = contact => {
    if (contacts.some(item => item.name === contact.name)) {
      toast.error('Contact already exists');
      return true;
    }
    setContacts(prevState => [...prevState, contact]);
    return false;
  };

  const handleDeleteContact = id => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== id)
          });
  };

  const handleChangeFilter = e => {
    setFilter( e.target.value );
  };
  const handleFilterContacts = () => {
    return contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .includes(filter.toLowerCase().trim())
    );
  };

  return (
    <>
      <h1 className={css.phonebook__title}>Phonebook</h1>
      <ContactForm addContact={handleAddContact} />
      <h2 className={css.phonebook__title}> Contacts</h2>
      <Filter
        value={filter}
        handleChange={handleChangeFilter}
      />
      <ContactsList
        contacts={handleFilterContacts()}
        deleteContact={handleDeleteContact}
      />
      <Toaster />
    </>
  );
}