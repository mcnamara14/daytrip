import React from 'react';
import ReactDOM from 'react-dom';
import { Plans } from './Plans';
import { shallow } from 'enzyme';
import { mockCleanRestaurantAndBar, mockDirtyRecentEvents } from '../../mockData';

it('should match the snapshot', () => {
  const mockSuggestedBarAndRestaurantData = mockCleanRestaurantAndBar;
  const mockSelectedEvent = mockDirtyRecentEvents.events;

  const wrapper = shallow(<Plans 
    suggestedBars={mockSuggestedBarAndRestaurantData}
    suggestedRestaurants={mockSuggestedBarAndRestaurantData} 
    selectedEvent={mockSelectedEvent}
    />);

  expect(wrapper).toMatchSnapshot();
});
