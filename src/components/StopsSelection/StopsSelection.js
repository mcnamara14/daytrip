import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StopsSelection.css';
import StopSelection from '../../containers/StopSelection/StopSelection';

export class StopsSelection extends Component {
  // storeRestaurantsOrBars = async () => {
  //   const { 
  //     selectedEvent, 
  //     type, 
  //     storeSuggestedRestaurants, 
  //     storeSuggestedBars 
  //   } = this.props;
  //   const { selectedOption, priceRanges } = this.state;
   
  //   if (selectedEvent !== null && selectedOption !== null) {
  //     const latitude = selectedEvent.latitude;
  //     const longitude = selectedEvent.longitude;
  //     const price = priceRanges.sort().join();
  //     const category = selectedOption.alias;
  //     const suggestedRestaurantsBars = 
  //       await fetchRestaurantsAndBars(latitude, longitude, price, category);
  //     type === 'before' ? storeSuggestedRestaurants(suggestedRestaurantsBars) : 
  //       storeSuggestedBars(suggestedRestaurantsBars);
  //   } else if (selectedEvent === null) {
  //     this.toggleEventError();
  //   }
  // }

  render() {
    return (
      <div className="stopsSelectionContainer">
        <StopSelection type={'before'}/>
        <hr />
        <StopSelection type={'after'}/>
        <button>Add filters</button>
      </div>
    );
  }
}

// export const mapStateToProps = (state) => ({
//   selectedEvent: state.selectedEvent,
//   eventError: state.eventError
// });

// export default connect(mapStateToProps)(StopsSelection);