import React from 'react';
import ReactDOM from 'react-dom';
import { EventsSearch } from './EventsSearch';
import { shallow } from 'enzyme';
import moment from 'moment';
// jest.mock('moment', () => ({format: () => '2018–01–30T12:34:56+00:00'}));
import { mockDirtyRecentEvents, mockUser } from '../../mockData';
import { cleanRecentEventsSearch } from '../../dataCleaners/recentEventsSearchCleaner';
jest.mock('../../dataCleaners/recentEventsSearchCleaner');
import { fetchRecentEventsOnSearch } from '../../apiCalls';
jest.mock('../../apiCalls');


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

  // Cant figure out how to mock moment.js format method

  describe('fetchEvents', () => {
    // it('should call fetchRecentEventsOnSearch with the correct arguments if a location is entered', async () => {
    //   const wrapper = shallow(<EventsSearch user={mockUser} />);
    //   wrapper.setState({
    //     city: 'Boulder', 
    //     state: 'CO',
    //     startDate: '062018'
    //   });

    //   wrapper.instance().fetchEvents('rockies');
    //   const result = await fetchRecentEventsOnSearch();

    //   expect(fetchRecentEventsOnSearch).toHaveBeenCalledWith(0)
    // })

    it('should call handleMissingLocationError when there is no location', () => {
      const wrapper = shallow(<EventsSearch user={mockUser} />);

      wrapper.setState({
        city: '', 
        state: '',
        startDate: '062018'
      });

      wrapper.instance().handleMissingLocationError = jest.fn();

      const result = wrapper.instance().handleMissingLocationError

      wrapper.instance().fetchEvents('rockies');

      expect(result).toHaveBeenCalled();
    })
  });


});
