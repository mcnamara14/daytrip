import React from 'react';
import ReactDOM from 'react-dom';
import { Stop } from './Stop';
import { shallow } from 'enzyme';

describe('Stop', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Stop type={'bar'}/>);
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render review container for restaurants and bars only', () => {
    expect(wrapper.find('.reviewContainer').length).toEqual(1);
  })

  it('should not render review container for event', () => {
    wrapper = shallow(<Stop type={'event'}/>);

    expect(wrapper.find('.reviewContainer').length).toEqual(0);
  })
})

