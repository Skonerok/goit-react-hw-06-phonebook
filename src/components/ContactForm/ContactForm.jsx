import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';

export function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const number = e.target.number.value;

  if (
      contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
    ) {
      toast.error('This contact is already exists');
      return;
    }

    if (contacts.find(contact => contact.number === number)) {
     toast.error('This number is already exist');
      return;
    }

    dispatch(addContact({ id: nanoid(6), name, number }));

    e.target.reset();
  };

  return (
    <div>
      <div><Toaster/></div>
      <form className={css.phonebook__form} onSubmit={handleSubmit}>
        <label className={css.phonebook__label}>
          Name
          <input
            className={css.phonebook__input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.phonebook__label}>
          Number
          <input
            className={css.phonebook__input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.phonebook__add} type="submit">
          Add Contact
        </button>
      </form>
    </div>
  );
}