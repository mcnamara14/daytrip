import React from 'react';
import ReactDOM from 'react-dom';
import { Header, mapDispatchToProps } from './Header';
import { shallow } from 'enzyme';

describe('Header', () => {
  it('should match the snapshot', () => {
    const mockUser = {
      userId: '12345'
    }

    const wrapper = shallow(<Header user={mockUser} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('signoutLoginClickHandler', () => {
    it('should call loginUser with correct args', () => {
      const mockUser = {
        userId: '12345'
      }
    
      const wrapper = shallow(<Header user={mockUser} loginUser={jest.fn()} />)
      const expected = [{"city": "", "email": "", "state": "", "userId": null}]
      wrapper.instance().signoutLoginClickHandler();

      expect(wrapper.instance().props.loginUser).toHaveBeenCalledWith(...expected);
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the correct params on loginUser', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'LOGIN_USER',
        userId: '12345',
        email: 'test@testerson.com',
        city: 'boulder',
        state: 'co'
      };

      mappedProps.loginUser('12345', 'test@testerson.com', 'boulder', 'co');

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  });
})

