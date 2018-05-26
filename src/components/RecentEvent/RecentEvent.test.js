import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { RecentEvent } from './RecentEvent';

it('renders without crashing', () => {
  const wrapper = shallow(<RecentEvent />);

  expect(wrapper).toMatchSnapshot();
});
