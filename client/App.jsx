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
    }
    this.toggleBoolean = this.toggleBoolean.bind(this);
  }

  toggleBoolean(property) {
    const updateObj = {};
    this.state[property] ? updateObj[property] = false : updateObj[property] = true;
    this.setState({updateObj});
  }

  updateCurrentLocation = (location) => {
    this.setState({currentLocation: location})
  }

  render() {
    let view;
    if (this.state.addNewProcedure) {
      view = <NewProcedureContainer toggleBoolean={this.toggleBoolean} currentLocation={this.state.currentLocation}/>;
    } else if (this.state.landingPage) {
      view = <LandingContainer updateCurrentLocation={this.state.updateCurrentLocation}/>;
    } else if (this.state.location) {
      view = <MainContainer locationInfo={this.state.locationInfo} toggleBoolean={this.toggleBoolean}/>;
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
