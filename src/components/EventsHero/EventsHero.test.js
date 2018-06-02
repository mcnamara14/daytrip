import React from 'react';
import ReactDOM from 'react-dom';
import EventsHero from './EventsHero';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<EventsHero />)
  
  expect(wrapper).toMatchSnapshot();
});
