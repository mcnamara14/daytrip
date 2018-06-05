import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Plan.css';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import 'firebase/database';
import { googleApiKey } from '../../apiCalls/apiKeys/googleApiKey';

export class Plan extends Component {
  constructor() {
    super();

    this.state = {
      selectedPlan: null
    }
  }

  componentDidMount() {
    let firebaseDb;

    if (this.props.user.userId !== null) {
      firebaseDb = firebase.database().ref().child('users').child(this.props.user.userId).child('selectedPlan');
    } else {
      firebaseDb = firebase.database().ref().child('users').child('anonymous').child('selectedPlan');
    };

    firebaseDb.once('value')
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
      const mapStyles = {
        width: '600px',
        height: '450px'
      };

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
                <iframe src={`https://www.google.com/maps/embed/v1/directions?key=${googleApiKey}&origin=Oslo+Norway&destination=Telemark+Norway&avoid=tolls|highways`} style={mapStyles} ></iframe>
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

// https://www.google.com/maps/embed/v1/directions?key=${googleApiKey}&origin=3720+bruce+randolp+denver+co&destination=union+station+denver+co=bicycling
// https://www.google.com/maps/embed/v1/directions
//   ?key=YOUR_API_KEY
//   &origin=Oslo+Norway
//   &destination=Telemark+Norway
//   &avoid=tolls|highways
// https://www.google.com/maps/dir/?api=1&origin=3720+bruce+randolp+denver+co&destination=union+station+denver+co=bicycling

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