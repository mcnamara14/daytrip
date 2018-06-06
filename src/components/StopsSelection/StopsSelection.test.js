import React from 'react';
import ReactDOM from 'react-dom';
import { StopsSelection, mapDispatchToProps } from './StopsSelection';
import { shallow, mount } from 'enzyme';
import * as fetchCalls from '../../apiCalls';
jest.mock('../../apiCalls/yelpApiCalls');
import { mockCleanSuggestedRestaurant } from '../../mockData';

describe('stopsSelection', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<StopsSelection />);
  
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentWillReceiveProps', () => {
    it('should call storeRestaurantsAndBars when there is an event and filters', () => {
      jest.useFakeTimers();
      const spy = jest.spyOn(StopsSelection.prototype, 'componentWillReceiveProps');
      const wrapper = mount(<StopsSelection 
        selectedEvent={{ title: 'T-Swift'}} 
        restaurantFilters={{category:'newamerican'}}
        barFilters={{category:'newamerican'}}
        filtersError={false}
        restaurantBarError={false}
      />);

      wrapper.instance().storeRestaurantsAndBars = jest.fn();
    
      expect(wrapper.instance().storeRestaurantsAndBars).not.toHaveBeenCalled();
    
      wrapper.setProps({
        selectedEvent: {
          title: 'Backstreet Boys'
        }
      });
    
      wrapper.update();
      jest.runAllTimers();
    
      expect(wrapper.instance().storeRestaurantsAndBars).toHaveBeenCalled();
    })

    it('should not call storeRestaurantsAndBars when an event or filters undefined or null', () => {
      jest.useFakeTimers();
      const spy = jest.spyOn(StopsSelection.prototype, 'componentWillReceiveProps');
      const wrapper = mount(<StopsSelection 
        selectedEvent={{}} 
        restaurantFilters={{category:'newamerican'}}
        barFilters={{category:'newamerican'}}
        filtersError={false}
        restaurantBarError={false}
      />);

      wrapper.instance().storeRestaurantsAndBars = jest.fn();
    
      expect(wrapper.instance().storeRestaurantsAndBars).not.toHaveBeenCalled();
    
      wrapper.setProps({
        selectedEvent: null
      });
    
      wrapper.update();
      jest.runAllTimers();
    
      expect(wrapper.instance().storeRestaurantsAndBars).not.toHaveBeenCalled();
    })
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
      mockEvent = {};
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

      expect(wrapper.instance().toggleFiltersError).toHaveBeenCalled()
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

  describe('storeSuggestedBars', () => {
    let wrapper;
    let mockFilters;

    beforeEach(() => {
      mockFilters= {
        category: 'newamerican',
        priceRange: ['1', '3']
      }

      fetchCalls.fetchRestaurantsAndBars.mockImplementation(() => mockCleanSuggestedRestaurant)

      wrapper = shallow(<StopsSelection 
        barFilters={mockFilters}
        storeSuggestedBars={jest.fn()}
        storeSuggestedRestaurants={jest.fn()} 
      />);
    })

    it('should call fetchRestaurantsAndBars with correct args when there are bar filters', async () => {
      await wrapper.instance().storeSuggestedBars();

      const expected = ["39.735001", "-105.020401", "1,3", "newamerican"];

      expect(fetchCalls.fetchRestaurantsAndBars).toHaveBeenCalledWith(...expected);
    })
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the correct params on storeSuggestedRestaurants', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'STORE_SUGGESTED_RESTAURANTS',
        restaurants: mockCleanSuggestedRestaurant
      };

      mappedProps.storeSuggestedRestaurants(mockCleanSuggestedRestaurant);

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('should call dispatch with the correct params on storeSuggestedBars', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'STORE_SUGGESTED_BARS',
        bars: mockCleanSuggestedRestaurant
      };

      mappedProps.storeSuggestedBars(mockCleanSuggestedRestaurant);

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('should call dispatch with the correct params on toggleFiltersError', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'TOGGLE_FILTERS_ERROR',
        boolean: true
      };

      mappedProps.toggleFiltersError(true);

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

    it('should call dispatch with the correct params on toggleRestaurantBarError', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'TOGGLE_RESTAURANT_BAR_ERROR',
        boolean: true
      };

      mappedProps.toggleRestaurantBarError(true);

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  });

})

