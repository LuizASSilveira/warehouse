import React, { Component } from "react";
import Nav from "../componentes/navbarAdm";
import OrcamentoTable from "../componentes/table/orcamentos";

export default class Orcamento extends Component {
  render() {
    return (
      <div>
        <Nav isadm={true} />

        <OrcamentoTable />
      </div>
    );
  }
}
