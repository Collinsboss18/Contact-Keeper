import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
  // Inst Contact
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  // Spread Operators
  const { isAuthenticated, logout, user } = authContext;
  const { clearContacts } = contactContext;

  /** @actions */
  const onLogout = () => {
    logout();
    clearContacts();
  };

  /** Navbar Links */
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a href={'#!'} onClick={onLogout}>
          <i className={'fas fa-sign-out-alt'} /> <span className={'hide-sm'}>Logout</span>{' '}
        </a>
      </li>
    </Fragment>
  );

  const guestsLinks = (
    <Fragment>
      <li>
        <Link to={'/register'}>Register</Link>
      </li>
      <li>
        <Link to={'/login'}>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className={'navbar bg-primary'}>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestsLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
