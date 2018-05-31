import React from 'react';
import './RecentEvent.css';

export const RecentEvent = (props) =>  {
  const backgroundImage = {backgroundImage: "url(" + props.image + ")"};

  return (
    <div className="recentEvent">
      <div className="eventInfo">
        <div className="recentTitle">
          <h3>{props.title}</h3>
        </div>
        <p className="venue">{props.venue}</p>
        <p className="date">{props.date}</p>
        <hr/>
        <p className="price">{props.price}</p>
      </div>
      <div className="eventImage" style={ backgroundImage } ></div>
      <button>Select</button>
    </div>
  );
};

export default RecentEvent;