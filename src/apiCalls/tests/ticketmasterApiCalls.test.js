import React from 'react';
import { fetchRecentEvents } from '../index';
import { ticketmasterApiKey } from '../apiKeys/ticketmasterApiKey';
import { shallow } from 'enzyme';
import { mockDirtyRecentEvents } from '../../mockData';

describe('ticketmasterApiCalls', () => {
  describe('fetchRecentEvents', () => {

    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          _embedded:
          mockDirtyRecentEvents
        })
      }));
    });

    it('should fetch with the correct argument', async () => {
      const expectedUrl = `https://app.ticketmaster.com/discovery/v2/events.json?&startDateTime=12345&sort=date,name,asc&city=Denver&stateCode=CO&apikey=${ticketmasterApiKey}`

      await fetchRecentEvents('Denver', 'CO', '12345');

      expect(window.fetch).toHaveBeenCalledWith(expectedUrl)
    });

    it('should return event data', async () => {
      const expected = mockDirtyRecentEvents.events;

      const result = await fetchRecentEvents('Denver', 'CO', '12345');

      expect(result).toEqual(expected);
    });

  })
})