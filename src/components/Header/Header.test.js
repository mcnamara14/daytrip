import React from 'react';
import ReactDOM from 'react-dom';
import { Header} from './Header';
import { shallow } from 'enzyme';

it('should match the snapshot', () => {
  const mockUser = {
    userId: '12345'
  }
  
  const wrapper = shallow(<Header user={mockUser}/>);

  expect(wrapper).toMatchSnapshot();
});
