import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class OrcamentosTable extends Component {
  render() {
    return (
      <div>
        <p className="Table-header">Orçamentos</p>
        <BootstrapTable data={this.props.data}>
          <TableHeaderColumn isKey dataField="cnpj">
            CNPJ
          </TableHeaderColumn>
          <TableHeaderColumn dataField="fornecedor">
            Fornecedor
          </TableHeaderColumn>
          <TableHeaderColumn dataField="valor">Valor R$</TableHeaderColumn>
          <TableHeaderColumn dataField="ref">Referência</TableHeaderColumn>
          <TableHeaderColumn dataField="arquivo">Arquivo</TableHeaderColumn>
          <TableHeaderColumn>Remover</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default OrcamentosTable;
