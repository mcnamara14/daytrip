import React from 'react';
import './RecentEvent.css';

export const RecentEvent = (props) =>  {
  const backgroundImage = {backgroundImage: "url(" + props.image + ")"};

  return (
    <div className="recentEvent">
      <div className="eventImage" style={ backgroundImage } ></div>
      <div className="eventInfo">
        <h3>{props.title}</h3>
        <p className="price">{props.price}</p>
        <hr/>
        <p className="venue">{props.venue}</p>
        <p className="date">{props.date}</p>
        <button>Select</button>
      </div>
    </div>
  );
};

export default RecentEvent;