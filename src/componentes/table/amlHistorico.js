import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Redirect } from 'react-router-dom'
import '../css/table.css'


export default class Table extends Component {
  constructor() {
    super()
    this.state = { products: [], modal: false }
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/emprestimo.json')
      .then(response => response.json())
      .then(product => {
        this.setState({ products: product })
      });
  }

  render() {
    const options = {
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
          <TableHeaderColumn dataField='id' isKey>  ID                                                          </TableHeaderColumn>
          <TableHeaderColumn width='15%' dataField='dataA' dataAlign='center'>         Data Emprestimo           </TableHeaderColumn>
          <TableHeaderColumn width='15%' dataField='dataD' dataAlign='center'>         Data Devolução            </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField='quantidade' dataAlign='center'>  Quantidade                 </TableHeaderColumn>
          <TableHeaderColumn width='50%' dataField='descricao'>   Produto                                       </TableHeaderColumn>
          
        </BootstrapTable>

      </div>
    );
  }
}
