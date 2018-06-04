import { location } from '../location';
import { eventError } from '../eventError';
import { recentEvents } from '../recentEvents';

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

})