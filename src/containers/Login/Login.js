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
import homeSignupTextBoxImg from './assets/home-signup-text-box-img.jpg';
import moment from 'moment';

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
    event.preventDefault();
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

      this.props.loginUser(uid, email, this.state.city, this.state.state);

      this.handleTicketMasterFetch();
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

  facebookSignup = async () => {
    if (this.state.location) {
      const result = await authorization.facebookSignup();
      const {
        uid,
        email
      } = result.user;

      this.props.loginUser(uid, email, this.state.location);
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
        <section className="homeHeroContainer">
          <article className="homeHeroTextBox">
            <h1>Event Planner</h1>
            <h4><span>Your personal event planning assistant.</span></h4>
            <p>Let us wax poetic about the beauty of the cheeseburger. The burg is flavour gracefully dances across.</p>
          </article>
        </section>
        <section className="signupContainer">
          <section className="signupTextBox">
            <h2>Sign up to get started</h2>
            <p>The cheese melts on the burger and in your mouth, perfectly complementing the medium-rare beef.</p>
            <h5>We plan your stops</h5>
            <img src={homeSignupTextBoxImg} />
          </section>
          <div className="signupForms">
            <div className="signupFormsContainer">
              <article className="locationForm">
                <h3>Choose your location</h3>
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
              <section className="signupInputs">
                <article className="emailPassForm">
                  <h4>Email Signup</h4>
                  <form className="emailSignup" onClick={this.emailSubmitHandler} >
                    <input
                      name='emailInput'
                      value={this.state.emailInput}
                      onChange={this.onChangeHandler}
                      placeholder='ex. tyler@daytrip.com'
                    />
                    <input
                      name='password'
                      value={this.state.password}
                      onChange={this.onChangeHandler}
                      placeholder='Enter a password'
                    />
                    <button onClick={this.emailSubmitHandler} >Sign In</button>
                  </form>
                </article>
                <article className="socialSignup">
                  <h4>Social Media Signup</h4>
                  <div className="googleBtn">
                    <button onClick={this.googleSignup}>Google Signup</button>
                  </div>
                  <div className="facebookBtn">
                    <button onClick={this.facebookSignup}>Facebook Signup</button>
                  </div>
                </article>
              </section>
            </div>
          </div>
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
