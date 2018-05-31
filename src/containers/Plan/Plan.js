import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Plan extends Component {

  render() {
    const { name, rating, address, price, reviews, image, index } = this.props;
    const backgroundImage = {backgroundImage: "url(" + image + ")"};
    const className = `restaurant${index}`;

    return (
      <article className={className}  >
        <h2>{name}</h2>
        <p className="rating">{rating}</p>
        <p className="reviewCount">{reviews}</p>
        <p className="price">{price}</p>
        <p className="address">{address}</p>
        <div className="restaurantImage" style={backgroundImage}></div>
      </article>
    )
  }
}

export default Plan;