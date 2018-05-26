import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authorization from '../../firebase/auth';
import './Events.css';

export class Events extends Component {

  render() {
    return (
      <div className="eventsContainer">
        <h1>Sign up to get started</h1>
      </div>
    );
  }
}

export default Events;
