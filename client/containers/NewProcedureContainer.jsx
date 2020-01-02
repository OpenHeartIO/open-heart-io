import React from 'react';
import NewProcedure from '../components/NewProcedure.jsx'

const NewProcedureContainer = (props) => {
  return (
    <div id="new-procedure-container">
      <h4>Add New Procedure Information</h4>
      <NewProcedure currentLocation={props.currentLocation}/>
    </div>
  );
};

export default NewProcedureContainer;