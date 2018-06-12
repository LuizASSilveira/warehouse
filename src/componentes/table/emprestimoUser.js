import React, { Component } from 'react';
import '../css/table.css'
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Redirect } from 'react-router-dom'

function onRowSelect(row) {
  console.log(row.id)
}

export default class Table extends Component {
  constructor() {
    super()
    this.state = { products: [] }
  }

  selectRowProp = {
    clickToSelect: true,
    mode: 'checkbox',
    bgColor: 'pink',
    onSelect: onRowSelect
  };

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/emprestimo.json')
      .then(response => response.json())
      .then(product => {
        this.setState({ products: product })
      });
  }
  render() { 
    const options ={
      noDataText: 'Não há dados.',
    }
    return (
      <div id="table">
        <BootstrapTable
          data={this.state.products}
          selectRow={this.selectRowProp}
          search={true}
          searchPlaceholder='Pesquisar'
          pagination
          options={options}
        >
          <TableHeaderColumn dataField='id' isKey>  ID                                        </TableHeaderColumn>
          <TableHeaderColumn width='20%'    dataField= 'quantidade' dataAlign='center'>  Quantidade Disponivel   </TableHeaderColumn>
          <TableHeaderColumn width='80%'    dataField= 'descricao'>   Descrição               </TableHeaderColumn>
        </BootstrapTable>

      </div>
    );
  }
}
