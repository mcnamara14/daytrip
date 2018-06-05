import React from 'react';
import ReactDOM from 'react-dom';
import { Plan } from './Plans';
import { shallow } from 'enzyme';
import { mockCleanRestaurantAndBar, mockDirtyRecentEvents } from '../../mockData';

describe('Plans', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Plan />);
  
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
})

