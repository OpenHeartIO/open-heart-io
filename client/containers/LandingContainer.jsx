import React from 'react';
import SearchBar from '../components/SearchBar.jsx';

const LandingContainer = (props) => {
  return (
    <div id="landing-container">
      <SearchBar updateCurrentLocation={props.updateCurrentLocation} toggleBoolean={props.toggleBoolean} forceRender={props.forceRender}/>
    </div>
  );
};

export default LandingContainer;