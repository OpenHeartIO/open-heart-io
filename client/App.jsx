import React from  "react";

import HeaderContainer from './containers/HeaderContainer.jsx';
import MainContainer from './containers/MainContainter.jsx';
import NewLocationContainer from './containers/NewLocationContainer.jsx';
import NewProcedureContainer from './containers/NewProcedureContainer.jsx';
import LandingContainer from './containers/LandingContainer.jsx';

import './stylesheets/style.scss';

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
    }
    this.toggleBoolean = this.toggleBoolean.bind(this);
    this.procedureClick = this.procedureClick.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.updateCurrentLocation = this.updateCurrentLocation.bind(this);
  }

  toggleBoolean(properties) {
    const updateObj = {};
    for (let i = 0; i < properties.length; i++) {
      this.state[properties[i]] ? updateObj[properties[i]] = false : updateObj[properties[i]] = true;
    }
    console.log('update obj -> ', updateObj);
    this.setState(updateObj);
  }

  procedureClick(target) {
    const clone = JSON.parse(JSON.stringify(this.state.locationInfo));
    clone.procedures[target].clicked ? clone.procedures[target].clicked = false : clone.procedures[target].clicked = true;
    this.setState({locationInfo: clone});
  }

  updateInfo(info) {
    this.setState({locationInfo: info})
  }
        
  updateCurrentLocation = (location) => {
    this.setState({currentLocation: location});
  }

  render() {
    let view;
    if (this.state.addNewProcedure) {
      view = <NewProcedureContainer toggleBoolean={this.toggleBoolean} currentLocation={this.state.currentLocation}/>;
    } else if (this.state.landingPage) {
      view = <LandingContainer updateCurrentLocation={this.updateCurrentLocation} toggleBoolean={this.toggleBoolean} updateInfo={this.updateInfo}/>;
    } else if (this.state.location) {
      view = <MainContainer locationInfo={this.state.locationInfo} currentLocation={this.state.currentLocation} toggleBoolean={this.toggleBoolean} procedureClick={this.procedureClick}/>;
    } else if (this.state.addNewLocation) {
      view = <NewLocationContainer toggleBoolean={this.toggleBoolean}/>;
    }
    return (
      <div id="App">
        <HeaderContainer location={this.state.location} updateInfo={this.updateInfo}/>
        { view }
      </div>
    )
  }
}
 
export default App;
