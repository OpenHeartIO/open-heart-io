import React from  "react";

import HeaderContainer from './containers/HeaderContainer.jsx';
import MainContainer from './containers/MainContainter.jsx';
import OperationsContainer from './containers/OperationContainer.jsx';
import SearchBar from './components/SearchBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Data from Backend
      locationInfo: null,
      // Booleans for conditional loading
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
    if (!location && !addNewLocation) {
      view = (
        <div id="app">
          <HeaderContainer/>
          <SearchBar/>
        </div>
      );
    } else if (location) {
      view = (
        <div id="app">
          <HeaderContainer/>
          <MainContainer/>
        </div>
      );
    } else if (addNewLocation) {
      view = (
        <div id="app">
          <HeaderContainer/>
          <OperationsContainer/>
        </div>
      );
    }
    return (
      { view }
    )
  }
}
 
export default App;