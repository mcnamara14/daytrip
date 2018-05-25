import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import headerLogo from './assets/header-logo.jpg';

export const Header = () =>  {
  return (
    <header>  
      <img src={headerLogo} className="headerLogo" />
      <nav>
        <NavLink to='/events'>Events</NavLink>
        <NavLink to='/trips'>Trips</NavLink>
        <NavLink to='/account'>Account</NavLink>
        <NavLink to='/login' className="navLogin">Login</NavLink>
      </nav>
    </header>
  );
}
export default Header;
