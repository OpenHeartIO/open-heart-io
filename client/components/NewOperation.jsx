import React, { useState }from 'react';
import axios from 'axios';

const NewOperation = () => {
  const [operation, setOperation] = useState(null);
  const [date, setDate] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [preinsuranceCost, setPreinsuranceCost] = useState(null);
  const [oopCost, setOopCost] = useState(null);

  return (
    <div id="new-operation-form">
      <div>Operation: <input type="text" onChange={(e) => setOperation(e.target.value)}/></div>
      <div>Date Performed: <input type="date" onChange={(e) => setDate(e.target.value)}/></div>
      <div>Insurance Provider: <input type="text" onChange={(e) => setInsurance(e.target.value)}/></div>
      <div>Pre-Insurance Cost: <input type="number" onChange={(e) => setPreinsuranceCost(e.target.value)}/></div>
      <div>Out of Pocket Cost: <input type="number" onChange={(e) => setOopCost(e.target.value)}/></div>
      <input 
        id="operation-submit"
        type="submit" 
        value="Submit" 
        onClick={() => {
          // Post request to backend
          axios.post('/newoperation', {
            operation,
            date,
            insurance,
            preinsuranceCost,
            oopCost
          })
            .then(response => console.log(response))
            .catch(err => console.log(err))
        }}
      />
    </div>
  );
};

export default NewOperation;