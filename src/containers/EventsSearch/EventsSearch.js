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
    console.log('sdfdf')
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