import React from 'react';
import './StopsSelection.css';
import { StopSelection } from '../../containers/StopSelection/StopSelection'

export const StopsSelection = () =>  {
  return (
    <div className="stopsSelectionContainer">
      <StopSelection type={'before'}/>
      <StopSelection type={'after'}/>
    </div>
  );
};
