import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from './Login';
import { shallow } from 'enzyme';

describe('Login', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should start with a default state', () => {
    const expected = {
      location: '',
      city: '',
      state: '',
      email: '',
      password: '',
      locationError: false
    };

    expect(wrapper.state()).toEqual(expected);
  })

  describe('onChangeHandler', () => {
    it('should change the state to the inputted value of corresponding name', () => {
      const wrapper = shallow(<Login />);

      const mockEvent = {
        target: {
          name: 'email',
          value: 'test@testerson.com'
        }
      }

      const expected = 'test@testerson.com';

      wrapper.find('input[name="email"]').simulate('change', mockEvent);

      expect(wrapper.state('email')).toEqual(expected);
    })
  })
  
})
