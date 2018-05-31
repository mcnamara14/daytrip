import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Plan extends Component {

  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
      </div>
    )
  }
}

export default Plan;