import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authorization from '../../firebase/auth';
import './Login.css';
import { loginUser } from '../../actions/loginUser';
import { ticketmasterApiCall } from '../../apiCalls/ticketmasterApiCall';

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

  onChangeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  emailSubmitHandler = (event) => {
    console.log('asdfsda')
    const {
      location,
      email,
      password,
    } = this.state;

      if(this.state.location) {
      authorization.emailPasswordSignup(email, password)
      .then(result => {
        const {
          uid,
          email
        } = result.user;

        this.props.loginUser(uid, email, location);
      });

      event.preventDefault();
    } else {
      alert('Please enter a location')
    }
  }

  googleSignup = () => {
    if(this.state.location) {
      authorization.googleSignup()
      .then(result => {
        const {
          uid,
          email
        } = result.user;
  
        this.props.loginUser(uid, email, this.state.location);
      })

      ticketmasterApiCall();
    } else {
        this.setState({locationError: true})
        setTimeout(() => {
          this.setState({
            locationError: false
          });
        }, 2000);
    }

  }

  facebookSignup = () => {
    if(this.state.location) {
    authorization.facebookSignup()
      .then(result => {
        const {
          uid,
          email
        } = result.user;
  
        this.props.loginUser(uid, email, this.state.location);
      })
    } else {
      alert('Please enter a location')
    }
  }

  render() {
    return (
      <div className="loginContainer">
        <h1>Sign up to get started</h1>
        <p className="loginIntro">Why must they do that inspect anything brought into the house, yet 
            destroy couch as revenge. Sleep on my human's head find me of your food meh.</p>
        <section className="signupContainer">
          <article className="locationForm">
            <h2>Choose your location</h2>
            <p>* Required for signup</p>
            <div>
              { this.state.locationError ? <div><p className="locationError">A location is required for signup</p></div> : ''}
              <form onClick={this.onClickHandler} className="locationInput" >
                <input
                  name='location'
                  value={this.state.location}
                  onChange={this.onChangeHandler}
                  placeholder='Denver, CO'
                />
              </form>
            </div>
          </article>
          <section className="signupForms">
            <article className="emailPassForm">
              <h3>Email Signup</h3>
              <form className="emailSignup" onSubmit={this.emailSubmitHandler} >
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
            </article>
            <article className="socialSignup">
              <h3>Social Media Signup</h3>
              <div className="googleBtn">
                <button onClick={this.googleSignup}>Google Signup</button>
              </div>
              <div className="facebookBtn">
                <button onClick={this.facebookSignup}>Facebook Signup</button>
              </div>
            </article>
          </section>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (userId, email, location) => dispatch(loginUser(userId, email, location))
})

export default connect(null, mapDispatchToProps)(Login);
