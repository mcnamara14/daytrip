import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Events.css';
import { RecentEvent } from '../../components/RecentEvent/RecentEvent';
import { EventsHero } from '../../components/EventsHero/Events';
import EventsSearch from '../EventsSearch/EventsSearch';
import { StopsSelection } from '../../components/StopsSelection/StopsSelection';
import SelectedEvent from '../../components/SelectedEvent/SelectedEvent';

export class Events extends Component {

  render() {
    console.log(this.props.selectedEvent)
    const recentEvents = this.props.events.map((event, index) => {
      return (
        <RecentEvent
          key={index}
          image={event.image}
          title={event.title}
          price={event.price}
          venue={event.venue}
          date={event.date}
        />
      );
    });

    return (
      <div className="eventsContainer">
        <EventsHero />
        <div className="eventsStopsSelection">
          <EventsSearch />
          <StopsSelection />
        </div>
        { this.props.selectedEvent ? <SelectedEvent /> : null }
        <section className="recentEvents">
          { recentEvents }
        </section>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  events: state.recentEvents,
  selectedEvent: state.selectedEvent
});

export default connect(mapStateToProps)(Events);
