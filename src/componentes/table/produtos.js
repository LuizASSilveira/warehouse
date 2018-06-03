import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class ProdutosTable extends Component {
  render() {
    return (
      <div>
        <p className="Table-header">Produtos</p>
        <BootstrapTable data={this.props.data}>
          <TableHeaderColumn isKey dataField="siorg">
            SIORG
          </TableHeaderColumn>
          <TableHeaderColumn dataField="nome">Nome</TableHeaderColumn>
          <TableHeaderColumn dataField="descricao">Descrição</TableHeaderColumn>
          <TableHeaderColumn dataField="categoria">Categoria</TableHeaderColumn>
          <TableHeaderColumn dataField="condicao">Condição</TableHeaderColumn>
          <TableHeaderColumn>Opções</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default ProdutosTable;
