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
    let mockEvent;
    let mockLoginUser;

    beforeEach(() => {
      mockLoginUser = jest.fn();

      wrapper = shallow(<Login loginUser={mockLoginUser} />);

      mockEvent = {preventDefault: () => {}}
      wrapper.setState({
        location: 'Denver, CO',
        email: 'test@test.com'
      });
    });

    it('should call emailPasswordSignup with correct arguments when a location is entered first', async () => {
      authorization.emailPasswordSignup = jest.fn().mockImplementation(() => ({
        user: {
          uid: 12345,
          email: 'test@testerson.com'
        }
      }));

      await wrapper.instance().emailSubmitHandler(mockEvent);

      expect(authorization.emailPasswordSignup).toHaveBeenCalled()
    })

    it('should call loginUser when there is a location', async () => {
      const result = wrapper.instance().props.loginUser;
     
      await wrapper.instance().emailSubmitHandler(mockEvent);

      expect(result).toHaveBeenCalled();
    })

    it('should call handleMissingLocationError when no location was entered', () => {
      wrapper.instance().handleMissingLocationError = jest.fn();
      const result = wrapper.instance().handleMissingLocationError;

      wrapper.setState({
        location: ''
      });

      wrapper.instance().emailSubmitHandler(mockEvent);

      expect(result).toHaveBeenCalled();
    })
  })

  describe('googleSignup', () => {
    let wrapper;
    let mockLoginUser;

    beforeEach(() => {
      mockLoginUser = jest.fn();

      wrapper = shallow(<Login loginUser={mockLoginUser} />);

      wrapper.setState({
        location: 'Denver, CO',
        city: 'Denver',
        state: 'CO'
      })
      authorization.googleSignup = jest.fn().mockImplementation(() => ({
        user: {
          uid: 12345,
          email: 'test@testerson.com'
        }
      }));
      wrapper.instance().handleTicketMasterFetch = jest.fn();
    })

    it('should call googleSignup when there is a location', async () => {
      const result = authorization.googleSignup;

      await wrapper.instance().googleSignup();
      
      expect(result).toHaveBeenCalled();
    })

    it('should call loginUser when there is a location', async () => {
      const result = wrapper.instance().props.loginUser;

      await wrapper.instance().googleSignup();
      
      expect(result).toHaveBeenCalledWith(12345, 'test@testerson.com', 'Denver', 'CO');
    })

    it('should call handleTicketMasterFetch when there is a location', async () => {
      const result = wrapper.instance().handleTicketMasterFetch

      await wrapper.instance().googleSignup();
      
      expect(result).toHaveBeenCalled();
    })

    it('should call handleMissingLocationError when no location is entered', async () => {
      wrapper.instance().handleMissingLocationError = jest.fn();
      wrapper.setState({location: ''});

      const result = wrapper.instance().handleMissingLocationError

      await wrapper.instance().googleSignup();

      expect(result).toHaveBeenCalled();
    })
  })
  
})
