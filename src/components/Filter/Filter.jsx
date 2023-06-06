import { changeFilter } from 'redux/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';
import css from './Filter.module.css'

export function Filter() {
const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <div>
      <input className={css.contacts__input} type="text" value={filter} onChange={e => dispatch(changeFilter(e.target.value))} name= "filter" />
    </div>
  )
}