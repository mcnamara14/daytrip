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
import { fetchRecentEventsOnSearch, fetchSelectedEvent } from '../../apiCalls';
import { storeSelectedEvent, toggleLocation } from '../../actions';


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
      const events = await fetchRecentEventsOnSearch(city, state, timeNow, input);

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
  
  handleStoreEvent = async () => {
    const eventId = this.state.selectedOption.id;
    const selectedEvent = await fetchSelectedEvent(eventId);
    const event = selectedEvent[0];

    this.props.storeSelectedEvent(event);
  }

  onDropdownSelect = (component) => {
    const place = component.autocomplete.getPlace();
    const city = place.vicinity;
    const state = place.address_components[2].short_name;
    
    this.setState({
      city,
      state,
      selectedOption: ''
    });

    this.props.toggleLocation(false);
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
          { this.props.eventError ? <p className="errorPopup">An event is required for signup</p>: ''}
          <LocationAutocomplete
            name="location"
            placeholder={this.state.selectedOption ? this.state.selectedOption : 'Enter a location'}
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
  toggleLocation: PropTypes.func,
  eventError: PropTypes.bool
};

LocationAutocomplete.propTypes = {
  onChange: PropTypes.func
};

DatePicker.propTypes = {
  selected: PropTypes.string
};

export const mapDispatchToProps = (dispatch) => ({
  storeSelectedEvent: (event) => dispatch(storeSelectedEvent(event)),
  toggleLocation: (boolean) => dispatch(toggleLocation(boolean))
});

export const mapStateToProps = (state) => ({
  user: state.user,
  eventError: state.eventError,
  selectedEvent: state.selectedEvent
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsSearch);