import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Plans.css';
import Stop from '../Stop/Stop';
import PropTypes from 'prop-types';

export class Plans extends Component {
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
          name: restaurantName, 
          rating: restaurantRating, 
          address: restaurantAddress, 
          price: restaurantPrice, 
          review_count: restaurantReviewCount, 
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
        const eventPrice = selectedEvent.price;
        const planNum = i + 1;

        plans.push(<div key={i} className="planContainer">
          <h4>Plan</h4>
          <section className="plan">
            <Stop 
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
            <Stop 
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

export const mapStateToProps = (state) => ({
  suggestedRestaurants: state.suggestedRestaurants,
  suggestedBars: state.suggestedBars,
  selectedEvent: state.selectedEvent
});

export default connect(mapStateToProps)(Plans);