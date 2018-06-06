import React from 'react';
import { fetchRestaurantsAndBars } from '../';
import { yelpApiKey } from '../apiKeys/yelpApiKey';
import { mockCleanRestaurantAndBar } from '../../mockData';
import { suggestedRestaurantsCleaner } from '../../dataCleaners/suggestedRestaurantsCleaner';
jest.mock('../../dataCleaners/suggestedRestaurantsCleaner');

describe('fetchRestaurantsAndBars', () => {

    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          businesses:
          mockCleanRestaurantAndBar
        })
      }));
    });

    it('should fetch with the correct argument', async () => {
      const expectedUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=divebar&latitude=1000&longitude=90&price=1,2,3&radius=2500&sort_by=rating`;
      const expectedOptionsObject = {
          'headers': {
            'map': {
              'authorization': `Bearer ${yelpApiKey}`
            }
          }
        }

      await fetchRestaurantsAndBars('1000', '90', '1,2,3', 'divebar');

      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedOptionsObject)
    });

    it('should return restaurant data', async () => {
      suggestedRestaurantsCleaner.mockImplementation(() => mockCleanRestaurantAndBar)
      const expected = mockCleanRestaurantAndBar;

      const result =  await fetchRestaurantsAndBars('1000', '90', '1,2,3', 'divebar');

      expect(result).toEqual(expected);
    });

    it('should return empty array when fetch doesnt return restaurants', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          businesses:
          []
        })
      }));
      const expected = [];

      const result =  await fetchRestaurantsAndBars('1000', '90', '1,2,3', 'divebar');

      expect(result).toEqual(expected);
    });
  })