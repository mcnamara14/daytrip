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
import { ticketmasterApiCallRecentEventsSearch, ticketmasterFetchSelectedEvent } from '../../apiCalls/index';
import 'react-select/dist/react-select.css';
import { storeSelectedEvent } from '../../actions/index';
import { select } from 'redux-saga/effects';



class EventsSearch extends Component {
  constructor() {
    super();

    this.state = {
      startDate: moment(),
      location: '',
      city: '',
      state:'',
      locationError: false,
      selectedOption: null
    };
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }

  handleTicketMasterFetch = async (input) => {
    if (this.state.city && this.state.state) {
      const city = this.state.city;
      const state = this.state.state;
      const date = this.state.startDate;
      const timeNow = date.format();
      const events = await ticketmasterApiCallRecentEventsSearch(city, state, timeNow, input);
  
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
    console.log(selectedEvent)
    this.props.storeSelectedEvent(selectedEvent);
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
    const { selectedOption } = this.state;

    return (
      <div className="eventsSearchContainer">
        <h5>Search Events</h5>
        <Async
          name="searchEventsInput"
          loadOptions={this.handleTicketMasterFetch}
          value={selectedOption}
          onChange={this.onSelect}
          placeholder="Search events"
        />
        <div className="eventsSearchLocationDate">
          <LocationAutocomplete
            name="location"
            placeholder="Enter a location..."
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
        <button onClick={this.handleStoreEvent} >Select Event</button>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  storeSelectedEvent: (event) => dispatch(storeSelectedEvent(event))
})

export default connect(null, mapDispatchToProps)(EventsSearch);