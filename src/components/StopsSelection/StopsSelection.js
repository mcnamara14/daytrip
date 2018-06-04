import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StopsSelection.css';
import StopSelection from '../../containers/StopSelection/StopSelection';
import { storeSuggestedRestaurants, storeSuggestedBars } from '../../actions';
import { fetchRestaurantsAndBars } from '../../apiCalls';

export class StopsSelection extends Component {
  storeRestaurantsAndBars = () => {
    const { 
      selectedEvent,
      restaurantFilters,
      barFilters
    } = this.props;

    if (restaurantFilters.category !== undefined && barFilters.category !== undefined ) {
      const latitude = selectedEvent.latitude;
      const longitude = selectedEvent.longitude;
      this.storeSuggestedRestaurants(latitude, longitude);
    } else if (selectedEvent === null) {
      this.toggleEventError();
    }
  }

  storeSuggestedRestaurants = async (latitude, longitude) => {
    const {
      restaurantFilters,
      storeSuggestedRestaurants
    } = this.props;

    const price = restaurantFilters.priceRange.sort().join();
    const category = restaurantFilters.category;
    const suggestedRestaurants = 
      await fetchRestaurantsAndBars(latitude, longitude, price, category);
    storeSuggestedRestaurants(suggestedRestaurants);
  }

  storeSuggestedBars = async (latitude, longitude) => {
    const {
      barFilters,
      storeSuggestedBars
    } = this.props;

    const price = barFilters.priceRange.sort().join();
    const category = barFilters.category;
    const suggestedBars = 
      await fetchRestaurantsAndBars(latitude, longitude, price, category);
    storeSuggestedBars(suggestedBars);
  }

  render() {
    return (
      <div className="stopsSelectionContainer">
        <StopSelection type={'before'}/>
        <hr />
        <StopSelection type={'after'}/>
        <button onClick={this.storeRestaurantsAndBars} >Add filters</button>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  storeSuggestedRestaurants: (restaurants) => {
    return dispatch(storeSuggestedRestaurants(restaurants));
  },
  storeSuggestedBars: (bars) => dispatch(storeSuggestedBars(bars))
});

export const mapStateToProps = (state) => ({
  selectedEvent: state.selectedEvent,
  restaurantFilters: state.restaurantFilters,
  barFilters: state.barFilters
});

export default connect(mapStateToProps, mapDispatchToProps)(StopsSelection);