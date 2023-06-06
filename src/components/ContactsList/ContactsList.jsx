import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';
import css from './ContactList.module.css'

export function ContactsList() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const getFilteredContacts = () => {
  if (contacts && filter) {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
      );
  }
    return contacts;
  };

  return (
    <>
    <ul className={css.phonebook__list}>
      {getFilteredContacts() && getFilteredContacts().map(contact => {
        return (
          <li className={css.phonebook__item} key={contact.id}>
            <span>{contact.name}</span>:
            <span>{contact.number}</span>
            <button
              className={css.phonebook__delete}
              onClick={() => dispatch(deleteContact(contact.id))}
            >
              Delete
            </button>
          </li>
        )
      })}
      </ul>
      </>
  );
  };