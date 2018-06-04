import React from 'react';
import ReactDOM from 'react-dom';
import { Plans } from './Plans';
import { Stop } from '../Stop/Stop';
import { shallow } from 'enzyme';
import { mockCleanRestaurantAndBar, mockDirtyRecentEvents } from '../../mockData';

describe('Plans', () => {
  let wrapper;

  beforeEach(() => {
    const mockSuggestedBarAndRestaurantData = mockCleanRestaurantAndBar;
    const mockSelectedEvent = mockDirtyRecentEvents.events;
  
    wrapper = shallow(<Plans 
      suggestedBars={mockSuggestedBarAndRestaurantData}
      suggestedRestaurants={mockSuggestedBarAndRestaurantData} 
      selectedEvent={mockSelectedEvent[0]}
      />);
  
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should returns plans when there are suggested bars and restaurants', () => { 
    wrapper.instance().getPlans();

    expect(wrapper.find('.planContainer').length).toEqual(1);
    expect(wrapper.find('Stop').length).toEqual(3);
  });
})

