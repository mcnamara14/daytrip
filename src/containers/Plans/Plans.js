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
    restaurantPhone,
    barId,
    barName, 
    barRating, 
    barAddress, 
    barPrice, 
    barReviewCount, 
    barImage,
    barPhone,
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

    this.props.user.userId !== null ? 
      firebaseLocation = firebaseRef.child('users')
        .child(this.props.user.userId).child('selectedPlan') :
      firebaseLocation = firebaseRef.child('users')
        .child('anonymous').child('selectedPlan');

    firebaseLocation.update(
      {
        restaurant: {
          id: restaurantId,
          title: restaurantName,
          rating: restaurantRating,
          location: restaurantAddress, 
          price: restaurantPrice, 
          reviews: restaurantReviewCount,
          phone: restaurantPhone, 
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
          phone: barPhone,
          image: barImage,
          type: 'bar',
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
      for (var index = 0; index < this.props.suggestedBars.length; index++) {
        const { 
          id: restaurantId,
          name: restaurantName, 
          rating: restaurantRating, 
          address: restaurantAddress, 
          price: restaurantPrice, 
          review_count: restaurantReviewCount, 
          image_url: restaurantImage,
          display_phone: restaurantPhone 
        } = this.props.suggestedRestaurants[index];
        const { 
          id: barId,
          name: barName, 
          rating: barRating, 
          address: barAddress, 
          price: barPrice, 
          review_count: barReviewCount, 
          image_url: barImage,
          display_phone: barPhone  
        } = this.props.suggestedBars[index];
        const { 
          id,
          title, 
          image, 
          venue, 
          date,
          url } = this.props.selectedEvent;
        const eventPrice = selectedEvent.price;
        const planNum = index + 1;

        plans.push(<div key={index} className="planContainer">
          { index === 0 ? <h4 className="suggestedPlan">Suggested Plan</h4> : <h4>Plan {index + 1}</h4> }
          <section className="planWrap">
            <div className="plan">
              <Stop 
                id={restaurantId}
                title={restaurantName} 
                rating={restaurantRating} 
                location={restaurantAddress} 
                price={restaurantPrice} 
                reviews={restaurantReviewCount} 
                image={restaurantImage}
                phone={restaurantPhone}
                type={'restaurant'} 
                index={planNum}
              />
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
              <Stop 
                id={barId}
                title={barName} 
                rating={barRating} 
                location={barAddress} 
                price={barPrice} 
                reviews={barReviewCount} 
                image={barImage} 
                phone={barPhone}
                type={'bar'} 
                index={planNum}
              />
            </div>
            <img src={require('./assets/plan-route-hr.png')} alt="Plan route line" className="planRouteHr"/>
          </section>
          <button onClick={() => this.selectPlan(
            restaurantId,
            restaurantName, 
            restaurantRating, 
            restaurantAddress, 
            restaurantPrice, 
            restaurantReviewCount, 
            restaurantImage,
            restaurantPhone,
            barId,
            barName, 
            barRating, 
            barAddress, 
            barPrice, 
            barReviewCount, 
            barImage,
            barPhone,
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
    const { date } = this.props.selectedEvent;

    return (
      <section className="suggestedPlans">
        <div className="plansContainer">
          <h3>Your choices for {date}</h3>
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
  selectedEvent: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object
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