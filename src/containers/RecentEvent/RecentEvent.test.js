import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { RecentEvent } from './RecentEvent';
import { fetchSelectedEvent } from '../../apiCalls';
jest.mock('../../apiCalls');
import { mockDirtyRecentEvents } from '../../mockData/mockRecentEvents'

describe('RecentEvent', () => {
  it.skip('renders without crashing', () => {
    const wrapper = shallow(<RecentEvent />);
  
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleRecentClick', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<RecentEvent storeSelectedEvent={jest.fn()} />);
      fetchSelectedEvent.mockImplementation(() => [{title: 'T-Swift'}])
    })

    it.skip('should call fetchSelectedEvent with the correct argument', async () => {
      const expected = '12345';

      await wrapper.instance().handleRecentClick(expected);

      expect(fetchSelectedEvent).toHaveBeenCalledWith(expected);
    })

    it.skip('should call storeSelectedEvent with the correct argument', async () => {
      const expected = {title: 'T-Swift'};

      await wrapper.instance().handleRecentClick(expected);

      expect(wrapper.instance().props.storeSelectedEvent).toHaveBeenCalledWith(expected);
    })

  });
  
})
