import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import headerLogo from './assets/header-logo.png';
import loginIcon from './assets/header-login-icon.png';

export const Header = () =>  {
  return (
    <header>  
      <img src={headerLogo} className="headerLogo" alt="Header logo"/>
      <nav>
        <NavLink to='/events'>Events</NavLink>
        <NavLink to='/trips'>Trips</NavLink>
        <NavLink to='/account'>Account</NavLink>
        <div className='loginLink'>
          <img src={loginIcon} className="loginIcon" alt="Login icon" />
          <NavLink to='/login' className="navLogin">Login</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
