import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EventsSearch.css';
import PropTypes from 'prop-types';
import LocationAutocomplete from 'location-autocomplete';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Async } from 'react-select';
import 'react-select/dist/react-select.css';
import { googleApiKey } from '../../apiCalls/apiKeys/googleApiKey';
import { fetchRecentEventsOnSearch, fetchSelectedEvent, fetchRecentEvents } from '../../apiCalls';
import { cleanRecentEvents } from '../../dataCleaners';
import { 
  storeSelectedEvent, 
  toggleLocationError, 
  toggleLocation,
  storeRecentEvents,
  toggleEventError 
} from '../../actions';


export class EventsSearch extends Component {
  constructor() {
    super();

    this.state = {
      startDate: moment(),
      location: '',
      city: '',
      state:'',
      locationError: false,
      selectedOption: 'Enter a location'
    };
  }

  componentDidMount() {
    this.fetchEvents();
  }

  componentWillMount() {
    const { user } = this.props;

    if (user.userId !== null) {
      const selectedOption = user.city + ',' + user.state;

      this.setState({
        city: user.city,
        state: user.state,
        selectedOption
      });
    }
  }

  handleChange = (startDate) => {
    this.setState({
      startDate
    });
  }

  fetchEvents = async (input) => {
    const { city, state, startDate } = this.state;

    if (city && state) {
      const date = startDate;
      const timeNow = date.format();
      const events = 
      await fetchRecentEventsOnSearch(city, state, timeNow, input);

      return events;
    } else {
      this.handleMissingLocationError();
    }
  }

  onSelect = (selectedOption) => {
    this.setState({ selectedOption });
  }

  handleMissingLocationError = () => {
    this.setState({locationError: true});
    setTimeout(() => {
      this.setState({
        locationError: false
      });
    }, 2000);
  }

  toggleEventError = () => {
    this.props.toggleEventError(true);
    setTimeout(() => {
      this.props.toggleEventError(false);
    }, 2000);
  }
  
  handleStoreEvent = async () => {
    const eventId = this.state.selectedOption.id;
    const selectedEvent = await fetchSelectedEvent(eventId);
    if (selectedEvent) {
      const event = selectedEvent[0];
      this.props.storeSelectedEvent(event);
    } else {
      this.toggleEventError();
    }
  }

  onDropdownSelect = (component) => {
    const place = component.autocomplete.getPlace();
    const city = place.vicinity;
    const state = place.address_components[2].short_name;

    this.setState({
      city,
      state,
      selectedOption: ''
    }, () => this.storeRecentEvents());

    this.props.toggleLocation(city, state);
    this.props.toggleLocationError(false);
  }

  storeRecentEvents = async () => {
    const city = this.state.city;
    const state = this.state.state;
    const date = moment();
    const timeNow = date.format();
    
    const events = await fetchRecentEvents(city, state, timeNow);
    const recentEvents = cleanRecentEvents(events);
    
    this.props.storeRecentEvents(recentEvents);
  }

  render() {
    const { selectedOption } = this.state;
    
    return (
      <div className="eventsSearchContainer">
        <h5>Search Events</h5>
        <Async
          name="searchEventsInput"
          loadOptions={this.fetchEvents}
          value={selectedOption}
          onChange={this.onSelect}
          placeholder="Search events"
          autoload={false}
        />
        <div className="eventsSearchLocationDate">
          { this.props.eventError ? 
            <p className="errorPopup">An event is required for signup</p> : ''}
          <LocationAutocomplete
            name="location"
            placeholder={this.state.city ? 
              this.state.city + ', ' + this.state.state : 
              'Enter a location'}
            targetArea="City, State"
            locationType="(cities)"
            onChange={this.onChangeHandler}
            googleAPIKey={googleApiKey} 
            onDropdownSelect={this.onDropdownSelect}
          />
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.handleStoreEvent}>Select Event</button>
      </div>
    );
  }
}

EventsSearch.propTypes = {
  user: PropTypes.object,
  storeSelectedEvent: PropTypes.func,
  toggleLocationError: PropTypes.func,
  eventError: PropTypes.bool,
  toggleLocation:PropTypes.func
};

LocationAutocomplete.propTypes = {
  onChange: PropTypes.func
};

DatePicker.propTypes = {
  selected: PropTypes.string
};

export const mapDispatchToProps = (dispatch) => ({
  storeSelectedEvent: (event) => dispatch(storeSelectedEvent(event)),
  toggleLocationError: (boolean) => dispatch(toggleLocationError(boolean)),
  toggleLocation: (city, state) => dispatch(toggleLocation(city, state)),
  storeRecentEvents: (recentEvents) => dispatch(storeRecentEvents(recentEvents)),
  toggleEventError: (boolean) => dispatch(toggleEventError(boolean))
});

export const mapStateToProps = (state) => ({
  user: state.user,
  eventError: state.eventError,
  selectedEvent: state.selectedEvent,
  location: state.location
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsSearch);