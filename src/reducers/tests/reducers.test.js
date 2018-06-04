import { location } from '../location';
import { eventError } from '../eventError';
import { recentEvents } from '../recentEvents';
import { selectedEvent } from '../selectedEvent';
import { suggestedBars } from '../suggestedBars';
import { suggestedRestaurants } from '../suggestedRestaurants';

describe('Reducers', () => {
  describe('location reducer', () => {
    it('should return the initial state', () => {
      const expected = false;

      const result = location(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return the boolean passed with TOGGLE LOCATION action type', () => {
      const mockAction = {
        type: 'TOGGLE_LOCATION',
        boolean: true
      }
      const expected = true;

      const result = location(undefined, mockAction)

      expect(result).toEqual(expected)
    })
  })

  describe('eventError reducer', () => {
    it('should return the initial state', () => {
      const expected = false;

      const result = eventError(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return the boolean passed with TOGGLE EVENT ERROR action type', () => {
      const mockAction = {
        type: 'TOGGLE_EVENT_ERROR',
        boolean: true
      }
      const expected = true;

      const result = eventError(undefined, mockAction)

      expect(result).toEqual(expected)
    })
  })

  describe('recentEvents reducer', () => {
    it('should return the initial state', () => {
      const expected = [];

      const result = recentEvents(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return the boolean passed with TOGGLE EVENT ERROR action type', () => {
      const mockAction = {
        type: 'STORE_RECENT_EVENTS',
        recentEvents: [{title: 'TSwizzle'}]
      }
      const expected = [{title: 'TSwizzle'}];

      const result = recentEvents(undefined, mockAction)

      expect(result).toEqual(expected)
    })
  })

  describe('selectedEvent reducer', () => {
    it('should return the initial state', () => {
      const expected = null;

      const result = selectedEvent(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return event passed with STORE_SELECTED_EVENT action type', () => {
      const mockAction = {
        type: 'STORE_SELECTED_EVENT',
        event: {title: 'TSwizzle'}
      }
      const expected = {title: 'TSwizzle'};

      const result = selectedEvent(undefined, mockAction)

      expect(result).toEqual(expected)
    })
  })

  describe('suggestedBars reducer', () => {
    it('should return the initial state', () => {
      const expected = [];

      const result = suggestedBars(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return bars passed with passed with TOGGLE EVENT ERROR action type', () => {
      const mockAction = {
        type: 'STORE_SUGGESTED_BARS',
        bars: [{title: 'Matchbox'}]
      }
      const expected = [{title: 'Matchbox'}];

      const result = suggestedBars(undefined, mockAction)

      expect(result).toEqual(expected)
    })
  })

  describe('suggestedRestaurants reducer', () => {
    it('should return the initial state', () => {
      const expected = [];

      const result = suggestedRestaurants(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return restaurants passed with passed with STORE_SUGGESTED_RESTAURANTSaction type', () => {
      const mockAction = {
        type: 'STORE_SUGGESTED_RESTAURANTS',
        restaurants: [{title: 'Acron'}]
      }

      const expected = [{title: 'Acron'}];

      const result = suggestedRestaurants(undefined, mockAction)

      expect(result).toEqual(expected)
    })
  })

})

