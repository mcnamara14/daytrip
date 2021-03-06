import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'; 
import Header from '../Header/Header';
import Login from '../../containers/Login/Login';
import Events from '../../containers/Events/Events';
import Plan from '../../containers/Plan/Plan';


class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <div className="mainContent">
          <Route exact path='/' component={Login} />
          <Route exact path='/events' component={Events} />
          <Route exact path='/plan' component={Plan} />
        </div>
      </div>
    );
  }
}

export default App;
