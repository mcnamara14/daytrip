import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RecentEvent.css';
import PropTypes from 'prop-types';
import { storeSelectedEvent } from '../../actions';
import { fetchSelectedEvent } from '../../apiCalls';

export class RecentEvent extends Component {
  handleRecentClick = async (eventId) => {
    const selectedEvent = await fetchSelectedEvent(eventId);
    const event = selectedEvent[0];

    this.props.storeSelectedEvent(event);
  }

  render() {
    const { image, title, venue, date, price, id } = this.props;
    const backgroundImage = {backgroundImage: "url(" + image + ")"};

    return (
      <div className="recentEvent">
        <div className="eventImage" style={ backgroundImage } ></div>
        <div className="eventInfo">
          <div className="recentTitle">
            <h3>{title}</h3>
          </div>
          <p className="price">{price}</p>
          <hr/>
          <p className="venue">{venue}</p>
          <p className="date">{date}</p>
        </div>
        <button onClick={() => this.handleRecentClick(id)}>Select</button>
      </div>
    );
  }
}

RecentEvent.propTypes = {
  storeSelectedEvent: PropTypes.func,
  image: PropTypes.string,
  title: PropTypes.string,
  venue: PropTypes.string,
  date: PropTypes.string,
  price: PropTypes.string,
  id: PropTypes.string
};

export const mapDispatchToProps = (dispatch) => ({
  storeSelectedEvent: (event) => dispatch(storeSelectedEvent(event))
});

export default connect(null, mapDispatchToProps)(RecentEvent);