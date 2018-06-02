import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StopSelection.css';
import { beforeEventCategoryCleaner } from '../../dataCleaners/beforeEventCategoryCleaner';
import { afterEventCategoryCleaner } from '../../dataCleaners/afterEventCategoryCleaner';
import Select from 'react-select';
import { yelpFetchRestaurants } from '../../apiCalls/yelpApiCall';
import { storeSuggestedRestaurants, storeSuggestedBars, toggleEventError } from '../../actions';

export class StopSelection extends Component {
  constructor() {
    super();

    this.state = {
      selectedOption: null,
      priceRanges:[]
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedEvent) {
      setTimeout(() => {
        this.handleRestaurantClick();
      }, 0);
    }
  }

onSelect = (selectedOption) => {
  this.setState({ selectedOption });
  
  if (selectedOption) {
    console.log(selectedOption.label)
  }
}

changePriceRange = (price) => {
  if (!this.state.priceRanges.includes(price)) {
    const priceRanges = [...this.state.priceRanges, price]
    this.setState({
      priceRanges 
    })
  } else {
    const priceRanges = this.state.priceRanges.filter(range => {
      return range !== price;
    })
    
    this.setState({
      priceRanges 
    })
  }
}

toggleEventError = () => {
  this.props.toggleEventError(true);
  setTimeout(() => {
    this.props.toggleEventError(false);
  }, 2000);
}

handleRestaurantClick = async () => {
  const { latitude, longitude, selectedEvent, type, storeSuggestedRestaurants, storeSuggestedBars } = this.props;
  const { selectedOption, priceRanges } = this.state;

  if (this.props.selectedEvent !== null && this.state.selectedOption !== null) {
    const latitude = selectedEvent.latitude;
    const longitude = selectedEvent.longitude;
    const price = priceRanges.sort().join();
    const category = selectedOption.alias;
    const suggestedRestaurantsBars = await yelpFetchRestaurants(latitude, longitude, price, category)
    
    type === 'before' ? storeSuggestedRestaurants(suggestedRestaurantsBars) : 
      storeSuggestedBars(suggestedRestaurantsBars);
  } else if (this.props.selectedEvent === null) {
    this.toggleEventError();
  }
}

render() {
  const { selectedOption, priceRange } = this.state;
  const beforeAfter = this.props.type === 'before' ? 'before' : 'after';
  const restaurantBar = this.props.type === 'before' ? 'restaurant' : 'bar';
  const beforeAfterCategories = this.props.type === 'before' ? beforeEventCategoryCleaner() : afterEventCategoryCleaner();
  const className = beforeAfter + 'Event';
  const priceSelected = this.state.priceRanges.includes()

  return (
    <div className={className}>
      <h3>{beforeAfter} the event</h3>
      <p className="filterTitle">{restaurantBar} category</p>
      <Select
        name="searchEventsInput"
        options={beforeAfterCategories}
        value={selectedOption}
        onChange={this.onSelect}
        placeholder="Choose a category"
      />
      <p className="filterTitle">Price</p>
      <div className="priceRange">
        <span onClick={() => this.changePriceRange('1')} className={this.state.priceRanges.includes('1') ? 'selected' : null}>$</span>
        <span onClick={() => this.changePriceRange('2')} className={this.state.priceRanges.includes('2') ? 'selected' : null}>$$</span>
        <span onClick={() => this.changePriceRange('3')} className={this.state.priceRanges.includes('3') ? 'selected' : null}>$$$</span>
        <span onClick={() => this.changePriceRange('4')} className={this.state.priceRanges.includes('4') ? 'selected last' : 'last'}>$$$$</span>
      </div>
      <button onClick={this.handleRestaurantClick}>Submit</button>
    </div>
  );
}
}

export const mapDispatchToProps = (dispatch) => ({
  storeSuggestedRestaurants: (restaurants) => dispatch(storeSuggestedRestaurants(restaurants)),
  storeSuggestedBars: (bars) => dispatch(storeSuggestedBars(bars)),
  toggleEventError: (boolean) => dispatch(toggleEventError(boolean))
})

export const mapStateToProps = (state) => ({
  selectedEvent: state.selectedEvent,
  eventError: state.eventError
});

export default connect(mapStateToProps, mapDispatchToProps)(StopSelection);
