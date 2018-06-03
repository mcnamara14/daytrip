import React from 'react';
import ReactDOM from 'react-dom';
import { StopSelection } from './StopSelection';
import { shallow } from 'enzyme';

it('should match the snapshot', () => {
  const wrapper = shallow(<StopSelection />)

  expect(wrapper).toMatchSnapshot();
});
