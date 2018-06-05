import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Plan.css';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import 'firebase/database';

export class Plan extends Component {
  constructor() {
    super();

    this.state = {
      selectedPlan: null
    }
  }

  componentDidMount() {
    let selectedPlan;

    const firebaseRef = firebase.database().ref();
    let ref = firebaseRef.child('users').child('anonymous').child('selectedPlan');
    console.log(this)

    ref.once('value')
      .then((snapshot) => {
        return snapshot.val();
      }).then(selectedPlan => 
        this.setState({selectedPlan}))
  }

  render () {
    if (this.state.selectedPlan) {
      return (
        <section className="planMain">
          <div className="planHeader"></div>
          <h1>Your plan</h1>
          <h2>{this.state.selectedPlan.restaurant.title}</h2>
        </section>
      ) 
    } else {
      return <h1>Selected a plan</h1>
    }
  }
}

Plan.propTypes = {
  suggestedRestaurants: PropTypes.array
};

export const mapStateToProps = (state) => ({
  suggestedRestaurants: state.suggestedRestaurants,
  suggestedBars: state.suggestedBars,
  selectedEvent: state.selectedEvent,
  user: state.user
});

export default connect(mapStateToProps)(Plan);