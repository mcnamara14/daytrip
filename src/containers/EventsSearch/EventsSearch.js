import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EventsSearch.css';
import LocationAutocomplete from 'location-autocomplete';
import { googleApiKey } from '../../apiCalls/apiKeys/googleApiKey';
import Calendar from 'rc-calendar';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Async } from 'react-select';
import { cleanRecentEventsSearch, cleanRecentEvents } from '../../dataCleaners/index';
import { ticketmasterApiCallRecentEventsSearch, ticketmasterFetchSelectedEvent } from '../../apiCalls';
import 'react-select/dist/react-select.css';
import { storeSelectedEvent, toggleLocation } from '../../actions';
import { select } from 'redux-saga/effects';

class EventsSearch extends Component {
  constructor() {
    super();

    this.state = {
      startDate: moment(),
      location: '',
      city: 'Denver',
      state:'CO',
      locationError: false,
      selectedOption: 'Enter a location'
    };
  }

  componentDidMount() {
    this.handleTicketMasterFetch();
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }

  componentWillMount() {
    if (this.props.user.userId !== null) {
      const selectedOption = this.props.user.city + ',' + this.props.user.state;

      this.setState({
        city: this.props.user.city,
        state: this.props.user.state,
        selectedOption
      })
    }
  }

  handleTicketMasterFetch = (input) => {
    if (this.state.city && this.state.state) {
      const city = this.state.city;
      const state = this.state.state;
      const date = this.state.startDate;
      const timeNow = date.format();
      const events = ticketmasterApiCallRecentEventsSearch(city, state, timeNow, input);

      return events;
    } else {
      this.handleMissingLocationError();
    }
  }

  onSelect = (selectedOption) => {
    this.setState({ selectedOption });
		
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.id}`);
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
  
  handleStoreEvent = async () => {
    const eventId = this.state.selectedOption.id;
    const selectedEvent = await ticketmasterFetchSelectedEvent(eventId);
    const event = selectedEvent[0]

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
    let isLoadingExternally = true;
 
    return (
      <div className="eventsSearchContainer">
        <h5>Search Events</h5>
        <Async
          name="searchEventsInput"
          loadOptions={this.handleTicketMasterFetch}
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

export const mapDispatchToProps = (dispatch) => ({
  storeSelectedEvent: (event) => dispatch(storeSelectedEvent(event)),
  toggleLocation: (boolean) => dispatch(toggleLocation(boolean))
})

export const mapStateToProps = (state) => ({
  user: state.user,
  eventError: state.eventError
})

export default connect(mapStateToProps, mapDispatchToProps)(EventsSearch);