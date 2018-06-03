import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import { Switch,Route,BrowserRouter,Redirect } from 'react-router-dom'

import Login        from './componentes/login'
import Criar        from './Requisicao/criar'
import Historico    from './Requisicao/historico'
import EditarReq    from './Requisicao/editar'

import criarSiorg   from './Siorg/criar'
import criarLista   from './Siorg/pesquisar'

import criarS       from './Solicitacao/criar'
import Orcamento    from './Solicitacao/orcamento'
import Editar       from './Solicitacao/editar'  
import HistoricoSol from './Solicitacao/hitorico'

ReactDOM.render(
(
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact  path="/"             component={Login}/>
        <Route        path="/requisicao/criar"       component={Criar}/>
        <Route        path="/requisicao/historico"   component={Historico} />
        <Route        path="/requisicao/editar"      component={EditarReq}/>

        <Route        path="/solicitacao/hitorico"   component={HistoricoSol}/>
        <Route        path="/solicitacao/criar"      component={criarS} />
        <Route        path="/solicitacao/orcamento"  component={Orcamento} />
        <Route        path="/solicitacao/editar"     component={Editar}/>
        
        <Route        path="/siorg/criar" component={criarSiorg} />
        <Route        path="/siorg/lista" component={criarLista} />

        <Redirect to="/"  />        
      </Switch>
    </App>
  </BrowserRouter>
)
,document.getElementById('root'));

registerServiceWorker();
