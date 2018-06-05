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
          options={{noDataText: 'Não há dados.'}}
          pagination
        >
        <TableHeaderColumn dataField='id' isKey>  ID                                 </TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.descricaoL}> {this.props.descricao}  </TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataL}>      {this.props.data}       </TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.statusL}>    {this.props.status}     </TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.nomeL}>      {this.props.nome}       </TableHeaderColumn>
        </BootstrapTable>

      </div>
    );
  }
}
export { Table }