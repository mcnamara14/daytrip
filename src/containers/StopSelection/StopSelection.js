import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StopSelection.css';
import Select from 'react-select';
import { 
  beforeEventCategoryCleaner, 
  afterEventCategoryCleaner 
} from '../../dataCleaners';
import { fetchRestaurantsAndBars } from '../../apiCalls';
import { 
  storeSuggestedRestaurants, 
  storeSuggestedBars, 
  toggleEventError 
} from '../../actions';

export class StopSelection extends Component {
  constructor() {
    super();

    this.state = {
      selectedOption: null,
      priceRanges:[]
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedEvent) {
      setTimeout(() => {
        this.storeRestaurantsOrBars();
      }, 0);
    }
  }

  onSelect = (selectedOption) => {
    this.setState({ selectedOption });
  }

  changePriceRange = (price) => {
    if (!this.state.priceRanges.includes(price)) {
      const priceRanges = [...this.state.priceRanges, price];
      
      this.setState({
        priceRanges 
      });
    } else {
      const priceRanges = this.state.priceRanges.filter(range => {
        return range !== price;
      });
      
      this.setState({
        priceRanges 
      });
    }
  }

  toggleEventError = () => {
    this.props.toggleEventError(true);
    setTimeout(() => {
      this.props.toggleEventError(false);
    }, 2000);
  }

  storeRestaurantsOrBars = async () => {
    const { 
      selectedEvent, 
      type, 
      storeSuggestedRestaurants, 
      storeSuggestedBars 
    } = this.props;
    const { selectedOption, priceRanges } = this.state;
    console.log(selectedOption)
    if (selectedEvent !== null && selectedOption !== null) {
      const latitude = selectedEvent.latitude;
      const longitude = selectedEvent.longitude;
      const price = priceRanges.sort().join();
      const category = selectedOption.alias;
      const suggestedRestaurantsBars = 
        await fetchRestaurantsAndBars(latitude, longitude, price, category);
      type === 'before' ? storeSuggestedRestaurants(suggestedRestaurantsBars) : 
        storeSuggestedBars(suggestedRestaurantsBars);
    } else if (selectedEvent === null) {
      this.toggleEventError();
    }
  }

  render() {
    const { selectedOption, priceRanges } = this.state;
    const { type } = this.props;
    const beforeAfter = type === 'before' ? 'before' : 'after';
    const restaurantBar = type === 'before' ? 'restaurant' : 'bar';
    const beforeAfterCategories = type === 'before' ? 
      beforeEventCategoryCleaner() : afterEventCategoryCleaner();
    const className = beforeAfter + 'Event';

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
          <span 
            onClick={() => this.changePriceRange('1')} 
            className={priceRanges.includes('1') ? 'selected' : null}>$</span>
          <span 
            onClick={() => this.changePriceRange('2')} 
            className={priceRanges.includes('2') ? 'selected' : null}>$$</span>
          <span 
            onClick={() => this.changePriceRange('3')} 
            className={priceRanges.includes('3') ? 'selected' : null}>$$$</span>
          <span 
            onClick={() => this.changePriceRange('4')} 
            className={priceRanges.includes('4') ? 'selected last' : 
              'last'}>$$$$</span>
        </div>
        <button onClick={this.storeRestaurantsOrBars}>Submit</button>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  storeSuggestedRestaurants: (restaurants) => {
    return dispatch(storeSuggestedRestaurants(restaurants));
  },
  storeSuggestedBars: (bars) => dispatch(storeSuggestedBars(bars)),
  toggleEventError: (boolean) => dispatch(toggleEventError(boolean))
});

export const mapStateToProps = (state) => ({
  selectedEvent: state.selectedEvent,
  eventError: state.eventError
});

export default connect(mapStateToProps, mapDispatchToProps)(StopSelection);
