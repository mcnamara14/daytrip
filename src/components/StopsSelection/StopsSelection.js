import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StopsSelection.css';
import StopSelection from '../../containers/StopSelection/StopSelection';
import { 
  storeSuggestedRestaurants, 
  storeSuggestedBars, 
  toggleFiltersError, 
  toggleEventError,
  toggleRestaurantBarError,
  toggleRestaurantBarLoading 
} from '../../actions';
import { fetchRestaurantsAndBars } from '../../apiCalls';
import PropTypes from 'prop-types';

export class StopsSelection extends Component {
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.selectedEvent !== null && 
  //       nextProps.restaurantFilters.category !== undefined && 
  //       nextProps.barFilters.category !== undefined && 
  //       this.props.filtersError === false &&
  //       this.props.restaurantBarError === false) {
  //     setTimeout(() => {
  //       this.storeRestaurantsAndBars();
  //     }, 3000);
  //   }
  // }

  storeRestaurantsAndBars = () => {
    const { 
      selectedEvent,
      restaurantFilters,
      barFilters
    } = this.props;
    
    if (restaurantFilters.category !== undefined && 
        barFilters.category !== undefined && 
        selectedEvent !== null) {
      const latitude = selectedEvent.latitude;
      const longitude = selectedEvent.longitude;
      this.storeSuggestedRestaurants(latitude, longitude);
      this.storeSuggestedBars(latitude, longitude);
    } else if (selectedEvent === null ) {
      this.toggleEventError();
    } else {
      this.toggleFiltersError();
    }
  }

  toggleEventError = () => {
    this.props.toggleEventError(true);
    setTimeout(() => {
      this.props.toggleEventError(false);
    }, 2000);
  }

  toggleFiltersError = () => {
    this.props.toggleFiltersError(true);
    setTimeout(() => {
      this.props.toggleFiltersError(false);
    }, 2000);
  }

  toggleRestaurantBarError = () => {
    this.props.toggleRestaurantBarError(true);
    setTimeout(() => {
      this.props.toggleRestaurantBarError(false);
    }, 2000);
  }

  storeSuggestedRestaurants = async (latitude, longitude) => {
    const {
      restaurantFilters,
      storeSuggestedRestaurants
    } = this.props;

    const price = restaurantFilters.price.sort().join();
    const category = restaurantFilters.category;
    this.props.toggleRestaurantBarLoading(true);
    const suggestedRestaurants = 
      await fetchRestaurantsAndBars(latitude, longitude, price, category);
    this.props.toggleRestaurantBarLoading(false);
    
    suggestedRestaurants.length ? 
      storeSuggestedRestaurants(suggestedRestaurants) :
      this.toggleRestaurantBarError();
  }

  storeSuggestedBars = async (latitude, longitude) => {
    const {
      barFilters,
      storeSuggestedBars
    } = this.props;

    if (barFilters.price.length) {
      const price = barFilters.price.sort().join();
      const category = barFilters.category;
      const suggestedBars = 
        await fetchRestaurantsAndBars(latitude, longitude, price, category);

      suggestedBars.length ?
        storeSuggestedBars(suggestedBars) :
        this.toggleRestaurantBarError();
    } 

  }

  render() {
    return (
      <div className="stopsSelection">
        { this.props.filtersError ? 
          <p className="filtersError">
            Please add a price and category for each stop.
          </p> : 
          null }
        { this.props.restaurantBarError ? 
          <p className="filtersError">
          No restaurants or bars near by matching your filters. 
            <br/> Select new filters.</p> : 
          null }
        { this.props.restaurantBarLoading ? 
          <p className="filtersError">
          Looking for restaurants and bars that match your filters. 
            <img src={require('./assets/loading.gif')} alt="Loading gif" className="loadingImg" /></p> : 
          null }
        <div className="stopsSelectionContainer">
          <StopSelection type={'before'}/>
          <hr />
          <StopSelection type={'after'}/>
        </div>
        <button onClick={this.storeRestaurantsAndBars}>Add filters</button>
      </div>
    );
  }
}

StopsSelection.propTypes = {
  selectedEvent: PropTypes.object,
  restaurantFilters: PropTypes.object,
  barFilters: PropTypes.object,
  filtersError: PropTypes.bool,
  restaurantBarError: PropTypes.bool,
  toggleEventError: PropTypes.func,
  toggleFiltersError: PropTypes.func,
  toggleRestaurantBarError: PropTypes.func
};

export const mapDispatchToProps = (dispatch) => ({
  storeSuggestedRestaurants: (restaurants) => {
    return dispatch(storeSuggestedRestaurants(restaurants));
  },
  storeSuggestedBars: (bars) => dispatch(storeSuggestedBars(bars)),
  toggleFiltersError: (boolean) => dispatch(toggleFiltersError(boolean)),
  toggleEventError: (boolean) => dispatch(toggleEventError(boolean)),
  toggleRestaurantBarError: (boolean) => {
    return dispatch(toggleRestaurantBarError(boolean));
  },
  toggleRestaurantBarLoading: (boolean) => dispatch(toggleRestaurantBarLoading(boolean))
});

export const mapStateToProps = (state) => ({
  selectedEvent: state.selectedEvent,
  restaurantFilters: state.restaurantFilters,
  barFilters: state.barFilters,
  filtersError: state.filtersError,
  restaurantBarError: state.restaurantBarError,
  restaurantBarLoading: state.restaurantBarLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(StopsSelection);