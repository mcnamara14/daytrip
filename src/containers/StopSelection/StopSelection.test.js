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

  describe('changePriceRange', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<StopSelection storeRestaurantFilters={jest.fn()} storeBarFilters={jest.fn()} type={'before'} />);

      wrapper.setState({
        priceRanges: ['2', '5'],
        selectedOption: {
          alias: 'Bardo'
        }
      })

    })

    it('should add price range to state when its not included already', () => {
      wrapper.instance().changePriceRange('1');

      const expected = ['2', '5', '1'];
     
      expect(wrapper.state('priceRanges')).toEqual(expected)
    });

    it('should remove price range from state when its included already', () => {
      wrapper.instance().changePriceRange('2');

      const expected = ['5'];
     
      expect(wrapper.state('priceRanges')).toEqual(expected)
    });

    it('should call storeRestaurantFilters with correct args if a type of passed is passed to it', () => {
      wrapper.instance().changePriceRange('1');

      const result = wrapper.instance().props.storeRestaurantFilters; 

      expect(result).toHaveBeenCalledWith('Bardo', ['2', '5', '1']);
    })

    it('should call storeRestaurantFilters with correct args if a type of passed is passed to it', () => {
      wrapper = shallow(<StopSelection type={'after'} storeBarFilters={jest.fn()} />)
      wrapper.setState({
        priceRanges: ['2', '5'],
        selectedOption: {
          alias: 'Bardo'
        }
      })
      
      wrapper.instance().changePriceRange('1');

      const result = wrapper.instance().props.storeBarFilters; 

      expect(result).toHaveBeenCalledWith('Bardo', ['2', '5', '1']);
    })
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

  describe('return functionality', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<StopSelection 
        type={'before'} 
        storeRestaurantFilters={jest.fn()} 
        storeBarFilters={jest.fn()}
      />);
    })

    it('should call changePriceRange with the correct argument when price one button is clicked', () => {
      wrapper.instance().changePriceRange = jest.fn();

      wrapper.find('.priceOne').simulate('click');

      expect(wrapper.instance().changePriceRange).toHaveBeenCalledWith('1');
    });

    it('should call changePriceRange with the correct argument when price two button is clicked', () => {
      wrapper.instance().changePriceRange = jest.fn();
      
      wrapper.find('.priceTwo').simulate('click');

      expect(wrapper.instance().changePriceRange).toHaveBeenCalledWith('2');
    })

    it('should call changePriceRange with the correct argument when price three button is clicked', () => {
      wrapper.instance().changePriceRange = jest.fn();
      
      wrapper.find('.priceThree').simulate('click');

      expect(wrapper.instance().changePriceRange).toHaveBeenCalledWith('3');
    })

    it('should add selected to class to price three when selected', () => {
      wrapper.setState({
        priceRanges: ['3']
      })
      wrapper.instance().changePriceRange = jest.fn();

      expect(wrapper.find('.selected').length).toEqual(1);
    })

    it('should add selected to class to price four when selected', () => {
      wrapper.setState({
        priceRanges: ['4']
      })
      wrapper.instance().changePriceRange = jest.fn();

      expect(wrapper.find('.selected').length).toEqual(1);
    })

    it('should call changePriceRange with the correct argument when price four button is clicked', () => {
      wrapper.instance().changePriceRange = jest.fn();
      
      wrapper.find('.priceFour').simulate('click');

      expect(wrapper.instance().changePriceRange).toHaveBeenCalledWith('4');
    })

    it('should set beforeAfter variable to before or after depending on type passed on', () => {
      expect(wrapper.find('h3').text()).toEqual('before the event');
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

    it('should call dispatch with the correct params on storeRestaurantFilters', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'STORE_RESTAURANT_FILTERS',
        category: 'newamerican',
        priceRanges: ['1', '3']
      };

      mappedProps.storeRestaurantFilters('newamerican', ['1', '3']);

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('should call dispatch with the correct params on storeBarFilters', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'STORE_BAR_FILTERS',
        category: 'newamerican',
        priceRanges: ['1', '3']
      };

      mappedProps.storeBarFilters('newamerican', ['1', '3']);

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
