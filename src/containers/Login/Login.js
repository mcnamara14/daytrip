import React, { Component } from 'react';
import './Login.css';


export class Login extends Component {
  constructor(props) {
    super();

    this.state = {
      location: ''
    }
  }

  onChangeHandler = (event) => {
    const { value } = event.target;

    this.setState({
      location: value
    })
  }

  render() {
    return (
      <div className="Login">
        <h1>Sign up to get started</h1>
        <p>Why must they do that inspect anything brought into the house, yet 
            destroy couch as revenge. Sleep on my human's head find me of your food meh.</p>
        <section className="loginForm">
        <h2>Choose your location</h2>
          <input
            name='location'
            value={this.state.location}
            onChange={this.onChangeHandler}
            placeholder='Denver, CO'
          />
        </section>
      </div>
    );
  }
}

export default Login;
