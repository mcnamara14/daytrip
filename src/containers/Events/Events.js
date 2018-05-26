import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authorization from '../../firebase/auth';
import './Events.css';

export class Events extends Component {

  render() {
    const recentEvents = this.props.events.map(event => {
      return (
        event.title
      )
    })
    console.log(recentEvents)
    return (
      <div className="eventsContainer">
        <h1>Sign up to get started</h1>
        { recentEvents }
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  events: state.recentEvents
})

export default connect(mapStateToProps)(Events);
