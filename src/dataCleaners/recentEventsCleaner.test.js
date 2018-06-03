import React from 'react';
import ReactDOM from 'react-dom';
import { cleanRecentEvents} from '../dataCleaners';
import { 
  mockCleanRecentEvents, 
  mockCleanRecentEventsNoStartNoPrice, 
  mockDirtyRecentEvents, 
  mockDirtyRecentEventsNoStartNoPrice 
} from '../mockData';
jest.mock('moment', () => () => ({format: () => '2018-05-27T17:13:38-06:00'}));

describe('cleanRecentEvents', () => {
  it('should clean times when there is a start date', () => {

    expect(cleanRecentEvents(mockDirtyRecentEvents.events)).toEqual(mockCleanRecentEvents.events)
  })

  it('should return TBA when there is no start date', () => {
    expect(cleanRecentEvents(mockDirtyRecentEventsNoStartNoPrice.events)).toEqual(mockCleanRecentEventsNoStartNoPrice.events)
  })

  it('should return Price TBD when there is no price range', () => {
    expect(cleanRecentEvents(mockDirtyRecentEventsNoStartNoPrice.events)).toEqual(mockCleanRecentEventsNoStartNoPrice.events)
  })
})
