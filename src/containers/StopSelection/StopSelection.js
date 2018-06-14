import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StopSelection.css';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { 
  beforeEventCategoryCleaner, 
  afterEventCategoryCleaner 
} from '../../dataCleaners';
import { 
  storeSuggestedRestaurants, 
  storeSuggestedBars, 
  toggleEventError,
  storeRestaurantCategory,
  storeBarCategory,
  storeRestaurantPrice,
  storeBarPrice
} from '../../actions';

export class StopSelection extends Component {
  constructor() {
    super();

    this.state = {
      selectedOption: null,
      priceRanges:[]
    };
  }

  onSelect = (selectedOption) => {
    this.setState({selectedOption}, () => {
      this.storeCategory();
    });
  }

  changePriceRange = (price) => {
    let priceRanges;

    if (!this.state.priceRanges.includes(price)) {
      priceRanges = [...this.state.priceRanges, price];
      
      this.setState({priceRanges}, () => this.storePriceRange());
    } else {
      const priceRanges = this.state.priceRanges.filter(range => {
        return range !== price;
      });
      
      this.setState({priceRanges}, () => this.storePriceRange());
    }
  }

  toggleEventError = () => {
    this.props.toggleEventError(true);
    setTimeout(() => {
      this.props.toggleEventError(false);
    }, 2000);
  }

  storePriceRange = () => {
    this.props.type === 'before' ?
      this.props.storeRestaurantPrice(this.state.priceRanges) :
      this.props.storeBarPrice(this.state.priceRanges)
  }

  storeCategory = () => {
    this.props.type === 'before' ? 
      this.props.storeRestaurantCategory(this.state.selectedOption.alias) :
      this.props.storeBarCategory(this.state.selectedOption.alias);
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
            className={priceRanges.includes('1') ? 
              'selected' : 
              'priceOne'}>$</span>
          <span 
            onClick={() => this.changePriceRange('2')} 
            className={priceRanges.includes('2') ? 
              'selected' : 
              'priceTwo'}>$$</span>
          <span 
            onClick={() => this.changePriceRange('3')} 
            className={priceRanges.includes('3') ? 
              'selected' : 
              'priceThree'}>$$$</span>
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
  type: PropTypes.string,
  storeRestaurantFilters: PropTypes.func,
  storeBarFilters: PropTypes.func
};

export const mapDispatchToProps = (dispatch) => ({
  storeSuggestedRestaurants: (restaurants) => {
    return dispatch(storeSuggestedRestaurants(restaurants));
  },
  storeSuggestedBars: (bars) => dispatch(storeSuggestedBars(bars)),
  toggleEventError: (boolean) => dispatch(toggleEventError(boolean)),
  storeRestaurantPrice: (boolean) => dispatch(storeRestaurantPrice(boolean)),
  storeBarPrice: (price) => dispatch(storeBarPrice(price)),
  storeRestaurantCategory: (category) => {
    return dispatch(storeRestaurantCategory(category));
  },
  storeBarCategory: (category) => {
    return dispatch(storeBarCategory(category));
  }
});

export const mapStateToProps = (state) => ({
  selectedEvent: state.selectedEvent,
  eventError: state.eventError
});

export default connect(mapStateToProps, mapDispatchToProps)(StopSelection);
