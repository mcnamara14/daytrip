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
    let city;
    let state;
    
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
        type: restaurantType
      } = restaurant;

      const {
        image: barImage,
        title: barTitle,
        location: barLocation,
        rating: barRating,
        reviews: barReviews,
        type: barType
      } = bar;

      const {
        image: eventImage,
        title: eventTitle,
        location: eventLocation,
        price: eventPrice,
        reviews: eventDate
      } = event;

      if (this.props.location) {
        const { city, state } = this.props.location;
      } else {
        const { city, state } = this.props.user
      }
      

      const restaurantBgImage = {backgroundImage: "url(" + restaurantImage + ")"};
      const eventBgImage = {backgroundImage: "url(" + eventImage + ")"};
      const barBgImage = {backgroundImage: "url(" + barImage + ")"};

      const restaurantReview = restaurantRating * 20;
      const barReview = barRating * 20;
      const mapRestaurantLocation = restaurantLocation.replace(/\s+/g, '+').toLowerCase().replace(',', '');
      const mapEventLocation = eventLocation.replace(/\s+/g, '+').toLowerCase().replace(',', '');
      const mapBarLocation = barLocation.replace(/\s+/g, '+').toLowerCase().replace(',', '');

      const mapStyles = {
        width: '80%',
        height: '350px',
        border: '0',
        borderRadius: '5px'
      };

      return (
        <section className="planMain">
          <div className="planHeader"></div>
          <div className="planWrapper">
            <section className="planLeftContainer">
              <h1>Your plan</h1>
              <div className="planStop">
                <h2>Begin</h2>
                <div className="planImage" style={restaurantBgImage}></div>
                <div className="planInfo">
                  <h3>{restaurantTitle}</h3>
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
                  </div>
                  <p className="location">{restaurantLocation}</p>
                </div>
              </div>
              <div className="planStop">
                <h2>Event</h2>
                <div className="planImage" style={eventBgImage}></div>
                <div className="planInfo">
                  <h3>{eventTitle}</h3>
                  <p className="location">{eventLocation}</p>
                  <p className="eventPrice">{eventPrice}</p>
                  <p className="eventDate">{eventDate}</p>
                </div>
              </div>
              <div className="planStop">
                <h2>After</h2>
                <div className="planImage" style={barBgImage}></div>
                <div className="planInfo">
                  <h3>{barTitle}</h3>
                  <div className="reviewContainer">
                    <div className="stars">
                      <div>
                        <img src={require('./assets/stars-gray.png')} />
                      </div>
                      <div className="redStars" style={{ "width": `${barReview}%` }}>
                        <img src={require('./assets/stars-red.png')} />
                      </div>
                    </div>
                    <p className="reviewCount">{barReviews} reviews</p>
                  </div>
                  <p className="location">{barLocation}</p>
                </div>
              </div>
            </section>
            <section className="planRightContainer">
              <h2>Directions:</h2>
              <h4>To the event</h4>
              <iframe src={`https://www.google.com/maps/embed/v1/directions?key=${googleApiKey}&origin=${mapRestaurantLocation}&destination=${mapEventLocation}+${city}+${state}&mode=walking`} style={mapStyles} ></iframe>
              <h4>From the event</h4>
              <iframe src={`https://www.google.com/maps/embed/v1/directions?key=${googleApiKey}&origin=${mapEventLocation}+${city}+${state}&destination=${mapBarLocation}&mode=walking`} style={mapStyles} ></iframe>
            </section>
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
  user: state.user,
  location: state.location
});

export default connect(mapStateToProps)(Plan);