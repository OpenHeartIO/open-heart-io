import React, { useState } from 'react';
import axios from 'axios';

const NewLocation = () => {
  const [newLocation, setNewLocation] = useState(null);
  
  return (
    <div id="new-location-form">
      Name: 
      <input 
        id="location-input"
        type="text" 
        placeholder="Add new location" 
        onChange={(e) => setNewLocation(e.target.value)}
      />
      <input 
        id="location-submit"
        type="submit" 
        value="Submit"
        onClick={() => {
          // Post request logic
          axios.post('/newlocation', {newLocation})
            .then(response => console.log(response))
            .catch(err => console.log(err))
        }}
      />
    </div>
  );
};

export default NewLocation;