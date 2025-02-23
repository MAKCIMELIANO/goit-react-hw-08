import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <div className={css.authNav}>
      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? css.active : '')}
      >
        Register
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? css.active : '')}
      >
        Login
      </NavLink>
    </div>
  );
};

export default AuthNav;
