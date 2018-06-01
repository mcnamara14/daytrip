import React, { Component } from 'react';
import { connect } from 'react-redux';
import Plan from '../Plan/Plan';
import './Plans.css';

export class Plans extends Component {

  render () {
    let selectedEvent;
    let plans = [];

    if (this.props.suggestedBars.length && this.props.suggestedBars.length) {
      for (let i = 0; i < 3; i++) {
        const { title, image, venue, date } = this.props.selectedEvent;
        const eventPrice = this.props.selectedEvent.price;
        const planNum = i + 1;

        const barName = this.props.suggestedBars[i].name;
        const barRating = this.props.suggestedBars[i].rating;
        const barAddress = this.props.suggestedBars[i].address;
        const barPrice = this.props.suggestedBars[i].price;
        const barReviewCount = this.props.suggestedBars[i].review_count;
        const barImage = this.props.suggestedBars[i].image_url;

        const restaurantName = this.props.suggestedRestaurants[i].name;
        const restaurantRating = this.props.suggestedRestaurants[i].rating;
        const restaurantAddress = this.props.suggestedRestaurants[i].address;
        const restaurantPrice = this.props.suggestedRestaurants[i].price;
        const restaurantReviewCount = this.props.suggestedRestaurants[i].review_count;
        const restaurantImage = this.props.suggestedRestaurants[i].image_url;

        plans.push(<div key={i} className="planContainer">
          <h4>Plan {planNum}</h4>
          <section className="plan">
            <Plan title={restaurantName} rating={restaurantRating} location={restaurantAddress} price={restaurantPrice} reviews={restaurantReviewCount} image={restaurantImage} type={'restaurant'} index={planNum}/>
            <img src={require('./assets/route-img.jpg')} className="routeImg" />
            <Plan title={title} rating={''} location={venue} price={eventPrice} reviews={date} image={image} type={'event'} index={planNum}/>
            <img src={require('./assets/route-img.jpg')} className="routeImg" />
            <Plan title={barName} rating={barRating} location={barAddress} price={barPrice} reviews={barReviewCount} image={barImage} type={'bar'} index={planNum}/>
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

export default connect(mapStateToProps)(Plans)