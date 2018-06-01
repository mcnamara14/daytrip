import React, { Component } from 'react';
import { connect } from 'react-redux';
import Plan from '../Plan/Plan';
import './Plans.css';

export class Plans extends Component {

  render () {
    const plans = this.props.suggestedRestaurants.map((restaurant, index) => {
      const { name, rating, address, price, review_count, image_url } = restaurant;
      const { title, image, eventPrice, venue, date } = this.props.selectedEvent;

      return (
        <section className="plan">
          <Plan title={title} rating={''} location={venue} price={eventPrice} reviews={date} image={image} index={index}/>
          <Plan title={name} rating={rating} location={address} price={price} reviews={review_count} image={image_url} index={index}/>
          </section>
      )
    })
    
    return (
      <section className="suggestedPlans">
        <div className="plansContainer">
          { plans }
        </div>
      </section>
    )
  }
}

export const mapStateToProps = (state) => ({
  suggestedRestaurants: state.suggestedRestaurants,
  selectedEvent: state.selectedEvent
})

export default connect(mapStateToProps)(Plans)