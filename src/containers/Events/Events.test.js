import React from 'react';
import ReactDOM from 'react-dom';
import { Events } from './Events';
import { shallow } from 'enzyme';

it('should match the snapshot', () => {
  const wrapper = shallow(<Events />);

  expect(wrapper).toMatchSnaphot();
});
