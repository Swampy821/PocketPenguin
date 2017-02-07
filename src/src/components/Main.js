require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import HeaderBar from "./HeaderBar";
import ProgramList from "./ProgramList";

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      programList: false
    }
  }
  render() {
    return (
      <div className="index">
          <HeaderBar {...this.props}/>
          {this.state.programList && <ProgramList {...this.props} />} 
      </div>
    );
  }
}

AppComponent.defaultProps = {
  programList: false
};

export default AppComponent;
