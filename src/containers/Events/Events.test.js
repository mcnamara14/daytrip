import React from 'react';
import ReactDOM from 'react-dom';
import { Events } from './Events';
import { shallow } from 'enzyme';

it('should match the snapshot', () => {
  const mockEvents = [{
    title: "T Swift",
    image: "https://s1.ticketm.allswifty.jpg",
    price: "$300",
    venue: "Boulder Theater",
    date: "2018-05-30 8:00 PM"
  }];

  const wrapper = shallow(<Events events={mockEvents} />);

  expect(wrapper).toMatchSnapshot();
});
