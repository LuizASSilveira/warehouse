import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import App from "./App";

import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

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

   if(window.localStorage.length && adm){
     return true
   }
   return false
 }

 // Função retorna componente para ser renderizado apenas se usuário está logado.
 function to(Component){
   return !logged() ? 
     (<PaginaRed/>) :
     (<Component/>)
 }

 // Função retorna componente para ser renderizado apenas se usuário está logado e é adm.
 function toUsertoo(Component){
   return !loggedAndAdm() ? 
     (<PaginaRed/>) :
     (<Component/>)
 }

ReactDOM.render(
  (
  <BrowserRouter>
    <App>
      <Switch>
        
        <Route exact  path="/"                         component={Login}/>
        <Route        path="/requisicao/criar"         render={()=> toUsertoo(Criar)}/>
        <Route        path="/requisicao/historico"     render={()=> toUsertoo(Historico)}/>
        <Route        path="/requisicao/editar/:id"    render={()=> toUsertoo(EditarReq)}/>

        <Route        path="/solicitacao/historico"    render={()=> to(HistoricoSol)}/>

        <Route        path="/solicitacao/criar"        render={()=> to(criarS)}/>
        <Route exact  path="/solicitacao/orcamento/:id"render={()=> to(Orcamento)}/>
        
        <Route exact  path="/solicitacao/validar"      render={()=> toUsertoo(ValidarS)}/>
        <Route exact  path="/solicitacao/validar/:id"  render={()=> toUsertoo(ValidEspec)}/>

        <Route        path="/siorg/criar"              render={()=> toUsertoo(criarSiorg)}/>
        <Route        path="/siorg/lista"              render={()=> to(criarLista)}/>

        <Route        path="/almoxarifado/compras"     render={()=> toUsertoo(AlmoPedido)}/>
        <Route        path="/almoxarifado/info"        render={()=> toUsertoo(AlmoInfo)}/>
        
        <Route        path="/almoxarifado/emprestimo"  render={()=> to(AlmoEmprestimo)}/>
        <Route        path="/almoxarifado/historico"   render={()=> to(AlmoHistorico)}/>
        <Route        path="/almoxarifado/devolucao"   render={()=> toUsertoo(AlmoDevolucao)}/>

      </Switch>
    </App>
  </BrowserRouter>
)
,document.getElementById('root'));
registerServiceWorker();
