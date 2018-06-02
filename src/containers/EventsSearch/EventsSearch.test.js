import React from 'react';
import ReactDOM from 'react-dom';
import { EventsSearch } from './EventsSearch';
import { shallow } from 'enzyme';
import { mockDirtyRecentEvents, mockUser } from '../../mockData';
import { cleanRecentEventsSearch } from '../../dataCleaners/recentEventsSearchCleaner';
jest.mock('../../dataCleaners/recentEventsSearchCleaner');


describe('EventsSearch', () => {
  let wrapper;

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        _embedded:
        mockDirtyRecentEvents
      })
    }));
  })
  it('should match the snapshot', () => {
    const mockEvents = mockDirtyRecentEvents.events;
    wrapper = shallow(<EventsSearch events={mockEvents} user={mockUser} />);
    expect(wrapper).toMatchSnapshot();
  });
})
