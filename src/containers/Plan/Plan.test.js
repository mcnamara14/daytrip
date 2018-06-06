import React from 'react';
import ReactDOM from 'react-dom';
import { Plan } from './Plan';
import { shallow } from 'enzyme';
import * as firebase from 'firebase';
import 'firebase/database';
import { mockCleanRestaurantAndBar, mockDirtyRecentEvents } from '../../mockData';

describe('Plan', () => {
  let wrapper;

  beforeEach(() => {
    const mockUser = {
      userId: '12345'
    }
    wrapper = shallow(<Plan user={mockUser} />, { disableLifecycleMethods: true });
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // describe('render functionality', () => {
  //   let wrapper;

  //   beforeEach(() => {
  //     wrapper = shallow(<Plan user={mockUser} />, { disableLifecycleMethods: true });

  //     wrapper.setState({
  //       selectedPlan: {
  //         bar: {
  //           location: '555 Union Station, Denver, CO'
  //         },
  //         event: {
  //           location: '555 Union Station, Denver, CO'
  //         },
  //         restaurant: {
  //           location: '555 Union Station, Denver, CO'
  //         }
  //       }
  //     })
  //   });

  //   it('should force location to lowercase with no commas', () => {
  //   })
  })

