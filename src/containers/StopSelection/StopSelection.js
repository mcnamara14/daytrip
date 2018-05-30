import React, { Component } from 'react';
import './StopSelection.css';
export class StopSelection extends Component {

render() {
    const beforeAfter = this.props.type === 'before' ? 'before' : 'after';
    const restaurantBar = this.props.type === 'before' ? 'restaurant' : 'bar';

    return (
      <div>
        <h3>{beforeAfter} the event</h3>
        <p>{restaurantBar} category</p>
        
      </div>
    );
  }
}
