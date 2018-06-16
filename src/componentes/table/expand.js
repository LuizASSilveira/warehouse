import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class ExpandTable extends Component {
	constructor(props){
		super(props)
		this.state= {data : [this.props.data]};
	}

  render() {
    return (
      <div>
        <BootstrapTable
          searchPlaceholder='Pesquisar'
          options={{noDataText: 'Não há dados.'}}
          data = {this.state.data}
          >
          <TableHeaderColumn dataField="descricao" isKey>Descricao</TableHeaderColumn>

        </BootstrapTable>
      </div>
    );
  }
}

export default ExpandTable;
