import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import App from "./App";

import { Switch, Route, BrowserRouter } from "react-router-dom";

import Login from "./componentes/login";
import Criar from "./Requisicao/criar";
import Historico from "./Requisicao/historico";
import EditarReq from "./Requisicao/editar";

import criarSiorg from "./Siorg/criar";
import criarLista from "./Siorg/pesquisar";

import criarS from "./Solicitacao/criar";
import Orcamento from "./Solicitacao/orcamento";
import HistoricoSol from "./Solicitacao/historico";
import ValidarS from "./Solicitacao/validar";
import ValidEspec from "./Solicitacao/validarEspec";

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/requisicao/criar" component={Criar} />
        <Route exact path="/requisicao/historico" component={Historico} />
        <Route exact path="/requisicao/editar/:id" component={EditarReq} />

        <Route exact path="/solicitacao/historico" component={HistoricoSol} />
        <Route exact path="/solicitacao/criar" component={criarS} />
        <Route exact path="/solicitacao/orcamento" component={Orcamento} />

        <Route exact path="/solicitacao/validar" component={ValidarS} />
        <Route exact path="/solicitacao/validar/:id" component={ValidEspec} />

        <Route exact path="/siorg/criar" component={criarSiorg} />
        <Route exact path="/siorg/lista" component={criarLista} />

        <Route path="/siorg/criar" component={criarSiorg} />
        <Route path="/siorg/lista" component={criarLista} />
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
