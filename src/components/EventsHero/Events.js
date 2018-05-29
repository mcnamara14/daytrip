import React from 'react';
import './EventsHero.css';

export const EventsHero = () =>  {
  return (
    <div className="eventsHeroContainer">     
      <article className="eventsHeroTextBox">
        <h1>Rockies vs Reds</h1>
        <h4><span>Coors Field</span></h4>
        <button>Select Event</button>
      </article>
    </div>
  );
};

export default EventsHero;
