import React from 'react';
import ReactDOM from 'react-dom';
import { StopsSelection } from './StopsSelection';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<StopsSelection />);

  expect(wrapper).toMatchSnapshot();
});
