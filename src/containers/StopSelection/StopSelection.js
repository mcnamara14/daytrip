import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StopSelection.css';
import { beforeEventCategoryCleaner } from '../../dataCleaners/beforeEventCategoryCleaner';
import { afterEventCategoryCleaner } from '../../dataCleaners/afterEventCategoryCleaner';
import { Async } from 'react-select';
import { yelpFetchRestaurants } from '../../apiCalls/yelpApiCall';

export class StopSelection extends Component {
  constructor() {
    super();

    this.state = {
      selectedOption: {},
      priceRanges:[]
    }
  };

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

handleRestaurantClick = () => {
  console.log('hello')
  const latitude = this.props.selectedEvent.latitude;
  const longitude = this.props.selectedEvent.longitude;
  const price = this.state.priceRanges.sort().join();
  const category = this.state.selectedOption.alias;

  yelpFetchRestaurants(latitude, longitude, price, category)
}

render() {
  const { selectedOption, priceRange } = this.state;
  const beforeAfter = this.props.type === 'before' ? 'before' : 'after';
  const restaurantBar = this.props.type === 'before' ? 'restaurant' : 'bar';
  const beforeAfterCategories = this.props.type === 'before' ? this.beforeEventCategories : this.afterEventCategories;
  const className = beforeAfter + 'Event';

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
        <span onClick={() => this.changePriceRange('1')} >$</span>
        <span onClick={() => this.changePriceRange('2')} >$$</span>
        <span onClick={() => this.changePriceRange('3')} >$$$</span>
        <span onClick={() => this.changePriceRange('4')} className="last">$$$$</span>
      </div>
      <button onClick={this.handleRestaurantClick}>Submit</button>
    </div>
  );
}
}

export const mapStateToProps = (state) => ({
  selectedEvent: state.selectedEvent
});

export default connect(mapStateToProps)(StopSelection);
