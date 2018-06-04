import React from 'react';
import ReactDOM from 'react-dom';
import { StopSelection } from './StopSelection';
import { shallow } from 'enzyme';
import { mockCleanRestaurantAndBar } from '../../mockData';

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

})
