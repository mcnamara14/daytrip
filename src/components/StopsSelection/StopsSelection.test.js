import React from 'react';
import ReactDOM from 'react-dom';
import { StopsSelection } from './StopsSelection';
import { shallow } from 'enzyme';
import * as fetchCalls from '../../apiCalls';
jest.mock('../../apiCalls/yelpApiCalls');
import { mockCleanSuggestedRestaurant } from '../../mockData';

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

  describe('toggleFiltersError', () => {
    it('should call toggleFiltersError with correct argument then call again 2 seconds', () => {
      const wrapper = shallow(<StopsSelection toggleFiltersError={jest.fn()} />);
      const result = wrapper.instance().props.toggleFiltersError;

      jest.useFakeTimers();

      wrapper.instance().toggleFiltersError();

      expect(result).toHaveBeenCalledWith(true);

      jest.runAllTimers();

      expect(result).toHaveBeenCalledWith(false);    })
  })

  describe('toggleRestaurantBarError', () => {
    it('should call toggleRestaurantBarError with correct argument then call again 2 seconds', () => {
      const wrapper = shallow(<StopsSelection toggleRestaurantBarError={jest.fn()} />);
      const result = wrapper.instance().props.toggleRestaurantBarError;

      jest.useFakeTimers();

      wrapper.instance().toggleRestaurantBarError();

      expect(result).toHaveBeenCalledWith(true);

      jest.runAllTimers();

      expect(result).toHaveBeenCalledWith(false);    })
  })

  describe('storeSuggestedRestaurants', () => {
    let wrapper;
    let mockRestaurantFilters;

    beforeEach(() => {
      mockRestaurantFilters = {
        category: 'newamerican',
        priceRange: ['1', '3']
      }

      fetchCalls.fetchRestaurantsAndBars.mockImplementation(() => mockCleanSuggestedRestaurant)

      wrapper = shallow(<StopsSelection 
        restaurantFilters={mockRestaurantFilters}
        storeSuggestedBars={jest.fn()}
        storeSuggestedRestaurants={jest.fn()} 
      />);
    })

    it('should call fetchRestaurantsAndBars with the correct args ', async () => {
      await wrapper.instance().storeSuggestedRestaurants("39.735001", "-105.020401");

      const expected = ["39.735001", "-105.020401", "1,3", "newamerican"];

      expect(fetchCalls.fetchRestaurantsAndBars).toHaveBeenCalledWith(...expected);
    });

    it('should call storeSuggestedRestaurants in props with the correct args when there are suggested restaurants', async () => {
      await wrapper.instance().storeSuggestedRestaurants("39.735001", "-105.020401");

      const expected = ["39.735001", "-105.020401", "1,3", "newamerican"];

      expect(wrapper.instance().props.storeSuggestedRestaurants).toHaveBeenCalledWith(mockCleanSuggestedRestaurant);
    });

    it('should call toggleRestaurantBarError when there are no suggested restaurants', async () => {
      fetchCalls.fetchRestaurantsAndBars.mockImplementation(() => [])

      wrapper = shallow(<StopsSelection 
        restaurantFilters={mockRestaurantFilters}
        storeSuggestedBars={jest.fn()}
        storeSuggestedRestaurants={jest.fn()}
        toggleRestaurantBarError={jest.fn()} 
      />);

      wrapper.instance().toggleRestaurantBarError = jest.fn();

      await wrapper.instance().storeSuggestedRestaurants("39.735001", "-105.020401");

      const expected = ["39.735001", "-105.020401", "1,3", "newamerican"];

      expect(wrapper.instance().toggleRestaurantBarError).toHaveBeenCalled();
    });
  });
})

