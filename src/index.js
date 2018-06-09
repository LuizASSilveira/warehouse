import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import { Switch,Route,BrowserRouter } from 'react-router-dom'

import Login        from './componentes/login'
import Criar        from './Requisicao/criar'
import Historico    from './Requisicao/historico'
import EditarReq    from './Requisicao/editar'

import criarSiorg   from './Siorg/criar'
import criarLista   from './Siorg/pesquisar'

import criarS       from './Solicitacao/criar'
import Orcamento    from './Solicitacao/orcamento'  
import HistoricoSol from './Solicitacao/historico'
import ValidarS from './Solicitacao/validar'
import ValidEspec from './Solicitacao/validarEspec'


ReactDOM.render(
(
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact  path="/"             component={Login}/>
        <Route        path="/requisicao/criar"       component={Criar}/>
        <Route        path="/requisicao/historico"   component={Historico} />
        <Route        path="/requisicao/editar"      component={EditarReq}/>

        <Route        path="/solicitacao/historico"   component={HistoricoSol}/>
        <Route        path="/solicitacao/criar"      component={criarS} />
        <Route        path="/solicitacao/orcamento"  component={Orcamento} />
        <Route   exact     path="/solicitacao/validar"     component={ValidarS}/>
        <Route exact path="/solicitacao/validar/:id"     component={ValidEspec}/>
        
        <Route        path="/siorg/criar" component={criarSiorg} />
        <Route        path="/siorg/lista" component={criarLista} />

      </Switch>
    </App>
  </BrowserRouter>
)
,document.getElementById('root'));

registerServiceWorker();
