import React, { useState } from 'react';
import axios from 'axios';

const NewLocation = (props) => {
  const [location, setLocation] = useState(null);
  const [procedure, setProcedure] = useState(null);
  const [date, setDate] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [preinsuranceCost, setPreinsuranceCost] = useState(null);
  const [oopCost, setOopCost] = useState(null);
  
  return (
    <div id="new-location-form">
      <div>Location Name: <input id="location-input" type="text" onChange={(e) => setLocation(e.target.value)}/></div>
      <div>Procedure: <input type="text" onChange={(e) => setProcedure(e.target.value)}/></div>
      <div>Date Performed: <input type="date" onChange={(e) => setDate(e.target.value)}/></div>
      <div>Insurance Provider: <input type="text" onChange={(e) => setInsurance(e.target.value)}/></div>
      <div>Pre-Insurance Cost: <input type="number" onChange={(e) => setPreinsuranceCost(e.target.value)}/></div>
      <div>Out of Pocket Cost: <input type="number" onChange={(e) => setOopCost(e.target.value)}/></div>
      <input 
        id="location-submit"
        type="submit" 
        value="Submit"
        onClick={() => {
          // Post request logic
          axios.post('/create', {
            location,
            procedure,
            date,
            insurance,
            preinsuranceCost,
            oopCost
          })
            .then(response => console.log(response))
            .catch(err => console.log(err))
        }}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            // Post request logic
            axios.post('/create', {
              location,
              procedure,
              date,
              insurance,
              preinsuranceCost,
              oopCost
            })
              .then(response => console.log(response))
              .catch(err => console.log(err))
          }
        }}
      />
      <input 
        id="location-back"
        type="submit"
        value="Back"
        onClick={() => {
          props.toggleBoolean(['landingPage', 'location']);
        }}
      />
    </div>
  );
};

export default NewLocation;