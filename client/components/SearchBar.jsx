import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = (props) => {
  const [location, setLocation] = useState(null);

  return (
    <>
      <input 
        id="searchbar" 
        type="search"
        onChange={(e) => setLocation(e.target.value)}
      />
      <input 
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
              // If location exists in db, render Location Overview page
              if (response.status === 200) {
                props.toggleBoolean(["landingPage", "location"]);
              }
              // If location doesn't exist, render Add New Location page
              else if (response.status === 400) {
                props.toggleBoolean(["landingPage", "addNewLocation"]);
              }
            })
            .catch(err => console.log(err))
        }}
      />
    </>
  );
};

export default SearchBar;