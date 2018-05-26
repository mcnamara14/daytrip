import React, { Component } from 'react';
import './RecentEvent.css';
import { yelpApiCall } from '../../apiCalls/yelpApiCall';

export class RecentEvent extends Component {
  constructor() {
    super();
  }

  handleEventClick = (locationLat, locationLong) => {
    yelpApiCall(locationLat, locationLong);
  }

  render() {
    const backgroundImage = {backgroundImage: "url(" + this.props.image + ")"};
    
    return (
      <div className="recentEvent">
        <div className="eventImage" style={ backgroundImage } ></div>
        <div className="eventInfo">
          <h3>{this.props.title}</h3>
          <p className="price">{this.props.price}</p>
          <hr/>
          <p className="venue">{this.props.venue}</p>
          <p className="date">{this.props.date}</p>
          <button onClick={() => this.handleEventClick(this.props.locationLat, this.props.locationLong)}>Select</button>
        </div>
      </div>
    );
  }
};