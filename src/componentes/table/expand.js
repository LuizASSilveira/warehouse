import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class ExpandTable extends Component {
	constructor(props){
		super(props)
		this.state= {data : [this.props.data]};
	}

  render() {
    let naoEhGanbiarra
    console.log(this.props.data)
    if(!this.props.siorg){
      naoEhGanbiarra = <TableHeaderColumn tdStyle={ { whiteSpace: 'normal' } } dataField="justificativa" >Justificativa</TableHeaderColumn>
    }

    return (
      <div>
        <BootstrapTable
          searchPlaceholder='Pesquisar'
          options={{noDataText: 'Não há dados.'}}
          data = {this.state.data}
          >
          <TableHeaderColumn tdStyle={ { whiteSpace: 'normal' } } dataField="descricao" isKey>Descrição</TableHeaderColumn>
          {naoEhGanbiarra}
        </BootstrapTable>
      </div>
    );
  }
}

export default ExpandTable;
