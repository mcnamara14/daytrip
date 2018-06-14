import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authorization from '../../firebase/auth';
import './Header.css';
import headerLogo from './assets/header-logo.png';
import loginIcon from './assets/header-login-icon.png';
import { loginUser, logoutUser } from '../../actions';
import PropTypes from 'prop-types';

export class Header extends Component {
  signoutLoginClickHandler = () => {
    authorization.signOut();
    this.props.logoutUser();

  }

  render() {
    let loginSignout;
    let signoutClass;

    !this.props.user.userId ? 
      loginSignout = 'Login / Signup' : 
      loginSignout = 'Signout';
    this.props.user.userId ? 
      signoutClass = 'signout' : 
      signoutClass = '';

    return (
      <header>  
        <NavLink to='/'><img src={headerLogo} className="headerLogo" alt="Header logo"/></NavLink>
        <nav className={signoutClass}>
          <NavLink to='/events'>Events</NavLink>
          <NavLink to='/plan'>Plan</NavLink>
          <div className="loginLink">
            <img src={loginIcon} className="loginIcon" alt="Login icon" />
            <NavLink 
              to='/' 
              className="NavLogin" 
              onClick={this.signoutLoginClickHandler}>
              {loginSignout}
            </NavLink>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  loginUser: PropTypes.func,
  user: PropTypes.object
};

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (userId, email, city, state) => {
    return dispatch(loginUser(userId, email, city, state));
  },
  logoutUser: () => dispatch(logoutUser())
});

export const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
