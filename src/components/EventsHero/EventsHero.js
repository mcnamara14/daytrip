import React from 'react';
import './EventsHero.css';

export const EventsHero = () =>  {
  return (
    <div className="eventsHeroContainer">     
      <article className="eventsHeroTextBox">
        <h1>We plan your day for you</h1>
        <h4>
          <span>
            Select an event. Choose a type of restaurant and bar. 
            We will do the rest.
          </span>
        </h4>
        {/* <button>Select Event</button> */}
      </article>
    </div>
  );
};

export default EventsHero;
