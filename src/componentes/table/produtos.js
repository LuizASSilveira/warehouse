import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

const conditions = {
  0: "Novo",
  1: "Usado",
  2: "Semi-novo"
};

class ProdutosTable extends Component {
  constructor(props) {
    super(props);

    this.options = {
      defaultSortName: "nome",
      defaultSortOrder: "asc"
    };
  }
  render() {
    return (
      <div>
        <p className="Table-header">Produtos</p>
        <BootstrapTable
          data={this.props.data}
          options={this.options}
          pagination
        >
          <TableHeaderColumn
            isKey
            dataField="siorg"
            filter={{
              type: "RegexFilter",
              placeholder: " "
            }}
          >
            SIORG
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="nome"
            dataSort
            filter={{
              type: "RegexFilter",
              placeholder: " "
            }}
          >
            Nome
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="descricao"
            filter={{
              type: "RegexFilter",
              placeholder: " "
            }}
          >
            Descrição
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="categoria"
            filter={{
              type: "RegexFilter",
              placeholder: " "
            }}
          >
            Categoria
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="condicao"
            filter={{ type: "SelectFilter", options: conditions }}
          >
            Condição
          </TableHeaderColumn>
          <TableHeaderColumn>Opções</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default ProdutosTable;
