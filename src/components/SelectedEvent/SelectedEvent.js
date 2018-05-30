import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SelectedEvent.css';

class SelectedEvent extends Component {

  render() {
    const { image, title, price, venue, date } = this.props.selectedEvent;
    const backgroundImage = {backgroundImage: "url(" + image + ")"};
  
    return (
      <div className="selectedEvent">
        <div className="selectedContainer">
          <div className="selectedImage" style={ backgroundImage } ></div>
          <div className="selectedTitle">
            <h3>{title}</h3>
            <p>Your selected event</p>
          </div>
          <div className="selectedInfo">
            <p className="selectedPrice">{price}</p>
            <span>
              <p className="selectedVenue">{venue}</p>
              <p className="selectedDate">{date}</p>
            </span>
          </div>
        </div>
      </div>
    );
  } 
};

export const mapStateToProps = (state) => ({
  selectedEvent: state.selectedEvent
})

export default connect(mapStateToProps)(SelectedEvent);
