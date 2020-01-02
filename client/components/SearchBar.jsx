import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [searchLocation, setSearchLocation] = useState(null);

  return (
    <>
      <input 
        id="searchbar" 
        type="search"
        onChange={(e) => setSearchLocation(e.target.value)}
      />
      <input 
        type="submit" 
        value="Search"
        onClick={() => {
          axios.get('/search', {searchLocation})
            .then(response => {
              // If location exists in db, render Location Overview page

              // If location doesn't exist, render Add New Location page
              
            })
            .catch(err => console.log(err))
        }}
      />
    </>
  );
};

export default SearchBar;