import React from 'react';
import ReactDOM from 'react-dom';
import { StopSelection } from './StopSelection';
import { shallow } from 'enzyme';
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

  });
})
