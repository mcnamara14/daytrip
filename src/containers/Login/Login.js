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
      password: ''
    }
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  emailSubmitHandler = (event) => {
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

      this.props.storeUser(uid, email, location);
    });

    event.preventDefault();
  }

  googleSignup = () => {
    authorization.googleSignup()
      .then(result => {
        const {
          uid,
          email
        } = result.user;
  
        this.props.storeUser(uid, email, this.state.location);
      })
  }

  render() {
    return (
      <div className="loginContainer">
        <h1>Sign up to get started</h1>
        <p className="loginIntro">Why must they do that inspect anything brought into the house, yet 
            destroy couch as revenge. Sleep on my human's head find me of your food meh.</p>
        <section className="signupForm">
          <article className="locationForm">
            <h2>Choose your location</h2>
            <form onClick={this.onClickHandler} className="locationInput" >
              <input
                name='location'
                value={this.state.location}
                onChange={this.onChangeHandler}
                placeholder='Denver, CO'
              />
            </form>
          </article>
          <section className="emailPassForm">
            <form className="emailSignup" onClick={this.emailSubmitHandler} >
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
          <section className="googleGithubSignup">
            <button onClick={this.googleSignup}>Google Signup</button>
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
