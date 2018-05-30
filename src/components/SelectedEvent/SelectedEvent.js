import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SelectedEvent.css';

class SelectedEvent extends Component {

  render() {
    const { image, title, price, venue, date } = this.props.selectedEvent;

    const backgroundImage = {backgroundImage: "url(" + image + ")"};
  
    return (
      <div className="selectedEvent">
        <div className="eventImage" style={ backgroundImage } ></div>
        <div className="eventInfo">
          <h3>{title}</h3>
          <p className="price">{price}</p>
          <hr/>
          <p className="venue">{venue}</p>
          <p className="date">{date}</p>
          <button>Select</button>
      </div>
      </div>
    );
  } 
};

export const mapStateToProps = (state) => ({
  selectedEvent: state.selectedEvent
})

export default connect(mapStateToProps)(SelectedEvent);
