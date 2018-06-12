import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class SolicitacoesTable extends Component {
  render() {
    return (
      <div>
        <p className="Table-header">Solicitações</p>
        <BootstrapTable
          searchPlaceholder='Pesquisar'
          options={{noDataText: 'Não há dados.'}}
          >
          <TableHeaderColumn isKey dataField="siorg">
            SIORG
          </TableHeaderColumn>
          <TableHeaderColumn dataField="data">Data</TableHeaderColumn>
          <TableHeaderColumn dataField="descricao">Descrição</TableHeaderColumn>
          <TableHeaderColumn dataField="qtde">Quantidade</TableHeaderColumn>
          <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default SolicitacoesTable;
