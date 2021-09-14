import React from 'react';
import './NavBar.css';

const NavBar = () => (
  <header className='navbar'>
    <a className='navbar__title navbar__item'>Fafnir</a>
    <a className='navbar__item nav_link'>About Us</a>
    <a className='navbar__item nav_link'>Sign in</a>
    <a className='navbar__item nav_link'>Contact</a>
  </header>
);

export default NavBar;
