import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export function App() {

  return (
    <>
      <h1 className={css.phonebook__title}>Phonebook</h1>
      <ContactForm  />
      <h2 className={css.phonebook__title}> Contacts</h2>
      <Filter
      />
      <ContactsList
      />
    </>
  );
}