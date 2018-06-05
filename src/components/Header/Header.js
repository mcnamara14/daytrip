import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authorization from '../../firebase/auth';
import './Header.css';
import headerLogo from './assets/header-logo.png';
import loginIcon from './assets/header-login-icon.png';
import { loginUser } from '../../actions';

export class Header extends Component {
  signoutLoginClickHandler = () => {
    const userReset = {
      userId: null,
      email: '',
      city: '',
      state: ''
    };

    authorization.signOut();
    this.props.loginUser(...userReset);
  }

  render() {
    let loginSignout;
    let signoutClass;

    !this.props.user.userId ? loginSignout = 'Login / Signup' : loginSignout = 'Signout';
    this.props.user.userId ? signoutClass = 'signout' : signoutClass = '';

    return (
      <header>  
        <img src={headerLogo} className="headerLogo" alt="Header logo"/>
        <nav className={signoutClass}>
          <NavLink to='/events'>Events</NavLink>
          <NavLink to='/plan'>Plan</NavLink>
          <div className="loginLink">
            <img src={loginIcon} className="loginIcon" alt="Login icon" />
            <NavLink to='/' className="NavLogin" onClick={this.signoutLoginClickHandler}>{loginSignout}</NavLink>
          </div>
        </nav>
      </header>
    );
  };
}

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (userId, email, city, state) => {
    return dispatch(loginUser(userId, email, city, state));
  }
});

export const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
