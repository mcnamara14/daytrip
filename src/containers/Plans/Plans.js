import React, { Component } from 'react';
import { connect } from 'react-redux';
import Plan from '../Plan/Plan';
import './Plans.css';

export class Plans extends Component {
  render () {
    const plans = this.props.suggestedRestaurants.map((restaurant, index) => {
      const { name, rating, address, price, review_count, image_url } = restaurant;

      return <Plan name={name} rating={rating} address={address} price={price} reviews={review_count} image={image_url} index={index}/>
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
  suggestedRestaurants: state.suggestedRestaurants
})

export default connect(mapStateToProps)(Plans)