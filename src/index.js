import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './componentes/css/login.css'
import App from './App';

import { Switch,Route,BrowserRouter } from 'react-router-dom'

import Login      from './componentes/login'
import Criar      from './Requisicao/criar'
import Historico  from './Requisicao/historico'
import criarS     from './Solicitacao/criar'

ReactDOM.render(
(
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/"           component={Login}/>
        <Route        path="/criar"     component={Criar}/>
        <Route        path="/historico" component={Historico} />

        <Route        path="/solicitacao/criar" component={criarS} />
      </Switch>
    </App>
  </BrowserRouter>
)
,document.getElementById('root'));

registerServiceWorker();
