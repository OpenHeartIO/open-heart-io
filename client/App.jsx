import React from  "react";

import HeaderContainer from './containers/HeaderContainer.jsx';
import MainContainer from './containers/MainContainter.jsx';
import NewLocationContainer from './containers/NewLocationContainer.jsx';
import NewOperationContainer from './containers/NewOperationContainer.jsx';
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
      view = <SearchBar/>;
    } else if (location) {
      view = <MainContainer locationInfo={this.state.locationInfo}/>;
    } else if (addNewLocation) {
      view = <NewLocationContainer/>;
    }
    return (
      <div id="App">
        <HeaderContainer/>
        { view }
      </div>
    )
  }
}
 
export default App;
