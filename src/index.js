import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './componentes/css/login.css'
import App from './App';

import { Switch,Router,Route,BrowserRouter } from 'react-router-dom'

import Login from './componentes/login';
import Criar from './Requisicao/criar';

ReactDOM.render(
(
  
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/"   component={Login}/>
          <Route path="/criar"    component={Criar}/>
        </Switch>
      </App>
    </BrowserRouter>

)
,document.getElementById('root'));

registerServiceWorker();
