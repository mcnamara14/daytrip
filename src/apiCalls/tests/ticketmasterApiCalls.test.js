import React from 'react';
import { fetchRecentEvents, fetchRecentEventsOnSearch, fetchSelectedEvent } from '../';
import { ticketmasterApiKey } from '../apiKeys/ticketmasterApiKey';
import { shallow } from 'enzyme';
import { mockDirtyRecentEvents } from '../../mockData';
import { cleanRecentEventsSearch } from '../../dataCleaners/recentEventsSearchCleaner';
import { cleanRecentEvents } from '../../dataCleaners/recentEventsCleaner';
jest.mock('../../dataCleaners/recentEventsSearchCleaner')
jest.mock('../../dataCleaners/recentEventsCleaner')

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

  describe('fetchRecentEventsOnSearch', () => {

    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          _embedded:
          mockDirtyRecentEvents
        })
      }));
    });

    it('should fetch with the correct argument', async () => {
      const expectedUrl = `https://app.ticketmaster.com/discovery/v2/events.json?startDateTime=12345&sort=date,name,asc&city=Denver&stateCode=CO&keyword=rockies&apikey=${ticketmasterApiKey}`

      await fetchRecentEventsOnSearch('Denver', 'CO', '12345', 'rockies');

      expect(window.fetch).toHaveBeenCalledWith(expectedUrl)
    });

    it('should return event data', async () => {
      cleanRecentEventsSearch.mockImplementation(() => mockDirtyRecentEvents.events)
      const expected = mockDirtyRecentEvents.events;

      const result = await fetchRecentEventsOnSearch('Denver', 'CO', '12345', 'rockies');

      expect(result).toEqual(expected);
    });
  })

  describe('fetchSelectedEvent', () => {

    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          mockDirtyRecentEvents
        })
      }));
    });

    it('should fetch with the correct argument', async () => {
      const expectedUrl = `https://app.ticketmaster.com/discovery/v2/events/12345.json?apikey=${ticketmasterApiKey}`

      await fetchSelectedEvent('12345');

      expect(window.fetch).toHaveBeenCalledWith(expectedUrl)
    });

    it('should return event data', async () => {
      cleanRecentEvents.mockImplementation(() => mockDirtyRecentEvents.events)
      const expected = mockDirtyRecentEvents.events;

      const result = await fetchSelectedEvent('Denver', 'CO', '12345', 'rockies');

      expect(result).toEqual(expected);
    });

    // it('should call an alert when the status doesnt come back ok', async () => {
    //   cleanRecentEvents.mockImplementation(() => mockDirtyRecentEvents.events)
    //   const expected = mockDirtyRecentEvents.events;

    //   const result = await fetchSelectedEvent('Denver', 'CO', '12345', 'rockies');

    //   expect(result).toEqual(expected);
    // });

  })
})