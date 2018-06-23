import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LocationAutocomplete from 'location-autocomplete';
import * as authorization from '../../firebase/auth';
import './Login.css';
import { 
  loginUser, 
  storeRecentEvents, 
  toggleLocationError,
  togglePasswordError,
  toggleRecentEventsError 
} from '../../actions';
import { fetchRecentEvents } from '../../apiCalls';
import { googleApiKey } from '../../apiCalls/apiKeys/googleApiKey';
import { cleanRecentEvents } from '../../dataCleaners/index';
import homeSignupTextBoxPhoto from './assets/home-signup-text-box-img.jpg';
import moment from 'moment';
import PasswordMask from 'react-password-mask';

export class Login extends Component {
  constructor() {
    super();

    this.state = {
      location: '',
      city: '',
      state: '',
      emailInput: '',
      password: ''
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
      password,
      city,
      state
    } = this.state;

    if (location) {
      try {
        const result = 
        await authorization.emailPasswordSignup(emailInput, password);
      
        const {
          uid,
          email
        } = result.user;

        this.props.loginUser(uid, email, city, state);
        this.handleTicketMasterFetch();
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          try {
            const result = 
              await authorization.emailPasswordSignin(emailInput, password);
            
            const {
              uid,
              email
            } = result.user;

            this.props.loginUser(uid, email, this.state.city, this.state.state);
            this.handleTicketMasterFetch();
          } catch (error) {
            if (error.code === "auth/wrong-password") {
              this.togglePasswordError();
            }
          }
        }
      }
    } else {
      this.toggleLocationError();
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
      this.toggleLocationError();
    }
  }

  toggleLocationError = () => {
    this.props.toggleLocationError(true);
    setTimeout(() => {
      this.props.toggleLocationError(false);
    }, 2000);
  }

  togglePasswordError = () => {
    this.props.togglePasswordError(true);
    setTimeout(() => {
      this.props.togglePasswordError(false);
    }, 2000);
  }

  toggleRecentEventsError = () => {
    this.props.toggleRecentEventsError(true);
    setTimeout(() => {
      this.props.toggleRecentEventsError(false);
    }, 2000);
  }

  handleTicketMasterFetch = async () => {
    const city = this.state.city;
    const state = this.state.state;
    const date = moment();
    const timeNow = date.format();
    
    const events = await fetchRecentEvents(city, state, timeNow);

    if (events) {
      const recentEvents = cleanRecentEvents(events);
    
      this.props.storeRecentEvents(recentEvents);
      this.props.history.push('/events');
    } else {
      this.toggleRecentEventsError()
    }

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
      this.toggleLocationError();
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

    this.props.toggleLocationError(false);
  }

  render() {
    return (
      <div className="loginContainer">
        <section className="homeHeroContainer">
          <article className="homeHeroTextBox">
            <h1>Event Planner</h1>
            <h4><span>Your personal event planning assistant.</span></h4>
            <p>Choose your event and pick a type of restaurant and bar. 
              We will plan your day.</p>
          </article>
        </section>
        <section className="signupContainer">
          <section className="signupTextBox">
            <h2>Sign up to get started</h2>
            <p>Enter a location to get started then sign in with your preferred sign in method.</p>
            <h5>We plan your stops</h5>
            <img src={homeSignupTextBoxPhoto} alt="Signup text box"/>
          </section>
          <div className="signupForms">
            { this.props.recentEventsError ? <p className="recentEventsErrorPopup">No upcoming events in the selected city.<br/> Choose a new location.</p> : null }
            <div className="signupFormsContainer">
              <article className="locationForm">
                <h3>Choose your location</h3>
                <p>* Required for signup</p>
                <div>
                  { this.props.locationError ? 
                    <div><p className="errorPopup">
                      A location is required for signup
                    </p></div> : ''}
                  <form 
                    onClick={this.onClickHandler} 
                    className="locationInput" >
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
                  <h4>Email Signup / Login</h4>
                  <form 
                    className="emailSignup" 
                    onClick={this.emailSubmitHandler} >
                    <input
                      name='emailInput'
                      value={this.state.emailInput}
                      onChange={this.onChangeHandler}
                      placeholder='ex. tyler@daytrip.com'
                    />
                    { this.props.passwordError ? <p className="passwordErrorPopup errorPopup">Wrong password, try again.</p> : null }
                    <PasswordMask
                      name='password'
                      value={this.state.password}
                      onChange={this.onChangeHandler}
                      placeholder='Enter a password'
                    />
                    <button onClick={this.emailSubmitHandler} >Sign In</button>
                  </form>
                </article>
                <article className="socialSignup">
                  <h4>Social Media Signup / Login</h4>
                  <div className="googleBtn">
                    <button onClick={this.googleSignup}>Google Signup</button>
                  </div>
                  <div className="facebookBtn">
                    <button 
                      onClick={this.facebookSignup}>Facebook Signup</button>
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

Login.propTypes = {
  loginUser: PropTypes.func,
  toggleLocationError: PropTypes.func,
  storeRecentEvents: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object
};

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (userId, email, city, state) => {
    return dispatch(loginUser(userId, email, city, state));
  },
  storeRecentEvents: (recentEvents) => {
    return dispatch(storeRecentEvents(recentEvents));
  },
  toggleLocationError: (boolean) => dispatch(toggleLocationError(boolean)),
  togglePasswordError: (boolean) => dispatch(togglePasswordError(boolean)),
  toggleRecentEventsError: (boolean) => dispatch(toggleRecentEventsError(boolean)),
});

export const mapStateToProps = (state) => ({
  locationError: state.locationError,
  passwordError: state.passwordError,
  recentEventsError: state.recentEventsError
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
