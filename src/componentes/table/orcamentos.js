import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class OrcamentosTable extends Component {
  constructor(props) {
    super(props);

    this.options = {
      defaultSortName: "valor",
      defaultSortOrder: "asc"
    };
  }
  render() {
    return (
      <div>
        <p className="Table-header">Orçamentos</p>
        <BootstrapTable
          data={this.props.data}
          options={this.options}
          pagination
        >
          <TableHeaderColumn isKey dataField="cnpj">
            CNPJ
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="fornecedor"
            filter={{
              type: "RegexFilter",
              placeholder: " "
            }}
          >
            Fornecedor
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="valor"
            dataSort
            filter={{
              type: "RegexFilter",
              placeholder: " "
            }}
          >
            Valor R$
          </TableHeaderColumn>
          <TableHeaderColumn dataField="ref">Referência</TableHeaderColumn>
          <TableHeaderColumn dataField="arquivo">Arquivo</TableHeaderColumn>
          <TableHeaderColumn>Remover</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default OrcamentosTable;
