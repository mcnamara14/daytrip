import React, { Component } from 'react';
import './StopSelection.css';
import { beforeEventCategoryCleaner } from '../../dataCleaners/beforeEventCategoryCleaner';
import { afterEventCategoryCleaner } from '../../dataCleaners/afterEventCategoryCleaner';
import { Async } from 'react-select';

export class StopSelection extends Component {
  constructor() {
    super();

    this.state = {
      selectedOption: {}
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

render() {
  const { selectedOption} = this.state;
  const beforeAfter = this.props.type === 'before' ? 'before' : 'after';
  const restaurantBar = this.props.type === 'before' ? 'restaurant' : 'bar';
  const beforeAfterCategories = this.props.type === 'before' ? this.beforeEventCategories : this.afterEventCategories;

  return (
    <div>
      <h3>{beforeAfter} the event</h3>
      <p>{restaurantBar} category</p>
      <Async
        name="searchEventsInput"
        loadOptions={beforeAfterCategories}
        value={selectedOption}
        onChange={this.onSelect}
        placeholder="Choose a category"
      />
    </div>
  );
}
}
