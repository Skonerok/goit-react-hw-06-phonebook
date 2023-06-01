import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'name':
      return {
        ...state, name: action.payload
      }
    case 'number':
      return {
        ...state, number: action.payload
      }
    
    case 'reset':
      return {
        name: '',
        number: ''
      }
    
    default:
      return state;
  }
} 

export default function ContactForm({ addContact }) {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    number: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    const isContactEsist = addContact({ id: nanoid(6), ...state });
    if (!isContactEsist) {
      reset();
    }
  };

  function handleChange(e) {
    const { name, value } = e.currentTarget;
   dispatch({type: name, payload: value})
  }

  const reset = () => {
    dispatch({type: 'reset'})
  };

  return (
    <div>
      <form className={css.phonebook__form} onSubmit={handleSubmit}>
        <label className={css.phonebook__label}>
          Name
          <input
            className={css.phonebook__input}
            onChange={handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={state.name}
          />
        </label>
        <label className={css.phonebook__label}>
          Number
          <input
            className={css.phonebook__input}
            onChange={handleChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={state.number}
          />
        </label>
        <button className={css.phonebook__add} type="submit">
          Add Contact
        </button>
      </form>
    </div>
  );
}