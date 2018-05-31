import React from 'react';
import ReactDOM from 'react-dom';
import { Plans } from './Plans';
import { shallow } from 'enzyme';

it('should match the snapshot', () => {


  const wrapper = shallow(<Plans />);

  expect(wrapper).toMatchSnapshot();
});
