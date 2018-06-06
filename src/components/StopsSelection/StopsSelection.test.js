import React from 'react';
import ReactDOM from 'react-dom';
import { StopsSelection } from './StopsSelection';
import { shallow } from 'enzyme';

describe('stopsSelection', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<StopsSelection />);
  
    expect(wrapper).toMatchSnapshot();
  });

  describe('storeRestaurantsAndBars', () => {
    let wrapper;
    let mockEvent;
    let mockRestaurantFilters;
    let mockBarFilters;

    beforeEach(() => {
      mockEvent = {
        latitude: '1234',
        longitude: '6789',
        title: 'T-Swift'
      }
      mockRestaurantFilters = {
        category: 'newamerican'
      }
      mockBarFilters = {
        category: 'divebar'
      }

      wrapper = shallow(<StopsSelection 
        selectedEvent={mockEvent} 
        restaurantFilters={mockRestaurantFilters} 
        barFilters={mockBarFilters} />);

      wrapper.instance().storeSuggestedRestaurants = jest.fn();
      wrapper.instance().storeSuggestedBars = jest.fn();
      wrapper.instance().toggleEventError = jest.fn();
      wrapper.instance().toggleFiltersError= jest.fn();
    })

    it('should call storeSuggestedRestaurants with the correct args when there are restaraunts and bars', () => {
      wrapper.instance().storeRestaurantsAndBars();

      const expected = ["1234", "6789"];

      expect(wrapper.instance().storeSuggestedRestaurants).toHaveBeenCalledWith(...expected)
    })

    it('should call storeSuggestedBars with the correct args when there are restaraunts and bars', () => {
      wrapper.instance().storeRestaurantsAndBars();

      const expected = ["1234", "6789"];

      expect(wrapper.instance().storeSuggestedBars).toHaveBeenCalledWith(...expected)
    })

    it('should call toggleEventError when no event is selected', () => {
      mockEvent = null

      wrapper = shallow(<StopsSelection 
        selectedEvent={mockEvent} 
        restaurantFilters={mockRestaurantFilters} 
        barFilters={mockBarFilters} />);

      wrapper.instance().storeSuggestedRestaurants = jest.fn();
      wrapper.instance().storeSuggestedBars = jest.fn();
      wrapper.instance().toggleEventError = jest.fn();
      wrapper.instance().toggleFiltersError= jest.fn();
      
      wrapper.instance().storeRestaurantsAndBars();

      const expected = ["1234", "6789"];

      expect(wrapper.instance().toggleEventError).toHaveBeenCalled()
    })

    it('should call toggleFiltersError when filters are undefined', () => {
      mockEvent = null;
      mockRestaurantFilters = {
        category: undefined
      }

      wrapper = shallow(<StopsSelection 
        selectedEvent={mockEvent} 
        restaurantFilters={mockRestaurantFilters} 
        barFilters={mockBarFilters} />);

      wrapper.instance().storeSuggestedRestaurants = jest.fn();
      wrapper.instance().storeSuggestedBars = jest.fn();
      wrapper.instance().toggleEventError = jest.fn();
      wrapper.instance().toggleFiltersError= jest.fn();
      
      wrapper.instance().storeRestaurantsAndBars();

      const expected = ["1234", "6789"];

      expect(wrapper.instance().toggleEventError).toHaveBeenCalled()
    })
  })

  describe('toggleLocation', () => {
    it('should call toggleLocation with correct argument then call again 2 seconds', () => {
      const wrapper = shallow(<StopsSelection toggleEventError={jest.fn()} />);
      const result = wrapper.instance().props.toggleEventError;

      jest.useFakeTimers();

      wrapper.instance().toggleEventError();

      expect(result).toHaveBeenCalledWith(true);

      jest.runAllTimers();

      expect(result).toHaveBeenCalledWith(false);    })
  })

})

