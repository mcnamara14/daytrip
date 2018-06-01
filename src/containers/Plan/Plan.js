import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Plan.css';

export class Plan extends Component {

  render() {
    const { title, rating, location, price, reviews, image, index, type } = this.props;
    const backgroundImage = {backgroundImage: "url(" + image + ")"};
    const className = `${type}-${index}`;

    return (
      <article className={className}  >
        <h2>{title}</h2>
        <p className="rating">{rating}</p>
        <p className="reviewCount">{reviews}</p>
        <p className="price">{price}</p>
        <p className="location">{location}</p>
        <div className="restaurantImage" style={backgroundImage}></div>
      </article>
    )
  }
}

export default Plan;