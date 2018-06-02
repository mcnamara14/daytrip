import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { RecentEvent, mapDispatchToProps } from './RecentEvent';
import { fetchSelectedEvent } from '../../apiCalls';
jest.mock('../../apiCalls');
import { mockDirtyRecentEvents } from '../../mockData/mockRecentEvents'

describe('RecentEvent', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<RecentEvent />);
  
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleRecentClick', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<RecentEvent storeSelectedEvent={jest.fn()} />);
      fetchSelectedEvent.mockImplementation(() => [{title: 'T-Swift'}])
    })

    it('should call fetchSelectedEvent with the correct argument', async () => {
      const expected = '12345';

      await wrapper.instance().handleRecentClick(expected);

      expect(fetchSelectedEvent).toHaveBeenCalledWith(expected);
    })

    it('should call storeSelectedEvent with the correct argument', async () => {
      const expected = {title: 'T-Swift'};

      await wrapper.instance().handleRecentClick(expected);

      expect(wrapper.instance().props.storeSelectedEvent).toHaveBeenCalledWith(expected);
    })
  });

  describe('Event button click', () => {
    it('should call handleRecentClick with correct argument when button is clicked to add event', () => {
      const wrapper = shallow(<RecentEvent id={'12345'} storeSelectedEvent={jest.fn()} />);

      wrapper.instance().handleRecentClick = jest.fn();

      wrapper.find('button').simulate('click');
      expect(wrapper.instance().handleRecentClick).toHaveBeenCalledWith('12345');
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the correct params on storeSelectedEvent', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockEvent = mockDirtyRecentEvents.events[0];
      const mockAction = {
        type: 'STORE_SELECTED_EVENT',
        event: mockEvent
      };

      mappedProps.storeSelectedEvent(mockEvent);

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  })
});
