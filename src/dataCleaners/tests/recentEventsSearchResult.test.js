import React from 'react';
import ReactDOM from 'react-dom';
import { cleanRecentEventsSearch } from '../';
import { 
  mockCleanRecentEvents, 
  mockDirtyRecentEvents,
  mockDirtyRecentEventsNoStartNoPrice,
  mockCleanRecentEventsSearchResult,
  mockCleanRecentEventsSearchResultNoStart
} from '../../mockData';
jest.mock('moment', () => () => ({format: () => '2018-05-27T17:13:38-06:00'}));

describe('cleanRecentEvents', () => {
  it('should clean times when there is a start date', () => {
    expect(cleanRecentEventsSearch(mockDirtyRecentEvents.events)).toEqual(mockCleanRecentEventsSearchResult)
  })

  it('should return TBA when there is no start date', () => {
    expect(cleanRecentEventsSearch(mockDirtyRecentEventsNoStartNoPrice.events)).toEqual(mockCleanRecentEventsSearchResultNoStart)
  })
})
