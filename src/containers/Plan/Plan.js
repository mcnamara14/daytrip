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
    };
  }

  componentDidMount() {
    let firebaseDb;

    if (this.props.user.userId !== null) {
      firebaseDb = 
        firebase.database().ref().child('users')
          .child(this.props.user.userId).child('selectedPlan');
    } else {
      firebaseDb = firebase.database().ref().child('users')
        .child('anonymous').child('selectedPlan');
    }

    firebaseDb.once('value')
      .then((snapshot) => {
        return snapshot.val();
      }).then(selectedPlan => 
        this.setState({selectedPlan}));
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
        phone: restaurantPhone
      } = restaurant;

      const {
        image: barImage,
        title: barTitle,
        location: barLocation,
        rating: barRating,
        reviews: barReviews,
        phone: barPhone
      } = bar;

      const {
        image: eventImage,
        title: eventTitle,
        location: eventLocation,
        price: eventPrice,
        reviews: eventDate,
        tickets
      } = event;

      if (this.props.location) {
        city = this.props.location.city;
        state = this.props.location.state;
      } else {
        city = this.props.user.city;
        state = this.props.user.state;
      }

      const restaurantBgImage = 
        {backgroundImage: "url(" + restaurantImage + ")"};
      const eventBgImage = {backgroundImage: "url(" + eventImage + ")"};
      const barBgImage = {backgroundImage: "url(" + barImage + ")"};

      const restaurantReview = restaurantRating * 20;
      const barReview = barRating * 20;
      const mapRestaurantLocation = 
        restaurantLocation.replace(/\s+/g, '+').toLowerCase().replace(',', '');
      const mapEventLocation = 
        eventLocation.replace(/\s+/g, '+').toLowerCase().replace(',', '');
      const mapBarLocation = 
        barLocation.replace(/\s+/g, '+').toLowerCase().replace(',', '');

      const mapStyles = {
        height: '400px',
        border: '0',
        borderRadius: '5px'
      };

      return (
        <section className="planMain">
          <div className="planHeader" style={eventBgImage}>
            <div className="planHeaderInfo">
              <h1>{eventTitle}</h1>
              <p>@ {eventLocation}</p>
            </div>
          </div>
          <div className="planMap">
            <div className="planIntro">
              <h2>Your day is set.</h2>
              <p>Below is the plan for your day including a link to purchase tickets and contact info for each stop.</p>
            </div>
            <iframe src={`https://www.google.com/maps/embed/v1/directions?key=${googleApiKey}&origin=${mapRestaurantLocation}&destination=${mapEventLocation}+${city}+${state}&mode=walking`} style={mapStyles} title="toEvent"></iframe>
          </div>
          <div className="planWrapper">
            <section className="planLeftContainer">
              <h1>Your plan</h1>
              <h3>Before</h3>
              <div className="planStop">
                <div className="planImages">
                  <div className="planImage" style={restaurantBgImage}></div>
                </div>
                <section className="planInfoContainer">
                  <div className="planInfo">
                    <div className="nameLocation">
                      <h3>{restaurantTitle}</h3>
                      <div className="reviewContainer">
                        <div className="stars">
                          <div>
                            <img src={require('./assets/stars-gray.png')} alt="Gray stars"/>
                          </div>
                          <div 
                            className="redStars" 
                            style={{ "width": `${restaurantReview}%` }}>
                            <img src={require('./assets/stars-red.png')} alt="Gold stars"/>
                          </div>
                        </div>
                        <p className="reviewCount">{restaurantReviews} reviews</p>
                      </div>
                      <p className="planLocation">{restaurantLocation}</p>
                    </div>
                    <div className="contactInfo">
                      <h4>Menu <img src={require('./assets/menu-icon.png')} alt="Menu icon"/></h4>
                      <a href={`https://www.google.com/maps/dir//${mapEventLocation}+${city}+${state}`} target="_blank"><h4>Directions <img src={require('./assets/directions-icon.png')} alt="Directions icon"/></h4></a>
                      <h4>{restaurantPhone} <img src={require('./assets/contact-icon.png')} alt="Contact icon"/></h4>
                    </div>
                  </div>
                </section>
              </div>
              <h3>Event</h3>
              <div className="planStop">
                <div className="planImages">
                  <div className="planImage" style={eventBgImage}></div>
                </div>
                <section className="planInfoContainer">
                  <div className="planInfo planEvent">
                    <h3>{eventTitle}</h3>
                    <p className="eventPrice">{eventPrice}</p>
                    <p className="planLocation">{eventLocation}</p>
                    <p className="eventDate">{eventDate}</p>
                    <a 
                      href={tickets} 
                      className="eventTickets" 
                      target="_blank">Purchase Tickets
                    </a>
                  </div>
                </section>
              </div>
              <h3>After</h3>
              <div className="planStop">
                <div className="planImages">
                  <div className="planImage" style={barBgImage}></div>
                </div>
                <section className="planInfoContainer">
                  <div className="planInfo">
                    <div className="nameLocation">
                      <h3>{barTitle}</h3>
                      <div className="reviewContainer">
                        <div className="stars">
                          <div>
                            <img src={require('./assets/stars-gray.png')} alt="Gray stars"/>
                          </div>
                          <div 
                            className="redStars" 
                            style={{ "width": `${barReview}%` }}>
                            <img src={require('./assets/stars-red.png')} alt="Gold stars"/>
                          </div>
                        </div>
                        <p className="reviewCount">{barReviews} reviews</p>
                      </div>
                      <p className="planLocation">{barLocation}</p>
                    </div>
                    <div className="contactInfo">
                      <h4>Menu <img src={require('./assets/menu-icon.png')} alt="Menu icon"/></h4>
                      <a href={`https://www.google.com/maps/dir//${mapEventLocation}+${city}+${state}`} target="_blank"><h4>Directions <img src={require('./assets/directions-icon.png')} alt="Directions icon"/></h4></a>
                      <h4>{barPhone} <img src={require('./assets/contact-icon.png')} alt="Contact icon"/></h4>
                    </div>
                  </div>
                </section>
              </div>
            </section>
            {/* <h2>Directions</h2>
              <h4>To the event</h4>
              <iframe src={`https://www.google.com/maps/embed/v1/directions?key=${googleApiKey}&origin=${mapRestaurantLocation}&destination=${mapEventLocation}+${city}+${state}&mode=walking`} style={mapStyles} title="toEvent"></iframe>
              <h4>From the event</h4>
              <iframe src={`https://www.google.com/maps/embed/v1/directions?key=${googleApiKey}&origin=${mapEventLocation}+${city}+${state}&destination=${mapBarLocation}&mode=walking`} style={mapStyles} title="fromEvent"></iframe> */}
          </div>
        </section>
      ); 
    } else {
      return <h1>Selected a plan</h1>;
    }
  }
}

Plan.propTypes = {
  suggestedRestaurants: PropTypes.array,
  user: PropTypes.object,
  location: PropTypes.object
};

export const mapStateToProps = (state) => ({
  suggestedRestaurants: state.suggestedRestaurants,
  suggestedBars: state.suggestedBars,
  selectedEvent: state.selectedEvent,
  user: state.user,
  location: state.location
});

export default connect(mapStateToProps)(Plan);