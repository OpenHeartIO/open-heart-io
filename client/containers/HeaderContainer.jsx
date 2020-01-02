import React from 'react';
import SearchBar from '../components/SearchBar.jsx';

const HeaderContainer = (props) => {
  return(
    <div id="header-container">
      <h4>Open Heart</h4>
      {props.location ? <SearchBar updateInfo={props.updateInfo}/> : <></>}
    </div>
  );
};

export default HeaderContainer;