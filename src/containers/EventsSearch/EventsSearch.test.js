import React from 'react';
import ReactDOM from 'react-dom';
import { EventsSearch, mapDispatchToProps } from './EventsSearch';
import { shallow } from 'enzyme';
import moment from 'moment';
import { mockDirtyRecentEvents, mockUser } from '../../mockData';
import { cleanRecentEventsSearch } from '../../dataCleaners/recentEventsSearchCleaner';
jest.mock('../../dataCleaners/recentEventsSearchCleaner');
import * as fetchCalls from '../../apiCalls';
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

  describe('fetchEvents', () => {
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

  describe('handleStoreEvent', () => {
    let wrapper;
    let mockOption;

    beforeEach(() => {
      mockOption = {
        id: 'Z7r9jZ1AeuAuo',
        label: 'T-Swift Pepsi Center2018-08-07 7:00'
      }

      wrapper = shallow(<EventsSearch user={mockUser} storeSelectedEvent={jest.fn()} />);

      fetchCalls.fetchSelectedEvent.mockImplementation(() => ([
        {mockOption}
      ]))
    })
    it('should call fetchSelectedEvent with the correct argument', async () => { 
      wrapper.setState({
        selectedOption: mockOption
      });

      const result = fetchCalls.fetchSelectedEvent

      await wrapper.instance().handleStoreEvent();

      expect(result).toHaveBeenCalledWith('Z7r9jZ1AeuAuo');
    })

    it('should call storeSelectedEvent with the correct argument', async () => { 
      const result = wrapper.instance().props.storeSelectedEvent
      
      await wrapper.instance().handleStoreEvent();

      const expected = {
        "mockOption": {
          "id": "Z7r9jZ1AeuAuo", 
          "label": "T-Swift Pepsi Center2018-08-07 7:00"
        }
      }

      expect(result).toHaveBeenCalledWith(expected);
    })
  })

  describe('onDropdownSelect', () => {
    let wrapper;
    let mockComponent;

    beforeEach(() => {
      wrapper = shallow(<EventsSearch 
        user={mockUser} 
        toggleLocationError={jest.fn()} 
        toggleLocation={jest.fn()}
      />);

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

  describe('componentWillMount', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<EventsSearch user={mockUser} eventError={true} />);
    })

    it('should set state to users information when a user is signed in', () => {
      expect(wrapper.state('city')).toEqual('San Diego');
      expect(wrapper.state('state')).toEqual('CA');
      expect(wrapper.state('selectedOption')).toEqual('San Diego,CA');
    })

    it('should not set state to users information when a user is not signed in', () => {
      const mockUser = {
        userId: null,
        city: '',
        state: ''
      }
      wrapper = shallow(<EventsSearch user={mockUser} eventError={true} />);

      expect(wrapper.state('city')).toEqual('');
      expect(wrapper.state('state')).toEqual('');
      expect(wrapper.state('selectedOption')).toEqual('Enter a location');
    })
  });

  describe('return functionality', () => {
    it('should render an errorPopup when eventsError in store is true', () => {
      const wrapper = shallow(<EventsSearch user={mockUser} eventError={true} />);

      expect(wrapper.find('.errorPopup').length).toEqual(1);
    })
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the correct params on storeSelectedEvent', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockEvent = mockDirtyRecentEvents.events[0];
      const mockAction = {
        type: 'STORE_SELECTED_EVENT',
        event: mockEvent
      };

      mappedProps.storeSelectedEvent(mockEvent);

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('should call dispatch with the correct params on toggleLocation', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'TOGGLE_LOCATION',
        city: 'San Diego',
        state: 'CA'
      };

      mappedProps.toggleLocation('San Diego', 'CA');

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  })

  it('should call dispatch with the correct params on toggleLocationError', () => {
    const mockDispatch = jest.fn();
    const mappedProps = mapDispatchToProps(mockDispatch);
    const mockAction = {
      type: 'TOGGLE_LOCATION_ERROR',
      boolean: true
    };

    mappedProps.toggleLocationError(true);

    expect(mockDispatch).toHaveBeenCalledWith(mockAction);
  });
});

