import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LocationAutocomplete from 'location-autocomplete';
import * as authorization from '../../firebase/auth';
import './Login.css';
import { loginUser, storeRecentEvents } from '../../actions/index';
import { ticketmasterApiCallRecentEvents } from '../../apiCalls/ticketmasterApiCall';
import { googleApiKey } from '../../apiCalls/apiKeys/googleApiKey';
import { cleanRecentEvents } from '../../dataCleaners/index';
const moment = require('moment');

export class Login extends Component {
  constructor() {
    super();

    this.state = {
      location: '',
      city: '',
      state: '',
      emailInput: '',
      password: '',
      locationError: false
    };
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  emailSubmitHandler = async (event) => {
    const {
      location,
      emailInput,
      password
    } = this.state;

    if (location) {
      const result = await authorization.emailPasswordSignup(emailInput, password);
      
      const {
        uid,
        email
      } = result.user;

      this.props.loginUser(uid, email, location);

      event.preventDefault();
    } else {
      this.handleMissingLocationError();
    }
  }

  googleSignup = async () => {
    if (this.state.location) {
      const result = await authorization.googleSignup();
      const {
        uid,
        email
      } = result.user;
      
      this.props.loginUser(uid, email, this.state.city, this.state.state);
 
      this.handleTicketMasterFetch();
    } else {
      this.handleMissingLocationError();
    }
  }

  handleMissingLocationError = () => {
    this.setState({locationError: true});
    setTimeout(() => {
      this.setState({
        locationError: false
      });
    }, 2000);
  }

  handleTicketMasterFetch = async () => {
    const city = this.state.city;
    const state = this.state.state;
    const date = moment();
    const timeNow = date.format();

    const events = await ticketmasterApiCallRecentEvents(city, state, timeNow);
    const recentEvents = cleanRecentEvents(events);

    this.props.storeRecentEvents(recentEvents);
    this.props.history.push('/events');
  }

  facebookSignup = () => {
    if (this.state.location) {
      authorization.facebookSignup()
        .then(result => {
          const {
            uid,
            email
          } = result.user;
  
          this.props.loginUser(uid, email, this.state.location);
        });
    } else {
      this.handleMissingLocationError();
    }
  }

  onDropdownSelect = (component) => {
    const place = component.autocomplete.getPlace();
    const city = place.vicinity;
    const state = place.address_components[2].short_name;
    
    this.setState({
      city,
      state
    });
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
                <LocationAutocomplete
                  name="location"
                  placeholder="Enter a location..."
                  targetArea="City, State"
                  locationType="(cities)"
                  googleAPIKey={googleApiKey}
                  onChange={this.onChangeHandler}
                  onDropdownSelect={this.onDropdownSelect}
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

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (userId, email, city, state) => dispatch(loginUser(userId, email, city, state)),
  storeRecentEvents: (recentEvents) => dispatch(storeRecentEvents(recentEvents))
});

export default withRouter(connect(null, mapDispatchToProps)(Login));
