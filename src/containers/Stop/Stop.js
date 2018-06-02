import React, { Component } from 'react';
import './Stop.css';

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
    const className = `${type}-${index}`;
    const review = rating * 20;

    return (
      <article className={className}  >
        <div className="stopInfo">
          <h2>{title}</h2>
          <p className="location">{location}</p>
          { type === 'restaurant' || type === 'bar' ?
            <div className="reviewContainer">
              <div className="stars">
                <div>
                  <img src={require('./assets/stars-gray.png')} />
                </div>
                <div className="redStars" style={{ "width": `${review}%` }}>
                  <img src={require('./assets/stars-red.png')} />
                </div>
              </div>
              <p className="reviewCount">{reviews} reviews</p>
            </div> :
            null
          }
          <p className="price">{price}</p>
        </div>
        <div className="stopImage" style={backgroundImage}></div>
      </article>
    );
  }
}

export default Stop;