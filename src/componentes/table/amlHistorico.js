import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../css/table.css'


export default class Table extends Component {
  constructor() {
    super()
    this.state = { products: [], modal: false }
  }

  
  componentDidMount() {
    fetch('http://localhost:3001/estoque/historicoUsuario', {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    })
      .then(response => response.json())
      .then(product => {
        console.log(product)
        this.setState({ products: product });
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
          <TableHeaderColumn  width='0%' dataField='id' isKey>                          ID                     </TableHeaderColumn>
          <TableHeaderColumn width='15%' dataField='data'       dataAlign='center'>     Data Devolução         </TableHeaderColumn>
          <TableHeaderColumn width='15%' dataField='tipo'       dataAlign='center'>     Tipo                   </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField='quantidade' dataAlign='center'>     Quantidade             </TableHeaderColumn>
          <TableHeaderColumn width='50%' dataField='descricao'  dataAlign='center'>     Produto                </TableHeaderColumn>
        </BootstrapTable>

      </div>
    );
  }
}
