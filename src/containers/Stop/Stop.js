import React, { Component } from 'react';
import './Stop.css';
import PropTypes from 'prop-types';

export class Stop extends Component {

  render() {
    const { 
      title, 
      rating, 
      location, 
      price, 
      reviews, 
      image, 
      index, 
      type 
    } = this.props;
    const backgroundImage = {backgroundImage: "url(" + image + ")"};
    const className = `${type}-${index} ${type}Stop`;
    const review = rating * 20;

    return (
      <article className={className}  >
        <div className="stopImage" style={backgroundImage}></div>
        <div className="stopInfo">
          <div className="stopHeader">
            <h2>{title}</h2>
            { type === 'restaurant' || type === 'bar' ?
              <div className="reviewContainer">
                <div className="stars">
                  <div>
                    <img src={require('./assets/stars-gray.png')} alt="Stars gray"/>
                  </div>
                  <div className="redStars" style={{ "width": `${review}%` }}>
                    <img src={require('./assets/stars-red.png')} alt="Stars red"/>
                  </div>
                </div>
                <p className="reviewCount">{reviews} reviews</p>
              </div> :
              null
            }
          </div>
          { type === 'event' ? 
            <div className="stopInfo">
              <div className="location">
                <img src={require('./assets/location-marker.png')} alt="Location marker icon"/>
                {location} 
              </div>
              <div className="stopPrice">
                <img src={require('./assets/price-tag.png')} alt="Price tag icon"/>
                {price} 
              </div>
            </div>  :
            <div className="stopInfo">
              <div className="location">
                <img src={require('./assets/location-marker.png')} alt="Location marker icon"/>
                {location} 
              </div>
              <div className="stopPrice">
                <img src={require('./assets/price-tag.png')} alt="Price tag icon"/>
                {price} 
              </div>
            </div> 
          }
        </div>
      </article>
    );
  }
}

Stop.propTypes = {
  title: PropTypes.string,
  rating: PropTypes.string,
  location: PropTypes.string,
  price: PropTypes.string,
  reviews: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.string,
  type: PropTypes.string
};

export default Stop;