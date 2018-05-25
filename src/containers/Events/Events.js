import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authorization from '../../firebase/auth';
import './Login.css';
import { storeUser } from '../../actions/storeUser';

export class Login extends Component {
  constructor(props) {
    super();

    this.state = {
      location: '',
      email: '',
      password: '',
      locationError: false
    }
  }

  render() {
    return (
      <div className="loginContainer">
        <h1>Sign up to get started</h1>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  storeUser: (userId, email, location) => dispatch(storeUser(userId, email, location))
})

export default connect(null, mapDispatchToProps)(Login);
