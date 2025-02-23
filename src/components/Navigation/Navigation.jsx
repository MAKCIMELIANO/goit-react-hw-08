import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={css.navigation}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? css.active : '')}
      >
        Home
      </NavLink>
      <NavLink
        to="/contacts"
        className={({ isActive }) => (isActive ? css.active : '')}
      >
        Contacts
      </NavLink>
    </nav>
  );
};

export default Navigation;
