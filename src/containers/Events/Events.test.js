import React from 'react';
import ReactDOM from 'react-dom';
import { Events } from './Events';
import { shallow } from 'enzyme';
import { mockCleanRecentEvents, mockCleanRestaurantAndBar } from '../../mockData';
import SelectedEvent from '../SelectedEvent/SelectedEvent';
import Plans from '../Plans/Plans';

describe('Events', () => {
  let wrapper;
  let mockEvents;
  let mockSuggestedRestaurants;
  let mockSuggestedBars;
  let mockSelectedEvent;

  beforeEach(() => {
    mockEvents = mockCleanRecentEvents.events;
    mockSuggestedRestaurants = mockCleanRestaurantAndBar;
    mockSuggestedBars = mockCleanRestaurantAndBar;
    mockSelectedEvent = mockCleanRecentEvents.events
 
    wrapper = 
      shallow(<Events 
        events={mockEvents} 
        suggestedRestaurants={mockSuggestedRestaurants}
        suggestedBars={mockSuggestedBars}
        selectedEvent={mockSelectedEvent[0]}
      />);
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render a SelectedEvent component when an event is selected', () => {
    expect(wrapper.find(SelectedEvent).length).toEqual(1);
  })

  it('should recent recent events when no SelectedEvent is present', () => {
    mockSelectedEvent = '';
    wrapper = 
    shallow(<Events 
      events={mockEvents} 
      suggestedRestaurants={mockSuggestedRestaurants}
      suggestedBars={mockSuggestedBars}
      selectedEvent={mockSelectedEvent[0]}
    />);

    expect(wrapper.find('.recentEvents').length).toEqual(1);
  })

  it('should render a Plans container when an there are suggested bars and restaurants', () => {
    expect(wrapper.find(Plans).length).toEqual(1);
  })

  it('should not render a Plans container when an there are nop suggested bars and restaurants', () => {
    mockSuggestedBars = [];
    wrapper = 
    shallow(<Events 
      events={mockEvents} 
      suggestedRestaurants={mockSuggestedRestaurants}
      suggestedBars={mockSuggestedBars}
      selectedEvent={mockSelectedEvent[0]}
    />);

    expect(wrapper.find(Plans).length).toEqual(0);
  })
});
