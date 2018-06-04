import React from 'react';
import ReactDOM from 'react-dom';
import { StopSelection, mapDispatchToProps, mapStateToProps } from './StopSelection';
import { shallow, mount } from 'enzyme';
import { 
  mockCleanRestaurantAndBar, 
  mockCleanRecentEvents,
  mockCleanSuggestedRestaurant
 } from '../../mockData';
import * as fetchCalls from '../../apiCalls';
jest.mock('../../apiCalls/yelpApiCalls');

describe('StopSelection', () => {
it('should match the snapshot', () => {
  const wrapper = shallow(<StopSelection />)

  expect(wrapper).toMatchSnapshot();
});

  describe('onSelect', () => {
    it('should set state to selected option', () => {
      const wrapper = shallow(<StopSelection />)

      wrapper.instance().onSelect(mockCleanRestaurantAndBar)
     
      expect(wrapper.state('selectedOption')).toEqual(mockCleanRestaurantAndBar)
    });
  })

  describe('componentWillReceiveProps', () => {
    it('should call changePriceRange with the correct argument when price one button is clicked', () => {
      jest.useFakeTimers();
      const spy = jest.spyOn(StopSelection.prototype, 'componentWillReceiveProps');
      const wrapper = mount(<StopSelection selectedEvent={{ title: 'T-Swift'}} />);
      wrapper.instance().storeRestaurantsOrBars = jest.fn();

      expect(wrapper.instance().storeRestaurantsOrBars).not.toHaveBeenCalled();

      wrapper.setProps({
        selectedEvent: {
          title: 'Backstreet Boys'
        }
      });

      wrapper.update();
      jest.runAllTimers();

      expect(wrapper.instance().storeRestaurantsOrBars).toHaveBeenCalled();
    })
  });

  describe('changePriceRange', () => {
    it('should add price range to state when its not included already', () => {
      const wrapper = shallow(<StopSelection />);
      wrapper.setState({
        priceRanges: ['2', '5']
      })

      wrapper.instance().changePriceRange('1');

      const expected = ['2', '5', '1'];
     
      expect(wrapper.state('priceRanges')).toEqual(expected)
    });

    it('should remove price range from state when its included already', () => {
      const wrapper = shallow(<StopSelection />);
      wrapper.setState({
        priceRanges: ['2', '5']
      })

      wrapper.instance().changePriceRange('2');

      const expected = ['5'];
     
      expect(wrapper.state('priceRanges')).toEqual(expected)
    });
  })

  describe('toggleEventError', () => {
    it('should call toggleEventError with an arg of true then call again with an arg of false after 2 seconds', () => {
      const wrapper = shallow(<StopSelection toggleEventError={jest.fn()} />);
      jest.useFakeTimers();

      wrapper.instance().toggleEventError();

      expect(wrapper.instance().props.toggleEventError).toHaveBeenCalledWith(true)

      jest.runAllTimers();

      expect(wrapper.instance().props.toggleEventError).toHaveBeenCalledWith(false)
    })
  })

  describe('storeRestaurantsOrBars', () => {
    it('should call fetchRestaurantsAndBars with the correct args when there is a selectedEvent and selected restaurant or bar category', async () => {
      const mockSelectedEvent = mockCleanRecentEvents.events[0];

      const wrapper = shallow(<StopSelection toggleEventError={jest.fn()} selectedEvent={mockSelectedEvent} storeSuggestedRestaurants={jest.fn()} storeSuggestedBars={jest.fn()} />);
      
      wrapper.setState({
        selectedOption: {
          alias: "newamerican",
          label: "New American"
        }
      })
      
      await wrapper.instance().storeRestaurantsOrBars();
      
      const expected = ["39.735001", "-105.020401", "", "newamerican"];

      expect(fetchCalls.fetchRestaurantsAndBars).toHaveBeenCalledWith(...expected);
    });

    it('should call storeSuggestedRestaurants with the correct args when the type is before', async () => {
      const wrapper = shallow(<StopSelection toggleEventError={jest.fn()} selectedEvent={{title: 'T-Swift'}} storeSuggestedRestaurants={jest.fn()} storeSuggestedBars={jest.fn()} type={'before'} />);
      fetchCalls.fetchRestaurantsAndBars.mockImplementation(() => mockCleanSuggestedRestaurant)

      wrapper.setState({
        selectedOption: {title: 'The Matchbox'}
      })

      await wrapper.instance().storeRestaurantsOrBars();

      const expected = mockCleanSuggestedRestaurant
      
      expect(wrapper.instance().props.storeSuggestedRestaurants).toHaveBeenCalledWith(expected);
    });

    it('should call storeSuggestedBars with the correct args when the type is after', async () => {
      const wrapper = shallow(<StopSelection toggleEventError={jest.fn()} selectedEvent={{title: 'T-Swift'}} storeSuggestedRestaurants={jest.fn()} storeSuggestedBars={jest.fn()} type={'after'} />);
      fetchCalls.fetchRestaurantsAndBars.mockImplementation(() => mockCleanSuggestedRestaurant)

      wrapper.setState({
        selectedOption: {title: 'The Matchbox'}
      })

      await wrapper.instance().storeRestaurantsOrBars();

      const expected = mockCleanSuggestedRestaurant
      
      expect(wrapper.instance().props.storeSuggestedBars).toHaveBeenCalledWith(expected);
    });

    it('should call toggleEventError if there isnt a selected event', async () => {
      const wrapper = shallow(<StopSelection toggleEventError={jest.fn()} selectedEvent={null}  />);
      wrapper.instance().toggleEventError = jest.fn();

      await wrapper.instance().storeRestaurantsOrBars();

      const expected = mockCleanSuggestedRestaurant
      
      expect(wrapper.instance().toggleEventError).toHaveBeenCalled();
    });
  });

  describe('return functionality', () => {
    it('should call changePriceRange with the correct argument when price one button is clicked', () => {
      const wrapper = shallow(<StopSelection />);
      wrapper.instance().changePriceRange = jest.fn();

      wrapper.find('.priceOne').simulate('click');

      expect(wrapper.instance().changePriceRange).toHaveBeenCalledWith('1');
    });

    it('should call changePriceRange with the correct argument when price two button is clicked', () => {
      const wrapper = shallow(<StopSelection />);
      wrapper.instance().changePriceRange = jest.fn();
      
      wrapper.find('.priceTwo').simulate('click');

      expect(wrapper.instance().changePriceRange).toHaveBeenCalledWith('2');
    })

    it('should call changePriceRange with the correct argument when price three button is clicked', () => {
      const wrapper = shallow(<StopSelection />);
      wrapper.instance().changePriceRange = jest.fn();
      
      wrapper.find('.priceThree').simulate('click');

      expect(wrapper.instance().changePriceRange).toHaveBeenCalledWith('3');
    })

    it('should call changePriceRange with the correct argument when price four button is clicked', () => {
      const wrapper = shallow(<StopSelection />);
      wrapper.instance().changePriceRange = jest.fn();
      
      wrapper.find('.priceFour').simulate('click');

      expect(wrapper.instance().changePriceRange).toHaveBeenCalledWith('4');
    })

  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the correct params on storeSuggestedRestaurants', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockRestaurants = mockCleanSuggestedRestaurant;
      const mockAction = {
        type: 'STORE_SUGGESTED_RESTAURANTS',
        restaurants: mockRestaurants
      };

      mappedProps.storeSuggestedRestaurants(mockRestaurants);

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('should call dispatch with the correct params on storeSuggestedBars', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockRestaurants = mockCleanSuggestedRestaurant;
      const mockAction = {
        type: 'STORE_SUGGESTED_BARS',
        bars: mockRestaurants
      };

      mappedProps.storeSuggestedBars(mockRestaurants);

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('should call dispatch with the correct params on toggleEventError', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'TOGGLE_EVENT_ERROR',
        boolean: true
      };

      mappedProps.toggleEventError(true);

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  });

  describe('mapStateToProps', () => {
    it('should map selectedEvent to props', () => {
      const state = {
        selectedEvent: {title: 'Swifty'},
        bar: {title: 'Matchbox'}
      };

      const expected = {
        selectedEvent: {title: 'Swifty'}
      };

      const mappedProps = mapStateToProps(state);

      expect(mappedProps).toEqual(expected);
    });

    it('should map eventError to props', () => {
      const state = {
        eventError: false,
        bar: {title: 'Matchbox'}
      };

      const expected = {
        eventError: false
      };
      
      const mappedProps = mapStateToProps(state);

      expect(mappedProps).toEqual(expected);
    });
  });
})
