import React from 'react';
import ReactDOM from 'react-dom';
import { EventsSearch } from './EventsSearch';
import { shallow } from 'enzyme';
import { mockDirtyRecentEvents, mockUser } from '../../mockData';
import { cleanRecentEventsSearch } from '../../dataCleaners/recentEventsSearchCleaner';
jest.mock('../../dataCleaners/recentEventsSearchCleaner');


describe('EventsSearch', () => {
  it('should match the snapshot', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        _embedded:
        mockDirtyRecentEvents
      })
    }));
    const mockEvents = mockDirtyRecentEvents.events;
    const wrapper = shallow(<EventsSearch events={mockEvents} user={mockUser} />);
    expect(wrapper).toMatchSnapshot();
  });


  describe('handleChange', () => {
    it('should set data in state to selected date', () => {
      const wrapper = shallow(<EventsSearch user={mockUser} />);
      
      wrapper.instance().handleChange('062018');

      const expected = '062018';
      expect(wrapper.state('startDate')).toEqual(expected)
    })
  });
})
