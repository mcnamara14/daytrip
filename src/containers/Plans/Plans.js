import React, { Component } from 'react';
import { connect } from 'react-redux';
import Plan from '../Plan/Plan';
import './Plans.css';
import PropTypes from 'prop-types';

export class Plans extends Component {

  render () {
    let plans = [];

    if (this.props.suggestedBars.length && this.props.suggestedBars.length) {
      for (let i = 0; i < 3; i++) {
        const { 
          name: restaurantName, 
          rating: restaurantRating, 
          address: restaurantAddress, 
          price: restaurantPrice, 
          review_count: restaurantReviewCount , 
          image_url: restaurantImage 
        } = this.props.suggestedRestaurants[i];
        const { 
          name: barName, 
          rating: barRating, 
          address: barAddress, 
          price: barPrice, 
          review_count: barReviewCount, 
          image_url: barImage 
        } = this.props.suggestedBars[i];
        const { 
          title, 
          image, 
          venue, 
          date } = this.props.selectedEvent;
        const eventPrice = this.props.selectedEvent.price;
        const planNum = i + 1;

        plans.push(<div key={i} className="planContainer">
          <h4>Plan {planNum}</h4>
          <section className="plan">
            <Plan 
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
            <Plan 
              title={title} 
              rating={''} 
              location={venue} 
              price={eventPrice} 
              reviews={date} 
              image={image} 
              type={'event'} 
              index={planNum}
            />
            <img src={require('./assets/route-img.jpg')} className="routeImg" />
            <Plan 
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
          <button>Select Plan</button>
        </div>);
      }
    }

    return (
      <section className="suggestedPlans">
        <div className="plansContainer">
          <h3>Suggested Plan</h3>
          { plans.length ? plans : null }
        </div>
      </section>
    )
  }
}

export const mapStateToProps = (state) => ({
  suggestedRestaurants: state.suggestedRestaurants,
  suggestedBars: state.suggestedBars,
  selectedEvent: state.selectedEvent
})

export default connect(mapStateToProps)(Plans);