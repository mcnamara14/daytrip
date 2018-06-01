import React, { Component } from 'react';
import { connect } from 'react-redux';
import Plan from '../Plan/Plan';
import './Plans.css';

export class Plans extends Component {

  render () {
    const plans = this.props.suggestedRestaurants.map((restaurant, index) => {
      const { name, rating, address, price, review_count, image_url } = restaurant;
      const { title, image, venue, date } = this.props.selectedEvent;
      const eventPrice = this.props.selectedEvent.price;
      const planNum = index + 1;

      return (
        <div key={index} className="planContainer">
          <h4>Plan {planNum}</h4>
          <section className="plan">
            <Plan title={name} rating={rating} location={address} price={price} reviews={review_count} image={image_url} type={'restaurant'} index={planNum}/>
            <img src={require('./assets/route-img.jpg')} className="routeImg" />
            <Plan title={title} rating={''} location={venue} price={eventPrice} reviews={date} image={image} type={'event'} index={planNum}/>
            <img src={require('./assets/route-img.jpg')} className="routeImg" />
            <Plan title={name} rating={rating} location={address} price={price} reviews={review_count} image={image_url} type={'restaurant'} index={planNum}/>
          </section>
          <button>Select Plan</button>
        </div>
      )
    })
    
    return (
      <section className="suggestedPlans">
        <div className="plansContainer">
          <h3>Suggested Plan</h3>
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