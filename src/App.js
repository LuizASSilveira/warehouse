import React, { Component } from 'react';
import logo from './logo.svg';
import Nav from './componentes/navbarAdm';
class App extends Component {
  render() {
    return (
      <Nav isadm={false}/>
    );
  }
}

export default App;
