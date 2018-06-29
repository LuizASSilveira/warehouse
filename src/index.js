import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import App from "./App";

import { Switch, Route, BrowserRouter } from "react-router-dom";

import Login          from './componentes/login'
import Criar          from './Requisicao/criar'
import Historico      from './Requisicao/historico'
import EditarReq      from './Requisicao/editar'

import criarSiorg     from './Siorg/criar'
import criarLista     from './Siorg/pesquisar'

import criarS         from './Solicitacao/criar'
import Orcamento      from './Solicitacao/orcamentoPage'  
import HistoricoSol   from './Solicitacao/historico'
import ValidarS       from './Solicitacao/validar'
import ValidEspec     from './Solicitacao/validarEspec'

import AlmoEmprestimo from './Almoxarifado/emprestimo'
import AlmoPedido     from './Almoxarifado/Pedidos'
import AlmoHistorico  from './Almoxarifado/historico'
import AlmoDevolucao  from './Almoxarifado/devolucao'
import AlmoInfo       from './Almoxarifado/info'

import PaginaRed from './pageRedirect'
 // Função verifica se usuário está logado, perguntando se há algo em localStorage.
 function logged(){
   if(window.localStorage.length){
     return true
   }
   return false
 }

 // Função que verifica se usuário está logado e é Admin.
 function loggedAndAdm(){
   let adm
   adm = localStorage.getItem('isAdm')
   // If necessário para converter string para tipo booleano.
   if(adm === 'true'){
     adm = true
   }else{
     adm = false
   }

   if(adm){
     return true
   }
   return false
 }

 // Função retorna componente para ser renderizado apenas se usuário está logado.
 function to(Component,history){
   return !logged() ? 
     (<PaginaRed/>) :
     (<Component history={history} {...history}/>)
 }

 // Função retorna componente para ser renderizado apenas se usuário está logado e é adm.
 function toUsertoo(Component, history){
   return !loggedAndAdm() ? 
     (<PaginaRed/>) :
     (<Component history={history} {...history}/>)
 }

ReactDOM.render(
  (
  <BrowserRouter>
    <App>
      <Switch>
        
        <Route exact  path="/"                         component={Login}/>
        <Route        path="/requisicao/criar"         render={(history)=> toUsertoo(Criar, history)}/>
        <Route        path="/requisicao/historico"     render={(history)=> toUsertoo(Historico, history)}/>
        <Route        path="/requisicao/editar/:id"    render={(history)=> toUsertoo(EditarReq,history)}/>

        <Route        path="/solicitacao/historico"    render={(history)=> to(HistoricoSol,history)}/>

        <Route        path="/solicitacao/criar"        render={(history)=> to(criarS,history)}/>
        <Route exact  path="/solicitacao/orcamento/:id"render={(history)=> to(Orcamento,history)}/>
        
        <Route exact  path="/solicitacao/validar"      render={(history)=> toUsertoo(ValidarS,history)}/>
        <Route exact  path="/solicitacao/validar/:id"  render={(history)=> toUsertoo(ValidEspec,history)}/>

        <Route        path="/siorg/criar"              render={(history)=> toUsertoo(criarSiorg, history)}/>
        <Route        path="/siorg/lista"              render={(history)=> to(criarLista,history)}/>

        <Route        path="/almoxarifado/compras"     render={(history)=> toUsertoo(AlmoPedido,history)}/>
        <Route        path="/almoxarifado/info"        render={(history)=> toUsertoo(AlmoInfo,history)}/>
        
        <Route        path="/almoxarifado/emprestimo"  render={(history)=> to(AlmoEmprestimo,history)}/>
        <Route        path="/almoxarifado/historico"   render={(history)=> to(AlmoHistorico,history)}/>
        <Route        path="/almoxarifado/devolucao"   render={(history)=> toUsertoo(AlmoDevolucao,history)}/>

      </Switch>
    </App>
  </BrowserRouter>
)
,document.getElementById('root'));
registerServiceWorker();
