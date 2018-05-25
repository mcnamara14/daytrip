import React, { Component } from 'react';
import * as authorization from '../../firebase/auth';
import './Login.css';



export class Login extends Component {
  constructor(props) {
    super();

    this.state = {
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
                placeholder='ex. tyler@daytrips.com'
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

export default Login;
