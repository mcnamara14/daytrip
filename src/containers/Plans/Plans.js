import React, { Component } from 'react';
import { connect } from 'react-redux';
import Plan from '../Plan/Plan';

export class Plans extends Component {

  render () {
    const plans = this.props.suggestedRestaurants.map(restaurant => {
      const { name, rating, address, price, review_count, image_url } = restaurant;

      return <Plan name={name} />
    })
    
    return (
      <div className="plans">
        { plans }
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  suggestedRestaurants: state.suggestedRestaurants
})

export default connect(mapStateToProps)(Plans)