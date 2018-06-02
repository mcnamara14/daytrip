import React from 'react';
import ReactDOM from 'react-dom';
import { Stop } from './Stop';
import { shallow } from 'enzyme';

it('should match the snapshot', () => {
  const wrapper = shallow(<Stop />);

  expect(wrapper).toMatchSnapshot();
});
