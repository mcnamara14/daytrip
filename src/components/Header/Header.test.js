import React from 'react';
import ReactDOM from 'react-dom';
import { Header} from './Header';
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
})

