import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Events.css';
import RecentEvent from '../../components/RecentEvent/RecentEvent';
import { EventsHero } from '../../components/EventsHero/Events';
import EventsSearch from '../EventsSearch/EventsSearch';
import { StopsSelection } from '../../components/StopsSelection/StopsSelection';
import SelectedEvent from '../../components/SelectedEvent/SelectedEvent';
import Plans from '../Plans/Plans';

export class Events extends Component {

  render() {
    console.log(this.props.selectedEvent)
    const recentEvents = this.props.events.map((event, index) => {
      const { id, image, title, price, venue, date } = event;

      return (
        <RecentEvent
          key={index}
          id={id}
          image={image}
          title={title}
          price={price}
          venue={venue}
          date={date}
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
        { this.props.selectedEvent ? <SelectedEvent /> : 
          <section className="recentEvents">
            <div className="upcomingEvents">
              <h2>Upcoming Events</h2>
              <div className="upcomingEventsContainer">
                { recentEvents }
              </div>
            </div>
          </section>
        }
        { this.props.suggestedRestaurants.length && this.props.suggestedBars.length ? <Plans /> : null }
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  events: state.recentEvents,
  selectedEvent: state.selectedEvent,
  suggestedRestaurants: state.suggestedRestaurants,
  suggestedBars: state.suggestedBars
});

export default connect(mapStateToProps)(Events);
