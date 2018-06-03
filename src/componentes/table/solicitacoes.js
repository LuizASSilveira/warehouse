import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

const status = {
  0: "Em aberto",
  1: "Comprado",
  2: "Deserto"
};

function dateFormatter(cell, row) {
  return `${("0" + cell.getDate()).slice(-2)}/${(
    "0" +
    (cell.getMonth() + 1)
  ).slice(-2)}/${cell.getFullYear()}`;
}

class SolicitacoesTable extends Component {
  constructor(props) {
    super(props);

    this.options = {
      defaultSortName: "data",
      defaultSortOrder: "asc"
    };
  }

  render() {
    return (
      <div>
        <p className="Table-header">Solicitações</p>
        <BootstrapTable
          data={this.props.data}
          options={this.options}
          pagination
        >
          <TableHeaderColumn
            dataField="data"
            dataFormat={dateFormatter}
            filter={{ type: "DateFilter" }}
            dataSort
          >
            Data
          </TableHeaderColumn>
          <TableHeaderColumn
            isKey
            dataField="siorg"
            dataSort
            filter={{
              type: "RegexFilter",
              placeholder: " "
            }}
          >
            SIORG
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="descricao"
            dataSort
            filter={{
              type: "RegexFilter",
              placeholder: " "
            }}
          >
            Descrição
          </TableHeaderColumn>
          <TableHeaderColumn dataField="qtde" dataSort>
            Quantidade
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="status"
            dataSort
            filter={{ type: "SelectFilter", options: status }}
          >
            Status
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default SolicitacoesTable;
