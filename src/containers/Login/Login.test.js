import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from './Login';
import { shallow } from 'enzyme';
import { emailPasswordSignup } from '../../firebase/auth';
import * as authorization from '../../firebase/auth';

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
      emailInput: '',
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
  });

  describe('emailSubmitHandler', () => {
    let wrapper;

    beforeEach(() => {
      const mockLoginUser = jest.fn();

      wrapper = shallow(<Login loginUser={mockLoginUser} />);
    });

    it('should call emailPasswordSignup with correct arguments', async () => {
      const mockEvent = {
        preventDefault: () => {}
      }

      wrapper.setState({
        location: 'Denver, CO',
        email: 'test@test.com'
      });

      authorization.emailPasswordSignup = jest.fn().mockImplementation(() => ({
        user: {
          uid: 12345,
          email: 'test@testerson.com'
        }
      }));

      await wrapper.instance().emailSubmitHandler(mockEvent);

      expect(authorization.emailPasswordSignup).toHaveBeenCalled()
    })
  })

  // describe('googleSignup', async () => {
  //   it('should call googleSignup when there is a location', () => {
  //     const wrapper = shallow(<Login />);

  //     wrapper.setState({location: 'Denver, CO'});

  //     expect(googleSignup).toHaveBeenCalled();
  //   })
  // })
  
})
