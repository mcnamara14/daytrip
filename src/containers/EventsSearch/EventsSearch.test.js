import React from 'react';
import ReactDOM from 'react-dom';
import { EventsSearch } from './EventsSearch';
import { shallow } from 'enzyme';
import moment from 'moment';
// jest.mock('moment', () => ({format: () => '2018–01–30T12:34:56+00:00'}));
import { mockDirtyRecentEvents, mockUser } from '../../mockData';
import { cleanRecentEventsSearch } from '../../dataCleaners/recentEventsSearchCleaner';
jest.mock('../../dataCleaners/recentEventsSearchCleaner');
import { fetchRecentEventsOnSearch, fetchSelectedEvent } from '../../apiCalls';
jest.mock('../../apiCalls/ticketmasterApiCalls');
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

  describe('onSelect', () => {
    it('should set state of selected option', () => {
      const wrapper = shallow(<EventsSearch user={mockUser} />);
      const expectedOption = {
        id: "Z7r9jZ1AeuAuo",
        label: "T-Swift Pepsi Center2018-08-07 7:00"
      }

      wrapper.instance().onSelect(expectedOption)

      expect(wrapper.state('selectedOption')).toEqual(expectedOption)
    })
  })

  describe('handleMissingLocationError', () => {
    it('should set state of location error to true then to false 2 secs later', () => {
      jest.useFakeTimers();
      const wrapper = shallow(<EventsSearch user={mockUser} />);

      wrapper.instance().handleMissingLocationError();

      expect(wrapper.state().locationError).toEqual(true);

      wrapper.update();
      jest.runAllTimers();

      expect(wrapper.state().locationError).toEqual(false);
    })
  })

  // How do you mock implement fetchSelectedEvent?

  // describe('handleStoreEvent', () => {
  //   it('should call fetchSelectedEvent with the correct argument', async () => { 
  //     const mockOption = {
  //       id: 'Z7r9jZ1AeuAuo',
  //       label: 'T-Swift Pepsi Center2018-08-07 7:00'
  //     }
  //     const wrapper = shallow(<EventsSearch user={mockUser} />);
  //     wrapper.setState({
  //       selectedOption: mockOption
  //     });

  //     const result = fetchSelectedEvent('Z7r9jZ1AeuAuo')

  //     await wrapper.instance().handleStoreEvent();

  //     expect(result).toHaveBeenCalledWith(0);
  //   })
  // })

  describe('onDropdownSelect', () => {
    let wrapper;
    let mockComponent;

    beforeEach(() => {
      wrapper = shallow(<EventsSearch user={mockUser} toggleLocation={jest.fn()} />);

      mockComponent = {
        autocomplete: {
          getPlace: jest.fn().mockImplementation(() => ({
            vicinity: 'Denver',
            address_components: [
              {long_name: 'Colorado'},
              {short_name: 'COLORADO'},
              {short_name: 'CO'}
            ]
          }))
        }
      }
    })

    it('should set state of city, state, and selectedOption', () => {


      wrapper.instance().onDropdownSelect(mockComponent);

      expect(wrapper.state('city')).toEqual('Denver');
      expect(wrapper.state('state')).toEqual('CO');
      expect(wrapper.state('selectedOption')).toEqual('');
    })

    it('should call toggleLocation', () => {
      wrapper.instance().onDropdownSelect(mockComponent);

      expect(wrapper.instance().props.toggleLocation).toHaveBeenCalled();
    });
  })

});
