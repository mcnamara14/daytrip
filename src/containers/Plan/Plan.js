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
    const firebaseRef = firebase.database().ref();
    let ref = firebaseRef.child('users').child('anonymous').child('selectedPlan');

    ref.once('value')
      .then((snapshot) => {
        return snapshot.val();
      }).then(selectedPlan => 
        this.setState({selectedPlan}))
  }

  render () {
    const { selectedPlan } = this.state;

    if (selectedPlan) {
      const {
        bar,
        restaurant,
        event
      } = this.state.selectedPlan;

      const {
        image: restaurantImage,
        title: restaurantTitle,
        location: restaurantLocation,
        rating: restaurantRating,
        reviews: restaurantReviews,
        type
      } = restaurant;

      const restaurantBgImage = {backgroundImage: "url(" + restaurantImage + ")"};
      const restaurantReview = restaurantRating * 20;

      return (
        <section className="planMain">
          <div className="planHeader"></div>
          <div className="planWrapper">
            <h1>Your plan</h1>
            <h2>Begin your night at:</h2>
            <div className="planStop">
              <div className="planImage" style={restaurantBgImage}></div>
              <div className="planInfo">
                <h3>{restaurantTitle}</h3>
                { type === 'restaurant' || type === 'bar' ?
                  <div className="reviewContainer">
                    <div className="stars">
                      <div>
                        <img src={require('./assets/stars-gray.png')} />
                      </div>
                      <div className="redStars" style={{ "width": `${restaurantReview}%` }}>
                        <img src={require('./assets/stars-red.png')} />
                      </div>
                    </div>
                    <p className="reviewCount">{restaurantReviews} reviews</p>
                  </div> :
                  null
                }
                <p className="location">{restaurantLocation}</p>
              </div>
            </div>
          </div>
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