import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Events.css';
import { RecentEvent } from '../../components/RecentEvent/RecentEvent';

export class Events extends Component {

  render() {
    const recentEvents = this.props.events.map((event, index) => {
      return (
        <RecentEvent
          key={index}
          image={event.image}
          title={event.title}
          price={event.price}
          venue={event.venue}
          locationLat={event.locationLat}
          locationLong={event.locationLong}
          date={event.date}
        />
      );
    });

    return (
      <div className="eventsContainer">
        <section className="recentEvents">
          { recentEvents }
        </section>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  events: state.recentEvents
});

export default connect(mapStateToProps)(Events);
