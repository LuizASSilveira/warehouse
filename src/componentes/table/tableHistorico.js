import React, { Component } from 'react';
import '../css/table.css'
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


class Table extends Component {
  constructor(props) {
    super(props)
    this.state = { products: [] }
  }
  componentDidMount() {
    fetch(this.props.urlGet, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    }).then(response => response.json())
      .then(product => {
        this.setState({ products: product });
      });
  }

  render() {
    return (
      <div id="table">
        <BootstrapTable
          data={this.state.products}
          search={true}
          searchPlaceholder='Pesquisar'
          options={{ noDataText: 'Não há dados.' }}
          pagination
        >
          <TableHeaderColumn dataField= 'id' isKey>   ID                                 </TableHeaderColumn>
          <TableHeaderColumn dataField= 'descricaoL'> Descricao  </TableHeaderColumn>
          <TableHeaderColumn dataField= 'data'>       Data       </TableHeaderColumn>
          <TableHeaderColumn dataField= 'status'>     Status     </TableHeaderColumn>
          <TableHeaderColumn dataField= 'nome'>       Nome       </TableHeaderColumn>
        </BootstrapTable>

      </div>
    );
  }
}
export { Table }