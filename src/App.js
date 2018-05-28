import React, { Component } from 'react';
import { Switch,Route,BrowserRouter } from 'react-router-dom'

import Login from './componentes/login';
import Criar from './Requisicao/criar';

class App extends Component {
  render() {
    return (

    <div id="main">
     <BrowserRouter>
        <Switch>
            <Route exact path="/"   component={Login}/>
            <Route path="/criar"    component={Criar}/>
        </Switch>
      </BrowserRouter>
    </div>    
    
    )

  }
}

export default App;
