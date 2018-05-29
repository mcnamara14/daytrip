import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EventsSearch.css';
import LocationAutocomplete from 'location-autocomplete';

export class EventsSearch extends Component {
  render() {
    return (
      <div className="eventsSearchContainer">
        <h5>Search Events</h5>
        <input 
          placeholder="Search by event name or category"
        />
        <LocationAutocomplete
          name="location"
          placeholder="Enter a location..."
          targetArea="City, State"
          locationType="(cities)" 
        />
      </div>
    );
  }
}
