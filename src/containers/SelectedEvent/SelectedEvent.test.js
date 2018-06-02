import React from 'react';
import ReactDOM from 'react-dom';
import { SelectedEvent } from './SelectedEvent';
import { shallow } from 'enzyme';

describe('SelectedEvent', () => {
  it('should match the snapshot', () => {
    const mockSelectedEvent = {
      image: 'http://allswifty.jpg'
    };

    const wrapper = shallow(<SelectedEvent selectedEvent={mockSelectedEvent} />)

    expect(wrapper).toMatchSnapshot();
  });
})

