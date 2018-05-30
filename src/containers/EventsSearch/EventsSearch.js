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
import { cleanRecentEventsSearch } from '../../dataCleaners/index';
import { ticketmasterApiCallRecentEventsSearch } from '../../apiCalls/ticketmasterApiCall';
import 'react-select/dist/react-select.css';


class EventsSearch extends Component {
  constructor() {
    super();

    this.state = {
      startDate: moment(),
      location: '',
      city: '',
      state:''
    };
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }

  handleTicketMasterFetch = async (input) => {
    const city = this.state.city;
    const state = this.state.state;
    const date = this.state.startDate;
    const timeNow = date.format();
    const events = await ticketmasterApiCallRecentEventsSearch(city, state, timeNow, input);
    console.log(events)
    return events;
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
      <div className="eventsSearchContainer">
        <h5>Search Events</h5>
        <Async
          name="form-field-name"
          loadOptions={this.handleTicketMasterFetch}
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
      </div>
    );
  }
}

export default EventsSearch;