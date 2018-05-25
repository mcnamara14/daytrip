import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authorization from '../../firebase/auth';
import './Login.css';
import { storeUser } from '../../actions/storeUser';

export class Login extends Component {
  constructor(props) {
    super();

    this.state = {
      user: null,
      location: '',
      email: '',
      password: ''
    }
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  onSubmitHandler = (event) => {
      const {
        location,
        email,
        password,
      } = this.state;
  
      authorization.emailPasswordSignup(email, password)
      .then(result => {
        const {
          uid,
          email
        } = result.user;
        console.log(uid)
        this.props.storeUser(uid, email, location)
      });

      event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <h1>Sign up to get started</h1>
        <p>Why must they do that inspect anything brought into the house, yet 
            destroy couch as revenge. Sleep on my human's head find me of your food meh.</p>
        <section className="signupForm">
          <h2>Choose your location</h2>
          <form onClick={this.onClickHandler} className="locationInput" >
            <input
              name='location'
              value={this.state.location}
              onChange={this.onChangeHandler}
              placeholder='Denver, CO'
            />
          </form>
          <section className="signupOptions">
            <form className="emailSignup" onClick={this.onSubmitHandler} >
              <input
                name='email'
                value={this.state.email}
                onChange={this.onChangeHandler}
                placeholder='ex. tyler@daytrip.com'
              />
              <input
                name='password'
                value={this.state.password}
                onChange={this.onChangeHandler}
                placeholder='Enter a password'
              />
              <button>Sign In</button>
            </form>
          </section>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  storeUser: (userId, email, location) => dispatch(storeUser(userId, email, location))
})

export default connect(null, mapDispatchToProps)(Login);
