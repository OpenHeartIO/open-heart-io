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
      <button id={x} className={x} onClick={(e) => props.procedureClick(e.target.className)}>
        <span className={x}>{x}</span>
        <span id="costs" className={x}>
          <span id="avgCost" className={x}>
            <span className={x}>Average Cost:</span>
            <span className={x}>${procedures[x].avg}</span>
          </span>
          <span id="costRange" className={x}>
            <span className={x}>Cost Range:</span>
            <span className={x}>${procedures[x].range[0]} - ${procedures[x].range[1]}</span>
          </span>
        </span>
      </button>
    );
    if (procedures[x].clicked) {
      const entriesTable = [];
      entriesTable.push(
        <>
          <div id="date">Date</div>
          <div id="insuranceProvider">Provider</div>
          <div id="preInsurance">Total Cost</div>
          <div id="outOfPocket">Out of Pocket</div>
        </>
      )
      for (let i = 0; i < procedures[x].entries.length; i++) {
        entriesTable.push(
          <>
            <div id="date">{procedures[x].entries[i].date}</div>
            <div id="insuranceProvider">{procedures[x].entries[i].insurance}</div>
            <div id="preInsurance">{procedures[x].entries[i].preInsuranceCost}</div>
            <div id="outOfPocket">{procedures[x].entries[i].outOfPocketCost}</div>
          </>
        )
      }
      proceduresArray.push(
        <div id="table">
          { entriesTable }
        </div>
      )
    }
  }
  return (
    <div id="MainContainer">
      <div id="location">
        <div id={props.currentLocation}>{props.currentLocation}</div>
        <button onClick={() => props.toggleBoolean(["addNewProcedure"])}>+</button>
      </div>
      { proceduresArray }
    </div>
  )
}

export default MainContainer;