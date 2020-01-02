import React from  "react";

import HeaderContainer from './containers/HeaderContainer.jsx';
import MainContainer from './containers/MainContainter.jsx';
import NewLocationContainer from './containers/NewLocationContainer.jsx';
import NewOperationContainer from './containers/NewOperationContainer.jsx';
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
      addNewOperation: false,

    }
    
  }

  updateLocation(search) {
    fetch(`/location/${search}`)
      .then(data => data.json())
      .then(result => this.setState({locationInfo: result}))
  }

  render() {
    let view;
    if (this.landingPage) {
      view = <LandingContainer/>;
    } else if (this.location) {
      view = <MainContainer/>;
    } else if (this.addNewLocation) {
      view = <NewLocationContainer/>;
    } else if (this.addNewOperation) {
      view = <NewOperationContainer/>
    }
    return (
      <div id="app">
        <HeaderContainer/>
        { view }
      </div>
    )
  }
}
 
export default App;
