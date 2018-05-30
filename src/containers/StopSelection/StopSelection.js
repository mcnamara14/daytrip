import React, { Component } from 'react';
import './StopSelection.css';
import { fetchYelpCategories } from '../../apiCalls/yelpApiCall';
import { Async } from 'react-select';

export class StopSelection extends Component {
  constructor() {
    super();

    this.state = {
      selectedOption: null
    };
  }

handleTicketMasterFetch = async (input) => {
console.log('111')
 fetchYelpCategories(input)
}

handleChange = (date) => {
  this.setState({
    startDate: date
  });
}

onSelect = (selectedOption) => {
  this.setState({ selectedOption });
  
  if (selectedOption) {
    console.log(`Selected: ${selectedOption.id}`);
  }
}

render() {
  const { selectedOption } = this.state;
  const beforeAfter = this.props.type === 'before' ? 'before' : 'after';
  const restaurantBar = this.props.type === 'before' ? 'restaurant' : 'bar';

  return (
    <div>
      <h3>{beforeAfter} the event</h3>
      <p>{restaurantBar} category</p>
      <Async
        name="searchEventsInput"
        loadOptions={this.handleTicketMasterFetch}
        value={selectedOption}
        onChange={this.onSelect}
        placeholder="Search events"
      />
    </div>
  );
}
}
