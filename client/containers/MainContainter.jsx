import React from 'react';

/**
 * {
 *  locationName: String,
 *  procedures: {
 *    procedure1: {
 *      range: Number,
 *      avg: Number,
 *      clicked: false,
 *      entries: [{ date: String, insurance: String, preInsuranceCost: Number, outOfPocketCost: Number }, { date: String, insurance: String, preInsuranceCost: Number, outOfPocketCost: Number }, etc],
 *    procedure2: {
 *      range: Number,
 *      avg: Number,
 *      clicked: false,
 *      entries: [{ date: String, insurance: String, preInsuranceCost: Number, outOfPocketCost: Number }, { date: String, insurance: String, preInsuranceCost: Number, outOfPocketCost: Number }, etc],
 *    etc...
 *  }
 * }
*/


const MainContainer = (props) => {
  const { procedures } = props.locationInfo;
  const proceduresArray = [];
  for (let x in procedures) {
    proceduresArray.push(
      <button id={x} onClick={(e) => props.procedureClick(e.target.id)}>
        <span>{x}</span>
        <span id="costs">
          <span id="avgCost">
            <span>Average Cost:</span>
            <span>{procedures[x].avg}</span>
          </span>
          <span id="costRange">
            <span>Cost Range:</span>
            <span>{procedures[x].range}</span>
          </span>
        </span>
      </button>
    );
    if (procedures[x].clicked) {
      for (let i = 0; i < procedures[x].entries.length; i++) {
        proceduresArray.push(
          <div id="procedure">
            <div id="date">{procedures[x].entries[i].date}</div>
            <div id="insuranceProvider">{procedures[x].entries[i].insurance}</div>
            <div id="preInsurance">{procedures[x].entries[i].preInsuranceCost}</div>
            <div id="outOfPocket">{procedures[x].entries[i].outOfPocketCost}</div>
          </div>
        )
      }
    }
  }
  return (
    <div id="MainContainer">
      <div id="location">
        <div id={props.currentLocation}>{props.currentLocation}</div>
        <button onClick={() => props.toggleBoolean("addNewProcedure")}>+</button>
      </div>
      { proceduresArray }
    </div>
  )
}

export default MainContainer;