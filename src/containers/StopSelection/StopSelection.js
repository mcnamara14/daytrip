import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StopSelection.css';
import { beforeEventCategoryCleaner } from '../../dataCleaners/beforeEventCategoryCleaner';
import { afterEventCategoryCleaner } from '../../dataCleaners/afterEventCategoryCleaner';
import { Async } from 'react-select';
import { yelpFetchRestaurants } from '../../apiCalls/yelpApiCall';
import { storeSuggestedRestaurants, storeSuggestedBars, toggleEventError } from '../../actions';

export class StopSelection extends Component {
  constructor() {
    super();

    this.state = {
      selectedOption: {},
      priceRanges:[]
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedEvent) {
      setTimeout(() => {
        console.log('event', this.props.selectedEvent)
        this.handleRestaurantClick();
      }, 0);
    }
  }

beforeEventCategories = async () => {
  return beforeEventCategoryCleaner();
}

afterEventCategories = async () => {
  return afterEventCategoryCleaner();
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
  if (this.props.selectedEvent !== null) {
    const latitude = this.props.selectedEvent.latitude;
    const longitude = this.props.selectedEvent.longitude;
    const price = this.state.priceRanges.sort().join();
    const category = this.state.selectedOption.alias;
    console.log(this.props.selectedEvent)
    console.log(latitude)
    console.log(longitude)
    console.log(price)
    console.log(category)
    const suggestedRestaurantsBars = await yelpFetchRestaurants(latitude, longitude, price, category)
    
    this.props.type === 'before' ? this.props.storeSuggestedRestaurants(suggestedRestaurantsBars) : 
      this.props.storeSuggestedBars(suggestedRestaurantsBars);
  } else {
    this.toggleEventError();
  }
}

render() {
  const { selectedOption, priceRange } = this.state;
  const beforeAfter = this.props.type === 'before' ? 'before' : 'after';
  const restaurantBar = this.props.type === 'before' ? 'restaurant' : 'bar';
  const beforeAfterCategories = this.props.type === 'before' ? this.beforeEventCategories : this.afterEventCategories;
  const className = beforeAfter + 'Event';
  const priceSelected = this.state.priceRanges.includes()

  return (
    <div className={className}>
      <h3>{beforeAfter} the event</h3>
      <p className="filterTitle">{restaurantBar} category</p>
      <Async
        name="searchEventsInput"
        loadOptions={beforeAfterCategories}
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
