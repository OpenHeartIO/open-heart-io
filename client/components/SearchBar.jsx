import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = (props) => {
  const [location, setLocation] = useState(null);

  return (
    <div id="searchbar">
      <input 
        id="bar"
        type="search"
        onChange={(e) => setLocation(e.target.value.toUpperCase())}
      />
      <input 
        id="button"
        type="submit" 
        value="Search"
        onClick={() => {
          props.updateCurrentLocation(location);

          axios.get('/search', {
            params: {
              location
            }
          })
            .then(response => {
              // If location doesn't exist, render Add New Location page
              if (response.data.msg) {
                props.toggleBoolean(["landingPage", "addNewLocation"]);
              }
              // If location exists in db, render Location Overview page
              else if (response.status === 200) {
                console.log(response.data)
                props.updateInfo(response.data);
                props.toggleBoolean(["landingPage", "location"]);
              }
            })
            .catch(err => console.log(err))
        }}
      />
    </div>
  );
};

export default SearchBar;
