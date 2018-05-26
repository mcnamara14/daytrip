import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authorization from '../../firebase/auth';
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
          date={event.date}
        />
      )
    })
    console.log(recentEvents)
    return (
      <div className="eventsContainer">
        <h1>Sign up to get started</h1>
        <section className="recentEvents">
          { recentEvents }
        </section>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  events: state.recentEvents
})

export default connect(mapStateToProps)(Events);
