import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Plan.css';

export class Plan extends Component {

  render() {
    const { title, rating, location, price, reviews, image, index, type } = this.props;
    const backgroundImage = {backgroundImage: "url(" + image + ")"};
    const className = `${type}-${index}`;
    const review = rating * 20;

    return (
      <article className={className}  >
        <h2>{title}</h2>
        <p className="rating">{rating}</p>
        <p className="reviewCount">{reviews}</p>
        { type === 'restaurant' ? 
        <div className="stars">
          <div>
            <img src={require('./assets/stars-gray.png')} />
          </div>
          <div className="goldStars" style={{ "width": `${review}%` }}>
            <img src={require('./assets/stars-gold.png')} />
          </div>
        </div> :
          null
        }
        <p className="price">{price}</p>
        <p className="location">{location}</p>
        <div className="restaurantImage" style={backgroundImage}></div>
      </article>
    )
  }
}

export default Plan;