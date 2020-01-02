import React from 'react';
import SearchBar from '../components/SearchBar.jsx';

const LandingContainer = (props) => {
  return (
    <div id="landing-container">
      <SearchBar updateCurrentLocation={props.updateCurrentLocation} toggleBoolean={props.toggleBoolean} updateInfo={props.updateInfo}/>
    </div>
  );
};

export default LandingContainer;
