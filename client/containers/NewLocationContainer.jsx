import React from 'react';
import NewLocation from '../components/NewLocation.jsx';

const NewLocationContainer = (props) => {
  return (
    <div id="new-location-container">
      <h4>Add New Location</h4>
      <NewLocation toggleBoolean={props.toggleBoolean}/>
    </div>
  );
};

export default NewLocationContainer;