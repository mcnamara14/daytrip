import React from 'react';
import ReactDOM from 'react-dom';
import { Login, mapDispatchToProps } from './Login';
import { shallow } from 'enzyme';
import { emailPasswordSignup } from '../../firebase/auth';
import * as authorization from '../../firebase/auth';
import * as ticketmasterApiCalls from '../../apiCalls';
import * as cleaner from '../../dataCleaners';
import { createMemoryHistory } from 'history';
import LocationAutocomplete from 'location-autocomplete';
jest.mock('moment', () => () => ({format: () => '2018-05-27T17:13:38-06:00'}));
import { cleanRecentEvents } from '../../dataCleaners/recentEventsCleaner';
jest.mock('../../dataCleaners/recentEventsCleaner');

describe('Login', () => {
  let wrapper;
  let history;

  beforeEach(() => {
    history = createMemoryHistory('/');

    wrapper = shallow(<Login history={history} storeRecentEvents={jest.fn()} />);
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should start with a default state', () => {
    const expected = {
      location: '',
      city: '',
      state: '',
      emailInput: '',
      password: '',
      locationError: false
    };

    expect(wrapper.state()).toEqual(expected);
  })

  describe('onChangeHandler', () => {
    it('should change the state to the inputted value of corresponding name', () => {
      const wrapper = shallow(<Login storeRecentEvents={jest.fn()} />);
      const mockEvent = {
        target: {
          name: 'email',
          value: 'test@testerson.com'
        }
      }

      const expected = 'test@testerson.com';

      wrapper.find('input[name="emailInput"]').simulate('change', mockEvent);

      expect(wrapper.state('email')).toEqual(expected);
    })
  });

  describe('emailSubmitHandler', () => {
    let wrapper;
    let mockEvent;
    let mockLoginUser;
    let history;

    beforeEach(() => {
      mockLoginUser = jest.fn();
      history = createMemoryHistory('/');

      wrapper = shallow(<Login history={history} loginUser={mockLoginUser} storeRecentEvents={jest.fn()} />);

      mockEvent = {preventDefault: () => {}}
      wrapper.setState({
        location: 'Denver, CO',
        email: 'test@test.com'
      });
    });

    it('should call emailPasswordSignup with correct arguments when a location is entered first', async () => {
      authorization.emailPasswordSignup = jest.fn().mockImplementation(() => ({
        user: {
          uid: 12345,
          email: 'test@testerson.com'
        }
      }));

      await wrapper.instance().emailSubmitHandler(mockEvent);

      expect(authorization.emailPasswordSignup).toHaveBeenCalled()
    })

    it('should call loginUser when there is a location', async () => {
      const result = wrapper.instance().props.loginUser;
     
      await wrapper.instance().emailSubmitHandler(mockEvent);

      expect(result).toHaveBeenCalled();
    })

    it('should call handleMissingLocationError when no location was entered', () => {
      wrapper.instance().handleMissingLocationError = jest.fn();
      const result = wrapper.instance().handleMissingLocationError;

      wrapper.setState({
        location: ''
      });

      wrapper.instance().emailSubmitHandler(mockEvent);

      expect(result).toHaveBeenCalled();
    })
  })

  describe('googleSignup', () => {
    let wrapper;
    let mockLoginUser;
    let history;

    beforeEach(() => {
      history = createMemoryHistory('/');
      mockLoginUser = jest.fn();

      wrapper = shallow(<Login history={history} loginUser={mockLoginUser} storeRecentEvents={jest.fn()} />);

      wrapper.setState({
        location: 'Denver, CO',
        city: 'Denver',
        state: 'CO'
      })
      authorization.googleSignup = jest.fn().mockImplementation(() => ({
        user: {
          uid: 12345,
          email: 'test@testerson.com'
        }
      }));
      wrapper.instance().handleTicketMasterFetch = jest.fn();
    })

    it('should call googleSignup when there is a location', async () => {
      const result = authorization.googleSignup;

      await wrapper.instance().googleSignup();
      
      expect(result).toHaveBeenCalled();
    })

    it('should call loginUser when there is a location', async () => {
      const result = wrapper.instance().props.loginUser;

      await wrapper.instance().googleSignup();
      
      expect(result).toHaveBeenCalledWith(12345, 'test@testerson.com', 'Denver', 'CO');
    })

    it('should call handleTicketMasterFetch when there is a location', async () => {
      wrapper.instance().toggleLocation = jest.fn();

      const result = wrapper.instance().handleTicketMasterFetch
      
      await wrapper.instance().googleSignup();
      
      expect(result).toHaveBeenCalled();
    })

    it('should call toggleLocation when no location is entered', async () => {
      wrapper.instance().toggleLocation = jest.fn();
      wrapper.setState({
        location: ''
      })

      const result = wrapper.instance().toggleLocation

      await wrapper.instance().googleSignup();

      expect(result).toHaveBeenCalled();
    })
  })

  describe('toggleLocation', () => {
    it('should call toggleLocation with correct argument then call again 2 seconds', () => {
      const wrapper = shallow(<Login toggleLocation={jest.fn()} />);
      const result = wrapper.instance().props.toggleLocation;

      jest.useFakeTimers();

      wrapper.instance().toggleLocation();

      expect(result).toHaveBeenCalledWith(true);

      jest.runAllTimers();

      expect(result).toHaveBeenCalledWith(false);    })
  })

  describe('handleTicketMasterFetch', () => {
    let history;
    let mockStoreRecentEvents;
    let wrapper;

    beforeEach(() => {
      history = createMemoryHistory('/');
      mockStoreRecentEvents = jest.fn();
      ticketmasterApiCalls.fetchRecentEvents = jest.fn().mockImplementation(() => ([{
        date: "2018-05-28 5:10 PM",
        image: "https://s1.ticketm.net/dam/a/67d/7b495.jpg",
        price: "$10+",
        title: "San Francisco Giants at Colorado Rockies",
        venue: "Coors Field",
        reviews: "Rockies are awesome"
      }]));

      cleaner.cleanRecentEvents = jest.fn().mockImplementation(() => ([{
        date: "2018-05-28 5:10 PM",
        image: "https://s1.ticketm.net/dam/a/67d/7b495.jpg",
        price: "$10+",
        title: "San Francisco Giants at Colorado Rockies",
        venue: "Coors Field"
      }]));

      wrapper = shallow(<Login history={history} storeRecentEvents={mockStoreRecentEvents} />);
    })

    it('should call fetchRecentEvents with correct arguments', async () => {
      wrapper.instance().setState({
        city: 'Boulder',
        state: 'CO',
        timeNow: '2018-05-27T17:13:38-06:00'
      });
      
      const result = ticketmasterApiCalls.fetchRecentEvents;
      
      await wrapper.instance().handleTicketMasterFetch();

      expect(result).toHaveBeenCalledWith(wrapper.state('city'), wrapper.state('state'), wrapper.state('timeNow'))
    })

    it('should call cleanRecentMovies with the correct arguments', async () => {
      const result = cleaner.cleanRecentEvents;
      const expected = [{"date": "2018-05-28 5:10 PM", "image": "https://s1.ticketm.net/dam/a/67d/7b495.jpg", "price": "$10+", "reviews": "Rockies are awesome", "title": "San Francisco Giants at Colorado Rockies", "venue": "Coors Field"}]
      await wrapper.instance().handleTicketMasterFetch();

      expect(cleaner.cleanRecentEvents).toHaveBeenCalledWith(expected);
    })

    it('should call storeRecentEvents with the correct arguments', async () => {
      const result = wrapper.instance().props.storeRecentEvents
      const expected = [{
        date: "2018-05-28 5:10 PM",
        image: "https://s1.ticketm.net/dam/a/67d/7b495.jpg",
        price: "$10+",
        title: "San Francisco Giants at Colorado Rockies",
        venue: "Coors Field"
      }]

      await wrapper.instance().handleTicketMasterFetch();

      expect(result).toHaveBeenCalledWith(expected);
    })
  });

  describe('facebookSignup', () => {
    let wrapper;

    beforeEach(() => {
      history = createMemoryHistory('/');
      authorization.facebookSignup = jest.fn().mockImplementation(() => ({
        user: {
          uid: 2345,
          email: 'test@testerson.com'
        }
      }));

      wrapper = shallow(<Login loginUser={jest.fn()} storeRecentEvents={jest.fn()} history={history} />);
    })

    it('should call facebookSignup when a location is entered', async () => {
      wrapper.setState({location: 'Boulder, CO'});

      await wrapper.instance().facebookSignup();

      expect(authorization.facebookSignup).toHaveBeenCalled();
    })

    it('should call loginUser with correct arguments when a location is entered', async () => {
      wrapper.setState({location: 'Boulder, CO'});

      await wrapper.instance().facebookSignup();

      expect(wrapper.instance().props.loginUser).toHaveBeenCalledWith(2345, "test@testerson.com", "Boulder, CO");
    })

    it('should call toggleLocation when missing a location', async () => {
      wrapper.instance().toggleLocation = jest.fn();

      await wrapper.instance().facebookSignup();

      const result = wrapper.instance().toggleLocation;

      expect(result).toHaveBeenCalled();
    })
  })

  // describe('onDropdownSelect', () => {
  //   it('should set the state to the city and state selected', () => {
  //     const wrapper = mount(<Login />);
  //     const locationAutocomplete
  //     const locationAutocomplete = shallow(<LocationAutocomplete onChange={jest.fn()} onDropdownSelect={jest.fn()} />);
  //     locationAutocomplete.autocomplete.getPlace = jest.fn().mockImplementation(() => ({
  //       vicinity: 'Boulder', 
  //       address_components: [
  //         {0: {long_name: "Denver", short_name: "Denver"}},
  //         {1: {long_name: "Denver County", short_name: "Denver County"}},
  //         {2: {long_name: "Colorado", short_name: "CO"}}
  //       ]
  //     }))

  //     wrapper.instance().onDropdownSelect();
  //   })
  // })

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the correct params on loginUser', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'LOGIN_USER',
        userId: 6,
        email: 'test@testerson.com',
        city: 'Boulder',
        state: 'CO'
      };

      mappedProps.loginUser(6, 'test@testerson.com', 'Boulder', 'CO');

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('should call dispatch with the correct params on storeRecentEvents', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'STORE_RECENT_EVENTS',
        recentEvents: [{
          date: "2018-05-28 5:10 PM",
          image: "https://s1.ticketm.net/dam/a/67d/7b495.jpg",
          price: "$10+",
          title: "San Francisco Giants at Colorado Rockies",
          venue: "Coors Field"
        }]
      };

      mappedProps.storeRecentEvents(mockAction.recentEvents);

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  });
})
