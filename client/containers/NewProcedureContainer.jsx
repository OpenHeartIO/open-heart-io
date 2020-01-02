import React from 'react';
import NewProcedure from '../components/NewProcedure.jsx'

const NewProcedureContainer = () => {
  return (
    <div id="new-procedure-container">
      <h4>Add New Procedure Information</h4>
      <NewProcedure toggleBoolean={this.toggleBoolean}/>
    </div>
  );
};

export default NewProcedureContainer;