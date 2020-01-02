import React from 'react';

/**
 * {
 *  locationName: String,
 *  procedures: {
 *    procedure1: {
 *      clicked: false,
 *      entries: [{ date: String, insurance: String, preInsuranceCost: Number, outOfPocketCost: Number }, { date: String, insurance: String, preInsuranceCost: Number, outOfPocketCost: Number }, etc],
 *    procedure2: {
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
    proceduresArray.push(<button id={x} onClick={(e) => props.updateInfo(e.target.id)}>{x}</button>);
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
      { proceduresArray }
    </div>
  )
}

export default MainContainer;