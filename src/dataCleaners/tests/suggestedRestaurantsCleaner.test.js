import React from 'react';
import ReactDOM from 'react-dom';
import { suggestedRestaurantsCleaner } from '../';
import { 
  mockCleanSuggestedRestaurant,
  mockDirtySuggestedRestaurant 
} from '../../mockData';
jest.mock('moment', () => () => ({format: () => '2018-05-27T17:13:38-06:00'}));

describe('suggestedRestaurantsCleaner', () => {
  it('should clean restaurant data', () => {
    expect(suggestedRestaurantsCleaner(mockDirtySuggestedRestaurant)).toEqual(mockCleanSuggestedRestaurant)
  })
})
