import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StopSelection.css';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as firebase from 'firebase';
import 'firebase/database';
import { 
  beforeEventCategoryCleaner, 
  afterEventCategoryCleaner 
} from '../../dataCleaners';
import { fetchRestaurantsAndBars } from '../../apiCalls';
import { 
  storeSuggestedRestaurants, 
  storeSuggestedBars, 
  toggleEventError,
  storeRestaurantFilters,
  storeBarFilters
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
    let priceRanges;

    if (!this.state.priceRanges.includes(price)) {
      priceRanges = [...this.state.priceRanges, price];
      
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
    console.log(this.props.type)
    this.props.type === 'before' ? this.props.storeRestaurantFilters(this.state.selectedOption.alias, priceRanges) :
      this.props.storeBarFilters(this.state.selectedOption.alias, priceRanges);
    
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
            className={priceRanges.includes('1') ? 'selected' : 'priceOne'}>$</span>
          <span 
            onClick={() => this.changePriceRange('2')} 
            className={priceRanges.includes('2') ? 'selected' : 'priceTwo'}>$$</span>
          <span 
            onClick={() => this.changePriceRange('3')} 
            className={priceRanges.includes('3') ? 'selected' : 'priceThree'}>$$$</span>
          <span 
            onClick={() => this.changePriceRange('4')} 
            className={priceRanges.includes('4') ? 'selected last' : 
              'priceFour last'}>$$$$</span>
        </div>
      </div>
    );
  }
}

StopSelection.propTypes = {
  storeSuggestedRestaurants: PropTypes.func,
  storeSuggestedBars: PropTypes.func,
  toggleEventError: PropTypes.func,
  selectedEvent: PropTypes.object,
  eventError: PropTypes.string,
  type: PropTypes.string
};

export const mapDispatchToProps = (dispatch) => ({
  storeSuggestedRestaurants: (restaurants) => {
    return dispatch(storeSuggestedRestaurants(restaurants));
  },
  storeSuggestedBars: (bars) => dispatch(storeSuggestedBars(bars)),
  toggleEventError: (boolean) => dispatch(toggleEventError(boolean)),
  storeRestaurantFilters: (category, priceRanges) => {
    return dispatch(storeRestaurantFilters(category, priceRanges))
  },
  storeBarFilters: (category, priceRanges) => {
    return dispatch(storeBarFilters(category, priceRanges))
  },
});

export const mapStateToProps = (state) => ({
  selectedEvent: state.selectedEvent,
  eventError: state.eventError
});

export default connect(mapStateToProps, mapDispatchToProps)(StopSelection);
