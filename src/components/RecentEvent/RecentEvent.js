import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RecentEvent.css';
import { storeSelectedEvent } from '../../actions/index';
import { ticketmasterFetchSelectedEvent } from '../../apiCalls/index';

class RecentEvent extends Component {
  handleRecentClick = async (eventId) => {
    const selectedEvent = await ticketmasterFetchSelectedEvent(eventId);
    const event = selectedEvent[0]

    this.props.storeSelectedEvent(event);
  }

  render() {
    const { image, title, venue, date, price, id } = this.props;
    const backgroundImage = {backgroundImage: "url(" + image + ")"};

    return (
      <div className="recentEvent">
        <div className="eventInfo">
          <div className="recentTitle">
            <h3>{title}</h3>
          </div>
          <p className="venue">{venue}</p>
          <p className="date">{date}</p>
          <hr/>
          <p className="price">{price}</p>
        </div>
        <div className="eventImage" style={ backgroundImage } ></div>
        <button onClick={() => this.handleRecentClick(id)}>Select</button>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  storeSelectedEvent: (event) => dispatch(storeSelectedEvent(event))
})

export default connect(null, mapDispatchToProps)(RecentEvent);