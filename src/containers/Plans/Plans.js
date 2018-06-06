import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Plans.css';
import Stop from '../Stop/Stop';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import 'firebase/database';
import { withRouter } from 'react-router-dom';

export class Plans extends Component {
  selectPlan = (
    restaurantId,
    restaurantName, 
    restaurantRating, 
    restaurantAddress, 
    restaurantPrice, 
    restaurantReviewCount, 
    restaurantImage,
    barId,
    barName, 
    barRating, 
    barAddress, 
    barPrice, 
    barReviewCount, 
    barImage,
    id,
    title, 
    image, 
    venue, 
    date,
    eventPrice,
    planNum,
    url
  ) => {
    let firebaseLocation;
    const firebaseRef = firebase.database().ref();

    this.props.user.userId !== null ? firebaseLocation = firebaseRef.child('users').child(this.props.user.userId).child('selectedPlan') :
      firebaseLocation = firebaseRef.child('users').child('anonymous').child('selectedPlan');

    firebaseLocation.update(
      {
        restaurant: {
          id: restaurantId,
          title: restaurantName,
          rating: restaurantRating,
          location: restaurantAddress, 
          price: restaurantPrice, 
          reviews: restaurantReviewCount, 
          image: restaurantImage, 
          type: 'restaurant', 
          index: planNum
        },
        bar: {
          id: barId,
          title: barName,
          rating: barRating,
          location: barAddress, 
          price: barPrice,
          reviews: barReviewCount,
          image: barImage,
          type: 'bar' ,
          index: planNum
        },
        event: {
          id: id, 
          title: title, 
          rating: 0, 
          location: venue, 
          price: eventPrice, 
          reviews: date, 
          image: image, 
          type: 'event', 
          index: planNum,
          tickets: url
        }
      }
    );

    this.props.history.push('/plan');
  }

  getPlans = () => {
    const { 
      suggestedBars, 
      suggestedRestaurants, 
      selectedEvent 
    } = this.props;
    let plans = [];

    if (suggestedBars.length && suggestedRestaurants.length) {
      for (var i = 0; i < this.props.suggestedBars.length; i++) {
        const { 
          id: restaurantId,
          name: restaurantName, 
          rating: restaurantRating, 
          address: restaurantAddress, 
          price: restaurantPrice, 
          review_count: restaurantReviewCount, 
          image_url: restaurantImage 
        } = this.props.suggestedRestaurants[i];
        const { 
          id: barId,
          name: barName, 
          rating: barRating, 
          address: barAddress, 
          price: barPrice, 
          review_count: barReviewCount, 
          image_url: barImage 
        } = this.props.suggestedBars[i];
        const { 
          id,
          title, 
          image, 
          venue, 
          date,
          url } = this.props.selectedEvent;
        const eventPrice = selectedEvent.price;
        const planNum = i + 1;

        plans.push(<div key={i} className="planContainer">
          <h4>Plan {i + 1}</h4>
          <section className="plan">
            <Stop 
              id={restaurantId}
              title={restaurantName} 
              rating={restaurantRating} 
              location={restaurantAddress} 
              price={restaurantPrice} 
              reviews={restaurantReviewCount} 
              image={restaurantImage} 
              type={'restaurant'} 
              index={planNum}
            />
            <img src={require('./assets/route-img.jpg')} className="routeImg" />
            <Stop
              id={id} 
              title={title} 
              rating={0} 
              location={venue} 
              price={eventPrice} 
              reviews={date} 
              image={image} 
              type={'event'} 
              index={planNum}
            />
            <img src={require('./assets/route-img.jpg')} className="routeImg" />
            <Stop 
              id={barId}
              title={barName} 
              rating={barRating} 
              location={barAddress} 
              price={barPrice} 
              reviews={barReviewCount} 
              image={barImage} 
              type={'bar'} 
              index={planNum}
            />
          </section>
          <button onClick={() => this.selectPlan(
            restaurantId,
            restaurantName, 
            restaurantRating, 
            restaurantAddress, 
            restaurantPrice, 
            restaurantReviewCount, 
            restaurantImage,
            barId,
            barName, 
            barRating, 
            barAddress, 
            barPrice, 
            barReviewCount, 
            barImage,
            id,
            title, 
            image, 
            venue, 
            date,
            eventPrice,
            planNum,
            url
          )}>Select Plan</button>
        </div>);
      }
    }

    return plans;
  }

  render () {
    const { suggestedBars, suggestedRestaurants } = this.props;

    return (
      <section className="suggestedPlans">
        <div className="plansContainer">
          <h3>Suggested Plan</h3>
          { suggestedBars.length && suggestedRestaurants.length ? 
            this.getPlans() : null }
        </div>
      </section>
    );
  }
}

Plans.propTypes = {
  suggestedRestaurants: PropTypes.array,
  suggestedBars: PropTypes.array,
  selectedEvent: PropTypes.object
};

Stop.propTypes = {
  rating: PropTypes.number,
  selectedEvent: PropTypes.object
};

export const mapStateToProps = (state) => ({
  suggestedRestaurants: state.suggestedRestaurants,
  suggestedBars: state.suggestedBars,
  selectedEvent: state.selectedEvent,
  user: state.user
});

export default withRouter(connect(mapStateToProps)(Plans));