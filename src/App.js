import React, { Component } from 'react';
import Nav from './componentes/navbarAdm';
import Login from './componentes/login' 
class App extends Component {
  render() {
    return (

    <div id="main">
      <Nav/>
      {this.props.children}
    </div>    
    )

  }
}

export default App;
