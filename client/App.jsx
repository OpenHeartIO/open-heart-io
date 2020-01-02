import React from  "react";

import HeaderContainer from './containers/HeaderContainer.jsx';
import MainContainer from './containers/MainContainter.jsx';
import NewLocationContainer from './containers/NewLocationContainer.jsx';
import NewProcedureContainer from './containers/NewProcedureContainer.jsx';
import LandingContainer from './containers/LandingContainer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Data from Backend
      locationInfo: null,
      // Booleans for conditional loading
      landingPage: true,
      location: false,
      addNewLocation: false,
      addNewProcedure: false,
      // Current location to pass down to NewProcedure 
      currentLocation: null

      // // Test state //
      // // Data from Backend
      // locationInfo: {
      //   locationName: "hell",
      //   procedures: {
      //     procedure1: {
      //       range: [20, 40],
      //       avg: 33,
      //       clicked: false,
      //       entries: [{ date: "4-11-19", insurance: "blaj", preInsuranceCost: 1000, outOfPocketCost: 20 }, { date: "4-11-19", insurance: "pla", preInsuranceCost: 5000, outOfPocketCost: 150 }],
      //     },
      //     procedure2: {
      //       range: [50, 60],
      //       avg: 51,
      //       clicked: false,
      //       entries: [{ date: "4-11-19", insurance: "crap", preInsuranceCost: 2000, outOfPocketCost: 30 }, { date: "4-11-19", insurance: "rawr", preInsuranceCost: 6000, outOfPocketCost: 50 }],
      //     }
      //   }
      // },
      // // Booleans for conditional loading
      // landingPage: false,
      // location: true,
      // addNewLocation: false,
      // addNewProcedure: false,
      // // Current location to pass down to NewProcedure 
      // currentLocation: "hell",
      // // End Test state //
    }
    this.toggleBoolean = this.toggleBoolean.bind(this);
    this.procedureClick = this.procedureClick.bind(this);
    this.updateCurrentLocation = this.updateCurrentLocation.bind(this);
  }

  toggleBoolean(properties) {
    const updateObj = {};
    for (let i = 0; i < properties.length; i++) {
      this.state[properties[i]] ? updateObj[properties[i]] = false : updateObj[properties[i]] = true;
    }
    console.log('Update Obj ', updateObj);
    this.setState(updateObj);
  }

  procedureClick(target) {
    console.log(target)
    const clone = JSON.parse(JSON.stringify(this.state.locationInfo));
    clone.procedures[target].clicked ? clone.procedures[target].clicked = false : clone.procedures[target].clicked = true;
    this.setState({locationInfo: clone});
  }
        
  updateCurrentLocation = (location) => {
    this.setState({currentLocation: location});
  }

  render() {
    let view;
    if (this.state.addNewProcedure) {
      view = <NewProcedureContainer toggleBoolean={this.toggleBoolean} currentLocation={this.state.currentLocation}/>;
    } else if (this.state.landingPage) {
      view = <LandingContainer updateCurrentLocation={this.updateCurrentLocation} toggleBoolean={this.toggleBoolean} forceRender={this.forceRender}/>;
    } else if (this.state.location) {
      view = <MainContainer locationInfo={this.state.locationInfo} currentLocation={this.state.currentLocation} toggleBoolean={this.toggleBoolean} procedureClick={this.procedureClick}/>;
    } else if (this.state.addNewLocation) {
      view = <NewLocationContainer/>;
    }
    return (
      <div id="App">
        <HeaderContainer location={this.state.location}/>
        { view }
      </div>
    )
  }
}
 
export default App;
