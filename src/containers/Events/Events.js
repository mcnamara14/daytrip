import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Events.css';
import PropTypes from 'prop-types';
import RecentEvent from '../../containers/RecentEvent/RecentEvent';
import { EventsHero } from '../../components/EventsHero/EventsHero';
import EventsSearch from '../EventsSearch/EventsSearch';
import StopsSelection from '../../components/StopsSelection/StopsSelection';
import SelectedEvent from '../../containers/SelectedEvent/SelectedEvent';
import Plans from '../Plans/Plans';

export class Events extends Component {
  render() {
    const { 
      events, 
      selectedEvent, 
      suggestedBars, 
      suggestedRestaurants 
    } = this.props;

    const recentEvents = events.map((event, index) => {
      if (event !== undefined) {
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
      }});

    return (
      <div className="eventsContainer">
        <EventsHero />
        <div className="eventsStopsSelection">
          <EventsSearch />
          <StopsSelection />
        </div>
        { selectedEvent ? <SelectedEvent /> : 
          <section className="recentEvents">
            { events.length ? <div className="upcomingEvents">
              <h2>Upcoming Events</h2>
              <div className="upcomingEventsContainer">
                { recentEvents }
              </div>
            </div> : null }
          </section>
        }
        { suggestedRestaurants.length && suggestedBars.length ? 
          <Plans /> : null }
      </div>
    );
  }
}

Events.propTypes = {
  events: PropTypes.array,
  selectedEvent: PropTypes.object,
  suggestedBars: PropTypes.array,
  suggestedRestaurants: PropTypes.array
};

export const mapStateToProps = (state) => ({
  events: state.recentEvents,
  selectedEvent: state.selectedEvent,
  suggestedRestaurants: state.suggestedRestaurants,
  suggestedBars: state.suggestedBars
});

export default connect(mapStateToProps)(Events);