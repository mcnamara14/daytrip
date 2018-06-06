import { location } from '../location';
import { eventError } from '../eventError';
import { recentEvents } from '../recentEvents';
import { selectedEvent } from '../selectedEvent';
import { suggestedBars } from '../suggestedBars';
import { suggestedRestaurants } from '../suggestedRestaurants';
import { user } from '../user';
import { barFilters } from '../barFilters';
import { filtersError } from '../filtersError';

describe('Reducers', () => {
  describe('location reducer', () => {
    it('should return the initial state', () => {
      const expected = null;

      const result = location(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return the boolean passed with TOGGLE LOCATION action type', () => {
      const mockAction = {
        type: 'TOGGLE_LOCATION',
        city: 'San Diego', 
        state: 'CA'
      }
      const expected = {
        city: 'San Diego', 
        state: 'CA'
      }

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

    it('should return bars passed with TOGGLE EVENT ERROR action type', () => {
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

    it('should return restaurants passed with STORE_SUGGESTED_RESTAURANTS action type', () => {
      const mockAction = {
        type: 'STORE_SUGGESTED_RESTAURANTS',
        restaurants: [{title: 'Acron'}]
      }

      const expected = [{title: 'Acron'}];

      const result = suggestedRestaurants(undefined, mockAction)

      expect(result).toEqual(expected)
    })
  })

  describe('user reducer', () => {
    it('should return the initial state', () => {
      const expected = {userId: null, email: '', city: '', state: ''};

      const result = user(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return restaurants passed with STORE_SUGGESTED_RESTAURANTS action type', () => {
      const mockAction = {
        type: 'LOGIN_USER',
        userId: '12345', 
        email: 'test@testerson.com', 
        city: 'Denver', 
        state: 'CO'
      }

      const expected = {
        userId: '12345', 
        email: 'test@testerson.com', 
        city: 'Denver', 
        state: 'CO'
      };

      const result = user(undefined, mockAction)

      expect(result).toEqual(expected)
    })
  })

  describe('barFilters reducer', () => {
    it('should return the initial state', () => {
      const expected = {};

      const result = barFilters(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return an object with category and priceRanges passed with STORE_BAR_FILTERSaction type', () => {
      const mockAction = {
        type: 'STORE_BAR_FILTERS',
        category: 'newamerican', 
        priceRanges: ['1', '3']
      }

      const expected = {
        category: 'newamerican', 
        priceRange: ['1', '3']
      };

      const result = barFilters(undefined, mockAction)

      expect(result).toEqual(expected)
    })
  })

  describe('filtersError reducer', () => {
    it('should return the initial state', () => {
      const expected = false;

      const result = filtersError(undefined, {})

      expect(result).toEqual(expected)
    })

    it('should return the boolean value passed with TOGGLE_FILTERS_ERROR action type', () => {
      const mockAction = {
        type: 'TOGGLE_FILTERS_ERROR',
        boolean: true
      }

      const expected = true;

      const result = filtersError(undefined, mockAction)

      expect(result).toEqual(expected)
    })
  })
})

