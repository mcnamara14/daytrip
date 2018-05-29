import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EventsSearch.css';
import LocationAutocomplete from 'location-autocomplete';
import Calendar from 'rc-calendar';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export class EventsSearch extends Component {
  constructor() {
    super();

    this.state = {
      startDate: moment()
    };
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <div className="eventsSearchContainer">
        <h5>Search Events</h5>
        <input 
          placeholder="Search by event name or category"
        />
        <div className="eventsSearchLocationDate">
          <LocationAutocomplete
            name="location"
            placeholder="Enter a location..."
            targetArea="City, State"
            locationType="(cities)" 
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
